interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="px-2 py-1.5">
      <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1.5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="搜索应用..."
          className="bg-transparent text-white text-[11px] outline-none w-full placeholder:text-white/30"
        />
        {value && (
          <button onClick={() => onChange('')} className="text-white/40 hover:text-white/70 text-xs">
            x
          </button>
        )}
      </div>
    </div>
  );
}
