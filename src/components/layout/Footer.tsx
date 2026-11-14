import Link from 'next/link';
import { FaClock } from '@react-icons/all-files/fa/FaClock';
import { FaEnvelope } from '@react-icons/all-files/fa/FaEnvelope';
import { FaFacebookF } from '@react-icons/all-files/fa/FaFacebookF';
import { FaInstagram } from '@react-icons/all-files/fa/FaInstagram';
import { FaLinkedinIn } from '@react-icons/all-files/fa/FaLinkedinIn';
import { FaMapMarkerAlt } from '@react-icons/all-files/fa/FaMapMarkerAlt';
import { FaPhoneAlt } from '@react-icons/all-files/fa/FaPhoneAlt';
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter';
import { images } from '@/content/images';
import { footer as f } from '@/content/home';
import FooterColumn from './FooterColumn';
import styles from './Footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div>
                    <div className={styles.brand}><img src={images.logo} alt="" /> NILFARASOYE PARS</div>
                    <p className={styles.about}>{f.about}</p>
                    <Link href="/contact" className={styles.cta}>{f.cta}</Link>
                </div>
                <FooterColumn title={f.linksTitle} links={f.links} />
                <FooterColumn title={f.servicesTitle} links={f.services} />
                <div className={styles.col}>
                    <h3>{f.contactTitle}</h3>
                    <ul>
                        <li><FaEnvelope size={13} /> <a href={`mailto:${f.email}`}>{f.email}</a></li>
                        <li><FaPhoneAlt size={13} /> {f.phone}</li>
                        <li><FaClock size={13} /> {f.hours}</li>
                        <li><FaMapMarkerAlt size={13} /> {f.location}</li>
                    </ul>
                </div>
            </div>
            <div className={styles.bar}>
                <div className={styles.barInner}>
                    <span>{f.rights}</span>
                    <div className={styles.social}>
                        <a href="#" aria-label="X"><FaTwitter size={18} /></a>
                        <a href="#" aria-label="Facebook"><FaFacebookF size={18} /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram size={18} /></a>
                        <a href="#" aria-label="LinkedIn"><FaLinkedinIn size={18} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
