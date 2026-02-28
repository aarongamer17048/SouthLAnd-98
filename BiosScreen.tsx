import { useEffect, useState } from 'react';

const biosLines = [
  'Award BIOS v4.51PG',
  '',
  'Pentium II 266MHz Detected',
  'Memory Test: 131072K OK',
  'Cache SRAM Test: OK',
  'Keyboard Test: OK',
  '',
  'Booting from C:\\WINDOWS\\',
];

export default function BiosScreen() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < biosLines.length) {
        setDisplayedLines((prev) => [...prev, biosLines[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-black flex items-center justify-center p-8">
      <div className="font-mono text-green-400 text-sm leading-relaxed max-w-2xl">
        {displayedLines.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
        {displayedLines.length < biosLines.length && (
          <div className="animate-pulse">_</div>
        )}
      </div>
    </div>
  );
}
