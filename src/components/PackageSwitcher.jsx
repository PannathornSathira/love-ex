import { Gift, Heart, ShieldCheck, Sparkles } from 'lucide-react';

const PACKAGES = [
  {
    id: 'basic',
    name: 'หวานกำลังดี',
    price: '490.-',
    badge: 'เริ่มต้น',
    description: 'เว็บหน้าเดียวสไตล์การ์ดแต่งงาน มอบแทนใจสุดโรแมนติก',
    features: ['หน้าต้อนรับพร้อมอนิเมชั่นหัวใจ', 'ไทม์ไลน์ความทรงจำ 1 ปี', 'จดหมายรักพิมพ์ออโต้ (Typewriter)', 'Polaroid Gallery (สูงสุด 10 รูป)'],
    icon: Gift,
    color: '#758b72'
  },
  {
    id: 'standard',
    name: 'โรแมนติก',
    price: '790.-',
    badge: 'คุ้มค่าสุด',
    description: 'เว็บเคลื่อนไหวระดับพรีเมียม ตอบสนองทุกการสัมผัส',
    features: ['การ์ดบอกรักแบบแอนิเมชั่น (Flip Cards)', 'Confetti & เคาน์เตอร์นับวันครบรอบ', 'มินิเกมหัวใจ (เลือกได้ 1 เกม)', 'Polaroid Gallery (สูงสุด 25 รูป)', 'รองรับ Responsive มือถือ/คอม'],
    icon: Heart,
    color: '#df4f48'
  },
  {
    id: 'premium',
    name: 'หวานขั้นสุด',
    price: '1,090.-',
    badge: 'จัดเต็มสุด',
    description: 'ที่สุดแห่งของขวัญครบรอบ แฟนประทับใจไม่รู้ลืม',
    features: ['แผนที่ความทรงจำปักหมุด interactive', 'กระดานคำสัญญา / อนาคต (Bucket List)', 'มินิเกมสุดน่ารัก 2 เกม', 'Polaroid Gallery (สูงสุด 50 รูป)', 'ปรับแต่งธีมสี / เพลงพิเศษได้ไม่จำกัด'],
    icon: Sparkles,
    color: '#c98b2e'
  }
];

export function PackageSwitcher({ activePackage, onChangePackage }) {
  const currentPkg = PACKAGES.find(p => p.id === activePackage) || PACKAGES[0];

  return (
    <div className="package-switcher-container top-switcher">
      <div className="package-switcher-row">
        <div className="package-switcher-brand">
          <span className="brand-icon">♥</span>
          <div className="brand-text">
            <span className="brand-title">LovePage Demo</span>
            <span className="brand-subtitle">โหมดทดลองกดสลับแพ็กเกจ</span>
          </div>
        </div>

        <div className="package-tabs">
          {PACKAGES.map((pkg) => {
            const Icon = pkg.icon;
            const isActive = pkg.id === activePackage;
            return (
              <button
                key={pkg.id}
                className={`package-tab-btn ${isActive ? 'is-active' : ''}`}
                style={{ '--theme-color': pkg.color }}
                onClick={() => onChangePackage(pkg.id)}
              >
                <Icon size={14} className="pkg-icon" />
                <div className="tab-btn-content">
                  <span className="tab-name">{pkg.name}</span>
                  <span className="tab-price">{pkg.price}</span>
                </div>
                {pkg.badge && <span className="tab-badge">{pkg.badge}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="package-details-banner">
        <span className="current-pkg-label" style={{ color: currentPkg.color }}>
          {currentPkg.name} ({currentPkg.price}):
        </span>
        <span className="pkg-desc"> {currentPkg.description} </span>
        <span className="divider">•</span>
        <ul className="pkg-features-pill">
          {currentPkg.features.map((feat, idx) => (
            <li key={idx} className="pkg-feature-item">
              {feat}
              {idx < currentPkg.features.length - 1 && <span className="comma">,</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
