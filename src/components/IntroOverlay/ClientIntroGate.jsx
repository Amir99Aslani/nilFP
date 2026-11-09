"use client";

import React, { useEffect, useState } from "react";
import IntroOverlay from "./IntroOverlay";

import {Toaster} from "react-hot-toast";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const KEY = "tb_intro_seen_v1";

export default function ClientIntroGate({ children }) {
    // "pending" = haven't decided yet, "intro" = intro is playing, "done" = show the site
    const [phase, setPhase] = useState("pending");

    useEffect(() => {
        const seen = sessionStorage.getItem(KEY);
        const shouldShow =
            !seen &&
            window.screen.availWidth > 1000 &&
            Date.now() - Number(localStorage.getItem("onceADay")) > 1.224e+8;

        setPhase(shouldShow ? "intro" : "done");
    }, []);

    return (
        <>
            {phase === "intro" && (
                <IntroOverlay
                    logo="/logo.svg"
                    onFinish={() => {
                        sessionStorage.setItem(KEY, "1");
                        localStorage.setItem("onceADay", Date.now());
                        setPhase("done");
                    }}
                />
            )}

            <div style={{display: "contents", visibility: phase === "done" ? "visible" : "hidden"}}>
                <Header/>
                {children}
                <Footer/>
                <Toaster/>
            </div>
        </>
    );
}