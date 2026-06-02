import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'fr', 'en'],
  defaultLocale: 'es',
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
