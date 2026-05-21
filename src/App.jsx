import { useState, useEffect } from 'react';
import {
  CalendarHeart,
  ChevronRight,
  Gift,
  LockKeyhole,
  Sparkles,
} from 'lucide-react';
import { siteConfig } from './data/siteConfig.js';
import { Hero } from './components/Hero.jsx';
import { SectionHeader } from './components/SectionHeader.jsx';
import { LoveLetter } from './components/LoveLetter.jsx';
import { Gallery } from './components/Gallery.jsx';
import { Timeline } from './components/Timeline.jsx';
import { MusicCard } from './components/MusicCard.jsx';
import { PromiseCard } from './components/PromiseCard.jsx';

// Custom Package Components
import { PackageSwitcher } from './components/PackageSwitcher.jsx';
import { WelcomeAnimation } from './components/WelcomeAnimation.jsx';
import { ThingsILove } from './components/ThingsILove.jsx';
import { AnniversaryFinale } from './components/AnniversaryFinale.jsx';
import { MiniGames } from './components/MiniGames.jsx';
import { InteractiveMap } from './components/InteractiveMap.jsx';
import { FuturePromises } from './components/FuturePromises.jsx';

const EXTENDED_PHOTOS = [
  {
    title: 'วันแรกที่ได้เดินข้างกัน',
    caption: 'บรรยากาศเย็น ๆ กับรอยยิ้มที่ยังจำได้',
    image: '/memory-walk.png',
    tone: 'sunset',
  },
  {
    title: 'มื้อโปรดของเรา',
    caption: 'อาหารอร่อยขึ้นเสมอเมื่อได้กินด้วยกัน',
    image: '/memory-meal.png',
    tone: 'rose',
  },
  {
    title: 'ทริปเล็ก ๆ แต่พิเศษ',
    caption: 'ไม่ต้องไปไกล แค่ไปกับเธอก็พอ',
    image: '/memory-trip.png',
    tone: 'cream',
  },
  {
    title: 'คืนที่ได้นั่งคุยนาน ๆ',
    caption: 'บางบทสนทนาอยู่ในใจนานกว่าที่คิด',
    image: '/memory-night.png',
    tone: 'coral',
  },
  {
    title: 'ดูพระอาทิตย์ตกด้วยกัน',
    caption: 'ท้องฟ้าเปลี่ยนสีสวยงาม แต่น้อยกว่ารอยยิ้มของเธอ',
    image: '/memory-walk.png',
    tone: 'sunset',
  },
  {
    title: 'ของหวานร้านโปรด',
    caption: 'เติมความหวานเข้าร่างกาย แต่หวานไม่เท่าเธอ',
    image: '/memory-meal.png',
    tone: 'rose',
  },
  {
    title: 'ทริปภูเขาแสนสนุก',
    caption: 'สูดอากาศบริสุทธิ์ ชาร์จพลังชีวิตข้างๆ กัน',
    image: '/memory-trip.png',
    tone: 'cream',
  },
  {
    title: 'ดูหนังกินป๊อปคอร์น',
    caption: 'เรื่องธรรมดาในค่ำคืนวันศุกร์ที่แสนวิเศษ',
    image: '/memory-night.png',
    tone: 'coral',
  },
  {
    title: 'เดินซื้อของขวัญ',
    caption: 'เลือกชิ้นที่ถูกใจที่สุดเพื่อเธอคนเดียว',
    image: '/memory-walk.png',
    tone: 'sunset',
  },
  {
    title: 'มื้อค่ำรอบดึก',
    caption: 'กินมาม่าต้มยำร้อนๆ ด้วยกันในห้องนั่งเล่น',
    image: '/memory-meal.png',
    tone: 'rose',
  }
];

const STANDARD_TABS = [
  { id: 'home', label: 'หน้าแรก' },
  { id: 'letter', label: 'จดหมายรัก' },
  { id: 'memories', label: 'ความทรงจำ & รูปภาพ' },
  { id: 'love', label: 'สิ่งที่รักในตัวเธอ' },
  { id: 'games', label: 'มินิเกม' },
  { id: 'anniversary', label: 'ฉลองครบรอบ' }
];

const PREMIUM_TABS = [
  { id: 'home', label: 'หน้าแรก' },
  { id: 'letter', label: 'จดหมายรัก' },
  { id: 'memories', label: 'ความทรงจำ & รูปภาพ' },
  { id: 'love', label: 'สิ่งที่รักในตัวเธอ' },
  { id: 'map', label: 'แผนที่ความทรงจำ' },
  { id: 'promises', label: 'คำสัญญา & อนาคต' },
  { id: 'games', label: 'มินิเกม' },
  { id: 'anniversary', label: 'ฉลองครบรอบ' }
];

