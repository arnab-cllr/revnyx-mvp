import { useState } from 'react';
import { MessageCircle, CheckCheck, Send } from 'lucide-react';
import threadsData from '../../data/whatsapp-threads.json';

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  resolved: { label: 'Resolved', bg: 'var(--green-light)',  color: 'var(--green)' },
  active:   { label: 'Active',   bg: 'var(--cyan-light)',   color: 'var(--cyan-dim)' },
  pending:  { label: 'Pending',  bg: 'var(--amber-light)',  color: 'var(--amber)' },
};

export default function WhatsApp() {
  const [selected, setSelected] = useState(threadsData.threads[0].id);
  const thread = threadsData.threads.find(t => t.id === selected) ?? threadsData.threads[0];

  return (
    <div className="fade-in" style={{ maxWidth: 'var(--content-max)' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 className="text-heading">WhatsApp</h1>
          <span className="badge badge-info" style={{ fontSize: 11 }}>MVP — Mock</span>
        </div>
        <p style={{ fontSize: 14, color: 'var(--ink-3)' }}>
          Automated intervention messages via WhatsApp Business API — payment links, recovery offers, dynamic personalisation.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Messages Sent Today', value: '540' },
          { label: 'Response Rate', value: '31%' },
          { label: 'Revenue via WA', value: '₹2.1L' },
        ].map(k => (
          <div key={k.label} className="metric-card">
            <p className="metric-label">{k.label}</p>
            <p className="metric-value" style={{ fontSize: 26 }}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Chat UI */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '280px 1fr', height: 540 }}>
        {/* Thread list */}
        <div style={{ borderRight: '1px solid var(--border)', overflowY: 'auto', background: 'var(--paper)' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Conversations
            </span>
          </div>
          {threadsData.threads.map(t => {
            const sc = statusConfig[t.status];
            const isSelected = t.id === selected;
            return (
              <div
                key={t.id}
                onClick={() => setSelected(t.id)}
                style={{
                  padding: '12px 16px', cursor: 'pointer',
                  background: isSelected ? 'var(--white)' : 'transparent',
                  borderBottom: '1px solid var(--border)',
                  borderLeft: isSelected ? '3px solid var(--channel-whatsapp)' : '3px solid transparent',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{t.customer}</span>
                  <span style={{ fontSize: 10, color: sc.color, background: sc.bg, padding: '1px 6px', borderRadius: 99, fontWeight: 600 }}>{sc.label}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginBottom: 3 }}>{t.useCase}</div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>{t.timestamp}</div>
              </div>
            );
          })}
        </div>

        {/* Chat window */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#ECE5DD' }}>
          {/* Chat header */}
          <div style={{ padding: '12px 20px', background: '#075E54', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={18} style={{ color: '#fff' }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{thread.customer}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>{thread.phone} · {thread.useCase}</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {thread.messages.map((msg, i) => {
              const isAgent = msg.from === 'agent';
              return (
                <div key={i} style={{ display: 'flex', justifyContent: isAgent ? 'flex-start' : 'flex-end' }}>
                  <div style={{
                    maxWidth: '72%',
                    background: isAgent ? '#fff' : '#DCF8C6',
                    borderRadius: isAgent ? '0 12px 12px 12px' : '12px 0 12px 12px',
                    padding: '9px 12px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                  }}>
                    {isAgent && (
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#25D366', marginBottom: 3 }}>Revnyx Agent</div>
                    )}
                    <p style={{ fontSize: 13, color: '#1a1a1a', lineHeight: 1.5, margin: 0 }}>{msg.text}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3, marginTop: 4 }}>
                      <span style={{ fontSize: 10, color: '#999' }}>{msg.time}</span>
                      {!isAgent && <CheckCheck size={12} style={{ color: '#34B7F1' }} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div style={{ padding: '10px 16px', background: '#F0F0F0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, background: '#fff', borderRadius: 24, padding: '10px 16px', fontSize: 13, color: 'var(--ink-3)' }}>
              Automated by Revnyx Agent
            </div>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Send size={16} style={{ color: '#fff' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
