import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { images } from '@/content/images';
import { getContent } from '@/content';
import { isLocale } from '@/i18n/config';
import { pageMetadata } from '@/lib/metadata';
import FaqList from '@/components/home/FaqList';
import PageAnimations from '@/components/home/PageAnimations';
import ContactForm from '@/components/contact/ContactForm';
import c from '@/components/contact/Contact.module.scss';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale)) return {};
    const { meta } = getContent(locale).contact;
    return pageMetadata({ locale, path: '/contact', title: meta.title, description: meta.description });
}

// Same questions as the home page, in the order of the Contact design
const faqOrder = [0, 1, 3, 4, 5, 2];

export default async function ContactPage({ params }: Props) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const c0 = getContent(locale);
    const contact = c0.contact;
    const faqItems = faqOrder.map((i) => c0.home.faq.items[i]);

    return (
        <>
            <PageAnimations />

            {/* Intro: title, map and contact cards */}
            <section className={`${c.intro} ${c.wrap}`}>
                <div className={c.head} data-reveal="up">
                    <h1>{contact.title}</h1>
                    <p>{contact.subtitle}</p>
                </div>
                <div className={c.top} data-keep-layout>
                    <div className={c.map} data-reveal="left">
                        <img className={c.mapImg} src={images.contactMap} alt="" />
                        <img className={c.pin} src={images.contactPin} alt="" />
                        <span className={c.mapLabel}>{contact.mapLabel}</span>
                    </div>
                    <div className={c.cards} data-stagger>
                        {contact.cards.map((card) => (
                            <div key={card.title} className={c.card}>
                                <h3>{card.title}</h3>
                                <p>{card.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Request form (dark) with the open container artwork on desktop */}
            <section className={c.formBand}>
                <div className={c.wrap}>
                    <div className={c.formHead} data-reveal="up">
                        <h2>{contact.form.title}</h2>
                        <p>{contact.form.text}</p>
                    </div>
                    <div className={c.stage}>
                        <img className={c.art} src={images.contactArt} alt="" />
                        <ContactForm copy={contact.form} />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className={`${c.faq} ${c.wrap}`}>
                <div className={c.faqGrid} data-keep-layout>
                    <div className={c.faqImg} data-reveal="left">
                        <img src={images.faq} alt="" />
                    </div>
                    <div className={c.faqList}>
                        <h2 data-reveal="up">{contact.faqTitle}</h2>
                        <div data-stagger>
                            <FaqList items={faqItems} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
