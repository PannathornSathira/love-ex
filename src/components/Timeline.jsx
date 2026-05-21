import { HeartHandshake } from 'lucide-react';

export function Timeline({ events }) {
  return (
    <div className="timeline">
      {events.map((event) => (
        <article className="timeline-item" key={event.title}>
          <div className="timeline-icon">
            <HeartHandshake size={20} />
          </div>
          <div>
            <p>{event.date}</p>
            <h3>{event.title}</h3>
            <span>{event.description}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
