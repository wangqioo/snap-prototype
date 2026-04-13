import { useDevice } from '../context/DeviceContext';
import BootScreen from './Boot/BootScreen';
import WiFiSetup from './Boot/WiFiSetup';
import PrivacyConsent from './Boot/PrivacyConsent';
import AccountSetup from './Boot/AccountSetup';
import LauncherHome from './Launcher/LauncherHome';
import AppViewer from './AppViewer/AppViewer';
import SettingsPage from './Settings/SettingsPage';

export default function ScreenContent() {
  const { screenView } = useDevice();

  switch (screenView) {
    case 'boot':
      return <BootScreen />;
    case 'wifi-setup':
      return <WiFiSetup />;
    case 'privacy':
      return <PrivacyConsent />;
    case 'account':
      return <AccountSetup />;
    case 'launcher':
      return <LauncherHome />;
    case 'app':
      return <AppViewer />;
    case 'settings':
      return <SettingsPage />;
    default:
      return <BootScreen />;
  }
}
