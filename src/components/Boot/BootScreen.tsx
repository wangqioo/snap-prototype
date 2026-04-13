import { useEffect, useState } from 'react';
import { useDevice } from '../../context/DeviceContext';

export default function BootScreen() {
  const { model, setScreenView } = useDevice();
  const [phase, setPhase] = useState<'logo' | 'loading' | 'done'>('logo');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('loading'), 1200);
    const t2 = setTimeout(() => setPhase('done'), 3800);
    const t3 = setTimeout(() => setScreenView('wifi-setup'), 4200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [setScreenView]);

  useEffect(() => {
    if (phase !== 'loading') return;
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 3 + Math.random() * 5, 100));
    }, 80);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#050810] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="rounded-full blur-3xl transition-all duration-1000"
          style={{
            width: phase === 'logo' ? 100 : 200,
            height: phase === 'logo' ? 100 : 200,
            background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent)',
          }}
        />
      </div>

      {/* Logo */}
      <div className={`transition-all duration-700 ${phase === 'logo' ? 'scale-110 opacity-100' : 'scale-100 opacity-90'}`}>
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-blue-400">Snap</span>
          <span className="text-white/70 text-lg ml-1">{model === 'mini' ? 'Mini' : 'Pro'}</span>
        </div>
      </div>

      {/* Loading bar */}
      {phase !== 'logo' && (
        <div className="mt-6 w-32">
          <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-400/80 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[8px] text-white/20 text-center mt-2">
            {phase === 'done' ? '启动完成' : '正在启动系统...'}
          </p>
        </div>
      )}

      {/* Bottom branding */}
      <div className="absolute bottom-4 text-[8px] text-white/15">
        Powered by HaiSnap
      </div>
    </div>
  );
}
