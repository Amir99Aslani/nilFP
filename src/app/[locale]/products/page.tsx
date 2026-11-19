import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { images } from '@/content/images';
import { getContent } from '@/content';
import { isLocale } from '@/i18n/config';
import { pageMetadata } from '@/lib/metadata';
import LocaleLink from '@/components/LocaleLink';
import FaqList from '@/components/home/FaqList';
import PageAnimations from '@/components/home/PageAnimations';
import ProductsBrowser from '@/components/products/ProductsBrowser';
import p from '@/components/products/Products.module.scss';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale)) return {};
    const { meta } = getContent(locale).products;
    return pageMetadata({ locale, path: '/products', title: meta.title, description: meta.description });
}

// Left to right: slices of the sprite image (food, wheel, machinery, solar, logistics)
const boxOffsets = ['-8.66%', '-110.33%', '-213.66%', '-318.21%', '-421.44%'];

export default async function ProductsPage({ params }: Props) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const c = getContent(locale);
    const { products } = c;
    const { hero, areas, services } = products;

    return (
        <>
            <PageAnimations />

            {/* Hero: container artwork + five product boxes */}
            <section
                className={p.hero}
                style={{ ['--hero-bg' as string]: `url(${images.productsHero})`, ['--hero-bg-m' as string]: `url(${images.productsHeroMobile})` }}
            >
                <div className={p.heroInner}>
                    <div className={p.heroText} data-reveal="up">
                        <h1>{hero.title}</h1>
                        <p>{hero.text}</p>
                        <div className={p.heroBtns} data-keep-layout>
                            <LocaleLink href="/contact" className={`${p.btn} ${p.outline}`}>{hero.quote}</LocaleLink>
                            <LocaleLink href="/about#areas" className={`${p.btn} ${p.primary}`}>{hero.collab}</LocaleLink>
                        </div>
                    </div>
                    <div className={p.boxes} data-keep-layout aria-hidden="true">
                        {boxOffsets.map((left) => (
                            <span key={left} className={p.box}>
                                <img src={images.productsBoxes} alt="" style={{ left }} />
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Areas of activity */}
            <section id="areas" className={`${p.areas} ${p.wrap}`}>
                <h2 className={p.h2} data-reveal="up">{areas.title}</h2>
                <ProductsBrowser
                    categories={areas.categories}
                    items={areas.items}
                    labels={{ search: areas.search, empty: areas.empty, showAll: areas.showAll, showLess: areas.showLess, request: areas.request }}
                />
            </section>

            {/* Specialized services (dark) */}
            <section className={p.band}>
                <div className={`${p.bandInner} ${p.wrap}`} data-keep-layout>
                    <div className={p.steps} data-stagger>
                        {services.items.map((s, i) => (
                            <div key={s.title} className={p.step}>
                                <div className={p.stepHead}>
                                    <span className={p.badge}>{i + 1}</span>
                                    <h3>{s.title}</h3>
                                </div>
                                <p>{s.text}</p>
                            </div>
                        ))}
                    </div>
                    <div className={p.bandText} data-reveal="up">
                        <h2>{services.title}</h2>
                        <p>{services.text}</p>
                        <div className={p.bandBtns}>
                            <LocaleLink href="/contact" className={`${p.btn} ${p.ghost}`}>{services.consult}</LocaleLink>
                            <LocaleLink href="/contact" className={`${p.btn} ${p.light}`}>{services.start}</LocaleLink>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className={`${p.faq} ${p.wrap}`}>
                <div className={p.faqGrid} data-keep-layout>
                    <div className={p.faqImg} data-reveal="left">
                        <img src={images.faq} alt="" />
                    </div>
                    <div className={p.faqList}>
                        <h2 data-reveal="up">{products.faqTitle}</h2>
                        <div data-stagger>
                            <FaqList items={c.home.faq.items} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
