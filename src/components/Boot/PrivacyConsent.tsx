import { useState } from 'react';
import { useDevice } from '../../context/DeviceContext';

export default function PrivacyConsent() {
  const { setScreenView } = useDevice();
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#0a0e1a] text-white">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-sm font-semibold">用户协议与隐私政策</h2>
        <p className="text-[9px] text-white/40 mt-0.5">使用前请阅读并同意以下条款</p>
      </div>

      {/* Content */}
      <div className="flex-1 mx-3 bg-white/5 rounded-lg p-3 overflow-y-auto text-[9px] text-white/50 leading-relaxed space-y-2">
        <h3 className="text-[10px] text-white/70 font-medium">一、服务条款</h3>
        <p>
          Snap 智能终端（以下简称"本设备"）由 Snap 团队提供硬件服务，应用内容由响指 HaiSnap 平台提供。
          使用本设备即表示您同意遵守本服务条款。
        </p>

        <h3 className="text-[10px] text-white/70 font-medium">二、用户数据收集</h3>
        <p>为了提供更好的服务体验，本设备可能收集以下数据：</p>
        <ul className="list-disc pl-4 space-y-0.5">
          <li>设备使用时长与频率</li>
          <li>应用安装与使用偏好</li>
          <li>网络连接状态</li>
          <li>设备性能指标（用于优化体验）</li>
        </ul>
        <p>
          上述数据将随设备运行一并提供，仅用于改善产品体验和服务质量。
          我们不会收集您的个人身份信息，除非您主动注册响指 HaiSnap 账号。
        </p>

        <h3 className="text-[10px] text-white/70 font-medium">三、响指 HaiSnap 账号</h3>
        <p>
          部分功能需要登录响指 HaiSnap 账号。登录后，您的账号信息将受到响指平台隐私政策的保护。
          详细信息请参阅 haisnap.com 的隐私政策页面。
        </p>

        <h3 className="text-[10px] text-white/70 font-medium">四、摄像头与麦克风</h3>
        <p>
          部分应用可能需要使用摄像头和/或麦克风。设备将在每次使用前明确请求您的授权。
          您可以随时在设置中关闭相关权限。摄像头和麦克风数据仅在本地处理，不会上传至云端，
          除非应用明确说明并获得您的同意。
        </p>

        <h3 className="text-[10px] text-white/70 font-medium">五、数据安全</h3>
        <p>
          我们采取合理的技术和管理措施保护您的数据安全。所有网络传输均使用 HTTPS 加密。
          本地存储的数据受设备系统级安全保护。
        </p>

        <h3 className="text-[10px] text-white/70 font-medium">六、联系我们</h3>
        <p>
          如果您对本隐私政策有任何疑问，请通过以下方式联系我们：
          support@snap-device.com
        </p>
      </div>

      {/* Agreement */}
      <div className="px-4 py-2 space-y-2">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 accent-blue-500"
          />
          <span className="text-[9px] text-white/60 leading-tight">
            我已阅读并同意《用户服务协议》和《隐私政策》，
            同意设备收集必要的使用数据以改善服务体验
          </span>
        </label>

        <button
          onClick={() => agreed && setScreenView('account')}
          disabled={!agreed}
          className={`w-full py-1.5 rounded-lg text-[11px] font-medium transition-all ${
            agreed
              ? 'bg-blue-500 hover:bg-blue-400 text-white'
              : 'bg-white/5 text-white/20 cursor-not-allowed'
          }`}
        >
          同意并继续
        </button>
      </div>
    </div>
  );
}
