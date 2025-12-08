import React, { useEffect, useState, Suspense } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
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
const ParquetDocs = React.lazy(() =>
  import("../components/parquet/ParquetDocs")
);
const AvroDocs = React.lazy(() => import("../components/avro/AvroDocs"));
const ProtobufDocs = React.lazy(() =>
  import("../components/protobuf/ProtobufDocs")
);
const IcebergDocs = React.lazy(() =>
  import("../components/iceberg/IcebergDocs")
);
const SnowflakeDocs = React.lazy(() =>
  import("../components/snowflake/SnowflakeDocs")
);
const MongoDBDocs = React.lazy(() =>
  import("../components/mongodb/MongoDBDocs")
);
const CassandraDocs = React.lazy(() =>
  import("../components/cassandra/CassandraDocs")
);
const DynamoDBDocs = React.lazy(() =>
  import("../components/dynamodb/DynamoDBDocs")
);
const ElasticsearchDocs = React.lazy(() =>
  import("../components/elasticsearch/ElasticsearchDocs")
);
const Neo4jDocs = React.lazy(() => import("../components/neo4j/Neo4jDocs"));
const NodeJSDocs = React.lazy(() => import("../components/nodejs/NodeJSDocs"));
const FastAPIDocs = React.lazy(() =>
  import("../components/fastapi/FastAPIDocs")
);
const SpringBootDocs = React.lazy(() =>
  import("../components/springboot/SpringBootDocs")
);
const GraphQLDocs = React.lazy(() =>
  import("../components/graphql/GraphQLDocs")
);
const GrpcDocs = React.lazy(() => import("../components/grpc/GrpcDocs"));
const RabbitMQDocs = React.lazy(() =>
  import("../components/rabbitmq/RabbitMQDocs")
);
const WebSocketsDocs = React.lazy(() =>
  import("../components/websockets/WebSocketsDocs")
);
const ReactDocs = React.lazy(() => import("../components/frontend/ReactDocs"));
const NextJSDocs = React.lazy(() =>
  import("../components/frontend/NextJSDocs")
);
const TailwindDocs = React.lazy(() =>
  import("../components/frontend/TailwindDocs")
);
const ReduxDocs = React.lazy(() => import("../components/frontend/ReduxDocs"));
const DockerDocs = React.lazy(() => import("../components/devops/DockerDocs"));
const HelmDocs = React.lazy(() => import("../components/devops/HelmDocs"));
const TerraformDocs = React.lazy(() =>
  import("../components/devops/TerraformDocs")
);
const CPPDocs = React.lazy(() => import("../components/languages/CPPDocs"));

// Lazy load book components
const DDIABook = React.lazy(() => import("../components/books/DDIABook"));
const DatabaseInternalsBook = React.lazy(() =>
  import("../components/books/DatabaseInternalsBook")
);
const HullBook = React.lazy(() => import("../components/books/HullBook"));
const SecurityAnalysisBook = React.lazy(() =>
  import("../components/books/SecurityAnalysisBook")
);
const DeepLearningBook = React.lazy(() =>
  import("../components/books/DeepLearningBook")
);
const PatternRecognitionBook = React.lazy(() =>
  import("../components/books/PatternRecognitionBook")
);
const ComplexAnalysisBook = React.lazy(() =>
  import("../components/books/ComplexAnalysisBook")
);
const LinearAlgebraBook = React.lazy(() =>
  import("../components/books/LinearAlgebraBook")
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
const TreeDocs = React.lazy(() =>
  import("../components/dsa/TreeDocs")
);
const GraphDocs = React.lazy(() =>
  import("../components/dsa/GraphDocs")
);
const ArraysDocs = React.lazy(() =>
  import("../components/dsa/ArraysDocs")
);
const StackDocs = React.lazy(() =>
  import("../components/dsa/StackDocs")
);
const HeapDocs = React.lazy(() =>
  import("../components/dsa/HeapDocs")
);
const QueueDocs = React.lazy(() =>
  import("../components/dsa/QueueDocs")
);
const BacktrackingDocs = React.lazy(() =>
  import("../components/dsa/BacktrackingDocs")
);
const BinarySearchDocs = React.lazy(() =>
  import("../components/dsa/BinarySearchDocs")
);
const StringDocs = React.lazy(() =>
  import("../components/dsa/StringDocs")
);
const StandardPatternsDocs = React.lazy(() =>
  import("../components/dsa/StandardPatternsDocs")
);
const LeetCodeDocs = React.lazy(() =>
  import("../components/dsa/LeetCodeDocs")
);
const SystemDesignResources = React.lazy(() =>
  import("../components/system-design/SystemDesignResources")
);
const HLDDocs = React.lazy(() =>
  import("../components/system-design/HLDDocs")
);

// Lazy load visualizer components
const KafkaArchitecture = React.lazy(() =>
  import("../components/kafka/KafkaArchitecture")
);

const TechnologyPage = () => {
  const { technologyId } = useParams();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("docs");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get("tab");
    if (tab === "playground") {
      setActiveTab("playground");
    } else {
      setActiveTab("docs");
    }
  }, [location.search]);

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
      case "GraphQLDocs":
        return GraphQLDocs;
      case "GrpcDocs":
        return GrpcDocs;
      case "RabbitMQDocs":
        return RabbitMQDocs;
      case "WebSocketsDocs":
        return WebSocketsDocs;
      case "ReactDocs":
        return ReactDocs;
      case "NextJSDocs":
        return NextJSDocs;
      case "TailwindDocs":
        return TailwindDocs;
      case "ReduxDocs":
        return ReduxDocs;
      case "DockerDocs":
        return DockerDocs;
      case "HelmDocs":
        return HelmDocs;
      case "TerraformDocs":
        return TerraformDocs;
      case "CPPDocs":
        return CPPDocs;
      case "DDIABook":
        return DDIABook;
      case "DatabaseInternalsBook":
        return DatabaseInternalsBook;
      case "HullBook":
        return HullBook;
      case "SecurityAnalysisBook":
        return SecurityAnalysisBook;
      case "DeepLearningBook":
        return DeepLearningBook;
      case "PatternRecognitionBook":
        return PatternRecognitionBook;
      case "ComplexAnalysisBook":
        return ComplexAnalysisBook;
      case "LinearAlgebraBook":
        return LinearAlgebraBook;
      case "CategoryPage":
        return CategoryPage;
      case "DesignPatterns":
        return DesignPatterns;
      case "LLDExamples":
        return LLDExamples;
      case "DynamicProgramming":
        return DynamicProgramming;
      case "TreeDocs":
        return TreeDocs;
      case "GraphDocs":
        return GraphDocs;
      case "ArraysDocs":
        return ArraysDocs;
      case "StackDocs":
        return StackDocs;
      case "HeapDocs":
        return HeapDocs;
      case "QueueDocs":
        return QueueDocs;
      case "BacktrackingDocs":
        return BacktrackingDocs;
      case "BinarySearchDocs":
        return BinarySearchDocs;
      case "StringDocs":
        return StringDocs;
      case "StandardPatternsDocs":
        return StandardPatternsDocs;
      case "LeetCodeDocs":
        return LeetCodeDocs;
      case "SystemDesignResources":
        return SystemDesignResources;
      case "HLDDocs":
        return HLDDocs;
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
      {/* Enhanced Header & Tabs */}


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
