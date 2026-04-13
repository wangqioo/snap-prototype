import type { SnapApp } from '../../types';
import { useDevice } from '../../context/DeviceContext';

interface Props {
  app: SnapApp;
  onOpen: (app: SnapApp) => void;
}

export default function AppCard({ app, onOpen }: Props) {
  const { model } = useDevice();
  const compatible =
    app.hardwareTier === 'all' ||
    (Array.isArray(app.hardwareTier) && app.hardwareTier.includes(model));

  return (
    <button
      onClick={() => compatible && onOpen(app)}
      className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all duration-150 ${
        compatible
          ? 'hover:bg-white/10 active:scale-95 cursor-pointer'
          : 'opacity-35 cursor-not-allowed'
      }`}
    >
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/15 to-white/5 flex items-center justify-center text-xl shadow-lg">
          {app.icon}
        </div>
        {app.requiresCamera && (
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
              <circle cx="12" cy="13" r="4" fill="white" />
            </svg>
          </div>
        )}
        {!compatible && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-[8px] text-red-400 bg-black/60 px-1 rounded">Pro</div>
          </div>
        )}
      </div>
      <span className="text-[9px] text-white/80 text-center leading-tight line-clamp-1 w-full mt-0.5">
        {app.name}
      </span>
    </button>
  );
}
