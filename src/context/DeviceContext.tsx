import { createContext, useContext, useState, ReactNode } from 'react';
import type { DeviceModel, ScreenView, SnapApp } from '../types';
import { setDeviceModel } from '../bridge/SnapDevice';

interface DeviceState {
  model: DeviceModel;
  setModel: (m: DeviceModel) => void;
  screenView: ScreenView;
  setScreenView: (v: ScreenView) => void;
  currentApp: SnapApp | null;
  setCurrentApp: (app: SnapApp | null) => void;
  brightness: number;
  setBrightness: (b: number) => void;
}

const DeviceContext = createContext<DeviceState | null>(null);

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [model, setModelState] = useState<DeviceModel>('mini');
  const [screenView, setScreenView] = useState<ScreenView>('launcher');
  const [currentApp, setCurrentApp] = useState<SnapApp | null>(null);
  const [brightness, setBrightness] = useState(80);

  const setModel = (m: DeviceModel) => {
    setModelState(m);
    setDeviceModel(m);
    setScreenView('launcher');
    setCurrentApp(null);
  };

  return (
    <DeviceContext.Provider
      value={{
        model,
        setModel,
        screenView,
        setScreenView,
        currentApp,
        setCurrentApp,
        brightness,
        setBrightness,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice(): DeviceState {
  const ctx = useContext(DeviceContext);
  if (!ctx) throw new Error('useDevice must be inside DeviceProvider');
  return ctx;
}
