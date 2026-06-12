import { getRequestConfig } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales, defaultLocale } from './routing';

type Messages = AbstractIntlMessages;

// Rellena las claves que faltan en fr/en con el texto en español,
// para que nunca se muestren claves en crudo mientras se traduce.
function deepMerge(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };
  for (const key of Object.keys(override)) {
    const baseValue = result[key];
    const overrideValue = override[key];
    if (
      baseValue && overrideValue &&
      typeof baseValue === 'object' && typeof overrideValue === 'object' &&
      !Array.isArray(baseValue) && !Array.isArray(overrideValue)
    ) {
      result[key] = deepMerge(baseValue as Messages, overrideValue as Messages);
    } else {
      result[key] = overrideValue;
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale as (typeof locales)[number])) notFound();

  const messages: Messages = (await import(`../messages/${locale}.json`)).default;

  if (locale === defaultLocale) {
    return { locale, messages };
  }

  const fallbackMessages: Messages = (await import(`../messages/${defaultLocale}.json`)).default;

  return {
    locale,
    messages: deepMerge(fallbackMessages, messages),
  };
});
