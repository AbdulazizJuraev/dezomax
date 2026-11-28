"""DezoMax — Telegram post uchun rasm (1080x1350): kino kadri/posteri, DezoMax logosi, katta nom, «Hoziroq tomosha qiling».
tools/tg-post.js har bir post uchun chaqiradi (2026-11-28). Ishlatish:
  python3 tools/tg-card.py <poster: URL yoki images/... yo'li> <chiqish.jpg> <belgi> <nom> <pastki qator>
Shrift: Roboto Condensed (GitHub serverida apt fonts-roboto), bo'lmasa DejaVu / Windows Bahnschrift.
Xato bo'lsa chiqish kodi 1 — tg-post.js unda oddiy (avvalgi) rasm bilan yuboradi."""
import io, os, sys, urllib.request
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W, H = 1080, 1350
LIME, INK = (198, 255, 61), (10, 12, 6)
FONTS = [
    '/usr/share/fonts/truetype/roboto/unhinted/RobotoCondensed-Bold.ttf',
    '/usr/share/fonts/truetype/roboto/hinted/RobotoCondensed-Bold.ttf',
    '/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf',
    'C:/Windows/Fonts/bahnschrift.ttf',
]
FONTS_REG = [
    '/usr/share/fonts/truetype/roboto/unhinted/RobotoCondensed-Regular.ttf',
    '/usr/share/fonts/truetype/roboto/hinted/RobotoCondensed-Regular.ttf',
    '/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed.ttf',
    'C:/Windows/Fonts/bahnschrift.ttf',
]

def font(size, bold=True):
    for p in (FONTS if bold else FONTS_REG):
        if os.path.exists(p):
            f = ImageFont.truetype(p, size)
            if p.endswith('bahnschrift.ttf'):
                try: f.set_variation_by_axes([700 if bold else 450, 75])
                except Exception: pass
            return f
    return ImageFont.load_default(size)

def load(src):
    if src.startswith('http'):
        req = urllib.request.Request(src, headers={'User-Agent': 'Mozilla/5.0 (DezoMax tg-card)'})
        data = urllib.request.urlopen(req, timeout=20).read()
        return Image.open(io.BytesIO(data)).convert('RGB')
    return Image.open(os.path.join(ROOT, src.lstrip('/'))).convert('RGB')

def main(src, out, badge, title, sub):
    im = load(src)
    landscape = im.width / im.height > 1.1
    bg = ImageOps.fit(im, (W, H), Image.LANCZOS).filter(ImageFilter.GaussianBlur(38))
    canvas = Image.blend(bg, Image.new('RGB', (W, H), (8, 8, 10)), 0.55)
    if landscape:
        fw = W - 80; fh = min(round(fw * im.height / im.width), 640)
        frame = ImageOps.fit(im, (fw, fh), Image.LANCZOS)
        sh = Image.new('RGBA', (W, H), 0); ImageDraw.Draw(sh).rounded_rectangle((40, 150, 40 + fw, 150 + fh), 28, fill=(0, 0, 0, 190))
        canvas = Image.alpha_composite(canvas.convert('RGBA'), sh.filter(ImageFilter.GaussianBlur(24))).convert('RGB')
        mask = Image.new('L', (fw, fh), 0); ImageDraw.Draw(mask).rounded_rectangle((0, 0, fw, fh), 28, fill=255)
        canvas.paste(frame, (40, 130), mask)
        top = 130 + fh + 60
    else:
        canvas = ImageOps.fit(im, (W, H), Image.LANCZOS, centering=(0.5, 0.3))
        top = H - 470
    g = Image.new('L', (1, H), 0)
    start = top - 240
    for y in range(H):
        t = max(0.0, (y - start) / (H - start))
        g.putpixel((0, y), int(255 * min(1.0, t * 1.25) ** 1.3 * 0.94))
    canvas = Image.composite(Image.new('RGB', (W, H), (6, 6, 8)), canvas, g.resize((W, H)))
    # yuqori qism o'qilsin (logo, belgi)
    tg = Image.new('L', (1, H), 0)
    for y in range(240): tg.putpixel((0, y), int(150 * (1 - y / 240)))
    canvas = Image.composite(Image.new('RGB', (W, H), (6, 6, 8)), canvas, tg.resize((W, H)))
    d = ImageDraw.Draw(canvas)

    lg = Image.open(os.path.join(ROOT, 'images/logo/dezomax-name.webp')).convert('RGBA')
    lg = lg.resize((300, round(lg.height * 300 / lg.width)), Image.LANCZOS)
    canvas.paste(lg, (44, 42), lg)
    bf = font(34); bw = d.textlength(badge, font=bf) + 44
    d.rounded_rectangle((W - 44 - bw, 38, W - 44, 92), 27, fill=LIME)
    d.text((W - 44 - bw / 2, 66), badge, font=bf, fill=INK, anchor='mm')

    def wrap(text, f, maxw):
        lines, cur = [], ''
        for w in text.split():
            t = (cur + ' ' + w).strip()
            if not cur or d.textlength(t, font=f) <= maxw: cur = t
            else: lines.append(cur); cur = w
        lines.append(cur); return lines
    size = 112
    while True:
        tf = font(size); lines = wrap(title.upper(), tf, W - 100)
        if (len(lines) <= 3 and all(d.textlength(l, font=tf) <= W - 100 for l in lines)) or size <= 56: break
        size -= 8
    lines = lines[:3]
    y = top
    for ln in lines:
        d.text((50, y), ln, font=tf, fill=(255, 255, 255)); y += round(size * 1.02)
    d.rectangle((52, y + 18, 132, y + 26), fill=LIME)
    d.text((50, y + 46), sub, font=font(40, False), fill=(220, 224, 214))

    cf = font(38); cta = 'HOZIROQ TOMOSHA QILING'
    cw = d.textlength(cta, font=cf) + 130; cy = H - 150
    d.rounded_rectangle((50, cy, 50 + cw, cy + 84), 42, fill=LIME)
    d.polygon([(84, cy + 26), (84, cy + 58), (112, cy + 42)], fill=INK)
    d.text((130, cy + 42), cta, font=cf, fill=INK, anchor='lm')
    d.text((W - 50, cy + 42), 'dezomax.uz', font=font(36), fill=(235, 238, 230), anchor='rm')
    canvas.save(out, 'JPEG', quality=88, optimize=True)

if __name__ == '__main__':
    try:
        main(*sys.argv[1:6])
    except Exception as e:
        print('tg-card xato:', e, file=sys.stderr); sys.exit(1)
