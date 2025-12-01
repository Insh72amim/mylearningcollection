// Enhanced DDIA Book - Chapter data  (Chapters 6-12)
// This is a data file to be imported into DDIABook.jsx

export const chapters6to12 = [
  {
    id: 6,
    title: 'Partitioning',
    summary: 'Breaking up a large dataset into smaller subsets called partitions (or shards). Essential for scalability when data doesn\'t fit on single machine.',
    detailedContent: `The goal of partitioning is to spread data and query load evenly across multiple machines, avoiding hot spots where some partitions get more load than others.`,
    keyPoints: [
      '**Key-range partitioning**: Keeps related keys together but risks hot spots if access pattern is skewed',
      '**Hash partitioning**: Distributes keys evenly using hash function, but destroys ordering',
      '**Secondary indexes**: Document-partitioned (local) vs term-partitioned (global) secondary indexes',
      '**Rebalancing**: Moving data between nodes when adding/removing machines'
    ],
    sections: [
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
        title: 'Rebalancing Partitions',
        points: [
          'Hash mod N: Don\'t use, moves too much data when N changes',
          'Fixed number of partitions: Create more partitions than nodes, move whole partitions',
          'Dynamic partitioning: Split partitions when they grow too large (HBase, RethinkDB)',
          'Automatic vs manual: Fully automatic can be unpredictable in production'
        ]
      }
    ],
    diagram: {
      title: 'Hash Partitioning with Consistent Hashing',
      nodes: [
        { id: 'client', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Client' }, style: { background: '#6366f1', color: 'white', padding: 15 } },
        { id: 'hash', type: 'default', position: { x: 200, y: 150 }, data: { label: 'Hash(key)' }, style: { background: '#f59e0b', color: 'white', padding: 15 } },
        { id: 'p1', type: 'default', position: { x: 400, y: 50 }, data: { label: 'Partition 1\n(0-333)' }, style: { background: '#10b981', color: 'white', padding: 12, fontSize: 12 } },
        { id: 'p2', type: 'default', position: { x: 400, y: 150 }, data: { label: 'Partition 2\n(334-666)' }, style: { background: '#3b82f6', color: 'white', padding: 12, fontSize: 12 } },
        { id: 'p3', type: 'default', position: { x: 400, y: 250 }, data: { label: 'Partition 3\n(667-999)' }, style: { background: '#8b5cf6', color: 'white', padding: 12, fontSize: 12 } },
      ],
      edges: [
        { id: 'e1', source: 'client', target: 'hash', label: 'key', animated: true },
        { id: 'e2', source: 'hash', target: 'p1', animated: false, style: { strokeDasharray: '5,5' } },
        { id: 'e3', source: 'hash', target: 'p2', label: 'Route', animated: true },
        { id: 'e4', source: 'hash', target: 'p3', animated: false, style: { strokeDasharray: '5,5' } },
      ]
    }
  },
  {
    id: 7,
    title: 'Transactions',
    summary: 'Transactions group several reads and writes into one logical unit. Either entire transaction succeeds (commit) or fails (abort/rollback). Critical for data integrity.',
    detailedContent: `Transactions are an abstraction layer that allows applications to pretend certain concurrency problems and faults don't exist, simplifying error handling and making application code simpler.`,
    keyPoints: [
      '**ACID**: Atomicity (all-or-nothing), Consistency (invariants), Isolation (concurrency control), Durability (persistence)',
      '**Read Committed**: Most basic level. No dirty reads (uncommitted data), no dirty writes',
      '**Snapshot Isolation**: Each transaction reads from consistent snapshot. Prevents read skew',
      '**Serializability**: Strongest isolation. Equivalent to running transactions sequentially'
    ],
    sections: [
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
        title: 'Implementing Serializability',
        points: [
          'Two-Phase Locking (2PL): Readers block writers and vice versa. Deadlocks possible',
          'Serializable Snapshot Isolation (SSI): Optimistic concurrency. Detect conflicts, abort',
          'Actual Serial Execution: Single-threaded execution. Used by Redis, VoltDB',
          'Trade-offs: 2PL has worst-case latency, SSI has abort rate, serial has throughput limit'
        ]
      }
    ],
    diagram: {
      title: 'Isolation Level Hierarchy',
      nodes: [
        { id: 'uncommitted', type: 'default', position: { x: 250, y: 50 }, data: { label: 'Read Uncommitted\n⚠️ Dirty reads\n⚠️ Dirty writes' }, style: { background: '#dc2626', color: 'white', padding: 18, fontSize: 11 } },
        { id: 'committed', type: 'default', position: { x: 250, y: 140 }, data: { label: 'Read Committed\n✓ No dirty reads\n⚠️ Read skew' }, style: { background: '#f59e0b', color: 'white', padding: 18, fontSize: 11 } },
        { id: 'snapshot', type: 'default', position: { x: 250, y: 230 }, data: { label: 'Snapshot Isolation\n✓ Repeatable read\n⚠️ Write skew' }, style: { background: '#3b82f6', color: 'white', padding: 18, fontSize: 11 } },
        { id: 'serializable', type: 'default', position: { x: 250, y: 320 }, data: { label: 'Serializable\n✓ Full isolation\n✓ No anomalies' }, style: { background: '#10b981', color: 'white', padding: 18, fontSize: 11 } },
      ],
      edges: [
        { id: 'e1', source: 'uncommitted', target: 'committed', label: 'Stronger', animated: false },
        { id: 'e2', source: 'committed', target: 'snapshot', label: 'Stronger', animated: false },
        { id: 'e3', source: 'snapshot', target: 'serializable', label: 'Strongest', animated: false },
      ]
    }
  },
  {
    id: 8,
    title: 'The Trouble with Distributed Systems',
    summary: 'In distributed systems, many things can go wrong: networks can fail, clocks can drift, and processes can pause unexpectedly. Must design for partial failures.',
    detailedContent: `A defining characteristic of distributed systems is that things can fail independently. Partial failures are nondeterministic, making distributed systems fundamentally different from single-machine systems.`,
    keyPoints: [
      '**Network faults**: Packets can be lost, delayed, duplicated, or reordered. Network partitions can isolate nodes',
      '**Clock problems**: Clock skew between machines, clock jumping forward/backward, monotonic vs time-of-day clocks',
      '**Process pauses**: GC pauses, VM suspension, OS context switches, paging, CPU contention',
      '**Byzantine faults**: Nodes may behave arbitrarily (sending corrupted/malicious data). Blockchain addresses this'
    ],
    sections: [
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
        title: 'Unreliable Clocks',
        points: [
          'Time-of-day clocks: System.currentTimeMillis(). Can jump backward (NTP sync)',
          'Monotonic clocks: Guaranteed to move forward. Good for measuring duration, not timestamps',
          'Logical clocks: Lamport timestamps, vector clocks for ordering without physical time',
          'Google TrueTime API: Uses GPS and atomic clocks, provides confidence interval'
        ],
        example: {
          language: 'python',
          title: 'clock_issues.py',
          code: `import time

# BAD: Using time-of-day for timeouts
start = time.time()
do_something()
elapsed = time.time() - start  # Could be negative if clock adjusted!

# GOOD: Using monotonic clock
start = time.monotonic()
do_something()
elapsed = time.monotonic() - start  # Always positive

# Lamport Clock for ordering events
class LamportClock:
    def __init__(self):
        self.counter = 0
    
    def tick(self):
        self.counter += 1
        return self.counter
    
    def update(self, received_timestamp):
        self.counter = max(self.counter, received_timestamp) + 1
        return self.counter

# Happens-before relationship
node_a = LamportClock()
node_b = LamportClock()

t1 = node_a.tick()  # Event on A: counter = 1
# Send message with timestamp t1 to B
node_b.update(t1)    # B receives, counter = max(0, 1) + 1 = 2
t2 = node_b.tick()  # Event on B: counter = 3`
        }
      }
    ],
    diagram: {
      title: 'Network Partition Example',
      nodes: [
        { id: 'n1', type: 'default', position: { x: 100, y: 100 }, data: { label: 'Node 1' }, style: { background: '#10b981', color: 'white', padding: 15 } },
        { id: 'n2', type: 'default', position: { x: 100, y: 200 }, data: { label: 'Node 2' }, style: { background: '#10b981', color: 'white', padding: 15 } },
        { id: 'partition', type: 'default', position: { x: 300, y: 150 }, data: { label: '⚠️ Network\nPartition' }, style: { background: '#dc2626', color: 'white', padding: 20, fontSize: 13 } },
        { id: 'n3', type: 'default', position: { x: 500, y: 100 }, data: { label: 'Node 3' }, style: { background: '#3b82f6', color: 'white', padding: 15 } },
        { id: 'n4', type: 'default', position: { x: 500, y: 200 }, data: { label: 'Node 4' }, style: { background: '#3b82f6', color: 'white', padding: 15 } },
      ],
      edges: [
        { id: 'e1', source: 'n1', target: 'n2', label: 'OK', animated: false },
        { id: 'e2', source: 'n3', target: 'n4', label: 'OK', animated: false },
        { id: 'e3', source: 'n1', target: 'partition', label: 'X', animated: false, style: { stroke: '#dc2626', strokeDasharray: '5,5' } },
        { id: 'e4', source: 'partition', target: 'n3', label: 'X', animated: false, style: { stroke: '#dc2626', strokeDasharray: '5,5' } },
      ]
    }
  },
  {
    id: 9,
    title: 'Consistency and Consensus',
    summary: 'Fundamental problem in distributed systems: getting multiple nodes to agree on something. Consensus algorithms like Paxos and Raft enable fault-tolerant agreement.',
    detailedContent: `Consensus is one of the most important and fundamental problems in distributed computing. It allows distributed systems to make decisions even when some nodes fail.`,
    keyPoints: [
      '**Linearizability**: Strongest consistency guarantee. All operations appear to execute atomically in some order',
      '**Causality**: Preserves ordering of cause and effect. Weaker than linearizability but still useful',
      '**Consensus**: Nodes agree on single value. Used for leader election, atomic commit, state machine replication',
      '**CAP theorem**: Can\'t have Consistency + Availability during Partitions. Must choose 2 of 3'
    ],
    sections: [
      {
        title: 'Linearizability Explained',
        points: [
          'Operations appear instantaneous between invocation and completion',
          'Once read returns new value, all subsequent reads return that value or newer',
          'Recency guarantee: Reads see latest write, unlike eventual consistency',
          'Cost: Requires coordination between replicas, hurts performance'
        ]
      },
      {
        title: 'Consensus Algorithms',
        points: [
          'Raft: Leader election + log replication. Designed for understandability',
          'Paxos: Classic algorithm. Notoriously difficult to understand correctly',
          'Zab (ZooKeeper Atomic Broadcast): Used by Apache ZooKeeper',
          'All require majority quorum: f faults tolerable needs 2f+1 nodes'
        ],
        example: {
          language: 'python',
          title: 'raft_simplified.py',
          code: `class RaftNode:
    def __init__(self, node_id, all_nodes):
        self.node_id = node_id
        self.state = "FOLLOWER"  # FOLLOWER, CANDIDATE, LEADER
        self.current_term = 0
        self.voted_for = None
        self.log = []
        self.all_nodes = all_nodes
    
    def start_election(self):
        self.state = "CANDIDATE"
        self.current_term += 1
        self.voted_for = self.node_id
        votes = 1  # Vote for self
        
        for node in self.all_nodes:
            if node.request_vote(self.current_term, self.node_id):
                votes += 1
        
        if votes > len(self.all_nodes) // 2:
            self.become_leader()
    
    def become_leader(self):
        self.state = "LEADER"
        # Send heartbeats to all followers
        self.send_heartbeats()
    
    def replicate_entry(self, entry):
        if self.state != "LEADER":
            raise Exception("Only leader can replicate")
        
        self.log.append(entry)
        acks = 1  # Self
        
        # Send to all followers
        for node in self.all_nodes:
            if node.append_entry(entry, self.current_term):
                acks += 1
        
        # Commit when majority acknowledges
        if acks > len(self.all_nodes) // 2:
            self.commit_entry(entry)`
        }
      },
      {
        title: 'Two-Phase Commit (2PC)',
        points: [
          'Coordinator asks all participants to prepare (vote)',
          'If all vote yes, coordinator commits. If any no, abort',
          'Blocking protocol: If coordinator crashes after prepare, participants stuck',
          'Used in databases for distributed transactions (XA transactions)'
        ]
      }
    ],
    diagram: {
      title: 'Raft Leader Election',
      nodes: [
        { id: 'leader', type: 'default', position: { x: 300, y: 50 }, data: { label: '👑 Leader\n(Term 5)' }, style: { background: '#dc2626', color: 'white', padding: 20, border: '3px solid #ef4444' } },
        { id: 'f1', type: 'default', position: { x: 100, y: 180 }, data: { label: 'Follower 1' }, style: { background: '#3b82f6', color: 'white', padding: 15 } },
        { id: 'f2', type: 'default', position: { x: 300, y: 180 }, data: { label: 'Follower 2' }, style: { background: '#3b82f6', color: 'white', padding: 15 } },
        { id: 'f3', type: 'default', position: { x: 500, y: 180 }, data: { label: 'Follower 3' }, style: { background: '#3b82f6', color: 'white', padding: 15 } },
      ],
      edges: [
        { id: 'e1', source: 'leader', target: 'f1', label: 'Heartbeat', animated: true },
        { id: 'e2', source: 'leader', target: 'f2', label: 'Heartbeat', animated: true },
        { id: 'e3', source: 'leader', target: 'f3', label: 'Heartbeat', animated: true },
      ]
    }
  },
  {
    id: 10,
    title: 'Batch Processing',
    summary: 'Processing large volumes of data offline. MapReduce pioneered distributed batch processing. Modern successors like Spark and Flink offer more flexible dataflow models.',
    detailedContent: `Batch processing is about taking a large amount of input data, running a job to process it, and producing some output. Jobs often take minutes to hours.`,
    keyPoints: [
      '**MapReduce**: Map transforms each record, shuffle sorts by key, reduce aggregates values. Simple but inflexible',
      '**Dataflow engines**: Generalize MapReduce with operators like join, filter, groupBy (Spark, Flink, Tez)',
      '**Materialization**: Eager (write intermediate results to disk) vs lazy (keep in memory where possible)',
      '**Fault tolerance**: Recompute lost partitions using lineage (Spark RDDs) or checkpoint state'
    ],
    sections: [
      {
        title: 'MapReduce Workflow',
        points: [
          'Map: Read input partition, extract key-value pairs, write to local disk',
          'Shuffle: Sort and partition mapper output by key, transfer to reducers',
          'Reduce: Process all values for each key, write output',
          'Joins: Reduce-side join (sort-merge) or map-side join (broadcast/partition)'
        ],
        example: {
          language: 'python',
          title: 'word_count_mapreduce.py',
          code: `# MapReduce Word Count Example

def map_function(document):
    """Mapper: emit (word, 1) for each word"""
    for word in document.split():
        yield(word.lower(), 1)

def reduce_function(word, counts):
    """Reducer: sum all counts for a word"""
    return (word, sum(counts))

# Execution framework handles:
# 1. Partition input documents across mappers
# 2. Shuffle: Group all (word, count) pairs by word
# 3. Route to reducers
# 4. Sort input to each reducer by key

# Example flow:
# Input: "Hello World Hello"
# Map output: [("hello", 1), ("world", 1), ("hello", 1)]
# Shuffle & Sort: {"hello": [1, 1], "world": [1]}
# Reduce output: [("hello", 2), ("world", 1)]`
        }
      },
      {
        title: 'Spark Improvements over MapReduce',
        points: [
          'RDDs: Resilient Distributed Datasets kept in memory between stages',
          'DAG execution: Build entire dataflow graph before executing',
          'Lazy evaluation: Only materialize when action called (count, save)',
          '10-100x faster than MapReduce for iterative algorithms (ML, graph processing)'
        ]
      }
    ],
    diagram: {
      title: 'MapReduce Data Flow',
      nodes: [
        { id: 'input', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Input Files\n(HDFS)' }, style: { background: '#6366f1', color: 'white', padding: 15 } },
        { id: 'm1', type: 'default', position: { x: 200, y: 80 }, data: { label: 'Mapper 1' }, style: { background: '#10b981', color: 'white', padding: 12, fontSize: 12 } },
        { id: 'm2', type: 'default', position: { x: 200, y: 150 }, data: { label: 'Mapper 2' }, style: { background: '#10b981', color: 'white', padding: 12, fontSize: 12 } },
        { id: 'm3', type: 'default', position: { x: 200, y: 220 }, data: { label: 'Mapper 3' }, style: { background: '#10b981', color: 'white', padding: 12, fontSize: 12 } },
        { id: 'shuffle', type: 'default', position: { x: 350, y: 150 }, data: { label: 'Shuffle\n& Sort' }, style: { background: '#f59e0b', color: 'white', padding: 15 } },
        { id: 'r1', type: 'default', position: { x: 500, y: 100 }, data: { label: 'Reducer 1' }, style: { background: '#8b5cf6', color: 'white', padding: 12, fontSize: 12 } },
        { id: 'r2', type: 'default', position: { x: 500, y: 200 }, data: { label: 'Reducer 2' }, style: { background: '#8b5cf6', color: 'white', padding: 12, fontSize: 12 } },
        { id: 'output', type: 'default', position: { x: 650, y: 150 }, data: { label: 'Output Files' }, style: { background: '#6366f1', color: 'white', padding: 15 } },
      ],
      edges: [
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
  },
  {
    id: 11,
    title: 'Stream Processing',
    summary: 'Processing unbounded data streams in real-time. Event-driven systems that react to data as it arrives, rather than waiting for batch jobs.',
    detailedContent: `Stream processing is like batch processing but with unbounded input that arrives incrementally over time. You process events shortly after they happen, not hours later.`,
    keyPoints: [
      '**Message brokers**: Kafka (log-based, persistent), RabbitMQ (AMQP, in-memory queues)',
      '**Stream-table duality**: Stream is changelog of table, table is materialized view of stream',
      '**Windowing**: Tumbling (fixed), sliding (overlapping), session (gap-based) windows',
      '**Exactly-once semantics**: Idempotent writes, transactional writes, or atomic commit'
    ],
    sections: [
      {
        title: 'Kafka Architecture',
        points: [
          'Log-based broker: Messages stored on disk in append-only log',
          'Consumer groups: Consumers in same group split partitions',
          'Offset tracking: Each consumer tracks position in log',
          'Retention: Messages kept for configured period (e.g., 7 days), not deleted after read'
        ],
        example: {
          language: 'python',
          title: 'kafka_stream_processing.py',
          code: `from kafka import KafkaConsumer, KafkaProducer
import json

consumer = KafkaConsumer(
    'user-events',
    bootstrap_servers=['localhost:9092'],
    group_id='analytics-group',
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# Stream processing: Count events per user in 1-minute windows
from collections import defaultdict
import time

window_counts = defaultdict(int)
window_start = time.time()
WINDOW_SIZE = 60  # 1 minute

for message in consumer:
    event = message.value
    user_id = event['user_id']
    
    # Check if window has elapsed
    if time.time() - window_start > WINDOW_SIZE:
        # Emit window results
        for user, count in window_counts.items():
            producer.send('user-event-counts', {
                'user_id': user,
                'count': count,
                'window_start': window_start
            })
        
        # Reset window
        window_counts.clear()
        window_start = time.time()
    
    # Increment count for this user
    window_counts[user_id] += 1`
        }
      },
      {
        title: 'Windowing Types',
        points: [
          'Tumbling windows: Fixed-size, non-overlapping (00:00-00:05, 00:05-00:10)',
          'Sliding windows: Fixed-size, overlapping (00:00-00:05, 00:01-00:06)',
          'Session windows: Variable-size based on activity gap (shopping basket)',
          'Event time vs processing time: When event occurred vs when processed'
        ]
      },
      {
        title: 'Exactly-Once Processing',
        points: [
          'At-most-once: May lose messages (UDP-style)',
          'At-least-once: May duplicate messages (most message brokers)',
          'Exactly-once: Each message processed exactly once (requires idempotence or transactions)',
          'Kafka Streams: Exactly-once via idempotent producer + transactional reads/writes'
        ]
      }
    ],
    diagram: {
      title: 'Kafka Topic Partitions',
      nodes: [
        { id: 'producer', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Producer' }, style: { background: '#6366f1', color: 'white', padding: 15 } },
        { id: 'p0', type: 'default', position: { x: 250, y: 80 }, data: { label: 'Partition 0\n[0][1][2][3]' }, style: { background: '#10b981', color: 'white', padding: 15, fontSize: 11 } },
        { id: 'p1', type: 'default', position: { x: 250, y: 160 }, data: { label: 'Partition 1\n[0][1][2][3]' }, style: { background: '#10b981', color: 'white', padding: 15, fontSize: 11 } },
        { id: 'p2', type: 'default', position: { x: 250, y: 240 }, data: { label: 'Partition 2\n[0][1][2][3]' }, style: { background: '#10b981', color: 'white', padding: 15, fontSize: 11 } },
        { id: 'c1', type: 'default', position: { x: 500, y: 100 }, data: { label: 'Consumer 1\n(Group A)' }, style: { background: '#8b5cf6', color: 'white', padding: 12, fontSize: 11 } },
        { id: 'c2', type: 'default', position: { x: 500, y: 200 }, data: { label: 'Consumer 2\n(Group A)' }, style: { background: '#8b5cf6', color: 'white', padding: 12, fontSize: 11 } },
      ],
      edges: [
        { id: 'e1', source: 'producer', target: 'p0', animated: true },
        { id: 'e2', source: 'producer', target: 'p1', animated: true },
        { id: 'e3', source: 'producer', target: 'p2', animated: true },
        { id: 'e4', source: 'p0', target: 'c1', label: 'Read', animated: false },
        { id: 'e5', source: 'p1', target: 'c1', label: 'Read', animated: false },
        { id: 'e6', source: 'p2', target: 'c2', label: 'Read', animated: false },
      ]
    }
  },
  {
    id: 12,
    title: 'The Future of Data Systems',
    summary: 'Combining different tools into cohesive data platforms. Derived data, unbundling databases, and designing applications for evolvability and integrity.',
    detailedContent: `No single tool can efficiently serve all possible use cases. Applications are built as compositions of several different pieces of infrastructure: databases, caches, search indexes, message queues, batch/stream processors.`,
    keyPoints: [
      '**Derived data**: Datasets created from other data (caches, indexes, materialized views)',
      '**Lambda architecture**: Batch layer (complete, accurate) + speed layer (approximate, realtime)',
      '**Kappa architecture**: Everything is a stream, no separate batch layer',
      '**Data integrity**: End-to-end argument, checking constraints, auditing'
    ],
    sections: [
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
        title: 'Lambda vs Kappa Architecture',
        points: [
          'Lambda: Batch layer reprocesses everything, speed layer recent only, merge results',
          'Kappa: Single stream processing system, reprocess by replaying from Kafka',
          'Trade-off: Lambda has complexity of two systems, Kappa requires replayable stream',
          'Modern trend: Kappa with Kafka log retention or S3 archive'
        ],
        example: {
          language: 'python',
          title: 'event_sourcing.py',
          code: `# Event Sourcing Example
class BankAccount:
    def __init__(self, account_id):
        self.account_id = account_id
        self.balance = 0
        self.events = []
    
    def deposit(self, amount):
        event = {"type": "Deposited", "amount": amount}
        self.events.append(event)
        self.apply(event)
    
    def withdraw(self, amount):
        if self.balance >= amount:
            event = {"type": "Withdrew", "amount": amount}
            self.events.append(event)
            self.apply(event)
        else:
            raise ValueError("Insufficient funds")
    
    def apply(self, event):
        if event["type"] == "Deposited":
            self.balance += event["amount"]
        elif event["type"] == "Withdrew":
            self.balance -= event["amount"]
    
    def rebuild_from_events(self, events):
        """Rebuild state from event log"""
        self.balance = 0
        for event in events:
            self.apply(event)

# Usage
account = BankAccount("ACC123")
account.deposit(100)
account.withdraw(30)

# Can rebuild state anytime
new_account = BankAccount("ACC123")
new_account.rebuild_from_events(account.events)
print(new_account.balance)  # 70`
        }
      },
      {
        title: 'End-to-End Data Integrity',
        points: [
          'Application-level checksums: Don\'t trust infrastructure alone',
          'Immutable events: Easier to debug and audit than mutations',
          'Idempotence: Make operations safe to retry',
          'Compensating transactions: Undo operations if business rule violated later'
        ]
      }
    ],
    diagram: {
      title: 'Lambda Architecture',
      nodes: [
        { id: 'data', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Data Stream' }, style: { background: '#6366f1', color: 'white', padding: 15 } },
        { id: 'batch', type: 'default', position: { x: 250, y: 80 }, data: { label: 'Batch Layer\n(Complete & Accurate)' }, style: { background: '#10b981', color: 'white', padding: 18 } },
        { id: 'speed', type: 'default', position: { x: 250, y: 200 }, data: { label: 'Speed Layer\n(Recent & Approximate)' }, style: { background: '#f59e0b', color: 'white', padding: 18 } },
        { id: 'serving', type: 'default', position: { x: 500, y: 140 }, data: { label: 'Serving Layer\n(Merge Results)' }, style: { background: '#8b5cf6', color: 'white', padding: 18 } },
      ],
      edges: [
        { id: 'e1', source: 'data', target: 'batch', label: 'All data', animated: false },
        { id: 'e2', source: 'data', target: 'speed', label: 'Recent data', animated: true },
        { id: 'e3', source: 'batch', target: 'serving', label: 'Batch views', animated: false },
        { id: 'e4', source: 'speed', target: 'serving', label: 'Realtime views', animated: true },
      ]
    }
  }
];
