import React, { useState } from 'react';
import { Layers, ChevronRight, ChevronDown, CheckCircle, Code } from 'lucide-react';
import { lldExamples } from '../../data/lldData';
import CodeBlock from '../common/CodeBlock';

const LLDExamples = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-900 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-gray-700 pb-6">
          <h1 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
            <Layers className="w-10 h-10 text-orange-500" />
            Low Level Design Examples
          </h1>
          <p className="text-lg text-gray-400">
            Standard object-oriented design problems and solutions.
          </p>
        </div>

        {/* Examples List */}
        <div className="space-y-4">
          {lldExamples.map((example) => (
            <div 
              key={example.id}
              className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-200 hover:border-gray-600"
            >
              <button
                onClick={() => toggleExpand(example.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-800/50"
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm
                    ${example.difficulty === 'Easy' ? 'bg-green-900/30 text-green-400' : 
                      example.difficulty === 'Medium' ? 'bg-yellow-900/30 text-yellow-400' : 
                      'bg-red-900/30 text-red-400'}
                  `}>
                    {example.difficulty[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{example.title}</h3>
                    <p className="text-sm text-gray-400">{example.description}</p>
                  </div>
                </div>
                {expandedId === example.id ? (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                )}
              </button>

              {expandedId === example.id && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-700 space-y-6">
                  {/* Requirements */}
                  <div>
                    <h4 className="text-md font-semibold text-white mb-3">Requirements</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {example.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Classes */}
                  <div>
                    <h4 className="text-md font-semibold text-white mb-3">Core Classes</h4>
                    <div className="flex flex-wrap gap-2">
                      {example.classes.map((cls, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full bg-gray-700 text-blue-300 text-sm font-mono border border-gray-600">
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Code Snippet */}
                  <div>
                    <h4 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                      <Code className="w-4 h-4" /> Skeleton Code
                    </h4>
                    <CodeBlock language="python" code={example.code} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LLDExamples;
