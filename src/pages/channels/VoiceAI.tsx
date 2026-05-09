import { Phone, Activity, TrendingUp, Users, Clock, Mic, PhoneCall, PhoneOff, CheckCircle2 } from 'lucide-react';

const liveStats = [
  { label: 'Daily Dials', value: '2,700+', icon: Phone, color: 'var(--navy)' },
  { label: 'Connect Rate', value: '49.3%', icon: Activity, color: 'var(--green)' },
  { label: 'Revenue Recovered', value: '₹18.4L', icon: TrendingUp, color: 'var(--cyan-dim)' },
  { label: 'Avg Call Duration', value: '2m 14s', icon: Clock, color: 'var(--amber)' },
];

const liveCalls = [
  { id: 'C-8821', customer: 'Subscriber #2841', useCase: 'Churn Prevention', operator: 'Asianet', duration: '1:42', status: 'active' },
  { id: 'C-8820', customer: 'Subscriber #9034', useCase: 'Payment Recovery', operator: 'ClearTax', duration: '0:58', status: 'active' },
  { id: 'C-8819', customer: 'Lead #4412', useCase: 'Cold Lead', operator: 'edForce', duration: '2:11', status: 'active' },
];

const recentOutcomes = [
  { customer: 'Sub #2794', useCase: 'Churn Prevention', outcome: 'Churn Reverted', duration: '2:38', revenue: '₹899/mo' },
  { customer: 'Sub #3301', useCase: 'Payment Recovery', outcome: 'Payment Made', duration: '1:52', revenue: '₹4,999' },
  { customer: 'Lead #4398', useCase: 'Cold Lead', outcome: 'Demo Booked', duration: '3:12', revenue: '₹18,000' },
  { customer: 'Sub #2780', useCase: 'Churn Prevention', outcome: 'Escalated', duration: '1:14', revenue: '—' },
  { customer: 'Sub #3288', useCase: 'Payment Recovery', outcome: 'Payment Made', duration: '0:44', revenue: '₹2,499' },
];

const outcomeStyle: Record<string, { bg: string; color: string }> = {
  'Churn Reverted': { bg: 'var(--green-light)', color: 'var(--green)' },
  'Payment Made':   { bg: 'var(--green-light)', color: 'var(--green)' },
  'Demo Booked':    { bg: 'var(--cyan-light)',  color: 'var(--cyan-dim)' },
  'Escalated':      { bg: 'var(--amber-light)', color: 'var(--amber)' },
};

export default function VoiceAI() {
  return (
    <div className="fade-in" style={{ maxWidth: 'var(--content-max)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <h1 className="text-heading">Voice AI</h1>
            <span className="badge badge-live" style={{ fontSize: 11 }}>Live in Production</span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--ink-3)' }}>
            Outbound &amp; inbound LLM-powered calls. STT + TTS. Handles objections, negotiates outcomes, captures intent.
          </p>
        </div>
      </div>

      {/* Live KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {liveStats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="metric-card" style={{ borderTop: `3px solid ${s.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <p className="metric-label">{s.label}</p>
                <Icon size={16} style={{ color: s.color }} />
              </div>
              <p className="metric-value" style={{ fontSize: 28 }}>{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Live calls + capabilities */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Live calls */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 2s infinite', display: 'inline-block' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--ink)' }}>Active Calls Right Now</h2>
          </div>
          {liveCalls.map((call) => (
            <div key={call.id} style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green)' }}>
                  <PhoneCall size={16} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{call.customer}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{call.useCase} · {call.operator}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)', fontFamily: 'var(--font-display)' }}>{call.duration}</div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)' }}>{call.id}</div>
              </div>
            </div>
          ))}
          <div style={{ padding: '12px 20px', background: 'var(--paper)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Mic size={12} style={{ color: 'var(--ink-3)' }} />
            <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>+{2714 - 3} more calls active today</span>
          </div>
        </div>

        {/* Capabilities */}
        <div className="card-dark" style={{ borderRadius: 'var(--rl)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 18 }}>
            Agent Capabilities
          </h2>
          {[
            { icon: <Mic size={16} />, title: 'STT + TTS', desc: 'Real-time speech recognition and synthesis in multiple languages' },
            { icon: <Activity size={16} />, title: 'LLM-Powered Conversations', desc: 'Adaptive dialogue — handles objections, negotiates, captures intent' },
            { icon: <CheckCircle2 size={16} />, title: 'Outcome Memory', desc: 'Every call outcome written back to CRM automatically' },
            { icon: <PhoneOff size={16} />, title: 'Fallback Logic', desc: 'If unanswered → escalates to WhatsApp or schedules callback' },
            { icon: <Users size={16} />, title: 'Multi-Operator Support', desc: 'Asianet, ClearTax, edForce, Eloelo — live today' },
          ].map((cap) => (
            <div key={cap.title} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: 1 }}>{cap.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 2 }}>{cap.title}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{cap.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent outcomes */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>Recent Call Outcomes</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Use Case</th>
              <th>Outcome</th>
              <th>Duration</th>
              <th>Revenue Impact</th>
            </tr>
          </thead>
          <tbody>
            {recentOutcomes.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500, color: 'var(--ink)' }}>{r.customer}</td>
                <td>{r.useCase}</td>
                <td>
                  <span className="badge" style={outcomeStyle[r.outcome] ?? { bg: 'var(--paper-2)', color: 'var(--ink-3)' }}>
                    {r.outcome}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{r.duration}</td>
                <td style={{ fontWeight: 600, color: r.revenue !== '—' ? 'var(--green)' : 'var(--ink-3)' }}>{r.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
