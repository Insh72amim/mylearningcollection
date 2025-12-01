import React from 'react';
import { MarkerType } from 'reactflow';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';

const MongoDBDocs = () => {
  const clusterNodes = [
    { id: 'app', position: { x: 350, y: 0 }, data: { label: 'Application' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 150 } },
    { id: 'router', position: { x: 350, y: 100 }, data: { label: 'Mongos Router' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', width: 150 } },
    { id: 'config', position: { x: 600, y: 100 }, data: { label: 'Config Servers' }, style: { background: '#6366f1', color: 'white', border: '1px solid #4f46e5', width: 150 } },
    
    // Shard 1
    { id: 's1p', position: { x: 50, y: 250 }, data: { label: 'Shard 1 Primary' }, style: { background: '#f59e0b', color: 'white', border: '1px solid #d97706', width: 140 } },
    { id: 's1s1', position: { x: 0, y: 350 }, data: { label: 'Secondary' }, style: { background: '#374151', color: 'gray', border: '1px solid #4b5563', width: 100, fontSize: '12px' } },
    { id: 's1s2', position: { x: 120, y: 350 }, data: { label: 'Secondary' }, style: { background: '#374151', color: 'gray', border: '1px solid #4b5563', width: 100, fontSize: '12px' } },

    // Shard 2
    { id: 's2p', position: { x: 350, y: 250 }, data: { label: 'Shard 2 Primary' }, style: { background: '#f59e0b', color: 'white', border: '1px solid #d97706', width: 140 } },
    { id: 's2s1', position: { x: 300, y: 350 }, data: { label: 'Secondary' }, style: { background: '#374151', color: 'gray', border: '1px solid #4b5563', width: 100, fontSize: '12px' } },
    { id: 's2s2', position: { x: 420, y: 350 }, data: { label: 'Secondary' }, style: { background: '#374151', color: 'gray', border: '1px solid #4b5563', width: 100, fontSize: '12px' } },

    // Shard 3
    { id: 's3p', position: { x: 650, y: 250 }, data: { label: 'Shard 3 Primary' }, style: { background: '#f59e0b', color: 'white', border: '1px solid #d97706', width: 140 } },
    { id: 's3s1', position: { x: 600, y: 350 }, data: { label: 'Secondary' }, style: { background: '#374151', color: 'gray', border: '1px solid #4b5563', width: 100, fontSize: '12px' } },
    { id: 's3s2', position: { x: 720, y: 350 }, data: { label: 'Secondary' }, style: { background: '#374151', color: 'gray', border: '1px solid #4b5563', width: 100, fontSize: '12px' } },
  ];

  const clusterEdges = [
    { id: 'e1', source: 'app', target: 'router', animated: true, style: { stroke: '#9ca3af' } },
    { id: 'e2', source: 'router', target: 'config', style: { stroke: '#6366f1', strokeDasharray: '5,5' }, label: 'Metadata' },
    { id: 'e3', source: 'router', target: 's1p', style: { stroke: '#10b981' } },
    { id: 'e4', source: 'router', target: 's2p', style: { stroke: '#10b981' } },
    { id: 'e5', source: 'router', target: 's3p', style: { stroke: '#10b981' } },
    
    // Replication edges
    { id: 'r1', source: 's1p', target: 's1s1', style: { stroke: '#4b5563' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r2', source: 's1p', target: 's1s2', style: { stroke: '#4b5563' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r3', source: 's2p', target: 's2s1', style: { stroke: '#4b5563' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r4', source: 's2p', target: 's2s2', style: { stroke: '#4b5563' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r5', source: 's3p', target: 's3s1', style: { stroke: '#4b5563' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r6', source: 's3p', target: 's3s2', style: { stroke: '#4b5563' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  const electionNodes = [
    { id: 'p', position: { x: 250, y: 50 }, data: { label: 'Primary (Fails)' }, style: { background: '#ef4444', color: 'white', border: '1px solid #b91c1c', width: 150 } },
    { id: 's1', position: { x: 100, y: 200 }, data: { label: 'Secondary 1' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', width: 150 } },
    { id: 's2', position: { x: 400, y: 200 }, data: { label: 'Secondary 2' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 150 } },
  ];

  const electionEdges = [
    { id: 'h1', source: 'p', target: 's1', label: 'Heartbeat Timeout', style: { stroke: '#ef4444', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' } },
    { id: 'h2', source: 'p', target: 's2', label: 'Heartbeat Timeout', style: { stroke: '#ef4444', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' } },
    { id: 'v1', source: 's1', target: 's2', label: 'Vote Request', animated: true, style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'v2', source: 's2', target: 's1', label: 'Vote Granted', animated: true, style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">MongoDB: The Deep Dive</h1>
        <p className="text-xl text-gray-400">
          A comprehensive guide to the document-oriented NoSQL database that powers modern applications.
        </p>
      </div>

      {/* Section 1: Architecture & Core Concepts */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">01</span>
          Architecture & Core Concepts
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          MongoDB is a <strong>document-oriented database</strong> that stores data in flexible, JSON-like documents (BSON). Unlike relational databases, it doesn't require a fixed schema.
        </p>
        
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Sharded Cluster Architecture</h3>
          <InteractiveDiagram 
            initialNodes={clusterNodes} 
            initialEdges={clusterEdges} 
            title="MongoDB Sharded Cluster" 
          />
          
          <div className="mt-6 space-y-4">
            <div className="bg-gray-900 p-4 rounded border border-green-900/50">
              <strong className="text-green-400">mongos (Router)</strong>
              <p className="text-sm mt-2">Query router. Directs client requests to appropriate shards based on shard key.</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
              <strong className="text-blue-400">Config Servers</strong>
              <p className="text-sm mt-2">Store cluster metadata: shard key ranges, chunk locations, cluster topology.</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-orange-900/50">
              <strong className="text-orange-400">Shards (Replica Sets)</strong>
              <p className="text-sm mt-2">Each shard is a replica set (primary + secondaries) storing a subset of data.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">BSON (Binary JSON)</h3>
          <CodeBlock language="json" code={`// JSON-like document
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "Alice",
  "age": 30,
  "email": "alice@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York"
  },
  "hobbies": ["reading", "hiking"],
  "created_at": ISODate("2024-01-15T10:00:00Z")
}

// BSON adds extra types:
// - ObjectId (12-byte unique identifier)
// - Date (millisecond precision)
// - Binary data
// - Regular expressions
// - 32-bit and 64-bit integers`} />
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
            <h3 className="text-xl font-semibold text-white mb-4">Schema Design Patterns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-green-400 font-bold mb-3">Embedding (Denormalization)</h4>
                <CodeBlock language="javascript" code={`// One-to-Few: Embed related data
{
  "_id": 1,
  "name": "Blog Post",
  "comments": [
    {
      "user": "Alice",
      "text": "Great post!",
      "date": ISODate("2024-01-15")
    },
    {
      "user": "Bob",
      "text": "Thanks!",
      "date": ISODate("2024-01-16")
    }
  ]
}

// Pros: Single read, atomic updates
// Cons: 16MB document limit`} />
              </div>
              <div>
                <h4 className="text-blue-400 font-bold mb-3">Referencing (Normalization)</h4>
                <CodeBlock language="javascript" code={`// One-to-Many: Use references
// User document
{
  "_id": 1,
  "name": "Alice"
}

// Posts collection
{
  "_id": 101,
  "title": "My Post",
  "author_id": 1  // Reference
}

// Pros: No duplication, flexibility
// Cons: Multiple queries needed`} />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">WiredTiger Storage Engine</h3>
            <CodeBlock language="python" code={`# WiredTiger features:
# 1. Document-level concurrency (MVCC)
# 2. Compression (Snappy, zlib, zstd)
# 3. Checkpointing every 60 seconds
# 4. Journal for durability

# Configuration example
mongod --storageEngine wiredTiger \\
  --wiredTigerCacheSizeGB 4 \\
  --wiredTigerCollectionBlockCompressor snappy

# Storage layout:
# /data/db/
#   journal/           # Write-ahead log
#   collection-*.wt    # Collection data files
#   index-*.wt         # Index files
#   WiredTiger.wt      # Metadata`} />
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-yellow-900/50">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Data Modeling Best Practices</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-yellow-400">•</span> <strong>Embed</strong> for one-to-few relationships and data read together</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> <strong>Reference</strong> for one-to-many or many-to-many relationships</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> <strong>Denormalize</strong> frequently accessed fields to avoid joins</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> <strong>Avoid</strong> unbounded arrays (comments, tags) - use separate collection</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> <strong>Design</strong> for your query patterns, not relational normalization</li>
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
            <h3 className="text-xl font-semibold text-white mb-4">CRUD Operations</h3>
            <CodeBlock language="python" code={`from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['mydb']
users = db['users']

# Create
users.insert_one({
    'name': 'Alice',
    'age': 30,
    'email': 'alice@example.com'
})

# Read
user = users.find_one({'name': 'Alice'})
all_users = users.find({'age': {'$gte': 25}})

# Update
users.update_one(
    {'name': 'Alice'},
    {'$set': {'age': 31}, '$inc': {'login_count': 1}}
)

# Delete
users.delete_many({'age': {'$lt': 18}})`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Aggregation Pipeline</h3>
            <CodeBlock language="python" code={`# Multi-stage data processing
pipeline = [
    # Stage 1: Filter documents
    {'$match': {'status': 'active'}},
    
    # Stage 2: Group and calculate
    {'$group': {
        '_id': '$category',
        'total': {'$sum': '$amount'},
        'count': {'$sum': 1},
        'avg': {'$avg': '$amount'}
    }},
    
    # Stage 3: Sort results
    {'$sort': {'total': -1}},
    
    # Stage 4: Limit output
    {'$limit': 10},
    
    # Stage 5: Project (reshape) output
    {'$project': {
        'category': '$_id',
        'total': 1,
        'count': 1,
        '_id': 0
    }}
]

results = db.orders.aggregate(pipeline)`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Index Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
                <strong className="text-blue-400 block mb-2">Single Field Index</strong>
                <CodeBlock language="python" code={`db.users.create_index('email')
db.users.create_index([('age', -1)])  # Descending`} />
              </div>
              <div className="bg-gray-900 p-4 rounded border border-green-900/50">
                <strong className="text-green-400 block mb-2">Compound Index</strong>
                <CodeBlock language="python" code={`db.users.create_index([
    ('status', 1),
    ('age', -1)
])  # Order matters!`} />
              </div>
              <div className="bg-gray-900 p-4 rounded border border-purple-900/50">
                <strong className="text-purple-400 block mb-2">Text Index</strong>
                <CodeBlock language="python" code={`db.articles.create_index([
    ('title', 'text'),
    ('body', 'text')
])`} />
              </div>
              <div className="bg-gray-900 p-4 rounded border border-orange-900/50">
                <strong className="text-orange-400 block mb-2">Geospatial Index</strong>
                <CodeBlock language="python" code={`db.places.create_index([
    ('location', '2dsphere')
])`} />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Query Optimization with explain()</h3>
            <CodeBlock language="python" code={`# Check query execution plan
explain = db.users.find({'age': {'$gt': 25}}).explain('executionStats')

# Key metrics:
print(explain['executionStats']['totalDocsExamined'])  # Docs scanned
print(explain['executionStats']['nReturned'])           # Docs returned
print(explain['executionStats']['executionTimeMillis'])

# Ideal: totalDocsExamined ≈ nReturned (covered query)
# Bad: totalDocsExamined >> nReturned (table scan)

# Index usage:
print(explain['queryPlanner']['winningPlan']['indexName'])`} />
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
            <h3 className="text-xl font-semibold text-white mb-4">Replica Set Elections</h3>
            <InteractiveDiagram 
              initialNodes={electionNodes} 
              initialEdges={electionEdges} 
              title="Replica Set Election Process" 
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Sharding Strategy</h3>
            <CodeBlock language="javascript" code={`// Enable sharding on database
sh.enableSharding("mydb")

// Choose shard key (critical decision!)
sh.shardCollection("mydb.users", { "user_id": "hashed" })

// Shard key options:
// 1. Hashed - Even distribution (random writes)
sh.shardCollection("mydb.logs", { "timestamp": "hashed" })

// 2. Range-based - Conditional queries
sh.shardCollection("mydb.orders", { "region": 1, "date": 1 })

// 3. Compound - Balance distribution and locality
sh.shardCollection("mydb.events", { 
    "tenant_id": 1,      // High cardinality
    "created_at": 1      // Monotonic
})

// Bad shard keys:
// ❌ Low cardinality (status: "active"|"inactive")
// ❌ Monotonically increasing (_id, timestamp)
// ❌ User ID (if requests per user vary widely)`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Read & Write Concerns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-green-400 font-bold mb-3">Write Concerns</h4>
                <CodeBlock language="python" code={`# w=1 (default): Acknowledge from primary
db.users.insert_one(
    {'name': 'Alice'},
    write_concern=WriteConcern(w=1)
)

# w='majority': Wait for majority
db.users.insert_one(
    {'name': 'Bob'},
    write_concern=WriteConcern(w='majority')
)

# j=True: Wait for journal sync
db.users.insert_one(
    {'name': 'Carol'},
    write_concern=WriteConcern(w=1, j=True)
)`} />
              </div>
              <div>
                <h4 className="text-blue-400 font-bold mb-3">Read Concerns</h4>
                <CodeBlock language="python" code={`# local: Read from primary (default)
db.users.find_one(
    {'name': 'Alice'},
    read_concern=ReadConcern('local')
)

# majority: Read committed data
db.users.find_one(
    {'name': 'Bob'},
    read_concern=ReadConcern('majority')
)

# linearizable: Read most recent
db.users.find_one(
    {'name': 'Carol'},
    read_concern=ReadConcern('linearizable')
)`} />
              </div>
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
            <h3 className="text-xl font-semibold text-white mb-4">Index Best Practices</h3>
            <CodeBlock language="python" code={`# ESR Rule: Equality, Sort, Range
# Query: find users by status, sorted by age, with age > 25
db.users.find({'status': 'active', 'age': {'$gt': 25}}).sort('age', -1)

# Optimal index: status (E), age (S + R)
db.users.create_index([('status', 1), ('age', -1)])

# Covered query: Return only indexed fields (no document fetch)
db.users.find(
    {'status': 'active'},
    {'status': 1, 'age': 1, '_id': 0}  # Only indexed fields
).hint('status_1_age_-1')

# Monitor index usage
db.users.aggregate([
    {'$indexStats': {}}
])

# Drop unused indexes (they slow down writes)
db.users.dropIndex('unused_index_name')`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Connection Pooling</h3>
            <CodeBlock language="python" code={`# Configure connection pool
client = MongoClient(
    'mongodb://localhost:27017/',
    maxPoolSize=100,        # Max connections
    minPoolSize=10,         # Min connections (keep warm)
    maxIdleTimeMS=45000,    # Close idle connections
    serverSelectionTimeoutMS=5000,
    connectTimeoutMS=10000,
    socketTimeoutMS=30000
)

# Monitor connections
db.command('serverStatus')['connections']
# {
#   'current': 52,
#   'available': 48,
#   'totalCreated': 142
# }`} />
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-yellow-900/50">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Performance Checklist</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> <strong>Index</strong> all query predicates (use explain() to verify)</li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> <strong>Limit</strong> projection fields (don't fetch entire documents)</li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> <strong>Batch</strong> bulk writes (insertMany, bulkWrite)</li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> <strong>Working Set</strong> should fit in RAM (monitor cache hit ratio)</li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> <strong>Shard</strong> horizontally when single server maxed</li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> <strong>Monitor</strong> slow queries (profiling level 1 or 2)</li>
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
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border border-gray-700">
              <thead>
                <tr className="bg-gray-800 border-b border-gray-700">
                  <th className="text-left p-3 text-white">Feature</th>
                  <th className="text-left p-3 text-green-400">MongoDB</th>
                  <th className="text-left p-3 text-blue-400">PostgreSQL</th>
                  <th className="text-left p-3 text-purple-400">Cassandra</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Data Model</td>
                  <td className="p-3">Document (BSON)</td>
                  <td className="p-3">Relational (SQL)</td>
                  <td className="p-3">Wide-column</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Schema</td>
                  <td className="p-3 text-green-400">Flexible, dynamic</td>
                  <td className="p-3">Strict, predefined</td>
                  <td className="p-3">Fixed per table</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Transactions</td>
                  <td className="p-3">ACID (4.0+)</td>
                  <td className="p-3 text-green-400">Full ACID</td>
                  <td className="p-3">Limited (LWT)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Scaling</td>
                  <td className="p-3">Horizontal (sharding)</td>
                  <td className="p-3">Vertical primarily</td>
                  <td className="p-3 text-green-400">Linear horizontal</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Joins</td>
                  <td className="p-3">$lookup (limited)</td>
                  <td className="p-3 text-green-400">Efficient joins</td>
                  <td className="p-3 text-red-400">Not supported</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Best For</td>
                  <td className="p-3">Product catalogs, CMS</td>
                  <td className="p-3">Complex queries, OLTP</td>
                  <td className="p-3">Time-series, IoT</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-green-900/50">
            <h3 className="text-xl font-semibold text-green-400 mb-4">🎯 When to Use MongoDB</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-green-400 font-bold mb-2">Perfect For:</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Product catalogs (e-commerce)</li>
                  <li>✓ Content management systems</li>
                  <li>✓ Real-time analytics</li>
                  <li>✓ Mobile/web applications</li>
                  <li>✓ User profiles and personalization</li>
                  <li>✓ Rapid prototyping (flexible schema)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-red-400 font-bold mb-2">Not Ideal For:</h4>
                <ul className="text-sm space-y-1">
                  <li>→ Complex multi-table joins</li>
                  <li>→ Financial transactions (use RDBMS)</li>
                  <li>→ Heavy analytics (use data warehouse)</li>
                  <li>→ Graph relationships (use Neo4j)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Real-World Use Cases</h3>
            <div className="space-y-4 text-sm">
              <div className="bg-gray-900 p-4 rounded">
                <strong className="text-blue-400">eBay</strong>
                <p className="mt-1">Product catalog with billions of listings. Schema flexibility for varied product types.</p>
              </div>
              <div className="bg-gray-900 p-4 rounded">
                <strong className="text-green-400">Uber</strong>
                <p className="mt-1">Geospatial queries for driver/rider matching. Real-time location tracking.</p>
              </div>
              <div className="bg-gray-900 p-4 rounded">
                <strong className="text-purple-400">Forbes</strong>
                <p className="mt-1">Content management for articles, images, videos. Fast reads for high traffic.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="pt-8 border-t border-gray-700">
        <p className="text-sm text-gray-500">
          📚 Further Reading: <a href="https://docs.mongodb.com/" className="text-blue-400 hover:underline">Official MongoDB Documentation</a> | 
          <a href="https://university.mongodb.com/" className="text-blue-400 hover:underline ml-2">MongoDB University</a>
        </p>
      </div>
    </div>
  );
};

export default MongoDBDocs;
