import { useState } from 'react';
import { Send, Smartphone } from 'lucide-react';

const campaigns = [
  {
    id: 'sms-1',
    name: 'Payment Reminder — Short',
    useCase: 'Payment Recovery',
    sentToday: 38,
    deliveryRate: '97%',
    clickRate: '12%',
    message: 'Hi {{name}}, your {{company}} payment of {{amount}} is overdue. Pay now: {{link}} Reply STOP to opt out.',
    chars: 108,
  },
  {
    id: 'sms-2',
    name: 'Renewal Alert',
    useCase: 'Subscription Renewal',
    sentToday: 22,
    deliveryRate: '98%',
    clickRate: '9%',
    message: '{{name}}, your {{plan}} renews {{date}} for {{amount}}. Manage here: {{link}}',
    chars: 78,
  },
  {
    id: 'sms-3',
    name: 'Win-Back Offer',
    useCase: 'Win-Back',
    sentToday: 14,
    deliveryRate: '95%',
    clickRate: '7%',
    message: 'We miss you, {{name}}! Come back to {{company}} and get {{offer}}. Tap: {{link}} Reply STOP to opt out.',
    chars: 101,
  },
];

const recentSMS = [
  { to: '+91 98XXX 01234', message: 'Hi Ramesh, your ClearTax payment of ₹4,999 is overdue. Pay now: pay.cleartax.in/r1', status: 'Delivered', time: '2:14 PM', clicked: true },
  { to: '+91 91XXX 56789', message: 'Priya, your Asianet plan renews May 12 for ₹899. Manage here: asianet.in/renew', status: 'Delivered', time: '11:30 AM', clicked: false },
  { to: '+91 77XXX 33445', message: 'Arjun! edForce misses you. Rejoin and get ₹5,000 off. Tap: edforce.in/wb', status: 'Delivered', time: '10:08 AM', clicked: true },
  { to: '+91 80XXX 99001', message: 'Hi Kavya, your ClearTax payment of ₹12,400 is overdue. Pay now: pay.cleartax.in/r2', status: 'Failed', time: '9:45 AM', clicked: false },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  'Delivered': { bg: 'var(--green-light)', color: 'var(--green)' },
  'Failed':    { bg: 'var(--red-light)',   color: 'var(--red)' },
  'Pending':   { bg: 'var(--amber-light)', color: 'var(--amber)' },
};

export default function SMS() {
  const [selected, setSelected] = useState(campaigns[0].id);
  const campaign = campaigns.find(c => c.id === selected) ?? campaigns[0];

  const charPct = (campaign.chars / 160) * 100;

  return (
    <div className="fade-in" style={{ maxWidth: 'var(--content-max)' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 className="text-heading">SMS</h1>
          <span className="badge badge-info" style={{ fontSize: 11 }}>MVP — Mock</span>
        </div>
        <p style={{ fontSize: 14, color: 'var(--ink-3)' }}>
          Short-form trigger messages, payment links, and callback prompts.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'SMS Sent Today', value: '74' },
          { label: 'Avg Delivery Rate', value: '97%' },
          { label: 'Avg Click Rate', value: '9.3%' },
        ].map(k => (
          <div key={k.label} className="metric-card">
            <p className="metric-label">{k.label}</p>
            <p className="metric-value" style={{ fontSize: 26 }}>{k.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 20, marginBottom: 20 }}>
        {/* Campaign list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Campaigns</div>
          {campaigns.map(c => (
            <div
              key={c.id}
              onClick={() => setSelected(c.id)}
              style={{
                padding: '12px 14px', borderRadius: 'var(--rl)', cursor: 'pointer',
                background: c.id === selected ? 'var(--white)' : 'transparent',
                borderLeft: c.id === selected ? '3px solid var(--channel-sms)' : '3px solid transparent',
                border: c.id === selected ? '1.5px solid var(--paper-2)' : '1.5px solid transparent',
                transition: 'all var(--transition-base)',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{c.useCase} · {c.sentToday} sent</div>
            </div>
          ))}
        </div>

        {/* Preview */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{campaign.name}</span>
            <div style={{ display: 'flex', gap: 14, fontSize: 12 }}>
              <span style={{ color: 'var(--green)', fontWeight: 500 }}>Delivery: {campaign.deliveryRate}</span>
              <span style={{ color: 'var(--cyan-dim)', fontWeight: 500 }}>Click: {campaign.clickRate}</span>
            </div>
          </div>

          <div style={{ padding: '24px', display: 'flex', gap: 32, alignItems: 'flex-start' }}>
            {/* Phone mockup */}
            <div style={{ flexShrink: 0 }}>
              <div style={{
                width: 200, borderRadius: 24,
                background: '#1a1a2e', padding: '12px 8px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              }}>
                <div style={{ background: '#000', borderRadius: 18, overflow: 'hidden' }}>
                  {/* Status bar */}
                  <div style={{ background: '#1a1a2e', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#fff' }}>
                    <span>9:41</span><span>●●●</span>
                  </div>
                  {/* SMS header */}
                  <div style={{ background: '#2a2a3e', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--channel-sms)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Smartphone size={12} style={{ color: '#fff' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#fff' }}>Revnyx Agent</div>
                      <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)' }}>Just now</div>
                    </div>
                  </div>
                  {/* Message bubble */}
                  <div style={{ padding: '12px 10px', background: '#0a0a1a', minHeight: 120 }}>
                    <div style={{ background: '#2a2a3e', borderRadius: '4px 12px 12px 12px', padding: '8px 10px', maxWidth: 160 }}>
                      <p style={{ fontSize: 9, color: '#e0e0ff', lineHeight: 1.5, margin: 0 }}>
                        {campaign.message.replace(/{{[^}]+}}/g, (m) => {
                          const map: Record<string, string> = {
                            '{{name}}': 'Ramesh', '{{company}}': 'ClearTax', '{{amount}}': '₹4,999',
                            '{{link}}': 'pay.ct.in/r1', '{{plan}}': 'Pro', '{{date}}': 'May 12',
                            '{{offer}}': '₹500 off',
                          };
                          return map[m] ?? m;
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message details */}
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Message Template</div>
                <div style={{ background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '12px 14px', fontSize: 13, lineHeight: 1.7, color: 'var(--ink-2)', fontFamily: 'monospace' }}>
                  {campaign.message}
                </div>
              </div>

              {/* Char count */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Character Count</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: charPct > 90 ? 'var(--red)' : 'var(--green)' }}>{campaign.chars}/160</span>
                </div>
                <div style={{ background: 'var(--paper-2)', borderRadius: 99, height: 6, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${charPct}%`, background: charPct > 90 ? 'var(--red)' : 'var(--channel-sms)', borderRadius: 99 }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Send size={13} /> Launch Outreach
                </button>
                <button className="btn-secondary">Edit Template</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent sends */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 24px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>Recent Sends</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>To</th>
              <th>Message</th>
              <th>Status</th>
              <th>Clicked</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recentSMS.map((s, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{s.to}</td>
                <td style={{ maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--ink-3)', fontSize: 12 }}>{s.message}</td>
                <td><span className="badge" style={statusStyle[s.status]}>{s.status}</span></td>
                <td>
                  <span style={{ fontSize: 12, fontWeight: 500, color: s.clicked ? 'var(--green)' : 'var(--ink-3)' }}>
                    {s.clicked ? '✓ Yes' : '—'}
                  </span>
                </td>
                <td style={{ fontSize: 12, color: 'var(--ink-3)' }}>{s.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
