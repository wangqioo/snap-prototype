export type DeviceModel = 'mini' | 'pro';

export interface DeviceSpec {
  model: DeviceModel;
  name: string;
  screenWidth: number;
  screenHeight: number;
  chip: string;
  cpu: string;
  gpu: string;
  npu: string;
  ram: string;
  storage: string;
  screenSize: string;
  hasCamera: boolean;
  hasHDMI: boolean;
  hasDualSpeakers: boolean;
  price: string;
}

export interface SnapApp {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AppCategory;
  url?: string;
  screenshot?: string;
  hardwareTier: DeviceModel[] | 'all';
  requiresCamera: boolean;
  requiresMicrophone: boolean;
  performanceLevel: 'low' | 'medium' | 'high';
  author: string;
  tags: string[];
}

export type AppCategory = 'all' | 'tools' | 'games' | 'life' | 'education' | 'ai';

export interface BridgeLog {
  id: number;
  timestamp: number;
  module: string;
  method: string;
  args?: unknown[];
  result?: unknown;
  type: 'call' | 'result' | 'error';
}

export type ScreenView = 'boot' | 'wifi-setup' | 'privacy' | 'account' | 'launcher' | 'app' | 'settings';

export interface WiFiNetwork {
  ssid: string;
  signal: number;
  connected: boolean;
  secured: boolean;
}
