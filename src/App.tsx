import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import Connectors from './pages/Connectors';
import Workflows from './pages/Workflows';
import ABTesting from './pages/ABTesting';
import Analytics from './pages/Analytics';
import VoiceAI from './pages/channels/VoiceAI';
import WhatsApp from './pages/channels/WhatsApp';
import Email from './pages/channels/Email';
import SMS from './pages/channels/SMS';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="connectors" element={<Connectors />} />
          <Route path="workflows" element={<Workflows />} />
          <Route path="workflows/ab-testing" element={<ABTesting />} />
          <Route path="channels" element={<Navigate to="/channels/voice" replace />} />
          <Route path="channels/voice" element={<VoiceAI />} />
          <Route path="channels/whatsapp" element={<WhatsApp />} />
          <Route path="channels/email" element={<Email />} />
          <Route path="channels/sms" element={<SMS />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
