'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true }); // mobile address bar must not trigger refresh storms

/**
 * One small component drives the scroll animations of the whole home page.
 * The sections stay server-rendered; you just mark elements with data attributes:
 *
 *   data-reveal="up | left | right | zoom | fade"   one element fades/slides in
 *   data-stagger  (or "grid")                       its children come in one after another
 *   data-count                                      "+52" counts up from 0
 *   data-hang                                       hanging object: drops on its rope, swings, then idles
 */

const EASE = 'power3.out';

export default function PageAnimations() {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // everything stays visible

        const wide = window.innerWidth > 900;
        const D = wide ? 56 : 24; // slide distance in px

        const all = <T extends HTMLElement = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);

        const ctx = gsap.context((self) => {
            /* ---------- 1) Start states, applied immediately so nothing flashes ---------- */
            const from: Record<string, gsap.TweenVars> = {
                up: { y: D },
                left: { x: -D },
                right: { x: D },
                zoom: { scale: 0.94, y: D / 2 },
                fade: {},
            };

            const reveals = all('[data-reveal]');
            reveals.forEach((el) => gsap.set(el, { autoAlpha: 0, ...from[el.dataset.reveal || 'up'] }));

            // Children of a group. If the group holds a single wrapper (e.g. <FaqList/>),
            // animate the wrapper's children instead.
            const childrenOf = (el: HTMLElement) => {
                let kids = Array.from(el.children) as HTMLElement[];
                if (kids.length === 1 && kids[0].children.length > 1) kids = Array.from(kids[0].children) as HTMLElement[];
                return kids;
            };

            const groups = all('[data-stagger]').map((el) => {
                const targets = childrenOf(el);
                const grid = el.dataset.stagger === 'grid';
                const icons = grid ? Array.from(el.querySelectorAll('svg')) : [];
                gsap.set(targets, { autoAlpha: 0, y: D * 0.6 });
                if (icons.length) gsap.set(icons, { scale: 0.4, rotation: -25 });
                return { el, targets, grid, icons };
            });

            const counters = all('[data-count]').flatMap((el) => {
                // keep the original text, so React strict mode / re-runs never read "+0"
                const original = el.dataset.countOriginal ?? (el.dataset.countOriginal = (el.textContent || '').trim());
                const m = original.match(/^(\D*)(\d+)(\D*)$/);
                if (!m) return [];
                el.textContent = `${m[1]}0${m[3]}`;
                return [{ el, pre: m[1], target: Number(m[2]), post: m[3] }];
            });

            const hangs = all('[data-hang]');
            hangs.forEach((el) => gsap.set(el, { autoAlpha: 0, y: -140, transformOrigin: '50% 0%' }));

            /* ---------- 2) Triggers: created once the intro overlay is done ---------- */
            let started = false;
            const run = () => {
                if (started) return;
                started = true;

                // `self` is the context itself (the `ctx` const does not exist yet if run() fires right away)
                self.add(() => {
                    // Single elements: batched, so items entering together get a small stagger
                    if (reveals.length) {
                        ScrollTrigger.batch(reveals, {
                            start: 'top 88%',
                            once: true,
                            interval: 0.1,
                            batchMax: 4,
                            onEnter: (els) =>
                                gsap.to(els, {
                                    autoAlpha: 1, x: 0, y: 0, scale: 1,
                                    duration: 0.9, ease: EASE, stagger: 0.1, overwrite: true,
                                }),
                        });
                    }

                    // Groups
                    groups.forEach(({ el, targets, grid, icons }) => {
                        ScrollTrigger.create({
                            trigger: el,
                            start: 'top 85%',
                            once: true,
                            onEnter: () => {
                                gsap.to(targets, {
                                    autoAlpha: 1, y: 0, duration: 0.8, ease: EASE,
                                    stagger: grid ? { each: 0.08, grid: 'auto', from: 'start' } : 0.1,
                                });
                                if (icons.length) {
                                    gsap.to(icons, {
                                        scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(2)', delay: 0.25,
                                        stagger: { each: 0.08, grid: 'auto', from: 'start' },
                                    });
                                }
                            },
                        });
                    });

                    // Number counters
                    counters.forEach(({ el, pre, target, post }) => {
                        const obj = { v: 0 };
                        ScrollTrigger.create({
                            trigger: el,
                            start: 'top 90%',
                            once: true,
                            onEnter: () =>
                                gsap.to(obj, {
                                    v: target, duration: 1.6, ease: 'power2.out', snap: { v: 1 },
                                    onUpdate: () => { el.textContent = `${pre}${obj.v}${post}`; },
                                }),
                        });
                    });

                    // Hanging object (the container on the crane hook)
                    hangs.forEach((el) => {
                        const trigger = el.parentElement || el; // measure the parent, the element itself is moving
                        let entered = false;
                        let inView = false;

                        // idle sway: runs only while the section is on screen
                        const sway = gsap
                            .timeline({ paused: true })
                            .to(el, { rotation: 1.2, duration: 1.6, ease: 'sine.inOut' })
                            .to(el, { rotation: -1.2, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });

                        const enter = gsap
                            .timeline({ paused: true })
                            .to(el, { y: 0, autoAlpha: 1, duration: 1.1, ease: EASE })
                            .fromTo(el, { rotation: 5 }, { rotation: 0, duration: 2.2, ease: 'elastic.out(1, 0.25)' }, 0.5)
                            .add(() => {
                                entered = true;
                                if (inView) sway.play();
                            });

                        ScrollTrigger.create({ trigger, start: 'top 80%', once: true, onEnter: () => enter.play() });
                        ScrollTrigger.create({
                            trigger,
                            start: 'top bottom',
                            end: 'bottom top',
                            onToggle: (st) => {
                                inView = st.isActive;
                                if (!entered) return;
                                if (inView) sway.play();
                                else sway.pause();
                            },
                        });
                    });
                });
            };

            // wait for the intro overlay (same signal the hero uses)
            if (document.documentElement.dataset.introDone === '1') run();
            else window.addEventListener('intro:done', run, { once: true });
            const safety = window.setTimeout(run, 10000);

            // Layout can change after images load: refresh trigger positions (debounced)
            let refreshCall: gsap.core.Tween | undefined;
            const ro = new ResizeObserver(() => {
                refreshCall?.kill();
                refreshCall = gsap.delayedCall(0.2, () => ScrollTrigger.refresh());
            });
            ro.observe(document.body);

            return () => {
                window.removeEventListener('intro:done', run);
                window.clearTimeout(safety);
                refreshCall?.kill();
                ro.disconnect();
            };
        });

        return () => ctx.revert();
    }, []);

    return null;
}
