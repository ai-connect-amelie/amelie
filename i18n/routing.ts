import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'fr', 'en'],
  defaultLocale: 'es',
});
