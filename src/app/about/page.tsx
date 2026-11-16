import type {Metadata} from 'next';
import Link from 'next/link';
import {images} from '@/content/images';
import {home} from '@/content/home';
import {about} from '@/content/about';
import AreasGrid from '@/components/about/AreasGrid';
import PageAnimations from '@/components/home/PageAnimations';
import h from '@/components/home/Home.module.scss'; // shared: buttons, trust block, headings
import a from '@/components/about/About.module.scss';

export const metadata: Metadata = {
    title: 'About Us | NIL FARASOYE PARS',
    description: 'Nil Farasoye Pars is a space for exploring collaboration capacities, business dialogue and international trade opportunities.',
};

export default function AboutPage() {
    const {hero, meaning, principles, areas, team, vision} = about;
    const {trust} = home;

    return (
        <>
            <PageAnimations/>

            {/* Intro + banner */}
            <section className={`${a.intro} ${a.wrap}`}>
                <h1 className={a.introTitle} data-reveal="up">{hero.title}</h1>
                <div className={a.descRow} data-reveal="up">
                    <p className={a.descText}>{hero.text}</p>
                    <div className={a.descBtns}>
                        <Link href="#areas" className={`${h.btn} ${h.outline}`}>{hero.areas}</Link>
                        <Link href="/contact" className={`${h.btn} ${h.primary}`}>{hero.cta}</Link>
                    </div>
                </div>
                <div className={a.banner} data-reveal="up">
                    <img src={images.aboutHero} alt=""/>
                </div>
            </section>

            {/* Meaningful relationships */}
            <section className={`${a.meaning} ${a.wrap}`}>
                <div className={a.meaningInner} data-stagger>
                    <h2 className={h.h2}>{meaning.title}</h2>
                    <p>{meaning.text}</p>
                    <Link href="/contact" className={`${h.btn} ${h.primary}`}>{meaning.cta}</Link>
                </div>
            </section>

            {/* Principles (dark) */}
            <section className={a.band}>
                <div className={h.wrap}>
                    <div className={a.pTop}>
                        <div className={a.pImg} data-reveal="left">
                            <img src={images.aboutPrinciples} alt=""/>
                        </div>
                        <div data-stagger>
                            <h2 className={h.h2}>{principles.title}</h2>
                            <p>{principles.text}</p>
                        </div>
                    </div>
                    <div className={a.pList} data-stagger>
                        {principles.items.map((item, i) => (
                            <div key={item.title} className={a.pRow}>
                                <span className={a.pNum}>{i + 1}</span>
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Beyond Borders (same block as the home page) */}
            <section className={`${h.trust} ${h.wrap}`}>
                <div className={h.trustGrid}>
                    <div className={h.trustImg} data-hang>
                        <img className={h.img} src={images.container} alt="" style={{objectFit: 'contain'}}/>
                    </div>
                    <div className={h.textContainer} data-stagger>
                        <h2 className={h.h2}>{trust.title}</h2>
                        <p>{trust.text}</p>
                        <div className={h.stats}>
                            {trust.stats.map((x) => (
                                <div key={x.label}><strong data-count>{x.value}</strong><span>{x.label}</span></div>
                            ))}
                        </div>
                        <Link href="/contact" className={`${h.btn} ${h.primary}`}>{trust.cta}</Link>
                    </div>
                </div>
            </section>

            {/* Areas of activity */}
            <section id="areas" className={`${a.areas} ${a.wrap}`}>
                <div className={a.areasHead} data-reveal="up">
                    <h2 className={h.h2}>{areas.title}</h2>
                    <p>{areas.text}</p>
                </div>
                <AreasGrid items={areas.items} showAll={areas.showAll} showLess={areas.showLess}/>
            </section>

            {/* Team (dark) */}
            <section className={a.band}>
                <div className={h.wrap}>
                    <h2 className={`${h.h2} ${a.teamTitle}`} data-reveal="up">{team.title}</h2>
                    <p className={a.teamText}>{team.text}</p>
                    <div className={a.teamGrid} data-stagger="grid">
                        {team.members.map((m, i) => (
                            <div key={`${m.name}-${i}`} className={a.member}>
                                <img src={images.aboutTeam} alt={m.name}/>
                                <h3>{m.name}</h3>
                                <p>{m.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision */}
            <section className={`${a.vision} ${a.wrap}`}>
                <div className={a.visionGrid}>
                    <div className={a.visionImg} data-reveal="left">
                        <img src={images.aboutVision} alt=""/>
                    </div>
                    <div className={a.visionText} data-stagger>
                        <h2 className={h.h2}>{vision.title}</h2>
                        <p className={a.visionLead}>{vision.text}</p>
                        {vision.cards.map((c) => (
                            <div key={c.title} className={a.card}>
                                <h3>{c.title}</h3>
                                <p>{c.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
