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

    // Rope length that lets the hook reach the top of the cards.
    // It follows the rail → card distance: more padding-top on .steps = longer rope.
    const ropeRest = () => {
        const rail = railRef.current;
        const body = bodyRef.current;
        if (!rail || !body) return 40;
        const gap = parseFloat(getComputedStyle(rail).paddingTop);
        return Math.max(ROPE_LIFT + 8, (gap - body.offsetHeight + ROPE_OVERLAP) + 12 );
    };

    // Pull the rope up, travel along the rail, pay the rope out and grab the card
    const place = (index: number, instant: boolean) => {
        const hook = hookRef.current;
        const card = cardRefs.current[index];
        if (!hook || !card) return;

        const x = card.offsetLeft + card.offsetWidth / 2 - hook.offsetWidth / 2;
        const rest = ropeRest();

        if (instant) {
            timeline.current?.kill();
            gsap.set(hook, { x });
            gsap.set(ropeRef.current, { height: rest });
            gsap.set(swingRef.current, { rotation: 0 });
            return;
        }

        const from = Number(gsap.getProperty(hook, 'x'));
        if (Math.abs(x - from) < 1) return;

        timeline.current?.kill();
        const dir = Math.sign(x - from) || 1;
        timeline.current = gsap
            .timeline()
            .to(ropeRef.current, { height: ROPE_LIFT, duration: 0.4, ease: 'power2.inOut' }) // reel the rope in
            .to(swingRef.current, { rotation: -dir * 4, duration: 0.5, ease: 'power2.out' }, 0.1) // hook lags behind
            .to(hook, { x, duration: 0.8, ease: 'power3.inOut' }, 0.25) // trolley travels along the rail
            .to(swingRef.current, { rotation: 0, duration: 1.1, ease: 'elastic.out(1, 0.3)' }, 1.0) // pendulum settles
            .to(ropeRef.current, { height: rest + 6, duration: 0.55, ease: 'power2.in' }, 0.8) // long rope pays out
            .to(ropeRef.current, { height: rest, duration: 0.5, ease: 'elastic.out(1, 0.5)' }, '>'); // grab + small bounce
    };

    useEffect(() => {
        activeRef.current = active;
        if (enabled.current.on) place(active, !enabled.current.animate);
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
                    place(activeRef.current, true);
                    gsap.set(hookRef.current, { autoAlpha: 1 });

                    let firstResize = true;
                    const ro = new ResizeObserver(() => {
                        if (firstResize) return void (firstResize = false); // skip the initial callback
                        place(activeRef.current, true);
                    });
                    ro.observe(rail);

                    if (!reduce) {
                        // Entrance: cards rise, then the hook comes down from the top on a growing rope
                        gsap
                            .timeline({ scrollTrigger: { trigger: rail, start: 'top 80%', once: true } })
                            .from(cardRefs.current.filter(Boolean), {
                                y: 48,
                                autoAlpha: 0,
                                duration: 0.8,
                                stagger: 0.1,
                                ease: 'power3.out',
                            })
                            .from(ropeRef.current, { height: 0, duration: 1.4, ease: 'power3.out' }, '-=0.3');
                    }

                    return () => {
                        enabled.current = { on: false, animate: true };
                        ro.disconnect();
                        timeline.current?.kill();
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
