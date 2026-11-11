"use client";

import React, {useEffect, useRef} from "react";
import gsap from "gsap";
import styles from "./IntroOverlay.module.scss";
import ElephantPieces from "../../assets/images/ElephantPieces";

const BRAND_TEXT = "NilFP";

// All times in seconds
const T = {
    pieces: 0,          // pieces start flying in (stagger makes it last ~2.9s)
    elephantOut: 3.3,   // assembled elephant fades away
    logoIn: 3.7,        // logo pops in
    typeStart: 4.2,
    typeDuration: 0.8,
    lineIn: 5.0,        // underline grows after typing
    overlayFade: 5.9,
    overlayFadeDuration: 0.8,
};

function prefersReducedMotion() {
    return (
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

export default function IntroOverlay({onFinish, onReveal, logo, zIndex = 9999}) {
    const rootRef = useRef(null);
    const svgRef = useRef(null);
    const logoRef = useRef(null);
    const textRef = useRef(null);
    const lineRef = useRef(null);

    const finishedRef = useRef(false);
    const onFinishRef = useRef(onFinish);
    const onRevealRef = useRef(onReveal);
    const tlRef = useRef(null);

    useEffect(() => {
        onFinishRef.current = onFinish;
        onRevealRef.current = onReveal;
    }, [onFinish, onReveal]);

    const finish = () => {
        if (finishedRef.current) return;
        finishedRef.current = true;
        onRevealRef.current?.();
        onFinishRef.current?.();
    };

    const skip = () => {
        tlRef.current?.kill();
        onRevealRef.current?.(); // show the page right away, it appears under the fading overlay
        gsap.to(rootRef.current, {
            opacity: 0,
            duration: 0.35,
            overwrite: true,
            onComplete: finish,
        });
    };

    useEffect(() => {
        // Lock scroll while the intro is visible
        const html = document.documentElement;
        const prevOverflow = html.style.overflow;
        html.style.overflow = "hidden";

        if (prefersReducedMotion()) {
            finish();
            return () => {
                html.style.overflow = prevOverflow;
            };
        }

        const ctx = gsap.context(() => {
            const pieces = gsap.utils.toArray(svgRef.current.children);
            const textEl = textRef.current;
            const counter = {n: 0};

            const tl = gsap.timeline({onComplete: finish});
            tlRef.current = tl;

            // 1) Puzzle pieces fly in and assemble the elephant
            tl.fromTo(
                pieces,
                {
                    x: (i, el) => +el.dataset.x,
                    y: (i, el) => +el.dataset.y,
                    rotation: (i, el) => +el.dataset.r,
                    scale: 0.6,
                    opacity: 0,
                },
                {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    opacity: 0.85,
                    duration: 1.1,
                    ease: "power3.out",
                    stagger: {each: 0.045},
                },
                T.pieces
            );

            // 2) Elephant fades out
            tl.to(
                svgRef.current,
                {opacity: 0, scale: 0.94, duration: 0.6, ease: "power2.inOut"},
                T.elephantOut
            );

            // 3) Logo pops in
            if (logoRef.current) {
                tl.fromTo(
                    logoRef.current,
                    {opacity: 0, scale: 0.5, y: 12},
                    {opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.7)"},
                    T.logoIn
                );
            }

            // 4) Brand name types in
            tl.set(textEl.parentNode, {opacity: 1}, T.typeStart);
            tl.to(
                counter,
                {
                    n: BRAND_TEXT.length,
                    duration: T.typeDuration,
                    ease: "none",
                    snap: {n: 1},
                    onUpdate: () => {
                        textEl.textContent = BRAND_TEXT.slice(0, counter.n);
                    },
                },
                T.typeStart
            );

            // 5) Underline grows
            tl.fromTo(
                lineRef.current,
                {scaleX: 0},
                {scaleX: 1, duration: 0.5, ease: "power3.out"},
                T.lineIn
            );

            // 6) The page is revealed (hero starts animating) exactly when the overlay starts to fade
            tl.call(() => onRevealRef.current?.(), undefined, T.overlayFade);

            // 7) Whole overlay fades out
            tl.to(
                rootRef.current,
                {opacity: 0, duration: T.overlayFadeDuration, ease: "power1.inOut"},
                T.overlayFade
            );
        }, rootRef);

        return () => {
            ctx.revert();
            html.style.overflow = prevOverflow;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={rootRef} className={styles.intro} style={{zIndex}} aria-hidden="true">
            <ElephantPieces
                ref={svgRef}
                className={styles.elephant}
                pieceClassName={styles.piece}
            />

            <div className={styles.brand}>
                {logo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img ref={logoRef} src={logo} alt="" className={styles.logo}/>
                )}
                <div className={styles.textWrap}>
                    <span ref={textRef} className={styles.text}/>
                    <span className={styles.cursor}/>
                </div>
                <div ref={lineRef} className={styles.line}/>
            </div>

            <button type="button" className={styles.skip} onClick={skip}>
                Skip
            </button>
        </div>
    );
}
