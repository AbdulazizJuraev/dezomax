#!/bin/sh
# DezoMax efiri — OBS (RTMP) qo'shish. efir-install.sh dan keyin. Qayta ishga tushirsa ham xavfsiz.
#   scp -i ~/.ssh/dezo server/efir.js server/efir-obs-install.sh root@2.29.52.42:/tmp/
#   ssh -i ~/.ssh/dezo root@2.29.52.42 "sed -i 's/\r$//' /tmp/efir-obs-install.sh && sh /tmp/efir-obs-install.sh"
set -e

# 1) yangi efir.js (OBS kalitlari, /efir/obs/*)
cp /tmp/efir.js /opt/dezomax-efir/efir.js
grep -q EFIR_OBS_DIR /etc/systemd/system/dezomax-efir.service || \
  sed -i 's#^Environment=EFIR_DIR=.*#&\nEnvironment=EFIR_OBS_DIR=/var/lib/dezomax-efir-obs#' /etc/systemd/system/dezomax-efir.service
systemctl daemon-reload
systemctl restart dezomax-efir

# 2) nginx RTMP moduli (Ubuntu rasmiy paketi)
DEBIAN_FRONTEND=noninteractive apt-get install -y -q libnginx-mod-rtmp >/dev/null
mkdir -p /var/lib/dezomax-efir-obs
chown www-data:www-data /var/lib/dezomax-efir-obs
chmod 755 /var/lib/dezomax-efir-obs

cat > /etc/nginx/rtmp.conf <<'EOF'
# DezoMax efiri — OBS kirishi (RTMP 1935). Kalit dezomax-efir xizmatida tekshiriladi (/efir/obs/auth),
# oqim nomi «main»ga almashtiriladi — kalit HLS fayl nomlarida ko'rinmaydi. Video qayta kodlanmaydi.
rtmp {
    server {
        listen 1935;
        chunk_size 4096;
        application live {
            live on;
            record off;
            deny play all;
            on_publish http://127.0.0.1:3600/efir/obs/auth;
            on_publish_done http://127.0.0.1:3600/efir/obs/done;
            hls on;
            hls_path /var/lib/dezomax-efir-obs;
            hls_fragment 2s;
            hls_playlist_length 12s;
            hls_cleanup on;
        }
    }
}
EOF
grep -q "include /etc/nginx/rtmp.conf;" /etc/nginx/nginx.conf || { cp /etc/nginx/nginx.conf /root/nginx.conf.bak-$(date +%Y%m%d%H%M); echo "include /etc/nginx/rtmp.conf;" >> /etc/nginx/nginx.conf; }
nginx -t && systemctl reload nginx

# 3) RTMP porti (1935/tcp) — xavfsizlik devorida ochiladi
ufw allow 1935/tcp >/dev/null

sleep 2
echo "efir: $(systemctl is-active dezomax-efir)"
echo "rtmp: $(ss -tln | grep -c ':1935 ')"
echo "status: $(curl -s https://pay.dezomax.uz/efir/status)"
echo "pay: $(curl -s -o /dev/null -w '%{http_code}' https://pay.dezomax.uz/api/yt/live)"
