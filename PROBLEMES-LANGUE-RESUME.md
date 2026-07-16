# 🔴 Résumé des Problèmes de Langue - ENCOSYST Website

## 📋 Problèmes Identifiés

### 1. ❌ **Problème Initial : La langue ne se préserve pas lors de la navigation**

**Symptôme :**
- Quand on change de langue (ex: français → anglais)
- Puis on navigue vers une autre page
- La langue revient automatiquement au français (langue par défaut)

**Cause :**
- Les composants utilisaient `Link` de `next/link` au lieu de `Link` de `@/i18n/routing`
- Le `Link` de Next.js standard ne préserve pas la locale dans l'URL
- Résultat : navigation sans locale → middleware redirige vers `/fr` (défaut)

**Fichiers affectés :**
- ❌ `src/components/Navbar.js` → utilisait `next/link`
- ❌ `src/components/Footer.js` → utilisait `next/link`
- ❌ `src/components/Hero.js` → utilisait `next/link`
- ❌ `src/app/[locale]/page.js` → utilisait `next/link`
- ❌ Toutes les pages produits (8 fichiers) → utilisaient `next/link`

**Solution :**
✅ Remplacé tous les `import Link from 'next/link'` par `import { Link } from '@/i18n/routing'`

---

### 2. ❌ **Problème : Erreur lors du build Docker**

**Symptôme :**
```
Error: Missing API key. Pass it to the constructor `new Resend("re_123")`
```

**Cause :**
- `Resend` était initialisé au niveau du module (ligne 4)
- S'exécutait lors du build, pas seulement à l'exécution
- Pas de clé API disponible pendant le build

**Fichier affecté :**
- ❌ `src/app/[locale]/api/contact/route.js`

**Solution :**
✅ Déplacé l'initialisation de `Resend` dans la fonction `POST` (lazy loading)
✅ Ajout d'une vérification de la clé API avant initialisation

---

### 3. ❌ **Problème : Erreur `createLocalizedPathnamesNavigation` n'existe pas**

**Symptôme :**
```
Attempted import error: 'createLocalizedPathnamesNavigation' is not exported from 'next-intl/navigation'
```

**Cause :**
- Utilisation de l'ancienne API de next-intl v3
- Dans next-intl v4.4.0, l'API a changé
- `createLocalizedPathnamesNavigation` n'existe plus

**Fichier affecté :**
- ❌ `src/i18n/routing.js`

**Solution :**
✅ Remplacé `createLocalizedPathnamesNavigation` par `createNavigation`
✅ Mis à jour les exports : `export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)`

---

### 4. ❌ **Problème : Le changement de langue ne recharge pas la page**

**Symptôme :**
- Quand on clique sur une langue, la page ne se recharge pas
- L'URL change mais le contenu reste dans l'ancienne langue
- Obligé de recharger manuellement (F5)

**Cause :**
- `LanguagesSwitcher` utilisait le router de next-intl qui fait de la navigation côté client
- Pas de rechargement complet de la page

**Fichier affecté :**
- ❌ `src/components/languages/LanguagesSwitcher.jsx`

**Solution :**
✅ Utilisé `window.location.href` pour forcer un rechargement complet
✅ Construction correcte de l'URL avec la nouvelle locale

---

### 5. ❌ **Problème : Doublons de locale dans l'URL**

**Symptôme :**
- URLs comme `/en/fr` ou `/fr/en/references` au lieu de `/en` ou `/fr/references`
- Erreur 404

**Cause :**
- La fonction `switchLocale` utilisait `window.location.pathname` qui contient déjà la locale
- Puis ajoutait une nouvelle locale sans retirer l'ancienne

**Fichier affecté :**
- ❌ `src/components/languages/LanguagesSwitcher.jsx`

**Solution :**
✅ Extraction correcte de la locale actuelle
✅ Retrait de la locale avant d'ajouter la nouvelle
✅ Construction propre du nouveau chemin

---

### 6. ❌ **Problème : Configuration manquante dans `routing.js`**

**Symptôme :**
- Les hooks de navigation (`Link`, `useRouter`, etc.) non disponibles
- Erreurs lors de l'utilisation dans les composants

**Fichier affecté :**
- ❌ `src/i18n/routing.js` → manquait les exports

