import React from 'react';
import { Zap, Server, Activity, Layers, Database, Shield, GitBranch } from 'lucide-react';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';

const flinkNodes = [
  { id: 'client', position: { x: 50, y: 150 }, data: { label: 'Client / Job Submission' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 150 } },
  { id: 'jm', position: { x: 300, y: 50 }, data: { label: 'JobManager (Master)' }, style: { background: '#be185d', color: 'white', border: '1px solid #db2777', width: 160 } },
  { id: 'rm', position: { x: 550, y: 50 }, data: { label: 'ResourceManager' }, style: { background: '#be185d', color: 'white', border: '1px solid #db2777', width: 140 } },
  { id: 'ds', position: { x: 550, y: 120 }, data: { label: 'Dispatcher' }, style: { background: '#be185d', color: 'white', border: '1px solid #db2777', width: 140 } },
  
  // Task Managers
  { id: 'tm1', position: { x: 250, y: 250 }, data: { label: 'TaskManager 1' }, style: { background: '#c2410c', color: 'white', border: '1px solid #ea580c', width: 180, height: 120 }, type: 'group' },
  { id: 'tm2', position: { x: 500, y: 250 }, data: { label: 'TaskManager 2' }, style: { background: '#c2410c', color: 'white', border: '1px solid #ea580c', width: 180, height: 120 }, type: 'group' },

  // Slots
  { id: 's1', position: { x: 20, y: 40 }, data: { label: 'Slot 1' }, parentNode: 'tm1', extent: 'parent', style: { background: '#7c2d12', color: 'white', width: 60 } },
  { id: 's2', position: { x: 100, y: 40 }, data: { label: 'Slot 2' }, parentNode: 'tm1', extent: 'parent', style: { background: '#7c2d12', color: 'white', width: 60 } },
  { id: 's3', position: { x: 20, y: 40 }, data: { label: 'Slot 1' }, parentNode: 'tm2', extent: 'parent', style: { background: '#7c2d12', color: 'white', width: 60 } },
  { id: 's4', position: { x: 100, y: 40 }, data: { label: 'Slot 2' }, parentNode: 'tm2', extent: 'parent', style: { background: '#7c2d12', color: 'white', width: 60 } },
];

const flinkEdges = [
  { id: 'e1', source: 'client', target: 'jm', animated: true, label: 'Submit Job' },
  { id: 'e2', source: 'jm', target: 'tm1', animated: true },
  { id: 'e3', source: 'jm', target: 'tm2', animated: true },
  { id: 'e4', source: 'jm', target: 'rm', style: { stroke: '#db2777' } },
  { id: 'e5', source: 'jm', target: 'ds', style: { stroke: '#db2777' } },
  { id: 'e6', source: 's1', target: 's3', style: { strokeDasharray: '5,5', stroke: '#fb923c' }, animated: true },
  { id: 'e7', source: 's2', target: 's4', style: { strokeDasharray: '5,5', stroke: '#fb923c' }, animated: true },
];

