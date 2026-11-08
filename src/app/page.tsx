import Link from 'next/link';
import { FaAppleAlt } from '@react-icons/all-files/fa/FaAppleAlt';
import { FaCar } from '@react-icons/all-files/fa/FaCar';
import { FaCog } from '@react-icons/all-files/fa/FaCog';
import { FaSolarPanel } from '@react-icons/all-files/fa/FaSolarPanel';
import { FaTractor } from '@react-icons/all-files/fa/FaTractor';
import { FaTruck } from '@react-icons/all-files/fa/FaTruck';
import { images } from '@/content/images';
import { home } from '@/content/home';
import FaqList from '@/components/home/FaqList';
import s from '../components/home/Home.module.scss';

const icons = { car: FaCar, food: FaAppleAlt, machinery: FaTractor, solar: FaSolarPanel, truck: FaTruck, parts: FaCog };

export default function HomePage() {

  console.log("log : " + Object.keys(s));

  const { hero, intro, activities, trust, process, cta, faq } = home;
  return (
    <>
      <section className={`${s.hero} ${s.wrap} home`}>
        <h1>{hero.title}</h1>
        <div className={s.heroMedia}>
          <img className={s.img} src={images.hero} alt="" />
          <div className={s.heroCard}>
            <h2><span>NFP</span>{hero.cardTitle}</h2>
            <p>{hero.text}</p>
            <div className={s.btnRow}>
              <Link href="/about" className={`${s.btn} ${s.outline}`}>{hero.about}</Link>
              <Link href="/contact" className={`${s.btn} ${s.primary}`}>{hero.cta}</Link>
            </div>
          </div>
        </div>
      </section>

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
          <div className={s.introImg}><img className={s.img} src={images.intro} alt="" /></div>
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
                  <Icon size={26} />
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
          <div className={s.trustImg}><img className={s.img} src={images.container} alt="" style={{ objectFit: 'contain' }} /></div>
          <div>
            <h2 className={s.h2}>{trust.title}</h2>
            <p>{trust.text}</p>
            <div className={s.stats}>
              {trust.stats.map((x) => (<div key={x.label}><strong>{x.value}</strong><span>{x.label}</span></div>))}
            </div>
            <Link href="/contact" className={`${s.btn} ${s.primary}`}>{trust.cta}</Link>
          </div>
        </div>
      </section>

      <section className={s.dark}>
        <div className={s.wrap}>
          <h2 className={s.h2}>{process.title}</h2>
          <p className={s.lead}>{process.text}</p>
          <div className={s.steps}>
            {process.steps.map((p, i) => (
              <div key={p.title} className={s.step}>
                <img src={images.process[i]} alt="" />
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <img className={s.ctaBg} src={images.elephant} alt="" />
        <div className={`${s.ctaBody} ${s.wrap}`}>
          <h2 className={s.h2}>{cta.title}</h2>
          <p>{cta.text}</p>
          <Link href="/contact" className={`${s.btn} ${s.primary}`}>{cta.button}</Link>
        </div>
      </section>

      <section className={`${s.faq} ${s.wrap}`}>
        <div className={s.faqGrid}>
          <div className={s.faqImg}><img className={s.img} src={images.faq} alt="" /></div>
          <div className={s.faqList}>
            <h2 className={s.h2}>{faq.title}</h2>
            <FaqList items={faq.items} />
          </div>
        </div>
      </section>
    </>
  );
}
