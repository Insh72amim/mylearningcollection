export const ddiaChaptersDetailed = [
  // --- Chapter 1 ---
  {
    id: 1,
    title: "Reliable, Scalable, and Maintainable Applications",
    summary: "Foundation of building data-intensive systems. Introduces three fundamental concerns: reliability, scalability, and maintainability.",
    keyPoints: [
      "**Reliability**: Tolerance to hardware faults (disk failures), software errors (bugs), and human errors (misconfiguration)",
      "**Scalability**: Describing load (requests/sec, read/write ratio), measuring performance (p50, p99 latencies)",
      "**Maintainability**: Operability (easy to run), Simplicity (easy to understand), Evolvability (easy to change)",
      "Cloud shifts focus from reducing fault occurrence (MTBF) to tolerating faults (MTTR)"
    ],
    sections: [
      {
        title: "Introduction",
        content: "Modern applications are increasingly data-intensive rather than compute-intensive. The biggest challenges usually relate to the amount of data, the complexity of data, and the speed at which it is changing."
      },
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
        title: "System Reliability Components",
        interactive: {
          title: "System Reliability Components",
          initialNodes: [
            { id: "app", type: "default", position: { x: 300, y: 50 }, data: { label: "Application" }, style: { background: "#3b82f6", color: "white", padding: 20 } },
            { id: "redundancy", type: "default", position: { x: 100, y: 180 }, data: { label: "Redundancy\n(Replication)" }, style: { background: "#10b981", color: "white", padding: 15 } },
            { id: "monitoring", type: "default", position: { x: 300, y: 180 }, data: { label: "Monitoring\n& Alerting" }, style: { background: "#f59e0b", color: "white", padding: 15 } },
            { id: "recovery", type: "default", position: { x: 500, y: 180 }, data: { label: "Auto Recovery\n(Failover)" }, style: { background: "#8b5cf6", color: "white", padding: 15 } },
          ],
          initialEdges: [
            { id: "e1", source: "app", target: "redundancy", animated: false },
            { id: "e2", source: "app", target: "monitoring", animated: false },
            { id: "e3", source: "app", target: "recovery", animated: false },
          ]
        }
      }
    ],
    deepDive: {
      title: "Twitter's Timeline Architecture",
      content: "**Approach 1 (Pull)**: User posts tweet to DB. When follower views timeline, query DB for all followees' tweets. Fast write, slow read (O(n) followers). Failed at scale.\n\n**Approach 2 (Push/Fan-out)**: User posts tweet. System pushes ID to every follower's home timeline cache. Fast read (O(1)), slow write (O(n) followers).\n\n**Hybrid Approach**: Push for normal users, Pull for celebrities (Justin Bieber). Avoids fan-out lag for users with millions of followers."
    }
  },
  // --- Chapter 2 ---
  {
    id: 2,
    title: "Data Models and Query Languages",
    summary: "Relational, document, and graph models each have their sweet spots. The data model dictates how we write software and think about problems.",
    keyPoints: [
      "**Relational Model**: Data in tables, foreign keys, joins, ACID. Best for many-to-many relationships",
      "**Document Model**: JSON/XML documents. Tree structure (one-to-many). Better locality, worse joins",
      "**Graph Model**: Nodes and edges. Best for highly interconnected data (social, fraud detection)",
      "**Schema-on-read (Dynamic)** vs **Schema-on-write (Static)**"
    ],
    sections: [
      {
        title: "Introduction",
        content: "The mismatch between object-oriented code and relational tables (impedance mismatch) drove the adoption of ORMs and NoSQL document stores."
      },
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
        title: "Data Model Comparison",
        interactive: {
          title: "Data Model Comparison",
          initialNodes: [
            { id: "rel", type: "default", position: { x: 50, y: 100 }, data: { label: "Relational\n✓ Joins\n✓ ACID" }, style: { background: "#3b82f6", color: "white", padding: 20 } },
            { id: "doc", type: "default", position: { x: 280, y: 100 }, data: { label: "Document\n✓ Locality\n✓ Flexible" }, style: { background: "#10b981", color: "white", padding: 20 } },
            { id: "graph", type: "default", position: { x: 510, y: 100 }, data: { label: "Graph\n✓ Relationships\n✓ Traversal" }, style: { background: "#8b5cf6", color: "white", padding: 20 } },
          ],
          initialEdges: [],
        }
      }
    ],
    deepDive: {
      title: "LinkedIn's Economic Graph",
      content: "**Problem**: 'Find 2nd degree connections who work at Google'. Costly self-joins in SQL.\n\n**Solution**: Graph model (Espresso/Liquid). Users = Nodes, Connections = Edges.\n\n**Traversal**: Start at User -> Follow 'connected_to' edges -> Follow 'works_at' edges -> Filter (Company='Google').\n\n**Efficiency**: Graph traversal is O(k) neighbors, SQL join is O(N) or O(log N) index lookups."
    }
  },
  // --- Chapter 3 ---
  {
    id: 3,
    title: "Storage and Retrieval",
    summary: "How databases store data on disk: Log-Structured (LSM-Trees) vs Page-Oriented (B-Trees). Analytical vs Transactional storage.",
    keyPoints: [
      "**LSM-Trees (Log-Structured Merge)**: Append-only, sorted string tables (SSTables). Fast writes, background compaction",
      "**B-Trees**: Fixed-size pages (4KB), mutable. Most common index. Fast reads, good for updates",
      "**OLTP**: Row-oriented. Fast random access. (Postgres, MySQL)",
      "**OLAP**: Column-oriented. Fast aggregations over many rows. (Redshift, ClickHouse)"
    ],
    sections: [
      {
        title: "Introduction",
        content: "Understanding the underlying storage engine is crucial for performance tuning. Is your DB optimized for writes (LSM) or reads (B-Tree)?"
      },
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
        title: "LSM-Tree Write Path",
        interactive: {
          title: "LSM-Tree Write Path",
          initialNodes: [
            { id: "write", type: "default", position: { x: 50, y: 100 }, data: { label: "Write" }, style: { background: "#3b82f6", color: "white" } },
            { id: "mem", type: "default", position: { x: 200, y: 100 }, data: { label: "MemTable\n(RAM)" }, style: { background: "#dc2626", color: "white", border: "3px solid #ef4444" } },
            { id: "l0", type: "default", position: { x: 400, y: 50 }, data: { label: "L0 SSTable" }, style: { background: "#f59e0b", color: "white" } },
            { id: "l1", type: "default", position: { x: 400, y: 150 }, data: { label: "L1 SSTable" }, style: { background: "#10b981", color: "white" } },
          ],
          initialEdges: [
            { id: "e1", source: "write", target: "mem", label: "Insert", animated: true },
            { id: "e2", source: "mem", target: "l0", label: "Flush", animated: true },
            { id: "e3", source: "l0", target: "l1", label: "Compact", animated: true, style: { strokeDasharray: "5,5" } },
          ],
        }
      }
    ],
    deepDive: {
      title: "LevelDB vs RocksDB",
      content: "**LevelDB (Google)**: Single-threaded compaction. Struggled on high-core servers.\n\n**RocksDB (Facebook)**: Fork of LevelDB. Optimized for SSDs and many cores.\n\n**Key Innovation**: Multi-threaded compaction, prefix bloom filters, column families.\n\n**Usage**: Underlying engine for CockroachDB, Kafka Streams, MySQL (MyRocks)."
    }
  },
  // --- Chapter 4 ---
  {
    id: 4,
    title: "Encoding and Evolution",
    summary: "Managing data changes over time. Schema evolution ensures old and new code can coexist during rolling upgrades.",
    keyPoints: [
      "**Text Formats**: JSON, XML, CSV. Human readable, verbose, weak schema",
      "**Binary Formats**: Protobuf, Thrift, Avro. Compact, strong schema, documentation embedded",
      "**Schema Registry**: Central store for schemas (critical for Avro/Kafka)",
      "**Modes**: Data in database, Data in transit (REST/RPC), Data in async msg (Kafka)"
    ],
    sections: [
      {
        title: "Introduction",
        content: "Data outlives code. We need formats that allow us to add fields (forward compatibility) and read old data (backward compatibility)."
      },
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
        title: "Binary Encoding Savings",
        interactive: {
          title: "Binary Encoding Savings",
          initialNodes: [
            { id: "json", type: "default", position: { x: 100, y: 100 }, data: { label: "JSON\nKeys in every record\nBig String" }, style: { background: "#f59e0b", color: "white" } },
            { id: "proto", type: "default", position: { x: 350, y: 100 }, data: { label: "Protobuf\nField Tags (Int)\nSmall Binary" }, style: { background: "#3b82f6", color: "white" } },
          ],
          initialEdges: [
            { id: "e1", source: "json", target: "proto", label: "Schema Extraction", animated: true },
          ],
        }
      }
    ],
    deepDive: {
      title: "Thrift vs Protobuf vs Avro",
      content: "**Protobuf/Thrift**: Code generation. Schema defined in .proto/.thrift file. Field tags (1, 2, 3) map to data. Good for RPC.\n\n**Avro**: Schema stored separately (or in header). No field tags. Best for Hadoop/Data Lakes where schema changes per file.\n\n**Case Study**: Uber switched from JSON to Thrift for internal services to save bandwidth and enforce types."
    }
  },
  // --- Chapter 5 ---
  {
    id: 5,
    title: "Replication",
    summary: "Keeping a copy of data on multiple machines. Types: Single-Leader, Multi-Leader, and Leaderless.",
    keyPoints: [
      "**Single-Leader**: All writes to leader. Simple. Leader is bottleneck/SPOF",
      "**Multi-Leader**: Writes to any leader. Good for multi-datacenter. Conflict resolution hard",
      "**Leaderless**: Writes to quorum (W nodes). Dynamo-style. no failover needed",
      "**Replication Lag**: Async replication leads to stale reads. Solutions: Monotonic reads, Read-your-writes"
    ],
    sections: [
      {
        title: "Introduction",
        content: "Replication provides high availability (keep serving if node fails), latency reduction (geo-locality), and scalability (read replicas)."
      },
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
        title: "Replication Topologies",
        interactive: {
          title: "Replication Topologies",
          initialNodes: [
            { id: "sl", type: "default", position: { x: 150, y: 50 }, data: { label: "Single Leader\nSimple, popular" }, style: { background: "#3b82f6", color: "white" } },
            { id: "ml", type: "default", position: { x: 150, y: 130 }, data: { label: "Multi-Leader\nComplex conflicts" }, style: { background: "#f59e0b", color: "white" } },
            { id: "ll", type: "default", position: { x: 150, y: 210 }, data: { label: "Leaderless\nQuorums (W+R>N)" }, style: { background: "#10b981", color: "white" } },
          ],
          initialEdges: [],
        }
      }
    ],
    deepDive: {
      title: "Amazon DynamoDB (Leaderless)",
      content: "**Sloppy Quorum**: If N=3, W=2, R=2. Write to top 2 available nodes in preference list.\n\n**Hinted Handoff**: If target node down, write to neighbor with a 'hint' to send back later.\n\n**Read Repair**: On read, if replicas disagree, return latest version and fix stale ones in background.\n\n**Merkle Trees**: Anti-entropy mechanism to efficiently sync widely different replicas."
    }
  },
  // --- Chapter 6 ---
  {
    id: 6,
    title: 'Partitioning',
    summary: 'Breaking up a large dataset into smaller subsets called partitions (or shards). Essential for scalability when data doesn\'t fit on single machine.',
    keyPoints: [
      '**Key-range partitioning**: Keeps related keys together but risks hot spots if access pattern is skewed',
      '**Hash partitioning**: Distributes keys evenly using hash function, but destroys ordering',
      '**Secondary indexes**: Document-partitioned (local) vs term-partitioned (global) secondary indexes',
      '**Rebalancing**: Moving data between nodes when adding/removing machines'
    ],
    sections: [
      {
        title: 'Introduction',
        content: "The goal of partitioning is to spread data and query load evenly across multiple machines, avoiding hot spots where some partitions get more load than others."
      },
      {
        title: 'Partitioning Strategies',
        points: [
          'Key-range: Like encyclopedia volumes (A-C, D-F). Good for range queries, bad for skew',
          'Hash: mod operation or consistent hashing. Even distribution, no range queries',
          'Hot spots: Celebrity user gets all requests to one partition (Twitter justin bieber problem)',
          'Skewed workload: Application-level techniques like adding random number to key'
        ]
      },
      {
        title: 'Secondary Index Partitioning',
        content: 'Secondary indexes don\'t map neatly to partitions. Two approaches:',
        points: [
          'Document-partitioned (local): Each partition maintains its own secondary index. Read queries must scatter-gather across all partitions',
          'Term-partitioned (global): Secondary index is also partitioned, but differently from primary key. Writes affect multiple partitions, reads efficient',
          'Trade-off: Write complexity vs read efficiency',
          'Elasticsearch uses term-partitioned, MongoDB uses document-partitioned'
        ]
      },
      {
        title: 'Hash Partitioning with Consistent Hashing',
        interactive: {
          title: 'Hash Partitioning with Consistent Hashing',
          initialNodes: [
            { id: 'client', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Client' }, style: { background: '#6366f1', color: 'white', padding: 15 } },
            { id: 'hash', type: 'default', position: { x: 200, y: 150 }, data: { label: 'Hash(key)' }, style: { background: '#f59e0b', color: 'white', padding: 15 } },
            { id: 'p1', type: 'default', position: { x: 400, y: 50 }, data: { label: 'Partition 1\n(0-333)' }, style: { background: '#10b981', color: 'white', padding: 12, fontSize: 12 } },
            { id: 'p2', type: 'default', position: { x: 400, y: 150 }, data: { label: 'Partition 2\n(334-666)' }, style: { background: '#3b82f6', color: 'white', padding: 12, fontSize: 12 } },
            { id: 'p3', type: 'default', position: { x: 400, y: 250 }, data: { label: 'Partition 3\n(667-999)' }, style: { background: '#8b5cf6', color: 'white', padding: 12, fontSize: 12 } },
          ],
          initialEdges: [
            { id: 'e1', source: 'client', target: 'hash', label: 'key', animated: true },
            { id: 'e2', source: 'hash', target: 'p1', animated: false, style: { strokeDasharray: '5,5' } },
            { id: 'e3', source: 'hash', target: 'p2', label: 'Route', animated: true },
            { id: 'e4', source: 'hash', target: 'p3', animated: false, style: { strokeDasharray: '5,5' } },
          ]
        }
      }
    ],
    deepDive: {
      title: "Discord's Ring Partitioning",
      content: "**Problem**: MongoDB shards were not balanced. Moving chunks was slow.\n\n**Solution**: Migrated to ScyllaDB (Cassandra compatible). Used consistent hashing (ring topology).\n\n**Result**: Each message ID has a hash. The hash maps to a token on the ring. Node with that token owns data.\n\n**Benefit**: Adding a node only moves 1/N data from neighbors, not full re-shuffle."
    }
  },
  // --- Chapter 7 ---
  {
    id: 7,
    title: 'Transactions',
    summary: 'Transactions group several reads and writes into one logical unit. Either entire transaction succeeds (commit) or fails (abort/rollback). Critical for data integrity.',
    keyPoints: [
      '**ACID**: Atomicity (all-or-nothing), Consistency (invariants), Isolation (concurrency control), Durability (persistence)',
      '**Read Committed**: Most basic level. No dirty reads (uncommitted data), no dirty writes',
      '**Snapshot Isolation**: Each transaction reads from consistent snapshot. Prevents read skew',
      '**Serializability**: Strongest isolation. Equivalent to running transactions sequentially'
    ],
    sections: [
      {
        title: 'Introduction',
        content: "Transactions are an abstraction layer that allows applications to pretend certain concurrency problems and faults don't exist, simplifying error handling and making application code simpler."
      },
      {
        title: 'Isolation Levels Explained',
        points: [
          'Read Uncommitted: Can see uncommitted writes from other transactions (rarely used)',
          'Read Committed: Can only see committed data. Still has problems like read skew',
          'Snapshot Isolation (Repeatable Read): Transaction sees consistent snapshot from start',
          'Serializable: Prevents all anomalies but has performance cost'
        ],
        example: {
          language: 'sql',
          title: 'isolation_demo.sql',
          code: `-- Read Skew Example (Prevented by Snapshot Isolation)
-- Transaction 1: Transfer $100 from account A to B
BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;
SELECT balance FROM accounts WHERE id = 'A';  -- Sees 500
UPDATE accounts SET balance = balance - 100 WHERE id = 'A';
-- Meanwhile Transaction 2 reads both accounts here
UPDATE accounts SET balance = balance + 100 WHERE id = 'B';
COMMIT;

-- Transaction 2: Read total balance
BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;
SELECT balance FROM accounts WHERE id = 'A';  -- Sees 400 (after deduction)
SELECT balance FROM accounts WHERE id = 'B';  -- Sees 200 (before addition)
-- Total is 600, missing $100! Read skew.
COMMIT;

-- WITH SNAPSHOT ISOLATION:
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SELECT balance FROM accounts WHERE id = 'A';  -- Sees 500
SELECT balance FROM accounts WHERE id = 'B';  -- Sees 200
-- Total is 700, consistent snapshot
COMMIT;`
        }
      },
      {
        title: 'Isolation Level Hierarchy',
        interactive: {
          title: 'Isolation Level Hierarchy',
          initialNodes: [
            { id: 'uncommitted', type: 'default', position: { x: 250, y: 50 }, data: { label: 'Read Uncommitted\n⚠️ Dirty reads\n⚠️ Dirty writes' }, style: { background: '#dc2626', color: 'white', padding: 18, fontSize: 11 } },
            { id: 'committed', type: 'default', position: { x: 250, y: 140 }, data: { label: 'Read Committed\n✓ No dirty reads\n⚠️ Read skew' }, style: { background: '#f59e0b', color: 'white', padding: 18, fontSize: 11 } },
            { id: 'snapshot', type: 'default', position: { x: 250, y: 230 }, data: { label: 'Snapshot Isolation\n✓ Repeatable read\n⚠️ Write skew' }, style: { background: '#3b82f6', color: 'white', padding: 18, fontSize: 11 } },
            { id: 'serializable', type: 'default', position: { x: 250, y: 320 }, data: { label: 'Serializable\n✓ Full isolation\n✓ No anomalies' }, style: { background: '#10b981', color: 'white', padding: 18, fontSize: 11 } },
          ],
          initialEdges: [
            { id: 'e1', source: 'uncommitted', target: 'committed', label: 'Stronger', animated: false },
            { id: 'e2', source: 'committed', target: 'snapshot', label: 'Stronger', animated: false },
            { id: 'e3', source: 'snapshot', target: 'serializable', label: 'Strongest', animated: false },
          ]
        }
      }
    ],
    deepDive: {
      title: "Google Spanner (TrueTime & 2PL)",
      content: "**Challenge**: Snapshot isolation across datacenters requires synchronized clocks. If clocks drift, you might read stale data.\n\n**Solution**: TrueTime API. Uses GPS + Atomic clocks. Returns [earliest, latest] time interval.\n\n**Commit Wait**: Transaction waits until \"latest\" time has definitely passed on all nodes before committing.\n\n**Result**: External consistency (Linearizability). Client A writes, tells Client B. Client B reads => Guaranteed to see A's write."
    }
  },
  // --- Chapter 8 ---
  {
    id: 8,
    title: 'The Trouble with Distributed Systems',
    summary: 'In distributed systems, many things can go wrong: networks can fail, clocks can drift, and processes can pause unexpectedly. Must design for partial failures.',
    keyPoints: [
      '**Network faults**: Packets can be lost, delayed, duplicated, or reordered. Network partitions can isolate nodes',
      '**Clock problems**: Clock skew between machines, clock jumping forward/backward, monotonic vs time-of-day clocks',
      '**Process pauses**: GC pauses, VM suspension, OS context switches, paging, CPU contention',
      '**Byzantine faults**: Nodes may behave arbitrarily (sending corrupted/malicious data). Blockchain addresses this'
    ],
    sections: [
      {
        title: "Introduction",
        content: "A defining characteristic of distributed systems is that things can fail independently. Partial failures are nondeterministic, making distributed systems fundamentally different from single-machine systems."
      },
      {
        title: 'Unreliable Networks',
        points: [
          'Asynchronous networks: No upper bound on message delay (unlike phone networks)',
          'Timeouts: Only way to detect failures, but choosing timeout is difficult',
          'Network congestion: Switch queues fill up, packet drops, TCP retransmissions',
          'Network partitions: Nodes can communicate with some nodes but not others (split brain)'
        ]
      },
      {
        title: 'Network Partition Example',
        interactive: {
          title: 'Network Partition Example',
          initialNodes: [
            { id: 'n1', type: 'default', position: { x: 100, y: 100 }, data: { label: 'Node 1' }, style: { background: '#10b981', color: 'white', padding: 15 } },
            { id: 'n2', type: 'default', position: { x: 100, y: 200 }, data: { label: 'Node 2' }, style: { background: '#10b981', color: 'white', padding: 15 } },
            { id: 'partition', type: 'default', position: { x: 300, y: 150 }, data: { label: '⚠️ Network\nPartition' }, style: { background: '#dc2626', color: 'white', padding: 20, fontSize: 13 } },
            { id: 'n3', type: 'default', position: { x: 500, y: 100 }, data: { label: 'Node 3' }, style: { background: '#3b82f6', color: 'white', padding: 15 } },
            { id: 'n4', type: 'default', position: { x: 500, y: 200 }, data: { label: 'Node 4' }, style: { background: '#3b82f6', color: 'white', padding: 15 } },
          ],
          initialEdges: [
            { id: 'e1', source: 'n1', target: 'n2', label: 'OK', animated: false },
            { id: 'e2', source: 'n3', target: 'n4', label: 'OK', animated: false },
            { id: 'e3', source: 'n1', target: 'partition', label: 'X', animated: false, style: { stroke: '#dc2626', strokeDasharray: '5,5' } },
            { id: 'e4', source: 'partition', target: 'n3', label: 'X', animated: false, style: { stroke: '#dc2626', strokeDasharray: '5,5' } },
          ]
        }
      }
    ],
    deepDive: {
      title: "Uber Ringpop (Failure Detection)",
      content: "**Gossip Protocol**: Nodes randomly ping neighbors. \"I am alive\".\n\n**Membership List**: Eventually consistent list of all active nodes.\n\n**Phi Accrual Failure Detector**: Instead of hard timeout (is node dead?), output a probability (P_failure = 0.99).\n\n**Benefit**: Adaptive to network conditions. If network is slow, P_failure rises slowly. Prevents false alarms during congestion."
    }
  },
  // --- Chapter 9 ---
  {
    id: 9,
    title: 'Consistency and Consensus',
    summary: 'Fundamental problem in distributed systems: getting multiple nodes to agree on something. Consensus algorithms like Paxos and Raft enable fault-tolerant agreement.',
    keyPoints: [
      '**Linearizability**: Strongest consistency guarantee. All operations appear to execute atomically in some order',
      '**Causality**: Preserves ordering of cause and effect. Weaker than linearizability but still useful',
      '**Consensus**: Nodes agree on single value. Used for leader election, atomic commit, state machine replication',
      '**CAP theorem**: Can\'t have Consistency + Availability during Partitions. Must choose 2 of 3'
    ],
    sections: [
      {
        title: "Introduction",
        content: "Consensus is one of the most important and fundamental problems in distributed computing. It allows distributed systems to make decisions even when some nodes fail."
      },
      {
        title: 'Consensus Algorithms',
        points: [
          'Raft: Leader election + log replication. Designed for understandability',
          'Paxos: Classic algorithm. Notoriously difficult to understand correctly',
          'Zab (ZooKeeper Atomic Broadcast): Used by Apache ZooKeeper',
          'All require majority quorum: f faults tolerable needs 2f+1 nodes'
        ]
      },
      {
        title: 'Raft Leader Election',
        interactive: {
          title: 'Raft Leader Election',
          initialNodes: [
            { id: 'leader', type: 'default', position: { x: 300, y: 50 }, data: { label: '👑 Leader\n(Term 5)' }, style: { background: '#dc2626', color: 'white', padding: 20, border: '3px solid #ef4444' } },
            { id: 'f1', type: 'default', position: { x: 100, y: 180 }, data: { label: 'Follower 1' }, style: { background: '#3b82f6', color: 'white', padding: 15 } },
            { id: 'f2', type: 'default', position: { x: 300, y: 180 }, data: { label: 'Follower 2' }, style: { background: '#3b82f6', color: 'white', padding: 15 } },
            { id: 'f3', type: 'default', position: { x: 500, y: 180 }, data: { label: 'Follower 3' }, style: { background: '#3b82f6', color: 'white', padding: 15 } },
          ],
          initialEdges: [
            { id: 'e1', source: 'leader', target: 'f1', label: 'Heartbeat', animated: true },
            { id: 'e2', source: 'leader', target: 'f2', label: 'Heartbeat', animated: true },
            { id: 'e3', source: 'leader', target: 'f3', label: 'Heartbeat', animated: true },
          ]
        }
      }
    ],
    deepDive: {
      title: "Zookeeper ZAB Protocol",
      content: "**Role**: Configuration management, naming service, distributed synchronization.\n\n**Atomic Broadcast**: ZAB guarantees total order. If message A is delivered before B on one node, it is delivered A then B on all nodes.\n\n**Use Case in Kafka**: Controller election. Who manages the partitions? Zookeeper decides. (Note: Kafka is moving to KRaft to remove this dependency)."
    }
  },
  // --- Chapter 10 ---
  {
    id: 10,
    title: 'Batch Processing',
    summary: 'Processing large volumes of data offline. MapReduce pioneered distributed batch processing. Modern successors like Spark and Flink offer more flexible dataflow models.',
    keyPoints: [
      '**MapReduce**: Map transforms each record, shuffle sorts by key, reduce aggregates values. Simple but inflexible',
      '**Dataflow engines**: Generalize MapReduce with operators like join, filter, groupBy (Spark, Flink, Tez)',
      '**Materialization**: Eager (write intermediate results to disk) vs lazy (keep in memory where possible)',
      '**Fault tolerance**: Recompute lost partitions using lineage (Spark RDDs) or checkpoint state'
    ],
    sections: [
      {
        title: "Introduction",
        content: "Batch processing is about taking a large amount of input data, running a job to process it, and producing some output. Jobs often take minutes to hours."
      },
      {
        title: 'MapReduce Workflow',
        points: [
          'Map: Read input partition, extract key-value pairs, write to local disk',
          'Shuffle: Sort and partition mapper output by key, transfer to reducers',
          'Reduce: Process all values for each key, write output',
          'Joins: Reduce-side join (sort-merge) or map-side join (broadcast/partition)'
        ]
      },
      {
        title: 'MapReduce Data Flow',
        interactive: {
          title: 'MapReduce Data Flow',
          initialNodes: [
            { id: 'input', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Input Files\n(HDFS)' }, style: { background: '#6366f1', color: 'white', padding: 15 } },
            { id: 'm1', type: 'default', position: { x: 200, y: 80 }, data: { label: 'Mapper 1' }, style: { background: '#10b981', color: 'white', padding: 12, fontSize: 12 } },
            { id: 'm2', type: 'default', position: { x: 200, y: 150 }, data: { label: 'Mapper 2' }, style: { background: '#10b981', color: 'white', padding: 12, fontSize: 12 } },
            { id: 'm3', type: 'default', position: { x: 200, y: 220 }, data: { label: 'Mapper 3' }, style: { background: '#10b981', color: 'white', padding: 12, fontSize: 12 } },
            { id: 'shuffle', type: 'default', position: { x: 350, y: 150 }, data: { label: 'Shuffle\n& Sort' }, style: { background: '#f59e0b', color: 'white', padding: 15 } },
            { id: 'r1', type: 'default', position: { x: 500, y: 100 }, data: { label: 'Reducer 1' }, style: { background: '#8b5cf6', color: 'white', padding: 12, fontSize: 12 } },
            { id: 'r2', type: 'default', position: { x: 500, y: 200 }, data: { label: 'Reducer 2' }, style: { background: '#8b5cf6', color: 'white', padding: 12, fontSize: 12 } },
            { id: 'output', type: 'default', position: { x: 650, y: 150 }, data: { label: 'Output Files' }, style: { background: '#6366f1', color: 'white', padding: 15 } },
          ],
          initialEdges: [
            { id: 'e1', source: 'input', target: 'm1', animated: false },
            { id: 'e2', source: 'input', target: 'm2', animated: false },
            { id: 'e3', source: 'input', target: 'm3', animated: false },
            { id: 'e4', source: 'm1', target: 'shuffle', animated: true },
            { id: 'e5', source: 'm2', target: 'shuffle', animated: true },
            { id: 'e6', source: 'm3', target: 'shuffle', animated: true },
            { id: 'e7', source: 'shuffle', target: 'r1', animated: false },
            { id: 'e8', source: 'shuffle', target: 'r2', animated: false },
            { id: 'e9', source: 'r1', target: 'output', animated: false },
            { id: 'e10', source: 'r2', target: 'output', animated: false },
          ]
        }
      }
    ],
    deepDive: {
      title: "Google's Original MapReduce",
      content: "**Context**: Google needed to index the entire web. Single machines were too slow.\n\n**Innovation**: Move computation to data (not data to computation). Run Map code where the file block sits in GFS.\n\n**Legacy**: Democratized \"Big Data\". Allowed non-experts to run massive parallel jobs without worrying about network sockets or partial failures."
    }
  },
  // --- Chapter 11 ---
  {
    id: 11,
    title: 'Stream Processing',
    summary: 'Processing unbounded data streams in real-time. Event-driven systems that react to data as it arrives, rather than waiting for batch jobs.',
    keyPoints: [
      '**Message brokers**: Kafka (log-based, persistent), RabbitMQ (AMQP, in-memory queues)',
      '**Stream-table duality**: Stream is changelog of table, table is materialized view of stream',
      '**Windowing**: Tumbling (fixed), sliding (overlapping), session (gap-based) windows',
      '**Exactly-once semantics**: Idempotent writes, transactional writes, or atomic commit'
    ],
    sections: [
      {
        title: "Introduction",
        content: "Stream processing is like batch processing but with unbounded input that arrives incrementally over time. You process events shortly after they happen, not hours later."
      },
      {
        title: 'Kafka Architecture',
        points: [
          'Log-based broker: Messages stored on disk in append-only log',
          'Consumer groups: Consumers in same group split partitions',
          'Offset tracking: Each consumer tracks position in log',
          'Retention: Messages kept for configured period (e.g., 7 days), not deleted after read'
        ]
      },
      {
        title: 'Kafka Topic Partitions',
        interactive: {
          title: 'Kafka Topic Partitions',
          initialNodes: [
            { id: 'producer', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Producer' }, style: { background: '#6366f1', color: 'white', padding: 15 } },
            { id: 'p0', type: 'default', position: { x: 250, y: 80 }, data: { label: 'Partition 0\n[0][1][2][3]' }, style: { background: '#10b981', color: 'white', padding: 15, fontSize: 11 } },
            { id: 'p1', type: 'default', position: { x: 250, y: 160 }, data: { label: 'Partition 1\n[0][1][2][3]' }, style: { background: '#10b981', color: 'white', padding: 15, fontSize: 11 } },
            { id: 'p2', type: 'default', position: { x: 250, y: 240 }, data: { label: 'Partition 2\n[0][1][2][3]' }, style: { background: '#10b981', color: 'white', padding: 15, fontSize: 11 } },
            { id: 'c1', type: 'default', position: { x: 500, y: 100 }, data: { label: 'Consumer 1\n(Group A)' }, style: { background: '#8b5cf6', color: 'white', padding: 12, fontSize: 11 } },
            { id: 'c2', type: 'default', position: { x: 500, y: 200 }, data: { label: 'Consumer 2\n(Group A)' }, style: { background: '#8b5cf6', color: 'white', padding: 12, fontSize: 11 } },
          ],
          initialEdges: [
            { id: 'e1', source: 'producer', target: 'p0', animated: true },
            { id: 'e2', source: 'producer', target: 'p1', animated: true },
            { id: 'e3', source: 'producer', target: 'p2', animated: true },
            { id: 'e4', source: 'p0', target: 'c1', label: 'Read', animated: false },
            { id: 'e5', source: 'p1', target: 'c1', label: 'Read', animated: false },
            { id: 'e6', source: 'p2', target: 'c2', label: 'Read', animated: false },
          ]
        }
      }
    ],
    deepDive: {
      title: "Kafka at LinkedIn",
      content: "**Problem**: Point-to-point connections (Metric -> DB, Log -> Hadoop, App -> App) created a mesh N^2 complexity.\n\n**Solution**: Unified Log. Everyone writes to Kafka. Everyone reads from Kafka.\n\n**Scale**: LinkedIn processes 7+ trillion messages per day.\n\n**Impact**: Decoupled producers and consumers. Allowed adding new consumers (e.g., real-time monitoring) without touching producers."
    }
  },
  // --- Chapter 12 ---
  {
    id: 12,
    title: 'The Future of Data Systems',
    summary: 'Combining different tools into cohesive data platforms. Derived data, unbundling databases, and designing applications for evolvability and integrity.',
    keyPoints: [
      '**Derived data**: Datasets created from other data (caches, indexes, materialized views)',
      '**Lambda architecture**: Batch layer (complete, accurate) + speed layer (approximate, realtime)',
      '**Kappa architecture**: Everything is a stream, no separate batch layer',
      '**Data integrity**: End-to-end argument, checking constraints, auditing'
    ],
    sections: [
      {
        title: "Introduction",
        content: "No single tool can efficiently serve all possible use cases. Applications are built as compositions of several different pieces of infrastructure: databases, caches, search indexes, message queues, batch/stream processors."
      },
      {
        title: 'Unbundling Databases',
        points: [
          'Traditional database: Index maintenance, replication, backup all integrated',
          'Unbundled: Separate systems for different needs (Redis cache, Elasticsearch search, Kafka events)',
          'Change Data Capture (CDC): Stream of database changes (binlog, logical decoding)',
          'Event sourcing: Store all changes as immutable events, rebuild state by replaying'
        ]
      },
      {
        title: 'Lambda Architecture',
        interactive: {
          title: 'Lambda Architecture',
          initialNodes: [
            { id: 'data', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Data Stream' }, style: { background: '#6366f1', color: 'white', padding: 15 } },
            { id: 'batch', type: 'default', position: { x: 250, y: 80 }, data: { label: 'Batch Layer\n(Complete & Accurate)' }, style: { background: '#10b981', color: 'white', padding: 18 } },
            { id: 'speed', type: 'default', position: { x: 250, y: 200 }, data: { label: 'Speed Layer\n(Recent & Approximate)' }, style: { background: '#f59e0b', color: 'white', padding: 18 } },
            { id: 'serving', type: 'default', position: { x: 500, y: 140 }, data: { label: 'Serving Layer\n(Merge Results)' }, style: { background: '#8b5cf6', color: 'white', padding: 18 } },
          ],
          initialEdges: [
            { id: 'e1', source: 'data', target: 'batch', label: 'All data', animated: false },
            { id: 'e2', source: 'data', target: 'speed', label: 'Recent data', animated: true },
            { id: 'e3', source: 'batch', target: 'serving', label: 'Batch views', animated: false },
            { id: 'e4', source: 'speed', target: 'serving', label: 'Realtime views', animated: true },
          ]
        }
      }
    ],
    deepDive: {
      title: "The Data Lakehouse",
      content: "**Data Warehouse**: Structured, clean, SQL (Snowflake). Expensive.\n\n**Data Lake**: Unstructured, cheap storage (S3), PySpark. messy.\n\n**Lakehouse (Databricks/Iceberg)**: Best of both. ACID transactions and SQL on top of cheap object storage files (Parquet).\n\n**Future**: Compute and Storage completely decoupled. Query engines (Trino) query static files directly."
    }
  }
];
