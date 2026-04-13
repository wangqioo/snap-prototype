import { useDevice } from '../context/DeviceContext';
import { DEVICES } from '../data/devices';
import type { DeviceModel } from '../types';

export default function DeviceSelector() {
  const { model, setModel } = useDevice();

  return (
    <div className="flex gap-3">
      {(['mini', 'pro'] as DeviceModel[]).map((m) => {
        const d = DEVICES[m];
        const active = model === m;
        return (
          <button
            key={m}
            onClick={() => setModel(m)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-all duration-200 ${
              active
                ? 'bg-snap-accent/15 border-snap-accent text-snap-accent shadow-lg shadow-snap-accent/10'
                : 'bg-snap-surface/50 border-snap-border text-snap-muted hover:border-snap-muted'
            }`}
          >
            <div className="text-left">
              <div className={`font-semibold text-sm ${active ? 'text-snap-accent' : 'text-snap-text'}`}>
                {d.name}
              </div>
              <div className="text-xs text-snap-muted">
                {d.screenSize} {d.chip} | {d.npu} NPU
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
