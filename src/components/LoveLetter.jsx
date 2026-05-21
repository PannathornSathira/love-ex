import { Heart } from 'lucide-react';
import { TypewriterText } from './TypewriterText.jsx';

export function LoveLetter({ letter, useTypewriter = false }) {
  return (
    <article className="love-letter">
      <div className="letter-pin">
        <Heart size={20} fill="currentColor" />
      </div>
      <p className="letter-intro">{letter.intro}</p>
      {letter.body.map((paragraph, index) => (
        <p key={index}>
          {useTypewriter ? (
            <TypewriterText text={paragraph} speed={30} />
          ) : (
            paragraph
          )}
        </p>
      ))}
      <p className="letter-signature">
        {useTypewriter ? <TypewriterText text={letter.signature} speed={50} /> : letter.signature}
      </p>
    </article>
  );
}

