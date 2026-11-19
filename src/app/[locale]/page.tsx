import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { images } from '@/content/images';
import { getContent } from '@/content';
import { isLocale } from '@/i18n/config';
import { pageMetadata } from '@/lib/metadata';
import LocaleLink from '@/components/LocaleLink';
import FaqList from '@/components/home/FaqList';
import ActivitiesGrid from '@/components/home/ActivitiesGrid';
import CtaSection from '@/components/home/CtaSection';
import ProcessSection from '@/components/home/ProcessSection';
import HeroSection from '@/components/home/HeroSection';
import PageAnimations from '@/components/home/PageAnimations';
import s from '@/components/home/Home.module.scss';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    if (!isLocale(locale)) return {};
    const { meta } = getContent(locale).home;
    return pageMetadata({ locale, path: '', title: meta.title, description: meta.description });
}

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    if (!isLocale(locale)) notFound();
    const { hero, intro, activities, trust, process, cta, faq } = getContent(locale).home;

    return (
        <>
            <PageAnimations />

            <HeroSection hero={hero} />

            <section className={`${s.intro} ${s.wrap}`}>
                <div className={s.introGrid}>
                    <div data-stagger>
                        <h2 className={s.h2}>{intro.title}</h2>
                        <p>{intro.text}</p>
                        <div className={s.btnRow}>
                            <LocaleLink href="/about" className={`${s.btn} ${s.outline}`}>{intro.about}</LocaleLink>
                            <LocaleLink href="/contact" className={`${s.btn} ${s.primary}`}>{intro.cta}</LocaleLink>
                        </div>
                    </div>
                    <div className={s.introImg} data-reveal="right"><img className={s.img} src={images.intro} alt="" /></div>
                </div>
            </section>

            <section id="services" className={s.dark}>
                <div className={s.wrap}>
                    <h2 className={s.h2} data-reveal="up">{activities.title}</h2>
                    <p className={s.lead} data-reveal="up">{activities.text}</p>
                    <ActivitiesGrid items={activities.items} showAll={activities.showAll} showLess={activities.showLess} />
                </div>
            </section>

            <section className={`${s.trust} ${s.wrap}`}>
                <div className={s.trustGrid} data-keep-layout>
                    <div className={s.trustImg} data-hang>
                        <img className={s.img} src={images.container} alt="" style={{ objectFit: 'contain' }} />
                    </div>
                    <div className={s.textContainer} data-stagger>
                        <h2 className={s.h2}>{trust.title}</h2>
                        <p>{trust.text}</p>
                        <div className={s.stats}>
                            {trust.stats.map((x) => (
                                <div key={x.label}><strong data-count>{x.value}</strong><span>{x.label}</span></div>
                            ))}
                        </div>
                        <LocaleLink href="/contact" className={`${s.btn} ${s.primary}`}>{trust.cta}</LocaleLink>
                    </div>
                </div>
            </section>

            <ProcessSection process={process} />

            <CtaSection cta={cta} />

            <section className={`${s.faq} ${s.wrap}`}>
                <div className={s.faqGrid} data-keep-layout>
                    <div className={s.faqImg} data-reveal="left"><img className={s.img} src={images.faq} alt="" /></div>
                    <div className={s.faqList}>
                        <h2 className={s.h2} data-reveal="up">{faq.title}</h2>
                        <div data-stagger>
                            <FaqList items={faq.items} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
