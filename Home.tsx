import { useState, useEffect, useRef } from 'react';
import BiosScreen from '@/components/BiosScreen';
import BootScreen from '@/components/BootScreen';
import Desktop from '@/components/Desktop';

type BootStage = 'bios' | 'boot' | 'desktop';

export default function Home() {
  const [bootStage, setBootStage] = useState<BootStage>('bios');
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context on first interaction
    const handleFirstInteraction = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      document.removeEventListener('click', handleFirstInteraction);
    };
    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, []);

  // BIOS → Boot (1-2 seconds)
  useEffect(() => {
    if (bootStage === 'bios') {
      const timer = setTimeout(() => setBootStage('boot'), 1500);
      return () => clearTimeout(timer);
    }
  }, [bootStage]);

  // Boot → Desktop (3 seconds)
  useEffect(() => {
    if (bootStage === 'boot') {
      const timer = setTimeout(() => setBootStage('desktop'), 3000);
      return () => clearTimeout(timer);
    }
  }, [bootStage]);

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {bootStage === 'bios' && <BiosScreen />}
      {bootStage === 'boot' && <BootScreen />}
      {bootStage === 'desktop' && <Desktop audioContext={audioContextRef.current} />}
    </div>
  );
}
