import { useState } from 'react';
import { Coffee, MapPin, Heart, Compass, X } from 'lucide-react';

const MAP_PINS = [
  {
    id: 1,
    title: 'เจอกันครั้งแรก ☕',
    location: 'ร้านกาแฟ Sweet Cafe',
    description: 'จุดเริ่มต้นของทุกอย่าง จำได้แม่นว่าเธอสั่งมัทฉะลาเต้ ส่วนเราทำตัวเลิ่กลั่กเพราะเขินรอยยิ้มเธอ',
    x: '25%',
    y: '35%',
    icon: Coffee,
    image: '/memory-walk.png'
  },
  {
    id: 2,
    title: 'เดทแรกสุดพิเศษ 🎡',
    location: 'สวนสนุก & สวนสาธารณะ',
    description: 'วันหยุดเดทแรกที่ปั่นเรือเป็ดด้วยกันกลางแดดร้อนๆ แต่เราแทบไม่ได้มองทางเลย เพราะมัวแต่มองหน้าคนข้างๆ',
    x: '65%',
    y: '20%',
    icon: Heart,
    image: '/memory-meal.png'
  },
  {
    id: 3,
    title: 'ทริปทะเลชะอำแรกของเรา 🌊',
    location: 'หาดชะอำ จ.เพชรบุรี',
    description: 'ทริปไปนั่งฟังเสียงคลื่น กินอาหารทะเล และเดินจับมือกันริมชายหาดตอนพระอาทิตย์ตกดิน เป็นวันที่โรแมนติกมากๆ',
    x: '45%',
    y: '70%',
    icon: Compass,
    image: '/memory-trip.png'
  }
];

export function InteractiveMap() {
  const [activePin, setActivePin] = useState(null);

  return (
    <div className="interactive-map-section">
      <div className="section-header">
        <span className="eyebrow">Interactive Memory Map</span>
        <h2>แผนที่ความทรงจำของเรา 🗺️</h2>
        <p>ปักหมุดจุดสำคัญในการเดินทางของความรัก แตะที่หมุดเพื่อย้อนวันวานกันนะ</p>
      </div>

      <div className="map-wrapper">
        {/* Stylized SVG Board / Background Grid */}
        <div className="map-graphic-canvas">
          <svg className="map-svg-grid" width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(245, 174, 159, 0.15)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Draw connecting path between pins */}
            <path 
              d="M 250, 175 Q 350, 100 650, 100 T 450, 350" 
              fill="none" 
              stroke="rgba(223, 79, 72, 0.35)" 
              strokeWidth="4" 
              strokeDasharray="8,8" 
              className="map-path-line"
            />
          </svg>

          {/* Render Interactive Hotspots */}
          {MAP_PINS.map((pin) => {
            const Icon = pin.icon;
            const isSelected = activePin?.id === pin.id;
            return (
              <button
                key={pin.id}
                className={`map-pin-hotspot ${isSelected ? 'is-pulse-active' : ''}`}
                style={{ left: pin.x, top: pin.y }}
                onClick={() => setActivePin(pin)}
                aria-label={`ปักหมุดสถานที่: ${pin.title}`}
              >
                <div className="pin-circle">
                  <Icon size={18} />
                </div>
                <MapPin className="pin-pointer" size={24} />
              </button>
            );
          })}
        </div>

        {/* Selected Pin Details Display */}
        {activePin ? (
          <div className="map-details-card animate-card-reveal">
            <button className="close-btn" onClick={() => setActivePin(null)} aria-label="ปิดรายละเอียด">
              <X size={16} />
            </button>
            <div className="card-top-image">
              <img src={activePin.image} alt={activePin.title} />
            </div>
            <div className="card-bottom-content">
              <h3>{activePin.title}</h3>
              <p className="card-location">📍 {activePin.location}</p>
              <p className="card-desc">{activePin.description}</p>
            </div>
          </div>
        ) : (
          <div className="map-details-placeholder">
            <Heart size={30} className="placeholder-icon animate-pulse" />
            <p>กรุณาแตะที่หมุดบนแผนที่ด้านบน เพื่อดูความทรงจำตรงจุดนั้นนะ</p>
          </div>
        )}
      </div>
    </div>
  );
}
