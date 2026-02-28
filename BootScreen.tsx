import { useEffect, useState } from 'react';

export default function BootScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 25;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-blue-600 flex flex-col items-center justify-center">
      {/* Windows 95 Logo */}
      <div className="mb-12">
        <div className="text-6xl font-bold text-white tracking-widest">Windows 95</div>
      </div>

      {/* Status Text */}
      <div className="mb-8 text-white text-lg font-sans">Starting Windows 95...</div>

      {/* Progress Bar Container */}
      <div className="w-64 h-6 border-2 border-white bg-gray-300 relative">
        <div
          className="h-full bg-blue-400 transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Loading text */}
      <div className="mt-4 text-white text-sm">
        {Math.min(Math.round(progress), 100)}%
      </div>
    </div>
  );
}
