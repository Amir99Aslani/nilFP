import LocaleLink from '@/components/LocaleLink';
import { images } from '@/content/images';
import type { Content } from '@/content';
import type { Locale } from '@/i18n/config';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';
import styles from './Header.module.scss';

export default function Header({ locale, nav }: { locale: Locale; nav: Content['nav'] }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <LocaleLink href="/" className={styles.brand}>
          <img src={images.logo} alt="" />
          <span>{nav.brand}</span>
        </LocaleLink>
        <nav className={styles.nav} aria-label="Main">
          <LocaleLink href="/">{nav.home}</LocaleLink>
          <LocaleLink href="/products">{nav.services}</LocaleLink>
          <LocaleLink href="/about">{nav.about}</LocaleLink>
          <LocaleLink href="/contact">{nav.contact}</LocaleLink>
        </nav>
        <div className={styles.right}>
          <LanguageSwitcher current={locale} label={nav.language} />
          <LocaleLink href="/contact" className={styles.btn}>{nav.cta}</LocaleLink>
          <MobileMenu
            links={[
              { href: '/', label: nav.home },
              { href: '/products', label: nav.services },
              { href: '/about', label: nav.about },
              { href: '/contact', label: nav.contact },
            ]}
            cta={{ href: '/contact', label: nav.cta }}
            openLabel={nav.openMenu}
            closeLabel={nav.closeMenu}
          />
        </div>
      </div>
    </header>
  );
}
