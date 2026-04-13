import type { ScreenView } from '../../types';

interface Props {
  current: 'discover' | 'installed' | 'settings';
  onNavigate: (target: ScreenView | 'discover' | 'installed') => void;
}

const items = [
  {
    key: 'discover' as const,
    label: '发现',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: 'installed' as const,
    label: '已安装',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    key: 'settings' as const,
    label: '设置',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
];

export default function BottomNav({ current, onNavigate }: Props) {
  return (
    <div className="flex items-center justify-around bg-black/40 backdrop-blur-sm border-t border-white/5 py-1">
      {items.map((item) => {
        const active = current === item.key;
        return (
          <button
            key={item.key}
            onClick={() =>
              onNavigate(item.key === 'settings' ? 'settings' : item.key)
            }
            className={`flex flex-col items-center gap-0.5 px-3 py-0.5 rounded-lg transition-colors ${
              active ? 'text-blue-400' : 'text-white/40 hover:text-white/60'
            }`}
          >
            {item.icon}
            <span className="text-[8px]">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
