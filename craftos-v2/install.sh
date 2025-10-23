#!/usr/bin/env bash
set -euo pipefail
log(){ echo "[install] $*"; }
APP_DIR="/opt/craftos"
BACK="$APP_DIR/backend"
FRONT="$APP_DIR/frontend"
USER="www-data"
GROUP="www-data"
export DEBIAN_FRONTEND=noninteractive
log "Install system packages"
sudo apt-get update -y
sudo apt-get install -y --no-install-recommends nodejs npm sqlite3 avahi-daemon ca-certificates rsync >/dev/null
log "Prepare target dir"
sudo mkdir -p "$APP_DIR"; sudo chown -R $USER:$GROUP "$APP_DIR"
log "Copy project"
sudo rsync -a --delete ./backend "$APP_DIR/"
sudo rsync -a --delete ./frontend "$APP_DIR/"
sudo rsync -a --delete ./systemd "$APP_DIR/"
sudo rsync -a --delete ./avahi "$APP_DIR/"
sudo chown -R $USER:$GROUP "$APP_DIR"
log "Backend npm install"
cd "$BACK"; sudo -u $USER npm install --silent
log "Frontend build"
cd "$FRONT"; sudo -u $USER npm install --silent; sudo -u $USER npm run build --silent
log "Seed demo data"
cd "$BACK"; sudo -u $USER node ./seeds/seed.js || true
log "Install systemd + avahi"
sudo install -m 0644 "$APP_DIR/systemd/craftos.service" /etc/systemd/system/craftos.service
sudo systemctl daemon-reload
sudo systemctl enable --now craftos.service
sudo install -m 0644 "$APP_DIR/avahi/craftos.service" /etc/avahi/services/craftos.service
sudo systemctl restart avahi-daemon || true
log "✅ Installation terminée — http://craftos.local:8000"
