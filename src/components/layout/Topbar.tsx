import { useLocation } from 'react-router-dom';
import { Bell, ChevronRight } from 'lucide-react';

const breadcrumbMap: Record<string, string[]> = {
  '/': ['Dashboard'],
  '/connectors': ['Integrations'],
  '/workflows': ['Workflows', 'All Workflows'],
  '/workflows/ab-testing': ['Workflows', 'A/B Testing'],
  '/channels/voice': ['Channels', 'Voice AI'],
  '/channels/whatsapp': ['Channels', 'WhatsApp'],
  '/channels/email': ['Channels', 'Email'],
  '/channels/sms': ['Channels', 'SMS'],
  '/analytics': ['Analytics'],
};

export default function Topbar() {
  const location = useLocation();
  const crumbs = breadcrumbMap[location.pathname] ?? ['Revnyx'];

  return (
    <header style={{
      height: 'var(--topbar-height)',
      background: 'var(--white)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 28px',
      gap: 8,
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {crumbs.map((c, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <ChevronRight size={14} style={{ color: 'var(--ink-3)' }} />}
            <span style={{
              fontSize: 13,
              color: i === crumbs.length - 1 ? 'var(--ink)' : 'var(--ink-3)',
              fontWeight: i === crumbs.length - 1 ? 600 : 400,
            }}>
              {c}
            </span>
          </span>
        ))}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Live indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--green)', fontWeight: 500 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          2,714 interventions today
        </div>

        <button style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'var(--ink-3)', display: 'flex', alignItems: 'center', padding: 4, borderRadius: 'var(--r)',
        }}>
          <Bell size={18} />
        </button>

        {/* Avatar */}
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'var(--navy)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>
          R
        </div>
      </div>
    </header>
  );
}
