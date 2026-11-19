'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { ComponentProps } from 'react';
import { defaultLocale, isLocale } from '@/i18n/config';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

// Drop-in replacement for next/link: "/contact" becomes "/<current locale>/contact".
// "#hash" and absolute URLs are left alone.
export default function LocaleLink({ href, ...rest }: Props) {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale && isLocale(params.locale) ? params.locale : defaultLocale;
  const target = href.startsWith('/') && !href.startsWith('//') ? `/${locale}${href === '/' ? '' : href}` : href;
  return <Link href={target} {...rest} />;
}
