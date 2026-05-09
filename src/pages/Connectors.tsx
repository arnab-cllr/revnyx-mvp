import { CheckCircle2, RefreshCw, AlertCircle, Clock, Building2, Cpu, MessageCircle, Plus } from 'lucide-react';
import connectorsData from '../data/connectors.json';

const statusConfig: Record<string, { label: string; icon: React.ReactNode; badgeClass: string }> = {
  active:  { label: 'Receiving',  icon: <CheckCircle2 size={11} />, badgeClass: 'badge badge-live' },
  syncing: { label: 'Syncing',    icon: <RefreshCw size={11} />,    badgeClass: 'badge badge-pending' },
  pending: { label: 'Pending',    icon: <Clock size={11} />,        badgeClass: 'badge badge-info' },
  error:   { label: 'Error',      icon: <AlertCircle size={11} />,  badgeClass: 'badge badge-failed' },
};

const categoryStyle: Record<string, { bg: string; color: string; icon: React.ReactNode; accent: string }> = {
  sdk:     { bg: 'var(--navy-xlight)', color: 'var(--navy)',    icon: <Cpu size={16} />,            accent: 'var(--navy)' },
  crm:     { bg: 'var(--cyan-xlight)', color: 'var(--cyan-dim)',icon: <Building2 size={16} />,       accent: 'var(--cyan-dim)' },
  channel: { bg: 'var(--green-light)', color: 'var(--green)',   icon: <MessageCircle size={16} />,   accent: 'var(--green)' },
};

const sectionAccent: Record<string, string> = {
  'section-sdk':      'var(--navy)',
  'section-crm':      'var(--cyan-dim)',
  'section-channels': 'var(--green)',
};

type Connector = {
  id: string;
  name: string;
  sourceName: string;
  category: string;
  description: string;
  status: string;
  lastEvent: string;
  eventsToday: number;
  sdkVersion: string | null;
  fields: string[];
};

export default function Connectors() {
  const { account, sections } = connectorsData;

  const allConnectors: Connector[] = sections.flatMap(s => s.connectors as Connector[]);
  const totalActive = allConnectors.filter(c => c.status === 'active').length;
  const totalEvents = allConnectors.reduce((sum, c) => sum + c.eventsToday, 0);

  return (
    <div className="fade-in" style={{ maxWidth: 'var(--content-max)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h1 className="text-heading">Integrations</h1>
          <p style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4 }}>
            Signal sources, CRM sync, and channel APIs — all integration health in one place
          </p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Plus size={14} /> Add Integration
        </button>
      </div>

      {/* Account context banner */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px',
        background: 'var(--navy)', borderRadius: 'var(--rl)', marginBottom: 28,
      }}>
        <div style={{ width: 38, height: 38, borderRadius: 'var(--r)', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Building2 size={18} style={{ color: 'var(--cyan)' }} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>{account.name}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>{account.vertical} · {account.tier}</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 28 }}>
          {[
            { label: 'Active Integrations', value: `${totalActive}/${allConnectors.length}`, color: '#fff' },
            { label: 'Events Today', value: totalEvents.toLocaleString(), color: 'var(--cyan)' },
            { label: 'Avg Latency', value: '<2s', color: 'var(--green)' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{stat.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: stat.color, fontFamily: 'var(--font-display)' }}>{stat.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {sections.map(section => {
          const accent = sectionAccent[section.id] ?? 'var(--navy)';
          return (
            <div key={section.id}>
              {/* Section header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14, paddingBottom: 12, borderBottom: `2px solid ${accent}20` }}>
                <div style={{ width: 4, height: 36, background: accent, borderRadius: 2, flexShrink: 0 }} />
                <div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.3px' }}>
                    {section.label}
                  </h2>
                  <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 3 }}>{section.description}</p>
                </div>
              </div>

              {/* Connector cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
                {(section.connectors as Connector[]).map(conn => {
                  const sc = statusConfig[conn.status] ?? statusConfig.pending;
                  const cs = categoryStyle[conn.category] ?? categoryStyle.sdk;

                  return (
                    <div key={conn.id} className="card hover-lift" style={{ padding: '18px 20px', cursor: 'default' }}>
                      {/* Card header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: 'var(--r)', flexShrink: 0,
                            background: cs.bg, color: cs.color,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            {cs.icon}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)', lineHeight: 1.3 }}>{conn.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 1 }}>
                              {conn.sourceName}
                              {conn.sdkVersion && (
                                <span style={{ marginLeft: 6, background: 'var(--navy-xlight)', color: 'var(--navy-mid)', padding: '1px 6px', borderRadius: 4, fontWeight: 600, fontSize: 10 }}>
                                  {conn.sdkVersion}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <span className={sc.badgeClass} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                          {sc.icon} {sc.label}
                        </span>
                      </div>

                      {/* Description */}
                      <p style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 12 }}>{conn.description}</p>

                      {/* Stats row */}
                      <div style={{ display: 'flex', gap: 20, marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
                        <div>
                          <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Events Today</div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>{conn.eventsToday.toLocaleString()}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Last Event</div>
                          <div style={{ fontSize: 13, color: conn.status === 'active' ? 'var(--green)' : 'var(--ink-3)', fontWeight: 500 }}>{conn.lastEvent}</div>
                        </div>
                      </div>

                      {/* Fields */}
                      {conn.fields.length > 0 && (
                        <div>
                          <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Data Fields</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {conn.fields.map(f => (
                              <span key={f} style={{
                                fontSize: 10, background: 'var(--paper-2)', color: 'var(--ink-2)',
                                padding: '2px 7px', borderRadius: 4, fontWeight: 500,
                              }}>
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
