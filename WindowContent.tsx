import { useState, useEffect } from 'react';
import { playSound } from '@/lib/sounds';

interface WindowContentProps {
  contentType: string;
  audioContext: AudioContext | null;
}

// Default fallback content for all apps
const DEFAULT_CONTENT: Record<string, any> = {
  'my-computer': {
    heading: 'My Computer',
    description: '🖥️ <strong>1998 Los Santos Server</strong>',
    intro: 'Welcome to the immersive 1998 Los Santos roleplay experience. This server brings the golden age of GTA back to life with authentic 90s aesthetics and gameplay.',
    features: [
      'Authentic 1998 Los Santos setting',
      'Immersive roleplay mechanics',
      'Period-accurate vehicles and clothing',
      'Active community and events'
    ]
  },
  'store': {
    heading: 'Store - Tebex',
    description: '🛍️ Purchase in-game items and cosmetics',
    items: [
      'Vintage Cars (Lowriders, Classics)',
      '90s Fashion & Clothing',
      'Phone Cards & Credits',
      'Character Customization',
      'Property Upgrades'
    ],
    link: '→ Visit Tebex Store'
  },
  'discord': {
    heading: 'Discord Community',
    description: '💬 Join our community on Discord',
    features: [
      'Real-time server announcements',
      'Player support and assistance',
      'Events and competitions',
      'Community forums',
      'Staff applications'
    ],
    link: '→ Join Discord Server'
  },
  'gallery': {
    heading: 'Gallery - MS Paint',
    description: '🖼️ Server Screenshots & Media',
    placeholder: 'Screenshots coming soon...'
  },
  'rules': {
    heading: 'Rules & Guidelines',
    rules: [
      { number: 1, title: 'Respect All Players', description: 'Treat everyone with courtesy and respect.' },
      { number: 2, title: 'No Hacking/Exploiting', description: 'Exploits and hacks will result in immediate ban.' },
      { number: 3, title: 'Roleplay Immersion', description: 'Stay in character at all times.' },
      { number: 4, title: 'No Power Gaming', description: 'Don\'t force actions on other players.' },
      { number: 5, title: 'No Metagaming', description: 'Don\'t use out-of-character information in-game.' },
      { number: 6, title: 'Respect Staff Decisions', description: 'Admin decisions are final.' },
      { number: 7, title: 'No Spam', description: 'Keep chat clean and organized.' },
      { number: 8, title: 'Report Issues', description: 'Use /report for problems.' }
    ]
  },
  'changelog': {
    heading: 'CHANGELOG.TXT',
    entries: [
      {
        version: '1.5.2',
        date: '2026-02-28',
        changes: ['Fixed vehicle spawn issues', 'Added new clothing store', 'Improved server stability']
      },
      {
        version: '1.5.1',
        date: '2026-02-20',
        changes: ['Performance optimizations', 'Fixed NPC pathfinding']
      },
      {
        version: '1.5.0',
        date: '2026-02-10',
        changes: ['New property system', 'Added business mechanics', 'Expanded map areas']
      }
    ]
  },
  'internet-explorer': {
    heading: 'Internet Explorer 4.0',
    description: '🌐 Quick Links',
    links: ['Discord Community', 'Tebex Store', 'Server Documentation', 'Player Support']
  },
  'control-panel': {
    heading: 'Control Panel',
    description: '⚙️ Server Information',
    info: {
      status: 'Online ✓',
      players: '42/128',
      version: '1.5.2',
      lastRestart: '2 days ago',
      uptime: '99.8%'
    },
    support: 'For support, contact staff on Discord.'
  },
  'network': {
    heading: 'Network Neighborhood',
    description: '🌍 Connected Players',
    players: ['Player_1 - Los Santos', 'Player_2 - Downtown', 'Player_3 - Beach', 'Player_4 - Grove Street'],
    note: 'Showing first 4 players...'
  },
  'winamp': {
    heading: 'WinAmp 2.0',
    description: '🎵 90s Radio Playlist',
    stations: [
      'K-ROSE - Country & Folk',
      'K-DST - Hip Hop & Rap',
      'RADIO LOS SANTOS - Reggae',
      'SFUR - Funk & Soul',
      'BOUNCE FM - Electro'
    ],
    nowPlaying: 'K-ROSE'
  },
  'error-popup': {
    heading: '⚠️ Error',
    button: 'Click for Error Message',
    errorTitle: '⚠️ Fatal Error',
    errorMessage: 'This program has performed an illegal operation and will be shut down.',
    errorDetails: 'If the problem persists, contact the system administrator.'
  },
  'recycle-bin': {
    heading: 'Recycle Bin',
    description: '🗑️ The Recycle Bin is empty',
    note: 'Deleted files appear here'
  }
};

