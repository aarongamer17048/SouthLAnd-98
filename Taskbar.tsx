import { useState, useEffect } from 'react';
import type { WindowState } from './Desktop';

interface TaskbarProps {
  windows: WindowState[];
  startMenuOpen: boolean;
  onStartClick: () => void;
  onWindowClick: (id: string) => void;
  audioContext: AudioContext | null;
}

export default function Taskbar({
  windows,
  startMenuOpen,
  onStartClick,
  onWindowClick,
  audioContext,
}: TaskbarProps) {
  const [time, setTime] = useState('00:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openWindows = windows.filter((w) => !w.minimized);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-7 bg-gray-300 flex items-center justify-between px-1 border-t-2"
      style={{
        borderColor: '#dfdfdf #808080 #808080 #dfdfdf',
      }}
    >
      {/* Start Button */}
      <button
        className="px-2 py-0.5 bg-gray-300 border-2 font-bold text-xs flex items-center gap-1 hover:bg-gray-400"
        style={{
          borderColor: startMenuOpen ? '#808080 #dfdfdf #dfdfdf #808080' : '#dfdfdf #808080 #808080 #dfdfdf',
        }}
        onClick={onStartClick}
      >
        <span>🪟</span>
        Start
      </button>

      {/* Window Buttons */}
      <div className="flex gap-1 flex-1 ml-2">
        {openWindows.map((win) => (
          <button
            key={win.id}
            className="px-2 py-0.5 bg-gray-300 border-2 text-xs truncate max-w-32 hover:bg-gray-400"
            style={{
              borderColor: '#dfdfdf #808080 #808080 #dfdfdf',
            }}
            onClick={() => onWindowClick(win.id)}
          >
            {win.icon} {win.title}
          </button>
        ))}
      </div>

      {/* Clock */}
      <div className="px-2 py-0.5 bg-gray-300 border-2 text-xs font-mono" style={{ borderColor: '#808080 #dfdfdf #dfdfdf #808080' }}>
        {time}
      </div>
    </div>
  );
}
