import { FlaskConical, Trophy, Activity, TrendingUp } from 'lucide-react';
import abData from '../data/ab-tests.json';

const statusConfig: Record<string, { label: string; className: string }> = {
  running:   { label: 'Running',   className: 'badge badge-live' },
  completed: { label: 'Completed', className: 'badge badge-info' },
  paused:    { label: 'Paused',    className: 'badge badge-pending' },
};

function VariantBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ background: 'var(--paper-2)', borderRadius: 99, height: 8, width: '100%', overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99, transition: 'width 0.6s ease' }} />
    </div>
  );
}

export default function ABTesting() {
  return (
    <div className="fade-in" style={{ maxWidth: 'var(--content-max)' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 className="text-heading">A/B Testing</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4 }}>
          Variant comparison, traffic split, and outcome metrics per use case
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {abData.tests.map((test) => {
          const sc = statusConfig[test.status];
          const maxSuccess = Math.max(...test.variants.map(v => v.successRate));

          return (
            <div key={test.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Test header */}
              <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 'var(--r)', background: 'var(--navy-xlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--navy)' }}>
                    <FlaskConical size={18} />
                  </div>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{test.name}</h2>
                    <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 1 }}>
                      Workflow: {test.workflow} · Started {test.startDate} · {test.sampleSize.toLocaleString()} sample
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {test.winner && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>
                      <Trophy size={13} />
                      Variant {test.winner} wins · {test.confidence} confidence
                    </div>
                  )}
                  {!test.winner && test.status === 'running' && (
                    <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>
                      {test.confidence} confidence · still running
                    </div>
                  )}
                  <span className={sc.className}>{sc.label}</span>
                </div>
              </div>

              {/* Variants */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                {test.variants.map((variant, idx) => {
                  const isWinner = test.winner === variant.id;
                  return (
                    <div
                      key={variant.id}
                      style={{
                        padding: '20px 24px',
                        borderRight: idx === 0 ? '1px solid var(--border)' : 'none',
                        background: isWinner ? 'var(--green-light)' : 'var(--white)',
                        position: 'relative',
                      }}
                    >
                      {isWinner && (
                        <div style={{
                          position: 'absolute', top: 14, right: 16,
                          display: 'flex', alignItems: 'center', gap: 4,
                          fontSize: 11, fontWeight: 600, color: 'var(--green)',
                        }}>
                          <Trophy size={12} /> Winner
                        </div>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{
                          width: 24, height: 24, borderRadius: 6,
                          background: variant.id === 'A' ? 'var(--navy)' : 'var(--cyan-dim)',
                          color: '#fff', fontSize: 11, fontWeight: 700,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {variant.id}
                        </span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{variant.label}</span>
                      </div>

                      <p style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 16, lineHeight: 1.5 }}>{variant.description}</p>

                      {/* Metrics grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 14 }}>
                        {[
                          { label: 'Traffic Split', value: `${variant.traffic}%`, icon: <Activity size={11} /> },
                          { label: 'Interventions', value: variant.interventions.toLocaleString(), icon: <FlaskConical size={11} /> },
                          { label: 'Revenue', value: variant.revenueRecovered, icon: <TrendingUp size={11} /> },
                        ].map(m => (
                          <div key={m.label} style={{ background: 'rgba(255,255,255,0.6)', borderRadius: 'var(--r)', padding: '8px 10px' }}>
                            <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                              {m.icon} {m.label}
                            </div>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{m.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Success rate bar */}
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Success Rate</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: variant.successRate === maxSuccess ? 'var(--green)' : 'var(--ink-2)' }}>
                            {variant.successRate}%
                          </span>
                        </div>
                        <VariantBar
                          value={variant.successRate}
                          max={100}
                          color={variant.successRate === maxSuccess ? 'var(--green)' : 'var(--navy-mid)'}
                        />
                      </div>
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
