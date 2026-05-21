import { Heart, Image, MessageCircle, Music, Sparkles, MapPin, Gamepad2, ListTodo } from 'lucide-react';

const PACKAGE_FEATURES = {
  basic: [
    { label: 'จดหมายรัก', icon: MessageCircle },
    { label: 'รูปของเรา', icon: Image },
    { label: 'เพลงของเธอ', icon: Music },
    { label: 'ข้อความลับ', icon: Sparkles }
  ],
  standard: [
    { label: 'จดหมายรัก', icon: MessageCircle },
    { label: 'ความทรงจำ', icon: Image },
    { label: 'สิ่งที่ฉันรัก', icon: Heart },
    { label: 'มินิเกมหัวใจ', icon: Gamepad2 },
    { label: 'ฉลองครบรอบ', icon: Sparkles }
  ],
  premium: [
    { label: 'จดหมายรัก', icon: MessageCircle },
    { label: 'แผนที่ความรัก', icon: MapPin },
    { label: 'คำสัญญาของเรา', icon: ListTodo },
    { label: 'มินิเกมคู่รัก', icon: Gamepad2 },
    { label: 'เพลง & ความลับ', icon: Sparkles }
  ]
};

export function Hero({ couple, hero, activePackage = 'premium' }) {
  const features = PACKAGE_FEATURES[activePackage] || PACKAGE_FEATURES.premium;

  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p className="hero-subtitle">{hero.subtitle}</p>
        <div className="couple-chip" aria-label="ชื่อคู่รัก">
          <Heart size={18} fill="currentColor" />
          <span>
            {couple.nameOne} + {couple.nameTwo}
          </span>
          <span>{couple.anniversary}</span>
        </div>
      </div>

      <div className="hero-showcase" aria-label="ของขวัญที่ส่งให้คนรัก">
        <div className="gift-preview-card">
          <div className="gift-top">
            <span>For {couple.nameTwo}</span>
          </div>
          <div className="browser-hero">
            <div className="polaroid-stack">
              <figure className="polaroid polaroid-one">
                <img src="/memory-walk.png" alt="ภาพความทรงจำวันเดินด้วยกัน" />
                <figcaption>ความทรงจำของเรา</figcaption>
              </figure>
              <figure className="polaroid polaroid-two">
                <img src="/memory-night.png" alt="ภาพคืนที่ได้นั่งคุยด้วยกัน" />
                <figcaption>วันที่อยากจำ</figcaption>
              </figure>
            </div>
            <div className="phone-preview">
              <div className="phone-notch" />
              <Heart className="phone-heart" size={18} fill="currentColor" />
              <h3>ถึงเธอ</h3>
              <p>{couple.shortLine}</p>
              <div className="round-photo">
                <img src="/memory-meal.png" alt="รูปมื้อโปรดของเรา" />
              </div>
            </div>
          </div>
          <div className="feature-bar" aria-label="สิ่งที่อยู่ในของขวัญ">
            {features.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <span key={idx}>
                  <IconComp size={18} /> {item.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
