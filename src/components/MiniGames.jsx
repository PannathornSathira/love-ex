import { useState, useEffect } from 'react';
import { Award, Gamepad2, Heart, RefreshCw, Trophy } from 'lucide-react';

// Pick the Petal Constants
const LOVE_MESSAGES = [
  'รักเธอที่สุด',
  'รักเธอมากๆ',
  'คิดถึงทุกลมหายใจ',
  'อยากอยู่ข้างๆ เสมอ',
  'เป็นแฟนที่น่ารักที่สุด',
  'คลั่งรักเธอที่สุดในโลก',
  'ยอมเธอหมดทุกอย่างแล้ว!',
  'รักหมดใจสายเปย์ 💖'
];

export function MiniGames({ allowedGamesCount = 1 }) {
  const [activeGame, setActiveGame] = useState('petal'); // 'petal' | 'memory'

  return (
    <div className="mini-games-section">
      <div className="section-header">
        <span className="eyebrow">Interactive Minigames</span>
        <h2>มินิเกมของสองเรา 🎮</h2>
        <p className={`game-tier-note tier-${allowedGamesCount}`}>
          {allowedGamesCount === 1 
            ? '✨ แพ็กเกจ Standard: สามารถเลือกใส่มินิเกมได้ 1 เกม' 
            : '🌟 แพ็กเกจ Premium: ลูกค้าจะได้รับมินิเกมเล่นสนุกคู่กันถึง 2 เกม!'}
        </p>
      </div>

      <div className="game-tabs">
        <button 
          className={`game-tab-btn ${activeGame === 'petal' ? 'is-active' : ''}`}
          onClick={() => setActiveGame('petal')}
        >
          <Gamepad2 size={16} />
          <span>เด็ดกลีบดอกไม้เสี่ยงทาย (Pick the Petal)</span>
        </button>
        {/* Memory game is available for preview in both, but premium can have both active */}
        <button 
          className={`game-tab-btn ${activeGame === 'memory' ? 'is-active' : ''}`}
          onClick={() => setActiveGame('memory')}
        >
          <Gamepad2 size={16} />
          <span>จับคู่การ์ดความรัก (Memory Match)</span>
        </button>
      </div>

      <div className="game-display-container">
        {activeGame === 'petal' ? <PickThePetalGame /> : <MemoryMatchGame />}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 1. Pick the Petal Game
// ----------------------------------------------------
function PickThePetalGame() {
  const [petalsLeft, setPetalsLeft] = useState(8);
  const [currentMessage, setCurrentMessage] = useState('จิ้มกลีบดอกไม้เพื่อเริ่มทำนายสิ!');
  const [isFinished, setIsFinished] = useState(false);

  const handlePetalClick = () => {
    if (petalsLeft <= 1) {
      setPetalsLeft(0);
      setCurrentMessage('คำทำนายสุดท้าย: รักกันตลอดไป แน่นอน 100%!!! 🌸💖💍');
      setIsFinished(true);
    } else {
      const nextMessage = LOVE_MESSAGES[8 - petalsLeft] || 'รักเธอนะ';
      setPetalsLeft(prev => prev - 1);
      setCurrentMessage(nextMessage);
    }
  };

  const handleReset = () => {
    setPetalsLeft(8);
    setCurrentMessage('จิ้มกลีบดอกไม้เพื่อเริ่มทำนายสิ!');
    setIsFinished(false);
  };

  return (
    <div className="petal-game-container">
      <div className="petal-game-box">
        <h3>เด็ดกลีบรัก เสี่ยงทาย 🌸</h3>
        <p className="petal-count">กลีบดอกไม้เหลือ: {petalsLeft} กลีบ</p>
        
        <div className="flower-visual">
          <div className="flower-center">
            <Heart size={20} fill="#fff" color="#df4f48" />
          </div>
          {/* Render petals */}
          {Array.from({ length: 8 }).map((_, idx) => {
            const angle = idx * 45;
            const isPlucked = idx >= petalsLeft;
            return (
              <button
                key={idx}
                className={`flower-petal ${isPlucked ? 'is-plucked' : ''}`}
                style={{ transform: `rotate(${angle}deg) translateY(-42px)` }}
                disabled={isPlucked || isFinished}
                onClick={handlePetalClick}
                aria-label={`เด็ดกลีบดอกไม้กลีบที่ ${idx + 1}`}
              />
            );
          })}
        </div>

        <div className="game-message-bubble">
          <p>{currentMessage}</p>
        </div>

        {isFinished && (
          <button className="pill-button" onClick={handleReset}>
            <RefreshCw size={16} />
            เล่นอีกรอบ
          </button>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. Memory Match Game
// ----------------------------------------------------
const CARD_EMOJIS = ['💖', '🌹', '💌', '🧸', '💍', '🏡', '🚗', '🍦'];

function MemoryMatchGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    // Duplicate and shuffle
    const duplicated = [...CARD_EMOJIS, ...CARD_EMOJIS];
    const shuffled = duplicated
      .map((emoji, idx) => ({ id: idx, emoji, isFlipped: false }))
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id) => {
    // Ignore clicks if 2 cards are already flipped
    if (flipped.length >= 2) return;
    // Ignore if already matched or already flipped
    if (matched.includes(id) || flipped.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard.emoji === secondCard.emoji) {
        // Match!
        setMatched(prev => [...prev, firstId, secondId]);
        setFlipped([]);
      } else {
        // Not a match, flip back after a delay
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  const isWon = matched.length === cards.length && cards.length > 0;

  return (
    <div className="memory-game-container">
      <div className="memory-game-box">
        <h3>คู่รักท้าทาย จับคู่ความทรงจำ 🧩</h3>
        <div className="game-stats">
          <span>จำนวนการเดิน: <strong>{moves}</strong> ครั้ง</span>
          <span>จับคู่สำเร็จ: <strong>{matched.length / 2} / 8</strong> คู่</span>
        </div>

        {isWon ? (
          <div className="game-victory">
            <Trophy size={48} className="trophy-icon" />
            <h4>เก่งมากเลยที่รัก! 🎉</h4>
            <p>เธอผ่านด่านจับคู่ความทรงจำทั้งหมดใน {moves} ครั้ง!</p>
            <button className="pill-button" onClick={initGame}>
              <RefreshCw size={16} />
              เล่นใหม่อีกครั้ง
            </button>
          </div>
        ) : (
          <div className="memory-grid">
            {cards.map((card) => {
              const isCardFlipped = flipped.includes(card.id) || matched.includes(card.id);
              return (
                <button
                  key={card.id}
                  className={`memory-card-item ${isCardFlipped ? 'is-revealed' : ''}`}
                  onClick={() => handleCardClick(card.id)}
                  aria-label="การ์ดความรัก"
                >
                  <span className="card-face-front">❓</span>
                  <span className="card-face-back">{card.emoji}</span>
                </button>
              );
            })}
          </div>
        )}

        {!isWon && (
          <button className="ghost-button reset-btn" onClick={initGame}>
            <RefreshCw size={14} /> Reset
          </button>
        )}
      </div>
    </div>
  );
}
