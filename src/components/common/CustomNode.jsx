import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { 
  Database, Server, Globe, Cpu, Layers, Box, 
  Shield, Zap, GitBranch, Lock, FileText, 
  Settings, Cloud, Activity, Terminal
} from 'lucide-react';

const iconMap = {
  database: Database,
  server: Server,
  globe: Globe,
  cpu: Cpu,
  layers: Layers,
  box: Box,
  shield: Shield,
  zap: Zap,
  git: GitBranch,
  lock: Lock,
  file: FileText,
  settings: Settings,
  cloud: Cloud,
  activity: Activity,
  terminal: Terminal
};

const CustomNode = ({ data, isConnectable }) => {
  const Icon = iconMap[data.icon] || Box;
  const gradient = data.gradient || 'from-blue-600 to-blue-800';
  
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500`}></div>
      
      <div className="relative min-w-[180px] bg-gray-900 rounded-xl border border-gray-700 shadow-xl overflow-hidden">
        {/* Header */}
        <div className={`h-2 bg-gradient-to-r ${gradient}`} />
        
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 group-hover:text-white group-hover:border-gray-600 transition-colors`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-100 leading-tight mb-1">
                {data.label}
              </div>
              {data.subLabel && (
                <div className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                  {data.subLabel}
                </div>
              )}
            </div>
          </div>
          
          {data.details && (
            <div className="mt-3 pt-3 border-t border-gray-800">
              <div className="text-[11px] text-gray-400 leading-relaxed">
                {data.details}
              </div>
            </div>
          )}
        </div>

        {/* Handles */}
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          className="w-3 h-3 !bg-gray-600 !border-2 !border-gray-900 hover:!bg-blue-500 transition-colors"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
          className="w-3 h-3 !bg-gray-600 !border-2 !border-gray-900 hover:!bg-blue-500 transition-colors"
        />
        <Handle
          type="target"
          position={Position.Left}
          id="l"
          isConnectable={isConnectable}
          className="w-3 h-3 !bg-gray-600 !border-2 !border-gray-900 hover:!bg-blue-500 transition-colors"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="r"
          isConnectable={isConnectable}
          className="w-3 h-3 !bg-gray-600 !border-2 !border-gray-900 hover:!bg-blue-500 transition-colors"
        />
      </div>
    </div>
  );
};

export default memo(CustomNode);
