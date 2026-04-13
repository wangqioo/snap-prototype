import { addBridgeLog } from './BridgeLogger';
import type { DeviceModel } from '../types';

let currentBrightness = 80;
let currentVolume = 60;
let currentModel: DeviceModel = 'mini';
const storageMap = new Map<string, string>();

export function setDeviceModel(model: DeviceModel) {
  currentModel = model;
}

export const SnapDevice = {
  screen: {
    getBrightness(): number {
      addBridgeLog('screen', 'getBrightness', [], currentBrightness);
      return currentBrightness;
    },
    setBrightness(value: number): void {
      currentBrightness = Math.max(10, Math.min(100, value));
      addBridgeLog('screen', 'setBrightness', [value]);
    },
    getResolution(): { width: number; height: number } {
      const res =
        currentModel === 'mini'
          ? { width: 800, height: 480 }
          : { width: 1280, height: 800 };
      addBridgeLog('screen', 'getResolution', [], res);
      return res;
    },
  },

  network: {
    getStatus(): { connected: boolean; type: string } {
      const status = { connected: true, type: 'wifi' };
      addBridgeLog('network', 'getStatus', [], status);
      return status;
    },
    getSSID(): string {
      const ssid = 'SnapDevice_5G';
      addBridgeLog('network', 'getSSID', [], ssid);
      return ssid;
    },
    getSignalStrength(): number {
      const strength = -45;
      addBridgeLog('network', 'getSignalStrength', [], strength);
      return strength;
    },
  },

  system: {
    getDeviceInfo(): Record<string, string> {
      const info = {
        model: currentModel === 'mini' ? 'Snap Mini' : 'Snap Pro',
        chip: currentModel === 'mini' ? 'RK3566' : 'RK3576',
        firmware: '1.0.0-beta',
        serial: 'SN-2026-DEMO-001',
      };
      addBridgeLog('system', 'getDeviceInfo', [], info);
      return info;
    },
    getModel(): string {
      addBridgeLog('system', 'getModel', [], currentModel);
      return currentModel;
    },
    getUptime(): number {
      const uptime = 3600;
      addBridgeLog('system', 'getUptime', [], uptime);
      return uptime;
    },
  },

  storage: {
    get(key: string): string | null {
      const val = storageMap.get(key) ?? null;
      addBridgeLog('storage', 'get', [key], val);
      return val;
    },
    set(key: string, value: string): void {
      storageMap.set(key, value);
      addBridgeLog('storage', 'set', [key, value]);
    },
    remove(key: string): void {
      storageMap.delete(key);
      addBridgeLog('storage', 'remove', [key]);
    },
  },

  audio: {
    play(url: string): void {
      addBridgeLog('audio', 'play', [url]);
    },
    stop(): void {
      addBridgeLog('audio', 'stop');
    },
    setVolume(value: number): void {
      currentVolume = Math.max(0, Math.min(100, value));
      addBridgeLog('audio', 'setVolume', [value]);
    },
    getVolume(): number {
      addBridgeLog('audio', 'getVolume', [], currentVolume);
      return currentVolume;
    },
  },

  camera: {
    isAvailable(): boolean {
      const available = currentModel === 'pro';
      addBridgeLog('camera', 'isAvailable', [], available);
      return available;
    },
    capture(): string | null {
      if (currentModel !== 'pro') {
        addBridgeLog('camera', 'capture', [], null, 'error');
        return null;
      }
      const result = 'data:image/png;base64,mockCaptureData...';
      addBridgeLog('camera', 'capture', [], '[Image Data]');
      return result;
    },
  },

  npu: {
    isAvailable(): boolean {
      const available = true;
      addBridgeLog('npu', 'isAvailable', [], available);
      return available;
    },
    getTops(): number {
      const tops = currentModel === 'mini' ? 1 : 6;
      addBridgeLog('npu', 'getTops', [], tops);
      return tops;
    },
  },
};

if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).SnapDevice = SnapDevice;
}
