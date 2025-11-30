import React, { useState } from 'react';
import KafkaArchitecture from '../components/kafka/KafkaArchitecture';
import KafkaDocs from '../components/kafka/KafkaDocs';
import useKafkaStore from '../stores/kafkaStore';
import { Play, BookOpen } from 'lucide-react';

const Kafka = () => {
  const { produceMessage, messages } = useKafkaStore();
  const [activeTab, setActiveTab] = useState('playground');

  return (
    <div className="flex flex-col h-full">
      {/* Header & Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              Apache Kafka
              <span className="text-xs bg-blue-900 text-blue-300 px-2 py-0.5 rounded border border-blue-700">Module 1</span>
            </h1>
          </div>
          <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'playground' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Play size={16} />
              Interactive Playground
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'docs' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <BookOpen size={16} />
              Deep Dive & Docs
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden bg-gray-900">
        {activeTab === 'playground' ? (
          <div className="h-full flex flex-col p-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-400">Visualize data flowing from Producers to Consumers.</p>
              <button 
                onClick={() => produceMessage('user-events', 'Hello Kafka!')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Play size={16} />
                Produce Message
              </button>
            </div>

            <div className="flex-1 flex gap-6 min-h-0">
              <div className="flex-1 border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                <KafkaArchitecture />
              </div>
              
              <div className="w-80 bg-gray-800 rounded-lg border border-gray-700 flex flex-col">
                <div className="p-4 border-b border-gray-700 bg-gray-800">
                  <h3 className="font-semibold text-white">Live Message Log</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {messages.length === 0 && <p className="text-gray-500 text-sm text-center py-4">No messages yet.</p>}
                  {messages.map((msg) => (
                    <div key={msg.id} className="bg-gray-700 p-3 rounded border border-gray-600 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span className="bg-gray-800 px-1 rounded">P{msg.partition}</span>
                        <span>Offset: {msg.offset}</span>
                      </div>
                      <div className="text-white text-sm font-mono">{msg.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-8">
            <KafkaDocs />
          </div>
        )}
      </div>
    </div>
  );
};

export default Kafka;
