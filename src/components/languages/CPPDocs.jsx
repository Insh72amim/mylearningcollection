import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Box,
  GitCompare,
  ChevronRight,
  BookOpen,
  Play,
  Copy,
  Check,
  Cpu,
} from "lucide-react";
import { getCppSectionData, getAllCppSections } from "../../data/cppData.js";

const CPPDocs = () => {
  const [selectedSection, setSelectedSection] = useState("syntax");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [copiedCode, setCopiedCode] = useState("");

  const sections = getAllCppSections();

  useEffect(() => {
    // Set first topic of selected section as default
    const sectionData = getCppSectionData(selectedSection);
    if (sectionData && sectionData.topics.length > 0) {
      setSelectedTopic(sectionData.topics[0].id);
    }
  }, [selectedSection]);

  const sectionIcons = {
    syntax: Code,
    oop: Box,
    compare: GitCompare,
    multithreading: Cpu,
  };

  const currentSection = getCppSectionData(selectedSection);
  const currentTopic = currentSection?.topics.find(
    (topic) => topic.id === selectedTopic
  );

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const renderContent = (content) => {
    if (!content) return null;

    // Split content by code blocks
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
                if (line.startsWith("#")) {
                  const level = line.match(/^#+/)[0].length;
                  const text = line.replace(/^#+\s*/, "");
                  const HeadingTag = `h${Math.min(level, 6)}`;
                  return (
                    <HeadingTag
                      key={idx}
                      className={`text-gray-100 font-bold mb-4 ${
                        level === 1
                          ? "text-3xl"
                          : level === 2
                          ? "text-2xl"
                          : level === 3
                          ? "text-xl"
                          : "text-lg"
                      }`}>
                      {text}
                    </HeadingTag>
                  );
                }
                if (line.startsWith("### ")) {
                  return (
                    <h4
                      key={idx}
                      className="text-lg font-semibold text-blue-300 mb-3">
                      {line.replace("### ", "")}
                    </h4>
                  );
                }
                if (line.trim()) {
                  return (
                    <p key={idx} className="text-gray-300 mb-3 leading-relaxed">
                      {line}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          );
        }
      } else if (i % 3 === 2) {
        // Code block - simplified without syntax highlighting for now
        const language = parts[i - 1] || "cpp";
        const code = parts[i];
        elements.push(
          <div
            key={i}
            className="relative mb-6 rounded-xl overflow-hidden border border-gray-700">
            <div className="flex justify-between items-center bg-gray-800 px-4 py-2 border-b border-gray-700">
              <span className="text-sm text-gray-400 font-mono">
                {language}
              </span>
              <button
                onClick={() => copyCode(code)}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                {copiedCode === code ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-900 p-4">
              <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
                {code}
              </pre>
            </div>
          </div>
        );
      }
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            C++ Programming
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master C++ with comprehensive documentation covering syntax,
            object-oriented programming, and comparisons with other languages
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/4">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Sections
              </h3>

              <div className="space-y-3">
                {sections.map((section) => {
                  const IconComponent = sectionIcons[section.id];
                  const isActive = selectedSection === section.id;

                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => setSelectedSection(section.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}>
                      <div className="flex items-center gap-3">
                        <IconComponent
                          className={`w-5 h-5 ${
                            section.color === "blue"
                              ? "text-blue-400"
                              : section.color === "purple"
                              ? "text-purple-400"
                              : section.color === "orange"
                              ? "text-orange-400"
                              : "text-green-400"
                          }`}
                        />
                        <div>
                          <div className="font-semibold">{section.title}</div>
                          <div className="text-sm opacity-75">
                            {section.description}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Topics for selected section */}
              {currentSection && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Topics
                  </h4>
                  <div className="space-y-2">
                    {currentSection.topics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          selectedTopic === topic.id
                            ? "bg-blue-600/50 text-blue-200"
                            : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
                        }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{topic.title}</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-3/4">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <AnimatePresence mode="wait">
                {currentTopic ? (
                  <motion.div
                    key={currentTopic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}>
                    <div className="flex items-center gap-3 mb-6">
                      <Play className="w-6 h-6 text-blue-400" />
                      <h2 className="text-3xl font-bold text-white">
                        {currentTopic.title}
                      </h2>
                    </div>

                    <div className="text-gray-300">
                      {renderContent(currentTopic.content)}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12">
                    <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">
                      Select a topic to get started
                    </h3>
                    <p className="text-gray-500">
                      Choose a section and topic from the sidebar to begin
                      learning
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CPPDocs;