const FlinkDocs = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
          Apache Flink
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Stateful computations over data streams. True streaming with low latency, high throughput, and exactly-once guarantees.
        </p>
      </div>

      {/* 1. Architecture */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-pink-400 border-b border-gray-700 pb-2">
          <Server className="w-8 h-8" />
          <h2>High-Level Architecture</h2>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <p className="text-gray-300 mb-6 leading-relaxed">
            Flink is a distributed processing engine. It follows a Master-Slave architecture where the JobManager coordinates execution and TaskManagers execute the actual code.
          </p>
          


          <div className="mb-8">
            <InteractiveDiagram 
              initialNodes={flinkNodes} 
              initialEdges={flinkEdges} 
              title="Flink Runtime Architecture" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <h3 className="font-bold text-pink-300 mb-2">JobManager (The Brain)</h3>
              <p className="text-sm text-gray-400">
                Coordinates distributed execution. It schedules tasks, coordinates checkpoints, coordinates recovery on failures, and manages the job graph.
              </p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <h3 className="font-bold text-orange-300 mb-2">TaskManagers (The Workers)</h3>
              <p className="text-sm text-gray-400">
                Execute the tasks of a dataflow. They buffer and exchange data streams. Each TaskManager has a certain number of <strong>Task Slots</strong> (usually equal to CPU cores).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Streaming Concepts */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-blue-400 border-b border-gray-700 pb-2">
          <Zap className="w-8 h-8" />
          <h2>Streaming & Time</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Event Time vs. Processing Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-900/30 p-4 rounded border border-gray-700">
                <strong className="text-blue-300 block mb-1">Event Time</strong>
                <span className="text-sm text-gray-400">Time when the event actually happened (timestamp in the data). Essential for correct results.</span>
              </div>
              <div className="bg-gray-900/30 p-4 rounded border border-gray-700">
                <strong className="text-blue-300 block mb-1">Processing Time</strong>
                <span className="text-sm text-gray-400">Time when the event reaches the Flink machine. Low latency but less accurate.</span>
              </div>
            </div>
            
            <h4 className="font-bold text-white mt-6 mb-2">Watermarks 🌊</h4>
            <p className="text-gray-300 text-sm mb-4">
              How does Flink know when "all" data for 12:00-12:05 has arrived? It doesn't. <strong>Watermarks</strong> are the mechanism to handle late data. A watermark of `T` tells the system: "No more events with timestamp &lt; T will arrive."
            </p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Windowing Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <h4 className="font-bold text-pink-300 mb-1">Tumbling</h4>
                <p className="text-xs text-gray-400">Fixed size, non-overlapping. <br/>(e.g., "Every 5 mins")</p>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <h4 className="font-bold text-pink-300 mb-1">Sliding</h4>
                <p className="text-xs text-gray-400">Fixed size, overlapping. <br/>(e.g., "Every 5 mins, slide by 1 min")</p>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <h4 className="font-bold text-pink-300 mb-1">Session</h4>
                <p className="text-xs text-gray-400">Dynamic size, based on inactivity gaps. <br/>(e.g., "User session")</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Reliability & State */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-green-400 border-b border-gray-700 pb-2">
          <Shield className="w-8 h-8" />
          <h2>Reliability & State Management</h2>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Checkpoints & Savepoints</h3>
          <p className="text-gray-300 mb-6">
            Flink provides <strong>Exactly-Once Semantics (EOS)</strong> using the <strong>Chandy-Lamport algorithm</strong>. It periodically takes consistent snapshots of the distributed state.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <h3 className="font-bold text-green-300 mb-2">Checkpoints</h3>
              <p className="text-sm text-gray-400">
                Automatic, managed by Flink for failure recovery. Lightweight and frequent (e.g., every 10s). If a TaskManager fails, Flink rewinds to the last checkpoint.
              </p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <h3 className="font-bold text-green-300 mb-2">Savepoints</h3>
              <p className="text-sm text-gray-400">
                Manual, triggered by user. Used for version upgrades, scaling, or A/B testing. It's a portable snapshot of the entire job state.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="font-bold text-white mb-2">State Backends</h4>
            <ul className="list-disc ml-4 text-sm text-gray-400 space-y-2">
              <li><strong className="text-white">HashMapStateBackend</strong>: Stores state in Java Heap. Fast, but limited by memory. Good for small state.</li>
              <li><strong className="text-white">EmbeddedRocksDBStateBackend</strong>: Stores state in RocksDB (local disk). Slower serialization, but supports massive state (TB+).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Code Example */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-yellow-400 border-b border-gray-700 pb-2">
          <GitBranch className="w-8 h-8" />
          <h2>Flink SQL & DataStream API</h2>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <p className="text-gray-300 mb-4">
            You can write Flink jobs in Java, Scala, Python, or SQL. SQL is becoming the standard for 80% of use cases.
          </p>
          <CodeBlock 
            language="sql" 
            title="fraud_detection.sql"
            code={`-- Define Source (Kafka)
CREATE TABLE transactions (
    user_id STRING,
    amount DOUBLE,
    ts TIMESTAMP(3),
    WATERMARK FOR ts AS ts - INTERVAL '5' SECOND
) WITH (
    'connector' = 'kafka',
    'topic' = 'transactions',
    'properties.bootstrap.servers' = 'localhost:9092',
    'format' = 'json'
);

-- Define Sink (Postgres)
CREATE TABLE fraud_alerts (
    user_id STRING,
    total_amount DOUBLE,
    window_end TIMESTAMP(3)
) WITH (
    'connector' = 'jdbc',
    'url' = 'jdbc:postgresql://localhost:5432/db',
    'table-name' = 'fraud_alerts'
);

-- Business Logic (Tumbling Window)
INSERT INTO fraud_alerts
SELECT 
    user_id, 
    SUM(amount) as total_amount,
    TUMBLE_END(ts, INTERVAL '1' HOUR) as window_end
FROM transactions
GROUP BY 
    user_id, 
    TUMBLE(ts, INTERVAL '1' HOUR)
HAVING SUM(amount) > 10000;`} 
          />
        </div>
      </section>
    </div>
  );
};

export default FlinkDocs;
