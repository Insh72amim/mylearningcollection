import React from 'react';

// Registry of all lazily loaded documentation components
// This centralizes the import logic and removes the need for massive switch statements

export const componentRegistry = {
  // Data Engineering
  KafkaDocs: React.lazy(() => import("../components/kafka/KafkaDocs")),
  SparkDocs: React.lazy(() => import("../components/spark/SparkDocs")),
  SQLDocs: React.lazy(() => import("../components/sql/SQLDocs")),
  RedisDocs: React.lazy(() => import("../components/redis/RedisDocs")),
  KubernetesDocs: React.lazy(() => import("../components/kubernetes/KubernetesDocs")),
  AirflowDocs: React.lazy(() => import("../components/airflow/AirflowDocs")),
  FlinkDocs: React.lazy(() => import("../components/flink/FlinkDocs")),
  DbtDocs: React.lazy(() => import("../components/dbt/DbtDocs")),
  ParquetDocs: React.lazy(() => import("../components/parquet/ParquetDocs")),
  AvroDocs: React.lazy(() => import("../components/avro/AvroDocs")),
  ProtobufDocs: React.lazy(() => import("../components/protobuf/ProtobufDocs")),
  IcebergDocs: React.lazy(() => import("../components/iceberg/IcebergDocs")),
  SnowflakeDocs: React.lazy(() => import("../components/snowflake/SnowflakeDocs")),
  
  // Databases
  MongoDBDocs: React.lazy(() => import("../components/mongodb/MongoDBDocs")),
  CassandraDocs: React.lazy(() => import("../components/cassandra/CassandraDocs")),
  DynamoDBDocs: React.lazy(() => import("../components/dynamodb/DynamoDBDocs")),
  ElasticsearchDocs: React.lazy(() => import("../components/elasticsearch/ElasticsearchDocs")),
  Neo4jDocs: React.lazy(() => import("../components/neo4j/Neo4jDocs")),

  // Backend
  NodeJSDocs: React.lazy(() => import("../components/nodejs/NodeJSDocs")),
  FastAPIDocs: React.lazy(() => import("../components/fastapi/FastAPIDocs")),
  SpringBootDocs: React.lazy(() => import("../components/springboot/SpringBootDocs")),
  GraphQLDocs: React.lazy(() => import("../components/graphql/GraphQLDocs")),
  GrpcDocs: React.lazy(() => import("../components/grpc/GrpcDocs")),
  RabbitMQDocs: React.lazy(() => import("../components/rabbitmq/RabbitMQDocs")),
  WebSocketsDocs: React.lazy(() => import("../components/websockets/WebSocketsDocs")),

  // Frontend
  ReactDocs: React.lazy(() => import("../components/frontend/ReactDocs")),
  NextJSDocs: React.lazy(() => import("../components/frontend/NextJSDocs")),
  TailwindDocs: React.lazy(() => import("../components/frontend/TailwindDocs")),
  ReduxDocs: React.lazy(() => import("../components/frontend/ReduxDocs")),

  // DevOps
  DockerDocs: React.lazy(() => import("../components/devops/DockerDocs")),
  HelmDocs: React.lazy(() => import("../components/devops/HelmDocs")),
  TerraformDocs: React.lazy(() => import("../components/devops/TerraformDocs")),

  // Languages
  CPPDocs: React.lazy(() => import("../components/languages/CPPDocs")),

  // Books
  DDIABook: React.lazy(() => import("../components/books/DDIABook")),
  DatabaseInternalsBook: React.lazy(() => import("../components/books/DatabaseInternalsBook")),
  HullBook: React.lazy(() => import("../components/books/HullBook")),
  SecurityAnalysisBook: React.lazy(() => import("../components/books/SecurityAnalysisBook")),
  DeepLearningBook: React.lazy(() => import("../components/books/DeepLearningBook")),
  PatternRecognitionBook: React.lazy(() => import("../components/books/PatternRecognitionBook")),
  ComplexAnalysisBook: React.lazy(() => import("../components/books/ComplexAnalysisBook")),
  LinearAlgebraBook: React.lazy(() => import("../components/books/LinearAlgebraBook")),

  // Common
  CategoryPage: React.lazy(() => import("../components/common/CategoryPage")),

  // LLD / DSA
  DesignPatterns: React.lazy(() => import("../components/lld/DesignPatterns")),
  LLDExamples: React.lazy(() => import("../components/lld/LLDExamples")),
  DynamicProgramming: React.lazy(() => import("../components/dsa/DynamicProgramming")),
  TreeDocs: React.lazy(() => import("../components/dsa/TreeDocs")),
  GraphDocs: React.lazy(() => import("../components/dsa/GraphDocs")),
  ArraysDocs: React.lazy(() => import("../components/dsa/ArraysDocs")),
  StackDocs: React.lazy(() => import("../components/dsa/StackDocs")),
  HeapDocs: React.lazy(() => import("../components/dsa/HeapDocs")),
  QueueDocs: React.lazy(() => import("../components/dsa/QueueDocs")),
  BacktrackingDocs: React.lazy(() => import("../components/dsa/BacktrackingDocs")),
  BinarySearchDocs: React.lazy(() => import("../components/dsa/BinarySearchDocs")),
  StringDocs: React.lazy(() => import("../components/dsa/StringDocs")),
  StandardPatternsDocs: React.lazy(() => import("../components/dsa/StandardPatternsDocs")),
  LeetCodeDocs: React.lazy(() => import("../components/dsa/LeetCodeDocs")),
  
  // System Design
  SystemDesignResources: React.lazy(() => import("../components/system-design/SystemDesignResources")),
  HLDDocs: React.lazy(() => import("../components/system-design/HLDDocs")),

  // Visualizers
  KafkaArchitecture: React.lazy(() => import("../components/kafka/KafkaArchitecture")),
};

export const getComponent = (key) => {
  return componentRegistry[key] || null;
};
