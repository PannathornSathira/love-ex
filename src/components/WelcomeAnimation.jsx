import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export function WelcomeAnimation({ activePackage, packageName }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2200); // Animation runs for 2.2s

    return () => clearTimeout(timer);
  }, [activePackage]);

  if (!visible) return null;

  return (
    <div className={`welcome-overlay ${visible ? 'fade-in-active' : ''}`}>
      <div className="welcome-box">
        <div className="welcome-heart-container">
          <Heart className="welcome-heart" size={80} fill="currentColor" />
          <div className="heart-halo halo-one" />
          <div className="heart-halo halo-two" />
        </div>
        <p className="welcome-eyebrow">ยินดีต้อนรับสู่เดโม</p>
        <h2 className="welcome-package-name">{packageName}</h2>
        <span className="welcome-tip">กำลังโหลดองค์ประกอบหน้าเว็บ...</span>
      </div>
    </div>
  );
}
