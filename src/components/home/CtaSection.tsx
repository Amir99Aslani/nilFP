"use client";

import {useEffect, useRef} from "react";
import Link from "next/link";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import ElephantPieces from "../../assets/images/ElephantPieces";
import s from "./Home.module.scss";

gsap.registerPlugin(ScrollTrigger);

// How visible the assembled elephant is behind the text (0 - 1)
const END_OPACITY = 0.5;

type Props = {
    cta: { title: string; text: string; button: string };
};

export default function CtaSection({cta}: Props) {
    const sectionRef = useRef<HTMLElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const svg = svgRef.current;
        if (!section || !svg) return;

        const mm = gsap.matchMedia();

        // Normal users: pieces are tied to scroll
        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const pieces = gsap.utils.toArray<SVGPathElement>(svg.children);

            gsap.timeline({
                defaults: {ease: "power3.out"},
                scrollTrigger: {
                    trigger: section,
                    start: "center 100%",       // begins when the section enters the screen
                    end: "center center",   // elephant is complete when the section is centered
                    scrub: 1,               // smooths the link between scroll and animation
                    // pin: true, end: "+=1200",   // <- uncomment to hold the section while it assembles
                },
            }).fromTo(
                pieces,
                {
                    x: (_: number, el: SVGPathElement) => Number(el.dataset.x),
                    y: (_: number, el: SVGPathElement) => Number(el.dataset.y),
                    rotation: (_: number, el: SVGPathElement) => Number(el.dataset.r),
                    scale: 0.6,
                    opacity: 0,
                },
                {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    opacity: END_OPACITY,
                    duration: 1,
                    stagger: {each: 0.05},
                }
            );
        });

        // Reduced motion: just show the finished elephant
        mm.add("(prefers-reduced-motion: reduce)", () => {
            gsap.set(svg.children, {opacity: END_OPACITY});
        });

        return () => mm.revert();
    }, []);

    return (
        <section ref={sectionRef} className={s.cta}>
            <ElephantPieces ref={svgRef} className={s.ctaPuzzle}/>
            <div className={`${s.ctaBody} ${s.wrap}`}>
                <h2 className={s.h2}>{cta.title}</h2>
                <p>{cta.text}</p>
                <Link href="/contact" className={`${s.btn} ${s.primary}`}>{cta.button}</Link>
            </div>
        </section>
    );
}
