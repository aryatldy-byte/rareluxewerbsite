import Reveal from '@/components/Reveal';
import Expertise from '@/components/Expertise';
export const metadata = {
  title: 'About Us — Event Management, Décor & Party Rentals in Kochi',
  description: 'RareLuxe Rentals is a premium event management, party equipment and décor rental company in Aluva, Pukkattupady, Kochi, making weddings, birthdays and corporate events stress-free.',
  alternates: { canonical: '/about' },
};

const steps = [
  ['Enquire', 'Share the occasion, date and guest count with us on WhatsApp.'],
  ['Plan', 'We plan the event, venue, theme and décor with you, within your budget.'],
  ['Style', 'Our team installs lighting, florals, linen and finishing touches.'],
  ['Celebrate', 'You enjoy the day while we manage every detail around you.'],
];

export default function About() {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: 'url(/hero/hero-1.jpg)' }}>
        <div className="hero-shade" />
        <h1>About us</h1>
      </section>
      <section className="sec narrow">
        <Reveal>
          <p className="lead">RareLuxe Rentals is a premium event management, décor and rental company. We turn life's milestones into polished, personal celebrations, from the first idea to the last guest leaving.</p>
        </Reveal>
        <Reveal><p>We are a leading Best Rental Service Provider specializing in party equipment, décor, functional decorations, and complete event management in Aluva, Pukattupady, Kochi. Whether you’re hosting a wedding, birthday, or corporate event, we make your celebrations stress-free and memorable.</p></Reveal>
        <Reveal><h2>Our expertise</h2></Reveal>
        <Expertise />
        <Reveal><p className="closing">For reliable party equipment, décor rental, and event management services in Aluva, Pukattupady, Kochi, and surrounding areas, contact us today. Let us help make your event truly unforgettable!</p></Reveal>
        <div className="two-up">
          <Reveal className="panel"><h3>Our mission</h3><p>To make beautifully planned events easy, stress-free and unmistakably yours, with attention to detail at every step.</p></Reveal>
          <Reveal className="panel" delay={100}><h3>What we do</h3><p>Event management and planning, décor and styling, party equipment rental, and premium property rentals for birthdays, anniversaries, retirements, bride-to-be and groom-to-be celebrations.</p></Reveal>
        </div>
        <Reveal><h2>How it works</h2></Reveal>
        <ol className="timeline">
          {steps.map(([t, d], n) => (
            <Reveal as="li" key={t} delay={n * 80}><b>{t}</b><span>{d}</span></Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
