'use strict';

const SITE = 'https://dezomax.uz/';

function movieSlug(movie) {
  const source = String(movie.slug || movie.title?.uz || movie.title?.ru || 'kino');
  const slug = source.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 90);
  return `${slug || 'kino'}-${Number(movie.id)}.html`;
}

function moviePath(movie, seoPages = {}) {
  const seoSlug = seoPages[movie.id] || seoPages[String(movie.id)];
  return seoSlug ? `/kino/${seoSlug}.html` : `/film/${movieSlug(movie)}`;
}

module.exports = { SITE, movieSlug, moviePath };
