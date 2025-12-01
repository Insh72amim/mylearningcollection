import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  ArrowLeft,
  TrendingUp,
  Activity,
  GitBranch,
} from "lucide-react";
import CodeBlock from "../common/CodeBlock";
import InteractiveDiagram from "../common/InteractiveDiagram";
import { hullChaptersDetailed } from "../../data/hull-chapters-data";

const HullBook = ({ onBack }) => {
  const [expandedChapters, setExpandedChapters] = useState({});

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  // Use the detailed data
  const chapters = hullChaptersDetailed;

  const renderDiagram = (diagram) => {
    if (diagram.type === "interactive") {
      return (
        <div className="my-6">
          <InteractiveDiagram
            type={diagram.component}
            title={diagram.title}
            description={diagram.description}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-8 pb-20">
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors">
          <ArrowLeft size={20} />
          Back to Finance
        </button>

        <div className="flex items-start gap-6">
          <div className="w-24 h-32 bg-gradient-to-br from-green-700 to-emerald-900 rounded-lg shadow-xl flex items-center justify-center shrink-0 border border-green-600">
            <BookOpen size={40} className="text-green-100" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Options, Futures, and Other Derivatives
            </h1>
            <p className="text-xl text-gray-400 mb-4">
              John C. Hull • 10th Edition
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 rounded-full bg-green-900/50 text-green-300 text-sm border border-green-700">
                Derivatives
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-sm border border-blue-700">
                Risk Management
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 text-sm border border-purple-700">
                Financial Engineering
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">Chapters</h2>
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-200 hover:border-gray-600">
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-900/50 text-green-400 font-bold text-sm border border-green-800">
                  {chapter.id}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {chapter.title}
                  </h3>
                </div>
              </div>
              {expandedChapters[chapter.id] ? (
                <ChevronDown className="text-gray-400" />
              ) : (
                <ChevronRight className="text-gray-400" />
              )}
            </button>

            {expandedChapters[chapter.id] && (
              <div className="px-6 pb-6 pt-2 border-t border-gray-700 bg-gray-800/50">
                {/* Summary */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-green-400 mb-2 uppercase tracking-wider">
                    Summary
                  </h4>
                  <p className="text-gray-300 leading-relaxed italic">
                    {chapter.summary}
                  </p>
                </div>

                {/* Detailed Sections */}
                {chapter.sections && (
                  <div className="space-y-8">
                    {chapter.sections.map((section, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-900/50 rounded-lg p-5 border border-gray-700/50">
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          {section.title}
                        </h4>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {section.content}
                        </p>

                        {/* Bullet Points */}
                        {section.points && (
                          <ul className="space-y-2 mb-4">
                            {section.points.map((point, pIdx) => (
                              <li
                                key={pIdx}
                                className="flex items-start gap-2 text-sm text-gray-400">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-500 shrink-0"></span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Code Example */}
                        {section.example && (
                          <div className="mt-4">
                            <CodeBlock
                              language={section.example.language}
                              code={section.example.code}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Diagrams */}
                {chapter.diagrams && (
                  <div className="mt-8">
                    <h4 className="text-sm font-semibold text-purple-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                      <Activity size={16} />
                      Interactive Diagrams
                    </h4>
                    <div className="space-y-6">
                      {chapter.diagrams.map((diagram, idx) => (
                        <div key={idx}>{renderDiagram(diagram)}</div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Points */}
                {chapter.keyPoints && (
                  <div className="mt-8 bg-blue-900/20 border border-blue-800/50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-blue-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                      <TrendingUp size={16} />
                      Key Takeaways
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {chapter.keyPoints.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-blue-500 shrink-0"></span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HullBook;
