import { MarkerType } from 'reactflow';

export const kafkaData = {
  // 1. Cluster Model
  clusterNodes: [
    { id: 'zk', position: { x: 250, y: 0 }, data: { label: 'Zookeeper / KRaft' }, style: { background: '#1f2937', color: 'white', border: '1px dashed #4b5563', width: 180 } },
    { id: 'c', position: { x: 250, y: 100 }, data: { label: 'Controller Broker' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 180 } },
    { id: 'b2', position: { x: 50, y: 200 }, data: { label: 'Broker 2' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 120 } },
    { id: 'b3', position: { x: 450, y: 200 }, data: { label: 'Broker 3' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 120 } },
    { id: 'lb', position: { x: 250, y: 300 }, data: { label: 'Load Balancer' }, style: { background: '#7c3aed', color: 'white', border: '1px solid #8b5cf6', width: 150, borderRadius: '50%' } },
    { id: 'p', position: { x: 250, y: 400 }, data: { label: 'Producer' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 120 } },
  ],
  clusterEdges: [
    { id: 'e1', source: 'zk', target: 'c', label: 'Metadata', style: { stroke: '#9ca3af', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2', source: 'c', target: 'b2', label: 'Manage', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e3', source: 'c', target: 'b3', label: 'Manage', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e4', source: 'p', target: 'lb', label: 'Push', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e5', source: 'lb', target: 'b2', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e6', source: 'lb', target: 'b3', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ],

  // 2. Partition Anatomy
  partNodes: [
    { id: 'dir', position: { x: 0, y: 0 }, data: { label: 'Partition Directory' }, style: { background: 'rgba(31, 41, 55, 0.5)', color: 'white', border: '1px dashed #4b5563', width: 600, height: 150, zIndex: -1, textAlign: 'left', padding: '10px' } },
    { id: 's1', position: { x: 20, y: 50 }, data: { label: '0000.log' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 80 } },
    { id: 'i1', position: { x: 110, y: 50 }, data: { label: '0000.index' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 80 } },
    { id: 's2', position: { x: 210, y: 50 }, data: { label: '1000.log' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 80 } },
    { id: 'i2', position: { x: 300, y: 50 }, data: { label: '1000.index' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 80 } },
    { id: 's3', position: { x: 400, y: 50 }, data: { label: '2000.log' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 80 } },
    { id: 'i3', position: { x: 490, y: 50 }, data: { label: '2000.index' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 80 } },
  ],
  partEdges: [
    { id: 'p1', source: 's1', target: 'i1', style: { stroke: '#9ca3af' } },
    { id: 'p2', source: 's2', target: 'i2', style: { stroke: '#9ca3af' } },
    { id: 'p3', source: 's3', target: 'i3', style: { stroke: '#3b82f6' } },
  ],

  // 3. Replication Flow
  repNodes: [
    { id: 'p', position: { x: 150, y: 0 }, data: { label: 'Producer' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 120 } },
    { id: 'l', position: { x: 150, y: 100 }, data: { label: 'Leader Broker' }, style: { background: '#1e40af', color: 'white', border: '1px solid #3b82f6', width: 150 } },
    { id: 'f1', position: { x: 0, y: 250 }, data: { label: 'Follower 1' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 120 } },
    { id: 'f2', position: { x: 300, y: 250 }, data: { label: 'Follower 2' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 120 } },
  ],
  repEdges: [
    { id: 'r1', source: 'p', target: 'l', label: '1. Send', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r2', source: 'l', target: 'f1', label: '2. Replicate', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r3', source: 'l', target: 'f2', label: '2. Replicate', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r4', source: 'f1', target: 'l', label: '3. ACK', style: { stroke: '#9ca3af', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r5', source: 'f2', target: 'l', label: '3. ACK', style: { stroke: '#9ca3af', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r6', source: 'l', target: 'p', label: '4. Commit', style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ],

  // 4. Consumer Groups
  groupNodes: [
    { id: 't', position: { x: 250, y: 0 }, data: { label: 'Topic: Orders' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 150 } },
    { id: 'p0', position: { x: 50, y: 100 }, data: { label: 'P0' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 60 } },
    { id: 'p1', position: { x: 180, y: 100 }, data: { label: 'P1' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 60 } },
    { id: 'p2', position: { x: 310, y: 100 }, data: { label: 'P2' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 60 } },
    { id: 'p3', position: { x: 440, y: 100 }, data: { label: 'P3' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 60 } },
    
    { id: 'g1', position: { x: 100, y: 250 }, data: { label: 'Consumer 1' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 120 } },
    { id: 'g2', position: { x: 350, y: 250 }, data: { label: 'Consumer 2' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 120 } },
  ],
  groupEdges: [
    { id: 'tp0', source: 't', target: 'p0', style: { stroke: '#9ca3af' } },
    { id: 'tp1', source: 't', target: 'p1', style: { stroke: '#9ca3af' } },
    { id: 'tp2', source: 't', target: 'p2', style: { stroke: '#9ca3af' } },
    { id: 'tp3', source: 't', target: 'p3', style: { stroke: '#9ca3af' } },
    
    { id: 'c1p0', source: 'p0', target: 'g1', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'c1p1', source: 'p1', target: 'g1', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'c2p2', source: 'p2', target: 'g2', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'c2p3', source: 'p3', target: 'g2', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ],

  // 5. KStream
  streamNodes: [
    { id: 'e1', position: { x: 0, y: 50 }, data: { label: 'Event 1' }, style: { background: '#1e40af', color: 'white', border: '1px solid #3b82f6', width: 100 } },
    { id: 'e2', position: { x: 150, y: 50 }, data: { label: 'Event 2' }, style: { background: '#1e40af', color: 'white', border: '1px solid #3b82f6', width: 100 } },
    { id: 'e3', position: { x: 300, y: 50 }, data: { label: 'Event 3' }, style: { background: '#1e40af', color: 'white', border: '1px solid #3b82f6', width: 100 } },
    { id: 'e4', position: { x: 450, y: 50 }, data: { label: 'Event 4' }, style: { background: '#1e40af', color: 'white', border: '1px solid #3b82f6', width: 100 } },
  ],
  streamEdges: [
    { id: 's1', source: 'e1', target: 'e2', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 's2', source: 'e2', target: 'e3', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 's3', source: 'e3', target: 'e4', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ],
};
