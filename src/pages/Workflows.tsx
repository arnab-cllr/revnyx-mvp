import { useState } from 'react';
import { GitBranch, Play, Pause, Plus, Phone, MessageCircle, Mail, MessageSquare, Zap, CheckCircle2, AlertTriangle } from 'lucide-react';
import workflowsData from '../data/workflows.json';

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: 'Active',  className: 'badge badge-live' },
  paused: { label: 'Paused',  className: 'badge badge-pending' },
  draft:  { label: 'Draft',   className: 'badge badge-draft' },
};

const channelIcon: Record<string, React.ReactNode> = {
  'Voice AI':  <Phone size={11} />,
  'WhatsApp':  <MessageCircle size={11} />,
  'Email':     <Mail size={11} />,
  'SMS':       <MessageSquare size={11} />,
};

const channelColor: Record<string, string> = {
  'Voice AI':  'var(--channel-voice)',
  'WhatsApp':  'var(--channel-whatsapp)',
  'Email':     'var(--channel-email)',
  'SMS':       'var(--channel-sms)',
};

type NodeType = 'trigger' | 'action' | 'condition' | 'outcome';

const nodeConfig: Record<NodeType, { className: string; label: string; color: string }> = {
  trigger:   { className: 'node-trigger',   label: 'Trigger',   color: 'var(--navy)' },
  action:    { className: 'node-action',     label: 'Action',    color: 'var(--ink-2)' },
  condition: { className: 'node-condition',  label: 'Condition', color: 'var(--amber)' },
  outcome:   { className: 'node-outcome',    label: 'Outcome',   color: 'var(--green)' },
};

const nodeIcon: Record<NodeType, React.ReactNode> = {
  trigger:   <Zap size={11} />,
  action:    <Play size={11} />,
  condition: <AlertTriangle size={11} />,
  outcome:   <CheckCircle2 size={11} />,
};

function WorkflowCanvas({ workflow }: { workflow: typeof workflowsData.workflows[0] }) {
  const canvasW = 840, canvasH = 420;
  const nodeW = 150, nodeH = 48;

  return (
    <div className="workflow-canvas" style={{ borderRadius: 'var(--r)', border: '1px solid var(--border)', overflow: 'hidden', height: canvasH }}>
      <svg width={canvasW} height={canvasH} style={{ display: 'block' }}>
        {/* Edges */}
        {workflow.edges.map((edge, i) => {
          const from = workflow.nodes.find(n => n.id === edge.from);
          const to = workflow.nodes.find(n => n.id === edge.to);
          if (!from || !to) return null;
          const x1 = from.x + nodeW, y1 = from.y + nodeH / 2;
          const x2 = to.x, y2 = to.y + nodeH / 2;
          const cx = (x1 + x2) / 2;
          return (
            <path
              key={i}
              d={`M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`}
              fill="none"
              stroke="rgba(7,17,28,0.18)"
              strokeWidth={1.5}
              strokeDasharray="none"
              markerEnd="url(#arrow)"
            />
          );
        })}
        <defs>
          <marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="rgba(7,17,28,0.18)" />
          </marker>
        </defs>

        {/* Nodes as foreignObject */}
        {workflow.nodes.map((node) => {
          const nc = nodeConfig[node.type as NodeType] ?? nodeConfig.action;
          const ni = nodeIcon[node.type as NodeType];
          return (
            <foreignObject key={node.id} x={node.x} y={node.y} width={nodeW} height={nodeH}>
              <div
                className={nc.className}
                style={{
                  padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6,
                  height: '100%', boxSizing: 'border-box', cursor: 'default',
                }}
              >
                <span style={{ color: nc.color, flexShrink: 0 }}>{ni}</span>
                <span style={{ fontSize: 11, fontWeight: 500, color: nc.color, lineHeight: 1.3 }}>{node.label}</span>
              </div>
            </foreignObject>
          );
        })}
      </svg>
    </div>
  );
}

export default function Workflows() {
  const [selected, setSelected] = useState(workflowsData.workflows[0].id);
  const workflow = workflowsData.workflows.find(w => w.id === selected) ?? workflowsData.workflows[0];

  return (
    <div className="fade-in" style={{ maxWidth: 'var(--content-max)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 className="text-heading">Intervention Workflows</h1>
          <p style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4 }}>
            Visual workflow canvas — configure signal → channel → outcome logic
          </p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Plus size={14} /> New Workflow
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
        {/* Workflow list */}
        <div>
          {workflowsData.workflows.map((wf) => {
            const sc = statusConfig[wf.status];
            const isSelected = wf.id === selected;
            return (
              <div
                key={wf.id}
                onClick={() => setSelected(wf.id)}
                style={{
                  padding: '14px 16px', borderRadius: 'var(--rl)', marginBottom: 8,
                  background: isSelected ? 'var(--white)' : 'transparent',
                  border: isSelected ? '1.5px solid var(--navy-light)' : '1.5px solid transparent',
                  cursor: 'pointer',
                  transition: 'all var(--transition-base)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <GitBranch size={14} style={{ color: 'var(--ink-3)', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3 }}>{wf.name}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className={sc.className}>{sc.label}</span>
                  <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{wf.triggers} triggers</span>
                </div>
                <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
                  {wf.channels.map(ch => (
                    <span key={ch} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 3,
                      fontSize: 10, padding: '2px 6px', borderRadius: 99,
                      background: channelColor[ch] + '18',
                      color: channelColor[ch],
                      fontWeight: 500,
                    }}>
                      {channelIcon[ch]} {ch}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Canvas area */}
        <div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* Canvas header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{workflow.name}</h2>
                <div style={{ display: 'flex', gap: 16, marginTop: 4 }}>
                  <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{workflow.triggers.toLocaleString()} interventions triggered</span>
                  <span style={{ fontSize: 12, color: 'var(--green)', fontWeight: 500 }}>{workflow.recoveryRate} recovery rate</span>
                  <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>Last run: {workflow.lastRun}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {workflow.status === 'active' ? (
                  <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px' }}>
                    <Pause size={13} /> Pause
                  </button>
                ) : (
                  <button className="btn-accent" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px' }}>
                    <Play size={13} /> Deploy Workflow
                  </button>
                )}
              </div>
            </div>

            {/* Legend */}
            <div style={{ padding: '10px 20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 20, background: 'var(--paper)' }}>
              {(Object.keys(nodeConfig) as NodeType[]).map(type => {
                const nc = nodeConfig[type];
                const ni = nodeIcon[type];
                return (
                  <span key={type} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: nc.color, fontWeight: 500 }}>
                    {ni} {nc.label}
                  </span>
                );
              })}
            </div>

            {/* Canvas */}
            <div style={{ padding: 20 }}>
              <WorkflowCanvas workflow={workflow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
