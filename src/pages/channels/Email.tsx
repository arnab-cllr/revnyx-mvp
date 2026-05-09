import { useState } from 'react';
import { Mail, Eye, Send, Tag } from 'lucide-react';

const templates = [
  {
    id: 'em-1',
    name: 'Payment Recovery — Invoice Overdue',
    subject: 'Action needed: Your invoice {{invoice_id}} is {{days_overdue}} days overdue',
    useCase: 'Payment Recovery',
    sentToday: 124,
    openRate: '41%',
    recoveryRate: '14%',
    body: `Hi {{first_name}},

We noticed your invoice **{{invoice_id}}** for **{{amount}}** is now **{{days_overdue}} days overdue**.

We understand things get busy — here's your one-click payment link:

🔗 **Pay now:** {{payment_link}}

This link is valid for 48 hours. Paying now ensures uninterrupted access to {{product_name}}.

If you've already paid, please ignore this message.

Warm regards,
**Revnyx Agent** on behalf of {{company_name}}`,
    tokens: ['{{first_name}}', '{{invoice_id}}', '{{amount}}', '{{days_overdue}}', '{{payment_link}}', '{{product_name}}', '{{company_name}}'],
  },
  {
    id: 'em-2',
    name: 'Churn Prevention — Re-engagement',
    subject: 'We miss you, {{first_name}} — here\'s something for you',
    useCase: 'Churn Prevention',
    sentToday: 88,
    openRate: '34%',
    recoveryRate: '9%',
    body: `Hi {{first_name}},

We noticed your activity on **{{product_name}}** has dropped over the past **{{inactive_days}} days**.

We'd love to understand why — and make things right.

Here's what's waiting for you:
- 🎁 **{{offer_detail}}**
- 📞 A quick call with our team to resolve any issues

Click below to reconnect:
👉 **{{cta_link}}**

We're here if you need us.

The Revnyx Agent Team`,
    tokens: ['{{first_name}}', '{{product_name}}', '{{inactive_days}}', '{{offer_detail}}', '{{cta_link}}'],
  },
  {
    id: 'em-3',
    name: 'Subscription Renewal — 7 Days Notice',
    subject: 'Your {{plan_name}} subscription renews in 7 days',
    useCase: 'Renewal',
    sentToday: 56,
    openRate: '62%',
    recoveryRate: '58%',
    body: `Hi {{first_name}},

Your **{{plan_name}}** subscription is set to renew on **{{renewal_date}}** for **{{renewal_amount}}**.

No action needed — we'll auto-renew using your saved payment method.

Want to upgrade before renewal?
👉 **Explore plans:** {{upgrade_link}}

Questions? Reply to this email or call us anytime.

The Revnyx Agent Team`,
    tokens: ['{{first_name}}', '{{plan_name}}', '{{renewal_date}}', '{{renewal_amount}}', '{{upgrade_link}}'],
  },
];

export default function Email() {
  const [selected, setSelected] = useState(templates[0].id);
  const tpl = templates.find(t => t.id === selected) ?? templates[0];

  return (
    <div className="fade-in" style={{ maxWidth: 'var(--content-max)' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 className="text-heading">Email</h1>
          <span className="badge badge-info" style={{ fontSize: 11 }}>MVP — Mock</span>
        </div>
        <p style={{ fontSize: 14, color: 'var(--ink-3)' }}>
          Automated email interventions with personalisation tokens, outcome tracking.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Emails Sent Today', value: '280' },
          { label: 'Avg Open Rate', value: '46%' },
          { label: 'Revenue via Email', value: '₹0.8L' },
        ].map(k => (
          <div key={k.label} className="metric-card">
            <p className="metric-label">{k.label}</p>
            <p className="metric-value" style={{ fontSize: 26 }}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Template builder */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20 }}>
        {/* Template list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Templates</div>
          {templates.map(t => (
            <div
              key={t.id}
              onClick={() => setSelected(t.id)}
              style={{
                padding: '12px 14px', borderRadius: 'var(--rl)', cursor: 'pointer',
                background: t.id === selected ? 'var(--white)' : 'transparent',
                border: t.id === selected ? '1.5px solid var(--amber-light)' : '1.5px solid transparent',
                borderLeft: t.id === selected ? '3px solid var(--channel-email)' : '3px solid transparent',
                transition: 'all var(--transition-base)',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 4, lineHeight: 1.3 }}>{t.name}</div>
              <div style={{ display: 'flex', gap: 10, fontSize: 11, color: 'var(--ink-3)' }}>
                <span>✉ {t.sentToday} sent</span>
                <span><Eye size={10} style={{ display: 'inline' }} /> {t.openRate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Preview */}
        <div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Email header */}
            <div style={{ padding: '14px 20px', background: 'var(--paper)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{tpl.name}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--green)', fontWeight: 500 }}>Open: {tpl.openRate}</span>
                  <span style={{ fontSize: 12, color: 'var(--amber)', fontWeight: 500 }}>Recovery: {tpl.recoveryRate}</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>Subject: </span>{tpl.subject}
              </div>
            </div>

            {/* Token pills */}
            <div style={{ padding: '10px 20px', borderBottom: '1px solid var(--border)', display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'center' }}>
              <Tag size={11} style={{ color: 'var(--ink-3)', marginRight: 2 }} />
              {tpl.tokens.map(tok => (
                <span key={tok} style={{
                  fontSize: 10, background: 'var(--amber-light)', color: 'var(--amber)',
                  padding: '2px 7px', borderRadius: 4, fontWeight: 600, fontFamily: 'monospace',
                }}>
                  {tok}
                </span>
              ))}
            </div>

            {/* Email body */}
            <div style={{ padding: '24px 28px', background: 'var(--white)', minHeight: 320 }}>
              <div style={{
                maxWidth: 560, margin: '0 auto',
                border: '1px solid var(--border)', borderRadius: 'var(--rl)',
                overflow: 'hidden', boxShadow: '0 4px 20px rgba(7,17,28,0.06)',
              }}>
                {/* Email top bar */}
                <div style={{ background: 'var(--amber)', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Mail size={16} style={{ color: '#fff' }} />
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: '#fff', fontSize: 14 }}>revnyx.ai</span>
                </div>
                {/* Body */}
                <div style={{ padding: '24px', fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.8, color: 'var(--ink-2)', whiteSpace: 'pre-wrap' }}>
                  {tpl.body.split(/(\*\*.*?\*\*|{{.*?}})/g).map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={i}>{part.slice(2, -2)}</strong>;
                    }
                    if (part.startsWith('{{') && part.endsWith('}}')) {
                      return <span key={i} style={{ background: 'var(--amber-light)', color: 'var(--amber)', padding: '0 3px', borderRadius: 3, fontFamily: 'monospace', fontSize: 11 }}>{part}</span>;
                    }
                    return part;
                  })}
                </div>
                {/* Footer */}
                <div style={{ padding: '12px 24px', background: 'var(--paper-2)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, color: 'var(--ink-3)' }}>Sent via Revnyx AI · Unsubscribe</span>
                  <span style={{ fontSize: 10, color: 'var(--ink-3)' }}>Eternyx Innovations Pvt. Ltd.</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: 10 }}>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Send size={13} /> Launch Intervention
              </button>
              <button className="btn-secondary">Edit Template</button>
              <button className="btn-secondary">A/B Test</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
