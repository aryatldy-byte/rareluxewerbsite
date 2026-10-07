import Reveal from './Reveal';
const items = [
  ['🎊', 'Event Management', 'End-to-end planning, coordination and on-the-day support for weddings, birthdays and corporate events.'],
  ['🎈', 'Party Equipment Rental', 'Chairs, tables, lighting, sound systems, and more.'],
  ['✨', 'Party Décor Rental', 'Elegant themes, vibrant decorations, and customizable setups.'],
  ['🎉', 'Functional Décor Rental', 'Stunning decorations for weddings, receptions, and other functions.'],
];
export default function Expertise() {
  return (
    <div className="expertise">
      {items.map(([e, t, d], n) => (
        <Reveal key={t} delay={n * 90} className="panel">
          <span className="emoji">{e}</span>
          <h3>{t}</h3>
          <p>{d}</p>
        </Reveal>
      ))}
    </div>
  );
}
