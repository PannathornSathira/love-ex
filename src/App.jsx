import { useState, useEffect } from 'react';
import {
  CalendarHeart,
  ChevronRight,
  Gift,
  LockKeyhole,
  Sparkles,
} from 'lucide-react';
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

// Import split configuration files for easy editing
import { basicConfig } from './data/basicConfig.js';
import { standardConfig } from './data/standardConfig.js';
import { premiumConfig } from './data/premiumConfig.js';

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

  // Dynamically select config matching active package
  const config = activePackage === 'basic' 
    ? basicConfig 
    : activePackage === 'standard' 
      ? standardConfig 
      : premiumConfig;

  const { couple, hero, letter, secret, gallery, timeline, music, promise, footer } = config;

  // Reset tab to 'home' when package changes
  useEffect(() => {
    setActiveTab('home');
    setIsSecretOpen(false);
  }, [activePackage]);

  const handlePackageChange = (newPkg) => {
    setActivePackage(newPkg);
  };

  const packageName = PACKAGE_NAMES[activePackage] || 'รักหมดใจสายเปย์';

  // Choose tab set based on package
  const activeTabs = activePackage === 'basic' ? [] : activePackage === 'standard' ? STANDARD_TABS : PREMIUM_TABS;

  // Pagination navigation handler
  const renderPagination = () => {
    if (activePackage === 'basic') return null;
    const currentIndex = activeTabs.findIndex(t => t.id === activeTab);
    if (currentIndex === -1) return null;

    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < activeTabs.length - 1;

    const handlePrev = () => {
      const prevTab = activeTabs[currentIndex - 1];
      setActiveTab(prevTab.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNext = () => {
      const nextTab = activeTabs[currentIndex + 1];
      setActiveTab(nextTab.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRestart = () => {
      setActiveTab(activeTabs[0].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      <div className="page-navigation-bar">
        {hasPrev ? (
          <button className="nav-page-btn prev-btn" onClick={handlePrev}>
            ← หน้าก่อนหน้า ({activeTabs[currentIndex - 1].label})
          </button>
        ) : (
          <div className="nav-placeholder" />
        )}

        {hasNext ? (
          <button className="nav-page-btn next-btn" onClick={handleNext}>
            หน้าถัดไป ({activeTabs[currentIndex + 1].label}) →
          </button>
        ) : (
          <button className="nav-page-btn restart-btn" onClick={handleRestart}>
            ↺ กลับไปหน้าแรก
          </button>
        )}
      </div>
    );
  };

  return (
    <div className={`app-shell package-${activePackage}`}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* Sticky Top Package Switcher Control Panel */}
      <PackageSwitcher activePackage={activePackage} onChangePackage={handlePackageChange} />

      {/* Floating welcome animation on package switch */}
      <WelcomeAnimation activePackage={activePackage} packageName={packageName} />

      {/* Main Client Web Content Container */}
      <div className="client-web-wrapper">
        
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
                  title={gallery.title}
                  description={gallery.subtitle}
                />
                <Gallery photos={gallery.photos} />
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
                      <p>{music.note}</p>
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
                      title={gallery.title}
                      description={gallery.subtitle}
                    />
                    <Gallery photos={gallery.photos} />
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

              {/* Render forward/backward pagination navigation */}
              {renderPagination()}

            </div>
          )}

          {/* Simple shared footer */}
          <footer className="client-footer">
            <p>{footer.line}</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
