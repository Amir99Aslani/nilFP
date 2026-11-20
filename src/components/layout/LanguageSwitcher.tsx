'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import { FaGlobe } from '@react-icons/all-files/fa/FaGlobe';
import { localeMeta, locales, type Locale } from '@/i18n/config';
import styles from './Header.module.scss';

export default function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || `/${current}`;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // same page, other language: /fa/about -> /en/about
  const hrefFor = (l: Locale) => `/${l}${pathname.replace(/^\/[^/]+/, '')}`;

  return (
    <div className={styles.langWrap} ref={ref}>
      <button type="button" className={styles.langBtn} aria-expanded={open} aria-haspopup="true" aria-label={label} onClick={() => setOpen((o) => !o)}>
        <FaGlobe size={14} aria-hidden="true" />
        <span>{localeMeta[current].short}</span>
        <FaChevronDown size={10} aria-hidden="true" />
      </button>
      {open && (
        <ul className={styles.langMenu}>
          {locales.map((l) => (
            <li key={l}>
              <Link
                href={hrefFor(l)}
                scroll={false} // keep the scroll position when the language changes
                data-loader="overlay" // NavigationLoader shows its overlay for this link
                lang={localeMeta[l].htmlLang}
                hrefLang={localeMeta[l].htmlLang}
                dir={localeMeta[l].dir}
                aria-current={l === current ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {localeMeta[l].name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
