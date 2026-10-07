import Reveal from './Reveal';

export const faqs = [
  ['Do you provide event management in Aluva and Kochi?', 'Yes. RareLuxe Rentals provides event management along with party equipment, décor and functional décor rental in Aluva, Pukkattupady, Kochi and surrounding areas.'],
  ['What party equipment can I rent?', 'We rent chairs, tables, lighting, sound systems and more for weddings, birthdays, anniversaries, corporate events and other functions.'],
  ['Which events do you decorate?', 'Weddings, receptions, birthdays, anniversaries, retirements, bride-to-be and groom-to-be parties, corporate events and other functions, with elegant themes and customizable setups.'],
  ['How do I book RareLuxe Rentals?', 'Use the Book now button on this site, message us on WhatsApp, or call +91 97784 73339 with your event type and date.'],
];

export default function Faq() {
  const ld = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  return (
    <section className="sec narrow">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Reveal><h2>Frequently asked questions</h2></Reveal>
      <div className="faq">
        {faqs.map(([q, a]) => (
          <details key={q}><summary>{q}</summary><p>{a}</p></details>
        ))}
      </div>
    </section>
  );
}
