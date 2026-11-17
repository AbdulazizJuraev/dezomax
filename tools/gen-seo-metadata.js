'use strict';

/*
 * Cloudflare Workers static assets uchun kino metama'lumotlari indeksi.
 * Ishlatish: node tools/gen-seo-metadata.js --out _site/_seo
 * Manba faqat mavjud kino bazasi; bo'sh faktlar taxmin bilan to'ldirilmaydi.
 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { SITE, moviePath } = require('./movie-seo.js');

const SHARD_COUNT = 128;
const root = path.join(__dirname, '..');

function loadDatabase() {
  const ctx = { window: {}, document: { body: null, write() {} }, localStorage: { getItem: () => null, setItem() {} }, location: { pathname: '/', search: '' }, console };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const file of ['data.js', 'data-channels.js', 'data-rutube.js', 'data-custom.js']) {
    const source = fs.readFileSync(path.join(root, 'js', file), 'utf8').replace(/^(const|let) /gm, 'var ');
    vm.runInContext(source, ctx, { filename: file });
  }
  if (!Array.isArray(ctx.MOVIES)) throw new Error('MOVIES bazasi yuklanmadi');
  return { movies: ctx.MOVIES, hidden: new Set(ctx.HIDDEN_MOVIES || []), genres: ctx.GENRES || [] };
}

function loadSeoPages() {
  const src = fs.readFileSync(path.join(root, 'js', 'seo-pages.js'), 'utf8');
  const match = src.match(/var\s+SEO_PAGES\s*=\s*(\{[\s\S]*\})\s*;?/);
  if (!match) throw new Error('js/seo-pages.js ichidan SEO_PAGES olinmadi');
  return JSON.parse(match[1]);
}

function cleanText(value) {
  return String(value == null ? '' : value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function absoluteImage(value) {
  if (!value) return '';
  try {
    const url = new URL(String(value), SITE);
    return /^https?:$/.test(url.protocol) ? url.href : '';
  } catch { return ''; }
}

function buildRecord(movie, seoPages, genres) {
  const id = Number(movie.id);
  const title = cleanText(movie.title?.uz || movie.title?.ru);
  if (!Number.isSafeInteger(id) || id <= 0 || !title) return null;
  const originalTitle = cleanText(movie.originalTitle || movie.original_title || movie.title?.original);
  const alternateTitle = cleanText(movie.title?.ru && movie.title.ru !== title ? movie.title.ru : '');
  const year = Number.isInteger(Number(movie.year)) && Number(movie.year) > 1800 && Number(movie.year) < 2200 ? Number(movie.year) : null;
  const genreNames = (Array.isArray(movie.genres) ? movie.genres : []).map(code => {
    const found = genres.find(g => g.id === code);
    return cleanText(found?.uz || found?.ru || code);
  }).filter(Boolean);
  const actualDescription = cleanText(movie.desc?.uz || movie.desc?.ru || '');
  const language = cleanText(movie.audio || movie.language || movie.lang || '');
  const languageLabel = ({ uz: 'O‘zbek tilida', ru: 'Rus tilida', en: 'Ingliz tilida', kk: 'Qozoq tilida', tr: 'Turk tilida' })[language.toLowerCase()] || '';
  const kind = ({ film: 'film', serial: 'serial', multfilm: 'multfilm', tahlil: 'tahlil', konsert: 'konsert' })[movie.type] || 'film';
  const yearText = year ? ` (${year})` : '';
  const originalText = originalTitle ? ` / ${originalTitle}` : alternateTitle ? ` / ${alternateTitle}` : '';
  let pageTitle = `${title}${yearText}${originalText} — ${kind[0].toUpperCase()}${kind.slice(1)} | DezoMax`;
  const actualPoster = absoluteImage(movie.poster);
  const shareImage = actualPoster || `${SITE}images/no-poster.svg`;
  const facts = [genreNames.length ? `Janr: ${genreNames.join(', ')}.` : '', languageLabel ? `Til: ${languageLabel}.` : ''].filter(Boolean).join(' ');
  const descriptionCore = actualDescription
    ? `${title}${yearText}${originalText}. ${actualDescription}`
    : `${title}${yearText}${originalText} — DezoMax katalogidagi ${kind}.${facts ? ` ${facts}` : ''}`;
  // ID — bazadagi haqiqiy identifikator; bir xil matnli yozuvlarning description'ini farqlaydi.
  const idSuffix = ` Kino ID: ${id}.`;
  const descriptionLimit = Math.max(1, 300 - idSuffix.length);
  const descriptionPrefix = Array.from(descriptionCore).slice(0, descriptionLimit).join('').trim();
  const description = `${descriptionPrefix}${idSuffix}`;
  const canonicalPath = moviePath(movie, seoPages);
  const canonical = new URL(canonicalPath, SITE).href;
  const duration = Number(movie.duration);
  const director = movie.director ? String(movie.director).split(/,\s*/).map(cleanText).filter(Boolean) : [];
  const cast = Array.isArray(movie.cast) ? movie.cast.map(cleanText).filter(Boolean).slice(0, 20) : [];
  return {
    id, title: pageTitle, name: title, alternateName: originalTitle || alternateTitle,
    description, hasDescription: Boolean(actualDescription), year, genres: genreNames, language,
    type: movie.type === 'serial' ? 'TVSeries' : ['tahlil', 'konsert'].includes(movie.type) ? 'VideoObject' : 'Movie', poster: actualPoster, shareImage,
    canonicalPath, canonical, director, cast,
    duration: movie.type !== 'serial' && Number.isFinite(duration) && duration > 0 ? duration : null
  };
}

