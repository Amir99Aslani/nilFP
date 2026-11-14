import Link from 'next/link';
import {FaAppleAlt} from '@react-icons/all-files/fa/FaAppleAlt';
import {FaCar} from '@react-icons/all-files/fa/FaCar';
import {FaCog} from '@react-icons/all-files/fa/FaCog';
import {FaSolarPanel} from '@react-icons/all-files/fa/FaSolarPanel';
import {FaTractor} from '@react-icons/all-files/fa/FaTractor';
import {FaTruck} from '@react-icons/all-files/fa/FaTruck';
import {images} from '@/content/images';
import {home} from '@/content/home';
import FaqList from '@/components/home/FaqList';
import s from '../components/home/Home.module.scss';
import CtaSection from "@/components/home/CtaSection";
import ProcessSection from "@/components/home/ProcessSection";
import HeroSection from "@/components/home/HeroSection";
import PageAnimations from "@/components/home/PageAnimations";
import ActivitiesGrid from "@/components/home/ActivitiesGrid";

const icons = {car: FaCar, food: FaAppleAlt, machinery: FaTractor, solar: FaSolarPanel, truck: FaTruck, parts: FaCog};

export default function HomePage() {

    const {hero, intro, activities, trust, process, cta, faq} = home;


    return (
        <>
            <PageAnimations/>

            <HeroSection hero={hero}/>

            <section className={`${s.intro} ${s.wrap}`}>
                <div className={s.introGrid}>
                    <div data-stagger>
                        <h2 className={s.h2}>{intro.title}</h2>
                        <p>{intro.text}</p>
                        <div className={s.btnRow}>
                            <Link href="/about" className={`${s.btn} ${s.outline}`}>{intro.about}</Link>
                            <Link href="/contact" className={`${s.btn} ${s.primary}`}>{intro.cta}</Link>
                        </div>
                    </div>
                    <div className={s.introImg} data-reveal="right"><img className={s.img} src={images.intro} alt=""/></div>
                </div>
            </section>

            <section id="services" className={s.dark}>
                <div className={s.wrap}>
                    <h2 className={s.h2} data-reveal="up">{activities.title}</h2>
                    <p className={s.lead} data-reveal="up">{activities.text}</p>

                    <ActivitiesGrid
                        items={activities.items}
                        showAll={activities.showAll}
                        showLess={activities.showLess}
                    />

                </div>
            </section>

            <section className={`${s.trust} ${s.wrap}`}>
                <div className={s.trustGrid}>
                    <div className={s.trustImg} data-hang><img className={s.img} src={images.container} alt=""
                                                               style={{objectFit: 'contain'}}/></div>
                    <div className={s.textContainer} data-stagger>
                        <h2 className={s.h2}>{trust.title}</h2>
                        <p>{trust.text}</p>
                        <div className={s.stats}>
                            {trust.stats.map((x) => (
                                <div key={x.label}><strong data-count>{x.value}</strong><span>{x.label}</span></div>))}
                        </div>
                        <Link href="/contact" className={`${s.btn} ${s.primary}`}>{trust.cta}</Link>
                    </div>
                </div>
            </section>

            <ProcessSection process={process} />

            <CtaSection cta={cta}/>

            <section className={`${s.faq} ${s.wrap}`}>
                <div className={s.faqGrid}>
                    <div className={s.faqImg} data-reveal="left"><img className={s.img} src={images.faq} alt=""/></div>
                    <div className={s.faqList}>
                        <h2 className={s.h2} data-reveal="up">{faq.title}</h2>
                        <div data-stagger>
                            <FaqList items={faq.items}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
