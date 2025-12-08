// Enhanced DDIA Book - Chapter data (Chapters 1-5)
export const chapters1to5 = [
  {
    id: 1,
    title: "Reliable, Scalable, and Maintainable Applications",
    summary: "Foundation of building data-intensive systems. Introduces three fundamental concerns: reliability, scalability, and maintainability.",
    detailedContent: `Modern applications are increasingly data-intensive rather than compute-intensive. The biggest challenges usually relate to the amount of data, the complexity of data, and the speed at which it is changing.`,
    keyPoints: [
      "**Reliability**: Tolerance to hardware faults (disk failures), software errors (bugs), and human errors (misconfiguration)",
      "**Scalability**: Describing load (requests/sec, read/write ratio), measuring performance (p50, p99 latencies)",
      "**Maintainability**: Operability (easy to run), Simplicity (easy to understand), Evolvability (easy to change)",
      "Cloud shifts focus from reducing fault occurrence (MTBF) to tolerating faults (MTTR)"
    ],
    sections: [
      {
        title: "Reliability in Practice",
        content: "Systems must continue working correctly even when faults occur. This involves fault tolerance through redundancy and graceful degradation.",
        example: {
          language: "python",
          title: "circuit_breaker.py",
          code: `class CircuitBreaker:
    def __init__(self, failure_threshold=5, timeout=60):
        self.state = "CLOSED"  # CLOSED, OPEN, HALF_OPEN
        self.failures = 0
    
    def call(self, func, *args):
        if self.state == "OPEN":
            if time.now() > self.retry_after:
                self.state = "HALF_OPEN"
            else:
                raise Exception("Circuit OPEN")
        
        try:
            return func(*args)
        except Exception:
            self.failures += 1
            if self.failures >= self.failure_threshold:
                self.state = "OPEN"
                self.retry_after = time.now() + self.timeout
            raise`
        }
      },
      {
        title: "Scalability Metrics",
        points: [
          "Response time percentiles: p50 (median), p95, p99 (tail latency)",
          "Tail latency amplification: In parallel calls, slowest service determines overall speed",
          "Head-of-line blocking: Slow requests blocking faster ones in queue",
          "Vertical scaling (stronger machine) vs Horizontal scaling (more machines)"
        ]
      },
      {
        title: "Deep Dive: Twitter's Timeline Architecture",
        content: "A classic example of evolving architecture for scalability.",
        points: [
          "**Approach 1 (Pull)**: User posts tweet to DB. When follower views timeline, query DB for all followees' tweets. Fast write, slow read (O(n) followers). Failed at scale.",
          "**Approach 2 (Push/Fan-out)**: User posts tweet. System pushes ID to every follower's home timeline cache. Fast read (O(1)), slow write (O(n) followers).",
          "**Hybrid Approach**: Push for normal users, Pull for celebrities (Justin Bieber). Avoids fan-out lag for users with millions of followers.",
        ]
      }
    ],
    diagram: {
      title: "System Reliability Components",
      nodes: [
        { id: "app", type: "default", position: { x: 300, y: 50 }, data: { label: "Application" }, style: { background: "#3b82f6", color: "white", padding: 20 } },
        { id: "redundancy", type: "default", position: { x: 100, y: 180 }, data: { label: "Redundancy\n(Replication)" }, style: { background: "#10b981", color: "white", padding: 15 } },
        { id: "monitoring", type: "default", position: { x: 300, y: 180 }, data: { label: "Monitoring\n& Alerting" }, style: { background: "#f59e0b", color: "white", padding: 15 } },
        { id: "recovery", type: "default", position: { x: 500, y: 180 }, data: { label: "Auto Recovery\n(Failover)" }, style: { background: "#8b5cf6", color: "white", padding: 15 } },
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
    summary: "Relational, document, and graph models each have their sweet spots. The data model dictates how we write software and think about problems.",
    detailedContent: `The mismatch between object-oriented code and relational tables (impedance mismatch) drove the adoption of ORMs and NoSQL document stores.`,
    keyPoints: [
      "**Relational Model**: Data in tables, foreign keys, joins, ACID. Best for many-to-many relationships",
      "**Document Model**: JSON/XML documents. Tree structure (one-to-many). Better locality, worse joins",
      "**Graph Model**: Nodes and edges. Best for highly interconnected data (social, fraud detection)",
      "**Schema-on-read (Dynamic)** vs **Schema-on-write (Static)**"
    ],
    sections: [
      {
        title: "Relational vs Document",
        points: [
          "Document: Good for 'aggregates' (user + profile + settings accessed together)",
          "Relational: Good for joins and normalization (updating user name in one place reflects everywhere)",
          "Convergence: PostgreSQL has JSONB, MongoDB has $lookup (joins). Models are blending",
        ]
      },
      {
        title: "Query Languages",
        content: "Declarative (SQL) vs Imperative (Code). SQL hides implementation details (indexes, join algo), allowing optimizer to improve performance without changing query.",
        example: {
          language: "sql",
          title: "declarative_power.sql",
          code: `-- SQL: "I want active users", DB figures out how (Scan vs Index)
SELECT * FROM users WHERE status = 'active';

-- Imperative (JS): "Loop through list, check flag"
// Tightly coupled to implementation
const active = users.filter(u => u.status === 'active');`
        }
      },
      {
        title: "Deep Dive: LinkedIn's Economic Graph",
        content: "Why LinkedIn uses a Graph DB alongside Relational/Document stores.",
        points: [
          "**Problem**: 'Find 2nd degree connections who work at Google'. Costly self-joins in SQL.",
          "**Solution**: Graph model (Espresso/Liquid). Users = Nodes, Connections = Edges.",
          "**Traversal**: Start at User -> Follow 'connected_to' edges -> Follow 'works_at' edges -> Filter (Company='Google').",
          "**Efficiency**: Graph traversal is O(k) neighbors, SQL join is O(N) or O(log N) index lookups."
        ]
      }
    ],
    diagram: {
      title: "Data Model Comparison",
      nodes: [
        { id: "rel", type: "default", position: { x: 50, y: 100 }, data: { label: "Relational\n✓ Joins\n✓ ACID" }, style: { background: "#3b82f6", color: "white", padding: 20 } },
        { id: "doc", type: "default", position: { x: 280, y: 100 }, data: { label: "Document\n✓ Locality\n✓ Flexible" }, style: { background: "#10b981", color: "white", padding: 20 } },
        { id: "graph", type: "default", position: { x: 510, y: 100 }, data: { label: "Graph\n✓ Relationships\n✓ Traversal" }, style: { background: "#8b5cf6", color: "white", padding: 20 } },
      ],
      edges: [],
    },
  },
  {
    id: 3,
    title: "Storage and Retrieval",
    summary: "How databases store data on disk: Log-Structured (LSM-Trees) vs Page-Oriented (B-Trees). Analytical vs Transactional storage.",
    detailedContent: `Understanding the underlying storage engine is crucial for performance tuning. Is your DB optimized for writes (LSM) or reads (B-Tree)?`,
    keyPoints: [
      "**LSM-Trees (Log-Structured Merge)**: Append-only, sorted string tables (SSTables). Fast writes, background compaction",
      "**B-Trees**: Fixed-size pages (4KB), mutable. Most common index. Fast reads, good for updates",
      "**OLTP**: Row-oriented. Fast random access. (Postgres, MySQL)",
      "**OLAP**: Column-oriented. Fast aggregations over many rows. (Redshift, ClickHouse)"
    ],
    sections: [
      {
        title: "LSM-Tree Internals",
        content: "Writes -> MemTable (RAM) -> Flush to SSTable (Disk). Reads -> Check MemTable -> Check SSTables (Newest to Oldest). Bloom filters speed up lookups.",
        points: [
          "Used by: Kafka, Cassandra, RocksDB, LevelDB",
          "Pros: High write throughput (streaming write), better compression",
          "Cons: Read amplification (check many files), compaction overhead"
        ]
      },
      {
        title: "Deep Dive: LevelDB vs RocksDB",
        content: "The evolution of LSM engines.",
        points: [
          "**LevelDB (Google)**: Single-threaded compaction. Struggled on high-core servers.",
          "**RocksDB (Facebook)**: Fork of LevelDB. Optimized for SSDs and many cores.",
          "**Key Innovation**: Multi-threaded compaction, prefix bloom filters, column families.",
          "**Usage**: Underlying engine for CockroachDB, Kafka Streams, MySQL (MyRocks)."
        ]
      }
    ],
    diagram: {
      title: "LSM-Tree Write Path",
      nodes: [
        { id: "write", type: "default", position: { x: 50, y: 100 }, data: { label: "Write" }, style: { background: "#3b82f6", color: "white" } },
        { id: "mem", type: "default", position: { x: 200, y: 100 }, data: { label: "MemTable\n(RAM)" }, style: { background: "#dc2626", color: "white", border: "3px solid #ef4444" } },
        { id: "l0", type: "default", position: { x: 400, y: 50 }, data: { label: "L0 SSTable" }, style: { background: "#f59e0b", color: "white" } },
        { id: "l1", type: "default", position: { x: 400, y: 150 }, data: { label: "L1 SSTable" }, style: { background: "#10b981", color: "white" } },
      ],
      edges: [
        { id: "e1", source: "write", target: "mem", label: "Insert", animated: true },
        { id: "e2", source: "mem", target: "l0", label: "Flush", animated: true },
        { id: "e3", source: "l0", target: "l1", label: "Compact", animated: true, style: { strokeDasharray: "5,5" } },
      ],
    },
  },
  {
    id: 4,
    title: "Encoding and Evolution",
    summary: "Managing data changes over time. Schema evolution ensures old and new code can coexist during rolling upgrades.",
    detailedContent: `Data outlives code. We need formats that allow us to add fields (forward compatibility) and read old data (backward compatibility).`,
    keyPoints: [
      "**Text Formats**: JSON, XML, CSV. Human readable, verbose, weak schema",
      "**Binary Formats**: Protobuf, Thrift, Avro. Compact, strong schema, documentation embedded",
      "**Schema Registry**: Central store for schemas (critical for Avro/Kafka)",
      "**Modes**: Data in database, Data in transit (REST/RPC), Data in async msg (Kafka)"
    ],
    sections: [
      {
        title: "Schema Evolution Rules",
        points: [
          "Forward Compatibility: Old code reads new data (ignores new fields)",
          "Backward Compatibility: New code reads old data (handles missing fields)",
          "Rule: Only add optional fields (or with defaults). Never remove required fields.",
          "Don't change field tags/IDs in Protobuf/Thrift."
        ]
      },
      {
        title: "Deep Dive: Thrift vs Protobuf vs Avro",
        points: [
          "**Protobuf/Thrift**: Code generation. Schema defined in .proto/.thrift file. Field tags (1, 2, 3) map to data. Good for RPC.",
          "**Avro**: Schema stored separately (or in header). No field tags. Best for Hadoop/Data Lakes where schema changes per file.",
          "**Case Study**: Uber switched from JSON to Thrift for internal services to save bandwidth and enforce types."
        ]
      }
    ],
    diagram: {
      title: "Binary Encoding Savings",
      nodes: [
        { id: "json", type: "default", position: { x: 100, y: 100 }, data: { label: "JSON\nKeys in every record\nBig String" }, style: { background: "#f59e0b", color: "white" } },
        { id: "proto", type: "default", position: { x: 350, y: 100 }, data: { label: "Protobuf\nField Tags (Int)\nSmall Binary" }, style: { background: "#3b82f6", color: "white" } },
      ],
      edges: [
        { id: "e1", source: "json", target: "proto", label: "Schema Extraction", animated: true },
      ],
    },
  },
  {
    id: 5,
    title: "Replication",
    summary: "Keeping a copy of data on multiple machines. Types: Single-Leader, Multi-Leader, and Leaderless.",
    detailedContent: `Replication provides high availability (keep serving if node fails), latency reduction (geo-locality), and scalability (read replicas).`,
    keyPoints: [
      "**Single-Leader**: All writes to leader. Simple. Leader is bottleneck/SPOF",
      "**Multi-Leader**: Writes to any leader. Good for multi-datacenter. Conflict resolution hard",
      "**Leaderless**: Writes to quorum (W nodes). Dynamo-style. no failover needed",
      "**Replication Lag**: Async replication leads to stale reads. Solutions: Monotonic reads, Read-your-writes"
    ],
    sections: [
      {
        title: "Replication Lag Problems",
        content: "User updates profile, refreshes page, sees old profile. Why? Read went to lagging follower.",
        points: [
          "Read-after-write consistency: User always sees their own updates (read own data from leader).",
          "Monotonic reads: User never sees time move backward (sticky session to one replica).",
          "Consistent prefix: No causal violations (seeing answer before question)."
        ]
      },
      {
        title: "Deep Dive: Amazon DynamoDB (Leaderless)",
        content: "How Dynamo handles failure without a leader.",
        points: [
          "**Sloppy Quorum**: If N=3, W=2, R=2. Write to top 2 available nodes in preference list.",
          "**Hinted Handoff**: If target node down, write to neighbor with a 'hint' to send back later.",
          "**Read Repair**: On read, if replicas disagree, return latest version and fix stale ones in background.",
          "**Merkle Trees**: Anti-entropy mechanism to efficiently sync widely different replicas."
        ]
      }
    ],
    diagram: {
      title: "Replication Topologies",
      nodes: [
        { id: "sl", type: "default", position: { x: 150, y: 50 }, data: { label: "Single Leader\nSimple, popular" }, style: { background: "#3b82f6", color: "white" } },
        { id: "ml", type: "default", position: { x: 150, y: 130 }, data: { label: "Multi-Leader\nComplex conflicts" }, style: { background: "#f59e0b", color: "white" } },
        { id: "ll", type: "default", position: { x: 150, y: 210 }, data: { label: "Leaderless\nQuorums (W+R>N)" }, style: { background: "#10b981", color: "white" } },
      ],
      edges: [],
    },
  }
];
