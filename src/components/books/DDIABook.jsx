import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  User,
  Calendar,
  AlertCircle,
  Zap,
  Shield,
} from "lucide-react";
import InteractiveDiagram from "../common/InteractiveDiagram";
import CodeBlock from "../common/CodeBlock";
import { chapters6to12 } from "../../data/ddia-chapters-6-12";

const DDIABook = () => {
  const [expandedChapters, setExpandedChapters] = useState({});

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const chapters = [
    {
      id: 1,
      title: "Reliable, Scalable, and Maintainable Applications",
      summary:
        "Foundation of building data-intensive systems. Introduces three fundamental concerns: reliability (continuing to work correctly even when things go wrong), scalability (coping with growth in data volume, traffic, or complexity), and maintainability (making life better for the teams working on the system).",
      detailedContent: `Modern applications are increasingly data-intensive rather than compute-intensive. The biggest challenges usually relate to the amount of data, the complexity of data, and the speed at which it is changing.`,
      keyPoints: [
        "**Reliability**: Tolerance to hardware faults (disk failures, RAM errors), software errors (bugs, cascading failures), and human errors (misconfiguration)",
        "**Scalability**: Describing load (requests per second, read/write ratio), measuring performance (response time percentiles: p50, p95, p99)",
        "**Maintainability**: Operability (make routine tasks easy), simplicity (remove accidental complexity), evolvability (adapt to change)",
        "Cloud computing shifts focus from reducing fault occurrence to tolerating faults through redundancy",
      ],
      sections: [
        {
          title: "Reliability in Practice",
          content:
            "Systems must continue working correctly even when faults occur. This involves fault tolerance through redundancy, graceful degradation, and failover mechanisms.",
          example: {
            language: "python",
            title: "circuit_breaker.py",
            code: `class CircuitBreaker:
    def __init__(self, failure_threshold=5, timeout=60):
        self.failure_count = 0
        self.failure_threshold = failure_threshold
        self.timeout = timeout
        self.last_failure_time = None
        self.state = "CLOSED"  # CLOSED, OPEN, HALF_OPEN
    
    def call(self, func, *args, **kwargs):
        if self.state == "OPEN":
            if time.time() - self.last_failure_time > self.timeout:
                self.state = "HALF_OPEN"
            else:
                raise Exception("Circuit breaker is OPEN")
        
        try:
            result = func(*args, **kwargs)
            self.on_success()
            return result
        except Exception as e:
            self.on_failure()
            raise e
    
    def on_success(self):
        self.failure_count = 0
        self.state = "CLOSED"
    
    def on_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()
        if self.failure_count >= self.failure_threshold:
            self.state = "OPEN"`,
          },
        },
        {
          title: "Scalability Metrics",
          content:
            "Load can be described with load parameters: requests per second for a web server, write-to-read ratio in a database, active users in a chat room, hit rate on a cache.",
          points: [
            "Response time percentiles: p50 (median), p95, p99, p999",
            "Tail latency amplification: When making parallel calls, slowest determines overall latency",
            "Head-of-line blocking: Slow requests can block faster ones in queues",
            "Elastic scaling vs manual scaling: automatic vs human-driven resource adjustment",
          ],
        },
      ],
      diagram: {
        title: "System Reliability Components",
        nodes: [
          {
            id: "app",
            type: "default",
            position: { x: 300, y: 50 },
            data: { label: "Application" },
            style: { background: "#3b82f6", color: "white", padding: 20 },
          },
          {
            id: "redundancy",
            type: "default",
            position: { x: 100, y: 180 },
            data: { label: "Redundancy\n(Multiple instances)" },
            style: { background: "#10b981", color: "white", padding: 15 },
          },
          {
            id: "monitoring",
            type: "default",
            position: { x: 300, y: 180 },
            data: { label: "Monitoring\n& Alerting" },
            style: { background: "#f59e0b", color: "white", padding: 15 },
          },
          {
            id: "recovery",
            type: "default",
            position: { x: 500, y: 180 },
            data: { label: "Auto Recovery\n& Failover" },
            style: { background: "#8b5cf6", color: "white", padding: 15 },
          },
        ],
        edges: [
          { id: "e1", source: "app", target: "redundancy", animated: false },
          { id: "e2", source: "app", target: "monitoring", animated: false },
          { id: "e3", source: "app", target: "recovery", animated: false },
        ],
      },
    },
    {
      id: 2,
      title: "Data Models and Query Languages",
      summary:
        "Each data model embodies assumptions about how it will be used. Relational, document, and graph models each have their sweet spots and trade-offs.",
      detailedContent: `The data model is perhaps the most important part of developing software because it has such a profound effect on how we think about the problem, how software is written, and how it performs.`,
      keyPoints: [
        "**Relational Model**: Data organized in tables (relations), strong schema, ACID transactions, SQL for queries",
        "**Document Model**: Schema-flexible JSON-like documents, better locality, weaker join support (MongoDB, CouchDB)",
        "**Graph Model**: Vertices and edges, excels at many-to-many relationships (Neo4j, social networks)",
        "**Schema-on-write vs schema-on-read**: Explicit schema vs implicit schema, analogous to static vs dynamic typing",
      ],
      sections: [
        {
          title: "Relational vs Document Trade-offs",
          points: [
            "Document model advantages: Schema flexibility, better performance for some access patterns (all data in one place), closer to application objects",
            "Relational model advantages: Better join support, many-to-one and many-to-many relationships",
            "Document databases converging toward relational (adding joins), relational converging toward document (JSON columns)",
            "Impedance mismatch: Disconnect between object-oriented code and relational tables",
          ],
        },
        {
          title: "Query Languages",
          content:
            "SQL is declarative (specify pattern of data you want), while imperative code (JavaScript, Python) specifies exact operations.",
          example: {
            language: "sql",
            title: "declarative_query.sql",
            code: `-- Declarative SQL: What you want
SELECT users.name, COUNT(posts.id) as post_count
FROM users
LEFT JOIN posts ON users.id = posts.user_id
WHERE users.country = 'USA'
GROUP BY users.id, users.name
HAVING COUNT(posts.id) > 10
ORDER BY post_count DESC;

-- Database can optimize execution plan:
-- - Choose best join algorithm (hash, merge, nested loop)
-- - Decide index usage
-- - Parallelize execution
-- - Leverage cached statistics`,
          },
        },
      ],
      diagram: {
        title: "Data Model Trade-offs",
        nodes: [
          {
            id: "relational",
            type: "default",
            position: { x: 50, y: 100 },
            data: { label: "Relational\n✓ ACID\n✓ Joins\n✗ Schema rigid" },
            style: {
              background: "#3b82f6",
              color: "white",
              padding: 20,
              fontSize: 13,
            },
          },
          {
            id: "document",
            type: "default",
            position: { x: 280, y: 100 },
            data: { label: "Document\n✓ Flexible\n✓ Locality\n✗ Weak joins" },
            style: {
              background: "#10b981",
              color: "white",
              padding: 20,
              fontSize: 13,
            },
          },
          {
            id: "graph",
            type: "default",
            position: { x: 510, y: 100 },
            data: {
              label: "Graph\n✓ Relationships\n✓ Traversals\n✗ Aggregations",
            },
            style: {
              background: "#8b5cf6",
              color: "white",
              padding: 20,
              fontSize: 13,
            },
          },
        ],
        edges: [],
      },
    },
    {
      id: 3,
      title: "Storage and Retrieval",
      summary:
        "How databases lay out data on disk and find it again when queried. Two families of storage engines: log-structured (LSM-trees) and page-oriented (B-trees).",
      detailedContent: `Understanding the difference between storage engines optimized for transactional workloads versus analytical workloads is crucial for choosing the right database for your application.`,
      keyPoints: [
        "**Hash Indexes**: In-memory hash map storing byte offsets. Fast reads but limited to small datasets that fit in RAM",
        "**SSTables & LSM-Trees**: Sorted String Tables with background merging and compaction. Write optimized (LevelDB, Cassandra, HBase)",
        "**B-Trees**: Break database into fixed-size blocks/pages (typically 4KB). Most common index structure. Read optimized",
        "**Write amplification**: One write to database results in multiple writes to disk over time (more severe in B-trees)",
      ],
      sections: [
        {
          title: "LSM-Tree Architecture",
          content:
            "Writes go to in-memory memtable (balanced tree like red-black tree). When memtable grows too large, flush to disk as SSTable. Reads check memtable, then recent SSTables, then older ones.",
          points: [
            "Compaction strategies: Size-tiered (merge similar-size SSTables) vs leveled (separate levels with size limits)",
            "Bloom filters: Space-efficient probabilistic data structure to quickly check if key exists",
            "Advantages: High write throughput, good compression, sequential I/O patterns",
            "Disadvantages: Read amplification (check multiple SSTables), compaction can interfere with performance",
          ],
          example: {
            language: "python",
            title: "lsm_simplified.py",
            code: `class LSMTree:
    def __init__(self):
        self.memtable = {}  # In-memory sorted structure
        self.sstables = []  # List of on-disk sorted files
        self.memtable_size_limit = 1000
    
    def put(self, key, value):
        self.memtable[key] = value
        if len(self.memtable) >= self.memtable_size_limit:
            self.flush_memtable()
    
    def get(self, key):
        # Check memtable first
        if key in self.memtable:
            return self.memtable[key]
        
        # Check SSTables from newest to oldest
        for sstable in reversed(self.sstables):
            value = sstable.get(key)
            if value is not None:
                return value
        
        return None
    
    def flush_memtable(self):
        # Sort memtable and write to disk
        sorted_entries = sorted(self.memtable.items())
        sstable = SSTable.create(sorted_entries)
        self.sstables.append(sstable)
        self.memtable = {}
        
        # Trigger compaction if needed
        if len(self.sstables) > 4:
            self.compact()`,
          },
        },
        {
          title: "B-Tree vs LSM Comparison",
          points: [
            "B-Tree: Faster reads (each key in one place), predictable performance, mature implementations",
            "LSM-Tree: Faster writes (append-only), better compression (periodic compaction), lower write amplification",
            "B-Tree: Write overhead from Write-Ahead Log (WAL), page splits, and maintaining tree balance",
            "LSM-Tree: Compaction can compete with ongoing reads/writes for disk bandwidth (background process)",
          ],
        },
      ],
      diagram: {
        title: "LSM-Tree Write Path",
        nodes: [
          {
            id: "write",
            type: "default",
            position: { x: 50, y: 100 },
            data: { label: "Write" },
            style: { background: "#3b82f6", color: "white", padding: 15 },
          },
          {
            id: "memtable",
            type: "default",
            position: { x: 200, y: 100 },
            data: { label: "MemTable\n(RAM)" },
            style: {
              background: "#dc2626",
              color: "white",
              padding: 15,
              border: "3px solid #ef4444",
            },
          },
          {
            id: "l0",
            type: "default",
            position: { x: 400, y: 50 },
            data: { label: "L0\nSSTable" },
            style: {
              background: "#f59e0b",
              color: "white",
              padding: 12,
              fontSize: 12,
            },
          },
          {
            id: "l1",
            type: "default",
            position: { x: 400, y: 120 },
            data: { label: "L1\nSSTable" },
            style: {
              background: "#10b981",
              color: "white",
              padding: 12,
              fontSize: 12,
            },
          },
          {
            id: "l2",
            type: "default",
            position: { x: 400, y: 190 },
            data: { label: "L2\nSSTable" },
            style: {
              background: "#8b5cf6",
              color: "white",
              padding: 12,
              fontSize: 12,
            },
          },
          {
            id: "compact",
            type: "default",
            position: { x: 580, y: 120 },
            data: { label: "Background\nCompaction" },
            style: {
              background: "#475569",
              color: "white",
              padding: 15,
              fontSize: 11,
            },
          },
        ],
        edges: [
          {
            id: "e1",
            source: "write",
            target: "memtable",
            label: "Insert",
            animated: true,
          },
          {
            id: "e2",
            source: "memtable",
            target: "l0",
            label: "Flush",
            animated: true,
          },
          {
            id: "e3",
            source: "l0",
            target: "compact",
            animated: false,
            style: { strokeDasharray: "5,5" },
          },
          {
            id: "e4",
            source: "l1",
            target: "compact",
            animated: false,
            style: { strokeDasharray: "5,5" },
          },
          {
            id: "e5",
            source: "compact",
            target: "l2",
            label: "Merge",
            animated: false,
          },
        ],
      },
    },
    {
      id: 4,
      title: "Encoding and Evolution",
      summary:
        "How data gets encoded for storage and transmission. Schema evolution allows applications to change over time while maintaining forward and backward compatibility.",
      detailedContent: `When data outlives code—data in a database or messages in a queue—we need encoding formats that support graceful evolution without downtime.`,
      keyPoints: [
        "**Forward compatibility**: New code can read data written by old code (easier to achieve)",
        "**Backward compatibility**: Old code can read data written by new code (harder)",
        "**JSON/XML**: Human-readable but ambiguities (numbers vs strings), no schema enforcement, verbosity",
        "**Binary encodings**: Protocol Buffers, Thrift, Avro provide compactness and schema evolution",
      ],
      sections: [
        {
          title: "Schema Evolution Patterns",
          points: [
            "Adding fields: New field with default value allows old code to ignore it",
            "Removing fields: Only remove optional fields, never required ones",
            "Field tags/numbers: Never reuse tags after removing fields (Protobuf, Thrift)",
            "Avro: Reader and writer schema can differ, resolved using schema resolution rules",
          ],
          example: {
            language: "protobuf",
            title: "user_schema_v2.proto",
            code: `// Version 1
message User {
  required string name = 1;
  required int32 user_id = 2;
}

// Version 2: Added optional email field
message User {
  required string name = 1;
  required int32 user_id = 2;
  optional string email = 3;  // New field with default empty string
}

// Version 3: Added repeated addresses
message User {
  required string name = 1;
  required int32 user_id = 2;
  optional string email = 3;
  repeated Address addresses = 4;  // Can add repeated fields
}

message Address {
  required string street = 1;
  required string city = 2;
  required string country = 3;
}`,
          },
        },
        {
          title: "Avro Schema Evolution",
          content:
            "Avro schema contains no tag numbers. Reader needs to know exact schema used to write data. Writer schema and reader schema don't have to be same—just compatible.",
          points: [
            "Schema registry: Central repository mapping schema version to Avro schema",
            "Forward compatible: Reader has newer schema than writer (can ignore new fields)",
            "Backward compatible: Reader has older schema than writer (must have defaults for new fields)",
            "Union types: Allow field to be one of several types, enabling schema evolution",
          ],
        },
      ],
      diagram: {
        title: "Encoding Format Comparison",
        nodes: [
          {
            id: "json",
            type: "default",
            position: { x: 80, y: 80 },
            data: {
              label: "JSON/XML\n📄 Human-readable\n⚠️ No schema\n📦 Verbose",
            },
            style: {
              background: "#f59e0b",
              color: "white",
              padding: 18,
              fontSize: 11,
            },
          },
          {
            id: "protobuf",
            type: "default",
            position: { x: 280, y: 80 },
            data: {
              label: "Protobuf/Thrift\n🔢 Field tags\n✓ Compact\n✓ Schema",
            },
            style: {
              background: "#3b82f6",
              color: "white",
              padding: 18,
              fontSize: 11,
            },
          },
          {
            id: "avro",
            type: "default",
            position: { x: 480, y: 80 },
            data: {
              label:
                "Avro\n📋 Schema required\n✓ Dynamic typing\n✓ Code generation",
            },
            style: {
              background: "#8b5cf6",
              color: "white",
              padding: 18,
              fontSize: 11,
            },
          },
        ],
        edges: [],
      },
    },
    {
      id: 5,
      title: "Replication",
      summary:
        "Keeping a copy of the same data on multiple machines for redundancy, improved latency, and increased read throughput. Three main approaches: single-leader, multi-leader, and leaderless.",
      detailedContent: `Replication is one of those things that sounds simple in theory but becomes surprisingly complex in practice due to the many things that can go wrong.`,
      keyPoints: [
        "**Single-leader (master-slave)**: One leader accepts writes, replicates to followers. Simple but leader is bottleneck",
        "**Multi-leader**: Multiple nodes accept writes. Good for multi-datacenter, offline operation. Conflict resolution needed",
        "**Leaderless (Dynamo-style)**: No leader, client sends writes to multiple replicas. Read repair and anti-entropy",
        "**Replication lag**: Async replication causes temporary inconsistency. Read-after-write, monotonic reads, consistent prefix reads",
      ],
      sections: [
        {
          title: "Single-Leader Replication",
          points: [
            "Synchronous: Follower guaranteed to have up-to-date copy. Leader waits, slows down writes",
            "Asynchronous: Leader doesn't wait. Fast writes but potential data loss if leader fails",
            "Semi-synchronous: One synchronous follower, rest asynchronous (MySQL default)",
            "Statement-based replication: Send SQL statements. Nondeterministic functions (NOW(), RAND()) cause problems",
          ],
          example: {
            language: "python",
            title: "replication_lag.py",
            code: `# Read-after-write consistency problem
def update_profile(user_id, new_name):
    # Write goes to leader
    db.leader.execute("UPDATE users SET name = %s WHERE id = %s", 
                      (new_name, user_id))
    
    # User immediately views their profile
    # Read might go to follower that hasn't caught up yet
    user = db.follower.query("SELECT * FROM users WHERE id = %s", (user_id,))
    # May see old name! Replication lag.

# Solution 1: Read user's own writes from leader
def get_user_profile(user_id, viewing_user_id):
    if user_id == viewing_user_id:
        # User viewing their own profile - read from leader
        return db.leader.query("SELECT * FROM users WHERE id = %s", (user_id,))
    else:
        # Viewing someone else's profile - OK to read from follower
        return db.follower.query("SELECT * FROM users WHERE id = %s", (user_id,))

# Solution 2: Timestamp-based
def get_user_with_timestamp(user_id, min_timestamp):
    replica = select_replica_caught_up_to(min_timestamp)
    return replica.query("SELECT * FROM users WHERE id = %s", (user_id,))`,
          },
        },
        {
          title: "Multi-Leader Conflicts",
          content:
            "When multiple leaders accept writes, conflicts are inevitable. Must decide how to resolve them.",
          points: [
            "Last write wins (LWW): Use timestamp, arbitrary winner. Data loss possible",
            "Happen-before relationship: Use version vectors to detect concurrent writes",
            "Merge conflicts: Application-specific logic (e.g., merge JSON objects)",
            "Conflict-free replicated datatypes (CRDTs): Data structures that can be merged automatically",
          ],
        },
        {
          title: "Leaderless Quorums",
          content:
            "Write to multiple replicas, wait for w acknowledgments. Read from r replicas. If w + r > n, guaranteed to read up-to-date value.",
          points: [
            "Common choice: n=3, w=2, r=2 (tolerate 1 node failure)",
            "Read repair: When client detects stale value on read, writes it back",
            "Anti-entropy: Background process compares replicas and copies missing data",
            "Sloppy quorums: Accept writes even when < w nodes reachable (hinted handoff)",
          ],
        },
      ],
      diagram: {
        title: "Multi-Leader Replication (Geo-Distributed)",
        nodes: [
          {
            id: "dc1",
            type: "default",
            position: { x: 100, y: 50 },
            data: { label: "Datacenter 1" },
            style: {
              background: "#1e40af",
              color: "white",
              padding: 12,
              fontSize: 12,
            },
          },
          {
            id: "dc1-leader",
            type: "default",
            position: { x: 100, y: 130 },
            data: { label: "Leader 1" },
            style: {
              background: "#dc2626",
              color: "white",
              padding: 15,
              border: "3px solid #ef4444",
            },
          },
          {
            id: "dc1-follower",
            type: "default",
            position: { x: 100, y: 210 },
            data: { label: "Follower" },
            style: { background: "#10b981", color: "white", padding: 12 },
          },

          {
            id: "dc2",
            type: "default",
            position: { x: 400, y: 50 },
            data: { label: "Datacenter 2" },
            style: {
              background: "#1e40af",
              color: "white",
              padding: 12,
              fontSize: 12,
            },
          },
          {
            id: "dc2-leader",
            type: "default",
            position: { x: 400, y: 130 },
            data: { label: "Leader 2" },
            style: {
              background: "#dc2626",
              color: "white",
              padding: 15,
              border: "3px solid #ef4444",
            },
          },
          {
            id: "dc2-follower",
            type: "default",
            position: { x: 400, y: 210 },
            data: { label: "Follower" },
            style: { background: "#10b981", color: "white", padding: 12 },
          },
        ],
        edges: [
          {
            id: "e1",
            source: "dc1-leader",
            target: "dc1-follower",
            label: "Replicate",
            animated: true,
          },
          {
            id: "e2",
            source: "dc2-leader",
            target: "dc2-follower",
            label: "Replicate",
            animated: true,
          },
          {
            id: "e3",
            source: "dc1-leader",
            target: "dc2-leader",
            label: "Async Sync",
            animated: true,
            style: { stroke: "#f59e0b" },
          },
          {
            id: "e4",
            source: "dc2-leader",
            target: "dc1-leader",
            label: "Async Sync",
            animated: true,
            style: { stroke: "#f59e0b" },
          },
        ],
      },
    },
  ];

  // Merge with chapters 6-12
  const allChapters = [...chapters, ...chapters6to12];

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-8 pb-20">
      {/* Book Header */}
      <div className="border-b border-gray-700 pb-8">
        <div className="flex items-start gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-xl shadow-2xl">
            <BookOpen className="w-16 h-16 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-3">
              Designing Data-Intensive Applications
            </h1>
            <div className="flex items-center gap-4 text-gray-400 mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Martin Kleppmann</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>2017</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>12 Chapters</span>
              </div>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              The essential guide to building reliable, scalable, and
              maintainable data systems. This book explores the fundamental
              concepts and trade-offs in modern data architecture, from storage
              engines to distributed systems consensus.
            </p>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">Chapters</h2>
        {allChapters.map((chapter) => (
          <div
            key={chapter.id}
            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-200 hover:border-gray-600">
            {/* Chapter Header */}
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white font-bold text-sm">
                  {chapter.id}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-1">
                    {chapter.summary}
                  </p>
                </div>
              </div>
              {expandedChapters[chapter.id] ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {/* Chapter Content */}
            {expandedChapters[chapter.id] && (
              <div className="px-6 pb-6 pt-2 border-t border-gray-700 space-y-6">
                {/* Summary */}
                <div className="bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="text-md font-semibold text-white mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Chapter Overview
                  </h4>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    {chapter.summary}
                  </p>
                  {chapter.detailedContent && (
                    <p className="text-gray-400 text-sm italic mt-2">
                      {chapter.detailedContent}
                    </p>
                  )}
                </div>

                {/* Key Points */}
                <div>
                  <h4 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Key Concepts
                  </h4>
                  <ul className="space-y-2">
                    {chapter.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-300">
                        <span className="text-blue-400 mt-1">•</span>
                        <span dangerouslySetInnerHTML={{ __html: point }} />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sections with Examples */}
                {chapter.sections &&
                  chapter.sections.map((section, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-900/50 p-5 rounded-lg border border-gray-700">
                      <h5 className="text-lg font-semibold text-white mb-3">
                        {section.title}
                      </h5>
                      {section.content && (
                        <p className="text-gray-300 mb-3">{section.content}</p>
                      )}
                      {section.points && (
                        <ul className="space-y-2 mb-3">
                          {section.points.map((point, pidx) => (
                            <li
                              key={pidx}
                              className="flex gap-2 text-sm text-gray-300">
                              <span className="text-green-400">→</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {section.example && (
                        <CodeBlock
                          language={section.example.language}
                          title={section.example.title}
                          code={section.example.code}
                        />
                      )}
                    </div>
                  ))}

                {/* Diagram */}
                {chapter.diagram && (
                  <div>
                    <h4 className="text-md font-semibold text-white mb-3">
                      Architecture Diagram
                    </h4>
                    <InteractiveDiagram
                      initialNodes={chapter.diagram.nodes}
                      initialEdges={chapter.diagram.edges}
                      title={chapter.diagram.title}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-700/50">
        <h3 className="text-xl font-semibold text-white mb-3">
          📚 Why Read This Book?
        </h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex gap-2">
            <span className="text-blue-400">✓</span>
            <span>
              Understand the fundamental principles of distributed data systems
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">✓</span>
            <span>
              Learn about trade-offs between consistency, availability, and
              partition tolerance
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">✓</span>
            <span>
              Build better software by understanding how databases work
              internally
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">✓</span>
            <span>
              Essential reading for backend engineers and data engineers
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DDIABook;
