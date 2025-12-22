import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  Activity,
  Shield,
  Calculator,
  Sigma,
  ChevronRight,
} from "lucide-react";
import CodeBlock from "../common/CodeBlock";
import InteractiveDiagram from "../common/InteractiveDiagram";
import PayoffDiagram from "./PayoffDiagram";
import MathBlock from "../common/MathBlock";
import { financeData } from "../../data/financeData";

const FinanceDocs = ({ section, onBack }) => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const sectionData = financeData.getSection(section || "financial-products");

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (section && sectionData) {
      if (section === "financial-products") {
        setSelectedTopic(null);
      } else {
        const topicExists = sectionData.topics.find(t => t.id === section);
        if (topicExists) {
          setSelectedTopic(section);
        }
      }
    }
  }, [section, sectionData]);

  useEffect(() => {
    if (!selectedTopic && sectionData && sectionData.topics.length > 0 && section !== "financial-products") {
      setSelectedTopic(sectionData.topics[0].id);
    }
  }, [sectionData, selectedTopic, section]);

  if (!sectionData) {
    return <div className="p-8 text-gray-300">Section not found</div>;
  }

  const currentTopic = sectionData.topics.find((t) => t.id === selectedTopic);

  const renderCatalog = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 max-w-[1920px] mx-auto">
      {sectionData.topics.map((topic) => (
        <button
          key={topic.id}
          onClick={() => setSelectedTopic(topic.id)}
          className="group flex flex-col items-start p-4 bg-[#1a1a1a] border border-gray-800 rounded-xl hover:border-blue-500/50 hover:bg-[#222] transition-all duration-300 text-left h-full min-h-[200px]">
          <div className="p-2 bg-blue-500/10 rounded-lg mb-3 group-hover:bg-blue-500/20 transition-colors">
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-sm font-bold text-white mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
            {topic.title}
          </h3>
          <p className="text-gray-500 text-xs line-clamp-3">
            {topic.content
              .split("\n")
              .find((line) => line.trim() && !line.startsWith("#")) ||
              "Explore this financial product..."}
          </p>
          <div className="mt-auto pt-2 flex items-center text-blue-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Learn more <ChevronRight className="w-3 h-3 ml-1" />
          </div>
        </button>
      ))}
    </div>
  );

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

    // Split content by code blocks and math blocks
    const parts = content.split(/```(\w+)?\n([\s\S]*?)```/);
    const elements = [];

    for (let i = 0; i < parts.length; i++) {
      if (i % 3 === 0) {
        // Regular text/markdown
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
                      className="text-xl font-bold text-blue-400 mt-6 mb-3">
                      {parseInline(line.replace("### ", ""))}
                    </h3>
                  );
                }
                if (line.startsWith("- ")) {
                  return (
                    <div key={idx} className="flex items-start gap-2 ml-4 mb-2">
                      <span className="text-blue-400 mt-1.5">•</span>
                      <span className="text-gray-300 leading-relaxed">
                        {parseInline(line.replace("- ", ""))}
                      </span>
                    </div>
                  );
                }
                if (line.match(/^\d+\. /)) {
                  return (
                    <div key={idx} className="flex items-start gap-2 ml-4 mb-2">
                      <span className="text-blue-400 font-mono mt-0.5">
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
        // Language or type
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

  // Custom renderers for specific sections to include diagrams
  const renderDiagrams = () => {
    if (section === "black-scholes" && currentTopic?.id === "bs-intro") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <PayoffDiagram type="long_call" title="Long Call Payoff" />
          <PayoffDiagram type="short_call" title="Short Call Payoff" />
        </div>
      );
    }
    if (section === "monte-carlo-methods" && currentTopic?.id === "mc-intro") {
      const mcNodes = [
        {
          id: "start",
          position: { x: 250, y: 0 },
          data: { label: "Start Simulation" },
          style: { background: "#10b981", color: "white" },
        },
        {
          id: "gen",
          position: { x: 250, y: 100 },
          data: { label: "Generate Random Path\n(Geometric Brownian Motion)" },
          style: { width: 200 },
        },
        {
          id: "calc",
          position: { x: 250, y: 200 },
          data: { label: "Calculate Payoff at Maturity\nMax(S_T - K, 0)" },
          style: { width: 200 },
        },
        {
          id: "repeat",
          position: { x: 250, y: 300 },
          data: { label: "Repeat N times (e.g., 10,000)" },
          style: { background: "#f59e0b", color: "white" },
        },
        {
          id: "avg",
          position: { x: 250, y: 400 },
          data: { label: "Average Payoffs & Discount" },
          style: { background: "#3b82f6", color: "white" },
        },
      ];

      const mcEdges = [
        { id: "e1", source: "start", target: "gen", animated: true },
        { id: "e2", source: "gen", target: "calc", animated: true },
        { id: "e3", source: "calc", target: "repeat", animated: true },
        { id: "e4", source: "repeat", target: "avg", animated: true },
      ];

      return (
        <div className="h-[500px] bg-gray-900 rounded-xl border border-gray-700 overflow-hidden my-8">
          <InteractiveDiagram nodes={mcNodes} edges={mcEdges} />
        </div>
      );
    }
    return null;
  };

  const getActiveTabStyle = (color) => {
    const styles = {
      green: "bg-green-600 text-white shadow-lg shadow-green-900/20",
      blue: "bg-blue-600 text-white shadow-lg shadow-blue-900/20",
      purple: "bg-purple-600 text-white shadow-lg shadow-purple-900/20",
      red: "bg-red-600 text-white shadow-lg shadow-red-900/20",
      orange: "bg-orange-600 text-white shadow-lg shadow-orange-900/20",
    };
    return styles[color] || styles.blue;
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="flex flex-col border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="p-4 flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-white capitalize flex items-center gap-2">
            {sectionData.title}
          </h1>
        </div>

        {/* Topic Tabs */}
        {sectionData.topics.length > 0 && (
          <div className="px-4 pb-0 flex items-center gap-2 overflow-x-auto scrollbar-hide mask-linear-fade">
            {section === "financial-products" && (
              <button
                onClick={() => setSelectedTopic(null)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                  selectedTopic === null
                    ? "border-blue-500 text-blue-400 bg-blue-500/5"
                    : "border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}>
                All Products
              </button>
            )}
            {sectionData.topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                  selectedTopic === topic.id
                    ? `${
                        sectionData.color === "green"
                          ? "border-green-500 text-green-400"
                          : sectionData.color === "purple"
                          ? "border-purple-500 text-purple-400"
                          : sectionData.color === "red"
                          ? "border-red-500 text-red-400"
                          : sectionData.color === "orange"
                          ? "border-orange-500 text-orange-400"
                          : "border-blue-500 text-blue-400"
                      }`
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
          <div
            className={`mx-auto ${
              !currentTopic && section === "financial-products"
                ? "max-w-7xl"
                : "max-w-4xl"
            }`}>
            {!currentTopic && section === "financial-products"
              ? renderCatalog()
              : currentTopic && (
                  <div className="animate-fadeIn">
                    {renderContent(currentTopic.content)}
                    {renderDiagrams()}
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDocs;
