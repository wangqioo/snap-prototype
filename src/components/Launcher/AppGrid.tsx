import type { SnapApp } from '../../types';
import { useDevice } from '../../context/DeviceContext';
import AppCard from './AppCard';

interface Props {
  apps: SnapApp[];
  onOpenApp: (app: SnapApp) => void;
}

export default function AppGrid({ apps, onOpenApp }: Props) {
  const { model } = useDevice();
  const cols = model === 'mini' ? 5 : 6;

  return (
    <div
      className="grid gap-1 px-2 py-1 overflow-y-auto flex-1"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {apps.map((app) => (
        <AppCard key={app.id} app={app} onOpen={onOpenApp} />
      ))}
    </div>
  );
}
