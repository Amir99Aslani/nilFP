'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { getLoaderState, getServerLoaderState, startLoader, stopLoader, subscribeLoader } from '@/lib/loader';
import styles from './NavigationLoader.module.scss';

/**
 * Global loader. Two modes:
 *  - 'bar'     thin progress bar at the top (every internal link click), at least 0.28s
 *  - 'overlay' dim layer + spinner (language switch: data-loader="overlay" on the link), at least 1s
 * Everything is position: fixed, so it never moves or scrolls the page.
 * The state lives in src/lib/loader.ts, so it survives the layout remount of a language switch.
 * Mount it once in src/app/[locale]/layout.tsx, inside <body>.
 */
export default function NavigationLoader({ label = 'Loading' }: { label?: string }) {
  const pathname = usePathname();
  const { mode, done } = useSyncExternalStore(subscribeLoader, getLoaderState, getServerLoaderState);

  // internal link clicks start the loader
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page or #hash only
      startLoader(a.dataset.loader === 'overlay' ? 'overlay' : 'bar');
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // the new page is in place: finish (the store still waits for the minimum time)
  useEffect(() => {
    stopLoader();
  }, [pathname]);

  if (!mode) return null;

  return mode === 'bar' ? (
    <div className={`${styles.bar} ${done ? styles.barDone : ''}`} aria-hidden="true" />
  ) : (
    <div className={`${styles.overlay} ${done ? styles.overlayDone : ''}`} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.sr}>{label}</span>
    </div>
  );
}
