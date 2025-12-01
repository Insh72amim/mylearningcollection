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
const ParquetDocs = React.lazy(() => import("../components/parquet/ParquetDocs"));
const AvroDocs = React.lazy(() => import("../components/avro/AvroDocs"));
const ProtobufDocs = React.lazy(() => import("../components/protobuf/ProtobufDocs"));
const IcebergDocs = React.lazy(() => import("../components/iceberg/IcebergDocs"));
const SnowflakeDocs = React.lazy(() => import("../components/snowflake/SnowflakeDocs"));
const MongoDBDocs = React.lazy(() => import("../components/mongodb/MongoDBDocs"));
const CassandraDocs = React.lazy(() => import("../components/cassandra/CassandraDocs"));
const DynamoDBDocs = React.lazy(() => import("../components/dynamodb/DynamoDBDocs"));
const ElasticsearchDocs = React.lazy(() => import("../components/elasticsearch/ElasticsearchDocs"));
const Neo4jDocs = React.lazy(() => import("../components/neo4j/Neo4jDocs"));
const NodeJSDocs = React.lazy(() => import("../components/nodejs/NodeJSDocs"));
const FastAPIDocs = React.lazy(() => import("../components/fastapi/FastAPIDocs"));
const SpringBootDocs = React.lazy(() => import("../components/springboot/SpringBootDocs"));

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
      case "ParquetDocs":
        return ParquetDocs;
      case "AvroDocs":
        return AvroDocs;
      case "ProtobufDocs":
        return ProtobufDocs;
      case "IcebergDocs":
        return IcebergDocs;
      case "SnowflakeDocs":
        return SnowflakeDocs;
      case "MongoDBDocs":
        return MongoDBDocs;
      case "CassandraDocs":
        return CassandraDocs;
      case "DynamoDBDocs":
        return DynamoDBDocs;
      case "ElasticsearchDocs":
        return ElasticsearchDocs;
      case "Neo4jDocs":
        return Neo4jDocs;
      case "NodeJSDocs":
        return NodeJSDocs;
      case "FastAPIDocs":
        return FastAPIDocs;
      case "SpringBootDocs":
        return SpringBootDocs;
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
    <>
      {/* Header & Tabs */}
      <div className="bg-gradient-to-r from-gray-800/70 to-gray-800/60 border border-gray-700/40 min-h-[48px] md:h-[48px] flex items-center z-10 px-3 sm:px-4 md:pr-6 py-2 md:py-0 rounded-2xl shadow-lg backdrop-blur-md mt-2 mx-2 md:mx-0">
        <div className="flex flex-col gap-3 md:gap-2 md:flex-row md:items-center md:justify-between w-full md:pl-6">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              {tech.name}
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded-md border bg-${tech.category.color}-900/70 text-${tech.category.color}-300 border-${tech.category.color}-700/40 backdrop-blur-sm whitespace-nowrap`}>
                {tech.category.name}
              </span>
            </h1>
          </div>
          {tech.hasVisualizer ? (
            <div className="flex gap-1.5 bg-gray-900/40 rounded-xl p-0.5 border border-gray-700/40 backdrop-blur-sm shadow-inner w-full md:w-auto">
              <button
                onClick={() => setActiveTab("docs")}
                disabled={!tech.hasDoc}
                className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-2.5 py-1.5 md:py-1 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "docs"
                    ? `bg-${tech.category.color}-600/90 text-white shadow-md`
                    : "text-gray-400 hover:text-white hover:bg-gray-800/40"
                } ${!tech.hasDoc ? "opacity-50 cursor-not-allowed" : ""}`}>
                <BookOpen size={12} />
                <span>Docs</span>
              </button>
              <button
                onClick={() => setActiveTab("playground")}
                disabled={!tech.hasVisualizer}
                className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 px-2.5 py-1.5 md:py-1 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "playground"
                    ? `bg-${tech.category.color}-600/90 text-white shadow-md`
                    : "text-gray-400 hover:text-white hover:bg-gray-800/40"
                } ${
                  !tech.hasVisualizer ? "opacity-50 cursor-not-allowed" : ""
                }`}>
                <Code size={12} />
                <span>Visualizer</span>
              </button>
            </div>
          ) : (
            <span className="inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 md:py-1 rounded-lg text-xs font-medium border border-gray-700/40 bg-gray-900/40 text-gray-100 backdrop-blur-sm w-full md:w-auto">
              <BookOpen size={12} />
              <span>Deep Dive & Docs</span>
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-900">
        <Suspense
          fallback={
            <div className="p-6 text-gray-400">Loading content...</div>
          }>
          {activeTab === "docs" ? (
            DocComponent ? (
              <div className="h-full overflow-y-auto px-4 sm:px-8 pt-6 pb-8">
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
            <div className="h-full w-full overflow-auto">
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
    </>
  );
};

export default TechnologyPage;
