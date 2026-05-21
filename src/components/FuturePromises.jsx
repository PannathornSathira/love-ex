import { useState } from 'react';
import { CalendarHeart, Check, Plus, Heart } from 'lucide-react';

const INITIAL_PROMISES = [
  { id: 1, text: 'ไปเที่ยวญี่ปุ่นด้วยกัน ถ่ายรูปชุดกิโมโนน่ารักๆ 🇯🇵', completed: false },
  { id: 2, text: 'ทำเค้กวันครบรอบร่วมกันแบบเละแต่น่ารัก 🎂', completed: true },
  { id: 3, text: 'กอดเธอแน่นๆ หลังเลิกงานในวันที่เธอเหนื่อย 🏡', completed: true },
  { id: 4, text: 'ปลูกต้นกระบองเพชรเล็กๆ ด้วยกันจนมันมีดอก 🌵', completed: false },
  { id: 5, text: 'ไปนั่งรับลมริมหาดทรายขาวตอนเช้าตรู่ด้วยกัน 🌊', completed: false }
];

export function FuturePromises() {
  const [promises, setPromises] = useState(INITIAL_PROMISES);
  const [newPromiseText, setNewPromiseText] = useState('');

  const toggleComplete = (id) => {
    setPromises((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleAddPromise = (e) => {
    e.preventDefault();
    if (!newPromiseText.trim()) return;

    setPromises((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: newPromiseText,
        completed: false
      }
    ]);
    setNewPromiseText('');
  };

  return (
    <div className="promises-future-section">
      <div className="section-header">
        <span className="eyebrow">Promises & The Future</span>
        <h2>รายการความฝันในอนาคต (Bucket List) 📝🌟</h2>
        <p>ความฝันเล็กๆ และคำสัญญาที่เราอยากทำร่วมกันตลอดไป (ลองติ๊กเล่นหรือเพิ่มข้อความใหม่ได้เลยนะ)</p>
      </div>

      <div className="promises-box">
        <div className="promises-list-header">
          <CalendarHeart size={20} />
          <span>เรื่องราวที่เราจะทำร่วมกันในวันพรุ่งนี้</span>
        </div>

        <div className="promises-items">
          {promises.map((item) => (
            <button
              key={item.id}
              className={`promise-row-btn ${item.completed ? 'is-completed' : ''}`}
              onClick={() => toggleComplete(item.id)}
              aria-label={`ทำสัญลักษณ์ความสำเร็จข้อ: ${item.text}`}
            >
              <div className="checkbox-indicator">
                {item.completed ? <Check size={16} /> : null}
              </div>
              <span className="promise-text">{item.text}</span>
              {item.completed && <Heart size={14} className="promise-heart-badge" fill="currentColor" />}
            </button>
          ))}
        </div>

        {/* Form to add user promise for interactive demo */}
        <form onSubmit={handleAddPromise} className="add-promise-form">
          <input
            type="text"
            placeholder="เขียนความฝันใหม่ของเราที่นี่..."
            value={newPromiseText}
            onChange={(e) => setNewPromiseText(e.target.value)}
          />
          <button type="submit" aria-label="เพิ่มความฝัน">
            <Plus size={18} />
            <span>เพิ่ม</span>
          </button>
        </form>
      </div>
    </div>
  );
}
