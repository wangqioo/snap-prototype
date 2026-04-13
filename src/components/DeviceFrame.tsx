import { ReactNode } from 'react';
import { useDevice } from '../context/DeviceContext';

interface Props {
  children: ReactNode;
}

export default function DeviceFrame({ children }: Props) {
  const { model, brightness } = useDevice();
  const isMini = model === 'mini';

  const screenW = isMini ? 400 : 512;
  const screenH = isMini ? 240 : 320;
  const bezel = isMini ? 16 : 18;
  const radius = isMini ? 20 : 24;
  const frameW = screenW + bezel * 2;
  const frameH = screenH + bezel * 2 + (isMini ? 8 : 14);

  return (
    <div className="flex flex-col items-center select-none">
      {/* Device body */}
      <div
        className="relative"
        style={{
          width: frameW,
          height: frameH,
          borderRadius: radius,
          background: 'linear-gradient(145deg, #2a2a30, #1a1a20)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Top bezel details */}
        {!isMini && (
          <div className="absolute top-[7px] left-1/2 -translate-x-1/2 flex items-center gap-3">
            {/* Camera lens */}
            <div className="w-[10px] h-[10px] rounded-full bg-gray-800 border border-gray-600 shadow-inner"
                 title="5MP OV5647">
              <div className="w-[4px] h-[4px] rounded-full bg-blue-400/30 mx-auto mt-[2px]" />
            </div>
            {/* Status LED */}
            <div className="w-[5px] h-[5px] rounded-full bg-green-500/60 animate-pulse" />
          </div>
        )}

        {isMini && (
          <div className="absolute top-[6px] right-[20px]">
            <div className="w-[5px] h-[5px] rounded-full bg-green-500/60 animate-pulse" />
          </div>
        )}

        {/* Screen area */}
        <div
          className="absolute overflow-hidden bg-black"
          style={{
            top: isMini ? bezel : bezel + 6,
            left: bezel,
            width: screenW,
            height: screenH,
            borderRadius: radius - 8,
            filter: `brightness(${brightness / 100})`,
          }}
        >
          {children}
        </div>

        {/* Side button - back */}
        <div
          className="absolute bg-gray-600 rounded-r-sm hover:bg-gray-500 cursor-pointer transition-colors"
          style={{
            right: -4,
            top: isMini ? '40%' : '35%',
            width: 4,
            height: 28,
            borderRadius: '0 3px 3px 0',
          }}
          title="返回键"
        />

        {/* Pro: second button (power) */}
        {!isMini && (
          <div
            className="absolute bg-gray-600 rounded-r-sm"
            style={{
              right: -4,
              top: '50%',
              width: 4,
              height: 20,
              borderRadius: '0 3px 3px 0',
            }}
            title="电源键"
          />
        )}

        {/* Bottom ports */}
        <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 flex items-center gap-4">
          {/* USB-C */}
          <div
            className="bg-gray-700 rounded-sm"
            style={{ width: 20, height: 5, borderRadius: 2 }}
            title="USB-C"
          />
          {/* HDMI (Pro only) */}
          {!isMini && (
            <div
              className="bg-gray-700 rounded-sm"
              style={{ width: 14, height: 4, borderRadius: 1 }}
              title="Micro HDMI"
            />
          )}
        </div>

        {/* Speaker grille */}
        <div className="absolute bottom-[4px] left-[20px] flex gap-[2px]">
          {Array.from({ length: isMini ? 4 : 6 }).map((_, i) => (
            <div key={i} className="w-[2px] h-[3px] bg-gray-600 rounded-full" />
          ))}
        </div>
        {!isMini && (
          <div className="absolute bottom-[4px] right-[20px] flex gap-[2px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-[2px] h-[3px] bg-gray-600 rounded-full" />
            ))}
          </div>
        )}
      </div>

      {/* Stand */}
      <div className="relative" style={{ width: frameW }}>
        <svg viewBox="0 0 200 30" className="w-[60%] mx-auto -mt-[1px]" style={{ opacity: 0.7 }}>
          <path
            d="M 70 0 L 55 28 Q 54 30 56 30 L 144 30 Q 146 30 145 28 L 130 0"
            fill="#1a1a20"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </div>
  );
}
