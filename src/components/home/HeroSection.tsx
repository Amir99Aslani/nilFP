'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import s from './Home.module.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
    hero: { title: string; cardTitle: string; text: string; about: string; cta: string };
};

const BASE_SCALE = 1.08; // the photo rests slightly zoomed so the scroll parallax never shows an edge
const PARALLAX = 3; // % the photo drifts up/down while scrolling (desktop only)

export default function HeroSection({ hero }: Props) {
    const sectionRef = useRef<HTMLElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);
    const parallaxRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const media = mediaRef.current;
            const wrap = parallaxRef.current;
            const img = imgRef.current;
            const card = cardRef.current;
            if (!media || !wrap || !img || !card) return;

            const content = card.querySelectorAll('[data-hero-in]');
            const mm = gsap.matchMedia();

            mm.add(
                { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 901px)' },
                (ctx) => {
                    const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
                    if (!motion) return; // reduced motion: CSS already shows the finished hero

                    // 1) Entrance (transform + opacity only, so it stays on the GPU)
                    const tl = gsap.timeline({ paused: true });
                    tl.fromTo(img, { scale: 1.2 }, { scale: BASE_SCALE, duration: 1.6, ease: 'power2.out' }, 0)
                        // the page-coloured card panel slides up and carves the notch out of the photo
                        .fromTo(card, { yPercent: 100 }, { yPercent: 0, duration: 0.8, ease: 'power3.out' }, 0.05)
                        .fromTo(
                            content,
                            { y: 24, autoAlpha: 0 },
                            { y: 0, autoAlpha: 1, duration: 0.55, ease: 'power3.out', stagger: 0.1 },
                            0.3
                        );

                    // Wait for the intro overlay (the gate sets this flag / fires this event)
                    const play = () => tl.play();
                    if (document.documentElement.dataset.introDone === '1') play();
                    else window.addEventListener('intro:done', play, { once: true });
                    const safety = window.setTimeout(play, 10000); // never leave the hero hidden

                    // 2) Light parallax on scroll, desktop only. One scrub tween, one element.
                    if (desktop) {
                        gsap.fromTo(
                            wrap,
                            { yPercent: -PARALLAX },
                            {
                                yPercent: PARALLAX,
                                ease: 'none',
                                scrollTrigger: { trigger: media, start: 'top bottom', end: 'bottom top', scrub: true },
                            }
                        );
                    }

                    return () => {
                        window.removeEventListener('intro:done', play);
                        window.clearTimeout(safety);
                    };
                }
            );

            return () => mm.revert();
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className={`${s.hero} ${s.wrap} home`}>
            <h1>{hero.title}</h1>
            <div ref={mediaRef} className={s.heroMedia}>
                <div ref={parallaxRef} className={s.heroParallax}>
                    {/* One photo, three files: mobile WebP, AVIF, WebP fallback.
                        It is the LCP image, so: no lazy loading, high fetch priority, fixed size. */}
                    <picture>
                        <source media="(max-width: 900px)" srcSet="/images/homeImg/hero-full-900.webp"
                                type="image/webp"/>
                        <source srcSet="/images/homeImg/hero-full.avif" type="image/avif"/>
                        <img ref={imgRef} className={s.img} src="/images/homeImg/hero-full.webp"
                             width={1672} height={940} alt="" fetchPriority="high" decoding="async"/>
                    </picture>
                </div>

                <div ref={cardRef} className={s.heroCard}>
                    <h2 data-hero-in>
                        <span>NFP</span>
                        {hero.cardTitle}
                    </h2>
                    <p data-hero-in>{hero.text}</p>
                    <div data-hero-in className={s.btnRow}>
                        <Link href="/about" className={`${s.btn} ${s.outline}`}>{hero.about}</Link>
                        <Link href="/contact" className={`${s.btn} ${s.primary}`}>{hero.cta}</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
