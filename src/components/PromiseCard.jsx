import { Check, Heart } from 'lucide-react';

export function PromiseCard({ promise }) {
  return (
    <aside className="promise-card">
      <div className="promise-heading">
        <Heart size={22} fill="currentColor" />
        <h3>{promise.title}</h3>
      </div>
      {promise.items.map((item) => (
        <div className="promise-item" key={item}>
          <Check size={18} />
          <span>{item}</span>
        </div>
      ))}
    </aside>
  );
}
