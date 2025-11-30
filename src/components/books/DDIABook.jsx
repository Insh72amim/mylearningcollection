import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, User, Calendar } from 'lucide-react';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';

const DDIABook = () => {
  const [expandedChapters, setExpandedChapters] = useState({});

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const chapters = [
    {
      id: 1,
      title: 'Reliable, Scalable, and Maintainable Applications',
      summary: 'Introduction to the fundamental principles of data systems: reliability (working correctly even when faults occur), scalability (handling growth), and maintainability (enabling productive work by engineering teams).',
      keyPoints: [
        'Reliability: System continues to work correctly despite hardware faults, software errors, and human errors',
        'Scalability: Ability to cope with increased load through load parameters and performance metrics',
        'Maintainability: Operability, simplicity, and evolvability for long-term system health'
      ],
      diagram: null
    },
    {
      id: 2,
      title: 'Data Models and Query Languages',
      summary: 'Exploration of different data models (relational, document, graph) and their trade-offs. Covers SQL, NoSQL, and declarative vs imperative query languages.',
      keyPoints: [
        'Relational model: Tables with rows and columns, ACID transactions, SQL queries',
        'Document model: Schema flexibility, better locality for some access patterns (MongoDB, CouchDB)',
        'Graph model: Optimal for many-to-many relationships and complex interconnections (Neo4j)',
        'Declarative queries (SQL) vs Imperative code: Declarative hides implementation details'
      ],
      diagram: {
        title: 'Data Model Comparison',
        nodes: [
          { id: '1', type: 'default', position: { x: 50, y: 100 }, data: { label: 'Relational\n(PostgreSQL)' }, style: { background: '#3b82f6', color: 'white', border: '2px solid #60a5fa' } },
          { id: '2', type: 'default', position: { x: 300, y: 100 }, data: { label: 'Document\n(MongoDB)' }, style: { background: '#10b981', color: 'white', border: '2px solid #34d399' } },
          { id: '3', type: 'default', position: { x: 550, y: 100 }, data: { label: 'Graph\n(Neo4j)' }, style: { background: '#8b5cf6', color: 'white', border: '2px solid #a78bfa' } },
        ],
        edges: []
      }
    },
    {
      id: 3,
      title: 'Storage and Retrieval',
      summary: 'Deep dive into how databases store data on disk and retrieve it efficiently. Compares log-structured storage engines (LSM-trees) with page-oriented engines (B-trees).',
      keyPoints: [
        'Log-Structured Merge Trees (LSM): Append-only writes, background compaction (Cassandra, LevelDB)',
        'B-Trees: In-place updates, balanced tree structure, most common in relational DBs',
        'LSM advantages: Better write throughput, lower write amplification',
        'B-Tree advantages: Better read performance, each key exists in exactly one place'
      ],
      diagram: {
        title: 'B-Tree vs LSM-Tree',
        nodes: [
          { id: 'btree', type: 'default', position: { x: 100, y: 50 }, data: { label: 'B-Tree\n• In-place updates\n• Read-optimized' }, style: { background: '#2563eb', color: 'white', padding: 20, border: '2px solid #3b82f6' } },
          { id: 'lsm', type: 'default', position: { x: 100, y: 200 }, data: { label: 'LSM-Tree\n• Append-only\n• Write-optimized' }, style: { background: '#059669', color: 'white', padding: 20, border: '2px solid #10b981' } },
          { id: 'disk', type: 'default', position: { x: 450, y: 125 }, data: { label: 'Disk Storage' }, style: { background: '#475569', color: 'white', padding: 20 } },
        ],
        edges: [
          { id: 'e1', source: 'btree', target: 'disk', label: 'Page writes', animated: false },
          { id: 'e2', source: 'lsm', target: 'disk', label: 'Segment files', animated: false },
        ]
      }
    },
    {
      id: 4,
      title: 'Encoding and Evolution',
      summary: 'How data encoding and schema evolution work in distributed systems. Covers formats like JSON, XML, Protocol Buffers, Thrift, and Avro.',
      keyPoints: [
        'Forward compatibility: New code can read old data',
        'Backward compatibility: Old code can read new data',
        'Schema evolution: Adding/removing fields without breaking existing systems',
        'Binary encodings: More compact and faster than textual formats (Protobuf, Avro)'
      ],
      diagram: null
    },
    {
      id: 5,
      title: 'Replication',
      summary: 'Keeping copies of data on multiple machines for fault tolerance and scalability. Covers single-leader, multi-leader, and leaderless replication.',
      keyPoints: [
        'Single-leader replication: All writes go through one leader, reads from replicas (PostgreSQL, MySQL)',
        'Multi-leader replication: Multiple nodes accept writes, useful for multi-datacenter setups',
        'Leaderless replication: No leader, clients write to multiple nodes (Dynamo, Cassandra)',
        'Replication lag: Asynchronous replication trades consistency for availability'
      ],
      diagram: {
        title: 'Single-Leader Replication',
        nodes: [
          { id: 'client', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Client' }, style: { background: '#6366f1', color: 'white' } },
          { id: 'leader', type: 'default', position: { x: 250, y: 150 }, data: { label: 'Leader\n(Writes)' }, style: { background: '#dc2626', color: 'white', border: '3px solid #ef4444' } },
          { id: 'follower1', type: 'default', position: { x: 450, y: 80 }, data: { label: 'Follower 1\n(Read-only)' }, style: { background: '#059669', color: 'white' } },
          { id: 'follower2', type: 'default', position: { x: 450, y: 220 }, data: { label: 'Follower 2\n(Read-only)' }, style: { background: '#059669', color: 'white' } },
        ],
        edges: [
          { id: 'e1', source: 'client', target: 'leader', label: 'Write', animated: true },
          { id: 'e2', source: 'leader', target: 'follower1', label: 'Replicate', animated: true },
          { id: 'e3', source: 'leader', target: 'follower2', label: 'Replicate', animated: true },
        ]
      }
    },
    {
      id: 6,
      title: 'Partitioning',
      summary: 'Splitting data across multiple machines (also called sharding). Covers partitioning by key range, by hash, and dealing with skewed workloads.',
      keyPoints: [
        'Partitioning by key range: Keeps related keys together but risk of hot spots',
        'Partitioning by hash: Distributes load evenly but destroys key ordering',
        'Secondary indexes: Global vs local indexes, trade-offs for reads and writes',
        'Rebalancing: Moving data when adding/removing nodes'
      ],
      diagram: null
    },
    {
      id: 7,
      title: 'Transactions',
      summary: 'Ensuring data consistency with ACID guarantees. Covers isolation levels, weak isolation problems, and serializability.',
      keyPoints: [
        'ACID: Atomicity, Consistency, Isolation, Durability',
        'Read Committed: Prevents dirty reads and writes (most common default)',
        'Snapshot Isolation: Each transaction sees consistent snapshot (repeatable read)',
        'Serializability: Strongest isolation, transactions execute as if serial (2PL, SSI)'
      ],
      diagram: {
        title: 'Isolation Levels',
        nodes: [
          { id: '1', type: 'default', position: { x: 100, y: 50 }, data: { label: 'Read Uncommitted\n⚠️ Dirty reads' }, style: { background: '#dc2626', color: 'white', fontSize: 12 } },
          { id: '2', type: 'default', position: { x: 100, y: 150 }, data: { label: 'Read Committed\n✓ No dirty reads' }, style: { background: '#f59e0b', color: 'white', fontSize: 12 } },
          { id: '3', type: 'default', position: { x: 100, y: 250 }, data: { label: 'Repeatable Read\n✓ Snapshot isolation' }, style: { background: '#3b82f6', color: 'white', fontSize: 12 } },
          { id: '4', type: 'default', position: { x: 100, y: 350 }, data: { label: 'Serializable\n✓ Strongest guarantee' }, style: { background: '#059669', color: 'white', fontSize: 12 } },
        ],
        edges: [
          { id: 'e1', source: '1', target: '2', label: 'Stronger →', animated: false },
          { id: 'e2', source: '2', target: '3', label: 'Stronger →', animated: false },
          { id: 'e3', source: '3', target: '4', label: 'Stronger →', animated: false },
        ]
      }
    },
    {
      id: 8,
      title: 'The Trouble with Distributed Systems',
      summary: 'Reality of distributed systems: networks are unreliable, clocks are unreliable, and processes can pause. Covers failure detection, timeouts, and clock synchronization.',
      keyPoints: [
        'Network partitions: Messages can be lost, delayed, or duplicated',
        'Unbounded delays: No upper bound on message delivery time',
        'Clock skew: Clocks on different machines drift apart',
        'Process pauses: GC, VM suspension, OS scheduling can pause processes unexpectedly'
      ],
      diagram: null
    },
    {
      id: 9,
      title: 'Consistency and Consensus',
      summary: 'Achieving agreement in distributed systems. Covers linearizability, eventual consistency, consensus algorithms (Paxos, Raft), and coordination services (ZooKeeper).',
      keyPoints: [
        'Linearizability: Strongest consistency model, all operations appear atomic',
        'Consensus: Agreement on a single value despite failures (Paxos, Raft, ZAB)',
        'Total order broadcast: All nodes deliver messages in same order',
        'Distributed transactions: 2PC (blocking), 3PC (rarely used in practice)'
      ],
      diagram: null
    },
    {
      id: 10,
      title: 'Batch Processing',
      summary: 'Processing large amounts of data offline. Covers MapReduce, distributed filesystems, and dataflow engines like Spark.',
      keyPoints: [
        'MapReduce: Simple programming model for distributed batch processing',
        'HDFS: Distributed filesystem for storing large datasets',
        'Dataflow engines: More flexible than MapReduce (Spark, Flink, Tez)',
        'Materialization: Eager (MapReduce) vs lazy (Spark RDDs)'
      ],
      diagram: null
    },
    {
      id: 11,
      title: 'Stream Processing',
      summary: 'Processing data continuously as it arrives. Covers message brokers, stream processing frameworks, and event sourcing.',
      keyPoints: [
        'Message brokers: Kafka (log-based), RabbitMQ (AMQP)',
        'Stream processing: Flink, Kafka Streams, Apache Samza',
        'Windowing: Tumbling, hopping, sliding, session windows',
        'Exactly-once semantics: Idempotent writes, distributed transactions'
      ],
      diagram: null
    },
    {
      id: 12,
      title: 'The Future of Data Systems',
      summary: 'Combining different data systems into cohesive applications. Covers derived data, lambda and kappa architectures, and designing for maintainability.',
      keyPoints: [
        'Derived data: Systems of record vs derived views',
        'Lambda architecture: Batch + stream processing for completeness and low latency',
        'Kappa architecture: Everything is a stream',
        'Unbundling databases: Using specialized systems composed together'
      ],
      diagram: null
    }
  ];

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
              The essential guide to building reliable, scalable, and maintainable data systems. 
              This book explores the fundamental concepts and trade-offs in modern data architecture, 
              from storage engines to distributed systems consensus.
            </p>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6">Chapters</h2>
        {chapters.map((chapter) => (
          <div
            key={chapter.id}
            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-200 hover:border-gray-600"
          >
            {/* Chapter Header */}
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
            >
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
                <div>
                  <h4 className="text-md font-semibold text-white mb-2">Summary</h4>
                  <p className="text-gray-300 leading-relaxed">{chapter.summary}</p>
                </div>

                {/* Key Points */}
                <div>
                  <h4 className="text-md font-semibold text-white mb-3">Key Concepts</h4>
                  <ul className="space-y-2">
                    {chapter.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-300">
                        <span className="text-blue-400 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Diagram */}
                {chapter.diagram && (
                  <div>
                    <h4 className="text-md font-semibold text-white mb-3">Architecture Diagram</h4>
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
        <h3 className="text-xl font-semibold text-white mb-3">📚 Why Read This Book?</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex gap-2">
            <span className="text-blue-400">✓</span>
            <span>Understand the fundamental principles of distributed data systems</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">✓</span>
            <span>Learn about trade-offs between consistency, availability, and partition tolerance</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">✓</span>
            <span>Build better software by understanding how databases work internally</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400">✓</span>
            <span>Essential reading for backend engineers and data engineers</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DDIABook;
