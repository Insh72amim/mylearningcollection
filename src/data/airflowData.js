export const airflowNodes = [
  // Control Plane
  { id: 'ws', position: { x: 100, y: 50 }, data: { label: 'Web Server' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 120 } },
  { id: 'sch', position: { x: 300, y: 50 }, data: { label: 'Scheduler' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 120 } },
  { id: 'db', position: { x: 200, y: 150 }, data: { label: 'Metadata DB' }, style: { background: '#5b21b6', color: 'white', border: '1px solid #8b5cf6', width: 120 } },
  { id: 'ex', position: { x: 450, y: 150 }, data: { label: 'Executor' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 100 } },
  
  // Workers
  { id: 'w1', position: { x: 350, y: 300 }, data: { label: 'Worker 1' }, style: { background: '#064e3b', color: 'white', border: '1px solid #10b981', width: 100 } },
  { id: 'w2', position: { x: 470, y: 300 }, data: { label: 'Worker 2' }, style: { background: '#064e3b', color: 'white', border: '1px solid #10b981', width: 100 } },
  { id: 'w3', position: { x: 590, y: 300 }, data: { label: 'Worker 3' }, style: { background: '#064e3b', color: 'white', border: '1px solid #10b981', width: 100 } },

  // Storage
  { id: 'dags', position: { x: 50, y: 250 }, data: { label: 'DAG Files' }, style: { background: '#374151', color: 'white', border: '1px dashed #9ca3af', width: 100 } },
  { id: 'logs', position: { x: 350, y: 400 }, data: { label: 'Task Logs' }, style: { background: '#374151', color: 'white', border: '1px dashed #9ca3af', width: 340 } },
];

export const airflowEdges = [
  { id: 'e1', source: 'ws', target: 'db', animated: true, style: { stroke: '#9ca3af' } },
  { id: 'e2', source: 'sch', target: 'db', animated: true, style: { stroke: '#9ca3af' } },
  { id: 'e3', source: 'sch', target: 'ex', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e4', source: 'ex', target: 'w1', animated: true, style: { stroke: '#10b981' } },
  { id: 'e5', source: 'ex', target: 'w2', animated: true, style: { stroke: '#10b981' } },
  { id: 'e6', source: 'ex', target: 'w3', animated: true, style: { stroke: '#10b981' } },
  { id: 'e7', source: 'dags', target: 'sch', type: 'smoothstep', style: { stroke: '#6b7280', strokeDasharray: '5,5' } },
  { id: 'e8', source: 'dags', target: 'ws', type: 'smoothstep', style: { stroke: '#6b7280', strokeDasharray: '5,5' } },
  { id: 'e9', source: 'dags', target: 'w1', type: 'smoothstep', style: { stroke: '#6b7280', strokeDasharray: '5,5' } },
  { id: 'e10', source: 'w1', target: 'logs', style: { stroke: '#6b7280' } },
  { id: 'e11', source: 'w2', target: 'logs', style: { stroke: '#6b7280' } },
  { id: 'e12', source: 'w3', target: 'logs', style: { stroke: '#6b7280' } },
  { id: 'e13', source: 'ws', target: 'logs', type: 'smoothstep', style: { stroke: '#6b7280', strokeDasharray: '5,5' } },
];