const PACKAGE_NAMES = {
  basic: 'หวานใจกำลังสร้างตัว (Basic)',
  standard: 'โรแมนติกแบบกำลังดี (Standard)',
  premium: 'รักหมดใจสายเปย์ (Premium)'
};

function App() {
  const [activePackage, setActivePackage] = useState('premium'); // Defaulting to premium showcase
  const [activeTab, setActiveTab] = useState('home');
  const [isSecretOpen, setIsSecretOpen] = useState(false);

  const { couple, hero, letter, secret, timeline, music, promise, footer } = siteConfig;

  // Reset tab to 'home' when package changes
  useEffect(() => {
    setActiveTab('home');
    setIsSecretOpen(false);
  }, [activePackage]);

  const handlePackageChange = (newPkg) => {
    setActivePackage(newPkg);
  };

  // Determine current package name
  const packageName = PACKAGE_NAMES[activePackage] || 'รักหมดใจสายเปย์';

  // Slice photos based on package tier
  const photosLimit = activePackage === 'basic' ? 4 : activePackage === 'standard' ? 6 : 10;
  const currentPhotos = EXTENDED_PHOTOS.slice(0, photosLimit);

  // Choose tab set based on package
  const activeTabs = activePackage === 'basic' ? [] : activePackage === 'standard' ? STANDARD_TABS : PREMIUM_TABS;

  return (
    <div className={`app-shell package-${activePackage}`}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* Floating welcome animation on package switch */}
      <WelcomeAnimation activePackage={activePackage} packageName={packageName} />

      {/* Main Client Web Content Container */}
      <div className="client-web-wrapper">
        
        {/* Render Navbar Header (Standard & Premium Packages only) */}
        {activePackage !== 'basic' && (
          <header className="client-navbar">
            <div className="navbar-logo">
              <span className="logo-heart">♥</span> {couple.nameOne} & {couple.nameTwo}
            </div>
            <nav className="navbar-links">
              {activeTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`navbar-tab-btn ${activeTab === tab.id ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </header>
        )}

        <main id="top" className="client-main-content">
          
          {/* BASIC PACKAGE: Linear single-page scrolling layout */}
          {activePackage === 'basic' && (
            <>
              <Hero couple={couple} hero={hero} />

              <section className="section section-letter" id="letter">
                <SectionHeader
                  eyebrow="Love Letter"
                  title={letter.title}
                  description="จดหมายรักพิมพ์แบบพิมพ์ดีดสุดอบอุ่น คลาสสิกและย้อนวันวาน"
                />
                <div className="letter-layout">
                  <LoveLetter letter={letter} useTypewriter={true} />
                  <aside className={`secret-card ${isSecretOpen ? 'is-open' : ''}`}>
                    <div className="secret-icon">
                      <LockKeyhole size={26} />
                    </div>
                    <p className="secret-label">Private Note</p>
                    <h3>มีข้อความซ่อนอยู่ตรงนี้</h3>
                    <p>แตะปุ่มด้านล่างเพื่อเปิดข้อความที่ตั้งใจเก็บไว้ให้เธออ่านคนเดียว</p>
                    <button className="pill-button" onClick={() => setIsSecretOpen(true)}>
                      <Gift size={18} />
                      เปิดข้อความลับ
                    </button>
                  </aside>
                </div>
              </section>

              <section className="section" id="gallery">
                <SectionHeader
                  eyebrow="Our Photos"
                  title="อัลบั้มรูปภาพโพลารอยด์"
                  description="อัลบั้มภาพความทรงจำของเรา (แพ็กเกจเริ่มต้นสูงสุด 10 รูป)"
                />
                <Gallery photos={currentPhotos} />
              </section>

              <section className="section section-split" id="timeline">
                <div>
                  <SectionHeader
                    eyebrow="Timeline"
                    title={timeline.title}
                    description="เรื่องราวความรักตลอดระยะเวลา 1 ปีของเรา"
                    align="left"
                  />
                  <Timeline events={timeline.events} />
                </div>
                <PromiseCard promise={promise} />
              </section>

              <section className="section music-section" id="music">
                <div className="music-copy">
                  <p className="eyebrow">Playlist</p>
                  <h2>{music.title}</h2>
                  <p>
                    เพลงรักแทนใจที่เราเลือกไว้ให้เธอคอยเปิดฟังในวันเหงาๆ
                  </p>
                </div>
                <MusicCard music={music} />
              </section>
            </>
          )}

          {/* STANDARD & PREMIUM PACKAGES: Interactive tabs rendering */}
          {activePackage !== 'basic' && (
            <div className="tabbed-content-container">
              
              {activeTab === 'home' && (
                <div className="tab-fade-in">
                  <Hero couple={couple} hero={hero} />
                  <section className="section music-section" id="music" style={{ marginTop: '40px' }}>
                    <div className="music-copy">
                      <p className="eyebrow">Playlist</p>
                      <h2>{music.title}</h2>
                      <p>
                        บทเพลงบางเพลงร้องเพื่อบอกรักเธอแทนตัวฉันในทุกๆ วัน
                      </p>
                    </div>
                    <MusicCard music={music} />
                  </section>
                </div>
              )}

              {activeTab === 'letter' && (
                <div className="tab-fade-in">
                  <section className="section section-letter" id="letter" style={{ paddingTop: '20px' }}>
                    <SectionHeader
                      eyebrow="Love Letter"
                      title={letter.title}
                      description="จดหมายที่ตั้งใจเขียนขึ้นมาเพื่อเก็บรักษาความรู้สึกดีๆ ระหว่างเรา"
                    />
                    <div className="letter-layout">
                      <LoveLetter letter={letter} useTypewriter={true} />
                      <aside className={`secret-card ${isSecretOpen ? 'is-open' : ''}`}>
                        <div className="secret-icon">
                          {isSecretOpen ? <Sparkles size={26} /> : <LockKeyhole size={26} />}
                        </div>
                        <p className="secret-label">Private Note</p>
                        <h3>{isSecretOpen ? secret.unlockedTitle : 'มีข้อความซ่อนอยู่ตรงนี้'}</h3>
                        <p>
                          {isSecretOpen
                            ? secret.unlockedText
                            : 'แตะปุ่มด้านล่างเพื่อเปิดข้อความที่ตั้งใจเก็บไว้ให้เธออ่านคนเดียว'}
                        </p>
                        {!isSecretOpen && (
                          <button className="pill-button" onClick={() => setIsSecretOpen(true)}>
                            <Gift size={18} />
                            {secret.lockedLabel}
                          </button>
                        )}
                      </aside>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'memories' && (
                <div className="tab-fade-in">
                  <section className="section" id="timeline" style={{ paddingTop: '20px' }}>
                    <SectionHeader
                      eyebrow="Timeline"
                      title={timeline.title}
                      description="เส้นทางความรักและบันทึกความรู้สึกตั้งแต่จุดเริ่มต้นจนถึงปัจจุบัน"
                    />
                    <Timeline events={timeline.events} />
                  </section>

                  <section className="section" id="gallery" style={{ paddingTop: '0px' }}>
                    <SectionHeader
                      eyebrow="Our Photos"
                      title="คอลเลกชันความทรงจำของเรา 📸"
                      description={`รูปภาพและคำบรรยายสุดพิเศษ (สูงสุด ${activePackage === 'standard' ? '25' : '50'} รูปตามแพ็กเกจ)`}
                    />
                    <Gallery photos={currentPhotos} />
                  </section>
                </div>
              )}

              {activeTab === 'love' && (
                <div className="tab-fade-in">
                  <section className="section" style={{ paddingTop: '20px' }}>
                    <ThingsILove />
                  </section>
                </div>
              )}

              {activeTab === 'map' && activePackage === 'premium' && (
                <div className="tab-fade-in">
                  <section className="section" style={{ paddingTop: '20px' }}>
                    <InteractiveMap />
                  </section>
                </div>
              )}

              {activeTab === 'promises' && activePackage === 'premium' && (
                <div className="tab-fade-in">
                  <section className="section" style={{ paddingTop: '20px' }}>
                    <FuturePromises />
                  </section>
                </div>
              )}

              {activeTab === 'games' && (
                <div className="tab-fade-in">
                  <section className="section" style={{ paddingTop: '20px' }}>
                    <MiniGames allowedGamesCount={activePackage === 'standard' ? 1 : 2} />
                  </section>
                </div>
              )}

              {activeTab === 'anniversary' && (
                <div className="tab-fade-in">
                  <section className="section" style={{ paddingTop: '20px' }}>
                    <AnniversaryFinale anniversaryDate="2026-02-14" />
                  </section>
                </div>
              )}

            </div>
          )}

          {/* Simple shared footer */}
          <footer className="client-footer">
            <p>{footer.line}</p>
          </footer>
        </main>
      </div>

      {/* Package Switcher floating Preview Control Panel */}
      <PackageSwitcher activePackage={activePackage} onChangePackage={handlePackageChange} />
    </div>
  );
}

export default App;
