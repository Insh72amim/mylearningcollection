import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, Copy, Check, ArrowLeft, ChevronRight } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getPythonSectionData } from "../../data/pythonData";

const PythonDocs = ({ onBack, section = "syntax" }) => {
  const [copiedCode, setCopiedCode] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);

  const sectionData = getPythonSectionData(section);

  if (!sectionData) {
      return <div className="p-8 text-white">Section data not found for "{section}"</div>;
  }

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  // Helper function to render markdown content
  const renderContent = (content) => {
    // Split content by code blocks (cpp, java, python)
    const codeBlockRegex = /```(cpp|java|python)\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    // Split content into text and code parts
    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: content.slice(lastIndex, match.index),
        });
      }

      // Add code block
      parts.push({
        type: "code",
        language: match[1],
        content: match[2],
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({
        type: "text",
        content: content.slice(lastIndex),
      });
    }

    return parts
      .map((part, index) => {
        if (part.type === "code") {
          return (
            <div
              key={index}
              className="my-8 bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
              <div className="flex justify-between items-center bg-gray-800 px-4 py-3 border-b border-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-400 ml-3 uppercase font-medium">
                    {part.language}
                  </span>
                </div>
                <button
                  onClick={() => copyCode(part.content)}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                  title="Copy code">
                  {copiedCode === part.content ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              <SyntaxHighlighter
                language={part.language}
                style={vscDarkPlus}
                customStyle={{
                  background: "rgb(3, 7, 18)",
                  padding: "1.5rem",
                  fontSize: "0.875rem",
                  margin: 0,
                  borderRadius: 0,
                }}
                wrapLines={true}
                wrapLongLines={true}>
                {part.content}
              </SyntaxHighlighter>
            </div>
          );
        } else {
          // Render text content
          return part.content
            .split("\n")
            .filter((line) => line.trim())
            .map((line, lineIndex) => {
              const key = `${index}-${lineIndex}`;

              if (line.startsWith("### ")) {
                return (
                  <h3
                    key={key}
                    className="text-2xl font-bold text-white mt-8 mb-4">
                    {line.replace("### ", "")}
                  </h3>
                );
              } else if (line.startsWith("## ")) {
                return (
                  <h2
                    key={key}
                    className="text-3xl font-bold text-white mt-10 mb-6">
                    {line.replace("## ", "")}
                  </h2>
                );
              } else if (line.startsWith("# ")) {
                return (
                  <h1
                    key={key}
                    className="text-4xl font-bold text-white mt-12 mb-8">
                    {line.replace("# ", "")}
                  </h1>
                );
              } else if (line.startsWith("- ")) {
                return (
                  <li key={key} className="text-gray-300 mb-2 ml-4">
                    {line.replace("- ", "• ")}
                  </li>
                );
              } else if (line.match(/^\d+\. /)) {
                return (
                  <li key={key} className="text-gray-300 mb-2 ml-4">
                    {line}
                  </li>
                );
              } else {
                // Handle bold text and inline code
                const processedLine = line
                  .replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="text-white font-bold">$1</strong>'
                  )
                  .replace(
                    /`([^`]+)`/g,
                    '<code class="bg-gray-700 text-green-400 px-2 py-1 rounded text-sm">$1</code>'
                  );

                return (
                  <p
                    key={key}
                    className="text-gray-300 mb-4 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: processedLine }}
                  />
                );
              }
            });
        }
      })
      .flat();
  };

  // If a specific topic is selected, show its content
  if (selectedTopic) {
    const topic = sectionData.topics.find((t) => t.id === selectedTopic);

    return (
      <div className="h-full overflow-y-auto bg-gray-900 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => setSelectedTopic(null)}
              className="flex items-center text-yellow-400 hover:text-yellow-300 mb-4 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to {sectionData.title} Topics
            </button>
          </div>

          {/* Topic Content */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h1 className="text-4xl font-bold text-white mb-6">
              {topic.title}
            </h1>

            <div className="space-y-6">{renderContent(topic.content)}</div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main Topics overview
  return (
    <div className="h-full overflow-y-auto bg-gray-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-yellow-400 hover:text-yellow-300 mb-4 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Python Overview
          </button>
        </div>

        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-blue-600 rounded-2xl mb-6">
            <Code className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-blue-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            {sectionData.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {sectionData.description}
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectionData.topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-yellow-500/20"
              onClick={() => setSelectedTopic(topic.id)}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {topic.content
                      .split("\n")[0]
                      .replace(/^#+ /, "")
                      .substring(0, 100)}
                    ...
                  </p>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-yellow-400 transition-colors flex-shrink-0 ml-4" />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                  Click to explore
                </span>
                <div className="w-2 h-2 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PythonDocs;
