import React from 'react';
import { MarkerType } from 'reactflow';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';

const Neo4jDocs = () => {
  const graphNodes = [
    { id: 'alice', position: { x: 50, y: 100 }, data: { label: 'Alice\n:Person' }, style: { background: '#6366f1', color: 'white', border: '1px solid #4f46e5', borderRadius: '50%', width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' } },
    { id: 'bob', position: { x: 300, y: 100 }, data: { label: 'Bob\n:Person' }, style: { background: '#6366f1', color: 'white', border: '1px solid #4f46e5', borderRadius: '50%', width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' } },
    { id: 'matrix', position: { x: 550, y: 100 }, data: { label: 'The Matrix\n:Movie' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', width: 120, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' } },
  ];

  const graphEdges = [
    { id: 'e1', source: 'alice', target: 'bob', label: 'KNOWS', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2', source: 'bob', target: 'matrix', label: 'ACTED_IN', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  const clusterNodes = [
    // Core Servers
    { id: 'c1', position: { x: 250, y: 50 }, data: { label: 'Core 1 (Leader)' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', width: 150 } },
    { id: 'c2', position: { x: 100, y: 200 }, data: { label: 'Core 2 (Follower)' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', width: 150 } },
    { id: 'c3', position: { x: 400, y: 200 }, data: { label: 'Core 3 (Follower)' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', width: 150 } },
    
    // Read Replicas
    { id: 'rr1', position: { x: 50, y: 400 }, data: { label: 'Replica 1' }, style: { background: '#6366f1', color: 'white', border: '1px solid #4f46e5', width: 120 } },
    { id: 'rr2', position: { x: 265, y: 400 }, data: { label: 'Replica 2' }, style: { background: '#6366f1', color: 'white', border: '1px solid #4f46e5', width: 120 } },
    { id: 'rr3', position: { x: 480, y: 400 }, data: { label: 'Replica 3' }, style: { background: '#6366f1', color: 'white', border: '1px solid #4f46e5', width: 120 } },
  ];

  const clusterEdges = [
    // Raft Consensus
    { id: 'raft1', source: 'c1', target: 'c2', style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed }, markerStart: { type: MarkerType.ArrowClosed } },
    { id: 'raft2', source: 'c2', target: 'c3', style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed }, markerStart: { type: MarkerType.ArrowClosed } },
    { id: 'raft3', source: 'c3', target: 'c1', style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed }, markerStart: { type: MarkerType.ArrowClosed } },
    
    // Replication
    { id: 'rep1', source: 'c1', target: 'rr1', label: 'Async Rep', style: { stroke: '#6366f1', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'rep2', source: 'c1', target: 'rr2', style: { stroke: '#6366f1', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'rep3', source: 'c1', target: 'rr3', style: { stroke: '#6366f1', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Neo4j: The Deep Dive</h1>
        <p className="text-xl text-gray-400">
          A comprehensive guide to the world's leading graph database, powered by the Property Graph Model and Cypher.
        </p>
      </div>

      {/* Section 1: Architecture & Core Concepts */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">01</span>
          Architecture & Core Concepts
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Neo4j is a <strong>native graph database</strong> that stores data as nodes and relationships, rather than tables or documents. Its superpower is <strong>Index-Free Adjacency</strong>.
        </p>
        
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Property Graph Model</h3>
          <InteractiveDiagram 
            initialNodes={graphNodes} 
            initialEdges={graphEdges} 
            title="Neo4j Property Graph" 
          />
          
          <div className="mt-6 space-y-4">
            <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
              <strong className="text-blue-400">Nodes</strong>
              <p className="text-sm mt-2">Entities (e.g., Person, Movie). Can have labels (e.g., :Person) and properties.</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-green-900/50">
              <strong className="text-green-400">Relationships</strong>
              <p className="text-sm mt-2">Connections between nodes. Must have a type (e.g., KNOWS) and direction. Can also have properties.</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-purple-900/50">
              <strong className="text-purple-400">Index-Free Adjacency</strong>
              <p className="text-sm mt-2">Each node physically points to its neighbors. Traversing a relationship is O(1), independent of total data size.</p>
            </div>
          </div>
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
            <h3 className="text-xl font-semibold text-white mb-4">Native Graph Storage</h3>
            <CodeBlock language="text" code={`# Fixed-size records for O(1) lookups

Node Store (neostore.nodestore.db):
- In-use flag (1 byte)
- First relationship ID (4 bytes)
- First property ID (4 bytes)
- Label store ID (4 bytes)
Total: 15 bytes per node

Relationship Store (neostore.relationshipstore.db):
- In-use flag (1 byte)
- First node ID (4 bytes)
- Second node ID (4 bytes)
- Relationship type (4 bytes)
- Next relationship ID for first node (4 bytes)
- Next relationship ID for second node (4 bytes)
Total: 34 bytes per relationship

# Benefit:
# Knowing ID allows direct offset calculation
# Offset = ID * RecordSize`} />
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-yellow-900/50">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Modeling Best Practices</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-yellow-400">•</span> <strong>Use Labels</strong> to group nodes (e.g., :User, :Product)</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> <strong>Relationships are Verbs</strong> (e.g., BOUGHT, LIKES)</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> <strong>Avoid Mega-Nodes</strong> (nodes with millions of relationships)</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> <strong>Properties on Relationships</strong> are powerful (e.g., weight, date)</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> <strong>Don't use generic relationships</strong> (e.g., RELATED_TO) - be specific</li>
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
            <h3 className="text-xl font-semibold text-white mb-4">Cypher Query Language</h3>
            <CodeBlock language="sql" code={`-- ASCII Art Syntax
-- (Node)-[RELATIONSHIP]->(Node)

-- CREATE data
CREATE (alice:Person {name: 'Alice', age: 30})
CREATE (bob:Person {name: 'Bob', age: 35})
CREATE (alice)-[:KNOWS {since: 2020}]->(bob)

-- MATCH (Read)
MATCH (p:Person)-[:KNOWS]->(friend)
WHERE p.name = 'Alice'
RETURN friend.name, friend.age

-- Variable Length Path (Graph Traversal)
-- Find friends of friends up to 3 hops
MATCH (me:Person {name: 'Alice'})-[:KNOWS*1..3]-(fof)
RETURN DISTINCT fof.name

-- Shortest Path
MATCH p=shortestPath(
  (a:Person {name: 'Alice'})-[*]-(b:Person {name: 'Kevin Bacon'})
)
RETURN p`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Indexing & Constraints</h3>
            <CodeBlock language="sql" code={`-- Create Index (B-tree)
CREATE INDEX FOR (p:Person) ON (p.name);

-- Composite Index
CREATE INDEX FOR (p:Person) ON (p.name, p.age);

-- Full-text Index (Lucene based)
CREATE FULLTEXT INDEX movieTitles FOR (m:Movie) ON EACH [m.title, m.description];

-- Unique Constraint (Ensures data integrity)
CREATE CONSTRAINT FOR (u:User) REQUIRE u.email IS UNIQUE;

-- Existence Constraint (Enterprise)
CREATE CONSTRAINT FOR (p:Product) REQUIRE p.sku IS NOT NULL;`} />
          </div>
        </div>
      </section>

      {/* Section 4: Scaling & Distribution */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-sm px-3 py-1 rounded-full">04</span>
          Scaling & Distribution
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Causal Clustering</h3>
            <InteractiveDiagram 
              initialNodes={clusterNodes} 
              initialEdges={clusterEdges} 
              title="Neo4j Causal Clustering" 
            />
            <div className="mt-4 text-sm text-gray-400">
              <p><strong>Core Servers:</strong> Handle writes using Raft consensus. Provide safety.</p>
              <p><strong>Read Replicas:</strong> Handle read load. Async replication from Core. Provide scale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Performance Optimization */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-orange-600 text-sm px-3 py-1 rounded-full">05</span>
          Performance Optimization
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Query Profiling</h3>
            <CodeBlock language="sql" code={`-- Use PROFILE to see execution plan and db hits
PROFILE MATCH (p:Person {name: 'Alice'})-[:KNOWS]->(f)
RETURN f.name

-- Key Metrics:
-- db hits: Number of storage access operations
-- Rows: Number of rows passed between operators

-- Optimization Goal: Reduce db hits
-- 1. Use labels to narrow search space
-- 2. Create indexes on lookup properties
-- 3. Avoid Cartesian products (unconnected MATCH patterns)`} />
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-yellow-900/50">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Performance Checklist</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> <strong>Parameterize Queries</strong>: Allow query plan caching</li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> <strong>Heap Size</strong>: Set to 50-60% of RAM (max 31GB for compressed pointers)</li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> <strong>Page Cache</strong>: Fit as much of the graph in memory as possible</li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> <strong>Avoid "Blind" Updates</strong>: MERGE is more expensive than CREATE</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Use Cases & Comparisons */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">06</span>
          Use Cases & Comparisons
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-xl border border-green-900/50">
            <h3 className="text-xl font-semibold text-green-400 mb-4">🎯 When to Use Neo4j</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-green-400 font-bold mb-2">Perfect For:</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Fraud Detection (Ring patterns)</li>
                  <li>✓ Recommendation Engines (Collaborative filtering)</li>
                  <li>✓ Knowledge Graphs</li>
                  <li>✓ Identity & Access Management (IAM)</li>
                  <li>✓ Supply Chain Visibility</li>
                  <li>✓ Social Networks</li>
                </ul>
              </div>
              <div>
                <h4 className="text-red-400 font-bold mb-2">Not Ideal For:</h4>
                <ul className="text-sm space-y-1">
                  <li>→ Simple Key-Value lookups (Use Redis/DynamoDB)</li>
                  <li>→ Time-series data (Use Cassandra/InfluxDB)</li>
                  <li>→ Large binary data (Images/Video)</li>
                  <li>→ Global aggregations (Sum of all sales)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-700">
              <thead>
                <tr className="bg-gray-800 border-b border-gray-700">
                  <th className="text-left p-3 text-white">Feature</th>
                  <th className="text-left p-3 text-blue-400">Neo4j (Graph)</th>
                  <th className="text-left p-3 text-gray-400">RDBMS (SQL)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Data Model</td>
                  <td className="p-3 text-blue-400">Nodes & Relationships</td>
                  <td className="p-3">Tables & Foreign Keys</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Performance</td>
                  <td className="p-3 text-green-400">Constant time traversal (O(1))</td>
                  <td className="p-3 text-red-400">Joins degrade with size (O(log n))</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Flexibility</td>
                  <td className="p-3 text-green-400">Schema-optional</td>
                  <td className="p-3">Rigid Schema</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Query Language</td>
                  <td className="p-3">Cypher (Pattern matching)</td>
                  <td className="p-3">SQL (Set operations)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="pt-8 border-t border-gray-700">
        <p className="text-sm text-gray-500">
          📚 Further Reading: <a href="https://neo4j.com/docs/" className="text-blue-400 hover:underline">Official Neo4j Documentation</a> | 
          <a href="https://graphacademy.neo4j.com/" className="text-blue-400 hover:underline ml-2">Neo4j GraphAcademy</a>
        </p>
      </div>
    </div>
  );
};

export default Neo4jDocs;