function buildIndex({ movies, hidden, genres, seoPages }) {
  const rows = new Map();
  for (const movie of movies) {
    if (!movie || hidden.has(Number(movie.id))) continue;
    const row = buildRecord(movie, seoPages, genres);
    if (row) rows.set(String(row.id), row);
  }
  const titleCounts = new Map();
  for (const row of rows.values()) titleCounts.set(row.title, (titleCounts.get(row.title) || 0) + 1);
  for (const row of rows.values()) if (titleCounts.get(row.title) > 1) row.title = row.title.replace(' | DezoMax', ` · ID ${row.id} | DezoMax`);
  const shards = Array.from({ length: SHARD_COUNT }, () => ({}));
  for (const [id, row] of rows) shards[Number(id) % SHARD_COUNT][id] = row;
  return { rows, shards };
}

function writeShards(outDir, shards) {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  let count = 0, bytes = 0;
  shards.forEach((shard, i) => {
    if (!Object.keys(shard).length) return;
    const data = JSON.stringify(shard);
    const file = path.join(outDir, `${String(i).padStart(3, '0')}.json`);
    fs.writeFileSync(file, data);
    count += Object.keys(shard).length;
    bytes += Buffer.byteLength(data);
  });
  return { count, bytes };
}

function run(outDir) {
  const db = loadDatabase();
  const { rows, shards } = buildIndex({ ...db, seoPages: loadSeoPages() });
  const result = writeShards(outDir, shards);
  const noPoster = [...rows.values()].filter(row => !row.poster).length;
  const noDescription = [...rows.values()].filter(row => !row.hasDescription).length;
  console.log(`SEO metadata: ${result.count} kino/serial; ${SHARD_COUNT} shard; ${(result.bytes / 1024 / 1024).toFixed(2)} MB; postersiz: ${noPoster}; tavsifsiz: ${noDescription}`);
  return result;
}

if (require.main === module) {
  const outArg = process.argv.indexOf('--out');
  if (outArg < 0 || !process.argv[outArg + 1]) throw new Error('--out <papka> ko‘rsatilishi shart');
  run(path.resolve(process.argv[outArg + 1]));
}

module.exports = { SHARD_COUNT, loadDatabase, loadSeoPages, buildRecord, buildIndex, writeShards, run };
