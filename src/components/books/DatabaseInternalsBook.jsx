import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, User, Calendar } from 'lucide-react';
import InteractiveDiagram from '../common/InteractiveDiagram';

const DatabaseInternalsBook = () => {
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
      part: 'I',
      title: 'Introduction and Overview',
      summary: 'Introduction to database management systems architecture, covering DBMS vs SQL, database design considerations, and the separation of storage and compute.',
      keyPoints: [
        'DBMS architecture: Query processor, execution engine, storage engine',
        'Memory vs disk-based DBMS: Trade-offs between speed and durability',
        'Column vs row-oriented storage: OLTP vs OLAP workloads',
        'Data files and index files: Primary vs secondary indexes'
      ],
    },
    {
      id: 2,
      part: 'I',
      title: 'B-Tree Basics',
      summary: 'Deep dive into B-Trees, the most widely used data structure in databases. Covers tree structure, node splits, and search operations.',
      keyPoints: [
        'B-Tree properties: Self-balancing, sorted keys, logarithmic operations',
        'Node structure: Keys, values, and child pointers',
        'Search operation: O(log n) time complexity',
        'Insert and split: Maintaining balance through node splits'
      ],
      diagram: {
        title: 'B-Tree Structure',
        nodes: [
          { id: 'root', type: 'default', position: { x: 300, y: 50 }, data: { label: '[15, 30]' }, style: { background: '#2563eb', color: 'white', padding: 15, border: '2px solid #3b82f6' } },
          { id: 'left', type: 'default', position: { x: 100, y: 150 }, data: { label: '[5, 10]' }, style: { background: '#059669', color: 'white', padding: 15 } },
          { id: 'middle', type: 'default', position: { x: 300, y: 150 }, data: { label: '[20, 25]' }, style: { background: '#059669', color: 'white', padding: 15 } },
          { id: 'right', type: 'default', position: { x: 500, y: 150 }, data: { label: '[35, 40]' }, style: { background: '#059669', color: 'white', padding: 15 } },
        ],
        edges: [
          { id: 'e1', source: 'root', target: 'left', label: '< 15' },
          { id: 'e2', source: 'root', target: 'middle', label: '15-30' },
          { id: 'e3', source: 'root', target: 'right', label: '> 30' },
        ]
      }
    },
    {
      id: 3,
      part: 'I',
      title: 'File Formats',
      summary: 'How databases organize data on disk: page structure, slotted pages, cell layouts, and versioning.',
      keyPoints: [
        'Page structure: Fixed-size blocks (typically 4-16KB)',
        'Slotted pages: Variable-length records with indirection',
        'Cell layout: Keys, values, and overflow pages',
        'Checksums: Detecting corruption through CRC'
      ],
    },
    {
      id: 4,
      part: 'I',
      title: 'Implementing B-Trees',
      summary: 'Practical B-Tree implementation details: page headers, binary search within nodes, propagating splits, and merging underflowing nodes.',
      keyPoints: [
        'Page header: Magic number, page type, number of cells',
        'Binary search: Locating keys within a node',
        'Node splits: Rebalancing when nodes overflow',
        'Merges and redistributions: Handling underflows'
      ],
    },
    {
      id: 5,
      part: 'I',
      title: 'Transaction Processing and Recovery',
      summary: 'ACID properties, write-ahead logging (WAL), checkpointing, and crash recovery mechanisms.',
      keyPoints: [
        'Write-Ahead Logging: Log changes before applying to database',
        'ARIES recovery: Analysis, Redo, Undo phases',
        'Checkpointing: Periodic snapshots to limit WAL replay',
        'Durability guarantees: fsync() and O_DIRECT flags'
      ],
    },
    {
      id: 6,
      part: 'I',
      title: 'B-Tree Variants',
      summary: 'Copy-on-Write B-Trees, lazy B-Trees, and other optimizations like prefix truncation and suffix truncation.',
      keyPoints: [
        'Copy-on-Write: Immutable trees (LMDB, SQLite)',
        'Lazy B-Trees: Buffering updates in memory',
        'FD-Trees: Fractional cascading for better performance',
        'Bw-Trees: Lock-free implementation using delta records'
      ],
    },
    {
      id: 7,
      part: 'I',
      title: 'Log-Structured Storage',
      summary: 'LSM-Trees and their components: memtable, SSTables, compaction strategies, and merge operations.',
      keyPoints: [
        'Memtable: In-memory sorted structure (skip list, red-black tree)',
        'SSTable: Sorted String Table on disk',
        'Compaction: Size-tiered vs leveled strategies',
        'Read amplification: Multiple levels to check for a key'
      ],
      diagram: {
        title: 'LSM-Tree Architecture',
        nodes: [
          { id: 'memtable', type: 'default', position: { x: 100, y: 50 }, data: { label: 'MemTable\n(In-Memory)' }, style: { background: '#dc2626', color: 'white', padding: 20, border: '2px solid #ef4444' } },
          { id: 'l0', type: 'default', position: { x: 350, y: 50 }, data: { label: 'L0' }, style: { background: '#f59e0b', color: 'white', padding: 15 } },
          { id: 'l1', type: 'default', position: { x: 350, y: 130 }, data: { label: 'L1' }, style: { background: '#3b82f6', color: 'white', padding: 15 } },
          { id: 'l2', type: 'default', position: { x: 350, y: 210 }, data: { label: 'L2' }, style: { background: '#8b5cf6', color: 'white', padding: 15 } },
        ],
        edges: [
          { id: 'e1', source: 'memtable', target: 'l0', label: 'Flush', animated: true },
          { id: 'e2', source: 'l0', target: 'l1', label: 'Compact', animated: true },
          { id: 'e3', source: 'l1', target: 'l2', label: 'Compact', animated: true },
        ]
      }
    },
    {
      id: 8,
      part: 'II',
      title: 'Introduction and Overview (Distributed Systems)',
      summary: 'Challenges in distributed systems: consistency, consensus, failure detection, and distributed transactions.',
      keyPoints: [
        'Consistency models: Linearizability, sequential, causal',
        'Failure models: Crash-stop, crash-recovery, Byzantine',
        'Distributed transactions: Two-phase commit (2PC)',
        'Time and order: Logical clocks (Lamport, Vector)'
      ],
    },
    {
      id: 9,
      part: 'II',
      title: 'Failure Detection',
      summary: 'Detecting failed nodes in distributed systems using heartbeats, timeouts, and failure detectors.',
      keyPoints: [
        'Heartbeat mechanisms: Periodic ping messages',
        'Timeout-based detection: Trade-off between false positives and detection time',
        'Phi Accrual Failure Detector: Continuous suspicion level',
        'Gossip protocols: Epidemic information dissemination'
      ],
    },
    {
      id: 10,
      part: 'II',
      title: 'Leader Election',
      summary: 'Algorithms for electing a leader among distributed processes: Bully algorithm, ring-based election, and ZooKeeper.',
      keyPoints: [
        'Bully algorithm: Highest ID wins',
        'Ring-based election: Tokens circulate around a ring',
        'Stable leader election: Using external coordination services',
        'Split-brain prevention: Fencing tokens and generation numbers'
      ],
    },
    {
      id: 11,
      part: 'II',
      title: 'Replication and Consistency',
      summary: 'Replication strategies, consistency guarantees, and quorum-based protocols.',
      keyPoints: [
        'Primary-backup replication: Single writer, multiple readers',
        'Chain replication: Sequential writes through a chain of nodes',
        'Quorum reads and writes: R + W > N for strong consistency',
        'Tunable consistency: Trading consistency for availability (Dynamo, Cassandra)'
      ],
    },
    {
      id: 12,
      part: 'II',
      title: 'Anti-Entropy and Dissemination',
      summary: 'Techniques for ensuring replicas converge: read repair, Merkle trees, and gossip protocols.',
      keyPoints: [
        'Read repair: Fix inconsistencies during reads',
        'Merkle trees: Efficient comparison of replica states',
        'Gossip protocols: Peer-to-peer state exchange',
        'Vector clocks: Tracking causality across replicas'
      ],
    },
    {
      id: 13,
      part: 'II',
      title: 'Distributed Transactions',
      summary: 'Making distributed transactions work: Two-Phase Commit (2PC), cohorts, and coordinator recovery.',
      keyPoints: [
        'Two-Phase Commit: Prepare and commit phases',
        'Coordinator: Orchestrates transaction across participants',
        'Blocking problem: Coordinator failure blocks participants',
        'Three-Phase Commit: Non-blocking but rarely used in practice'
      ],
    },
    {
      id: 14,
      part: 'II',
      title: 'Consensus',
      summary: 'Consensus algorithms for agreeing on values: Paxos, Raft, and their variants.',
      keyPoints: [
        'Paxos: Classic consensus algorithm (proposers, acceptors, learners)',
        'Raft: Understandable consensus with leader election and log replication',
        'Multi-Paxos: Optimized for multiple rounds of consensus',
        'Viewstamped Replication: Alternative to Paxos with similar properties'
      ],
      diagram: {
        title: 'Raft Consensus',
        nodes: [
          { id: 'leader', type: 'default', position: { x: 300, y: 50 }, data: { label: 'Leader' }, style: { background: '#dc2626', color: 'white', padding: 20, border: '3px solid #ef4444' } },
          { id: 'follower1', type: 'default', position: { x: 100, y: 180 }, data: { label: 'Follower 1' }, style: { background: '#3b82f6', color: 'white', padding: 20 } },
          { id: 'follower2', type: 'default', position: { x: 300, y: 180 }, data: { label: 'Follower 2' }, style: { background: '#3b82f6', color: 'white', padding: 20 } },
          { id: 'follower3', type: 'default', position: { x: 500, y: 180 }, data: { label: 'Follower 3' }, style: { background: '#3b82f6', color: 'white', padding: 20 } },
        ],
        edges: [
          { id: 'e1', source: 'leader', target: 'follower1', label: 'AppendEntries', animated: true },
          { id: 'e2', source: 'leader', target: 'follower2', label: 'AppendEntries', animated: true },
          { id: 'e3', source: 'leader', target: 'follower3', label: 'AppendEntries', animated: true },
        ]
      }
    }
  ];

  const partI = chapters.filter(ch => ch.part === 'I');
  const partII = chapters.filter(ch => ch.part === 'II');

  const renderChapters = (chapterList) => (
    chapterList.map((chapter) => (
      <div
        key={chapter.id}
        className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-200 hover:border-gray-600"
      >
        <button
          onClick={() => toggleChapter(chapter.id)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-600 text-white font-bold text-sm">
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

        {expandedChapters[chapter.id] && (
          <div className="px-6 pb-6 pt-2 border-t border-gray-700 space-y-6">
            <div>
              <h4 className="text-md font-semibold text-white mb-2">Summary</h4>
              <p className="text-gray-300 leading-relaxed">{chapter.summary}</p>
            </div>

            <div>
              <h4 className="text-md font-semibold text-white mb-3">Key Concepts</h4>
              <ul className="space-y-2">
                {chapter.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-300">
                    <span className="text-purple-400 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

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
    ))
  );

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-8 pb-20">
      {/* Book Header */}
      <div className="border-b border-gray-700 pb-8">
        <div className="flex items-start gap-6">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-xl shadow-2xl">
            <BookOpen className="w-16 h-16 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-3">
              Database Internals
            </h1>
            <div className="flex items-center gap-4 text-gray-400 mb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Alex Petrov</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>2019</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>14 Chapters</span>
              </div>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              A deep dive into how database systems work under the hood. Part I covers storage engines (B-Trees, LSM-Trees), 
              while Part II explores distributed systems concepts including consensus, replication, and distributed transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Part I: Storage Engines */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">Part I</span>
          Storage Engines
        </h2>
        {renderChapters(partI)}
      </div>

      {/* Part II: Distributed Systems */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">Part II</span>
          Distributed Systems
        </h2>
        {renderChapters(partII)}
      </div>

      {/* Footer */}
      <div className="mt-12 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-700/50">
        <h3 className="text-xl font-semibold text-white mb-3">📚 Why Read This Book?</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex gap-2">
            <span className="text-purple-400">✓</span>
            <span>Understand how databases store and retrieve data efficiently</span>
          </li>
          <li className="flex gap-2">
            <span className="text-purple-400">✓</span>
            <span>Learn the internals of B-Trees, LSM-Trees, and other storage structures</span>
          </li>
          <li className="flex gap-2">
            <span className="text-purple-400">✓</span>
            <span>Master distributed systems concepts: consensus, replication, and fault tolerance</span>
          </li>
          <li className="flex gap-2">
            <span className="text-purple-400">✓</span>
            <span>Essential reading for database engineers and systems programmers</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DatabaseInternalsBook;