**Solution :**
✅ Ajouté `createNavigation` et exporté les hooks
✅ Ajouté `localePrefix: 'always'` dans la configuration

---

### 7. ❌ **Problème : Locales codées en dur dans le layout**

**Symptôme :**
- Le layout utilisait un tableau `['fr', 'en', 'es']` codé en dur
- Pas synchronisé avec la configuration de routing
- Risque de désynchronisation

**Fichier affecté :**
- ❌ `src/app/[locale]/layout.js`

**Solution :**
✅ Utilisé `routing.locales` au lieu d'un tableau codé en dur
✅ Import de `routing` depuis `@/i18n/routing`

---

### 8. ❌ **Problème : Middleware pas assez configuré**

**Symptôme :**
- Le middleware ne redirigeait pas correctement en production
- La locale n'était pas toujours préservée

**Fichier affecté :**
- ❌ `src/middleware.js`

**Solution :**
✅ Configuration explicite avec `localePrefix: 'always'` et `localeDetection: true`
✅ Matcher optimisé pour mieux intercepter les routes

---

### 9. ❌ **Problème : Fichiers manquants dans le build Docker**

**Symptôme :**
- En production, la langue ne fonctionne pas
- Erreurs de routing
- Fichiers de configuration manquants

**Cause :**
- Le mode `standalone` de Next.js ne copie pas automatiquement :
  - `src/middleware.js`
  - `src/i18n/`
  - `messages/`
  - `next.config.mjs`

**Fichier affecté :**
- ❌ `Dockerfile`

**Solution :**
✅ Ajouté la copie manuelle de tous les fichiers nécessaires pour next-intl
✅ Copie de `public/` pour les assets statiques
✅ Copie de `.next/static/` pour les assets Next.js

---

## ✅ Corrections Appliquées (Résumé)

### Fichiers Modifiés :

1. **`src/i18n/routing.js`**
   - ✅ Ajouté `createNavigation` et exports des hooks
   - ✅ Ajouté `localePrefix: 'always'`

2. **`src/middleware.js`**
   - ✅ Configuration explicite avec `localePrefix` et `localeDetection`
   - ✅ Matcher optimisé

3. **`src/app/[locale]/layout.js`**
   - ✅ Utilisé `routing.locales` au lieu de tableau codé en dur

4. **`src/components/languages/LanguagesSwitcher.jsx`**
   - ✅ Utilisé `window.location.href` pour rechargement complet
   - ✅ Correction de la construction de l'URL (pas de doublons)

5. **Tous les composants avec `Link` (11 fichiers)**
   - ✅ Remplacé `next/link` par `@/i18n/routing`
   - Navbar, Footer, Hero, page.js, et toutes les pages produits

6. **`src/app/[locale]/api/contact/route.js`**
   - ✅ Initialisation lazy de Resend

7. **`Dockerfile`**
   - ✅ Copie manuelle des fichiers nécessaires pour next-intl

---

## 🎯 État Actuel

### ✅ Ce qui fonctionne :
- ✅ Changement de langue avec rechargement complet de la page
- ✅ Navigation entre pages préserve la locale
- ✅ Build Docker fonctionne sans erreur
- ✅ Tous les liens utilisent le bon `Link` de next-intl

### ⚠️ Problème Restant :
- ⚠️ En production Docker, la langue ne se préserve toujours pas lors de la navigation
- ⚠️ Possible problème de configuration ou d'exécution du middleware

### 🔍 À Vérifier :
1. Vérifier que le middleware s'exécute correctement en production
2. Vérifier les logs Docker pour voir les redirections
3. Tester avec navigation privée (pas de cache)
4. Vérifier que tous les fichiers sont bien copiés dans le conteneur

---

## 📝 Commandes Utiles pour Déboguer

```bash
# Vérifier les fichiers dans le conteneur
docker exec encosyst-website ls -la /app/src/
docker exec encosyst-website ls -la /app/src/i18n/
docker exec encosyst-website ls -la /app/messages/

# Voir les logs
docker logs encosyst-website

# Rebuild sans cache
docker-compose build --no-cache
docker-compose up -d
```

---

## 🔧 Prochaines Étapes

1. Vérifier les logs du conteneur en production
2. Tester les redirections du middleware
3. Vérifier que `localePrefix: 'always'` fonctionne correctement
4. Peut-être ajouter des logs dans le middleware pour déboguer
