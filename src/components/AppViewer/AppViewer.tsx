import { useState } from 'react';
import { useDevice } from '../../context/DeviceContext';

export default function AppViewer() {
  const { currentApp, setScreenView, setCurrentApp } = useDevice();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!currentApp) return null;

  const handleBack = () => {
    setCurrentApp(null);
    setScreenView('launcher');
  };

  const hasUrl = currentApp.url && currentApp.url.length > 0;

  return (
    <div className="flex flex-col h-full bg-black text-white relative">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2 px-2 py-1 bg-black/60 backdrop-blur-sm">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-white/70 hover:text-white text-[10px] px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 transition"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          返回
        </button>
        <span className="text-[10px] text-white/60 truncate flex-1">{currentApp.name}</span>
        <span className="text-[8px] text-white/30">By {currentApp.author}</span>
      </div>

      {/* App content area */}
      <div className="flex-1 pt-6">
        {hasUrl ? (
          <>
            {loading && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-5 bg-[#0a0e1a]">
                <div className="w-6 h-6 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                <span className="text-[10px] text-white/40 mt-2">正在加载 {currentApp.name}...</span>
              </div>
            )}
            {error ? (
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <div className="text-2xl">{currentApp.icon}</div>
                <p className="text-[11px] text-white/50">无法在嵌入模式下加载此应用</p>
                <a
                  href={currentApp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-400 hover:text-blue-300 underline"
                >
                  在新窗口中打开
                </a>
              </div>
            ) : (
              <iframe
                src={currentApp.url}
                className="w-full h-full border-0"
                onLoad={() => setLoading(false)}
                onError={() => {
                  setLoading(false);
                  setError(true);
                }}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                allow="camera; microphone; accelerometer; gyroscope"
              />
            )}
          </>
        ) : (
          /* Mock preview for apps without URL */
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="text-4xl">{currentApp.icon}</div>
            <h3 className="text-sm font-medium">{currentApp.name}</h3>
            <p className="text-[10px] text-white/50 text-center px-6">{currentApp.description}</p>
            <div className="flex gap-1 flex-wrap justify-center px-4">
              {currentApp.tags.map((tag) => (
                <span key={tag} className="text-[8px] px-1.5 py-0.5 bg-white/10 rounded-full text-white/50">
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-[9px] text-white/30 mt-2 flex items-center gap-2">
              <span>性能需求: {currentApp.performanceLevel}</span>
              {currentApp.requiresCamera && <span>| 需要摄像头</span>}
            </div>
            <p className="text-[9px] text-blue-400/60 mt-1">演示模式 - 实际设备将加载完整应用</p>
          </div>
        )}
      </div>
    </div>
  );
}
