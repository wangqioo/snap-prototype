import { DeviceProvider } from './context/DeviceContext';
import DeviceSelector from './components/DeviceSelector';
import DeviceFrame from './components/DeviceFrame';
import ScreenContent from './components/ScreenContent';
import BridgeConsole from './components/Debug/BridgeConsole';
import DeviceSpecs from './components/Debug/DeviceSpecs';
import './bridge/SnapDevice';

export default function App() {
  return (
    <DeviceProvider>
      <div className="min-h-screen bg-[#080c14] text-snap-text">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-snap-border/50">
          <div className="flex items-center gap-4">
            <h1 className="text-base font-bold text-snap-text tracking-tight">
              <span className="text-snap-accent">Snap</span> 智能终端
              <span className="text-snap-muted font-normal text-xs ml-2">原型演示</span>
            </h1>
            <DeviceSelector />
          </div>
          <div className="text-[10px] text-snap-muted">
            Powered by <span className="text-snap-accent/70">HaiSnap</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex gap-0 h-[calc(100vh-52px)]">
          {/* Left: Device Simulator */}
          <div className="flex-1 flex items-center justify-center p-6">
            <DeviceFrame>
              <ScreenContent />
            </DeviceFrame>
          </div>

          {/* Right: Debug Panel */}
          <div className="w-[320px] border-l border-snap-border/50 flex flex-col bg-snap-darker/50">
            {/* Bridge Console */}
            <div className="flex-1 min-h-0">
              <BridgeConsole />
            </div>
            {/* Device Specs */}
            <div className="border-t border-snap-border/50">
              <DeviceSpecs />
            </div>
          </div>
        </div>
      </div>
    </DeviceProvider>
  );
}
