import type { Metadata } from 'next';
import { images } from '@/content/images';
import { home } from '@/content/home';
import { contact } from '@/content/contact';
import FaqList from '@/components/home/FaqList';
import PageAnimations from '@/components/home/PageAnimations';
import ContactForm from '@/components/contact/ContactForm';
import c from '@/components/contact/Contact.module.scss';

export const metadata: Metadata = {
    title: 'Contact Us | NIL FARASOYE PARS',
    description: 'Get in touch with Nil Farasoye Pars: send a business request, or find our phone, working hours and address.',
};

// Same questions as the home page, in the order of the Contact design
const faqItems = [0, 1, 3, 4, 5, 2].map((i) => home.faq.items[i]);

export default function ContactPage() {
    return (
        <>
            <PageAnimations />

            {/* Intro: title, map and contact cards */}
            <section className={`${c.intro} ${c.wrap}`}>
                <div className={c.head} data-reveal="up">
                    <h1>{contact.title}</h1>
                    <p>{contact.subtitle}</p>
                </div>
                <div className={c.top}>
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
                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className={`${c.faq} ${c.wrap}`}>
                <div className={c.faqGrid}>
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
