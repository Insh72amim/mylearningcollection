import React from 'react';
import { MarkerType } from 'reactflow';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';

const CassandraDocs = () => {
  // Ring Architecture Nodes
  const ringNodes = [
    { id: 'n1', position: { x: 400, y: 50 }, data: { label: 'Node 1 (Token 0)' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', borderRadius: '50%', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' } },
    { id: 'n2', position: { x: 650, y: 150 }, data: { label: 'Node 2 (Token 42)' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', borderRadius: '50%', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' } },
    { id: 'n3', position: { x: 650, y: 400 }, data: { label: 'Node 3 (Token 85)' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', borderRadius: '50%', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' } },
    { id: 'n4', position: { x: 400, y: 500 }, data: { label: 'Node 4 (Token 128)' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', borderRadius: '50%', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' } },
    { id: 'n5', position: { x: 150, y: 400 }, data: { label: 'Node 5 (Token 170)' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', borderRadius: '50%', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' } },
    { id: 'n6', position: { x: 150, y: 150 }, data: { label: 'Node 6 (Token 213)' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', borderRadius: '50%', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' } },
  ];

  const ringEdges = [
    { id: 'e1', source: 'n1', target: 'n2', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#6b7280', strokeWidth: 2 } },
    { id: 'e2', source: 'n2', target: 'n3', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#6b7280', strokeWidth: 2 } },
    { id: 'e3', source: 'n3', target: 'n4', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#6b7280', strokeWidth: 2 } },
    { id: 'e4', source: 'n4', target: 'n5', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#6b7280', strokeWidth: 2 } },
    { id: 'e5', source: 'n5', target: 'n6', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#6b7280', strokeWidth: 2 } },
    { id: 'e6', source: 'n6', target: 'n1', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#6b7280', strokeWidth: 2 } },
  ];

  // SSTable Architecture Nodes
  const sstableNodes = [
    { id: 'write', position: { x: 300, y: 0 }, data: { label: 'Write Request' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 150 } },
    { id: 'memtable', position: { x: 300, y: 100 }, data: { label: 'Memtable (RAM)' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', width: 150 } },
    { id: 'commitlog', position: { x: 50, y: 100 }, data: { label: 'Commit Log (Disk)' }, style: { background: '#f59e0b', color: 'white', border: '1px solid #d97706', width: 150 } },
    
    { id: 'ss1', position: { x: 150, y: 250 }, data: { label: 'SSTable 1' }, style: { background: '#3b82f6', color: 'white', border: '1px solid #2563eb', width: 120 } },
    { id: 'ss2', position: { x: 300, y: 250 }, data: { label: 'SSTable 2' }, style: { background: '#3b82f6', color: 'white', border: '1px solid #2563eb', width: 120 } },
    { id: 'ss3', position: { x: 450, y: 250 }, data: { label: 'SSTable 3' }, style: { background: '#3b82f6', color: 'white', border: '1px solid #2563eb', width: 120 } },
    
    { id: 'compacted', position: { x: 300, y: 400 }, data: { label: 'Compacted SSTable' }, style: { background: '#6366f1', color: 'white', border: '1px solid #4f46e5', width: 180 } },
  ];

  const sstableEdges = [
    { id: 'e1', source: 'write', target: 'memtable', animated: true, style: { stroke: '#10b981' } },
    { id: 'e2', source: 'write', target: 'commitlog', animated: true, style: { stroke: '#f59e0b' } },
    { id: 'e3', source: 'memtable', target: 'ss1', label: 'Flush', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e4', source: 'memtable', target: 'ss2', label: 'Flush', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e5', source: 'memtable', target: 'ss3', label: 'Flush', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e6', source: 'ss1', target: 'compacted', style: { stroke: '#6366f1' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e7', source: 'ss2', target: 'compacted', label: 'Compaction', style: { stroke: '#6366f1' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e8', source: 'ss3', target: 'compacted', style: { stroke: '#6366f1' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Apache Cassandra: The Deep Dive</h1>
        <p className="text-xl text-gray-400">
          A comprehensive guide to the distributed wide-column NoSQL database designed for massive scale and high availability.
        </p>
      </div>

      {/* Section 1: Architecture & Core Concepts */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">01</span>
          Architecture & Core Concepts
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Cassandra is a <strong>masterless, peer-to-peer distributed system</strong> with no single point of failure. Every node is identical and can handle any request.
        </p>
        
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Ring Architecture</h3>
          <InteractiveDiagram 
            initialNodes={ringNodes} 
            initialEdges={ringEdges} 
            title="Cassandra Ring Topology" 
          />
          
          <div className="mt-6 space-y-4">
            <div className="bg-gray-900 p-4 rounded border border-green-900/50">
              <strong className="text-green-400">Consistent Hashing</strong>
              <p className="text-sm mt-2">Data distributed using token ranges. Each node owns a portion of the ring.</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
              <strong className="text-blue-400">Gossip Protocol</strong>
              <p className="text-sm mt-2">Nodes exchange state information every second. Detects failures and maintains cluster topology.</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-purple-900/50">
              <strong className="text-purple-400">No Master Node</strong>
              <p className="text-sm mt-2">All nodes are equal. Any node can coordinate reads/writes. Eliminates single point of failure.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">CAP Theorem: AP (Availability + Partition Tolerance)</h3>
          <CodeBlock language="text" code={`Cassandra prioritizes:
✓ Availability: Always accepts reads/writes (even during network partitions)
✓ Partition Tolerance: Continues operating despite network splits
~ Consistency: Tunable (eventual by default, can be configured for strong)

Tradeoff:
- No strong consistency guarantees by default
- Uses eventual consistency with tunable levels
- Last-write-wins conflict resolution`} />
        </div>
      </section>

      {/* Section 2: Data Model & Storage */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">02</span>
          Data Model & Storage
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Wide-Column Store</h3>
            <CodeBlock language="sql" code={`CREATE TABLE users_by_country (
    country text,           -- Partition key
    user_id uuid,           -- Clustering column
    name text,
    email text,
    signup_date timestamp,
    PRIMARY KEY (country, user_id)
) WITH CLUSTERING ORDER BY (user_id DESC);

-- Storage layout:
-- Partition: country='USA'
--   Row: user_id=uuid1 -> name, email, signup_date
--   Row: user_id=uuid2 -> name, email, signup_date

-- Each partition stored together on disk
-- Clustering columns determine sort order within partition`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Storage Internals: SSTables</h3>
            <InteractiveDiagram 
              initialNodes={sstableNodes} 
              initialEdges={sstableEdges} 
              title="Write Path & Compaction" 
            />
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-yellow-900/50">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Data Modeling Rules</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-yellow-400">1.</span> <strong>Query-First Design</strong>: Model tables around queries, not entities</li>
              <li className="flex gap-2"><span className="text-yellow-400">2.</span> <strong>Denormalize</strong>: Duplicate data across tables (disk is cheap)</li>
              <li className="flex gap-2"><span className="text-yellow-400">3.</span> <strong>One Query Per Table</strong>: Each table optimized for one query pattern</li>
              <li className="flex gap-2"><span className="text-yellow-400">4.</span> <strong>Partition Key</strong>: Choose high-cardinality column to distribute data evenly</li>
              <li className="flex gap-2"><span className="text-yellow-400">5.</span> <strong>Avoid Large Partitions</strong>: Keep partitions under 100MB</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Querying & Indexing */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">03</span>
          Querying & Indexing
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">CQL (Cassandra Query Language)</h3>
            <CodeBlock language="python" code={`from cassandra.cluster import Cluster

cluster = Cluster(['127.0.0.1'])
session = cluster.connect('mykeyspace')

# Insert
session.execute("""
    INSERT INTO users_by_country (country, user_id, name, email)
    VALUES ('USA', uuid(), 'Alice', 'alice@example.com')
""")

# SELECT with partition key (efficient)
rows = session.execute("""
    SELECT * FROM users_by_country
    WHERE country = 'USA'
""")

# SELECT with partition + clustering key
rows = session.execute("""
    SELECT * FROM users_by_country
    WHERE country = 'USA'
      AND user_id > ?
    LIMIT 100
""", [min_uuid])

# ❌ BAD: Query without partition key (full cluster scan)
# rows = session.execute("SELECT * FROM users_by_country WHERE name = 'Alice'")`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Secondary Indexes (Use Sparingly)</h3>
            <CodeBlock language="sql" code={`-- Create secondary index
CREATE INDEX ON users_by_country (email);

-- Now can query by email
SELECT * FROM users_by_country WHERE email = 'alice@example.com';

-- ⚠️ Secondary Index Limitations:
-- 1. Queries all nodes (expensive)
-- 2. Only works on high-cardinality columns
-- 3. Slow for large datasets
-- 4. Better: Create a dedicated table with email as partition key

-- Better approach:
CREATE TABLE users_by_email (
    email text PRIMARY KEY,
    country text,
    user_id uuid,
    name text
);  -- Denormalized, but fast!`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Materialized Views</h3>
            <CodeBlock language="sql" code={`-- Base table
CREATE TABLE events (
    event_id uuid,
    user_id uuid,
    event_type text,
    timestamp timestamp,
    PRIMARY KEY (event_id)
);

-- Materialized view: Automatically maintained
CREATE MATERIALIZED VIEW events_by_user AS
    SELECT * FROM events
    WHERE user_id IS NOT NULL AND event_id IS NOT NULL
    PRIMARY KEY (user_id, event_id);

-- Now can query efficiently:
SELECT * FROM events_by_user WHERE user_id = ?;`} />
          </div>
        </div>
      </section>

      {/* Section 4: Scaling & Distribution */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-sm px-3 py-1 rounded-full">04</span>
          Scaling & Distribution
        </h2>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Tunable Consistency</h3>
          <CodeBlock language="python" code={`from cassandra.query import SimpleStatement, ConsistencyLevel

# Write with consistency ONE (fastest, least durable)
stmt = SimpleStatement(
    "INSERT INTO users VALUES (%s, %s)",
    consistency_level=ConsistencyLevel.ONE
)

# Write with consistency QUORUM (balance)
stmt = SimpleStatement(
    "INSERT INTO users VALUES (%s, %s)",
    consistency_level=ConsistencyLevel.QUORUM  # (RF/2) + 1 nodes
)

# Write with consistency ALL (slowest, most durable)
stmt = SimpleStatement(
    "INSERT INTO users VALUES (%s, %s)",
    consistency_level=ConsistencyLevel.ALL
)

# Strong consistency: R + W > RF
# Example: RF=3, W=QUORUM(2), R=QUORUM(2) → 2+2 > 3 ✓`} />
        </div>
      </section>

      {/* Section 5: Performance Optimization */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-orange-600 text-sm px-3 py-1 rounded-full">05</span>
          Performance Optimization
        </h2>
        <div className="bg-gray-900 p-6 rounded-xl border border-yellow-900/50">
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Best Practices</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><span className="text-yellow-400">•</span> Use <strong>prepared statements</strong> to reduce parsing overhead</li>
            <li className="flex gap-2"><span className="text-yellow-400">•</span> Keep partition sizes under <strong>100MB</strong></li>
            <li className="flex gap-2"><span className="text-yellow-400">•</span> Use <strong>LeveledCompactionStrategy</strong> for read-heavy workloads</li>
            <li className="flex gap-2"><span className="text-yellow-400">•</span> Monitor <strong>tombstones</strong> (deleted records) and run repairs</li>
            <li className="flex gap-2"><span className="text-yellow-400">•</span> Batch writes to same partition for efficiency</li>
          </ul>
        </div>
      </section>

      {/* Section 6: Use Cases & Comparisons */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">06</span>
          Use Cases & Comparisons
        </h2>
        <div className="bg-gray-900 p-6 rounded-xl border border-green-900/50">
          <h3 className="text-xl font-semibold text-green-400 mb-4">🎯 When to Use Cassandra</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-green-400 font-bold mb-2">Perfect For:</h4>
              <ul className="text-sm space-y-1">
                <li>✓ Time-series data (IoT sensors, logs)</li>
                <li>✓ Write-heavy workloads</li>
                <li>✓ Multi-datacenter deployments</li>
                <li>✓ Linear scalability needs</li>
                <li>✓ High availability requirements (99.99%+)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-red-400 font-bold mb-2">Not Ideal For:</h4>
              <ul className="text-sm space-y-1">
                <li>→ Complex joins or aggregations</li>
                <li>→ Strong consistency requirements</li>
                <li>→ Small datasets ({'<'} 100GB)</li>
                <li>→ ACID transactions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="pt-8 border-t border-gray-700">
        <p className="text-sm text-gray-500">
          📚 Further Reading: <a href="https://cassandra.apache.org/doc/" className="text-blue-400 hover:underline">Official Cassandra Documentation</a>
        </p>
      </div>
    </div>
  );
};

export default CassandraDocs;
