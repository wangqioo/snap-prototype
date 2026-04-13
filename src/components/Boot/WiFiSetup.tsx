import { useState } from 'react';
import { useDevice } from '../../context/DeviceContext';

const MOCK_NETWORKS = [
  { ssid: 'SnapDevice_5G', signal: -35, secured: true },
  { ssid: 'Home-WiFi', signal: -50, secured: true },
  { ssid: 'Office_Network', signal: -62, secured: true },
  { ssid: 'Guest', signal: -70, secured: false },
];

export default function WiFiSetup() {
  const { setScreenView } = useDevice();
  const [selected, setSelected] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = (ssid: string) => {
    setSelected(ssid);
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      setTimeout(() => setScreenView('privacy'), 1000);
    }, 1500);
  };

  const signalBars = (dbm: number) => {
    const bars = dbm > -45 ? 3 : dbm > -60 ? 2 : 1;
    return (
      <div className="flex items-end gap-[1px]">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-[3px] rounded-sm ${i <= bars ? 'bg-green-400' : 'bg-white/15'}`}
            style={{ height: 4 + i * 3 }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0e1a] text-white">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-sm font-semibold">连接 WiFi</h2>
        <p className="text-[9px] text-white/40 mt-0.5">选择网络以连接到互联网</p>
      </div>

      {/* Network list */}
      <div className="flex-1 px-3 space-y-1 overflow-y-auto">
        {MOCK_NETWORKS.map((net) => {
          const isSelected = selected === net.ssid;
          return (
            <button
              key={net.ssid}
              onClick={() => !connecting && !connected && handleConnect(net.ssid)}
              disabled={connecting || connected}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                isSelected
                  ? connected
                    ? 'bg-green-500/15 border border-green-500/30'
                    : 'bg-blue-500/15 border border-blue-500/30'
                  : 'bg-white/5 hover:bg-white/8 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                {net.secured && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/30">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                )}
                <span className="text-[11px]">{net.ssid}</span>
              </div>
              <div className="flex items-center gap-2">
                {isSelected && connecting && (
                  <div className="w-3 h-3 border border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                )}
                {isSelected && connected && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-green-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                {signalBars(net.signal)}
              </div>
            </button>
          );
        })}
      </div>

      {/* Skip button */}
      {!connected && !connecting && (
        <div className="px-4 py-3">
          <button
            onClick={() => setScreenView('privacy')}
            className="w-full text-[10px] text-white/30 hover:text-white/50 py-1"
          >
            跳过，稍后设置
          </button>
        </div>
      )}
    </div>
  );
}
