import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Brain,
  Cpu,
  Zap,
  Layers,
  Settings,
  Image,
} from "lucide-react";
import CodeBlock from "../common/CodeBlock";
import MathBlock from "../common/MathBlock";
import RagPlayground from "./RagPlayground";
import { aiMlData } from "../../data/aiMlData";

const AiMlDocs = ({ section, onBack }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const sectionData = aiMlData.getSection("machine-learning");

  useEffect(() => {
    if (section && sectionData) {
      const topicExists = sectionData.topics.find(t => t.id === section);
      if (topicExists) {
        setSelectedTopic(section);
      }
    }
  }, [section]);

  useEffect(() => {
    if (!selectedTopic && sectionData && sectionData.topics.length > 0) {
      setSelectedTopic(sectionData.topics[0].id);
    }
  }, [sectionData, selectedTopic]);

  if (!sectionData) {
    return <div className="p-8 text-gray-300">Section not found</div>;
  }

  const currentTopic = sectionData.topics.find((t) => t.id === selectedTopic);

  const parseInline = (text) => {
    // Split by math first: $...$
    const mathSplit = text.split(/(\$[^$]+\$)/g);

    return mathSplit.map((part, i) => {
      if (part.startsWith("$") && part.endsWith("$")) {
        return (
          <span key={i} className="mx-1">
            <MathBlock math={part.slice(1, -1)} inline />
          </span>
        );
      }

      // Split by bold: **...**
      const boldSplit = part.split(/(\*\*[^*]+\*\*)/g);
      return boldSplit.map((subPart, j) => {
        if (subPart.startsWith("**") && subPart.endsWith("**")) {
          return (
            <strong key={`${i}-${j}`} className="text-white font-bold">
              {subPart.slice(2, -2)}
            </strong>
          );
        }
        return subPart;
      });
    });
  };

  const renderContent = (content) => {
    if (!content) return null;

    // Split content by code blocks (math or code)
    // Regex matches ```language\ncontent```
    const parts = content.split(/```(\w+)?\n([\s\S]*?)```/);
    const elements = [];

    for (let i = 0; i < parts.length; i++) {
        // Even indices are text/markdown
      if (i % 3 === 0) {
        const text = parts[i].trim();
        if (text) {
          elements.push(
            <div key={i} className="prose prose-invert max-w-none mb-4">
              {text.split("\n").map((line, idx) => {
                if (line.startsWith("# ")) {
                  return (
                    <h1
                      key={idx}
                      className="text-3xl font-bold text-white mb-6">
                      {line.replace("# ", "")}
                    </h1>
                  );
                }
                if (line.startsWith("### ")) {
                  return (
                    <h3
                      key={idx}
                      className="text-xl font-bold text-fuchsia-400 mt-6 mb-3">
                      {parseInline(line.replace("### ", ""))}
                    </h3>
                  );
                }
                if (line.startsWith("#### ")) {
                  return (
                    <h4
                      key={idx}
                      className="text-lg font-bold text-gray-200 mt-4 mb-2">
                       {parseInline(line.replace("#### ", ""))}
                    </h4>
                  );
                }
                if (line.startsWith("- ")) {
                  return (
                    <div key={idx} className="flex items-start gap-2 ml-4 mb-2">
                      <span className="text-fuchsia-400 mt-1.5">•</span>
                      <span className="text-gray-300 leading-relaxed">
                        {parseInline(line.replace("- ", ""))}
                      </span>
                    </div>
                  );
                }
                 if (line.match(/^\d+\. /)) {
                   // Numbered list
                  return (
                    <div key={idx} className="flex items-start gap-2 ml-4 mb-2">
                      <span className="text-fuchsia-400 font-mono mt-0.5">
                        {line.match(/^\d+\./)[0]}
                      </span>
                      <span className="text-gray-300 leading-relaxed">
                        {parseInline(line.replace(/^\d+\. /, ""))}
                      </span>
                    </div>
                  );
                }
                if (line.trim()) {
                  return (
                    <p key={idx} className="text-gray-300 mb-3 leading-relaxed">
                      {parseInline(line)}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          );
        }
      } else if (i % 3 === 1) {
        // Odd index is the language/type captured by group 1
        // The next element (i+1) is the code content captured by group 2
        const type = parts[i] || "text";
        const code = parts[i + 1];

        if (type === "math") {
          elements.push(
            <div key={i} className="my-6">
              <MathBlock math={code} />
            </div>
          );
        } else {
          elements.push(
            <div key={i} className="my-6">
              <CodeBlock language={type} code={code} />
            </div>
          );
        }
      }
    }

    return elements;
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="flex flex-col border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="p-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-white capitalize flex items-center gap-2">
            AI & Machine Learning
          </h1>
        </div>

        {/* Topic Tabs */}
        {sectionData.topics.length > 0 && (
          <div className="px-4 pb-0 flex items-center gap-2 overflow-x-auto scrollbar-hide mask-linear-fade">
            {sectionData.topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                  selectedTopic === topic.id
                    ? "border-fuchsia-500 text-fuchsia-400 bg-fuchsia-500/5"
                    : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700"
                }`}>
                {topic.title}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
             {currentTopic && (
                  <div className="animate-fadeIn">
                    {renderContent(currentTopic.content)}
                    {selectedTopic === "rag-pipeline" && (
                      <div className="mt-12 pt-12 border-t border-gray-800">
                        <h2 className="text-2xl font-bold text-white mb-6">Interactive RAG Pipeline Explorer</h2>
                        <div className="bg-gray-800/30 rounded-2xl border border-gray-700/50 p-1 overflow-hidden">
                          <RagPlayground />
                        </div>
                      </div>
                    )}
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiMlDocs;
