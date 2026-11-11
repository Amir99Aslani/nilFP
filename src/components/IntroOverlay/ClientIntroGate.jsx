"use client";

import React, { useEffect, useState } from "react";
import IntroOverlay from "./IntroOverlay";

import {Toaster} from "react-hot-toast";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const KEY = "tb_intro_seen_v1";

export default function ClientIntroGate({ children }) {
    // revealed = the page is visible (and the hero may start animating)
    // overlay  = the intro overlay is mounted (it keeps fading for a moment after the page is revealed)
    const [revealed, setRevealed] = useState(false);
    const [overlay, setOverlay] = useState(false);

    useEffect(() => {
        const seen = sessionStorage.getItem(KEY);
        const shouldShow =
            !seen &&
            window.screen.availWidth > 1000 &&
            Date.now() - Number(localStorage.getItem("onceADay")) > 1.224e+8;

        if (shouldShow) setOverlay(true);
        else setRevealed(true);
    }, []);

    // Tell the rest of the page (hero etc.) that it can start animating
    useEffect(() => {
        if (!revealed) return;
        document.documentElement.dataset.introDone = "1";
        window.dispatchEvent(new Event("intro:done"));
    }, [revealed]);

    return (
        <>
            {overlay && (
                <IntroOverlay
                    logo="/logo.svg" // optional, remove the prop if you don't want a logo
                    onReveal={() => setRevealed(true)}
                    onFinish={() => {
                        sessionStorage.setItem(KEY, "1");
                        localStorage.setItem("onceADay", Date.now());
                        setOverlay(false);
                    }}
                />
            )}

            {/* Always rendered, so Next can see page.tsx. Hidden until revealed. */}
            <div style={{display: "contents", visibility: revealed ? "visible" : "hidden"}}>
                <Header/>
                {children}
                <Footer/>
                <Toaster/>
            </div>
        </>
    );
}
