import { useState } from 'react';
import { Activity, Phone, MessageCircle, Mail, MessageSquare } from 'lucide-react';
import feedData from '../data/signal-feed.json';

type Event = typeof feedData.events[number];

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  triggered:           { label: 'Triggered',           bg: 'var(--green-light)',  color: 'var(--green)'    },
  ignored_active_wf:   { label: 'Active WF running',   bg: 'var(--amber-light)',  color: 'var(--amber)'   },
  ignored_threshold:   { label: 'Below threshold',     bg: 'var(--paper-2)',      color: 'var(--ink-3)'   },
  ignored_duplicate:   { label: 'Duplicate — skipped', bg: 'var(--navy-xlight)', color: 'var(--navy-mid)' },
};

const signalTypeColor: Record<string, string> = {
  'Payment Failed':        '#DC2626',
  'Usage Drop >40%':       '#D97706',
  'No Login 7d':           '#7C3AED',
  'Plan Downgrade Intent': '#0B2540',
  'Renewal Due 7d':        '#059669',
  'Cold Lead >14d':        '#06B6D4',
};

const channelIcon: Record<string, React.ReactNode> = {
  'Voice AI':  <Phone size={11} />,
  'WhatsApp':  <MessageCircle size={11} />,
  'Email':     <Mail size={11} />,
  'SMS':       <MessageSquare size={11} />,
};

const channelBg: Record<string, string> = {
  'Voice AI':  'var(--channel-voice-bg)',
  'WhatsApp':  'var(--channel-whatsapp-bg)',
  'Email':     'var(--channel-email-bg)',
  'SMS':       'var(--channel-sms-bg)',
};

const channelColor: Record<string, string> = {
  'Voice AI':  'var(--channel-voice)',
  'WhatsApp':  'var(--channel-whatsapp)',
  'Email':     'var(--channel-email)',
  'SMS':       'var(--channel-sms)',
};

const ALL = 'All';

function LatencyBar({ ms }: { ms: number }) {
  const pct = Math.min((ms / 3000) * 100, 100);
  const color = ms < 1600 ? 'var(--green)' : ms < 2500 ? 'var(--amber)' : 'var(--red)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 44, height: 4, background: 'var(--paper-2)', borderRadius: 99, overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99 }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color, fontFamily: 'var(--font-display)', minWidth: 38 }}>{ms}ms</span>
    </div>
  );
}

