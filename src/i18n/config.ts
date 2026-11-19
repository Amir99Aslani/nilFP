// To add a language: 1) add it here  2) create src/content/<code>/ (copy src/content/en)
// 3) register it in src/content/index.ts  4) add a font rule in src/styles/globals.scss if it needs one.
export const locales = ['en', 'fa', 'ar', 'zh'] as const;
// export const locales = ['en', 'fa', 'ar', 'zh', 'de', 'ur'] as const;

export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeMeta: Record<Locale, { name: string; short: string; dir: 'ltr' | 'rtl'; htmlLang: string; ogLocale: string }> = {
  en: { name: 'English', short: 'EN', dir: 'ltr', htmlLang: 'en', ogLocale: 'en_US' },
  fa: { name: 'فارسی', short: 'FA', dir: 'rtl', htmlLang: 'fa', ogLocale: 'fa_IR' },
  ar: { name: 'العربية', short: 'AR', dir: 'rtl', htmlLang: 'ar', ogLocale: 'ar_AR' },
  zh: { name: '中文', short: 'ZH', dir: 'ltr', htmlLang: 'zh-CN', ogLocale: 'zh_CN' },
  // de: { name: 'Deutsch', short: 'DE', dir: 'ltr', htmlLang: 'de', ogLocale: 'de_DE' },
  // ur: { name: 'اردو', short: 'UR', dir: 'rtl', htmlLang: 'ur', ogLocale: 'ur_PK' },
};

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);
