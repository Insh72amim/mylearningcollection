import React from 'react';
import { Handle, Position } from 'reactflow';
import useKafkaStore from '../../../stores/kafkaStore';

const BrokerNode = ({ data }) => {
  const { messages } = useKafkaStore();
  
  // Filter messages for this broker (mock logic: broker-1 gets partition 0, broker-2 gets partition 1, etc.)
  // In a real app, we'd pass the partition IDs this broker owns in 'data'.
  // Let's assume data.id is 'broker-1', 'broker-2', etc.
  const brokerIndex = parseInt(data.id.split('-')[1]) - 1; 
  
  // Get messages for partition matching this broker index (simplified 1-to-1 mapping for now)
  const partitionMessages = messages.filter(m => m.partition === brokerIndex);

  return (
    <div className="bg-gray-800 border-2 border-gray-600 rounded-lg min-w-[200px] shadow-xl">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
      
      <div className="bg-gray-700 px-4 py-2 border-b border-gray-600 rounded-t-lg flex justify-between items-center">
        <span className="font-bold text-white">{data.label}</span>
        <span className="text-xs text-gray-400">ID: {data.id}</span>
      </div>
      
      <div className="p-4 space-y-3">
        {/* Partition Visualization */}
        <div className="bg-gray-900 rounded border border-gray-700 p-2">
          <div className="text-xs text-gray-400 mb-2 flex justify-between">
            <span>Partition {brokerIndex}</span>
            <span>{partitionMessages.length} msgs</span>
          </div>
          
          {/* The Log */}
          <div className="flex gap-1 overflow-x-auto pb-1 h-12 items-center">
            {partitionMessages.length === 0 && (
              <span className="text-xs text-gray-600 italic w-full text-center">Empty Log</span>
            )}
            {partitionMessages.map((msg) => (
              <div 
                key={msg.id}
                className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-xs text-white font-bold border border-blue-400"
                title={`Offset: ${msg.offset}\nContent: ${msg.content}`}
              >
                {msg.offset}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-green-500" />
    </div>
  );
};

export default BrokerNode;
