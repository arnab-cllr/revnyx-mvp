import { Phone, MessageCircle, Mail, MessageSquare } from 'lucide-react';
import {
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import analytics from '../data/analytics.json';

const channelIconMap: Record<string, React.ReactNode> = {
  'Voice AI':  <Phone size={14} />,
  'WhatsApp':  <MessageCircle size={14} />,
  'Email':     <Mail size={14} />,
  'SMS':       <MessageSquare size={14} />,
};

export default function Analytics() {
  return (
    <div className="fade-in" style={{ maxWidth: 'var(--content-max)' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 className="text-heading">Analytics</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4 }}>
          Revenue recovered, funnel performance, and channel comparison
        </p>
      </div>

      {/* Summary KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Revenue Recovered', value: analytics.kpis.revenueRecovered, delta: '+23% MoM', color: 'var(--green)' },
          { label: 'Connect Rate (Voice)', value: analytics.kpis.connectRate, delta: '~2× industry avg', color: 'var(--cyan-dim)' },
          { label: 'Payment Recovery Rate', value: analytics.kpis.paymentRecoveryRate, delta: '+4pp MoM', color: 'var(--amber)' },
          { label: 'Avg Trigger Latency', value: `${analytics.kpis.avgLatencyMs / 1000}s`, delta: 'Under 2 seconds', color: 'var(--navy-mid)' },
        ].map(k => (
          <div key={k.label} className="metric-card">
            <p className="metric-label">{k.label}</p>
            <p className="metric-value" style={{ color: k.color }}>{k.value}</p>
            <p className="metric-delta" style={{ marginTop: 6, color: 'var(--ink-3)' }}>{k.delta}</p>
          </div>
        ))}
      </div>

      {/* Revenue trend */}
      <div className="card" style={{ marginBottom: 20, padding: '20px 20px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h2 className="text-subhead" style={{ fontSize: 15 }}>Revenue Recovery Trend</h2>
            <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Monthly recovered vs lost revenue (INR)</p>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--green)' }}>
              <span style={{ width: 10, height: 3, background: 'var(--green)', borderRadius: 99 }} /> Recovered
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--red)' }}>
              <span style={{ width: 10, height: 3, background: 'var(--red)', borderRadius: 99 }} /> Lost
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={analytics.revenueChart} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--ink-3)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--ink-3)' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
            <Tooltip
              formatter={(v: unknown, name: unknown) => [`₹${((v as number) / 100000).toFixed(2)}L`, name === 'recovered' ? 'Recovered' : 'Lost']}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid var(--border)' }}
            />
            <Area type="monotone" dataKey="recovered" stroke="#059669" strokeWidth={2} fill="url(#greenGrad)" />
            <Area type="monotone" dataKey="lost" stroke="#DC2626" strokeWidth={1.5} fill="url(#redGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row: channel breakdown + funnel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Channel breakdown */}
        <div className="card" style={{ padding: '20px 20px 12px' }}>
          <h2 className="text-subhead" style={{ fontSize: 15, marginBottom: 4 }}>Channel Breakdown</h2>
          <p style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 18 }}>Interventions & success rates</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {analytics.channelPerformance.map(ch => (
              <div key={ch.channel}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>
                    <span style={{ color: ch.color }}>{channelIconMap[ch.channel]}</span>
                    {ch.channel}
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: ch.color }}>{ch.successRate}%</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-3)', marginLeft: 8 }}>{ch.interventions.toLocaleString()} interventions</span>
                  </div>
                </div>
                <div style={{ background: 'var(--paper-2)', borderRadius: 99, height: 6, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${ch.successRate}%`, background: ch.color, borderRadius: 99, transition: 'width 0.6s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Funnel */}
        <div className="card" style={{ padding: '20px 24px' }}>
          <h2 className="text-subhead" style={{ fontSize: 15, marginBottom: 4 }}>Intervention Funnel</h2>
          <p style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 20 }}>From signal detection to revenue recovery</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {analytics.funnelData.map((stage, i) => {
              const maxCount = analytics.funnelData[0].count;
              const pct = (stage.count / maxCount) * 100;
              const opacity = 1 - i * 0.12;
              return (
                <div key={stage.stage}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink-2)' }}>{stage.stage}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>
                      {stage.count.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ background: 'var(--paper-2)', borderRadius: 99, height: 8, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${pct}%`,
                      background: `var(--navy)`,
                      opacity,
                      borderRadius: 99,
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                  {i < analytics.funnelData.length - 1 && (
                    <div style={{ fontSize: 10, color: 'var(--ink-3)', textAlign: 'right', marginTop: 2 }}>
                      {((analytics.funnelData[i + 1].count / stage.count) * 100).toFixed(0)}% →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
