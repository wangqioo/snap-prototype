import { useState, useMemo } from 'react';
import { useDevice } from '../../context/DeviceContext';
import { MOCK_APPS } from '../../data/mockApps';
import type { AppCategory, SnapApp } from '../../types';
import StatusBar from './StatusBar';
import SearchBar from './SearchBar';
import CategoryBar from './CategoryBar';
import AppGrid from './AppGrid';
import BottomNav from './BottomNav';

export default function LauncherHome() {
  const { setScreenView, setCurrentApp } = useDevice();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<AppCategory>('all');
  const [tab, setTab] = useState<'discover' | 'installed'>('discover');

  const filteredApps = useMemo(() => {
    let apps = MOCK_APPS;
    if (category !== 'all') {
      apps = apps.filter((a) => a.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      apps = apps.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return apps;
  }, [category, search]);

  const handleOpenApp = (app: SnapApp) => {
    setCurrentApp(app);
    setScreenView('app');
  };

  const handleNavigate = (target: string) => {
    if (target === 'settings') {
      setScreenView('settings');
    } else if (target === 'discover' || target === 'installed') {
      setTab(target as 'discover' | 'installed');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#0a0e1a] via-[#0f172a] to-[#0a0e1a] text-white">
      <StatusBar />
      <SearchBar value={search} onChange={setSearch} />
      <CategoryBar active={category} onChange={setCategory} />
      <AppGrid apps={filteredApps} onOpenApp={handleOpenApp} />
      <BottomNav current={tab} onNavigate={handleNavigate} />
    </div>
  );
}
