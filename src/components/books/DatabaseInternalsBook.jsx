import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, User, Calendar, AlertCircle, Zap, Database } from 'lucide-react';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';
import { dbInternalsChapters4to14 } from './db-internals-chapters-4-14';

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
      summary: 'Introduction to DBMS architecture: query processing, storage engines, and the fundamental distinction between OLTP and OLAP workloads.',
      detailedContent: 'Databases are layered systems. Understanding each layer—from SQL parsing to disk I/O—is crucial for building and tuning performant systems.',
      keyPoints: [
        '**DBMS Components**: Query parser → optimizer → execution engine → storage engine → disk I/O',
        '**Memory vs Disk**: In-memory DBs (Redis, VoltDB) trade durability for speed. Disk-based (PostgreSQL, MySQL) persist data',
        '**Row vs Column storage**: Row-oriented for OLTP (transactions), column-oriented for OLAP (analytics, aggregations)',
        '**Index structures**: B-Trees for general purpose, LSM-Trees for write-heavy, hash for key-value'
      ],
      sections: [
        {
          title: 'DBMS Architecture Layers',
          points: [
            'Transport layer: Client protocol handling (MySQL wire protocol, PostgreSQL protocol)',
            'Query processor: Parsing SQL, semantic analysis, query rewriting',
            'Query optimizer: Cost-based selection of execution plan (index scans, join algorithms)',
            'Execution engine: Iterators (Volcano model), vectorized execution',
            'Storage engine: Buffer pool management, page layout, indexing',
            'Recovery manager: Write-ahead logging (WAL), checkpointing, crash recovery'
          ]
        },
        {
          title: 'OLTP vs OLAP Comparison',
          content: 'Transactional workloads need fast point queries and updates. Analytical workloads scan large  datasets for aggregations.',
          points: [
            'OLTP: Row-oriented, B-Tree indexes, frequent small updates (e-commerce, banking)',
            'OLAP: Column-oriented (Parquet, ORC), compression, bulk scans (data warehousing)',
            'Hybrid (HTAP): Run analytics on transactional data (TiDB, CockroachDB)',
            'Separation: ETL from OLTP to OLAP data warehouse (traditional approach)'
          ]
        }
      ],
      diagram: {
        title: 'DBMS Architecture',
        nodes: [
          { id: 'client', type: 'default', position: { x: 300, y: 50 }, data: { label: 'SQL Client' }, style: { background: '#6366f1', color: 'white', padding: 15 } },
          { id: 'parser', type: 'default', position: { x: 300, y: 130 }, data: { label: 'Query Parser\n& Optimizer' }, style: { background: '#f59e0b', color: 'white', padding: 15, fontSize: 12 } },
          { id: 'engine', type: 'default', position: { x: 300, y: 220 }, data: { label: 'Execution\nEngine' }, style: { background: '#10b981', color: 'white', padding: 15, fontSize: 12 } },
          { id: 'storage', type: 'default', position: { x: 300, y: 310 }, data: { label: 'Storage\nEngine' }, style: { background: '#8b5cf6', color: 'white', padding: 15, fontSize: 12 } },
          { id: 'disk', type: 'default', position: { x: 300, y: 400 }, data: { label: 'Disk I/O' }, style: { background: '#475569', color: 'white', padding: 15 } },
        ],
        edges: [
          { id: 'e1', source: 'client', target: 'parser', label: 'SQL', animated: true },
          { id: 'e2', source: 'parser', target: 'engine', label: 'Plan', animated: false},
          { id: 'e3', source: 'engine', target: 'storage', label: 'Get/Put', animated: false },
          { id: 'e4', source: 'storage', target: 'disk', label: 'Read/Write', animated: false },
        ]
      }
    },
    {
      id: 2,
      part: 'I',
      title: 'B-Tree Basics',
      summary: 'B-Trees are self-balancing search trees optimized for disk I/O. Most databases use variants of B-Trees for indexing.',
      detailedContent: 'Unlike binary search trees, B-Trees have multiple keys per node (high fan-out), minimizing tree height and disk reads.',
      keyPoints: [
        '**Properties**: Sorted keys, logarithmic height O(log n), balanced (all leaves at same level)',
        '**Node structure**: Internal nodes store keys and child pointers, leaf nodes store keys and values',
        '**Operations**: Search is binary search within node then recurse. Insert may cause splits upward',
        '**Fan-out**: Number of children per node. Higher fan-out = shorter tree = fewer I/Os'
      ],
      sections: [
        {
          title: 'B-Tree Search Operation',
          content: 'Start at root. Binary search within node to find child pointer. Recurse until reaching leaf. O(log_F(N)) where F is fan-out.',
          example: {
            language: 'python',
            title: 'btree_search.py',
            code: `class BTreeNode:
    def __init__(self, is_leaf=False):
        self.keys = []
        self.children = []
        self.is_leaf = is_leaf
    
    def search(self, key):
        # Binary search within node
        i = 0
        while i < len(self.keys) and key > self.keys[i]:
            i += 1
        
        # Found key
        if i < len(self.keys) and key == self.keys[i]:
            return self
        
        # Key might be in subtree
        if self.is_leaf:
            return None  # Not found
        
        # Recurse to child
        return self.children[i].search(key)

# Example: Search in B-Tree of order 3
# Root: [10, 20]
#  /      |       \\
# [5,7]  [12,15]  [25,30]

# search(12) → Root → Middle child → Found
# search(100) → Root → Right child → Not found`
          }
        },
        {
          title: 'B-Tree Insertion and Splits',
          points: [
            'Insert key in appropriate leaf node (keep sorted order)',
            'If node overflows (> M-1 keys), split into two nodes',
            'Promote median key to parent, propagate split upward if needed',
            'If root splits, tree height increases by 1 (only way to grow)'
          ],
          example: {
            language: 'python',
            title: 'btree_insert.py',
            code: `def insert(self, key, value):
    if len(self.keys) < self.max_keys:
        # Simple case: Node has space
        self.keys.insert_sorted(key)
        self.values.insert_sorted(value)
    else:
        # Node is full, split required
        self.split_and_insert(key, value)

def split_and_insert(self, key, value):
    # Find median
    mid = len(self.keys) // 2
    median_key = self.keys[mid]
    
    # Create new right sibling
    right = BTreeNode()
    right.keys = self.keys[mid+1:]
    self.keys = self.keys[:mid]
    
    # Promote median to parent
    self.parent.insert_median(median_key, self, right)
    
    # Insert new key in appropriate half
    if key < median_key:
        self.insert(key, value)
    else:
        right.insert(key, value)`
          }
        }
      ],
      diagram: {
        title: 'B-Tree Structure (Order 3)',
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
      summary: 'How databases organize data files on disk: pages, slotted pages for variable-length records, and checksums for corruption detection.',
      detailedContent: 'Databases read/write data in fixed-size pages (typically 4KB-16KB), not individual records. This matches OS page size for efficient I/O.',
      keyPoints: [
        '**Page structure**: Header (metadata, checksum) + cell directory + free space + cells (records)',
        '**Slotted pages**: Indirection layer for variable-length records. Cells grow from end, directory from start',
        '**Overflow pages**: Large records that don\'t fit in single page are chained',
        '**Checksums**: CRC32 or xxHash to detect corruption. Stored in page header, verified on read'
      ],
      sections: [
        {
          title: 'Page Layout',
          points: [
            'Page header (64-128 bytes): Magic number, page type, LSN, checksum, free space pointer',
            'Cell directory: Array of offsets pointing to cells (records). Enables binary search',
            'Free space: Unused bytes between directory and cells',
            'Cells: Actual records, growing backward from end of page',
            'When directory meets cells, page is full → split or overflow'
          ]
        },
        {
          title: 'Slotted Page Example',
          content: 'PostgreSQL uses slotted pages. MySQL InnoDB uses similar structure with "supremum" and "infimum" records.',
          example: {
            language: 'c',
            title: 'page_structure.c',
            code: `struct PageHeader {
    uint32_t magic;           // 0xDEADBEEF
    uint16_t page_type;       // LEAF, INTERNAL, etc.
    uint16_t num_cells;       // Number of records
    uint16_t free_start;      // Offset to free space
    uint16_t free_end;        // End of free space
    uint64_t lsn;             // Log sequence number
    uint32_t checksum;        // CRC32 of page
};

struct SlotDirectory {
    uint16_t offsets[MAX_SLOTS];  // Offsets to cells
};

// Page layout (8KB example):
// [Header: 0-64]
// [Slot Directory: 64-128]
// [Free Space: 128-6000]
// [Cells: 6000-8192] (growing backward)

// Adding record:
// 1. Append cell to end
// 2. Add offset to directory
// 3. Update free_start and free_end`
          }
        }
      ],
      diagram: {
        title: 'Slotted Page Layout',
        nodes: [
          { id: 'header', type: 'default', position: { x: 100, y: 100 }, data: { label: 'Page Header\n64 bytes' }, style: { background: '#3b82f6', color: 'white', padding: 15, fontSize: 11 } },
          { id: 'directory', type: 'default', position: { x: 300, y: 100 }, data: { label: 'Cell Directory\nOffsets →' }, style: { background: '#10b981', color: 'white', padding: 15, fontSize: 11 } },
          { id: 'free', type: 'default', position: { x: 500, y: 100 }, data: { label: 'Free Space' }, style: { background: '#6b7280', color: 'white', padding: 15, fontSize: 11 } },
          { id: 'cells', type: 'default', position: { x: 700, y: 100 }, data: { label: '← Cells\nRecords' }, style: { background: '#8b5cf6', color: 'white', padding: 15, fontSize: 11 } },
        ],
        edges: []
      }
    }
  ];

  // Merge with chapters 4-14
  const allChapters = [...chapters, ...dbInternalsChapters4to14];
  
  const partI = allChapters.filter(ch => ch.part === 'I');
  const partII = allChapters.filter(ch => ch.part === 'II');

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
            {/* Summary */}
            <div className="bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-500">
              <h4 className="text-md font-semibold text-white mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Chapter Overview
              </h4>
              <p className="text-gray-300 leading-relaxed mb-2">{chapter.summary}</p>
              {chapter.detailedContent && (
                <p className="text-gray-400 text-sm italic mt-2">{chapter.detailedContent}</p>
              )}
            </div>

            {/* Key Points */}
            <div>
              <h4 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-400" />
                Key Concepts
              </h4>
              <ul className="space-y-2">
                {chapter.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-300">
                    <span className="text-purple-400 mt-1">•</span>
                    <span dangerouslySetInnerHTML={{ __html: point }} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Sections with Examples */}
            {chapter.sections && chapter.sections.map((section, idx) => (
              <div key={idx} className="bg-gray-900/50 p-5 rounded-lg border border-gray-700">
                <h5 className="text-lg font-semibold text-white mb-3">{section.title}</h5>
                {section.content && (
                  <p className="text-gray-300 mb-3">{section.content}</p>
                )}
                {section.points && (
                  <ul className="space-y-2 mb-3">
                    {section.points.map((point, pidx) => (
                      <li key={pidx} className="flex gap-2 text-sm text-gray-300">
                        <span className="text-purple-400">→</span>
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
