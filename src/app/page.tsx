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

const icons = {car: FaCar, food: FaAppleAlt, machinery: FaTractor, solar: FaSolarPanel, truck: FaTruck, parts: FaCog};

export default function HomePage() {

    const {hero, intro, activities, trust, process, cta, faq} = home;


    return (
        <>

            <HeroSection hero={hero}/>

            <section className={`${s.intro} ${s.wrap}`}>
                <div className={s.introGrid}>
                    <div>
                        <h2 className={s.h2}>{intro.title}</h2>
                        <p>{intro.text}</p>
                        <div className={s.btnRow}>
                            <Link href="/about" className={`${s.btn} ${s.outline}`}>{intro.about}</Link>
                            <Link href="/contact" className={`${s.btn} ${s.primary}`}>{intro.cta}</Link>
                        </div>
                    </div>
                    <div className={s.introImg}><img className={s.img} src={images.intro} alt=""/></div>
                </div>
            </section>

            <section id="services" className={s.dark}>
                <div className={s.wrap}>
                    <h2 className={s.h2}>{activities.title}</h2>
                    <p className={s.lead}>{activities.text}</p>
                    <div className={s.grid6}>
                        {activities.items.map((a) => {
                            const Icon = icons[a.icon as keyof typeof icons];
                            return (
                                <div key={a.title} className={s.cell}>
                                    <Icon size={26}/>
                                    <h3>{a.title}</h3>
                                    <p>{a.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className={`${s.trust} ${s.wrap}`}>
                <div className={s.trustGrid}>
                    <div className={s.trustImg}><img className={s.img} src={images.container} alt=""
                                                     style={{objectFit: 'contain'}}/></div>
                    <div className={s.textContainer}>
                        <h2 className={s.h2}>{trust.title}</h2>
                        <p>{trust.text}</p>
                        <div className={s.stats}>
                            {trust.stats.map((x) => (
                                <div key={x.label}><strong>{x.value}</strong><span>{x.label}</span></div>))}
                        </div>
                        <Link href="/contact" className={`${s.btn} ${s.primary}`}>{trust.cta}</Link>
                    </div>
                </div>
            </section>

            <ProcessSection process={process} />

            <CtaSection cta={cta}/>

            <section className={`${s.faq} ${s.wrap}`}>
                <div className={s.faqGrid}>
                    <div className={s.faqImg}><img className={s.img} src={images.faq} alt=""/></div>
                    <div className={s.faqList}>
                        <h2 className={s.h2}>{faq.title}</h2>
                        <FaqList items={faq.items}/>
                    </div>
                </div>
            </section>
        </>
    );
}
