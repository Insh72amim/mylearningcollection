import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  TrendingUp,
  Info,
  Grid,
} from "lucide-react";
import CodeBlock from "../common/CodeBlock";
import StandardChart from "../common/StandardChart";
import MathBlock from "../common/MathBlock";
import { linearAlgebraChapters } from "../../data/linear-algebra-chapters-data";

const LinearAlgebraBook = ({ onBack }) => {
  const [expandedChapters, setExpandedChapters] = useState({});

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const chapters = linearAlgebraChapters;

  const parseMarkdown = (text) => {
    if (!text) return "";
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  return (
    <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 text-gray-300 space-y-8 pb-16 sm:pb-20">
      {/* Header - Cyan/Blue Theme for Linear Algebra */}
      <div className="border-b border-gray-700 pb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors">
          <ArrowLeft size={20} />
          Back to Mathematics
        </button>

        <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-start">
          <div className="w-full sm:w-24 h-24 sm:h-32 bg-gradient-to-br from-cyan-700 to-blue-900 rounded-lg shadow-xl flex items-center justify-center shrink-0 border border-cyan-600">
            <Grid size={40} className="text-cyan-100" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Linear Algebra
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-4">
              Lipschutz & Lipson • Schaum's Outline
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <span className="px-3 py-1 rounded-full bg-cyan-900/50 text-cyan-300 text-sm border border-cyan-700">
                Vectors
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-sm border border-blue-700">
                Matrices
              </span>
              <span className="px-3 py-1 rounded-full bg-sky-900/50 text-sky-300 text-sm border border-sky-700">
                Spaces
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
              className="w-full px-4 sm:px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-left hover:bg-gray-700/50 transition-colors">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1">
                <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-900/50 text-cyan-400 font-bold text-sm border border-cyan-800 shrink-0">
                  {chapter.id.split("-")[1]}
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-1 hidden sm:block">
                    {chapter.summary}
                  </p>
                </div>
              </div>
              {expandedChapters[chapter.id] ? (
                <ChevronDown className="text-gray-400" />
              ) : (
                <ChevronRight className="text-gray-400" />
              )}
            </button>

            {expandedChapters[chapter.id] && (
              <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-gray-700 bg-gray-800/50">
                {/* Summary */}
                <div className="mb-6 bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                  <h4 className="text-sm font-semibold text-cyan-400 mb-2 uppercase tracking-wider">
                    Chapter Overview
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
                        className="bg-gray-900/50 rounded-lg p-4 sm:p-5 border border-gray-700/50">
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          {section.title}
                        </h4>

                        {/* Text Block */}
                        {section.content && (
                          <p
                            className="text-gray-300 mb-4 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: parseMarkdown(section.content),
                            }}
                          />
                        )}

                        {/* Definitions */}
                        {section.definitions && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {section.definitions.map((def, dIdx) => (
                              <div
                                key={dIdx}
                                className="bg-gray-800/80 p-3 rounded border-l-2 border-cyan-500">
                                <div className="text-cyan-300 font-medium mb-1">
                                  {def.term}
                                </div>
                                <div
                                  className="text-sm text-gray-400"
                                  dangerouslySetInnerHTML={{
                                    __html: parseMarkdown(def.def),
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Inline Math / Equations */}
                        {section.match &&
                          (section.mathBlock ? (
                            <MathBlock math={section.match} block={true} />
                          ) : (
                            <div className="bg-gray-800/50 p-3 rounded mb-4 text-center">
                              <MathBlock math={section.match} block={true} />
                            </div>
                          ))}

                        {/* Bullet Points */}
                        {section.points && (
                          <ul className="space-y-2 mb-4">
                            {section.points.map((point, pIdx) => (
                              <li
                                key={pIdx}
                                className="flex items-start gap-2 text-sm text-gray-300">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-500 shrink-0"></span>
                                <span
                                  dangerouslySetInnerHTML={{
                                    __html: parseMarkdown(point),
                                  }}
                                />
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Standard Chart */}
                        {section.chart && (
                          <div className="my-6">
                            <StandardChart
                              type={section.chart.type}
                              title={section.chart.title}
                              data={section.chart.data}
                              xKey={section.chart.xKey}
                              lines={section.chart.lines}
                            />
                          </div>
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

                {/* Deep Dive */}
                {chapter.deepDive && (
                  <div className="mt-8 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-900/50 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 bg-cyan-900/40 rounded-lg">
                        <Info className="text-cyan-400" size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-cyan-200">
                        Deep Dive: {chapter.deepDive.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {chapter.deepDive.content}
                    </p>
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
                          <span
                            dangerouslySetInnerHTML={{
                              __html: parseMarkdown(point),
                            }}
                          />
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

export default LinearAlgebraBook;
