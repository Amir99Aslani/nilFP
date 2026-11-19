import type { Metadata } from 'next';
import { defaultLocale, localeMeta, locales, type Locale } from '@/i18n/config';

// path: '' for the home page, '/about', '/products/solar-panel-imports' ...
export function pageMetadata({ locale, path, title, description }: { locale: Locale; path: string; title: string; description: string }): Metadata {
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, `/${l}${path}`]));
  languages['x-default'] = `/${defaultLocale}${path}`;
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
    },
  };
}
