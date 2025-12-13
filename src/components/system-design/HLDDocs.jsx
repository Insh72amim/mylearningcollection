import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, ChevronDown, ChevronRight, Lightbulb, Code, Layers } from 'lucide-react';
import CodeBlock from '../common/CodeBlock';
import { hldTopics } from '../../data/hldData';

const HLDDocs = () => {
  const { technologyId } = useParams();
  const [expandedSections, setExpandedSections] = useState(new Set([0])); // First section open by default

  const topic = hldTopics[technologyId];

  if (!topic) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto mb-4" />
          <p>Topic not found</p>
        </div>
      </div>
    );
  }

  const toggleSection = (index) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const expandAll = () => {
    setExpandedSections(new Set(topic.sections.map((_, idx) => idx)));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-900">
      <div className="max-w-5xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-gray-700 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-indigo-600/20 border border-indigo-500/30">
              <Layers className="text-indigo-400" size={24} />
            </div>
            <h1 className="text-4xl font-bold text-white">{topic.title}</h1>
          </div>
          <p className="text-lg text-gray-400">{topic.description}</p>
        </div>

        {/* Quick Nav */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Sections</h3>
            <div className="flex gap-2">
              <button
                onClick={expandAll}
                className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
              >
                Collapse All
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {topic.sections.map((section, idx) => (
              <button
                key={idx}
                onClick={() => {
                  toggleSection(idx);
                  document.getElementById(`section-${idx}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  expandedSections.has(idx)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-4">
          {topic.sections.map((section, idx) => (
            <div
              key={idx}
              id={`section-${idx}`}
              className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-200 hover:border-gray-600"
            >
              <button
                onClick={() => toggleSection(idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                    {idx + 1}
                  </div>
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                </div>
                {expandedSections.has(idx) ? (
                  <ChevronDown className="text-gray-400" />
                ) : (
                  <ChevronRight className="text-gray-400" />
                )}
              </button>

              {expandedSections.has(idx) && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-700 bg-gray-900/30">
                  {/* Main Content */}
                  <div className="prose prose-invert max-w-none">
                    <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                      {section.content.split('\n').map((line, lineIdx) => {
                        // Helper for inline formatting
                        const renderInline = (text) => {
                          const parts = text.split(/(\*\*.*?\*\*)/g);
                          return parts.map((part, i) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return <strong key={i} className="text-indigo-400 font-semibold">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                          });
                        };

                        // Handle headers (whole line bold)
                        if (line.trim().startsWith('**') && line.trim().endsWith('**') && line.length < 100) {
                          return (
                            <h3 key={lineIdx} className="text-lg font-semibold text-indigo-400 mt-6 mb-3">
                              {line.replace(/\*\*/g, '')}
                            </h3>
                          );
                        }

                        // Handle list items
                        if (line.trim().startsWith('- ')) {
                          return (
                            <div key={lineIdx} className="flex items-start gap-3 ml-4 my-2">
                              <span className="text-indigo-500 mt-1.5 min-w-[6px]">•</span>
                              <span className="text-gray-300 leading-relaxed">{renderInline(line.trim().substring(2))}</span>
                            </div>
                          );
                        }

                        // Regular text with inline formatting
                        if (line.trim()) {
                          return <p key={lineIdx} className="my-3 text-gray-300 leading-relaxed">{renderInline(line)}</p>;
                        }
                        return null;
                      })}
                    </div>
                  </div>

                  {/* Key Points */}
                  {section.keyPoints && (
                    <div className="mt-6 bg-indigo-900/10 border border-indigo-800/30 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold text-indigo-400 mb-3 flex items-center gap-2">
                        <Lightbulb size={16} />
                        Key Takeaways
                      </h4>
                      <ul className="space-y-2">
                        {section.keyPoints.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-gray-300 text-sm">
                            <span className="text-indigo-400 mt-0.5">✓</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Code/Diagram */}
                  {section.code && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider flex items-center gap-2">
                        <Code size={16} className="text-indigo-500" />
                        {section.code.language === 'text' ? 'Diagram' : 'Implementation'}
                      </h4>
                      <CodeBlock
                        language={section.code.language}
                        code={section.code.content}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HLDDocs;
