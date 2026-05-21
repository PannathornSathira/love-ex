import { Heart } from 'lucide-react';

export function LoveLetter({ letter }) {
  return (
    <article className="love-letter">
      <div className="letter-pin">
        <Heart size={20} fill="currentColor" />
      </div>
      <p className="letter-intro">{letter.intro}</p>
      {letter.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p className="letter-signature">{letter.signature}</p>
    </article>
  );
}
