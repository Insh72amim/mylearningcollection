import React, { useState } from 'react';
import SQLDocs from '../components/sql/SQLDocs';
import { BookOpen, Database } from 'lucide-react';

const SQL = () => {
  const [activeTab, setActiveTab] = useState('docs');

  return (
    <div className="flex flex-col h-full">
      {/* Header & Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              SQL
              <span className="text-xs bg-purple-900 text-purple-300 px-2 py-0.5 rounded border border-purple-700">Module 3</span>
            </h1>
          </div>
          <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'docs' 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <BookOpen size={16} />
              Deep Dive & Docs
            </button>
            <button
              onClick={() => setActiveTab('playground')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'playground' 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Database size={16} />
              Query Planner (Coming Soon)
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden bg-gray-900">
        {activeTab === 'docs' ? (
          <div className="h-full overflow-y-auto p-8">
            <SQLDocs />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Database size={64} className="mx-auto mb-4 text-gray-600" />
              <h2 className="text-2xl font-bold text-white mb-2">Query Planner Visualizer</h2>
              <p className="text-gray-400">Interactive visualization coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SQL;
