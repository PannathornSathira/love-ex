import { Camera } from 'lucide-react';

export function Gallery({ photos }) {
  return (
    <div className="gallery-grid">
      {photos.map((photo, index) => (
        <article className={`memory-card tone-${photo.tone}`} key={photo.title}>
          <div className="memory-image">
            <img src={photo.image} alt={photo.title} />
            <span>{String(index + 1).padStart(2, '0')}</span>
          </div>
          <div className="memory-copy">
            <Camera size={18} />
            <h3>{photo.title}</h3>
            <p>{photo.caption}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
