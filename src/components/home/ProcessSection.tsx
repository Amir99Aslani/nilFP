'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { images } from '@/content/images';
import s from './Home.module.scss';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
    process: { title: string; text: string; steps: { title: string; text: string }[] };
};

const ROPE_LIFT = 4; // rope length (px) while the hook is pulled up and travelling
const ROPE_OVERLAP = 6; // how far the hook tip dips into the top of the card when it grabs it

// --- Speed -----------------------------------------------------------------
// 1 = old speed (~2.3s per move). 1.5 = about 1s. Raise it to make the hook even faster.
const SPEED = 1.5;

// --- Card pick-up effect ---------------------------------------------------
const LIFT = 18; // px the card rises when the hook picks it up
const LIFT_SCALE = 1.03; // the picked card gets slightly bigger
const SHADOW_REST = '0 2px 6px 0 rgba(0,0,0,0.18)';
const SHADOW_LIFT = '0 30px 44px -12px rgba(0,0,0,0.55)';
const GRAB_EASE = 'back.out(1.8)'; // rope and card share it, so they move as one

export default function ProcessSection({ process }: Props) {
    const { title, text, steps } = process;
    const count = steps.length;
    const [active, setActive] = useState(count - 1); // same as the design: the last card starts active

    const sectionRef = useRef<HTMLElement>(null);
    const railRef = useRef<HTMLDivElement>(null);
    const hookRef = useRef<HTMLDivElement>(null);
    const swingRef = useRef<HTMLDivElement>(null);
    const ropeRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLImageElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const timeline = useRef<gsap.core.Timeline | null>(null);
    const activeRef = useRef(active);
    const enabled = useRef({ on: false, animate: true });
    const ready = useRef(false); // false until the entrance (cards -> hook -> first grab) has played

    const allCards = () => cardRefs.current.filter(Boolean) as HTMLDivElement[];

    // Rope length that lets the hook reach the top of the cards (card at rest).
    // It follows the rail → card distance: more padding-top on .steps = longer rope.
    const ropeRest = () => {
        const rail = railRef.current;
        const body = bodyRef.current;
        if (!rail || !body) return 40;
        const gap = parseFloat(getComputedStyle(rail).paddingTop);
        return Math.max(ROPE_LIFT + 8, (gap - body.offsetHeight + ROPE_OVERLAP) + 12);
    };

    // Rope length while the card is lifted: shorter by exactly how far the card's top rose
    const ropeHold = (card: HTMLElement, rest: number) => {
        const scaleRise = (card.offsetHeight * (LIFT_SCALE - 1)) / 2;
        return Math.max(2, rest - LIFT - scaleRise);
    };

    // x position that centres the hook over a card
    const hookX = (index: number) => {
        const hook = hookRef.current;
        const card = cardRefs.current[index];
        if (!hook || !card) return 0;
        return card.offsetLeft + card.offsetWidth / 2 - hook.offsetWidth / 2;
    };

    // Pull the rope up, travel along the rail, pay the rope out and pick up the card.
    // `intro` = first move after the entrance: the hook is idle above the first card, nothing to put down
    const place = (index: number, instant: boolean, intro = false) => {
        const hook = hookRef.current;
        const card = cardRefs.current[index];
        if (!hook || !card) return;

        const x = hookX(index);
        const rest = ropeRest();
        const hold = ropeHold(card, rest);
        const others = allCards().filter((c) => c !== card);

        if (instant) {
            timeline.current?.kill();
            gsap.set(hook, { x });
            gsap.set(ropeRef.current, { height: hold });
            gsap.set(swingRef.current, { rotation: 0 });
            gsap.set(others, { y: 0, scale: 1, boxShadow: SHADOW_REST });
            gsap.set(card, { y: -LIFT, scale: LIFT_SCALE, boxShadow: SHADOW_LIFT });
            return;
        }

        const from = Number(gsap.getProperty(hook, 'x'));
        timeline.current?.kill();

        const tl = gsap.timeline();
        timeline.current = tl;
        tl.timeScale(SPEED);

        // 1) Whatever card was held is set back down (also cleans up if the last move was interrupted)
        tl.to(others, { y: 0, scale: 1, boxShadow: SHADOW_REST, duration: 0.3, ease: 'power2.in' }, 0);

        // Hook is already above this card: just pick it up again
        if (Math.abs(x - from) < 1) {
            tl.to(ropeRef.current, { height: hold, duration: 0.4, ease: GRAB_EASE }, 0);
            tl.to(card, { y: -LIFT, scale: LIFT_SCALE, boxShadow: SHADOW_LIFT, duration: 0.4, ease: GRAB_EASE }, 0);
            return;
        }

        const dir = Math.sign(x - from) || 1;
        const o = intro ? -0.3 : 0; // skip the "set the old card down" beat on the intro move

        if (!intro) {
            tl.to(ropeRef.current, { height: rest, duration: 0.3, ease: 'power2.in' }, 0); // rope pays out as the card lands
        }

        tl
            .to(ropeRef.current, { height: ROPE_LIFT, duration: 0.35, ease: 'power2.inOut' }, 0.3 + o) // reel the rope in
            .to(swingRef.current, { rotation: -dir * 4, duration: 0.4, ease: 'power2.out' }, 0.3 + o) // hook lags behind
            .to(hook, { x, duration: 0.55, ease: 'power3.inOut' }, 0.4 + o) // trolley travels along the rail
            .to(swingRef.current, { rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' }, 0.9 + o) // pendulum settles
            .to(ropeRef.current, { height: rest + 6, duration: 0.3, ease: 'power2.in' }, 0.75 + o) // rope pays out over the card
            // 2) Pick-up: rope shortens and the card rises together, with a growing shadow
            .to(ropeRef.current, { height: hold, duration: 0.4, ease: GRAB_EASE }, 1.05 + o)
            .to(
                card,
                { y: -LIFT, scale: LIFT_SCALE, boxShadow: SHADOW_LIFT, duration: 0.4, ease: GRAB_EASE },
                1.05 + o
            );
    };

    useEffect(() => {
        activeRef.current = active;
        if (enabled.current.on && ready.current) place(active, !enabled.current.animate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    useEffect(() => () => timeline.current?.kill(), []);

    // Desktop only: entrance + resize handling
    useGSAP(
        () => {
            const rail = railRef.current;
            if (!rail) return;

            const mm = gsap.matchMedia();
            mm.add(
                { desktop: '(min-width: 901px)', reduce: '(prefers-reduced-motion: reduce)' },
                (ctx) => {
                    const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };
                    if (!desktop) return;

                    enabled.current = { on: true, animate: !reduce };

                    let firstResize = true;
                    const ro = new ResizeObserver(() => {
                        if (firstResize) return void (firstResize = false); // skip the initial callback
                        if (ready.current) place(activeRef.current, true);
                        else gsap.set(hookRef.current, { x: hookX(0) }); // entrance not played yet: keep the start spot correct
                    });
                    ro.observe(rail);

                    if (reduce) {
                        // No motion: show the finished state right away
                        ready.current = true;
                        place(activeRef.current, true);
                        gsap.set(hookRef.current, { autoAlpha: 1 });
                    } else {
                        // Start state: cards at rest, hook hidden and waiting above the first card, rope pulled up
                        const cards = allCards();
                        gsap.set(cards, { y: 0, scale: 1, boxShadow: SHADOW_REST });
                        gsap.set(hookRef.current, { x: hookX(0), autoAlpha: 0 });
                        gsap.set(ropeRef.current, { height: ROPE_LIFT });
                        gsap.set(swingRef.current, { rotation: 0 });

                        // Entrance: 1) all cards rise  2) the hook appears  3) it travels to the active card and picks it up
                        gsap
                            .timeline({ scrollTrigger: { trigger: rail, start: 'top 80%', once: true } })
                            .from(cards, {
                                y: 48,
                                autoAlpha: 0,
                                duration: 0.8,
                                stagger: 0.1,
                                ease: 'power3.out',
                            })
                            .fromTo(
                                hookRef.current,
                                { autoAlpha: 0, y: -40 },
                                { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                                '+=0.15'
                            )
                            .add(() => {
                                ready.current = true;
                                place(activeRef.current, false, true);
                            }, '+=0.1');
                    }

                    return () => {
                        enabled.current = { on: false, animate: true };
                        ready.current = false;
                        ro.disconnect();
                        timeline.current?.kill();
                        // give the cards back to your CSS on mobile
                        gsap.set(allCards(), { clearProps: 'transform,boxShadow' });
                    };
                }
            );

            return () => mm.revert();
        },
        { scope: sectionRef }
    );

    return (
        <section ref={sectionRef} className={s.dark}>
            <div className={s.wrap}>
                <h2 className={s.h2}>{title}</h2>
                <p className={s.lead}>{text}</p>

                <div ref={railRef} className={s.steps}>
                    {/* Crane trolley + hook (decorative, desktop only) */}
                    <div ref={hookRef} className={s.hook} aria-hidden="true">
                        <span className={s.trolley} />
                        <div ref={swingRef} className={s.hookSwing}>
                            <div
                                ref={ropeRef}
                                className={s.hookRope}
                                style={{ backgroundImage: `url(${images.hookRope})` }}
                            />
                            <img ref={bodyRef} src={images.hookBody} alt="" />
                        </div>
                    </div>

                    {steps.map((step, i) => (
                        <div
                            key={step.title}
                            ref={(el) => {
                                cardRefs.current[i] = el;
                            }}
                            className={s.step}
                            tabIndex={0}
                            data-active={i === active}
                            aria-current={i === active ? 'step' : undefined}
                            onPointerEnter={() => setActive(i)}
                            onFocus={() => setActive(i)}
                            onClick={() => setActive(i)}
                            onKeyDown={(e) => {
                                const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : i;
                                if (next !== i && next >= 0 && next < count) cardRefs.current[next]?.focus();
                            }}
                        >
                            <img src={images.process[i]} alt="" />
                            <h3>{step.title}</h3>
                            <p>{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


