import { useState, useEffect, useRef } from 'react';
import { subscribe, getLogs, clearLogs } from '../../bridge/BridgeLogger';
import type { BridgeLog } from '../../types';

export default function BridgeConsole() {
  const [logs, setLogs] = useState<BridgeLog[]>(getLogs());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return subscribe((newLogs) => {
      setLogs([...newLogs]);
    });
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
  };

  const formatArgs = (args?: unknown[]) => {
    if (!args || args.length === 0) return '';
    return args.map((a) => (typeof a === 'string' ? `"${a}"` : JSON.stringify(a))).join(', ');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-snap-border">
        <h3 className="text-xs font-semibold text-snap-text">Bridge Console</h3>
        <button
          onClick={clearLogs}
          className="text-[10px] text-snap-muted hover:text-snap-text px-2 py-0.5 rounded bg-snap-surface hover:bg-snap-border transition"
        >
          Clear
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 space-y-0.5 font-mono text-[10px]">
        {logs.length === 0 ? (
          <div className="text-snap-muted text-center py-8">
            <p>API 调用日志将显示在这里</p>
            <p className="text-[9px] mt-1 opacity-60">在设备中操作触发 SnapDevice API</p>
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`flex gap-1.5 py-0.5 border-l-2 pl-1.5 ${
                log.type === 'error'
                  ? 'border-red-500/60 text-red-400'
                  : 'border-blue-500/30 text-snap-muted'
              }`}
            >
              <span className="text-snap-muted/50 shrink-0">{formatTime(log.timestamp)}</span>
              <span className="text-blue-400 shrink-0">{log.module}</span>
              <span className="text-snap-text/70">.{log.method}({formatArgs(log.args)})</span>
              {log.result !== undefined && (
                <span className="text-green-400/70 truncate">
                  → {typeof log.result === 'object' ? JSON.stringify(log.result) : String(log.result)}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
