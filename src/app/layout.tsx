import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../styles/globals.scss';
import React from "react";
import localFont from "next/font/local";
import { Open_Sans } from "next/font/google";

// Persian / Urdu only
const peyda = localFont({
    src: [
        { path: "../assets/fonts/PeydaFaNumWeb-Regular.woff", weight: "400", style: "normal" },
        { path: "../assets/fonts/PeydaFaNumWeb-Bold.woff", weight: "700", style: "normal" },
        { path: "../assets/fonts/PeydaFaNumWeb-ExtraBold.woff", weight: "800", style: "normal" },
    ],
    variable: "--font-peyda",
    display: "swap",
    preload: false,
});

// English / German (and the Latin text inside other pages)
const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-open-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: 'NIL FARASOYE PARS | Global Trade & Business Partnerships',
    description: 'Nil Farasoye Pars provides a platform to explore international trade solutions and connect businesses across global markets.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${peyda.variable} ${openSans.variable}`}>
        <body suppressHydrationWarning>
        <Header/>
        <main>{children}</main>
        <Footer/>
        </body>
        </html>
    );
}