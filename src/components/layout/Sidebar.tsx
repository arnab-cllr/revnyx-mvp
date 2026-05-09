import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Plug, GitBranch, FlaskConical,
  Phone, MessageCircle, Mail, MessageSquare, BarChart2, Activity,
  type LucideIcon
} from 'lucide-react';

type NavChild = { label: string; to: string; icon?: LucideIcon; badge?: string };
type NavItem = { label: string; icon: LucideIcon; to: string; children?: NavChild[] };

const nav: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/' },
  { label: 'Integrations', icon: Plug, to: '/connectors' },
  {
    label: 'Workflows', icon: GitBranch, to: '/workflows',
    children: [
      { label: 'All Workflows', to: '/workflows' },
      { label: 'A/B Testing', to: '/workflows/ab-testing', icon: FlaskConical },
    ]
  },
  {
    label: 'Channels', icon: Activity, to: '/channels',
    children: [
      { label: 'Voice AI', to: '/channels/voice', icon: Phone, badge: 'Live' },
      { label: 'WhatsApp', to: '/channels/whatsapp', icon: MessageCircle },
      { label: 'Email', to: '/channels/email', icon: Mail },
      { label: 'SMS', to: '/channels/sms', icon: MessageSquare },
    ]
  },
  { label: 'Analytics', icon: BarChart2, to: '/analytics' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      minHeight: '100vh',
      background: 'var(--dark-surface-2)',
      borderRight: '1px solid var(--dark-border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--dark-border)' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: '#fff' }}>
          revnyx
        </span>
        <span style={{ color: 'var(--cyan)', fontWeight: 800, fontSize: 22 }}>.</span>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: '#fff' }}>
          ai
        </span>
      </div>

      {/* Nav */}
      <nav style={{ padding: '12px 8px', flex: 1 }}>
        {nav.map((item) => {
          const Icon = item.icon;
          const isParentActive = item.children
            ? item.children.some(c => location.pathname.startsWith(c.to) && c.to !== '/')
            : location.pathname === item.to;

          return (
            <div key={item.to}>
              {item.children ? (
                <>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 12px', marginBottom: 2, borderRadius: 'var(--r)',
                    color: isParentActive ? 'var(--cyan)' : 'rgba(255,255,255,0.6)',
                    fontSize: 13, fontWeight: 500,
                  }}>
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;
                    const isActive = location.pathname === child.to ||
                      (child.to !== '/workflows' && location.pathname.startsWith(child.to));
                    return (
                      <NavLink key={child.to} to={child.to} style={{ textDecoration: 'none' }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '7px 12px 7px 32px', marginBottom: 1,
                          borderRadius: 'var(--r)',
                          borderLeft: isActive ? '3px solid var(--cyan)' : '3px solid transparent',
                          background: isActive ? 'rgba(6,182,212,0.10)' : 'transparent',
                          color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                          fontSize: 13, fontWeight: isActive ? 500 : 400,
                          transition: 'all var(--transition-fast)',
                        }}>
                          {ChildIcon && <ChildIcon size={14} />}
                          <span>{child.label}</span>
                          {child.badge && (
                            <span style={{
                              marginLeft: 'auto', fontSize: 9, fontWeight: 700,
                              background: 'var(--green)', color: '#fff',
                              padding: '2px 6px', borderRadius: 99, letterSpacing: '0.05em',
                            }}>
                              {child.badge}
                            </span>
                          )}
                        </div>
                      </NavLink>
                    );
                  })}
                </>
              ) : (
                <NavLink to={item.to} end style={{ textDecoration: 'none' }}>
                  {({ isActive }) => (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 12px', marginBottom: 2, borderRadius: 'var(--r)',
                      borderLeft: isActive ? '3px solid var(--cyan)' : '3px solid transparent',
                      background: isActive ? 'rgba(6,182,212,0.10)' : 'transparent',
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.65)',
                      fontSize: 13, fontWeight: isActive ? 500 : 400,
                      transition: 'all var(--transition-fast)',
                    }}>
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </div>
                  )}
                </NavLink>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--dark-border)' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
          Revnyx AI · MVP Demo
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 2 }}>
          Eternyx Innovations Pvt. Ltd.
        </div>
      </div>
    </aside>
  );
}
