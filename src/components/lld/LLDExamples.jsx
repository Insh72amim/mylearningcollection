import React, { useState } from "react";
import {
  Layers,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  Code,
  Box,
  GitBranch,
  Scale,
  Lightbulb,
  FileCode,
} from "lucide-react";
import { lldExamplesDetailed } from "../../data/lldExamplesDetailed";
import CodeBlock from "../common/CodeBlock";

const LLDExamples = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState({});

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const setTab = (exampleId, tabName) => {
    setActiveTab({ ...activeTab, [exampleId]: tabName });
  };

  const getActiveTab = (exampleId) => {
    return activeTab[exampleId] || "overview";
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-900/30 text-green-400 border-green-700";
      case "Medium":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700";
      case "Hard":
        return "bg-red-900/30 text-red-400 border-red-700";
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-700";
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-gray-700 pb-6">
          <h1 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
            <Layers className="w-10 h-10 text-orange-500" />
            Low Level Design Examples
          </h1>
          <p className="text-lg text-gray-400">
            Comprehensive object-oriented design problems with Java
            implementations, design patterns, and interview tips.
          </p>
        </div>

        {/* Examples List */}
        <div className="space-y-6">
          {lldExamplesDetailed.map((example) => (
            <div
              key={example.id}
              className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-200 hover:border-gray-600"
            >
              {/* Header */}
              <button
                onClick={() => toggleExpand(example.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-800/50"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                    px-4 py-2 rounded-lg flex items-center justify-center font-bold text-sm border
                    ${getDifficultyColor(example.difficulty)}
                  `}
                  >
                    {example.difficulty}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      {example.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {example.description}
                    </p>
                  </div>
                </div>
                {expandedId === example.id ? (
                  <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {/* Expanded Content */}
              {expandedId === example.id && (
                <div className="border-t border-gray-700">
                  {/* Tabs */}
                  <div className="flex items-center gap-2 px-6 py-3 bg-gray-900/50 border-b border-gray-700 overflow-x-auto">
                    {[
                      "overview",
                      "patterns",
                      "classes",
                      "tradeoffs",
                      "tips",
                    ].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setTab(example.id, tab)}
                        className={`
                          px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                          ${
                            getActiveTab(example.id) === tab
                              ? "bg-orange-500 text-white"
                              : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                          }
                        `}
                      >
                        {tab === "overview" && "📋 Overview"}
                        {tab === "patterns" && "🎨 Design Patterns"}
                        {tab === "classes" && "💻 Classes"}
                        {tab === "tradeoffs" && "⚖️ Tradeoffs"}
                        {tab === "tips" && "💡 Interview Tips"}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="p-6">
                    {/* Overview Tab */}
                    {getActiveTab(example.id) === "overview" && (
                      <div className="space-y-6">
                        {/* Requirements */}
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            Requirements
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {example.requirements.map((req, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-3 text-gray-300 text-sm bg-gray-900/50 p-3 rounded-lg"
                              >
                                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Class Relationships */}
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <GitBranch className="w-5 h-5 text-blue-500" />
                            Class Relationships
                          </h4>
                          <div className="bg-gray-900/50 rounded-lg p-4 space-y-2">
                            {example.classRelationships.map((rel, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-gray-300 text-sm font-mono"
                              >
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                {rel}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Class Diagram */}
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <Box className="w-5 h-5 text-purple-500" />
                            Class Diagram
                          </h4>
                          <div className="bg-gray-950 rounded-lg p-6 overflow-x-auto">
                            <pre className="text-gray-300 text-sm font-mono whitespace-pre">
                              {example.classDiagram}
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Design Patterns Tab */}
                    {getActiveTab(example.id) === "patterns" && (
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <Box className="w-5 h-5 text-purple-500" />
                          Design Patterns Used
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {example.designPatterns.map((pattern, idx) => (
                            <div
                              key={idx}
                              className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-700/30 rounded-lg p-5"
                            >
                              <h5 className="text-lg font-bold text-purple-300 mb-2 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                  {idx + 1}
                                </div>
                                {pattern.name}
                              </h5>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                <span className="font-semibold text-purple-400">
                                  Usage:
                                </span>{" "}
                                {pattern.usage}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Classes Tab */}
                    {getActiveTab(example.id) === "classes" && (
                      <div className="space-y-6">
                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <FileCode className="w-5 h-5 text-blue-500" />
                          Class Implementations (Java)
                        </h4>
                        {example.classes.map((cls, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-900/50 rounded-lg overflow-hidden border border-gray-700"
                          >
                            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 px-5 py-3 border-b border-gray-700">
                              <h5 className="text-lg font-bold text-white">
                                {cls.name}
                              </h5>
                              <p className="text-sm text-gray-400 mt-1">
                                {cls.description}
                              </p>
                            </div>
                            <div className="p-4">
                              <CodeBlock language="java" code={cls.code} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tradeoffs Tab */}
                    {getActiveTab(example.id) === "tradeoffs" && (
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <Scale className="w-5 h-5 text-yellow-500" />
                          Design Tradeoffs
                        </h4>
                        <div className="space-y-4">
                          {example.tradeoffs.map((tradeoff, idx) => (
                            <div
                              key={idx}
                              className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border border-yellow-700/30 rounded-lg p-5"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                                  <Scale className="w-5 h-5 text-yellow-400" />
                                </div>
                                <div className="flex-1">
                                  <h5 className="text-lg font-bold text-yellow-300 mb-2">
                                    {tradeoff.aspect}
                                  </h5>
                                  <div className="space-y-2">
                                    <p className="text-sm text-gray-300">
                                      <span className="font-semibold text-yellow-400">
                                        Options:
                                      </span>{" "}
                                      {tradeoff.options}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                      <span className="font-semibold text-yellow-400">
                                        Tradeoff:
                                      </span>{" "}
                                      {tradeoff.tradeoff}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interview Tips Tab */}
                    {getActiveTab(example.id) === "tips" && (
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-green-500" />
                          Interview Tips & Best Practices
                        </h4>
                        <div className="space-y-3">
                          {example.interviewTips.map((tip, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-700/30 rounded-lg p-4"
                            >
                              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-green-400 font-bold text-sm">
                                  {idx + 1}
                                </span>
                              </div>
                              <p className="text-gray-300 text-sm leading-relaxed pt-1">
                                {tip}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 bg-blue-900/20 border border-blue-700/30 rounded-lg p-5">
                          <h5 className="text-lg font-bold text-blue-300 mb-3 flex items-center gap-2">
                            <Code className="w-5 h-5" />
                            General Interview Strategy
                          </h5>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>
                                Start with clarifying questions - understand
                                requirements fully before coding
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>
                                Draw class diagrams first - visualize
                                relationships before implementation
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>
                                Identify design patterns - mention which
                                patterns you're using and why
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>
                                Discuss tradeoffs - show you understand
                                different approaches and their implications
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>
                                Consider extensibility - how would you add new
                                features or handle scale
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              <span>
                                Write clean code - follow SOLID principles and
                                maintain consistent naming
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-700/30 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-bold text-orange-300 mb-3 flex items-center gap-2">
            <Layers className="w-5 h-5" />
            About These Examples
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            These LLD examples are designed to be{" "}
            <strong>interview-ready</strong> with comprehensive Java
            implementations. Each example includes complete class hierarchies,
            design pattern applications, detailed tradeoff analysis, and
            practical interview tips. The code follows industry best practices
            including SOLID principles, proper encapsulation, and clear
            documentation. Practice implementing these from scratch to build
            muscle memory for technical interviews.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LLDExamples;
