import { useState, useRef } from 'react';
import WindowContent from './WindowContent';
import type { WindowState } from './Desktop';

interface WindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onUpdate: (updates: Partial<WindowState>) => void;
  onFocus: () => void;
  audioContext: AudioContext | null;
}

export default function Window({
  window,
  onClose,
  onMinimize,
  onUpdate,
  onFocus,
  audioContext,
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.window-button')) return;
    
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - window.x,
      y: e.clientY - window.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      onUpdate({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onFocus();
    setIsResizing(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = window.width;
    const startHeight = window.height;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      onUpdate({
        width: Math.max(300, startWidth + deltaX),
        height: Math.max(200, startHeight + deltaY),
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={windowRef}
      className="absolute bg-gray-300 border-2 flex flex-col shadow-lg"
      style={{
        left: `${window.x}px`,
        top: `${window.y}px`,
        width: `${window.width}px`,
        height: `${window.height}px`,
        zIndex: window.zIndex,
        borderStyle: 'solid',
        borderColor: '#dfdfdf #808080 #808080 #dfdfdf',
        borderWidth: '2px',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="bg-blue-600 text-white px-1 py-0.5 flex items-center justify-between cursor-move select-none"
        onMouseDown={handleMouseDown}
        style={{
          backgroundImage: 'linear-gradient(90deg, #000080, #1084d7)',
        }}
      >
        <div className="flex items-center gap-1">
          <span className="text-lg">{window.icon}</span>
          <span className="text-xs font-bold">{window.title}</span>
        </div>
        <div className="flex gap-0.5">
          <button
            className="window-button w-5 h-5 bg-gray-300 border border-gray-400 flex items-center justify-center text-xs font-bold hover:bg-gray-400"
            onClick={onMinimize}
          >
            _
          </button>
          <button
            className="window-button w-5 h-5 bg-gray-300 border border-gray-400 flex items-center justify-center text-xs font-bold hover:bg-gray-400"
            onClick={onClose}
          >
            ×
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-gray-300 p-2">
        <WindowContent contentType={window.content} audioContext={audioContext} />
      </div>

      {/* Resize Handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 bg-gray-300 cursor-se-resize"
        style={{
          borderStyle: 'solid',
          borderColor: '#dfdfdf #808080 #808080 #dfdfdf',
          borderWidth: '1px',
        }}
        onMouseDown={handleResizeStart}
      />
    </div>
  );
}
