import type { Metadata } from 'next';
import Link from 'next/link';
import { images } from '@/content/images';
import { home } from '@/content/home';
import { products } from '@/content/products';
import FaqList from '@/components/home/FaqList';
import PageAnimations from '@/components/home/PageAnimations';
import ProductsBrowser from '@/components/products/ProductsBrowser';
import p from '@/components/products/Products.module.scss';

export const metadata: Metadata = {
    title: 'Products & Services | NIL FARASOYE PARS',
    description: 'Our areas of activity: food export, vehicle and machinery imports, solar equipment, logistics and specialized trade services.',
};

// Left to right: slices of the sprite image (food, wheel, machinery, solar, logistics)
const boxOffsets = ['-8.66%', '-110.33%', '-213.66%', '-318.21%', '-421.44%'];

export default function ProductsPage() {
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
                        <div className={p.heroBtns}>
                            <Link href="/contact" className={`${p.btn} ${p.outline}`}>{hero.quote}</Link>
                            <Link href="/about#areas" className={`${p.btn} ${p.primary}`}>{hero.collab}</Link>
                        </div>
                    </div>
                    <div className={p.boxes} aria-hidden="true">
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
                <div className={`${p.bandInner} ${p.wrap}`}>
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
                            <Link href="/contact" className={`${p.btn} ${p.ghost}`}>{services.consult}</Link>
                            <Link href="/contact" className={`${p.btn} ${p.light}`}>{services.start}</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className={`${p.faq} ${p.wrap}`}>
                <div className={p.faqGrid}>
                    <div className={p.faqImg} data-reveal="left">
                        <img src={images.faq} alt="" />
                    </div>
                    <div className={p.faqList}>
                        <h2 data-reveal="up">{products.faqTitle}</h2>
                        <div data-stagger>
                            <FaqList items={home.faq.items} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
