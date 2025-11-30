import React from 'react';
import { Handle, Position } from 'reactflow';
import useKafkaStore from '../../../stores/kafkaStore';

const ConsumerNode = ({ data }) => {
  const { messages } = useKafkaStore();
  
  // Mock consumer logic: It "reads" all messages. 
  // In reality, it would track its own offset.
  const lastMessage = messages[messages.length - 1];

  return (
    <div className="bg-gray-800 border-2 border-green-500 rounded-lg w-[200px] shadow-xl">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-green-500" />
      
      <div className="bg-green-600 px-4 py-2 rounded-t-lg">
        <span className="font-bold text-white">Consumer Group A</span>
      </div>
      
      <div className="p-4">
        <div className="text-xs text-gray-400 mb-2">Last Processed:</div>
        <div className="bg-gray-900 p-2 rounded border border-gray-700 min-h-[40px] flex items-center justify-center">
          {lastMessage ? (
            <div className="text-center">
              <div className="text-white text-sm font-mono">{lastMessage.content}</div>
              <div className="text-[10px] text-gray-500">Offset: {lastMessage.offset}</div>
            </div>
          ) : (
            <span className="text-gray-600 text-xs italic">Waiting...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumerNode;
