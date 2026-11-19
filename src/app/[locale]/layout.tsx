import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Open_Sans, Noto_Sans_Arabic } from 'next/font/google';
import localFont from 'next/font/local';
import { isLocale, localeMeta, locales } from '@/i18n/config';
import { getContent } from '@/content';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ClientIntroGate from '@/components/IntroOverlay/ClientIntroGate';
import '@/styles/globals.scss';

// Persian / Arabic script. Not preloaded: the browser only downloads it on pages that use it.
const peyda = localFont({
    src: [
        { path: '../../assets/fonts/PeydaFaNumWeb-Regular.woff', weight: '400', style: 'normal' },
        { path: '../../assets/fonts/PeydaFaNumWeb-Bold.woff', weight: '700', style: 'normal' },
        { path: '../../assets/fonts/PeydaFaNumWeb-ExtraBold.woff', weight: '800', style: 'normal' },
    ],
    variable: '--font-peyda',
    display: 'swap',
    preload: false,
});

// English / German and the Latin text inside other pages
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans', display: 'swap' });

// Arabic. Not preloaded: only downloaded on /ar pages.
const notoArabic = Noto_Sans_Arabic({ subsets: ['arabic', 'latin'], variable: '--font-noto-arabic', display: 'swap', preload: false });

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const c = getContent(locale);
    const meta = localeMeta[locale];

    return (
        <html lang={meta.htmlLang} dir={meta.dir} className={`${peyda.variable} ${openSans.variable} ${notoArabic.variable}`}>
            <body suppressHydrationWarning>
                <ClientIntroGate
                    header={<Header locale={locale} nav={c.nav} />}
                    footer={<Footer footer={c.footer} brand={c.nav.brand} />}
                >
                    <main>{children}</main>
                </ClientIntroGate>
            </body>
        </html>
    );
}
