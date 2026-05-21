import { useState } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

const REASONS = [
  {
    id: 1,
    title: 'รอยยิ้มของเธอ 😊',
    description: 'รอยยิ้มของเธอเป็นพลังงานบวกที่ดีที่สุดในวันของเรา แค่เห็นเธอยิ้ม วันที่เหนื่อยล้าก็เปลี่ยนเป็นวันดีๆ ได้ทันทีเลยนะ',
    color: '#ffefea',
    icon: Sparkles
  },
  {
    id: 2,
    title: 'ความใส่ใจที่น่ารัก 💖',
    description: 'เธอจำเรื่องเล็กๆ น้อยๆ ของเราได้เสมอ ไม่ว่าจะเป็นเมนูโปรด เพลงที่ชอบ หรือท่าทางตอนเขิน ขอบคุณที่แคร์กันขนาดนี้',
    color: '#fff1f3',
    icon: Heart
  },
  {
    id: 3,
    title: 'เสียงหัวเราะของเธอ 🎶',
    description: 'เป็นเสียงดนตรีโปรดของเราเลยแหละ เวลาได้ยินเธอหัวเราะ มันเหมือนโลกทั้งใบสดใสขึ้นเป็นกองเลย!',
    color: '#fffaf0',
    icon: Star
  },
  {
    id: 4,
    title: 'เธอเป็น Safe Zone 🏡',
    description: 'ไม่ว่าจะเจอกับอะไรแย่ๆ มาข้างนอก ขอแค่มีเธอนั่งฟัง คอยตบไหล่เบาๆ และบอกเราว่าไม่เป็นไร ก็รู้สึกอุ่นใจที่สุดแล้ว',
    color: '#fff8ef',
    icon: Heart
  }
];

export function ThingsILove() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="things-i-love-section">
      <div className="section-header">
        <span className="eyebrow">Reasons why I love you</span>
        <h2>สิ่งที่ฉันรักในตัวเธอ 💖</h2>
        <p>แตะเพื่อเปิดการ์ดความลับที่อยู่ข้างในดูนะ</p>
      </div>

      <div className="reasons-grid">
        {REASONS.map((item) => {
          const isFlipped = flippedCards[item.id];
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`reason-card-container ${isFlipped ? 'is-flipped' : ''}`}
              onClick={() => toggleFlip(item.id)}
            >
              <div className="reason-card-inner">
                {/* Front Side */}
                <div className="reason-card-front" style={{ backgroundColor: item.color }}>
                  <div className="card-decoration-heart">♥</div>
                  <div className="card-front-icon">
                    <Icon size={32} />
                  </div>
                  <h3>{item.title}</h3>
                  <span className="tap-hint">แตะเพื่อเปิดอ่าน</span>
                </div>

                {/* Back Side */}
                <div className="reason-card-back">
                  <div className="card-back-header">
                    <Heart size={16} fill="currentColor" />
                    <span>เหตุผลข้อที่ {item.id}</span>
                  </div>
                  <p>{item.description}</p>
                  <span className="tap-hint-back">แตะเพื่อปิดการ์ด</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
