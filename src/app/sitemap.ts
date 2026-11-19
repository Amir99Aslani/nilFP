import type { MetadataRoute } from 'next';
import { localeMeta, locales } from '@/i18n/config';
import { en } from '@/content/en';

const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
const paths = ['', '/about', '/products', '/contact', ...en.productDetails.map((p) => `/products/${p.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${path}`,
      alternates: { languages: Object.fromEntries(locales.map((l) => [localeMeta[l].htmlLang, `${base}/${l}${path}`])) },
    }))
  );
}
