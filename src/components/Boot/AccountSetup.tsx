import { useState } from 'react';
import { useDevice } from '../../context/DeviceContext';

export default function AccountSetup() {
  const { setScreenView } = useDevice();
  const [mode, setMode] = useState<'choice' | 'login' | 'done'>('choice');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [sending, setSending] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [logging, setLogging] = useState(false);

  const handleSendCode = () => {
    if (phone.length < 6) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setCodeSent(true);
    }, 1000);
  };

  const handleLogin = () => {
    if (code.length < 4) return;
    setLogging(true);
    setTimeout(() => {
      setLogging(false);
      setMode('done');
      setTimeout(() => setScreenView('launcher'), 1200);
    }, 1500);
  };

  if (mode === 'done') {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-[#0a0e1a] text-white">
        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-400">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-sm font-medium">设置完成</p>
        <p className="text-[9px] text-white/40 mt-1">正在进入 Snap 桌面...</p>
      </div>
    );
  }

  if (mode === 'login') {
    return (
      <div className="flex flex-col h-full bg-[#0a0e1a] text-white">
        <div className="px-4 pt-4 pb-2">
          <button onClick={() => setMode('choice')} className="text-[10px] text-white/40 hover:text-white/60 mb-2">
            &larr; 返回
          </button>
          <h2 className="text-sm font-semibold">登录响指账号</h2>
          <p className="text-[9px] text-white/40 mt-0.5">使用手机号快速登录</p>
        </div>

        <div className="flex-1 px-4 pt-4 space-y-3">
          {/* HaiSnap logo */}
          <div className="flex items-center justify-center gap-2 py-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">
              HS
            </div>
            <span className="text-[11px] text-white/60">HaiSnap</span>
          </div>

          {/* Phone input */}
          <div>
            <label className="text-[9px] text-white/40 block mb-1">手机号</label>
            <div className="flex gap-1.5">
              <span className="bg-white/5 border border-white/10 rounded-md px-2 py-1.5 text-[10px] text-white/50">+86</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                placeholder="请输入手机号"
                className="flex-1 bg-white/5 border border-white/10 rounded-md px-2 py-1.5 text-[10px] text-white placeholder:text-white/20 outline-none focus:border-blue-500/50"
              />
            </div>
          </div>

          {/* Verification code */}
          <div>
            <label className="text-[9px] text-white/40 block mb-1">验证码</label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="输入验证码"
                disabled={!codeSent}
                className="flex-1 bg-white/5 border border-white/10 rounded-md px-2 py-1.5 text-[10px] text-white placeholder:text-white/20 outline-none focus:border-blue-500/50 disabled:opacity-40"
              />
              <button
                onClick={handleSendCode}
                disabled={phone.length < 6 || sending || codeSent}
                className={`px-2 py-1.5 rounded-md text-[9px] whitespace-nowrap transition-all ${
                  codeSent
                    ? 'bg-white/5 text-white/30'
                    : phone.length >= 6 && !sending
                      ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                      : 'bg-white/5 text-white/20'
                }`}
              >
                {sending ? '发送中...' : codeSent ? '已发送' : '获取验证码'}
              </button>
            </div>
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            disabled={code.length < 4 || logging}
            className={`w-full py-1.5 rounded-lg text-[11px] font-medium transition-all mt-2 ${
              code.length >= 4 && !logging
                ? 'bg-blue-500 hover:bg-blue-400 text-white'
                : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}
          >
            {logging ? (
              <span className="flex items-center justify-center gap-1.5">
                <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" />
                登录中...
              </span>
            ) : (
              '登录'
            )}
          </button>
        </div>

        {/* Skip */}
        <div className="px-4 py-3">
          <button
            onClick={() => {
              setMode('done');
              setTimeout(() => setScreenView('launcher'), 1200);
            }}
            className="w-full text-[10px] text-white/30 hover:text-white/50 py-1"
          >
            跳过，稍后登录
          </button>
        </div>
      </div>
    );
  }

  // Choice mode
  return (
    <div className="flex flex-col h-full bg-[#0a0e1a] text-white">
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-sm font-semibold">绑定响指账号</h2>
        <p className="text-[9px] text-white/40 mt-0.5">登录后可同步您的应用和数据</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 space-y-4">
        {/* HaiSnap branding */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-sm font-bold text-white">HS</span>
          </div>
          <div className="text-center">
            <p className="text-[11px] font-medium">响指 HaiSnap</p>
            <p className="text-[8px] text-white/30 mt-0.5">AI 零代码应用平台</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="w-full space-y-1.5">
          {[
            { icon: '1000+', text: '访问海量 AI 应用' },
            { icon: 'sync', text: '多设备数据同步' },
            { icon: 'star', text: '个性化推荐' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5">
              <div className="w-5 h-5 rounded bg-blue-500/15 flex items-center justify-center">
                {item.icon === 'sync' ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                  </svg>
                ) : item.icon === 'star' ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                  </svg>
                ) : (
                  <span className="text-[6px] font-bold text-blue-400">{item.icon}</span>
                )}
              </div>
              <span className="text-[9px] text-white/60">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="w-full space-y-1.5 pt-1">
          <button
            onClick={() => setMode('login')}
            className="w-full py-1.5 rounded-lg text-[11px] font-medium bg-blue-500 hover:bg-blue-400 text-white transition-all"
          >
            登录响指账号
          </button>
          <button
            onClick={() => {
              setMode('done');
              setTimeout(() => setScreenView('launcher'), 1200);
            }}
            className="w-full py-1.5 rounded-lg text-[11px] text-white/30 hover:text-white/50 transition-all"
          >
            暂不登录
          </button>
        </div>
      </div>
    </div>
  );
}
