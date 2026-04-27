# Snap 智能终端模拟器

基于 Web 的 Snap 智能终端交互原型，用于产品演示、应用开发调试和用户体验验证。

## 项目简介

Snap 是一款面向轻量级 AI 应用场景的智能终端硬件产品，搭载 Linux + Web 容器运行环境。本项目是其**浏览器端模拟器**，完整还原了设备外观、系统交互流程和应用生态，让开发者和产品团队无需实机即可体验和验证产品方案。

## 支持的设备型号

| 规格 | Snap Mini | Snap Pro |
|------|-----------|----------|
| 芯片 | RK3566 | RK3576 |
| CPU | 4x Cortex-A55 @ 1.8GHz | 4x A72 @ 2.2GHz + 4x A53 @ 1.8GHz |
| GPU | Mali-G52 2EE | Mali-G52 MC3 |
| NPU | 1 TOPS | 6 TOPS |
| 内存 | 1GB LPDDR4 | 2GB LPDDR4x |
| 存储 | 8GB eMMC | 32GB eMMC |
| 屏幕 | 4.3 英寸 800x480 | 7 英寸 1280x800 |
| 摄像头 | 无 | 5MP OV5647 |
| HDMI | 无 | Micro HDMI 4K@60fps |
| 双扬声器 | 无 | 有 |
| WiFi | 802.11ac | WiFi 6 |
| 参考价格 | 299 元 | 499 元 |

模拟器会根据选择的型号动态渲染不同的设备外壳（Pro 额外显示摄像头、HDMI 接口、双扬声器格栅），并自动适配屏幕分辨率和应用兼容性。

## 功能模块

### 开机引导流程

完整的首次开机体验：启动动画 -> WiFi 连接 -> 隐私协议 -> 账号登录 -> 进入桌面。每个步骤均支持跳过。

> 注：当前开发阶段默认跳过引导直接进入桌面，引导流程组件已实现，可通过修改 `DeviceContext.tsx` 中的初始 `screenView` 为 `'boot'` 来启用。

### 桌面 Launcher

- **状态栏**：显示设备型号、实时时间、WiFi 图标
- **搜索栏**：支持按应用名称、描述、标签全文搜索
- **分类筛选**：全部 / 工具 / 游戏 / 生活 / 教育 / AI 六个类别
- **应用网格**：Mini 5 列，Pro 6 列；自动标记 Pro 专属应用和摄像头需求
- **底部导航**：发现 / 已安装 / 设置 三个 Tab（"已安装" Tab 尚未实现筛选逻辑）

### 预置应用（18 款）

| 应用 | 分类 | 兼容性 |
|------|------|--------|
| 翻页时钟 | 工具 | 全设备 |
| 天气助手 | 生活 | 全设备 |
| 番茄钟 | 工具 | 全设备 |
| 今日运势 | 生活 | 全设备 |
| 背单词 | 教育 | 全设备 |
| 像素射击 | 游戏 | 全设备 |
| 坦克大战 | 游戏 | 全设备 |
| 今天吃什么 | 生活 | 全设备 |
| 情绪日记 | 生活 | 全设备 |
| AI 对话助手 | AI | 全设备 |
| 智能相框 | 工具 | 全设备 |
| 习惯打卡 | 工具 | 全设备 |
| 口算练习 | 教育 | 全设备 |
| 白噪音 | 生活 | 全设备 |
| AR 手势射击 | 游戏 | Pro 专属 |
| AI 人脸滤镜 | AI | Pro 专属 |
| 手势钢琴 | 游戏 | Pro 专属 |
| 健身计数器 | AI | Pro 专属 |

Pro 专属应用依赖摄像头和高性能 NPU，在 Mini 上会显示兼容性提示并禁止启动。

### 应用运行容器（AppViewer）

- 有部署地址的应用通过 `<iframe>` 沙箱加载，支持 camera/microphone 等权限声明
- 加载过程中显示 loading 动画，加载失败时提供"新窗口打开"的降级方案
- 尚无部署地址的应用以 Mock 预览卡片展示（图标、描述、标签）
- 目前仅 **AR 手势射击** 接入了真实线上地址，其余应用均为 Mock 状态

### 设置页面

- 网络信息（WiFi、蓝牙、IP 地址）
- 显示设置（亮度实时调节，联动 Bridge API；自动休眠设置）
- 音频信息（扬声器/麦克风规格随型号变化）
- 设备信息（完整硬件参数表）
- 响指账号管理

### JS Bridge API

模拟器通过 `window.SnapDevice` 暴露与真机一致的硬件接口，供应用开发者调用：

