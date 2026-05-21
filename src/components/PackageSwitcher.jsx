import { Gift, Heart, ShieldCheck, Sparkles } from 'lucide-react';

const PACKAGES = [
  {
    id: 'basic',
    name: 'หวานใจกำลังสร้างตัว',
    price: '990.-',
    badge: 'เริ่มต้น',
    description: 'เว็บหน้าเดียวสไตล์การ์ดแต่งงาน มอบแทนใจสุดโรแมนติก',
    features: ['หน้าต้อนรับพร้อมอนิเมชั่นหัวใจ', 'ไทม์ไลน์ความทรงจำ 1 ปี', 'จดหมายรักพิมพ์ออโต้ (Typewriter)', 'Polaroid Gallery (สูงสุด 10 รูป)'],
    icon: Gift,
    color: '#758b72'
  },
  {
    id: 'standard',
    name: 'โรแมนติกแบบกำลังดี',
    price: '1,990.-',
    badge: 'คุ้มค่าสุด',
    description: 'เว็บเคลื่อนไหวระดับพรีเมียม ตอบสนองทุกการสัมผัส',
    features: ['การ์ดบอกรักแบบแอนิเมชั่น (Flip Cards)', 'Confetti & เคาน์เตอร์นับวันครบรอบ', 'มินิเกมหัวใจ (เลือกได้ 1 เกม)', 'Polaroid Gallery (สูงสุด 25 รูป)', 'รองรับ Responsive มือถือ/คอม'],
    icon: Heart,
    color: '#df4f48'
  },
  {
    id: 'premium',
    name: 'รักหมดใจสายเปย์',
    price: '3,490.-',
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
    <div className="package-switcher-container">
      <div className="package-switcher-header">
        <ShieldCheck size={16} />
        <span>โหมดทดลองหน้าเว็บของลูกค้า (สลับดูแต่ละแพ็กเกจได้ที่นี่)</span>
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
              <Icon size={16} />
              <div className="tab-btn-content">
                <span className="tab-name">{pkg.name}</span>
                <span className="tab-price">{pkg.price}</span>
              </div>
              {pkg.badge && <span className="tab-badge">{pkg.badge}</span>}
            </button>
          );
        })}
      </div>
      <div className="package-details-banner">
        <p className="pkg-desc">
          <strong>คุณลักษณะ:</strong> {currentPkg.description}
        </p>
        <ul className="pkg-features-pill">
          {currentPkg.features.map((feat, idx) => (
            <li key={idx} className="pkg-feature-item">
              <span className="dot" style={{ backgroundColor: currentPkg.color }} />
              {feat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
