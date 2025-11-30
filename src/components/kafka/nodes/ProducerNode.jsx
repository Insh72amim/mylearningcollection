import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import useKafkaStore from '../../../stores/kafkaStore';

const ProducerNode = ({ data }) => {
  const { produceMessage } = useKafkaStore();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    produceMessage('user-events', input);
    setInput('');
  };

  return (
    <div className="bg-gray-800 border-2 border-blue-500 rounded-lg w-[250px] shadow-xl">
      <div className="bg-blue-600 px-4 py-2 rounded-t-lg">
        <span className="font-bold text-white">Producer App</span>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <label className="text-xs text-gray-400 block mb-1">Message Content</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-gray-900 border border-gray-600 text-white text-sm rounded px-2 py-1 flex-1 focus:outline-none focus:border-blue-500"
              placeholder="Type data..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold transition-colors"
            >
              Send
            </button>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Topic: <span className="text-blue-400">user-events</span>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />
    </div>
  );
};

export default ProducerNode;
