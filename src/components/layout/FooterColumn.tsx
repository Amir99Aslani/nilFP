'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import styles from './Footer.module.scss';

// Desktop: always open. Mobile: collapsible (see Footer.module.scss)
export default function FooterColumn({ title, links }: { title: string; links: string[] }) {
    const [open, setOpen] = useState(false);
    return (
        <div className={styles.col} data-open={open}>
            <button type="button" className={styles.colHead} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
                <span>{title}</span>
                <FaChevronDown className={styles.chev} size={14} />
            </button>
            <div className={styles.colBody}>
                <ul>
                    {links.map((l) => (
                        <li key={l}><Link href="/">{l}</Link></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
