import React from 'react';
import { MarkerType } from 'reactflow';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';

const SparkDocs = () => {
  // 1. Spark Architecture
  const archNodes = [
    { id: 'd', position: { x: 250, y: 0 }, data: { label: 'Driver Program (SparkContext)' }, style: { background: '#1e40af', color: 'white', border: '1px solid #3b82f6', width: 200 } },
    { id: 'cm', position: { x: 250, y: 100 }, data: { label: 'Cluster Manager' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 200 } },
    { id: 'e1', position: { x: 50, y: 250 }, data: { label: 'Executor 1' }, style: { background: '#166534', color: 'white', border: '1px solid #22c55e', width: 120 } },
    { id: 'e2', position: { x: 290, y: 250 }, data: { label: 'Executor 2' }, style: { background: '#166534', color: 'white', border: '1px solid #22c55e', width: 120 } },
    { id: 'e3', position: { x: 530, y: 250 }, data: { label: 'Executor 3' }, style: { background: '#166534', color: 'white', border: '1px solid #22c55e', width: 120 } },
  ];
  const archEdges = [
    { id: 'e1-1', source: 'd', target: 'cm', label: 'Submit', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e1-2', source: 'cm', target: 'e1', label: 'Allocate', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e1-3', source: 'cm', target: 'e2', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e1-4', source: 'cm', target: 'e3', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e1-5', source: 'd', target: 'e1', label: 'Tasks', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
    { id: 'e1-6', source: 'd', target: 'e2', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
    { id: 'e1-7', source: 'd', target: 'e3', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed }, type: 'smoothstep' },
  ];

  // 2. Job Execution Flow (Sequence approximated as vertical flow)
  const jobNodes = [
    { id: 'user', position: { x: 150, y: 0 }, data: { label: 'User Code' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 150 } },
    { id: 'dag', position: { x: 150, y: 80 }, data: { label: 'Driver: Build DAG' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 150 } },
    { id: 'opt', position: { x: 150, y: 160 }, data: { label: 'Driver: Optimize' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 150 } },
    { id: 'sched', position: { x: 150, y: 240 }, data: { label: 'Driver: Schedule' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 150 } },
    { id: 'exec', position: { x: 150, y: 320 }, data: { label: 'Executors: Run' }, style: { background: '#166534', color: 'white', border: '1px solid #22c55e', width: 150 } },
    { id: 'res', position: { x: 150, y: 400 }, data: { label: 'Return Results' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 150 } },
  ];
  const jobEdges = [
    { id: 'j1', source: 'user', target: 'dag', label: 'Action', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'j2', source: 'dag', target: 'opt', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'j3', source: 'opt', target: 'sched', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'j4', source: 'sched', target: 'exec', label: 'Tasks', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'j5', source: 'exec', target: 'res', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  // 3. Catalyst Pipeline
  const catNodes = [
    { id: 'sql', position: { x: 0, y: 50 }, data: { label: 'SQL / DataFrame' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 120 } },
    { id: 'lp', position: { x: 150, y: 50 }, data: { label: 'Logical Plan' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 100 } },
    { id: 'olp', position: { x: 280, y: 50 }, data: { label: 'Optimized Plan' }, style: { background: '#7c3aed', color: 'white', border: '1px solid #8b5cf6', width: 120 } },
    { id: 'pp', position: { x: 430, y: 50 }, data: { label: 'Physical Plans' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 120 } },
    { id: 'cg', position: { x: 580, y: 50 }, data: { label: 'Code Gen' }, style: { background: '#ea580c', color: 'white', border: '1px solid #fb923c', width: 100 } },
    { id: 'ex', position: { x: 710, y: 50 }, data: { label: 'Execute' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 100 } },
  ];
  const catEdges = [
    { id: 'c1', source: 'sql', target: 'lp', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'c2', source: 'lp', target: 'olp', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'c3', source: 'olp', target: 'pp', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'c4', source: 'pp', target: 'cg', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'c5', source: 'cg', target: 'ex', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  // 4. Shuffle Internals
  const shufNodes = [
    { id: 's1', position: { x: 0, y: 0 }, data: { label: 'Stage 1' }, style: { background: 'rgba(31, 41, 55, 0.5)', color: 'white', border: '1px dashed #4b5563', width: 150, height: 200, zIndex: -1 } },
    { id: 't1', position: { x: 25, y: 30 }, data: { label: 'Task 1' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 100 } },
    { id: 't2', position: { x: 25, y: 130 }, data: { label: 'Task 2' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 100 } },
    
    { id: 'files', position: { x: 200, y: 0 }, data: { label: 'Shuffle Files (Disk)' }, style: { background: 'rgba(220, 38, 38, 0.1)', color: 'white', border: '1px dashed #ef4444', width: 150, height: 200, zIndex: -1 } },
    { id: 'f1', position: { x: 225, y: 30 }, data: { label: 'File 1' }, style: { background: '#991b1b', color: 'white', border: '1px solid #f87171', width: 100 } },
    { id: 'f2', position: { x: 225, y: 130 }, data: { label: 'File 2' }, style: { background: '#991b1b', color: 'white', border: '1px solid #f87171', width: 100 } },

    { id: 's2', position: { x: 400, y: 0 }, data: { label: 'Stage 2' }, style: { background: 'rgba(31, 41, 55, 0.5)', color: 'white', border: '1px dashed #4b5563', width: 150, height: 200, zIndex: -1 } },
    { id: 't3', position: { x: 425, y: 30 }, data: { label: 'Task 3' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 100 } },
    { id: 't4', position: { x: 425, y: 130 }, data: { label: 'Task 4' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 100 } },
  ];
  const shufEdges = [
    { id: 'sh1', source: 't1', target: 'f1', style: { stroke: '#f87171' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'sh2', source: 't2', target: 'f2', style: { stroke: '#f87171' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'sh3', source: 'f1', target: 't3', style: { stroke: '#f87171' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'sh4', source: 'f2', target: 't3', style: { stroke: '#f87171' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'sh5', source: 'f1', target: 't4', style: { stroke: '#f87171' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'sh6', source: 'f2', target: 't4', style: { stroke: '#f87171' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  // 5. Streaming Concepts
  const streamNodes = [
    { id: 'in', position: { x: 50, y: 50 }, data: { label: 'Input Stream' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 120 } },
    { id: 'tbl', position: { x: 250, y: 50 }, data: { label: 'Unbounded Table' }, style: { background: '#7c3aed', color: 'white', border: '1px solid #8b5cf6', width: 150 } },
    { id: 'res', position: { x: 450, y: 50 }, data: { label: 'Result Table' }, style: { background: '#059669', color: 'white', border: '1px solid #10b981', width: 120 } },
    { id: 'out', position: { x: 650, y: 50 }, data: { label: 'Sink (Kafka/DB)' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 120 } },
  ];
  const streamEdges = [
    { id: 'st1', source: 'in', target: 'tbl', label: 'Append', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'st2', source: 'tbl', target: 'res', label: 'Query', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'st3', source: 'res', target: 'out', label: 'Output', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Apache Spark: The Deep Dive</h1>
        <p className="text-xl text-gray-400">
          A comprehensive guide to Spark's unified analytics engine for large-scale data processing, 
          from RDDs to Structured Streaming.
        </p>
      </div>

      {/* Section 1: Spark Architecture */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">01</span>
          Spark Architecture
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Apache Spark is a <strong>unified analytics engine</strong> for large-scale data processing. 
          It provides high-level APIs in Java, Scala, Python, and R, and an optimized engine for general execution graphs.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Core Components</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">Driver:</span>
                <span>Orchestrates the application. Converts user code into tasks.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">Executors:</span>
                <span>Worker processes that run tasks and store data.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">Cluster Manager:</span>
                <span>Allocates resources (YARN, Mesos, K8s, Standalone).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">SparkContext:</span>
                <span>Entry point for Spark functionality.</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <InteractiveDiagram 
              initialNodes={archNodes} 
              initialEdges={archEdges} 
              title="Spark Architecture" 
            />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Job Execution Flow</h3>
          <InteractiveDiagram 
            initialNodes={jobNodes} 
            initialEdges={jobEdges} 
            title="Job Execution Flow"
            height="500px"
          />
        </div>
      </section>

      {/* Section 2: RDDs & Transformations */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">02</span>
          RDDs & Transformations
        </h2>
        <p className="mb-6">
          <strong>Resilient Distributed Datasets (RDDs)</strong> are the fundamental data structure of Spark. 
          Immutable, partitioned collections that can be operated on in parallel.
        </p>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">Transformations (Lazy)</h3>
              <p className="text-sm text-gray-400 mb-4">
                Create new RDDs. Not executed until an action is called.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <code className="text-blue-400">map()</code>
                  <span>Transform each element</span>
                </li>
                <li className="flex gap-2">
                  <code className="text-blue-400">filter()</code>
                  <span>Keep elements matching condition</span>
                </li>
                <li className="flex gap-2">
                  <code className="text-blue-400">flatMap()</code>
                  <span>Map then flatten</span>
                </li>
                <li className="flex gap-2">
                  <code className="text-blue-400">reduceByKey()</code>
                  <span>Aggregate values by key</span>
                </li>
                <li className="flex gap-2">
                  <code className="text-blue-400">join()</code>
                  <span>Join two RDDs</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">Actions (Eager)</h3>
              <p className="text-sm text-gray-400 mb-4">
                Trigger computation and return results.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <code className="text-green-400">count()</code>
                  <span>Return number of elements</span>
                </li>
                <li className="flex gap-2">
                  <code className="text-green-400">collect()</code>
                  <span>Return all elements to driver</span>
                </li>
                <li className="flex gap-2">
                  <code className="text-green-400">take(n)</code>
                  <span>Return first n elements</span>
                </li>
                <li className="flex gap-2">
                  <code className="text-green-400">reduce()</code>
                  <span>Aggregate using function</span>
                </li>
                <li className="flex gap-2">
                  <code className="text-green-400">saveAsTextFile()</code>
                  <span>Write to storage</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">WordCount: The Classic Example</h3>
            <CodeBlock 
              language="scala" 
              title="WordCount.scala"
              code={`val textFile = sc.textFile("hdfs://path/to/file.txt")

val counts = textFile
  .flatMap(line => line.split(" "))        // Split into words
  .map(word => (word, 1))                  // Create (word, 1) pairs
  .reduceByKey(_ + _)                      // Sum counts per word
  
counts.saveAsTextFile("hdfs://output")     // Triggers execution!`} 
            />
          </div>
        </div>
      </section>

      {/* Section 3: DataFrames & Datasets */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">03</span>
          DataFrames & Datasets
        </h2>
        <p className="mb-6">
          <strong>DataFrames</strong> are distributed collections of data organized into named columns (like SQL tables). 
          <strong>Datasets</strong> add type safety on top of DataFrames.
        </p>

        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Why DataFrames?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-900 p-4 rounded border border-gray-600">
                <strong className="text-blue-400 block mb-2">📊 Schema</strong>
                Structured data with defined columns and types.
              </div>
              <div className="bg-gray-900 p-4 rounded border border-gray-600">
                <strong className="text-blue-400 block mb-2">⚡ Catalyst Optimizer</strong>
                Automatic query optimization before execution.
              </div>
              <div className="bg-gray-900 p-4 rounded border border-gray-600">
                <strong className="text-blue-400 block mb-2">🚀 Tungsten Engine</strong>
                Efficient binary format, code generation, memory management.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">DataFrame Example</h3>
              <CodeBlock 
                language="python" 
                title="dataframe_example.py"
                code={`from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("app").getOrCreate()

# Read JSON
df = spark.read.json("data.json")

# Query
result = df.filter(df['age'] > 21) \\
           .select("name", "age") \\
           .groupBy("age") \\
           .count()

result.show()`} 
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Dataset Example (Scala)</h3>
              <CodeBlock 
                language="scala" 
                title="dataset_example.scala"
                code={`case class Person(name: String, age: Int)

val ds = spark.read.json("data.json")
  .as[Person]  // Type-safe!

// Compile-time type checking
val adults = ds.filter(_.age > 21)
               .map(_.name)
               
adults.show()`} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Spark SQL & Catalyst */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-orange-600 text-sm px-3 py-1 rounded-full">04</span>
          Spark SQL & Catalyst Optimizer
        </h2>
        <p className="mb-6">
          Spark SQL allows you to query data using SQL. The <strong>Catalyst Optimizer</strong> transforms 
          your logical query plan into an optimized physical plan.
        </p>

        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Catalyst Optimization Pipeline</h3>
            <InteractiveDiagram 
              initialNodes={catNodes} 
              initialEdges={catEdges} 
              title="Catalyst Optimization Pipeline" 
            />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-gray-900 p-3 rounded">
                <strong className="text-purple-400 block mb-1">Rule-Based</strong>
                Predicate pushdown, constant folding
              </div>
              <div className="bg-gray-900 p-3 rounded">
                <strong className="text-purple-400 block mb-1">Cost-Based</strong>
                Choose join strategies (broadcast vs shuffle)
              </div>
              <div className="bg-gray-900 p-3 rounded">
                <strong className="text-purple-400 block mb-1">Projection Pruning</strong>
                Read only needed columns
              </div>
              <div className="bg-gray-900 p-3 rounded">
                <strong className="text-purple-400 block mb-1">Join Reordering</strong>
                Optimize join order
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">SQL Example with Optimization</h3>
            <CodeBlock 
              language="sql" 
              title="catalyst_example.sql"
              code={`-- Register DataFrame as temp view
CREATE OR REPLACE TEMP VIEW users AS 
SELECT * FROM parquet.\`/data/users.parquet\`;

-- Complex query
SELECT 
  country, 
  AVG(age) as avg_age,
  COUNT(*) as user_count
FROM users
WHERE age > 18 AND is_active = true
GROUP BY country
HAVING COUNT(*) > 100
ORDER BY avg_age DESC
LIMIT 10;

-- Catalyst will:
-- 1. Push down "age > 18" filter to Parquet reader
-- 2. Prune columns (read only: country, age, is_active)
-- 3. Choose aggregation strategy (hash vs sort)
-- 4. Generate optimized bytecode`} 
            />
          </div>
        </div>
      </section>

      {/* Section 5: Shuffle & Partitioning */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">05</span>
          Shuffle & Partitioning
        </h2>
        <p className="mb-6">
          <strong>Shuffle</strong> is the expensive operation of redistributing data across partitions. 
          Understanding and minimizing shuffles is key to Spark performance.
        </p>

        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">What Triggers a Shuffle?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-yellow-400 mb-2">Wide Transformations</h4>
                <ul className="text-sm space-y-1">
                  <li>• <code className="text-blue-300">groupByKey()</code></li>
                  <li>• <code className="text-blue-300">reduceByKey()</code></li>
                  <li>• <code className="text-blue-300">join()</code>, <code className="text-blue-300">cogroup()</code></li>
                  <li>• <code className="text-blue-300">distinct()</code></li>
                  <li>• <code className="text-blue-300">repartition()</code></li>
                </ul>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">Narrow Transformations (No Shuffle)</h4>
                <ul className="text-sm space-y-1">
                  <li>• <code className="text-blue-300">map()</code>, <code className="text-blue-300">filter()</code></li>
                  <li>• <code className="text-blue-300">flatMap()</code></li>
                  <li>• <code className="text-blue-300">union()</code></li>
                  <li>• <code className="text-blue-300">coalesce()</code> (reduce partitions)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Shuffle Internals</h3>
            <InteractiveDiagram 
              initialNodes={shufNodes} 
              initialEdges={shufEdges} 
              title="Shuffle Internals" 
            />
            <p className="text-sm text-gray-400 mt-4">
              Shuffle writes intermediate data to disk, then subsequent tasks read it over the network. 
              This is <strong>expensive</strong> (disk I/O + network transfer).
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Partitioning Strategies</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left p-3 text-blue-400">Method</th>
                    <th className="text-left p-3 text-blue-400">Use Case</th>
                    <th className="text-left p-3 text-blue-400">Pros/Cons</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="p-3 font-mono">Hash Partitioning</td>
                    <td className="p-3">Default for <code>groupByKey()</code></td>
                    <td className="p-3 text-xs">✓ Even distribution<br/>✗ skew if keys imbalanced</td>
                  </tr>
                  <tr className="bg-gray-900/50">
                    <td className="p-3 font-mono">Range Partitioning</td>
                    <td className="p-3">Sorted data (e.g., time series)</td>
                    <td className="p-3 text-xs">✓ Good for range queries<br/>✗ Requires sampling</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">Custom Partitioner</td>
                    <td className="p-3">Domain-specific logic</td>
                    <td className="p-3 text-xs">✓ Full control<br/>✗ More complex</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Memory Management (Tungsten) */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-sm px-3 py-1 rounded-full">06</span>
          Memory Management & Tungsten
        </h2>
        <p className="mb-6">
          <strong>Tungsten</strong> is Spark's execution engine featuring memory management and binary processing that 
          approaches the performance of hand-written code.
        </p>

        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Memory Layout</h3>
            <div className="bg-gray-900 p-4 rounded mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-32 text-sm font-semibold">Storage (60%)</div>
                  <div className="flex-1 h-8 bg-blue-600 rounded flex items-center px-2 text-xs">
                    Cached RDDs/DataFrames
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 text-sm font-semibold">Execution (40%)</div>
                  <div className="flex-1 h-8 bg-green-600 rounded flex items-center px-2 text-xs">
                    Shuffle buffers, aggregations
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 text-sm font-semibold">Reserved</div>
                  <div className="flex-1 h-8 bg-gray-700 rounded flex items-center px-2 text-xs">
                    Internal metadata
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Configured via <code className="bg-gray-800 px-1">spark.memory.fraction</code> and 
              <code className="bg-gray-800 px-1 ml-1">spark.memory.storageFraction</code>
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Tungsten Optimizations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-5 rounded">
                <h4 className="font-bold text-orange-400 mb-2">Binary Format (Unsafe Row)</h4>
                <p className="text-sm">
                  Instead of JVM objects, Spark uses compact binary format. 
                  Reduces memory footprint and enables cache-friendly access.
                </p>
              </div>
              <div className="bg-gray-900 p-5 rounded">
                <h4 className="font-bold text-orange-400 mb-2">Whole-Stage Code Generation</h4>
                <p className="text-sm">
                  Generates optimized bytecode at runtime. Eliminates virtual function calls and enables CPU pipelining.
                </p>
              </div>
              <div className="bg-gray-900 p-5 rounded md:col-span-2">
                <h4 className="font-bold text-orange-400 mb-2">Off-Heap Memory</h4>
                <p className="text-sm">
                  Store data outside JVM heap to avoid garbage collection overhead. 
                  Enable with <code className="bg-gray-800 px-1">spark.memory.offHeap.enabled=true</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Performance Tuning */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-teal-600 text-sm px-3 py-1 rounded-full">07</span>
          Performance Tuning
        </h2>
        
        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Critical Configuration Parameters</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left p-3 text-blue-400">Parameter</th>
                    <th className="text-left p-3 text-blue-400">Default</th>
                    <th className="text-left p-3 text-blue-400">Recommended</th>
                    <th className="text-left p-3 text-blue-400">Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="p-3 font-mono">spark.executor.memory</td>
                    <td className="p-3">1g</td>
                    <td className="p-3 text-green-400">4-8g</td>
                    <td className="p-3">More memory = fewer spills to disk</td>
                  </tr>
                  <tr className="bg-gray-900/50">
                    <td className="p-3 font-mono">spark.executor.cores</td>
                    <td className="p-3">1</td>
                    <td className="p-3 text-green-400">4-5</td>
                    <td className="p-3">Parallel task execution per executor</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">spark.sql.shuffle.partitions</td>
                    <td className="p-3">200</td>
                    <td className="p-3 text-green-400">2-3x num cores</td>
                    <td className="p-3">Too few = large tasks; too many = overhead</td>
                  </tr>
                  <tr className="bg-gray-900/50">
                    <td className="p-3 font-mono">spark.default.parallelism</td>
                    <td className="p-3">×</td>
                    <td className="p-3 text-green-400">Total executor cores</td>
                    <td className="p-3">RDD parallelism</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 rounded-xl border border-blue-700/50">
              <h3 className="text-xl font-semibold text-white mb-3">⚡ Caching Strategies</h3>
              <CodeBlock 
                language="scala" 
                title="caching.scala"
                code={`// Cache if reused multiple times
val df = spark.read.parquet("data")
df.cache()  // or persist(MEMORY_AND_DISK)

df.filter("age > 21").count()
df.filter("age < 30").count()  // Uses cache!

df.unpersist()  // Free memory`} 
              />
              <p className="text-xs text-gray-400">✓ Use for iterative algorithms (ML)</p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-xl border border-purple-700/50">
              <h3 className="text-xl font-semibold text-white mb-3">🔥 Broadcast Joins</h3>
              <CodeBlock 
                language="scala" 
                title="broadcast.scala"
                code={`import org.apache.spark.sql.functions.broadcast

// Small table (< 10MB)
val smallDF = spark.read.json("small.json")

// Broadcast to all executors (no shuffle!)
val result = largeDF.join(
  broadcast(smallDF), 
  "key"
)`} 
              />
              <p className="text-xs text-gray-400">✓ Avoids expensive shuffle for small tables</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Structured Streaming */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-indigo-600 text-sm px-3 py-1 rounded-full">08</span>
          Structured Streaming
        </h2>
        <p className="mb-6">
          <strong>Structured Streaming</strong> is Spark's scalable and fault-tolerant stream processing engine. 
          It treats streams as unbounded tables.
        </p>

        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Streaming Concepts</h3>
            <InteractiveDiagram 
              initialNodes={streamNodes} 
              initialEdges={streamEdges} 
              title="Structured Streaming" 
            />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-900 p-4 rounded">
                <strong className="text-indigo-400 block mb-1">Micro-Batch</strong>
                Process data in small batches (default)
              </div>
              <div className="bg-gray-900 p-4 rounded">
                <strong className="text-indigo-400 block mb-1">Continuous</strong>
                True streaming (millisecond latency)
              </div>
              <div className="bg-gray-900 p-4 rounded">
                <strong className="text-indigo-400 block mb-1">Checkpoint</strong>
                Fault tolerance via write-ahead log
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Streaming Example: Real-Time Aggregation</h3>
            <CodeBlock 
              language="python" 
              title="structured_streaming.py"
              code={`from pyspark.sql import SparkSession
from pyspark.sql.functions import window, col

spark = SparkSession.builder.appName("streaming").getOrCreate()

# Read from Kafka
df = spark.readStream \\
  .format("kafka") \\
  .option("kafka.bootstrap.servers", "localhost:9092") \\
  .option("subscribe", "events") \\
  .load()

# Parse JSON and aggregate
events = df.selectExpr("CAST(value AS STRING) as json") \\
           .selectExpr("from_json(json, schema) as data") \\
           .select("data.*")

# Tumbling window aggregation (5 minutes)
windowed = events.groupBy(
  window(col("timestamp"), "5 minutes"),
  col("user_id")
).count()

# Write to console (for demo)
query = windowed.writeStream \\
  .outputMode("update") \\
  .format("console") \\
  .option("checkpointLocation", "/tmp/checkpoint") \\
  .start()

query.awaitTermination()`} 
            />
          </div>

          <div className="bg-gradient-to-r from-indigo-900/30 to-blue-900/30 p-6 rounded-xl border border-indigo-700/50">
            <h3 className="text-xl font-semibold text-white mb-3">🌊 Watermarking for Late Data</h3>
            <p className="text-sm mb-3">
              Handle late-arriving events by specifying how long to wait:
            </p>
            <CodeBlock 
              language="python" 
              title="watermark.py"
              code={`# Wait up to 10 minutes for late events
windowed = events \\
  .withWatermark("timestamp", "10 minutes") \\
  .groupBy(window(col("timestamp"), "5 minutes")) \\
  .count()`} 
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default SparkDocs;
