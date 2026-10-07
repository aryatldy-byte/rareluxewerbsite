import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import Expertise from '@/components/Expertise';
import Faq from '@/components/Faq';
import { DEFAULTS, igHandle } from '@/lib/contact';

const occasions = [
  ['Birthdays', 'Milestone celebrations with considered styling, lighting and table design.'],
  ['Anniversaries', 'Intimate, candle-lit settings for the years worth marking.'],
  ['Bride-to-be', 'Bridal showers and pre-wedding gatherings, styled in full.'],
  ['Groom-to-be', 'Refined, relaxed setups for the evenings before the big day.'],
  ['Retirements', 'A graceful send-off with stage, florals and a memory wall.'],
  ['Event management', 'Full planning, coordination and on-the-day support, so you can enjoy your own event.'],
  ['Corporate events', 'Polished setups for launches, conferences, award nights and team celebrations.'],
  ['Property rentals', 'Grand, beautiful spaces ready to host your guest list.'],
];

export default function Home() {
  return (
    <>
      <Hero />
      <section className="sec intro">
        <Reveal>
          <p className="kicker-text">From the first idea to the last toast, RareLuxe Rentals plans, styles and manages every detail, so you can simply enjoy the day.</p>
        </Reveal>
      </section>

      <section className="sec narrow">
        <Reveal>
          <h2>Best rental &amp; event management service provider in Aluva, Pukkattupady, Kochi</h2>
          <p className="lead">We are a leading Best Rental Service Provider specializing in party equipment, décor, functional decorations, and complete event management in Aluva, Pukattupady, Kochi. Whether you’re hosting a wedding, birthday, or corporate event, we make your celebrations stress-free and memorable.</p>
        </Reveal>
        <Reveal><h2>Our expertise</h2></Reveal>
        <Expertise />
        <Reveal>
          <p className="closing">For reliable party equipment, décor rental, and event management services in Aluva, Pukattupady, Kochi, and surrounding areas, contact us today. Let us help make your event truly unforgettable!</p>
        </Reveal>
      </section>

      <section className="sec">
        <Reveal><h2>Celebrations we style</h2></Reveal>
        <div className="list-grid">
          {occasions.map(([t, d], n) => (
            <Reveal key={t} delay={n * 60} className="occ">
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="feature">
        <div className="feature-img" style={{ backgroundImage: 'url(/hero/hero-2.jpg)' }} />
        <Reveal className="feature-txt">
          <h2>Events and décor that feel like a room you never want to leave.</h2>
          <p>Event planning, florals, linen, candlelight and grand spaces, composed together for an effect that photographs as beautifully as it feels.</p>
          <a className="btn" href="/about">Our story</a>
        </Reveal>
      </section>

      <Faq />

      <section className="sec visit">
        <Reveal>
          <h2>Visit us</h2>
          <p className="lead">{DEFAULTS.address}</p>
          <div className="row center">
            <a className="btn" href="tel:+919778473339">Call {DEFAULTS.phone}</a>
            <a className="btn ghost" href={DEFAULTS.map_url} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
            <a className="btn ghost" href={DEFAULTS.instagram} target="_blank" rel="noopener noreferrer">Instagram {igHandle(DEFAULTS.instagram)}</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
