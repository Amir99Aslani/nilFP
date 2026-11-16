'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { FaAppleAlt } from '@react-icons/all-files/fa/FaAppleAlt';
import { FaCar } from '@react-icons/all-files/fa/FaCar';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import { FaCog } from '@react-icons/all-files/fa/FaCog';
import { FaSolarPanel } from '@react-icons/all-files/fa/FaSolarPanel';
import { FaTractor } from '@react-icons/all-files/fa/FaTractor';
import { FaTruck } from '@react-icons/all-files/fa/FaTruck';
import p from './Products.module.scss';

const icons = { car: FaCar, food: FaAppleAlt, machinery: FaTractor, solar: FaSolarPanel, truck: FaTruck, parts: FaCog };

type Item = { icon: string; category: string; title: string; text: string; image?: string };
type Props = {
  categories: { id: string; label: string }[];
  items: Item[];
  labels: { search: string; empty: string; showAll: string; showLess: string; request: string };
};

// Set to false to hide the small "Request information" link on every card
const SHOW_CARD_LINK = true;

export default function ProductsBrowser({ categories, items, labels }: Props) {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (i) => (category === 'all' || i.category === category) && (!q || `${i.title} ${i.text}`.toLowerCase().includes(q))
    );
  }, [items, category, query]);

  return (
    <>
      <div className={p.toolbar}>
        <input
          type="search"
          className={p.search}
          placeholder={labels.search}
          aria-label={labels.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={p.tabs} role="group" aria-label="Categories">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={p.tab}
              data-active={c.id === category}
              aria-pressed={c.id === category}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className={p.gridWrap}>
        {visible.length === 0 ? (
          <p className={p.empty} role="status">
            {labels.empty}
          </p>
        ) : (
          <div className={p.grid} data-expanded={expanded}>
            {visible.map((item) => {
              const Icon = icons[item.icon as keyof typeof icons];
              return (
                <article key={item.title} className={p.card}>
                  <div className={p.cardImg}>
                    {item.image ? <img src={item.image} alt="" /> : <Icon size={56} aria-hidden="true" />}
                  </div>
                  <div className={p.cardBody}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    {SHOW_CARD_LINK && (
                      <Link href="/contact" className={p.cardLink}>
                        {labels.request} →
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {visible.length > 3 && (
        <button type="button" className={p.showAll} onClick={() => setExpanded((e) => !e)} aria-expanded={expanded}>
          {expanded ? labels.showLess : labels.showAll}
          <FaChevronDown size={13} style={{ transform: expanded ? 'rotate(180deg)' : undefined, transition: 'transform .25s' }} />
        </button>
      )}
    </>
  );
}
