import { CATEGORIES } from '../../data/mockApps';
import type { AppCategory } from '../../types';

interface Props {
  active: AppCategory;
  onChange: (c: AppCategory) => void;
}

export default function CategoryBar({ active, onChange }: Props) {
  return (
    <div className="flex gap-1 px-2 py-1 overflow-x-auto scrollbar-hide">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key as AppCategory)}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] whitespace-nowrap transition-all ${
            active === cat.key
              ? 'bg-blue-500/80 text-white'
              : 'bg-white/8 text-white/60 hover:bg-white/15'
          }`}
        >
          <span>{cat.icon}</span>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
