import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  User,
  Calendar,
  AlertCircle,
  Zap,
  Shield,
} from "lucide-react";
import InteractiveDiagram from "../common/InteractiveDiagram";
import CodeBlock from "../common/CodeBlock";
import { chapters6to12 } from "../../data/ddia-chapters-6-12";
import { chapters1to5 } from "../../data/ddia-chapters-1-5";

const DDIABook = () => {
  const [expandedChapters, setExpandedChapters] = useState({});

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

// Hardcoded chapters 1-5 removed in favor of data file import
  const allChapters = [...chapters1to5, ...chapters6to12];

  const parseMarkdown = (text) => {
    if (!text) return "";
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  return (
    <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 text-gray-300 space-y-8 pb-16 sm:pb-20">
      {/* Book Header */}
      <div className="border-b border-gray-700 pb-8">
        <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-start">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 sm:p-8 rounded-xl shadow-2xl self-start">
            <BookOpen className="w-16 h-16 text-white" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Designing Data-Intensive Applications
            </h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-gray-400 text-sm sm:text-base mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Martin Kleppmann</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>2017</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>12 Chapters</span>
              </div>
            </div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              The essential guide to building reliable, scalable, and
              maintainable data systems. This book explores the fundamental
              concepts and trade-offs in modern data architecture, from storage
              engines to distributed systems consensus.
            </p>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">Chapters</h2>
        {allChapters.map((chapter) => (
          <div
            key={chapter.id}
            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-200 hover:border-gray-600">
            {/* Chapter Header */}
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="w-full px-4 sm:px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-left hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white font-bold text-sm">
                  {chapter.id}
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2 sm:line-clamp-1">
                    {chapter.summary}
                  </p>
                </div>
              </div>
              {expandedChapters[chapter.id] ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {/* Chapter Content */}
            {expandedChapters[chapter.id] && (
              <div className="px-4 sm:px-6 pb-6 pt-2 border-t border-gray-700 space-y-6">
                {/* Summary */}
                <div className="bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="text-md font-semibold text-white mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Chapter Overview
                  </h4>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    {chapter.summary}
                  </p>
                  {chapter.detailedContent && (
                    <p className="text-gray-400 text-sm italic mt-2">
                      {chapter.detailedContent}
                    </p>
                  )}
                </div>

                {/* Key Points */}
                <div>
                  <h4 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Key Concepts
                  </h4>
                  <ul className="space-y-2">
                    {chapter.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-300">
                        <span className="text-blue-400 mt-1">•</span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: parseMarkdown(point),
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sections with Examples */}
                {chapter.sections &&
                  chapter.sections.map((section, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-900/50 p-4 sm:p-5 rounded-lg border border-gray-700">
                      <h5 className="text-lg font-semibold text-white mb-3">
                        {section.title}
                      </h5>
                      {section.content && (
                        <p
                          className="text-gray-300 mb-3"
                          dangerouslySetInnerHTML={{
                            __html: parseMarkdown(section.content),
                          }}
                        />
                      )}
                      {section.points && (
                        <ul className="space-y-2 mb-3">
                          {section.points.map((point, pidx) => (
                            <li
                              key={pidx}
                              className="flex gap-2 text-sm text-gray-300">
                              <span className="text-green-400">→</span>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: parseMarkdown(point),
                                }}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.example && (
                        <CodeBlock
                          language={section.example.language}
                          title={section.example.title}
                          code={section.example.code}
                        />
                      )}
                    </div>
                  ))}

                {/* Diagram */}
                {chapter.diagram && (
                  <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-3 sm:p-4 overflow-x-auto">
                    <h4 className="text-md font-semibold text-white mb-3">
                      Architecture Diagram
                    </h4>
                    <InteractiveDiagram
                      initialNodes={chapter.diagram.nodes}
                      initialEdges={chapter.diagram.edges}
                      title={chapter.diagram.title}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-700/50">
        <h3 className="text-xl font-semibold text-white mb-3">
          📚 Why Read This Book?
        </h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex gap-2">
            <span className="text-blue-400">✓</span>
            <span>
              Understand the fundamental principles of distributed data systems
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">✓</span>
            <span>
              Learn about trade-offs between consistency, availability, and
              partition tolerance
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">✓</span>
            <span>
              Build better software by understanding how databases work
              internally
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">✓</span>
            <span>
              Essential reading for backend engineers and data engineers
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DDIABook;
