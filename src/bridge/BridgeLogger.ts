import type { BridgeLog } from '../types';

type LogListener = (logs: BridgeLog[]) => void;

let logIdCounter = 0;
let logs: BridgeLog[] = [];
const listeners: Set<LogListener> = new Set();

export function addBridgeLog(
  module: string,
  method: string,
  args?: unknown[],
  result?: unknown,
  type: 'call' | 'result' | 'error' = 'call'
): void {
  const log: BridgeLog = {
    id: ++logIdCounter,
    timestamp: Date.now(),
    module,
    method,
    args,
    result,
    type,
  };
  logs = [...logs.slice(-99), log];
  listeners.forEach((fn) => fn(logs));
}

export function getLogs(): BridgeLog[] {
  return logs;
}

export function clearLogs(): void {
  logs = [];
  listeners.forEach((fn) => fn(logs));
}

export function subscribe(fn: LogListener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
