import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FaAppleAlt } from '@react-icons/all-files/fa/FaAppleAlt';
import { FaCar } from '@react-icons/all-files/fa/FaCar';
import { FaCheckCircle } from '@react-icons/all-files/fa/FaCheckCircle';
import { FaClipboardList } from '@react-icons/all-files/fa/FaClipboardList';
import { FaCog } from '@react-icons/all-files/fa/FaCog';
import { FaFileAlt } from '@react-icons/all-files/fa/FaFileAlt';
import { FaHeadset } from '@react-icons/all-files/fa/FaHeadset';
import { FaShip } from '@react-icons/all-files/fa/FaShip';
import { FaSolarPanel } from '@react-icons/all-files/fa/FaSolarPanel';
import { FaTractor } from '@react-icons/all-files/fa/FaTractor';
import { FaTruck } from '@react-icons/all-files/fa/FaTruck';
import { images } from '@/content/images';
import { getContent, getProduct } from '@/content';
import { en } from '@/content/en';
import { isLocale, locales } from '@/i18n/config';
import { pageMetadata } from '@/lib/metadata';
import LocaleLink from '@/components/LocaleLink';
import FaqList from '@/components/home/FaqList';
import PageAnimations from '@/components/home/PageAnimations';
import ContactForm from '@/components/contact/ContactForm';
import ProductGallery from '@/components/products/ProductGallery';
import d from '@/components/products/ProductDetail.module.scss';

type Props = { params: Promise<{ locale: string; slug: string }> };

const productIcons = { car: FaCar, food: FaAppleAlt, machinery: FaTractor, solar: FaSolarPanel, truck: FaTruck, parts: FaCog };
const factIcons = { clipboard: FaClipboardList, ship: FaShip, file: FaFileAlt, headset: FaHeadset };

export function generateStaticParams() {
    return locales.flatMap((locale) => en.productDetails.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    if (!isLocale(locale)) return {};
    const product = getProduct(getContent(locale), slug);
    if (!product) return {};
    return pageMetadata({ locale, path: `/products/${slug}`, title: `${product.name} | ${getContent(locale).nav.brand}`, description: product.summary });
}

export default async function ProductPage({ params }: Props) {
    const { locale, slug } = await params;
    if (!isLocale(locale)) notFound();
    const c = getContent(locale);
    const t = c.productPage;
    const product = getProduct(c, slug);
    if (!product) notFound();

    const gallery = product.images ?? [images.intro, images.hero, images.aboutPrinciples, images.faq];
    const related = c.productDetails.filter((p) => p.slug !== product.slug).slice(0, 3);

    // Structured data (no price: we do not sell online)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.summary,
        category: product.category,
        brand: { '@type': 'Organization', name: c.nav.brand },
        inLanguage: locale,
    };

    return (
        <>
            <PageAnimations />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

            {/* Breadcrumb + overview */}
            <section className={`${d.top} ${d.wrap}`}>
                <nav aria-label={t.breadcrumb} className={d.crumbs}>
                    <ol>
                        <li><LocaleLink href="/">{t.crumbs.home}</LocaleLink></li>
                        <li><LocaleLink href="/products">{t.crumbs.products}</LocaleLink></li>
                        <li aria-current="page">{product.name}</li>
                    </ol>
                </nav>

                <div className={d.intro} data-keep-layout>
                    <div className={d.introText} data-stagger>
                        <span className={d.tag}>{product.category}</span>
                        <h1>{product.name}</h1>
                        <p className={d.lead}>{product.intro}</p>
                        <dl className={d.specs}>
                            {product.specs.map((s) => (
                                <div key={s.label} className={d.spec}>
                                    <dt>{s.label}</dt>
                                    <dd>{s.value}</dd>
                                </div>
                            ))}
                        </dl>
                        <div className={d.cta}>
                            <a href="#quote" className={`${d.btn} ${d.primary}`}>{t.quote}</a>
                            <LocaleLink href="/contact" className={`${d.btn} ${d.outline}`}>{t.ask}</LocaleLink>
                        </div>
                    </div>
                    <div data-reveal="right">
                        <ProductGallery images={gallery} alt={product.name} label={t.gallery} pictureOf={t.pictureOf} />
                    </div>
                </div>

                <ul className={d.facts} data-stagger="grid">
                    {t.facts.map((f) => {
                        const Icon = factIcons[f.icon as keyof typeof factIcons];
                        return (
                            <li key={f.title}>
                                <Icon size={26} aria-hidden="true" />
                                <h3>{f.title}</h3>
                                <p>{f.text}</p>
                            </li>
                        );
                    })}
                </ul>
            </section>

            {/* Specifications & features (dark) */}
            <section className={d.band}>
                <div className={d.wrap}>
                    <h2 data-reveal="up">{t.specsTitle}</h2>
                    <p className={d.bandLead} data-reveal="up">{t.specsText}</p>
                    <div className={d.rows} data-stagger>
                        {product.details.map((row, i) => (
                            <div key={row.title} className={d.row}>
                                <span className={d.num}>{i + 1}</span>
                                <h3>{row.title}</h3>
                                <p>{row.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How a request works */}
            <section className={`${d.how} ${d.wrap}`}>
                <h2 className={d.centerTitle} data-reveal="up">{t.howTitle}</h2>
                <p className={d.centerLead} data-reveal="up">{t.howText}</p>
                <ol className={d.steps} data-stagger="grid">
                    {t.steps.map((s, i) => (
                        <li key={s.title}>
                            <span className={d.stepNum}>{i + 1}</span>
                            <h3>{s.title}</h3>
                            <p>{s.text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Quote form (dark) */}
            <section id="quote" className={d.quote}>
                <div className={`${d.quoteGrid} ${d.wrap}`}>
                    <div className={d.quoteText} data-reveal="up">
                        <h2>{t.quoteTitle(product.name)}</h2>
                        <p>{t.quoteText}</p>
                        <ul>
                            {t.include.map((item) => (
                                <li key={item}>
                                    <FaCheckCircle size={18} aria-hidden="true" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div data-reveal="up">
                        <ContactForm copy={c.contact.form} defaults={{ type: product.quoteType, message: `Product: ${product.name}\n\n` }} />
                    </div>
                </div>
            </section>

            {/* Other areas */}
            <section className={`${d.related} ${d.wrap}`}>
                <h2 className={d.centerTitle} data-reveal="up">{t.relatedTitle}</h2>
                <div className={d.relatedGrid} data-stagger="grid">
                    {related.map((p) => {
                        const Icon = productIcons[p.icon];
                        return (
                            <LocaleLink key={p.slug} href={`/products/${p.slug}`} className={d.relatedCard}>
                                <div className={d.relatedImg}><Icon size={44} aria-hidden="true" /></div>
                                <div className={d.relatedBody}>
                                    <h3>{p.name}</h3>
                                    <p>{p.summary}</p>
                                    <span>{t.viewDetails} →</span>
                                </div>
                            </LocaleLink>
                        );
                    })}
                </div>
            </section>

            {/* FAQ */}
            <section className={`${d.faq} ${d.wrap}`}>
                <div className={d.faqGrid} data-keep-layout>
                    <div className={d.faqImg} data-reveal="left">
                        <img src={images.faq} alt="" />
                    </div>
                    <div className={d.faqList}>
                        <h2 data-reveal="up">{t.faqTitle}</h2>
                        <div data-stagger>
                            <FaqList items={c.home.faq.items} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
