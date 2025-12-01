import React, { useState } from 'react';
import { Layout, Box, GitMerge, Layers, ArrowRight, Code, BookOpen, CheckCircle, XCircle, Share2, Lightbulb, AlertTriangle } from 'lucide-react';
import { designPatterns } from '../../data/designPatternsData';
import CodeBlock from '../common/CodeBlock';
import InteractiveDiagram from '../common/InteractiveDiagram';

const DesignPatterns = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [activeTab, setActiveTab] = useState('concept');

  const categories = [
    { id: 'creational', icon: Box, color: 'blue' },
    { id: 'structural', icon: Layers, color: 'purple' },
    { id: 'behavioral', icon: GitMerge, color: 'green' }
  ];

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setSelectedPattern(null);
    setActiveTab('concept');
  };

  const handlePatternClick = (pattern) => {
    setSelectedPattern(pattern);
    setActiveTab('concept');
  };

  const renderTabContent = () => {
    if (!selectedPattern) return null;

    switch (activeTab) {
      case 'concept':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="text-orange-400" size={20} /> Problem
              </h3>
              <p className="text-gray-300 leading-relaxed">{selectedPattern.problem}</p>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="text-yellow-400" size={20} /> Solution
              </h3>
              <p className="text-gray-300 leading-relaxed">{selectedPattern.solution}</p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Share2 className="text-blue-400" size={20} /> Real-World Analogy
              </h3>
              <p className="text-gray-300 leading-relaxed">{selectedPattern.realWorldAnalogy}</p>
            </div>
          </div>
        );
      case 'structure':
        return (
          <div className="h-[500px] border border-gray-700 rounded-xl overflow-hidden bg-gray-900 animate-in fade-in duration-300">
            {selectedPattern.structure ? (
              <InteractiveDiagram 
                initialNodes={selectedPattern.structure.nodes}
                initialEdges={selectedPattern.structure.edges}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No diagram available
              </div>
            )}
          </div>
        );
      case 'implementation':
        return (
          <div className="animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Python Implementation</h3>
            </div>
            <CodeBlock 
              language="python" 
              code={selectedPattern.code} 
            />
          </div>
        );
      case 'pros-cons':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                <CheckCircle size={20} /> Pros
              </h3>
              <ul className="space-y-3">
                {selectedPattern.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300 bg-gray-900/30 p-3 rounded-lg border border-green-900/30">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-red-400 flex items-center gap-2">
                <XCircle size={20} /> Cons
              </h3>
              <ul className="space-y-3">
                {selectedPattern.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300 bg-gray-900/30 p-3 rounded-lg border border-red-900/30">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-gray-700 pb-6">
          <h1 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
            <Layout className="w-10 h-10 text-orange-500" />
            Design Patterns
          </h1>
          <p className="text-lg text-gray-400">
            Comprehensive guide to the 23 Gang of Four design patterns.
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
                className={`p-6 rounded-xl border transition-all duration-200 text-left group relative overflow-hidden
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
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-gray-500">
                  <span>{data.patterns.length} Patterns</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Patterns List & Detail View */}
        {selectedCategory && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* List */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-lg font-semibold text-white mb-4 px-2 flex items-center justify-between">
                <span>{designPatterns[selectedCategory].title}</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-400">
                  {designPatterns[selectedCategory].patterns.length}
                </span>
              </h3>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {designPatterns[selectedCategory].patterns.map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => handlePatternClick(pattern)}
                    className={`w-full p-4 rounded-lg border text-left transition-all group
                      ${selectedPattern?.id === pattern.id
                        ? 'bg-gray-800 border-orange-500 text-white shadow-lg shadow-orange-500/10'
                        : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white hover:border-gray-600'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{pattern.title}</span>
                      <ArrowRight className={`w-4 h-4 transition-opacity ${selectedPattern?.id === pattern.id ? 'text-orange-500 opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">{pattern.summary}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Detail */}
            <div className="lg:col-span-9">
              {selectedPattern ? (
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden flex flex-col h-full min-h-[600px]">
                  {/* Detail Header */}
                  <div className="p-6 border-b border-gray-700 bg-gray-900/50">
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedPattern.title}</h2>
                    <p className="text-lg text-gray-400">{selectedPattern.summary}</p>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-gray-700 bg-gray-900/30 px-6">
                    {[
                      { id: 'concept', label: 'Concept', icon: BookOpen },
                      { id: 'structure', label: 'Structure', icon: GitMerge },
                      { id: 'implementation', label: 'Implementation', icon: Code },
                      { id: 'pros-cons', label: 'Pros & Cons', icon: CheckCircle },
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative
                            ${activeTab === tab.id 
                              ? 'text-white' 
                              : 'text-gray-400 hover:text-gray-200'
                            }`}
                        >
                          <Icon size={16} />
                          {tab.label}
                          {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow bg-gray-800">
                    {renderTabContent()}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-800 rounded-xl p-12 bg-gray-800/30">
                  <Layout size={48} className="mb-4 opacity-50" />
                  <p className="text-xl font-medium mb-2">Select a pattern to view details</p>
                  <p className="text-sm">Choose from the list on the left to explore.</p>
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
