import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../styles/globals.scss';
import React from "react";

export const metadata: Metadata = {
  title: 'NIL FARASOYE PARS | Global Trade & Business Partnerships',
  description: 'Nil Farasoye Pars provides a platform to explore international trade solutions and connect businesses across global markets.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
