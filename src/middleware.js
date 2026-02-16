import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware({
  ...routing,
  // S'assurer que localePrefix est bien 'always' pour forcer la locale dans l'URL
  localePrefix: 'always',
  // Activer la détection de locale depuis les headers
  localeDetection: true
});

export const config = {
  // Matcher pour toutes les routes sauf les fichiers statiques et les routes API
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};