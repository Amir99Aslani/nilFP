"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import IntroOverlay from "./IntroOverlay";

import {Toaster} from "react-hot-toast";

const KEY = "tb_intro_seen_v1";

// header / footer are rendered by the server layout (they need the locale) and passed in here.
export default function ClientIntroGate({ children, header, footer }) {
    // revealed = the page is visible (and the hero may start animating)
    // overlay  = the intro overlay is mounted (it keeps fading for a moment after the page is revealed)
    const [revealed, setRevealed] = useState(false);
    const [overlay, setOverlay] = useState(false);

    const pathname = usePathname();

    // Tell the rest of the page (hero, PageAnimations) that it can start animating.
    const signalDone = () => {
        document.documentElement.dataset.introDone = "1";
        window.dispatchEvent(new Event("intro:done"));
    };

    // Decide before the first paint, so a remount (language switch) never shows a hidden page for a frame.
    // The intro plays once per browser session: the key is written as soon as it starts, so a language
    // switch in the middle of the intro does not start it again.
    useLayoutEffect(() => {
        const seen = sessionStorage.getItem(KEY);
        const shouldShow =
            !seen &&
            window.screen.availWidth > 1000 &&
            Date.now() - Number(localStorage.getItem("onceADay")) > 1.224e+8;

        if (shouldShow) {
            sessionStorage.setItem(KEY, "1");
            setOverlay(true);
        } else {
            setRevealed(true);
            signalDone(); // skipped: signal right away, nobody waits for the 10s safety timer
        }
    }, []);

    // Revealed by the overlay, and again after every client navigation (the layout can stay mounted on a
    // language switch while the new page's hero / PageAnimations mount and wait for the signal).
    useEffect(() => {
        if (revealed) signalDone();
    }, [revealed, pathname]);

    return (
        <>
            {overlay && (
                <IntroOverlay
                    logo="/logo.svg" // optional, remove the prop if you don't want a logo
                    onReveal={() => setRevealed(true)}
                    onFinish={() => {
                        localStorage.setItem("onceADay", Date.now());
                        setOverlay(false);
                    }}
                />
            )}

            {/* Always rendered, so Next can see page.tsx. Hidden until revealed. */}
            <div style={{display: "contents", visibility: revealed ? "visible" : "hidden"}}>
                {header}
                {children}
                {footer}
                <Toaster/>
            </div>
        </>
    );
}