export default function SignalFeed() {
  const [typeFilter, setTypeFilter] = useState(ALL);
  const [statusFilter, setStatusFilter] = useState(ALL);
  const { summary, signalTypes, events } = feedData;

  const filtered: Event[] = events.filter(e => {
    const matchType   = typeFilter === ALL   || e.signalType === typeFilter;
    const matchStatus = statusFilter === ALL || e.status === statusFilter;
    return matchType && matchStatus;
  });

  const triggeredPct = Math.round((summary.triggeredToday / summary.totalToday) * 100);

  return (
    <div className="fade-in" style={{ maxWidth: 'var(--content-max)' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <h1 className="text-heading">Signal Feed</h1>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: 'var(--green)', background: 'var(--green-light)', padding: '3px 10px', borderRadius: 99 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 2s infinite', display: 'inline-block' }} />
              Live
            </span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--ink-3)' }}>
            Every revenue-risk signal ingested from Asianet's systems — what fired, which workflow triggered, and in how long.
          </p>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 22 }}>
        {[
          { label: 'Signals Today',       value: summary.totalToday.toLocaleString(), color: 'var(--ink)' },
          { label: 'Workflows Triggered', value: `${summary.triggeredToday.toLocaleString()} (${triggeredPct}%)`, color: 'var(--green)' },
          { label: 'Deduplicated',        value: summary.ignoredDuplicate.toString(), color: 'var(--ink-3)' },
          { label: 'Avg Latency',         value: `${summary.avgLatencyMs}ms`,         color: 'var(--cyan-dim)' },
          { label: 'P99 Latency',         value: `${summary.p99LatencyMs}ms`,         color: 'var(--amber)' },
        ].map(k => (
          <div key={k.label} className="metric-card" style={{ padding: '14px 16px' }}>
            <p className="metric-label">{k.label}</p>
            <p className="metric-value" style={{ fontSize: 20, color: k.color }}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Signal type breakdown — clickable filters */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Activity size={13} style={{ color: 'var(--ink-3)' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Signal Breakdown — Today · Click to filter
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {signalTypes.map(s => {
            const isActive = typeFilter === s.type;
            return (
              <div
                key={s.type}
                onClick={() => setTypeFilter(isActive ? ALL : s.type)}
                style={{
                  padding: '10px 14px', borderRadius: 'var(--r)', cursor: 'pointer',
                  background: isActive ? s.color : 'var(--paper)',
                  border: `1.5px solid ${isActive ? s.color : 'var(--border)'}`,
                  transition: 'all var(--transition-base)',
                  minWidth: 130,
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 700, color: isActive ? '#fff' : s.color, fontFamily: 'var(--font-display)' }}>
                  {s.count.toLocaleString()}
                </div>
                <div style={{ fontSize: 11, color: isActive ? 'rgba(255,255,255,0.75)' : 'var(--ink-3)', marginTop: 3, lineHeight: 1.3 }}>
                  {s.type}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters + table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>

        {/* Filter bar */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: 4 }}>Status:</span>
          {[
            { key: ALL,                  label: 'All' },
            { key: 'triggered',          label: 'Triggered' },
            { key: 'ignored_active_wf',  label: 'Active WF' },
            { key: 'ignored_threshold',  label: 'Below threshold' },
            { key: 'ignored_duplicate',  label: 'Duplicate' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              style={{
                fontSize: 12, fontWeight: 500, padding: '4px 12px', borderRadius: 99, cursor: 'pointer',
                background: statusFilter === f.key ? 'var(--navy)' : 'transparent',
                color: statusFilter === f.key ? '#fff' : 'var(--ink-3)',
                border: statusFilter === f.key ? '1px solid var(--navy)' : '1px solid var(--border)',
                transition: 'all var(--transition-fast)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {f.label}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--ink-3)' }}>
            Showing <strong>{filtered.length}</strong> of {events.length} recent events
          </span>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: 900 }}>
            <thead>
              <tr>
                <th style={{ width: 76 }}>Time</th>
                <th>Signal</th>
                <th>Source</th>
                <th>Subscriber</th>
                <th>Value</th>
                <th>Workflow</th>
                <th>Channel</th>
                <th>Latency</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((evt, i) => {
                const sc = statusConfig[evt.status];
                const sigColor = signalTypeColor[evt.signalType] ?? 'var(--ink-3)';
                const isFirst = i === 0;
                return (
                  <tr key={evt.id} style={{ background: isFirst ? `${sigColor}06` : undefined }}>

                    {/* Time */}
                    <td style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>
                      {evt.timestamp}
                    </td>

                    {/* Signal type */}
                    <td>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        fontSize: 12, fontWeight: 600, color: sigColor,
                        whiteSpace: 'nowrap',
                      }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: sigColor, flexShrink: 0, ...(isFirst ? { animation: 'pulse 2s infinite' } : {}) }} />
                        {evt.signalType}
                      </span>
                    </td>

                    {/* Source */}
                    <td style={{ fontSize: 12, color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>{evt.source}</td>

                    {/* Subscriber */}
                    <td>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>{evt.subscriberName}</div>
                      <div style={{ fontSize: 10, color: 'var(--ink-3)', fontFamily: 'monospace' }}>{evt.subscriberId} · {evt.segment}</div>
                    </td>

                    {/* Signal value */}
                    <td style={{ fontSize: 12, color: 'var(--ink-2)', maxWidth: 180 }}>{evt.signalValue}</td>

                    {/* Workflow triggered */}
                    <td>
                      {evt.workflowTriggered ? (
                        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--navy)' }}>{evt.workflowTriggered}</span>
                      ) : (
                        <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>—</span>
                      )}
                    </td>

                    {/* Channel */}
                    <td>
                      {evt.channel ? (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          fontSize: 11, fontWeight: 600,
                          background: channelBg[evt.channel] ?? 'var(--paper-2)',
                          color: channelColor[evt.channel] ?? 'var(--ink-3)',
                          padding: '2px 8px', borderRadius: 99,
                        }}>
                          {channelIcon[evt.channel]}
                          {evt.channel}
                        </span>
                      ) : (
                        <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>—</span>
                      )}
                    </td>

                    {/* Latency */}
                    <td>
                      {evt.latencyMs ? (
                        <LatencyBar ms={evt.latencyMs} />
                      ) : (
                        <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>—</span>
                      )}
                    </td>

                    {/* Status */}
                    <td>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        fontSize: 11, fontWeight: 600,
                        background: sc.bg, color: sc.color,
                        padding: '3px 9px', borderRadius: 99,
                        whiteSpace: 'nowrap',
                      }}>
                        {evt.status === 'triggered' && (
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: sc.color, ...(isFirst ? { animation: 'pulse 2s infinite' } : {}) }} />
                        )}
                        {sc.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ padding: '10px 20px', background: 'var(--paper)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>
            Showing last 15 events · Full log retained for 90 days
          </span>
          <span style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'monospace' }}>
            Avg trigger latency today: <strong style={{ color: 'var(--green)' }}>{summary.avgLatencyMs}ms</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
