#!/bin/sh
# Efir adminlarini belgilash (faqat dezomax-efir uchun; to'lov serveriga tegmaydi).
#   sh /tmp/efir-admin.sh google_123,google_456
set -e
[ -n "$1" ] || { echo "UID kerak"; exit 1; }
cp /tmp/efir.js /opt/dezomax-efir/efir.js
U=/etc/systemd/system/dezomax-efir.service
sed -i '/^Environment=EFIR_ADMIN_UIDS=/d' "$U"
sed -i "s#^Environment=EFIR_PORT=.*#&\nEnvironment=EFIR_ADMIN_UIDS=$1#" "$U"
systemctl daemon-reload
systemctl restart dezomax-efir
sleep 2
journalctl -u dezomax-efir -n 1 --no-pager -o cat
