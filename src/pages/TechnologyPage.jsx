import React, { useEffect, useState, Suspense } from "react";
import { useParams, Navigate } from "react-router-dom";
import { BookOpen, Code, AlertTriangle } from "lucide-react";
import { getTechnologyById } from "../config/technologies";

// Lazy load documentation components
const KafkaDocs = React.lazy(() => import("../components/kafka/KafkaDocs"));
const SparkDocs = React.lazy(() => import("../components/spark/SparkDocs"));
const SQLDocs = React.lazy(() => import("../components/sql/SQLDocs"));
const RedisDocs = React.lazy(() => import("../components/redis/RedisDocs"));
const KubernetesDocs = React.lazy(() =>
  import("../components/kubernetes/KubernetesDocs")
);
const AirflowDocs = React.lazy(() =>
  import("../components/airflow/AirflowDocs")
);
const FlinkDocs = React.lazy(() => import("../components/flink/FlinkDocs"));
const DbtDocs = React.lazy(() => import("../components/dbt/DbtDocs"));

// Lazy load book components
const DDIABook = React.lazy(() => import("../components/books/DDIABook"));
const DatabaseInternalsBook = React.lazy(() =>
  import("../components/books/DatabaseInternalsBook")
);

// Lazy load category page
const CategoryPage = React.lazy(() =>
  import("../components/common/CategoryPage")
);

// Lazy load LLD components
const DesignPatterns = React.lazy(() =>
  import("../components/lld/DesignPatterns")
);
const LLDExamples = React.lazy(() => import("../components/lld/LLDExamples"));
const DynamicProgramming = React.lazy(() =>
  import("../components/dsa/DynamicProgramming")
);
const SystemDesignResources = React.lazy(() =>
  import("../components/system-design/SystemDesignResources")
);

// Lazy load visualizer components
const KafkaArchitecture = React.lazy(() =>
  import("../components/kafka/KafkaArchitecture")
);

const TechnologyPage = () => {
  const { technologyId } = useParams();
  const [activeTab, setActiveTab] = useState("docs");

  const tech = getTechnologyById(technologyId);

  if (!tech) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    if (!tech.hasVisualizer && activeTab !== "docs") {
      setActiveTab("docs");
    }
  }, [tech.hasVisualizer, tech.id, activeTab]);

  // Map component strings to actual lazy components
  const getDocComponent = () => {
    switch (tech.docComponent) {
      case "KafkaDocs":
        return KafkaDocs;
      case "SparkDocs":
        return SparkDocs;
      case "SQLDocs":
        return SQLDocs;
      case "RedisDocs":
        return RedisDocs;
      case "KubernetesDocs":
        return KubernetesDocs;
      case "AirflowDocs":
        return AirflowDocs;
      case "FlinkDocs":
        return FlinkDocs;
      case "DbtDocs":
        return DbtDocs;
      case "DDIABook":
        return DDIABook;
      case "DatabaseInternalsBook":
        return DatabaseInternalsBook;
      case "CategoryPage":
        return CategoryPage;
      case "DesignPatterns":
        return DesignPatterns;
      case "LLDExamples":
        return LLDExamples;
      case "DynamicProgramming":
        return DynamicProgramming;
      case "SystemDesignResources":
        return SystemDesignResources;
      default:
        return null;
    }
  };

  const getVisualizerComponent = () => {
    switch (tech.id) {
      case "kafka":
        return KafkaArchitecture;
      default:
        return null;
    }
  };

  const DocComponent = getDocComponent();
  const VisualizerComponent = getVisualizerComponent();

  return (
    <div className="flex flex-col h-full">
      {/* Header & Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              {tech.name}
              <span
                className={`text-xs px-2 py-0.5 rounded border bg-${tech.category.color}-900 text-${tech.category.color}-300 border-${tech.category.color}-700`}>
                {tech.category.name}
              </span>
            </h1>
          </div>
          {tech.hasVisualizer ? (
            <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-700">
              <button
                onClick={() => setActiveTab("docs")}
                disabled={!tech.hasDoc}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "docs"
                    ? `bg-${tech.category.color}-600 text-white shadow-lg`
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                } ${!tech.hasDoc ? "opacity-50 cursor-not-allowed" : ""}`}>
                <BookOpen size={16} />
                Deep Dive & Docs
              </button>
              <button
                onClick={() => setActiveTab("playground")}
                disabled={!tech.hasVisualizer}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "playground"
                    ? `bg-${tech.category.color}-600 text-white shadow-lg`
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                } ${
                  !tech.hasVisualizer ? "opacity-50 cursor-not-allowed" : ""
                }`}>
                <Code size={16} />
                Interactive Visualizer
              </button>
            </div>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-gray-700 bg-gray-900 text-gray-100">
              <BookOpen size={16} />
              Deep Dive & Docs
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden bg-gray-900 relative">
        <Suspense
          fallback={
            <div className="p-8 text-gray-400">Loading content...</div>
          }>
          {activeTab === "docs" ? (
            DocComponent ? (
              <div className="h-full overflow-y-auto p-8">
                <DocComponent />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <AlertTriangle size={48} className="mx-auto mb-4" />
                  <p>Documentation coming soon...</p>
                </div>
              </div>
            )
          ) : VisualizerComponent ? (
            <div className="h-full w-full">
              <VisualizerComponent />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Code size={64} className="mx-auto mb-4 text-gray-600" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  Visualizer
                </h2>
                <p className="text-gray-400">
                  Interactive visualization coming soon...
                </p>
              </div>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default TechnologyPage;
