import React, { useState } from 'react';
import { Layout, Box, GitMerge, Layers, ArrowRight, Code } from 'lucide-react';
import { designPatterns } from '../../data/lldData';
import CodeBlock from '../common/CodeBlock';
import InteractiveDiagram from '../common/InteractiveDiagram';

const DesignPatterns = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);

  const categories = [
    { id: 'creational', icon: Box, color: 'blue' },
    { id: 'structural', icon: Layers, color: 'purple' },
    { id: 'behavioral', icon: GitMerge, color: 'green' }
  ];

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setSelectedPattern(null);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-gray-700 pb-6">
          <h1 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
            <Layout className="w-10 h-10 text-orange-500" />
            Design Patterns
          </h1>
          <p className="text-lg text-gray-400">
            Reusable solutions to common problems in software design.
          </p>
        </div>

        {/* Category Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const data = designPatterns[cat.id];
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`p-6 rounded-xl border transition-all duration-200 text-left group
                  ${isSelected 
                    ? `bg-${cat.color}-900/20 border-${cat.color}-500 ring-1 ring-${cat.color}-500` 
                    : 'bg-gray-800 border-gray-700 hover:border-gray-600 hover:bg-gray-800/80'
                  }`}
              >
                <div className={`w-12 h-12 rounded-lg bg-${cat.color}-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 text-${cat.color}-400`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{data.title}</h3>
                <p className="text-sm text-gray-400">{data.description}</p>
              </button>
            );
          })}
        </div>

        {/* Patterns List & Detail View */}
        {selectedCategory && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* List */}
            <div className="lg:col-span-1 space-y-3">
              <h3 className="text-lg font-semibold text-white mb-4 px-2">
                {designPatterns[selectedCategory].title}
              </h3>
              {designPatterns[selectedCategory].patterns.map((pattern) => (
                <button
                  key={pattern.id}
                  onClick={() => setSelectedPattern(pattern)}
                  className={`w-full p-4 rounded-lg border text-left flex items-center justify-between transition-all
                    ${selectedPattern?.id === pattern.id
                      ? 'bg-gray-800 border-orange-500 text-white'
                      : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                >
                  <span className="font-medium">{pattern.title}</span>
                  <ArrowRight className={`w-4 h-4 ${selectedPattern?.id === pattern.id ? 'text-orange-500' : 'opacity-0'}`} />
                </button>
              ))}
            </div>

            {/* Detail */}
            <div className="lg:col-span-2">
              {selectedPattern ? (
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{selectedPattern.title}</h2>
                    <p className="text-gray-300">{selectedPattern.description}</p>
                  </div>

                  {selectedPattern.diagram && (
                    <div className="h-64 border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
                      <InteractiveDiagram 
                        initialNodes={selectedPattern.diagram.nodes}
                        initialEdges={selectedPattern.diagram.edges}
                      />
                    </div>
                  )}

                  {selectedPattern.code && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                        <Code className="w-4 h-4" /> Implementation Example
                      </h4>
                      <CodeBlock 
                        language="python" 
                        code={selectedPattern.code} 
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-xl p-12">
                  Select a pattern to view details
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignPatterns;