export default function WindowContent({
  contentType,
  audioContext,
}: WindowContentProps) {
  const [showError, setShowError] = useState(false);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    // Try to load from config.json, fall back to default content
    const loadContent = async () => {
      try {
        const response = await fetch('/config.json');
        if (response.ok) {
          const data = await response.json();
          const appConfig = data.apps?.[contentType];
          if (appConfig?.content) {
            setContent(appConfig.content);
            return;
          }
        }
      } catch (err) {
        console.error('Error loading config:', err);
      }
      // Use default content as fallback
      setContent(DEFAULT_CONTENT[contentType] || null);
    };

    loadContent();
  }, [contentType]);

  const handleErrorClick = () => {
    playSound('error', audioContext);
    setShowError(true);
  };

  const closeError = () => {
    setShowError(false);
  };

  if (!content) {
    return (
      <div className="p-4 text-xs font-sans">
        <div className="font-bold">Unknown Program</div>
        <p className="text-gray-600">This program could not be loaded.</p>
      </div>
    );
  }

  switch (contentType) {
    case 'my-computer':
      return (
        <div className="p-4 text-xs font-sans">
          <div className="font-bold mb-2">{content.heading}</div>
          <div className="text-gray-700">
            <p className="mb-2" dangerouslySetInnerHTML={{ __html: content.description }} />
            <p className="mb-4">{content.intro}</p>
            {content.features && (
              <>
                <p className="mb-2"><strong>Server Features:</strong></p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  {content.features.map((feature: string, idx: number) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      );

    case 'store':
      return (
        <div className="p-4 text-xs font-sans">
          <div className="font-bold mb-2">{content.heading}</div>
          <div className="text-gray-700">
            <p className="mb-4">{content.description}</p>
            {content.items && (
              <>
                <p className="mb-2"><strong>Available Items:</strong></p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  {content.items.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </>
            )}
            <p className="text-blue-600 cursor-pointer hover:underline">
              {content.link}
            </p>
          </div>
        </div>
      );

    case 'discord':
      return (
        <div className="p-4 text-xs font-sans">
          <div className="font-bold mb-2">{content.heading}</div>
          <div className="text-gray-700">
            <p className="mb-4">{content.description}</p>
            {content.features && (
              <>
                <p className="mb-2"><strong>Community Features:</strong></p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  {content.features.map((feature: string, idx: number) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </>
            )}
            <p className="text-blue-600 cursor-pointer hover:underline">
              {content.link}
            </p>
          </div>
        </div>
      );

    case 'gallery':
      return (
        <div className="p-4 text-xs font-sans">
          <div className="font-bold mb-2">{content.heading}</div>
          <div className="text-gray-700">
            <p className="mb-4">{content.description}</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="border border-gray-400 p-2 bg-white text-center text-gray-500">
                [Screenshot 1]
              </div>
              <div className="border border-gray-400 p-2 bg-white text-center text-gray-500">
                [Screenshot 2]
              </div>
              <div className="border border-gray-400 p-2 bg-white text-center text-gray-500">
                [Screenshot 3]
              </div>
              <div className="border border-gray-400 p-2 bg-white text-center text-gray-500">
                [Screenshot 4]
              </div>
            </div>
            <p className="text-gray-600">{content.placeholder}</p>
          </div>
        </div>
      );

    case 'rules':
      return (
        <div className="p-4 text-xs font-sans overflow-y-auto max-h-96">
          <div className="font-bold mb-2">{content.heading}</div>
          <div className="text-gray-700 space-y-2">
            {content.rules && content.rules.map((rule: any, idx: number) => (
              <p key={idx}>
                <strong>{rule.number}. {rule.title}</strong> - {rule.description}
              </p>
            ))}
          </div>
        </div>
      );

    case 'changelog':
      return (
        <div className="p-4 text-xs font-mono overflow-y-auto max-h-96 bg-white text-black">
          <div className="font-bold mb-2">{content.heading}</div>
          <div className="space-y-2 text-gray-800">
            {content.entries && content.entries.map((entry: any, idx: number) => (
              <div key={idx}>
                <p>Version {entry.version} - {entry.date}</p>
                {entry.changes && entry.changes.map((change: string, cidx: number) => (
                  <p key={cidx}>- {change}</p>
                ))}
                {idx < content.entries.length - 1 && <p></p>}
              </div>
            ))}
          </div>
        </div>
      );

    case 'internet-explorer':
      return (
        <div className="p-4 text-xs font-sans">
          <div className="font-bold mb-2">{content.heading}</div>
          <div className="text-gray-700">
            <p className="mb-4">{content.description}</p>
            <div className="space-y-2">
              {content.links && content.links.map((link: string, idx: number) => (
                <p key={idx} className="text-blue-600 cursor-pointer hover:underline">
                  → {link}
                </p>
              ))}
            </div>
          </div>
        </div>
      );

    case 'control-panel':
      return (
        <div className="p-4 text-xs font-sans">
          <div className="font-bold mb-2">{content.heading}</div>
          <div className="text-gray-700">
            <p className="mb-4">{content.description}</p>
            {content.info && (
              <>
                <p className="mb-2"><strong>Server Status:</strong> {content.info.status}</p>
                <p className="mb-2"><strong>Players Online:</strong> {content.info.players}</p>
                <p className="mb-2"><strong>Server Version:</strong> {content.info.version}</p>
                <p className="mb-2"><strong>Last Restart:</strong> {content.info.lastRestart}</p>
                <p className="mb-4"><strong>Uptime:</strong> {content.info.uptime}</p>
              </>
            )}
            <p className="text-gray-600 text-xs">{content.support}</p>
          </div>
        </div>
      );

    case 'network':
      return (
        <div className="p-4 text-xs font-sans">
          <div className="font-bold mb-2">{content.heading}</div>
          <div className="text-gray-700">
            <p className="mb-4">{content.description}</p>
            {content.players && (
              <div className="space-y-1 mb-4">
                {content.players.map((player: string, idx: number) => (
                  <p key={idx}>👤 {player}</p>
                ))}
              </div>
            )}
            <p className="text-gray-600">{content.note}</p>
          </div>
        </div>
      );

    case 'winamp':
      return (
        <div className="p-4 text-xs font-sans">
          <div className="font-bold mb-2">{content.heading}</div>
          <div className="text-gray-700">
            <p className="mb-4">{content.description}</p>
            {content.stations && (
              <div className="space-y-1 mb-4">
                {content.stations.map((station: string, idx: number) => (
                  <p key={idx}>{idx === 0 ? '▶' : ' '} {station}</p>
                ))}
              </div>
            )}
            <p className="text-gray-600">Now Playing: {content.nowPlaying}</p>
          </div>
        </div>
      );

    case 'error-popup':
      return (
        <div className="p-4 text-xs font-sans">
          <div className="font-bold mb-4 text-red-600">{content.heading}</div>
          <button
            className="px-3 py-1 bg-gray-300 border-2 border-gray-400 hover:bg-gray-400 mb-4"
            onClick={handleErrorClick}
          >
            {content.button}
          </button>
          {showError && (
            <div className="fixed inset-0 flex items-center justify-center pointer-events-auto z-50">
              <div
                className="bg-gray-300 border-2 p-4 shadow-lg max-w-xs"
                style={{
                  borderColor: '#dfdfdf #808080 #808080 #dfdfdf',
                }}
              >
                <div className="font-bold mb-2 text-red-600">{content.errorTitle}</div>
                <p className="mb-4 text-xs">
                  {content.errorMessage}
                </p>
                <p className="mb-4 text-xs">
                  {content.errorDetails}
                </p>
                <button
                  className="px-4 py-1 bg-gray-300 border-2 border-gray-400 hover:bg-gray-400 w-full"
                  onClick={closeError}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      );

    case 'recycle-bin':
      return (
        <div className="p-4 text-xs font-sans">
          <div className="font-bold mb-2">{content.heading}</div>
          <div className="text-gray-700">
            <p className="mb-2">{content.description}</p>
            <p className="text-gray-600">{content.note}</p>
          </div>
        </div>
      );

    default:
      return (
        <div className="p-4 text-xs font-sans">
          <div className="font-bold">Unknown Program</div>
          <p className="text-gray-600">This program could not be loaded.</p>
        </div>
      );
  }
}
