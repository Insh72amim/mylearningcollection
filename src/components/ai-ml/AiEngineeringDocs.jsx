import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Brain,
  Cpu,
  Zap,
  Layers,
  Database,
  Search,
  Workflow,
  Plus
} from "lucide-react";
import CodeBlock from "../common/CodeBlock";
import MathBlock from "../common/MathBlock";
import { aiEngineeringData } from "../../data/aiEngineeringData";

const AiEngineeringDocs = ({ section, onBack }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const sections = aiEngineeringData.getAllSections();

  useEffect(() => {
    if (sections.length > 0) {
      if (sections.find(s => s.id === section)) {
        setSelectedTopic(section);
      } else {
        setSelectedTopic(sections[0].id);
      }
    }
  }, [section]);

  if (!sections || sections.length === 0) {
    return <div className="p-8 text-gray-300">Data not available</div>;
  }

  const currentTopic = sections.find((t) => t.id === selectedTopic);

  const parseInline = (text) => {
    const mathSplit = text.split(/(\$[^$]+\$)/g);
    return mathSplit.map((part, i) => {
      if (part.startsWith("$") && part.endsWith("$")) {
        return <MathBlock key={i} math={part.slice(1, -1)} inline />;
      }
      const boldSplit = part.split(/(\*\*[^*]+\*\*)/g);
      return boldSplit.map((subPart, j) => {
        if (subPart.startsWith("**") && subPart.endsWith("**")) {
          return <strong key={`${i}-${j}`} className="text-white font-bold">{subPart.slice(2, -2)}</strong>;
        }
        return subPart;
      });
    });
  };

  const renderContent = (content) => {
    if (!content) return null;
    const parts = content.split(/```(\w+)?\n([\s\S]*?)```/);
    const elements = [];
    for (let i = 0; i < parts.length; i++) {
      if (i % 3 === 0) {
        const text = parts[i].trim();
        if (text) {
          elements.push(
            <div key={i} className="prose prose-invert max-w-none mb-4">
              {text.split("\n").map((line, idx) => {
                if (line.startsWith("# ")) return <h1 key={idx} className="text-3xl font-bold text-white mb-6 uppercase tracking-tight">{line.replace("# ", "")}</h1>;
                if (line.startsWith("### ")) return <h3 key={idx} className="text-xl font-bold text-blue-400 mt-8 mb-4 border-l-4 border-blue-500 pl-4">{parseInline(line.replace("### ", ""))}</h3>;
                if (line.startsWith("- ")) return (
                  <div key={idx} className="flex items-start gap-2 ml-4 mb-2">
                    <span className="text-blue-500 mt-1.5">•</span>
                    <span className="text-gray-300">{parseInline(line.replace("- ", ""))}</span>
                  </div>
                );
                if (line.trim()) return <p key={idx} className="text-gray-300 mb-4 leading-relaxed">{parseInline(line)}</p>;
                return null;
              })}
            </div>
          );
        }
      } else if (i % 3 === 1) {
        const type = parts[i] || "text";
        const code = parts[i + 1];
        elements.push(
          <div key={i} className="my-6 shadow-2xl rounded-lg overflow-hidden border border-gray-800">
             <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 flex justify-between items-center">
                <span>{type.toUpperCase()}</span>
             </div>
            <CodeBlock language={type} code={code} />
          </div>
        );
      }
    }
    return elements;
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-gray-100 pb-20">
      <div className="flex flex-col border-b border-gray-800 bg-gray-900/95 backdrop-blur-md sticky top-0 z-10 shadow-lg">
        <div className="p-4 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition-all text-gray-400 hover:text-white hover:scale-110">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Brain className="text-blue-500" />
            AI Engineering
          </h1>
        </div>

        <div className="px-4 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {sections.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                selectedTopic === topic.id
                  ? "border-blue-500 text-blue-400 bg-blue-500/10"
                  : "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                 {topic.id === 'llm-engineering' && <Cpu size={14} />}
                 {topic.id === 'rag-pipeline' && <Search size={14} />}
                 {topic.id === 'vector-databases' && <Database size={14} />}
                 {topic.id === 'agentic-frameworks' && <Workflow size={14} />}
                 {topic.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          {currentTopic && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Special Visualization for RAG */}
              {selectedTopic === 'rag-pipeline' && (
                <div className="mb-12 p-8 bg-gradient-to-br from-blue-900/20 to-gray-800 rounded-2xl border border-blue-500/30">
                  <h4 className="text-blue-400 font-bold mb-6 flex items-center gap-2">
                    <Zap size={18} /> RAG Visualizer (Interactive)
                  </h4>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="p-4 bg-gray-800 rounded-xl border border-gray-700 w-full text-center">
                      <Database className="mx-auto mb-2 text-blue-500" />
                      <span className="text-xs uppercase tracking-widest text-gray-400">Knowledge Base</span>
                    </div>
                    <div className="text-blue-500 hidden md:block">→</div>
                    <div className="p-4 bg-gray-800 rounded-xl border border-gray-700 w-full text-center border-dashed">
                      <Search className="mx-auto mb-2 text-blue-500" />
                      <span className="text-xs uppercase tracking-widest text-gray-400">Retriever</span>
                    </div>
                    <div className="text-blue-500 hidden md:block">→</div>
                    <div className="p-4 bg-blue-500/20 rounded-xl border border-blue-500/50 w-full text-center">
                      <Plus className="mx-auto mb-2 text-white" />
                      <span className="text-xs uppercase tracking-widest text-white">Augmented LLM</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-400 text-center italic"> Interactive pipeline implementation coming in next phase.</p>
                </div>
              )}
              {renderContent(currentTopic.content)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiEngineeringDocs;
