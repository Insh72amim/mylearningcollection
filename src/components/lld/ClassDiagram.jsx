import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { Info } from "lucide-react";

// Custom Class Node Component
const ClassNode = ({ data }) => {
  return (
    <div className="bg-white border-2 border-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-shadow min-w-[200px]">
      {/* Class Name */}
      <div
        className={`px-4 py-2 font-bold text-white text-center rounded-t-md ${data.color || "bg-blue-600"}`}
      >
        {data.stereotype && (
          <div className="text-xs italic opacity-80">«{data.stereotype}»</div>
        )}
        <div className="text-base">{data.label}</div>
      </div>

      {/* Attributes */}
      {data.attributes && data.attributes.length > 0 && (
        <div className="border-t-2 border-gray-800 px-3 py-2 bg-gray-50">
          {data.attributes.map((attr, idx) => (
            <div key={idx} className="text-xs font-mono text-gray-700 py-0.5">
              {attr}
            </div>
          ))}
        </div>
      )}

      {/* Methods */}
      {data.methods && data.methods.length > 0 && (
        <div className="border-t-2 border-gray-800 px-3 py-2 bg-white">
          {data.methods.map((method, idx) => (
            <div key={idx} className="text-xs font-mono text-gray-700 py-0.5">
              {method}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Node types
const nodeTypes = {
  classNode: ClassNode,
};

// Edge label styles
const edgeLabelStyle = {
  fill: "#6b7280",
  fontSize: 12,
  fontWeight: 600,
};

const ClassDiagram = ({ nodes: initialNodes, edges: initialEdges }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-5 h-5 text-blue-400" />
          <h5 className="text-sm font-bold text-white">UML Diagram Legend</h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Relationships */}
          <div>
            <div className="text-gray-400 font-semibold mb-2">
              Relationships
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-8 h-0.5 bg-blue-500"></div>
                <span>Composition (has)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-8 h-0.5 bg-green-500"></div>
                <span>Inheritance (extends)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-8 h-0.5 bg-orange-500 border-dashed border-t-2 border-orange-500"></div>
                <span>Dependency (uses)</span>
              </div>
            </div>
          </div>

          {/* Stereotypes */}
          <div>
            <div className="text-gray-400 font-semibold mb-2">Stereotypes</div>
            <div className="space-y-1 text-gray-300">
              <div>«Interface» - Interface type</div>
              <div>«Abstract» - Abstract class</div>
              <div>«Singleton» - Single instance</div>
            </div>
          </div>

          {/* Visibility */}
          <div>
            <div className="text-gray-400 font-semibold mb-2">Visibility</div>
            <div className="space-y-1 text-gray-300">
              <div>
                <span className="font-mono">+</span> Public
              </div>
              <div>
                <span className="font-mono">-</span> Private
              </div>
              <div>
                <span className="font-mono">#</span> Protected
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagram */}
      <div className="w-full h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-300 shadow-inner">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          minZoom={0.2}
          maxZoom={1.5}
          defaultEdgeOptions={{
            animated: false,
            style: { strokeWidth: 2 },
          }}
        >
          <Background color="#d1d5db" gap={20} size={1} />
          <Controls className="bg-white border border-gray-300 rounded-lg shadow-lg" />
          <MiniMap
            nodeColor={(node) => {
              switch (node.type) {
                case "classNode":
                  return "#3b82f6";
                default:
                  return "#94a3b8";
              }
            }}
            nodeStrokeWidth={3}
            zoomable
            pannable
            className="bg-white border border-gray-300 rounded-lg shadow-lg"
          />
        </ReactFlow>
      </div>

      {/* Instructions */}
      <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
        <div className="flex items-start gap-3 text-sm text-gray-300">
          <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p>
              <strong>Interactive Controls:</strong>
            </p>
            <ul className="list-disc list-inside space-y-0.5 text-xs">
              <li>Click and drag nodes to rearrange the diagram</li>
              <li>Scroll to zoom in/out</li>
              <li>Click and drag background to pan around</li>
              <li>Use controls (bottom-left) for additional options</li>
              <li>Minimap (bottom-right) shows overall structure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDiagram;
