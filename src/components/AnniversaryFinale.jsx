import { useEffect, useRef, useState } from 'react';
import { CalendarHeart, Flame, Gift } from 'lucide-react';

export function AnniversaryFinale({ anniversaryDate = '2026-02-14' }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const confettiArray = useRef([]);

  // Live Timer Count-Up
  useEffect(() => {
    const updateTime = () => {
      const anniv = new Date(anniversaryDate);
      const now = new Date();
      const diff = now - anniv;

      if (diff < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [anniversaryDate]);

  // Canvas Confetti System
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Resize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create confetti particles
    const colors = ['#f37878', '#df4f48', '#f7a295', '#c98b2e', '#758b72', '#ffd39d'];
    const tempArray = [];
    for (let i = 0; i < 150; i++) {
      tempArray.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 20 + Math.random() * 50,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: -(Math.random() * 12 + 8),
        speedX: Math.random() * 6 - 3,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        opacity: 1
      });
    }
    confettiArray.current = tempArray;

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let activeParticles = false;
      confettiArray.current.forEach((p) => {
        if (p.opacity > 0) {
          activeParticles = true;
          // Apply movement
          p.y += p.speedY;
          p.x += p.speedX;
          // Gravity pull
          p.speedY += 0.25; 
          p.rotation += p.rotationSpeed;
          
          // Fade out near the bottom or after a while
          if (p.speedY > 0) {
            p.opacity -= 0.01;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.opacity);
          
          // Draw star shape or rectangle
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (activeParticles) {
        animationFrameId.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    animate();
  };

  // Resize canvas on resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="anniversary-finale-section">
      <canvas ref={canvasRef} className="confetti-canvas" />
      
      <div className="section-header">
        <span className="eyebrow">Anniversary Finale</span>
        <h2>เวลาแห่งการเดินทางร่วมกัน ⏰</h2>
        <p>นับถอยหลังและทบทวนความรักของสองเราในทุกๆ วินาที</p>
      </div>

      <div className="counter-container">
        <div className="counter-title">
          <CalendarHeart size={20} className="counter-icon" />
          <span>จุดเริ่มต้น: 14 กุมภาพันธ์ 2026</span>
        </div>
        
        <div className="counter-grid">
          <div className="counter-card">
            <span className="counter-number">{timeLeft.days}</span>
            <span className="counter-label">วัน</span>
          </div>
          <div className="counter-card">
            <span className="counter-number">{timeLeft.hours}</span>
            <span className="counter-label">ชั่วโมง</span>
          </div>
          <div className="counter-card">
            <span className="counter-number">{timeLeft.minutes}</span>
            <span className="counter-label">นาที</span>
          </div>
          <div className="counter-card card-highlight">
            <span className="counter-number">{timeLeft.seconds}</span>
            <span className="counter-label">วินาที</span>
          </div>
        </div>

        <div className="counter-message">
          <Flame size={16} fill="currentColor" />
          <span>ทุกๆ วินาทีที่มีเธออยู่ ชีวิตมีความหมายและสดใสขึ้นในทุกวัน</span>
        </div>
      </div>

      <div className="finale-action">
        <button className="celebrate-btn" onClick={triggerConfetti}>
          <Gift size={20} />
          ฉลองความรักครบรอบ! 🥳🎉
        </button>
      </div>
    </div>
  );
}
