export const dbInternalsChapters = [
  {
    id: 1,
    part: "I",
    title: "Introduction and Overview",
    summary:
      "Introduction to DBMS architecture: query processing, storage engines, and the fundamental distinction between OLTP and OLAP workloads.",
    content:
      "Databases are layered systems. Understanding each layer—from SQL parsing to disk I/O—is crucial for building and tuning performant systems.",
    keyPoints: [
      "**DBMS Components**: Query parser → optimizer → execution engine → storage engine → disk I/O",
      "**Memory vs Disk**: In-memory DBs (Redis, VoltDB) trade durability for speed. Disk-based (PostgreSQL, MySQL) persist data",
      "**Row vs Column storage**: Row-oriented for OLTP (transactions), column-oriented for OLAP (analytics, aggregations)",
      "**Index structures**: B-Trees for general purpose, LSM-Trees for write-heavy, hash for key-value",
    ],
    sections: [
      {
        title: "DBMS Architecture Layers",
        points: [
          "Transport layer: Client protocol handling (MySQL wire protocol, PostgreSQL protocol)",
          "Query processor: Parsing SQL, semantic analysis, query rewriting",
          "Query optimizer: Cost-based selection of execution plan (index scans, join algorithms)",
          "Execution engine: Iterators (Volcano model), vectorized execution",
          "Storage engine: Buffer pool management, page layout, indexing",
          "Recovery manager: Write-ahead logging (WAL), checkpointing, crash recovery",
        ],
      },
      {
        title: "OLTP vs OLAP Comparison",
        content:
          "Transactional workloads need fast point queries and updates. Analytical workloads scan large  datasets for aggregations.",
        points: [
          "OLTP: Row-oriented, B-Tree indexes, frequent small updates (e-commerce, banking)",
          "OLAP: Column-oriented (Parquet, ORC), compression, bulk scans (data warehousing)",
          "Hybrid (HTAP): Run analytics on transactional data (TiDB, CockroachDB)",
          "Separation: ETL from OLTP to OLAP data warehouse (traditional approach)",
        ],
      },
    ],
    interactive: {
      title: "DBMS Architecture",
      nodes: [
        {
          id: "client",
          type: "default",
          position: { x: 300, y: 50 },
          data: { label: "SQL Client" },
          style: { background: "#6366f1", color: "white", padding: 15 },
        },
        {
          id: "parser",
          type: "default",
          position: { x: 300, y: 130 },
          data: { label: "Query Parser\n& Optimizer" },
          style: {
            background: "#f59e0b",
            color: "white",
            padding: 15,
            fontSize: 12,
          },
        },
        {
          id: "engine",
          type: "default",
          position: { x: 300, y: 220 },
          data: { label: "Execution\nEngine" },
          style: {
            background: "#10b981",
            color: "white",
            padding: 15,
            fontSize: 12,
          },
        },
        {
          id: "storage",
          type: "default",
          position: { x: 300, y: 310 },
          data: { label: "Storage\nEngine" },
          style: {
            background: "#8b5cf6",
            color: "white",
            padding: 15,
            fontSize: 12,
          },
        },
        {
          id: "disk",
          type: "default",
          position: { x: 300, y: 400 },
          data: { label: "Disk I/O" },
          style: { background: "#475569", color: "white", padding: 15 },
        },
      ],
      edges: [
        {
          id: "e1",
          source: "client",
          target: "parser",
          label: "SQL",
          animated: true,
        },
        {
          id: "e2",
          source: "parser",
          target: "engine",
          label: "Plan",
          animated: false,
        },
        {
          id: "e3",
          source: "engine",
          target: "storage",
          label: "Get/Put",
          animated: false,
        },
        {
          id: "e4",
          source: "storage",
          target: "disk",
          label: "Read/Write",
          animated: false,
        },
      ],
    },
  },
  {
    id: 2,
    part: "I",
    title: "B-Tree Basics",
    summary:
      "B-Trees are self-balancing search trees optimized for disk I/O. Most databases use variants of B-Trees for indexing.",
    content:
      "Unlike binary search trees, B-Trees have multiple keys per node (high fan-out), minimizing tree height and disk reads.",
    keyPoints: [
      "**Properties**: Sorted keys, logarithmic height O(log n), balanced (all leaves at same level)",
      "**Node structure**: Internal nodes store keys and child pointers, leaf nodes store keys and values",
      "**Operations**: Search is binary search within node then recurse. Insert may cause splits upward",
      "**Fan-out**: Number of children per node. Higher fan-out = shorter tree = fewer I/Os",
    ],
    sections: [
      {
        title: "B-Tree Search Operation",
        content:
          "Start at root. Binary search within node to find child pointer. Recurse until reaching leaf. O(log_F(N)) where F is fan-out.",
        example: {
          language: "python",
          title: "btree_search.py",
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
# search(100) → Root → Right child → Not found`,
        },
      },
      {
        title: "B-Tree Insertion and Splits",
        points: [
          "Insert key in appropriate leaf node (keep sorted order)",
          "If node overflows (> M-1 keys), split into two nodes",
          "Promote median key to parent, propagate split upward if needed",
          "If root splits, tree height increases by 1 (only way to grow)",
        ],
        example: {
          language: "python",
          title: "btree_insert.py",
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
        right.insert(key, value)`,
        },
      },
    ],
    interactive: {
      title: "B-Tree Structure (Order 3)",
      nodes: [
        {
          id: "root",
          type: "default",
          position: { x: 300, y: 50 },
          data: { label: "[15, 30]" },
          style: {
            background: "#2563eb",
            color: "white",
            padding: 15,
            border: "2px solid #3b82f6",
          },
        },
        {
          id: "left",
          type: "default",
          position: { x: 100, y: 150 },
          data: { label: "[5, 10]" },
          style: { background: "#059669", color: "white", padding: 15 },
        },
        {
          id: "middle",
          type: "default",
          position: { x: 300, y: 150 },
          data: { label: "[20, 25]" },
          style: { background: "#059669", color: "white", padding: 15 },
        },
        {
          id: "right",
          type: "default",
          position: { x: 500, y: 150 },
          data: { label: "[35, 40]" },
          style: { background: "#059669", color: "white", padding: 15 },
        },
      ],
      edges: [
        { id: "e1", source: "root", target: "left", label: "< 15" },
        { id: "e2", source: "root", target: "middle", label: "15-30" },
        { id: "e3", source: "root", target: "right", label: "> 30" },
      ],
    },
  },
  {
    id: 3,
    part: "I",
    title: "File Formats",
    summary:
      "How databases organize data files on disk: pages, slotted pages for variable-length records, and checksums for corruption detection.",
    content:
      "Databases read/write data in fixed-size pages (typically 4KB-16KB), not individual records. This matches OS page size for efficient I/O.",
    keyPoints: [
      "**Page structure**: Header (metadata, checksum) + cell directory + free space + cells (records)",
      "**Slotted pages**: Indirection layer for variable-length records. Cells grow from end, directory from start",
      "**Overflow pages**: Large records that don't fit in single page are chained",
      "**Checksums**: CRC32 or xxHash to detect corruption. Stored in page header, verified on read",
    ],
    sections: [
      {
        title: "Page Layout",
        points: [
          "Page header (64-128 bytes): Magic number, page type, LSN, checksum, free space pointer",
          "Cell directory: Array of offsets pointing to cells (records). Enables binary search",
          "Free space: Unused bytes between directory and cells",
          "Cells: Actual records, growing backward from end of page",
          "When directory meets cells, page is full → split or overflow",
        ],
      },
      {
        title: "Slotted Page Example",
        content:
          'PostgreSQL uses slotted pages. MySQL InnoDB uses similar structure with "supremum" and "infimum" records.',
        example: {
          language: "c",
          title: "page_structure.c",
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
// 3. Update free_start and free_end`,
        },
      },
    ],
    interactive: {
      title: "Slotted Page Layout",
      nodes: [
        {
          id: "header",
          type: "default",
          position: { x: 100, y: 100 },
          data: { label: "Page Header\n64 bytes" },
          style: {
            background: "#3b82f6",
            color: "white",
            padding: 15,
            fontSize: 11,
          },
        },
        {
          id: "directory",
          type: "default",
          position: { x: 300, y: 100 },
          data: { label: "Cell Directory\nOffsets →" },
          style: {
            background: "#10b981",
            color: "white",
            padding: 15,
            fontSize: 11,
          },
        },
        {
          id: "free",
          type: "default",
          position: { x: 500, y: 100 },
          data: { label: "Free Space" },
          style: {
            background: "#6b7280",
            color: "white",
            padding: 15,
            fontSize: 11,
          },
        },
        {
          id: "cells",
          type: "default",
          position: { x: 700, y: 100 },
          data: { label: "← Cells\nRecords" },
          style: {
            background: "#8b5cf6",
            color: "white",
            padding: 15,
            fontSize: 11,
          },
        },
      ],
      edges: [],
    },
  },
  {
    id: 4,
    part: "I",
    title: "Implementing B-Trees",
    summary:
      "Practical B-Tree implementation: page headers, binary search within nodes, propagating splits upward, and merging underflowing nodes.",
    content:
      "Real databases don't implement textbook B-Trees. They add optimizations like prefix compression, bulk loading, and lazy deletion.",
    keyPoints: [
      "**Page header**: Stores metadata (page ID, parent pointer, level, number of keys)",
      "**Binary search**: Find position in sorted key array using binary search algorithm",
      "**Split propagation**: When leaf splits, insert separator into parent. Parent may split recursively",
      "**Underflow handling**: Merge with sibling or redistribute keys when node has too few entries",
    ],
    sections: [
      {
        title: "B-Tree Node Structure",
        example: {
          language: "c",
          title: "btree_node.c",
          code: `struct BTreeNode {
    uint32_t page_id;
    uint32_t parent_id;
    uint16_t num_keys;
    uint16_t level;        // 0 for leaf, >0 for internal
    bool is_leaf;
    
    // Keys array (sorted)
    KeyType keys[ORDER - 1];
    
    // For internal nodes: child page IDs
    // For leaf nodes: value offsets or pointers
    union {
        uint32_t children[ORDER];      // Internal node
        ValueType values[ORDER - 1];   // Leaf node
    };
};

// Binary search within node
int find_key_position(BTreeNode *node, KeyType key) {
    int left = 0, right = node->num_keys - 1;
    
    while (left <= right) {
        int mid = (left + right) / 2;
        if (node->keys[mid] == key)
            return mid;
        else if (key < node->keys[mid])
            right = mid - 1;
        else
            left = mid + 1;
    }
    
    return left;  // Position to insert
}`,
        },
      },
      {
        title: "Optimizations",
        points: [
          "Prefix compression: Store common prefix once, save space (InnoDB does this)",
          "Suffix truncation: Internal nodes only need separator, not full key",
          "Bulk loading: Build tree bottom-up for sorted input (faster than insertions)",
          "Lazy deletion: Mark as deleted instead of immediate removal, compact later",
        ],
      },
    ],
    interactive: {
      title: "B-Tree Node Split",
      nodes: [
        {
          id: "before",
          type: "default",
          position: { x: 150, y: 100 },
          data: { label: "Full Node\n[5,10,15,20]" },
          style: {
            background: "#dc2626",
            color: "white",
            padding: 15,
            fontSize: 12,
          },
        },
        {
          id: "arrow",
          type: "default",
          position: { x: 350, y: 100 },
          data: { label: "Split at 15 →" },
          style: {
            background: "#374151",
            color: "white",
            padding: 12,
            fontSize: 11,
          },
        },
        {
          id: "left",
          type: "default",
          position: { x: 530, y: 50 },
          data: { label: "[5, 10]" },
          style: {
            background: "#10b981",
            color: "white",
            padding: 12,
            fontSize: 12,
          },
        },
        {
          id: "right",
          type: "default",
          position: { x: 530, y: 150 },
          data: { label: "[20]" },
          style: {
            background: "#10b981",
            color: "white",
            padding: 12,
            fontSize: 12,
          },
        },
        {
          id: "promoted",
          type: "default",
          position: { x: 700, y: 100 },
          data: { label: "15 promoted\nto parent" },
          style: {
            background: "#3b82f6",
            color: "white",
            padding: 12,
            fontSize: 11,
          },
        },
      ],
      edges: [],
    },
  },
  {
    id: 5,
    part: "I",
    title: "Transaction Processing and Recovery",
    summary:
      "ACID transactions, write-ahead logging (WAL), checkpointing, and ARIES crash recovery algorithm.",
    content:
      "Durability requires writing changes to disk before acknowledging. WAL ensures atomicity and durability without writing data pages immediately.",
    keyPoints: [
      "**Write-Ahead Logging (WAL)**: Log records written before data pages. Enables fast commits",
      "**ARIES recovery**: Analysis (determine dirty pages), Redo (replay log), Undo (rollback uncommitted)",
      "**Checkpointing**: Flush dirty pages periodically. Limits log replay needed after crash",
      "**Log sequence number (LSN)**: Monotonically increasing ID for log records. Tracks page state",
    ],
    sections: [
      {
        title: "Write-Ahead Logging Protocol",
        points: [
          "Before modifying page, write log record to WAL buffer",
          "Force WAL to disk before data page (durability guarantee)",
          "Transaction commits only after its log records persisted",
          "Log records: <LSN, TxID, PageID, Redo, Undo> information",
        ],
        example: {
          language: "python",
          title: "wal_example.py",
          code: `class WALManager:
    def __init__(self):
        self.log_buffer = []
        self.last_lsn = 0
        self.checkpoint_lsn = 0
    
    def write_log(self, tx_id, page_id, old_value, new_value):
        self.last_lsn += 1
        log_record = {
            'lsn': self.last_lsn,
            'tx_id': tx_id,
            'page_id': page_id,
            'undo': old_value,  # For rollback
            'redo': new_value   # For crash recovery
        }
        self.log_buffer.append(log_record)
        return self.last_lsn
    
    def flush_log(self):
        # Force WAL buffer to disk (fsync)
        with open('wal.log', 'a') as f:
            for record in self.log_buffer:
                f.write(json.dumps(record) + '\\n')
            f.flush()
            os.fsync(f.fileno())  # Force to disk
        self.log_buffer = []
    
    def commit_transaction(self, tx_id):
        # 1. Write commit record
        commit_lsn = self.write_log(tx_id, None, None, None)
        
        # 2. Force WAL to disk
        self.flush_log()
        
        # Transaction is now durable!
        return commit_lsn

# Example:
wal = WALManager()
tx_id = 123

# Update a record
lsn1 = wal.write_log(tx_id, page_id=42, old_value=100, new_value=150)
lsn2 = wal.write_log(tx_id, page_id=43, old_value=200, new_value=250)

# Commit
wal.commit_transaction(tx_id)  # Fsync happens here`,
        },
      },
      {
        title: "ARIES Recovery Algorithm",
        points: [
          "Analysis: Scan log forward from last checkpoint, build dirty page table",
          "Redo: Replay all changes from smallest dirty page LSN. Idempotent",
          "Undo: Rollback uncommitted transactions backward through log",
          "Checkpoint: Periodically write dirty pages, create checkpoint record",
        ],
      },
    ],
    interactive: {
      title: "Write-Ahead Logging Flow",
      nodes: [
        {
          id: "tx",
          type: "default",
          position: { x: 50, y: 150 },
          data: { label: "Transaction" },
          style: { background: "#6366f1", color: "white", padding: 15 },
        },
        {
          id: "wal",
          type: "default",
          position: { x: 230, y: 150 },
          data: { label: "WAL Buffer" },
          style: { background: "#f59e0b", color: "white", padding: 15 },
        },
        {
          id: "disk-log",
          type: "default",
          position: { x: 410, y: 80 },
          data: { label: "WAL Disk\n(Sequential)" },
          style: {
            background: "#dc2626",
            color: "white",
            padding: 15,
            fontSize: 12,
          },
        },
        {
          id: "disk-data",
          type: "default",
          position: { x: 410, y: 220 },
          data: { label: "Data Pages\n(Random)" },
          style: {
            background: "#10b981",
            color: "white",
            padding: 15,
            fontSize: 12,
          },
        },
      ],
      edges: [
        {
          id: "e1",
          source: "tx",
          target: "wal",
          label: "Write",
          animated: true,
        },
        {
          id: "e2",
          source: "wal",
          target: "disk-log",
          label: "Flush (fsync)",
          animated: true,
        },
        {
          id: "e3",
          source: "disk-log",
          target: "disk-data",
          label: "Lazy write",
          animated: false,
          style: { strokeDasharray: "5,5" },
        },
      ],
    },
  },
  {
    id: 6,
    part: "I",
    title: "B-Tree Variants",
    summary:
      "Copy-on-Write B-Trees (immutable), lazy B-Trees (buffered updates), and lock-free Bw-Trees using delta records.",
    content:
      "Different B-Tree variants optimize for different workloads: COW for snapshots, lazy for write batching, lock-free for concurrency.",
    keyPoints: [
      "**Copy-on-Write (COW)**: New version on every write. Enables snapshots (LMDB, Btrfs)",
      "**Lazy B-Trees**: Buffer updates in memory, flush to disk periodically (TokuDB, BetrFS)",
      "**Bw-Trees**: Lock-free using compare-and-swap. Delta chains instead of in-place updates",
      "**Prefix/Suffix truncation**: Compress keys by storing prefixes or separators only",
    ],
    sections: [
      {
        title: "Copy-on-Write B-Trees",
        points: [
          "Never modify pages in-place, always create new pages with changes",
          "Cascading updates: Child changed → parent updated → grandparent updated → root",
          "Garbage collection: Old versions cleaned up when no longer referenced",
          "Benefits: Snapshots are free (just keep old root), no write locks needed",
        ],
      },
    ],
  },
  {
    id: 7,
    part: "I",
    title: "Log-Structured Storage",
    summary:
      "LSM-Trees with memtable, SSTables, compaction strategies (size-tiered vs leveled), and Bloom filters for fast negative lookups.",
    content:
      "LSM-Trees trade read performance for write throughput. Used in Cassandra, RocksDB, HBase, and LevelDB.",
    keyPoints: [
      "**Memtable**: In-memory sorted structure (skip list, AVL tree). Buffered writes",
      "**SSTable**: Sorted String Table on disk. Immutable once written",
      "**Compaction**: Merge SSTables, remove deleted/old values. CPU and I/O intensive",
      '**Bloom filters**: Probabilistic data structure. Quickly check "key definitely not present"',
    ],
    sections: [
      {
        title: "LSM-Tree Write Pattern",
        points: [
          "Writes go to memtable (in-memory). Very fast",
          "When memtable full, flush to L0 SSTable on disk",
          "L0 can have overlapping key ranges (each from different memtable flush)",
          "Compaction merges L0 → L1, L1 → L2, etc. Non-overlapping at lower levels",
        ],
      },
      {
        title: "Compaction Strategies",
        points: [
          "Size-tiered: Merge SSTables of similar size. Write-optimized, more space",
          "Leveled: Fixed-size levels, no overlaps within level. Read-optimized, less space",
          "Time-window: Group by time, expire old windows (great for time-series)",
          "Trade-offs: Size-tiered amplifies reads, leveled amplifies writes",
        ],
      },
      {
        title: "Bloom Filter Usage",
        example: {
          language: "python",
          title: "bloom_filter.py",
          code: `import mmh3  # MurmurHash3

class BloomFilter:
    def __init__(self, size=1000, hash_count=3):
        self.size = size
        self.hash_count = hash_count
        self.bit_array = [0] * size
    
    def add(self, key):
        for i in range(self.hash_count):
            index = mmh3.hash(key, i) % self.size
            self.bit_array[index] = 1
    
    def might_contain(self, key):
        for i in range(self.hash_count):
            index = mmh3.hash(key, i) % self.size
            if self.bit_array[index] == 0:
                return False  # Definitely not present
        return True  # Might be present (or false positive)

# LSM-Tree usage:
bloom = BloomFilter(size=10000, hash_count=5)

# Add all keys from SSTable
for key in sstable.keys():
    bloom.add(key)

# Before reading SSTable, check Bloom filter
def read_from_sstable(key):
    if not bloom.might_contain(key):
        return None  # Skip disk read!
    
    # Might be present, check SSTable
    return sstable.get(key)`,
        },
      },
    ],
    interactive: {
      title: "LSM-Tree Compaction Flow",
      nodes: [
        {
          id: "memtable",
          type: "default",
          position: { x: 100, y: 50 },
          data: { label: "MemTable\n(RAM)" },
          style: {
            background: "#dc2626",
            color: "white",
            padding: 20,
            border: "2px solid #ef4444",
          },
        },
        {
          id: "l0",
          type: "default",
          position: { x: 300, y: 50 },
          data: { label: "L0\n4 SSTables\n(Overlapping)" },
          style: {
            background: "#f59e0b",
            color: "white",
            padding: 15,
            fontSize: 11,
          },
        },
        {
          id: "l1",
          type: "default",
          position: { x: 500, y: 50 },
          data: { label: "L1\n10 SSTables\n(Non-overlapping)" },
          style: {
            background: "#3b82f6",
            color: "white",
            padding: 15,
            fontSize: 11,
          },
        },
        {
          id: "l2",
          type: "default",
          position: { x: 700, y: 50 },
          data: { label: "L2\n100 SSTables" },
          style: {
            background: "#8b5cf6",
            color: "white",
            padding: 15,
            fontSize: 11,
          },
        },
      ],
      edges: [
        {
          id: "e1",
          source: "memtable",
          target: "l0",
          label: "Flush",
          animated: true,
        },
        {
          id: "e2",
          source: "l0",
          target: "l1",
          label: "Compact",
          animated: false,
        },
        {
          id: "e3",
          source: "l1",
          target: "l2",
          label: "Compact",
          animated: false,
        },
      ],
    },
  },
  {
    id: 8,
    part: "II",
    title: "Introduction and Overview (Distributed Systems)",
    summary:
      "Distributed systems challenges: consistency models, failure detection, time synchronization, and distributed transactions.",
    content:
      "Distributed systems introduce partial failures, network delays, and clock skew. These make strong guarantees expensive.",
    keyPoints: [
      "**Consistency models**: Linearizability (strongest), sequential, causal, eventual",
      "**Failure detection**: Heartbeats, timeouts, gossip protocols, Phi accrual detector",
      "**Time synchronization**: NTP, logical clocks (Lamport, vector), hybrid logical clocks",
      "**CAP theorem**: Can't have all three: Consistency, Availability, Partition tolerance",
    ],
    sections: [
      {
        title: "Consistency Model Spectrum",
        points: [
          "Linearizability: All operations appear instantaneous. Expensive coordination",
          "Sequential: Operations appear in some total order. Cheaper than linearizable",
          "Causal: Preserves cause-effect. Cheaper again",
          "Eventual: All replicas converge eventually. Cheapest, highest availability",
        ],
      },
    ],
  },
  {
    id: 9,
    part: "II",
    title: "Failure Detection",
    summary:
      "Detecting node failures using heartbeats, adaptive timeouts, and gossip protocols for group membership.",
    content:
      "In distributed systems, distinguishing between slow nodes and crashed nodes is hard. False positives are inevitable.",
    keyPoints: [
      "**Heartbeat-based**: Periodic ping messages. Miss N consecutive? → Declare failed",
      "**Adaptive timeouts**: Adjust based on observed latency distributions (Phi accrual)",
      "**Gossip protocols**: Nodes exchange membership info. Epidemic style dissemination",
      "**SWIM**: Suspicion mechanism, indirect probing, reduces false positives",
    ],
    sections: [
      {
        title: "Phi Accrual Failure Detector",
        points: [
          "Instead of binary (up/down), outputs continuous suspicion level (Φ value)",
          "Track heart interval distribution, detect outliers",
          "Application chooses threshold: higher Φ = more confident node is down",
          "Used in Cassandra, Akka cluster",
        ],
      },
    ],
  },
  {
    id: 10,
    part: "II",
    title: "Leader Election",
    summary:
      "Bully algorithm, ring-based election, and ZooKeeper-based stable leader election with fencing tokens.",
    content:
      "Leader election ensures exactly one coordinator. Prevents split-brain and duplicate work.",
    keyPoints: [
      "**Bully algorithm**: Highest ID wins. Simple but many messages in large clusters",
      "**Ring election**: Pass token around ring. Stable but slow with failures",
      "**External coordination**: ZooKeeper, etcd. Atomic create of ephemeral node",
      "**Fencing tokens**: Monotonic generation number. Prevents zombie leaders",
    ],
    sections: [
      {
        title: "Fencing Tokens",
        content:
          "Leader gets monotonically increasing token from coordination service. Include token with requests. Server rejects requests with old tokens.",
        example: {
          language: "python",
          title: "fencing_token.py",
          code: `class FencingExample:
    def __init__(self):
        self.current_token = 0
    
    def become_leader(self):
        # Get fencing token from ZooKeeper
        self.current_token += 1
        return self.current_token
    
    def write_with_token(self, token, data):
        # Storage server validates token
        if token < self.last_token_seen:
            raise Exception(f"Rejected: old token {token} < {self.last_token_seen}")
        
        self.last_token_seen = token
        self.storage.write(data)
        return "OK"

# Scenario:
# Leader 1 gets token=1, becomes slow
# Leader 2 elected, gets token=2
# Leader 1 wakes up, tries write with token=1
# → Storage rejects! Prevents data corruption`,
        },
      },
    ],
  },
  {
    id: 11,
    part: "II",
    title: "Replication and Consistency",
    summary:
      "Primary-backup, chain replication, and quorum-based replication. Trading consistency for availability.",
    content:
      "Replication provides fault tolerance and scalability. But coordinating replicas introduces complexity.",
    keyPoints: [
      "**Primary-backup**: Single writer, replicates to backups. Simple, bottleneck at primary",
      "**Chain replication**: Linear chain of nodes. Write → head, read ← tail. Strong consistency",
      "**Quorum replication**: R + W > N. Configurable consistency/availability trade-off",
      "**Read repair**: Fix staleness detected during reads. Used with eventual consistency",
    ],
    sections: [
      {
        title: "Quorum Math",
        points: [
          "N = total replicas, W = write quorum, R = read quorum",
          "R + W > N guarantees reading latest write (overlapping)",
          "Example: N=3, W=2, R=2 → Tolerate 1 failure, strong consistency",
          "Example: N=3, W=1, R=1 → Always available, eventual consistency",
          "Cassandra: Configurable per-query (LOCAL_QUORUM, EACH_QUORUM, ALL, ONE)",
        ],
      },
    ],
  },
  {
    id: 12,
    part: "II",
    title: "Anti-Entropy and Dissemination",
    summary:
      "Read repair, Merkle trees for efficient synchronization, and gossip protocols for state propagation.",
    content:
      "Even with quorums, replicas can diverge. Anti-entropy mechanisms ensure eventual convergence.",
    keyPoints: [
      "**Read repair**: On read, compare responses from replicas. Update stale ones",
      "**Merkle trees**: Hash tree for comparing datasets. Log(N) exchanges to find differences",
      "**Gossip (epidemic)**: Nodes randomly exchange state. Eventually all nodes converge",
      "**Vector clocks**: Track causality. Detect concurrent writes for conflict resolution",
    ],
    sections: [
      {
        title: "Merkle Tree Synchronization",
        points: [
          "Build hash tree over key ranges. Root hash summarizes entire dataset",
          "Compare root hashes. Recurse into differing subtrees",
          "Only transfer differing leaf nodes",
          "Used in Cassandra anti-entropy, Dynamo, Git for commit history",
        ],
      },
    ],
    interactive: {
      title: "Merkle Tree for Synchronization",
      nodes: [
        {
          id: "root",
          type: "default",
          position: { x: 300, y: 50 },
          data: { label: "Root\nHash(A|B)" },
          style: {
            background: "#3b82f6",
            color: "white",
            padding: 15,
            fontSize: 11,
          },
        },
        {
          id: "a",
          type: "default",
          position: { x: 150, y: 150 },
          data: { label: "A\nHash(A1|A2)" },
          style: {
            background: "#10b981",
            color: "white",
            padding: 12,
            fontSize: 11,
          },
        },
        {
          id: "b",
          type: "default",
          position: { x: 450, y: 150 },
          data: { label: "B\nHash(B1|B2)" },
          style: {
            background: "#f59e0b",
            color: "white",
            padding: 12,
            fontSize: 11,
          },
        },
        {
          id: "a1",
          type: "default",
          position: { x: 80, y: 250 },
          data: { label: "A1\nKeys 0-25" },
          style: {
            background: "#6b7280",
            color: "white",
            padding: 10,
            fontSize: 10,
          },
        },
        {
          id: "a2",
          type: "default",
          position: { x: 220, y: 250 },
          data: { label: "A2\nKeys 26-50" },
          style: {
            background: "#6b7280",
            color: "white",
            padding: 10,
            fontSize: 10,
          },
        },
      ],
      edges: [
        { id: "e1", source: "root", target: "a" },
        { id: "e2", source: "root", target: "b" },
        { id: "e3", source: "a", target: "a1" },
        { id: "e4", source: "a", target: "a2" },
      ],
    },
  },
  {
    id: 13,
    part: "II",
    title: "Distributed Transactions",
    summary:
      "Two-Phase Commit (2PC) protocol, coordinator recovery, and the blocking problem when coordinator fails.",
    content:
      "2PC achieves atomicity across nodes but blocks on coordinator failure. Three-Phase Commit tries to fix this but rarely used.",
    keyPoints: [
      "**Two-Phase Commit**: Phase 1 (prepare/vote), Phase 2 (commit/abort)",
      "**Coordinator**: Orchestrates protocol. Single point of failure",
      "**Blocking**: Participants can't decide if coordinator crashes after prepare",
      "**Presumed abort**: Timeout → abort. Simpler than presumed commit",
    ],
    sections: [
      {
        title: "2PC Protocol Steps",
        points: [
          "Coordinator sends PREPARE to all participants",
          "Each participant votes YES (can commit) or NO (must abort)",
          "If all YES → coordinator sends COMMIT. Else → sends ABORT",
          "Participants execute decision, send ACK",
          "Coordinator writes outcome to log, protocol complete",
        ],
        example: {
          language: "python",
          title: "two_phase_commit.py",
          code: `class TwoPhaseCommit:
    def __init__(self, participants):
        self.participants = participants
        self.tx_id = generate_tx_id()
    
    def execute(self):
        # Phase 1: Prepare
        votes = []
        for participant in self.participants:
            vote = participant.prepare(self.tx_id)
            votes.append(vote)
            
            if vote == "NO":
                # Any NO → abort everyone
                self.abort_all()
                return "ABORTED"
        
        # All voted YES → commit
        # Write decision to coordinator log (crucial!)
        self.coordinator_log.write(f"{self.tx_id}: COMMIT")
        
        # Phase 2: Commit
        for participant in self.participants:
            participant.commit(self.tx_id)
        
        return "COMMITTED"
    
    def abort_all(self):
        for participant in self.participants:
            participant.abort(self.tx_id)

# Participant side:
class Participant:
    def prepare(self, tx_id):
        # Write undo/redo log
        self.wal.write(tx_id, self.changes)
        self.wal.flush()  # Force to disk
        
        # Can commit?
        if self.can_commit(tx_id):
            self.state[tx_id] = "PREPARED"
            return "YES"
        else:
            return "NO"
    
    def commit(self, tx_id):
        # Apply changes
        self.apply_changes(tx_id)
        self.state[tx_id] = "COMMITTED"`,
        },
      },
      {
        title: "Blocking Problem",
        content:
          "If coordinator crashes after some participants vote YES but before sending decision, participants are stuck. Can't commit (might need abort), can't abort (others might commit).",
        points: [
          "Participants hold locks while waiting → blocking concurrent transactions",
          "Three-Phase Commit adds timeout + pre-commit phase (non-blocking)",
          "In practice: Use consensus (Paxos/Raft) or avoid distributed transactions",
        ],
      },
    ],
    interactive: {
      title: "Two-Phase Commit Flow",
      nodes: [
        {
          id: "coord",
          type: "default",
          position: { x: 300, y: 50 },
          data: { label: "Coordinator" },
          style: {
            background: "#dc2626",
            color: "white",
            padding: 15,
            border: "2px solid #ef4444",
          },
        },
        {
          id: "p1",
          type: "default",
          position: { x: 100, y: 180 },
          data: { label: "Participant 1" },
          style: { background: "#3b82f6", color: "white", padding: 15 },
        },
        {
          id: "p2",
          type: "default",
          position: { x: 300, y: 180 },
          data: { label: "Participant 2" },
          style: { background: "#3b82f6", color: "white", padding: 15 },
        },
        {
          id: "p3",
          type: "default",
          position: { x: 500, y: 180 },
          data: { label: "Participant 3" },
          style: { background: "#3b82f6", color: "white", padding: 15 },
        },
      ],
      edges: [
        {
          id: "e1",
          source: "coord",
          target: "p1",
          label: "PREPARE",
          animated: true,
        },
        {
          id: "e2",
          source: "coord",
          target: "p2",
          label: "PREPARE",
          animated: true,
        },
        {
          id: "e3",
          source: "coord",
          target: "p3",
          label: "PREPARE",
          animated: true,
        },
        {
          id: "e4",
          source: "p1",
          target: "coord",
          label: "YES",
          animated: false,
          style: { stroke: "#10b981" },
        },
        {
          id: "e5",
          source: "p2",
          target: "coord",
          label: "YES",
          animated: false,
          style: { stroke: "#10b981" },
        },
        {
          id: "e6",
          source: "p3",
          target: "coord",
          label: "YES",
          animated: false,
          style: { stroke: "#10b981" },
        },
      ],
    },
  },
  {
    id: 14,
    part: "II",
    title: "Consensus",
    summary:
      "Paxos (classic), Raft (understandable), and Multi-Paxos for multiple rounds. Fundamental problem in distributed systems.",
    content:
      "Consensus allows distributed nodes to agree on a value despite failures. Harder than it looks—took decades to get right.",
    keyPoints: [
      "**Paxos**: Proposers, acceptors, learners. Notoriously difficult to understand and implement correctly",
      "**Raft**: Leader election + log replication. Designed for understandability",
      "**Agreement**: All nodes decide same value. Validity: Decided value was proposed. Termination: Eventually decide",
      "**Fault tolerance**: f failures requires 2f+1 nodes. Majority quorum",
    ],
    sections: [
      {
        title: "Paxos Overview",
        points: [
          "Phase 1: Proposer sends PREPARE(n). Acceptors promise not to accept < n",
          "Phase 2: If majority promise, proposer sends ACCEPT(n, value)",
          "Acceptors accept if they haven't promised a higher n",
          "Majority accepts → value chosen (learners notified)",
          "Multi-Paxos: Elect stable leader, skip Phase 1 for subsequent rounds",
        ],
      },
      {
        title: "Raft Algorithm",
        points: [
          "Leader election: Nodes timeout, become candidates, request votes",
          "Log replication: Leader appends entries, replicates to followers",
          "Safety: At most one leader per term, logs eventually consistent",
          "Used by: etcd (Kubernetes), Consul, CockroachDB",
        ],
        example: {
          language: "python",
          title: "raft_election.py",
          code: `class RaftNode:
    def __init__(self, node_id, peers):
        self.node_id = node_id
        self.peers = peers
        self.state = "FOLLOWER"
        self.current_term = 0
        self.voted_for = None
        self.election_timeout = random.uniform(150, 300)  # ms
    
    def start_election(self):
        # Increment term, become candidate
        self.current_term += 1
        self.state = "CANDIDATE"
        self.voted_for = self.node_id
        votes = 1  # Vote for self
        
        # Request votes from peers
        for peer in self.peers:
            response = peer.request_vote(self.current_term, self.node_id)
            if response.vote_granted:
                votes += 1
        
        # Got majority?
        majority = (len(self.peers) + 1) // 2 + 1
        if votes >= majority:
            self.become_leader()
        else:
            self.state = "FOLLOWER"  # Lost election
    
    def become_leader(self):
        self.state = "LEADER"
        print(f"Node {self.node_id} became leader in term {self.current_term}")
        
        # Send heartbeats to maintain leadership
        self.send_heartbeats()
    
    def request_vote(self, term, candidate_id):
        # Vote if:
        # 1. candidate term >= our term
        # 2. Haven't voted this term yet
        if term >= self.current_term and self.voted_for is None:
            self.voted_for = candidate_id
            self.current_term = term
            return {"vote_granted": True}
        else:
            return {"vote_granted": False}`,
        },
      },
    ],
    interactive: {
      title: "Raft Consensus with Leader",
      nodes: [
        {
          id: "leader",
          type: "default",
          position: { x: 300, y: 50 },
          data: { label: "👑 Leader\n(Term 3)" },
          style: {
            background: "#dc2626",
            color: "white",
            padding: 20,
            border: "3px solid #ef4444",
          },
        },
        {
          id: "f1",
          type: "default",
          position: { x: 100, y: 180 },
          data: { label: "Follower 1" },
          style: { background: "#3b82f6", color: "white", padding: 15 },
        },
        {
          id: "f2",
          type: "default",
          position: { x: 300, y: 180 },
          data: { label: "Follower 2" },
          style: { background: "#3b82f6", color: "white", padding: 15 },
        },
        {
          id: "f3",
          type: "default",
          position: { x: 500, y: 180 },
          data: { label: "Follower 3" },
          style: { background: "#3b82f6", color: "white", padding: 15 },
        },
      ],
      edges: [
        {
          id: "e1",
          source: "leader",
          target: "f1",
          label: "AppendEntries",
          animated: true,
        },
        {
          id: "e2",
          source: "leader",
          target: "f2",
          label: "AppendEntries",
          animated: true,
        },
        {
          id: "e3",
          source: "leader",
          target: "f3",
          label: "AppendEntries",
          animated: true,
        },
      ],
    },
  },
];
