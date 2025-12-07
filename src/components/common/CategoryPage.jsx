import React, { useState, Suspense } from "react";
import { BookOpen, Lightbulb, ExternalLink } from "lucide-react";
import { useParams } from "react-router-dom";
import { categoryData } from "../../data/categoryData";
import { getTechnologyById } from "../../config/technologies";

// Lazy load book components
const HullBook = React.lazy(() => import("../books/HullBook"));
const SecurityAnalysisBook = React.lazy(() =>
  import("../books/SecurityAnalysisBook")
);

// Lazy load topic components
const CppSyntax = React.lazy(() => import("../languages/CppSyntax"));
const CppOOP = React.lazy(() => import("../languages/CppOOP"));
const JavaDocs = React.lazy(() => import("../languages/JavaDocs"));
const PythonDocs = React.lazy(() => import("../languages/PythonDocs"));
const GoDocs = React.lazy(() => import("../languages/GoDocs"));
const JavaScriptDocs = React.lazy(() => import("../languages/JavaScriptDocs"));

const CategoryPage = () => {
  const { technologyId } = useParams();
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const tech = getTechnologyById(technologyId);

  if (!tech || !tech.categoryData) {
    return <div className="p-8 text-gray-300">Category not found</div>;
  }

  const data = categoryData[tech.categoryData];

  if (!data) {
    return <div className="p-8 text-gray-300">Data not available</div>;
  }

  // Render specific book component if selected
  if (selectedBook) {
    return (
      <div className="h-full overflow-y-auto bg-gray-900 p-8">
        <Suspense fallback={<div>Loading book...</div>}>
          {selectedBook === "HullBook" && (
            <HullBook onBack={() => setSelectedBook(null)} />
          )}
          {selectedBook === "SecurityAnalysisBook" && (
            <SecurityAnalysisBook onBack={() => setSelectedBook(null)} />
          )}
        </Suspense>
      </div>
    );
  }

  // Render specific topic component if selected
  if (selectedTopic) {
    return (
      <div className="h-full overflow-y-auto bg-gray-900">
        <Suspense
          fallback={<div className="p-8 text-gray-300">Loading topic...</div>}>
          {selectedTopic === "cpp-syntax" && (
            <CppSyntax onBack={() => setSelectedTopic(null)} />
          )}
          {selectedTopic === "cpp-oop" && (
            <CppOOP onBack={() => setSelectedTopic(null)} />
          )}
          {selectedTopic === "cpp-vs-languages" && (
            <CppOOP onBack={() => setSelectedTopic(null)} section="compare" />
          )}
          {selectedTopic === "cpp-comparison" && (
            <CppOOP onBack={() => setSelectedTopic(null)} section="compare" />
          )}
          {selectedTopic === "cpp-multithreading" && (
            <CppOOP
              onBack={() => setSelectedTopic(null)}
              section="multithreading"
            />
          )}
          {selectedTopic === "cpp-stl" && (
            <CppOOP onBack={() => setSelectedTopic(null)} section="stl" />
          )}
          {selectedTopic === "java-syntax" && (
            <JavaDocs onBack={() => setSelectedTopic(null)} section="syntax" />
          )}
          {selectedTopic === "java-oop" && (
            <JavaDocs onBack={() => setSelectedTopic(null)} section="oop" />
          )}
          {selectedTopic === "java-collections" && (
            <JavaDocs onBack={() => setSelectedTopic(null)} section="collections" />
          )}
          {selectedTopic === "java-multithreading" && (
            <JavaDocs onBack={() => setSelectedTopic(null)} section="multithreading" />
          )}
          {selectedTopic === "python-syntax" && (
            <PythonDocs onBack={() => setSelectedTopic(null)} section="syntax" />
          )}
          {selectedTopic === "python-datastructures" && (
            <PythonDocs onBack={() => setSelectedTopic(null)} section="datastructures" />
          )}
          {selectedTopic === "python-oop" && (
            <PythonDocs onBack={() => setSelectedTopic(null)} section="oop" />
          )}
          {selectedTopic === "python-advanced" && (
            <PythonDocs onBack={() => setSelectedTopic(null)} section="advanced" />
          )}
          {selectedTopic === "go-syntax" && (
            <GoDocs onBack={() => setSelectedTopic(null)} section="syntax" />
          )}
          {selectedTopic === "go-structs" && (
            <GoDocs onBack={() => setSelectedTopic(null)} section="structs" />
          )}
          {selectedTopic === "go-concurrency" && (
            <GoDocs onBack={() => setSelectedTopic(null)} section="concurrency" />
          )}
          {selectedTopic === "go-errorhandling" && (
            <GoDocs onBack={() => setSelectedTopic(null)} section="errorhandling" />
          )}
          {selectedTopic === "javascript-syntax" && (
            <JavaScriptDocs onBack={() => setSelectedTopic(null)} section="syntax" />
          )}
          {selectedTopic === "javascript-functions" && (
            <JavaScriptDocs onBack={() => setSelectedTopic(null)} section="functions" />
          )}
          {selectedTopic === "javascript-async" && (
            <JavaScriptDocs onBack={() => setSelectedTopic(null)} section="async" />
          )}
          {selectedTopic === "javascript-dom" && (
            <JavaScriptDocs onBack={() => setSelectedTopic(null)} section="dom" />
          )}
        </Suspense>
      </div>
    );
  }

  const getColorClasses = (color) => {
    const colors = {
      green: {
        gradient: "from-green-600 to-emerald-600",
        text: "text-green-400",
        bg: "bg-green-600",
        border: "border-green-500",
        hover: "hover:border-green-400",
      },
      indigo: {
        gradient: "from-indigo-600 to-purple-600",
        text: "text-indigo-400",
        bg: "bg-indigo-600",
        border: "border-indigo-500",
        hover: "hover:border-indigo-400",
      },
      fuchsia: {
        gradient: "from-fuchsia-600 to-pink-600",
        text: "text-fuchsia-400",
        bg: "bg-fuchsia-600",
        border: "border-fuchsia-500",
        hover: "hover:border-fuchsia-400",
      },
      cyan: {
        gradient: "from-cyan-600 to-blue-600",
        text: "text-cyan-400",
        bg: "bg-cyan-600",
        border: "border-cyan-500",
        hover: "hover:border-cyan-400",
      },
    };
    return colors[color] || colors.green;
  };

  const colors = getColorClasses(data.color);

  return (
    <div className="h-full overflow-y-auto bg-gray-900">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-gray-700 pb-6">
          <h1 className="text-4xl font-bold text-white mb-3">{data.name}</h1>
          <p className="text-lg text-gray-400">{data.description}</p>
        </div>

        {/* Books Section - Only show if books exist */}
        {data.books && data.books.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${colors.gradient}`}>
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Books</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.books.map((book) => (
                <div
                  key={book.id}
                  className={`bg-gray-800 rounded-xl border ${colors.border} p-6 ${colors.hover} transition-all duration-200`}>
                  <div className="flex items-start gap-4">
                    <div className={`${colors.bg} p-3 rounded-lg shrink-0`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {book.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                        <span>{book.author}</span>
                        <span>•</span>
                        <span>{book.year}</span>
                        {book.edition && (
                          <>
                            <span>•</span>
                            <span>{book.edition}</span>
                          </>
                        )}
                      </div>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {book.description}
                      </p>

                      {/* Topics covered */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">
                          Key Topics:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {book.topics.map((topic, idx) => (
                            <span
                              key={idx}
                              className={`text-xs px-3 py-1 rounded-full bg-gray-700 ${colors.text}`}>
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* View Chapters Button */}
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <button
                          onClick={() =>
                            book.component && setSelectedBook(book.component)
                          }
                          disabled={!book.component}
                          className={`text-sm flex items-center gap-2 font-medium transition-colors
                            ${
                              book.component
                                ? "text-white hover:text-blue-400 cursor-pointer"
                                : "text-gray-500 cursor-not-allowed"
                            }`}>
                          <ExternalLink className="w-4 h-4" />
                          {book.component
                            ? "View Chapters"
                            : "Chapter details coming soon"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Topics Section */}
        <div className="space-y-6 pt-8">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-lg bg-gradient-to-br ${colors.gradient}`}>
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Topics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  // Handle topic selection for programming languages and java
                  if (
                    tech.categoryData === "programming-languages" ||
                    tech.categoryData === "java" ||
                    tech.categoryData === "python" ||
                    tech.categoryData === "go" ||
                    tech.categoryData === "javascript"
                  ) {
                    setSelectedTopic(topic.id);
                  }
                }}
                className={`bg-gray-800 rounded-lg border ${
                  colors.border
                } p-5 ${
                  colors.hover
                } transition-all duration-200 text-left group ${
                  tech.categoryData === "programming-languages" ||
                  tech.categoryData === "java" ||
                  tech.categoryData === "python" ||
                  tech.categoryData === "go" ||
                  tech.categoryData === "javascript"
                    ? "cursor-pointer hover:scale-105"
                    : "cursor-default"
                }`}>
                <div className="flex items-start gap-3">
                  <Lightbulb
                    className={`w-5 h-5 ${colors.text} mt-0.5 shrink-0`}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {topic.description}
                    </p>

                    {/* Interactive indicator for programming languages */}
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <span className="text-xs text-gray-500">
                        {tech.categoryData === "programming-languages" ||
                        tech.categoryData === "java" ||
                        tech.categoryData === "python" ||
                        tech.categoryData === "go" ||
                        tech.categoryData === "javascript"
                          ? "Click to explore →"
                          : "Detailed content coming soon"}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div
          className={`mt-12 p-6 bg-gray-800 rounded-xl border ${colors.border}`}>
          <p className="text-gray-400 text-sm">
            <span className={`font-semibold ${colors.text}`}>Note:</span> This
            is an overview page. Detailed chapter-by-chapter content for books
            and in-depth topic explanations will be added progressively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
