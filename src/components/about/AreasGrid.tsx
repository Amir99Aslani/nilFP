'use client';

import { useState } from 'react';
import { FaAppleAlt } from '@react-icons/all-files/fa/FaAppleAlt';
import { FaCar } from '@react-icons/all-files/fa/FaCar';
import { FaChevronDown } from '@react-icons/all-files/fa/FaChevronDown';
import { FaCog } from '@react-icons/all-files/fa/FaCog';
import { FaSolarPanel } from '@react-icons/all-files/fa/FaSolarPanel';
import { FaTractor } from '@react-icons/all-files/fa/FaTractor';
import { FaTruck } from '@react-icons/all-files/fa/FaTruck';
import a from './About.module.scss';

const icons = { car: FaCar, food: FaAppleAlt, machinery: FaTractor, solar: FaSolarPanel, truck: FaTruck, parts: FaCog };

type Item = { icon: string; title: string; text: string };

// Desktop: the 3 x 2 grid. Phones: 3 cards + a "Show all" button.
export default function AreasGrid({ items, showAll, showLess }: { items: Item[]; showAll: string; showLess: string }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <>
            <div className={a.grid} data-stagger="grid" data-expanded={expanded}>
                {items.map((item) => {
                    const Icon = icons[item.icon as keyof typeof icons];
                    return (
                        <div key={item.title} className={a.cell}>
                            <Icon size={44} />
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                    );
                })}
            </div>
            <button type="button" className={a.showAll} onClick={() => setExpanded((e) => !e)} aria-expanded={expanded}>
                {expanded ? showLess : showAll}
                <FaChevronDown size={13} style={{ transform: expanded ? 'rotate(180deg)' : undefined, transition: 'transform .25s' }} />
            </button>
        </>
    );
}
