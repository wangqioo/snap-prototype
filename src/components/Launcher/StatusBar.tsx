import { useDevice } from '../../context/DeviceContext';
import { useEffect, useState } from 'react';

export default function StatusBar() {
  const { model } = useDevice();
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const t = setInterval(update, 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center justify-between px-3 py-1 bg-black/30 backdrop-blur-sm text-white/80 text-[10px]">
      <span className="font-medium">{model === 'mini' ? 'Snap Mini' : 'Snap Pro'}</span>
      <div className="flex items-center gap-2">
        <span>{time}</span>
        {/* WiFi icon */}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12.55a11 11 0 0114 0" />
          <path d="M8.53 16.11a6 6 0 016.95 0" />
          <circle cx="12" cy="20" r="1" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
