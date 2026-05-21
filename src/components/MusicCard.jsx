import { Music2, Pause, Play } from 'lucide-react';

export function MusicCard({ music }) {
  return (
    <article className="music-card">
      <div className="record-wrap">
        <div className="record">
          <Music2 size={34} />
        </div>
        <button className="play-button" aria-label="เล่นตัวอย่างเพลง">
          <Play size={20} fill="currentColor" />
        </button>
      </div>
      <div className="music-meta">
        <p>Now playing</p>
        <h3>{music.songTitle}</h3>
        <span>{music.artist}</span>
      </div>
      <div className="track-list">
        {music.tracks.map((track, index) => (
          <div className="track" key={track}>
            <span>{index + 1}</span>
            <p>{track}</p>
            <Pause size={16} />
          </div>
        ))}
      </div>
      <p className="music-note">{music.note}</p>
    </article>
  );
}
