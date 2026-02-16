# Structure du Build Next.js (mode standalone)

## 📦 Ce qui EST inclus dans `.next/standalone/`

Quand vous faites `npm run build` avec `output: 'standalone'`, Next.js crée un dossier `.next/standalone/` qui contient :

### ✅ Fichiers inclus automatiquement :

```
.next/standalone/
├── server.js                    # Point d'entrée du serveur
├── package.json                 # Dépendances minimales nécessaires
├── node_modules/               # Uniquement les dépendances utilisées (pas devDependencies)
│   └── [dépendances de production uniquement]
└── .next/                      # Fichiers buildés
    ├── server/                 # Code serveur compilé
    │   ├── app/               # Routes app router compilées
    │   ├── chunks/            # Chunks JavaScript
    │   └── middleware.js       # Middleware compilé (si présent)
    └── static/                # Assets statiques (copié séparément)
```

### ⚠️ Ce qui N'EST PAS inclus automatiquement :

Next.js **ne copie PAS** automatiquement dans standalone :
- ❌ `public/` → **DOIT être copié manuellement**
- ❌ `src/middleware.js` → **DOIT être copié manuellement** (pour next-intl)
- ❌ `src/i18n/` → **DOIT être copié manuellement** (pour next-intl)
- ❌ `messages/` → **DOIT être copié manuellement** (fichiers de traduction)
- ❌ `next.config.mjs` → **DOIT être copié manuellement**
- ❌ Fichiers de configuration (postcss.config.mjs, etc.)

## 📁 Structure complète dans le Docker

Dans votre Dockerfile, vous copiez :

```dockerfile
# 1. Fichiers publics (images, etc.)
COPY --from=builder /app/public ./public

# 2. Build standalone (code compilé + dépendances)
COPY --from=builder /app/.next/standalone ./

# 3. Assets statiques Next.js
COPY --from=builder /app/.next/static ./.next/static

# 4. Fichiers nécessaires pour next-intl (NON inclus dans standalone)
COPY --from=builder /app/src/middleware.js ./src/middleware.js
COPY --from=builder /app/src/i18n ./src/i18n
COPY --from=builder /app/messages ./messages
COPY --from=builder /app/next.config.mjs ./next.config.mjs
```

## 🔍 Structure finale dans le conteneur Docker

```
/app/
├── server.js                    # ✅ Depuis standalone
├── package.json                 # ✅ Depuis standalone
├── node_modules/               # ✅ Depuis standalone (dépendances minifiées)
├── .next/
│   ├── server/                 # ✅ Depuis standalone
│   └── static/                # ✅ Copié séparément
├── public/                     # ✅ Copié manuellement
├── src/
│   ├── middleware.js          # ✅ Copié manuellement (pour next-intl)
│   └── i18n/                  # ✅ Copié manuellement (pour next-intl)
├── messages/                   # ✅ Copié manuellement (traductions)
└── next.config.mjs            # ✅ Copié manuellement
```

## ❌ Ce qui N'EST PAS dans le build

- `node_modules/` complet (seulement les dépendances de production)
- `src/` complet (seulement middleware.js et i18n/)
- Fichiers de développement (`.env.local`, etc.)
- Fichiers de test
- Documentation (`.md` files)
- Configuration de développement (eslint, etc.)

## 🎯 Pourquoi copier manuellement certains fichiers ?

### `src/middleware.js` et `src/i18n/`
- Next.js compile le middleware mais ne copie pas les fichiers source
- next-intl a besoin de ces fichiers à l'exécution pour le routing

### `messages/`
- Fichiers JSON de traduction
- Nécessaires à l'exécution pour next-intl
- Non inclus dans le build par défaut

### `next.config.mjs`
- Configuration Next.js
- Nécessaire pour que le serveur sache comment fonctionner
- Non inclus dans standalone

### `public/`
- Assets statiques (images, fonts, etc.)
- Servis directement par Next.js
- Non inclus dans standalone

## 🚀 Commandes utiles pour vérifier

```bash
# Voir ce qui est dans le build standalone
ls -la .next/standalone/

# Voir la structure complète
tree .next/standalone/ -L 3

# Vérifier dans le conteneur Docker
docker exec encosyst-website ls -la /app/
docker exec encosyst-website ls -la /app/src/
```

## ⚡ Optimisation

Le mode `standalone` réduit drastiquement la taille :
- **Avant** : ~500MB+ avec tous les node_modules
- **Après** : ~50-100MB avec seulement les dépendances nécessaires
