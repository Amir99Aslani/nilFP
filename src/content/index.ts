import { defaultLocale, isLocale, type Locale } from '@/i18n/config';
import { en, type Content } from './en';
import { fa } from './fa';
import { ar } from './ar';
import { zh } from './zh';

export type { Content };

// Every language must have exactly the same keys as English: TypeScript tells you what is missing.
const dictionaries: Record<Locale, Content> = { en, fa, ar, zh };

export const getContent = (locale: string): Content => dictionaries[isLocale(locale) ? locale : defaultLocale];

export const getProduct = (content: Content, slug: string) => content.productDetails.find((p) => p.slug === slug);
