# Utiliser l'image Node.js officielle comme base
FROM node:20-alpine AS base

# Installer les dépendances nécessaires pour certaines bibliothèques
RUN apk add --no-cache libc6-compat

# Étape 1: Installer les dépendances
FROM base AS deps
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json* ./

# Installer les dépendances
RUN npm ci

# Étape 2: Builder l'application
FROM base AS builder
WORKDIR /app

# Copier les dépendances installées
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Désactiver la télémétrie Next.js pendant le build
ENV NEXT_TELEMETRY_DISABLED=1

# Les variables d'environnement SMTP seront passées au runtime via docker-compose

# Builder l'application Next.js
RUN npm run build

# Étape 3: Production - image finale
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Créer un utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers publics
COPY --from=builder /app/public ./public

# Copier les fichiers buildés avec les bonnes permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copier les fichiers de production
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copier les fichiers de configuration nécessaires pour next-intl
# Le mode standalone ne copie pas automatiquement ces fichiers
COPY --from=builder --chown=nextjs:nodejs /app/src/middleware.js ./src/middleware.js
COPY --from=builder --chown=nextjs:nodejs /app/src/i18n ./src/i18n
COPY --from=builder --chown=nextjs:nodejs /app/messages ./messages
COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./next.config.mjs

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
