import { useEffect, useState } from 'react';

export function TypewriterText({ text, speed = 35 }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let index = 0;
    let timer;

    function type() {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
        timer = setTimeout(type, speed);
      }
    }

    type();
    return () => clearTimeout(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}
