import { playSound } from '@/lib/sounds';

interface StartMenuProps {
  onOpenWindow: (id: string, title: string) => void;
  onClose: () => void;
  audioContext: AudioContext | null;
}

const MENU_ITEMS = [
  { id: 'my-computer', label: 'Home / Story', icon: '💻' },
  { id: 'store', label: 'Store', icon: '🛍️' },
  { id: 'discord', label: 'Discord', icon: '💬' },
  { id: 'gallery', label: 'Gallery (Paint)', icon: '🖼️' },
  { id: 'rules', label: 'Rules (Control Panel)', icon: '📋' },
  { id: 'changelog', label: 'Changelog (Notepad)', icon: '📝' },
  { id: 'internet-explorer', label: 'Internet Explorer', icon: '🌐' },
  { id: 'control-panel', label: 'Control Panel', icon: '⚙️' },
  { id: 'network', label: 'Network Neighborhood', icon: '🌍' },
  { id: 'winamp', label: 'WinAmp', icon: '🎵' },
  { id: 'error-popup', label: 'Error Popup', icon: '⚠️' },
];

export default function StartMenu({
  onOpenWindow,
  onClose,
  audioContext,
}: StartMenuProps) {
  const handleClick = (id: string, label: string) => {
    playSound('click', audioContext);
    onOpenWindow(id, label);
  };

  return (
    <div
      className="absolute bottom-7 left-0 bg-gray-300 border-2 shadow-lg"
      style={{
        borderColor: '#dfdfdf #808080 #808080 #dfdfdf',
        width: '200px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {MENU_ITEMS.map((item, idx) => (
        <div
          key={item.id}
          className="px-2 py-1 hover:bg-blue-600 hover:text-white cursor-pointer text-xs flex items-center gap-2 border-b border-gray-400"
          onClick={() => handleClick(item.id, item.label)}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
      <div className="border-t-2 border-gray-400 px-2 py-1 text-xs text-gray-600">
        Shut Down...
      </div>
    </div>
  );
}
