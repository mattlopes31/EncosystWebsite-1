#!/bin/bash
set -e

# ============================================================
# CONFIGURER CES DEUX VARIABLES AVANT DE LANCER
# ============================================================
DOMAIN="encosyst.com"
EMAIL="l.lopes@encosyst.fr"
# ============================================================

echo "→ Initialisation Let's Encrypt pour $DOMAIN"

# Créer les dossiers certbot
mkdir -p nginx/certbot/conf/live/$DOMAIN
mkdir -p nginx/certbot/www

# Générer un certificat temporaire auto-signé pour démarrer nginx
echo "→ Génération certificat temporaire..."
openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
  -keyout nginx/certbot/conf/live/$DOMAIN/privkey.pem \
  -out    nginx/certbot/conf/live/$DOMAIN/fullchain.pem \
  -subj '/CN=localhost' 2>/dev/null

# Démarrer nginx avec le certificat temporaire
echo "→ Démarrage nginx..."
docker-compose up --build -d nginx encosyst-website
sleep 5

# Obtenir le vrai certificat Let's Encrypt
echo "→ Obtention certificat Let's Encrypt..."
docker-compose run --rm certbot certonly \
  --webroot -w /var/www/certbot \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  -d $DOMAIN \
  -d www.$DOMAIN

# Supprimer le certificat temporaire
rm -rf nginx/certbot/conf/live/$DOMAIN

# Redémarrer nginx avec le vrai certificat
echo "→ Redémarrage nginx avec certificat réel..."
docker-compose restart nginx

# Démarrer certbot pour le renouvellement automatique
docker-compose up -d certbot

echo ""
echo "✅ Terminé ! Site disponible sur https://$DOMAIN"
