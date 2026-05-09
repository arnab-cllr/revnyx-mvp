import { TrendingUp, Zap, UserMinus, CreditCard, Phone, MessageCircle, Mail, MessageSquare, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import analytics from '../data/analytics.json';

const kpiCards = [
  { label: 'Revenue Recovered', value: analytics.kpis.revenueRecovered, delta: '+23% MoM', icon: TrendingUp, color: 'var(--green)', bg: 'var(--green-light)' },
  { label: 'Interventions Triggered', value: analytics.kpis.interventionsTriggered.toLocaleString(), delta: '+80% MoM', icon: Zap, color: 'var(--cyan-dim)', bg: 'var(--cyan-light)' },
  { label: 'Churns Reverted', value: analytics.kpis.churnsReverted.toString(), delta: 'This month', icon: UserMinus, color: 'var(--navy-mid)', bg: 'var(--navy-light)' },
  { label: 'Payment Recovery Rate', value: analytics.kpis.paymentRecoveryRate, delta: '+4pp vs last month', icon: CreditCard, color: 'var(--amber)', bg: 'var(--amber-light)' },
];

const channelIcons: Record<string, React.ReactNode> = {
  'Voice AI': <Phone size={14} />,
  'WhatsApp': <MessageCircle size={14} />,
  'Email': <Mail size={14} />,
  'SMS': <MessageSquare size={14} />,
};

const recentInterventions = [
  { customer: 'Ramesh K.', useCase: 'Payment Recovery', channel: 'Voice AI', status: 'Recovered', amount: '₹4,999', time: '2 min ago' },
  { customer: 'Priya S.', useCase: 'Churn Prevention', channel: 'WhatsApp', status: 'Active', amount: '₹899/mo', time: '5 min ago' },
  { customer: 'Vijay T.', useCase: 'Cold Lead', channel: 'Voice AI', status: 'Escalated', amount: '—', time: '8 min ago' },
  { customer: 'Anjali R.', useCase: 'Payment Recovery', channel: 'Email', status: 'Pending', amount: '₹12,400', time: '14 min ago' },
  { customer: 'Karan M.', useCase: 'Subscription Renewal', channel: 'SMS', status: 'Resolved', amount: '₹2,499/yr', time: '21 min ago' },
];

const statusStyle: Record<string, { bg: string; color: string }> = {
  'Recovered': { bg: 'var(--green-light)', color: 'var(--green)' },
  'Active':    { bg: 'var(--cyan-light)',  color: 'var(--cyan-dim)' },
  'Escalated': { bg: 'var(--amber-light)', color: 'var(--amber)' },
  'Pending':   { bg: 'var(--amber-light)', color: 'var(--amber)' },
  'Resolved':  { bg: 'var(--green-light)', color: 'var(--green)' },
};

const channelColors: Record<string, string> = {
  'Voice AI': 'var(--channel-voice)',
  'WhatsApp': 'var(--channel-whatsapp)',
  'Email':    'var(--channel-email)',
  'SMS':      'var(--channel-sms)',
};

export default function Dashboard() {
  return (
    <div className="fade-in" style={{ maxWidth: 'var(--content-max)' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 className="text-heading" style={{ color: 'var(--ink)' }}>Revenue Command Center</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4 }}>
          Real-time view of interventions, recovery, and channel performance.
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="metric-card hover-lift" style={{ cursor: 'default' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <p className="metric-label">{kpi.label}</p>
                <div style={{ width: 32, height: 32, borderRadius: 'var(--r)', background: kpi.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: kpi.color }}>
                  <Icon size={16} />
                </div>
              </div>
              <p className="metric-value">{kpi.value}</p>
              <p className="metric-delta" style={{ marginTop: 6 }}>
                <ArrowUpRight size={12} style={{ display: 'inline', marginRight: 2 }} />
                {kpi.delta}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 28 }}>
        {/* Revenue chart */}
        <div className="card" style={{ padding: '20px 20px 12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h2 className="text-subhead" style={{ fontSize: 15 }}>Revenue Recovered</h2>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Monthly trend (INR)</p>
            </div>
            <span className="badge badge-live">Live</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={analytics.revenueChart} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="recoveredGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--ink-3)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--ink-3)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/100000).toFixed(1)}L`} />
              <Tooltip
                formatter={(v: unknown) => [`₹${((v as number)/100000).toFixed(2)}L`, 'Recovered']}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--border)', boxShadow: '0 4px 16px rgba(7,17,28,0.08)' }}
              />
              <Area type="monotone" dataKey="recovered" stroke="#059669" strokeWidth={2} fill="url(#recoveredGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Channel performance */}
        <div className="card" style={{ padding: '20px 20px 12px' }}>
          <h2 className="text-subhead" style={{ fontSize: 15, marginBottom: 4 }}>Channel Performance</h2>
          <p style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 20 }}>Success rate by channel</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analytics.channelPerformance} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="channel" tick={{ fontSize: 10, fill: 'var(--ink-3)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--ink-3)' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip
                formatter={(v: unknown) => [`${v}%`, 'Success rate']}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--border)' }}
              />
              <Bar dataKey="successRate" fill="var(--navy)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live interventions table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px 14px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 className="text-subhead" style={{ fontSize: 15 }}>Live Interventions</h2>
            <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Most recent agent actions</p>
          </div>
          <span className="badge badge-live">Real-time</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Use Case</th>
              <th>Channel</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recentInterventions.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500, color: 'var(--ink)' }}>{r.customer}</td>
                <td>{r.useCase}</td>
                <td>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontSize: 12, fontWeight: 500, padding: '3px 8px', borderRadius: 99,
                    background: channelColors[r.channel] + '18',
                    color: channelColors[r.channel],
                  }}>
                    {channelIcons[r.channel]} {r.channel}
                  </span>
                </td>
                <td>
                  <span className="badge" style={statusStyle[r.status]}>
                    {r.status}
                  </span>
                </td>
                <td style={{ fontWeight: 500 }}>{r.amount}</td>
                <td style={{ color: 'var(--ink-3)', fontSize: 12 }}>{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
