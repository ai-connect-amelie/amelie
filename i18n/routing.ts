export const locales = ['es', 'fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';