```javascript
// 屏幕
SnapDevice.screen.getBrightness()
SnapDevice.screen.setBrightness(80)
SnapDevice.screen.getResolution()  // { width: 800, height: 480 }

// 网络
SnapDevice.network.getStatus()     // { connected: true, type: 'wifi' }
SnapDevice.network.getSSID()
SnapDevice.network.getSignalStrength()

// 系统
SnapDevice.system.getDeviceInfo()
SnapDevice.system.getModel()       // 'mini' | 'pro'
SnapDevice.system.getUptime()

// 存储（内存级 KV，页面刷新后丢失）
SnapDevice.storage.get(key)
SnapDevice.storage.set(key, value)
SnapDevice.storage.remove(key)

// 音频
SnapDevice.audio.play(url)
SnapDevice.audio.stop()
SnapDevice.audio.setVolume(50)

// 摄像头（Pro 专属）
SnapDevice.camera.isAvailable()    // Mini: false, Pro: true
SnapDevice.camera.capture()

// NPU
SnapDevice.npu.isAvailable()
SnapDevice.npu.getTops()           // Mini: 1, Pro: 6
```

### 调试面板

页面右侧提供开发者工具：
- **Bridge 控制台**：实时记录所有 Bridge API 调用（最多 100 条），包含时间戳、模块、方法、参数和返回值，错误调用以红色高亮
- **设备参数表**：当前选中型号的完整硬件规格

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 19 |
| 语言 | TypeScript 5.9 |
| 构建 | Vite 8 |
| 样式 | Tailwind CSS 3.4 |
| 状态管理 | React Context |
| 路由 | 手动状态切换（无 React Router） |

## 项目结构

```
src/
├── main.tsx                        # 入口
├── App.tsx                         # 根布局（设备模拟器 + 调试面板）
├── types/index.ts                  # 类型定义
├── data/
│   ├── devices.ts                  # 设备硬件参数
│   └── mockApps.ts                 # 应用注册表（18 款）
├── bridge/
│   ├── SnapDevice.ts               # JS Bridge 实现
│   └── BridgeLogger.ts             # Bridge 调用日志（发布/订阅模式）
├── context/
│   └── DeviceContext.tsx            # 全局状态（型号、屏幕视图、亮度等）
└── components/
    ├── DeviceSelector.tsx           # 型号切换（Mini / Pro）
    ├── DeviceFrame.tsx              # 设备外壳渲染
    ├── ScreenContent.tsx            # 屏幕内容路由
    ├── Boot/
    │   ├── BootScreen.tsx           # 启动动画
    │   ├── WiFiSetup.tsx            # WiFi 连接
    │   ├── PrivacyConsent.tsx       # 隐私协议
    │   └── AccountSetup.tsx         # 账号登录
    ├── Launcher/
    │   ├── LauncherHome.tsx         # 桌面主容器
    │   ├── StatusBar.tsx            # 状态栏
    │   ├── SearchBar.tsx            # 搜索栏
    │   ├── CategoryBar.tsx          # 分类筛选栏
    │   ├── AppGrid.tsx              # 应用网格
    │   ├── AppCard.tsx              # 应用卡片（含兼容性徽标）
    │   └── BottomNav.tsx            # 底部导航
    ├── AppViewer/
    │   └── AppViewer.tsx            # 应用运行容器（iframe / Mock 预览）
    ├── Settings/
    │   └── SettingsPage.tsx         # 设置页面
    └── Debug/
        ├── BridgeConsole.tsx        # Bridge 调用日志面板
        └── DeviceSpecs.tsx          # 硬件参数表
```

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 设计主题

采用深色系 UI 设计，配色方案：

| Token | 色值 | 用途 |
|-------|------|------|
| snap-dark | `#0f172a` | 主背景 |
| snap-accent | `#3b82f6` | 交互元素 |
| snap-glow | `#60a5fa` | 发光效果 |
| snap-surface | `#1e293b` | 卡片背景 |
| snap-text | `#e2e8f0` | 主文字 |

## 当前状态与待开发项

这是一个**早期交互原型**，核心框架和 UI 外壳已完成。以下功能尚待开发：

- [ ] 应用内容：17/18 款应用仅为 Mock 预览，需接入真实部署地址
- [ ] "已安装" Tab：UI 已就位，缺少安装/卸载逻辑和列表筛选
- [ ] 通知系统
- [ ] 数据持久化（当前 Storage 为内存级，刷新即丢失）
- [ ] 应用商店功能（安装、卸载、更新）

## License

MIT
