import { useDevice } from '../../context/DeviceContext';
import { DEVICES } from '../../data/devices';
import { SnapDevice } from '../../bridge/SnapDevice';
import StatusBar from '../Launcher/StatusBar';

export default function SettingsPage() {
  const { model, setScreenView, brightness, setBrightness } = useDevice();
  const device = DEVICES[model];

  const handleBrightnessChange = (val: number) => {
    setBrightness(val);
    SnapDevice.screen.setBrightness(val);
  };

  const handleBack = () => setScreenView('launcher');

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#0a0e1a] via-[#0f172a] to-[#0a0e1a] text-white">
      <StatusBar />

      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/5">
        <button
          onClick={handleBack}
          className="text-white/50 hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-[12px] font-medium">设置</span>
      </div>

      {/* Settings list */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3">
        {/* WiFi */}
        <Section title="网络">
          <Row label="WiFi" value="SnapDevice_5G" icon="wifi" />
          <Row label="蓝牙" value="已连接" icon="bt" />
          <Row label="IP 地址" value="192.168.1.108" />
        </Section>

        {/* Display */}
        <Section title="显示">
          <div className="flex items-center justify-between py-1">
            <span className="text-[10px] text-white/70">亮度</span>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={10}
                max={100}
                value={brightness}
                onChange={(e) => handleBrightnessChange(Number(e.target.value))}
                className="w-24 h-1 accent-blue-500"
              />
              <span className="text-[9px] text-white/40 w-6 text-right">{brightness}%</span>
            </div>
          </div>
          <Row label="自动休眠" value="5 分钟" />
        </Section>

        {/* Audio */}
        <Section title="音频">
          <Row label="扬声器" value={device.hasDualSpeakers ? '立体声 2x2W' : '单声道 1.5W'} />
          <Row label="麦克风" value={device.hasCamera ? '双 MEMS 阵列' : '单 MEMS'} />
        </Section>

        {/* About */}
        <Section title="关于设备">
          <Row label="设备型号" value={device.name} />
          <Row label="芯片" value={device.chip} />
          <Row label="CPU" value={device.cpu} />
          <Row label="GPU" value={device.gpu} />
          <Row label="NPU" value={device.npu} />
          <Row label="内存" value={device.ram} />
          <Row label="存储" value={device.storage} />
          <Row label="固件版本" value="v1.0.0-beta" />
          <Row label="序列号" value="SN-2026-DEMO-001" />
        </Section>

        {/* Account */}
        <Section title="响指账号">
          <Row label="账号状态" value="已绑定" />
          <Row label="用户名" value="snap_user" />
          <Row label="App 缓存" value="156 MB / 8 GB" />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[9px] text-white/30 uppercase tracking-wider mb-1">{title}</h3>
      <div className="bg-white/5 rounded-lg px-2.5 py-1 divide-y divide-white/5">{children}</div>
    </div>
  );
}

function Row({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: string;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-1.5">
        {icon === 'wifi' && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400">
            <path d="M5 12.55a11 11 0 0114 0" /><path d="M8.53 16.11a6 6 0 016.95 0" /><circle cx="12" cy="20" r="1" fill="currentColor" />
          </svg>
        )}
        {icon === 'bt' && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
            <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
          </svg>
        )}
        <span className="text-[10px] text-white/70">{label}</span>
      </div>
      <span className="text-[10px] text-white/40">{value}</span>
    </div>
  );
}
