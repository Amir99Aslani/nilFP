import Link from 'next/link';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import { FaGlobe } from '@react-icons/all-files/fa/FaGlobe';
import { images } from '@/content/images';
import { nav } from '@/content/home';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <img src={images.logo} alt="" />
          <span>NILFARASOYE PARS</span>
        </Link>
        <nav className={styles.nav} aria-label="Main">
          <Link href="/">{nav.home}</Link>
          <Link href="/#services">{nav.services}</Link>
          <Link href="/about">{nav.about}</Link>
          <Link href="/contact">{nav.contact}</Link>
        </nav>
        <div className={styles.right}>
          <span className={styles.lang}><FaGlobe size={14} /> EN <FaChevronDown size={10} /></span>
          <Link href="/contact" className={styles.btn}>{nav.cta}</Link>
        </div>
      </div>
    </header>
  );
}
