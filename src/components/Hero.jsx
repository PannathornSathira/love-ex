import { ChevronRight, Heart, Image, MessageCircle, Music, Sparkles } from 'lucide-react';

export function Hero({ couple, hero }) {
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
        <div className="hero-actions">
          <a className="pill-button large" href="#letter">
            {hero.primaryCta}
            <ChevronRight size={18} />
          </a>
          <a className="ghost-button" href="#gallery">
            {hero.secondaryCta}
          </a>
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
            <span>
              <MessageCircle size={18} /> จดหมาย
            </span>
            <span>
              <Image size={18} /> รูปของเรา
            </span>
            <span>
              <Music size={18} /> เพลงของเธอ
            </span>
            <span>
              <Sparkles size={18} /> ข้อความลับ
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
