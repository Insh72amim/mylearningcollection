import React, { useCallback, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  useNodesState, 
  useEdgesState,
  addEdge
} from 'reactflow';
import 'reactflow/dist/style.css';

import ProducerNode from './nodes/ProducerNode';
import BrokerNode from './nodes/BrokerNode';
import ConsumerNode from './nodes/ConsumerNode';

const initialNodes = [
  { id: 'producer-1', position: { x: 50, y: 200 }, type: 'producer', data: { label: 'Producer' } },
  { id: 'broker-1', position: { x: 400, y: 50 }, type: 'broker', data: { label: 'Broker 1', id: 'broker-1' } },
  { id: 'broker-2', position: { x: 400, y: 350 }, type: 'broker', data: { label: 'Broker 2', id: 'broker-2' } },
  { id: 'consumer-1', position: { x: 800, y: 200 }, type: 'consumer', data: { label: 'Consumer Group' } },
];

const initialEdges = [
  { id: 'e1-2', source: 'producer-1', target: 'broker-1', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e1-3', source: 'producer-1', target: 'broker-2', animated: true, style: { stroke: '#3b82f6' } },
  { id: 'e2-4', source: 'broker-1', target: 'consumer-1', animated: true, style: { stroke: '#22c55e' } },
  { id: 'e3-4', source: 'broker-2', target: 'consumer-1', animated: true, style: { stroke: '#22c55e' } },
];

const KafkaArchitecture = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(() => ({
    producer: ProducerNode,
    broker: BrokerNode,
    consumer: ConsumerNode,
  }), []);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <div className="h-[600px] w-full bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#374151" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default KafkaArchitecture;
