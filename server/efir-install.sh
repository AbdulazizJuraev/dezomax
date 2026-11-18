#!/bin/sh
# DezoMax o'z jonli efiri (TEST) — serverga o'rnatish (2.29.52.42). Qayta ishga tushirsa ham xavfsiz.
#   scp -i ~/.ssh/dezo server/efir.js server/efir-install.sh root@2.29.52.42:/tmp/
#   ssh -i ~/.ssh/dezo root@2.29.52.42 "sh /tmp/efir-install.sh"
set -e
mkdir -p /opt/dezomax-efir
cp /tmp/efir.js /opt/dezomax-efir/efir.js

cat > /etc/systemd/system/dezomax-efir.service <<'EOF'
[Unit]
Description=DezoMax o'z jonli efiri (test) - /efir/ (nginx)
After=network.target dezomax-pay.service

[Service]
EnvironmentFile=/etc/dezomax-pay.env
Environment=EFIR_PORT=3600
Environment=EFIR_DIR=/var/lib/dezomax-efir/hls
ExecStart=/usr/bin/node /opt/dezomax-efir/efir.js
DynamicUser=yes
StateDirectory=dezomax-efir
Restart=always
RestartSec=3
NoNewPrivileges=yes
ProtectSystem=strict
ProtectHome=yes
PrivateTmp=yes
CPUQuota=150%
MemoryMax=700M

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable dezomax-efir >/dev/null 2>&1
systemctl restart dezomax-efir

# nginx: /efir/ yo'li (pay.dezomax.uz). Eski sozlama zaxiraga olinadi.
F=/etc/nginx/sites-enabled/dezomax-pay
if ! grep -q "location /efir/" "$F"; then
  cp "$F" /root/nginx-dezomax-pay.bak-$(date +%Y%m%d%H%M)
  python3 - "$F" <<'PY'
import sys
f = sys.argv[1]; s = open(f).read()
blk = """    # DezoMax o'z efiri (test): WebSocket kirish + HLS - /opt/dezomax-efir (2026-11-18)
    location = /efir/ingest {
        proxy_pass http://127.0.0.1:3600;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 6h;
        proxy_send_timeout 6h;
        proxy_request_buffering off;
        proxy_buffering off;
    }
    location /efir/ {
        proxy_pass http://127.0.0.1:3600;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
"""
key = "    location / {\n        proxy_pass http://127.0.0.1:8787;"
assert key in s, "pay location topilmadi"
open(f, "w").write(s.replace(key, blk + key, 1))
PY
fi
nginx -t && systemctl reload nginx
sleep 2
echo "efir: $(systemctl is-active dezomax-efir)"
echo "status: $(curl -s https://pay.dezomax.uz/efir/status)"
echo "pay: $(curl -s -o /dev/null -w '%{http_code}' https://pay.dezomax.uz/api/yt/live)"
