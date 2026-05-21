import { useState } from 'react';
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

function App() {
  const [isSecretOpen, setIsSecretOpen] = useState(false);
  const { couple, hero, letter, secret, gallery, timeline, music, promise, footer } = siteConfig;

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <main id="top">
        <Hero couple={couple} hero={hero} />

        <section className="section section-letter" id="letter">
          <SectionHeader
            eyebrow="Love Letter"
            title={letter.title}
            description="จดหมายที่ตั้งใจเขียนไว้ให้เธออ่านคนเดียว ในวันที่อยากได้กำลังใจจากกัน"
          />
          <div className="letter-layout">
            <LoveLetter letter={letter} />
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
              <button className="pill-button" onClick={() => setIsSecretOpen(true)}>
                <Gift size={18} />
                {isSecretOpen ? 'เปิดแล้ว' : secret.lockedLabel}
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
              description="บางช่วงเวลาอาจดูธรรมดา แต่พอเป็นเรื่องของเรา มันกลับน่าจำเสมอ"
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
              บางเพลงไม่ได้เพราะแค่ทำนอง แต่เพราะมันมีหน้าเธออยู่ในความทรงจำทุกครั้งที่ได้ฟัง
            </p>
          </div>
          <MusicCard music={music} />
        </section>

        <section className="closing-section">
          <div className="closing-browser">
            <div className="browser-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="closing-content">
              <CalendarHeart size={35} />
              <p>{couple.anniversary}</p>
              <h2>ขอบคุณที่เป็นความรักที่เราอยากดูแลไปนาน ๆ</h2>
              <a className="pill-button large" href="#top">
                กลับไปอ่านอีกครั้ง
                <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>{footer.line}</p>
      </footer>
    </div>
  );
}

export default App;
