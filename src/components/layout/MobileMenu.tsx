'use client';

import { useEffect, useState } from 'react';
import { FaBars } from '@react-icons/all-files/fa/FaBars';
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
import LocaleLink from '@/components/LocaleLink';
import styles from './Header.module.scss';

type Props = {
  links: { href: string; label: string }[];
  cta: { href: string; label: string };
  openLabel: string;
  closeLabel: string;
};

export default function MobileMenu({ links, cta, openLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button type="button" className={styles.burger} aria-label={open ? closeLabel : openLabel} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
        {open ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>
      <nav id="mobile-menu" className={styles.panel} data-open={open}>
        {links.map((l) => (
          <LocaleLink key={l.href} href={l.href} onClick={close}>{l.label}</LocaleLink>
        ))}
        <LocaleLink href={cta.href} className={styles.panelCta} onClick={close}>{cta.label}</LocaleLink>
      </nav>
    </>
  );
}
