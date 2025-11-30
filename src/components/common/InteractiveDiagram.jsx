import React, { useCallback } from 'react';
import ReactFlow, { 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

const InteractiveDiagram = ({ initialNodes, initialEdges, title = "Architecture Diagram" }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="h-[500px] w-full bg-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-300">{title}</span>
        <span className="text-xs text-gray-500">Interactive • Scroll to Zoom • Drag to Pan</span>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-right"
        className="bg-gray-900"
      >
        <Background color="#374151" gap={16} />
        <Controls className="bg-gray-800 border-gray-700 fill-gray-300 text-gray-300" />
      </ReactFlow>
    </div>
  );
};

export default InteractiveDiagram;
