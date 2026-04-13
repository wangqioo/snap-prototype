import { useDevice } from '../../context/DeviceContext';
import { DEVICES } from '../../data/devices';

export default function DeviceSpecs() {
  const { model } = useDevice();
  const d = DEVICES[model];

  const specs = [
    { label: '芯片', value: d.chip },
    { label: 'CPU', value: d.cpu },
    { label: 'GPU', value: d.gpu },
    { label: 'NPU', value: d.npu },
    { label: '内存', value: d.ram },
    { label: '存储', value: d.storage },
    { label: '屏幕', value: `${d.screenSize} ${d.screenWidth}x${d.screenHeight}` },
    { label: '摄像头', value: d.hasCamera ? '5MP OV5647' : '无' },
    { label: 'WiFi', value: model === 'mini' ? '802.11ac' : 'WiFi 6' },
    { label: 'HDMI', value: d.hasHDMI ? '4K@60fps' : '无' },
  ];

  return (
    <div className="px-3 py-2">
      <h3 className="text-xs font-semibold text-snap-text mb-2">硬件参数</h3>
      <div className="space-y-1">
        {specs.map(({ label, value }) => (
          <div key={label} className="flex justify-between text-[10px]">
            <span className="text-snap-muted">{label}</span>
            <span className="text-snap-text/80 font-mono">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-2 border-t border-snap-border flex justify-between text-[11px]">
        <span className="text-snap-muted">建议零售价</span>
        <span className="text-snap-accent font-semibold">{d.price} 元</span>
      </div>
    </div>
  );
}
