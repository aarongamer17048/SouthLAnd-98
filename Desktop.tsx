import { useState, useEffect } from 'react';
import Taskbar from './Taskbar';
import Window from './Window';
import StartMenu from './StartMenu';
import { playSound } from '@/lib/sounds';
import { useConfig } from '@/hooks/useConfig';

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  zIndex: number;
  content: string;
}

const DESKTOP_ICONS = [
  { id: 'my-computer', label: 'My Computer', icon: '💻' },
  { id: 'internet-explorer', label: 'Internet Explorer', icon: '🌐' },
  { id: 'network', label: 'Network Neighborhood', icon: '🌍' },
  { id: 'recycle-bin', label: 'Recycle Bin', icon: '🗑️' },
  { id: 'store', label: 'Store', icon: '🛍️' },
  { id: 'discord', label: 'Discord', icon: '💬' },
  { id: 'gallery', label: 'Gallery', icon: '🖼️' },
  { id: 'rules', label: 'Rules', icon: '📋' },
  { id: 'changelog', label: 'Changelog', icon: '📝' },
];

// Predefined window positions to avoid stacking
const WINDOW_POSITIONS = [
  { x: 50, y: 50 },
  { x: 400, y: 100 },
  { x: 750, y: 80 },
  { x: 100, y: 350 },
  { x: 500, y: 300 },
  { x: 850, y: 350 },
  { x: 200, y: 600 },
  { x: 600, y: 550 },
  { x: 950, y: 500 },
];

export default function Desktop({ audioContext }: { audioContext: AudioContext | null }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [nextZIndex, setNextZIndex] = useState(1);
  const [positionIndex, setPositionIndex] = useState(0);
  const { config } = useConfig();

  const openWindow = (id: string, title: string): void => {
    const icon = DESKTOP_ICONS.find((i) => i.id === id)?.icon || '📄';

    // Check if window already open
    const existing = windows.find((w) => w.id === id);
    if (existing) {
      // Bring to front
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, zIndex: nextZIndex } : w
        )
      );
      setNextZIndex((prev) => prev + 1);
      return;
    }

    // Get position from predefined list, cycling through if needed
    const pos = WINDOW_POSITIONS[positionIndex % WINDOW_POSITIONS.length];

    const newWindow: WindowState = {
      id,
      title,
      icon,
      x: pos.x,
      y: pos.y,
      width: 500,
      height: 400,
      minimized: false,
      zIndex: nextZIndex,
      content: id,
    };

    setWindows((prev) => [...prev, newWindow]);
    setNextZIndex((prev) => prev + 1);
    setPositionIndex((prev) => prev + 1);
    playSound('click', audioContext);
    setStartMenuOpen(false);
  };

  const closeWindow = (id: string): void => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    playSound('click', audioContext);
  };

  const minimizeWindow = (id: string): void => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, minimized: !w.minimized } : w
      )
    );
  };

  const updateWindow = (id: string, updates: Partial<WindowState>): void => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, ...updates, zIndex: nextZIndex }
          : w
      )
    );
    setNextZIndex((prev) => prev + 1);
  };

  const handleDesktopClick = (): void => {
    setStartMenuOpen(false);
  };

  const handleStartMenuOpen = (id: string, title: string): void => {
    openWindow(id, title);
  };

  const handleWindowClick = (id: string): void => {
    const win = windows.find((w) => w.id === id);
    if (win) {
      if (win.minimized) {
        minimizeWindow(id);
      } else {
        updateWindow(id, { zIndex: nextZIndex });
      }
    }
  };

  return (
    <div
      className="w-full h-full bg-teal-700 relative overflow-hidden cursor-default"
      onClick={handleDesktopClick}
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.03),
            rgba(0, 0, 0, 0.03) 1px,
            transparent 1px,
            transparent 2px
          )
        `,
      }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 grid gap-8" style={{ gridTemplateColumns: 'repeat(3, 80px)' }}>
        {DESKTOP_ICONS.map((icon) => (
          <div
            key={icon.id}
            className="flex flex-col items-center gap-1 cursor-pointer group"
            onClick={() => openWindow(icon.id, icon.label)}
            style={{ width: '80px' }}
          >
            <div className="text-5xl group-hover:bg-blue-600 group-hover:bg-opacity-50 p-2 rounded transition-colors">
              {icon.icon}
            </div>
            <div className="text-white text-xs text-center font-sans break-words">
              {icon.label}
            </div>
          </div>
        ))}
      </div>

      {/* Windows */}
      {windows.map((win) => (
        !win.minimized && (
          <Window
            key={win.id}
            window={win}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onUpdate={(updates) => updateWindow(win.id, updates)}
            onFocus={() => updateWindow(win.id, { zIndex: nextZIndex })}
            audioContext={audioContext}
          />
        )
      ))}

      {/* Start Menu */}
      {startMenuOpen && (
        <StartMenu
          onOpenWindow={handleStartMenuOpen}
          onClose={() => setStartMenuOpen(false)}
          audioContext={audioContext}
        />
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        startMenuOpen={startMenuOpen}
        onStartClick={() => setStartMenuOpen(!startMenuOpen)}
        onWindowClick={handleWindowClick}
        audioContext={audioContext}
      />
    </div>
  );
}
