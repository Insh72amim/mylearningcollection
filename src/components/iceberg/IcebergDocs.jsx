import React from 'react';
import Mermaid from '../common/Mermaid';
import CodeBlock from '../common/CodeBlock';

const IcebergDocs = () => {
  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Apache Iceberg: The Deep Dive</h1>
        <p className="text-xl text-gray-400">
          A comprehensive guide to the open table format that brings database-like capabilities to data lakes.
        </p>
      </div>

      {/* Section 1: Table Format Evolution */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">01</span>
          Table Format & Metadata Layers
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Iceberg is <strong>not a storage format</strong> (like Parquet). It's a <strong>table format</strong> that defines how to organize Parquet/ORC/Avro files into a logical table with ACID guarantees.
        </p>
        
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">The Three-Layer Architecture</h3>
          <Mermaid chart={`
            graph TB
              subgraph Catalog [Metadata Catalog]
                META[metadata.json<br/>Current Snapshot Pointer]
              end
              
              subgraph Snapshot [Snapshot Layer]
                S1[Snapshot 1<br/>timestamp: t1]
                S2[Snapshot 2<br/>timestamp: t2]
                S3[Snapshot 3<br/>timestamp: t3]
              end
              
              subgraph Manifest Lists [Manifest List Layer]
                ML1[manifest-list-s1.avro]
                ML2[manifest-list-s2.avro]
                ML3[manifest-list-s3.avro]
              end
              
              subgraph Manifests [Manifest Layer]
                M1[manifest-1.avro<br/>File: a.parquet]
                M2[manifest-2.avro<br/>File: b.parquet]
                M3[manifest-3.avro<br/>File: c.parquet]
              end
              
              subgraph Data [Data Files]
                D1[(a.parquet)]
                D2[(b.parquet)]
                D3[(c.parquet)]
              end
              
              META --> S3
              S1 --> ML1
              S2 --> ML2
              S3 --> ML3
              ML1 --> M1
              ML2 --> M2
              ML3 --> M1
              ML3 --> M3
              M1 --> D1
              M2 --> D2
              M3 --> D3
              
              style META fill:#7c2d12,stroke:#f97316
              style S3 fill:#1e3a8a,stroke:#3b82f6
              style ML3 fill:#065f46,stroke:#10b981
          `} />
          
          <div className="mt-6 space-y-4">
            <div className="bg-gray-900 p-4 rounded border border-orange-900/50">
              <strong className="text-orange-400">Metadata File (metadata.json)</strong>
              <p className="text-sm mt-2">Points to the current snapshot. Atomic updates via rename.</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
              <strong className="text-blue-400">Snapshot</strong>
              <p className="text-sm mt-2">Immutable table state at a point in time. Contains schema, partition spec, and manifest list pointer.</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-green-900/50">
              <strong className="text-green-400">Manifest List</strong>
              <p className="text-sm mt-2">List of manifest files that make up this snapshot. Stored as Avro.</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-purple-900/50">
              <strong className="text-purple-400">Manifest</strong>
              <p className="text-sm mt-2">List of data files + column-level statistics (min/max, null counts). Enables file-level pruning.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Metadata Example</h3>
          <CodeBlock language="json" code={`// metadata.json
{
  "format-version": 2,
  "table-uuid": "9c12d441-03fe-4693-9a96-a0705ddf69c1",
  "location": "s3://bucket/warehouse/db/table",
  "last-updated-ms": 1638993392515,
  "current-snapshot-id": 3055729675574597004,
  "snapshots": [
    {
      "snapshot-id": 3055729675574597004,
      "timestamp-ms": 1638993392515,
      "manifest-list": "s3://.../snap-3055729675574597004.avro",
      "summary": {
        "operation": "append",
        "added-data-files": "5",
        "added-records": "100000"
      }
    }
  ],
  "schemas": [...],
  "partition-spec": [...]
}`} />
        </div>
      </section>

      {/* Section 2: ACID Transactions */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">02</span>
          ACID Transactions & Concurrency
        </h2>
        <p className="mb-6">
          Iceberg provides <strong>serializable isolation</strong> through optimistic concurrency control. Multiple writers can safely commit concurrently.
        </p>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">How Atomic Commits Work</h3>
          <Mermaid chart={`
            sequenceDiagram
              participant W1 as Writer 1
              participant W2 as Writer 2
              participant C as Catalog
              participant S as Storage (S3)
              
              W1->>C: 1. Read current metadata v1
              W2->>C: 2. Read current metadata v1
              
              W1->>S: 3. Write new data files
              W2->>S: 4. Write new data files
              
              W1->>S: 5. Write new manifest
              W2->>S: 6. Write new manifest
              
              W1->>S: 7. Write new metadata v2
              W2->>S: 8. Write new metadata v3
              
              W1->>C: 9. CAS: v1 → v2 (SUCCESS)
              W2->>C: 10. CAS: v1 → v3 (CONFLICT!)
              
              W2->>W2: 11. Retry: merge changes
              W2->>C: 12. CAS: v2 → v4 (SUCCESS)
          `} />
          
          <div className="mt-6 bg-gray-900 p-4 rounded border border-gray-700">
            <p className="text-sm">
              <strong className="text-blue-400">Compare-And-Swap (CAS):</strong> The catalog only accepts the update if the expected version matches. This prevents lost updates.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">ACID Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
                <h4 className="font-bold text-blue-400 mb-2">Atomicity</h4>
                <p className="text-sm">All-or-nothing commits. Failed writes leave no garbage (metadata GC cleans up).</p>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-green-900/50">
                <h4 className="font-bold text-green-400 mb-2">Consistency</h4>
                <p className="text-sm">Schema enforcement, constraint validation before commit.</p>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-purple-900/50">
                <h4 className="font-bold text-purple-400 mb-2">Isolation</h4>
                <p className="text-sm">Serializable isolation via optimistic concurrency. Readers see snapshot-consistent views.</p>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-orange-900/50">
                <h4 className="font-bold text-orange-400 mb-2">Durability</h4>
                <p className="text-sm">Once committed, data survives failures (relies on S3/HDFS durability).</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Time Travel Queries</h3>
            <CodeBlock language="sql" code={`-- Read table as of specific timestamp
SELECT * FROM my_table 
FOR SYSTEM_TIME AS OF '2024-01-15 10:00:00';

-- Read table as of specific snapshot ID
SELECT * FROM my_table 
FOR SYSTEM_VERSION AS OF 3055729675574597004;

-- Spark syntax
spark.read
    .option("snapshot-id", "3055729675574597004")
    .table("my_table")

-- Rollback to previous snapshot
ALTER TABLE my_table 
EXECUTE ROLLBACK(snapshot_id => 3055729675574597004);`} />
          </div>
        </div>
      </section>

      {/* Section 3: Hidden Partitioning */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">03</span>
          Hidden Partitioning & Partition Evolution
        </h2>
        <p className="mb-6">
          Unlike Hive, Iceberg's partitioning is <strong>hidden from users</strong>. No WHERE clauses needed for partition pruning. And partitions can evolve without rewriting data!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Hive-style Partitioning (Old)</h3>
            <CodeBlock language="sql" code={`-- Physical path includes partition
s3://bucket/table/
  year=2024/
    month=01/
      data.parquet

-- User MUST know partition columns
SELECT * FROM table
WHERE year = 2024 
  AND month = 1;

-- Changing partition = REWRITE`} />
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
            <h3 className="text-xl font-semibold text-white mb-4">Iceberg Partitioning (Modern)</h3>
            <CodeBlock language="sql" code={`-- Physical: flat structure
s3://bucket/table/data/
  file1.parquet
  file2.parquet

-- User queries on raw column
SELECT * FROM table
WHERE event_time >= '2024-01-01';

-- Partition evolution = metadata change`} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Partition Transform Functions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
                <strong className="text-blue-400 block mb-2">year(timestamp)</strong>
                <p>Partition by year derived from timestamp</p>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-green-900/50">
                <strong className="text-green-400 block mb-2">month(timestamp)</strong>
                <p>Partition by month</p>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-purple-900/50">
                <strong className="text-purple-400 block mb-2">day(timestamp)</strong>
                <p>Partition by day</p>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-orange-900/50">
                <strong className="text-orange-400 block mb-2">hour(timestamp)</strong>
                <p>Partition by hour</p>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-red-900/50">
                <strong className="text-red-400 block mb-2">bucket(N, column)</strong>
                <p>Hash-based bucketing (N buckets)</p>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-pink-900/50">
                <strong className="text-pink-400 block mb-2">truncate(L, column)</strong>
                <p>Truncate strings/numbers to L chars/precision</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Partition Evolution Example</h3>
            <CodeBlock language="python" code={`from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Iceberg").getOrCreate()

# Initially partition by day
spark.sql("""
    CREATE TABLE events (
        event_id BIGINT,
        event_time TIMESTAMP,
        user_id STRING
    )
    USING iceberg
    PARTITIONED BY (days(event_time))
""")

# Later: switch to hour-level partitioning (NO REWRITE!)
spark.sql("""
    ALTER TABLE events
    REPLACE PARTITION SPEC (hours(event_time))
""")

# Old data stays day-partitioned
# New data uses hour-partitioning
# Queries work seamlessly across both!`} />
          </div>
        </div>
      </section>

      {/* Section 4: Metadata Management */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-sm px-3 py-1 rounded-full">04</span>
          Metadata Management & Performance
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Column-Level Statistics</h3>
            <p className="mb-4">Manifests store min/max/null_count for every column in every data file.</p>
            <CodeBlock language="json" code={`// manifest-1.avro (Avro encoded)
{
  "data_file": {
    "file_path": "s3://bucket/data/file1.parquet",
    "file_format": "PARQUET",
    "record_count": 100000,
    "file_size_in_bytes": 52428800,
    "column_sizes": {"user_id": 8000000, "event_time": 16000000},
    "value_counts": {"user_id": 100000, "event_time": 100000},
    "null_value_counts": {"user_id": 0, "event_time": 5},
    "lower_bounds": {"user_id": "usr_001", "event_time": "2024-01-01T00:00:00"},
    "upper_bounds": {"user_id": "usr_999", "event_time": "2024-01-31T23:59:59"}
  }
}`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Metadata-Only Operations</h3>
            <p className="mb-4">Many operations only touch metadata, not data files:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-green-900/20 p-4 rounded border border-green-900/50">
                <h4 className="text-green-400 font-bold mb-2">✓ Metadata-Only</h4>
                <ul className="space-y-1">
                  <li>• Schema evolution (add/drop columns)</li>
                  <li>• Partition evolution</li>
                  <li>• Snapshot expiration</li>
                  <li>• Table cloning (zero-copy)</li>
                  <li>• Rename table</li>
                </ul>
              </div>
              <div className="bg-red-900/20 p-4 rounded border border-red-900/50">
                <h4 className="text-red-400 font-bold mb-2">✗ Requires Data Rewrite</h4>
                <ul className="space-y-1">
                  <li>• Change column data type</li>
                  <li>• Re-partition existing data</li>
                  <li>• Compact small files</li>
                  <li>• Delete rows (creates new files)</li>
                  <li>• Update rows</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Metadata Maintenance</h3>
            <CodeBlock language="sql" code={`-- Expire old snapshots (free up storage)
CALL system.expire_snapshots(
    table => 'my_table',
    older_than => TIMESTAMP '2024-01-01 00:00:00',
    retain_last => 5
);

-- Remove orphaned files (failed writes)
CALL system.remove_orphan_files(
    table => 'my_table',
    older_than => TIMESTAMP '2024-01-15 00:00:00'
);

-- Rewrite manifests (merge small manifests)
CALL system.rewrite_manifests('my_table');

-- Rewrite data files (compact small files)
CALL system.rewrite_data_files(
    table => 'my_table',
    strategy => 'binpack',
    options => map('target-file-size-bytes', '536870912')
);`} />
          </div>
        </div>
      </section>

      {/* Section 5: Query Optimization */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-orange-600 text-sm px-3 py-1 rounded-full">05</span>
          Query Planning & Optimization
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Multi-Level Pruning</h3>
            <Mermaid chart={`
              graph TD
                Q[Query: WHERE date = '2024-01-15' AND user_id = 'alice']
                
                Q --> P1[1. Partition Pruning]
                P1 --> P1R[Skip partitions != Jan 15]
                
                Q --> P2[2. Manifest Pruning]
                P2 --> P2R[Skip manifests with date range outside Jan 15]
                
                Q --> P3[3. File Pruning]
                P3 --> P3R[Skip files where user_id range excludes 'alice']
                
                P3R --> R[Read Only: file-42.parquet]
                
                style P1R fill:#065f46,stroke:#10b981
                style P2R fill:#065f46,stroke:#10b981
                style P3R fill:#065f46,stroke:#10b981
                style R fill:#1e3a8a,stroke:#3b82f6
            `} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Sorting & Z-Ordering</h3>
            <CodeBlock language="python" code={`# Sort data for better file pruning
df.write \\
    .format("iceberg") \\
    .mode("append") \\
    .sortBy("event_time", "user_id") \\
    .save("catalog.db.events")

# Z-Order clustering (multi-dimensional sorting)
spark.sql("""
    CALL system.rewrite_data_files(
        table => 'events',
        strategy => 'sort',
        sort_order => 'zorder(user_id, event_time)'
    )
""")`} />
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-yellow-900/50">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Performance Best Practices</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Use <strong>day/hour partitioning</strong> for time-series data</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Enable <strong>manifest caching</strong> for faster query planning</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Compact small files regularly (target 128MB-1GB)</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Use <strong>Z-ordering</strong> for multi-column filters</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Expire old snapshots to reduce metadata overhead</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Write files in <strong>Parquet with ZSTD</strong> compression</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Iceberg vs Delta Lake vs Hudi */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">06</span>
          Iceberg vs Delta Lake vs Apache Hudi
        </h2>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border border-gray-700">
            <thead>
              <tr className="bg-gray-800 border-b border-gray-700">
                <th className="text-left p-3 text-white">Feature</th>
                <th className="text-left p-3 text-blue-400">Iceberg</th>
                <th className="text-left p-3 text-green-400">Delta Lake</th>
                <th className="text-left p-3 text-purple-400">Hudi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">License</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Apache 2.0</td>
                <td className="p-3">Apache 2.0</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">Engine Support</td>
                <td className="p-3 text-green-400">★★★★★ (Spark, Flink, Trino, Presto, Hive)</td>
                <td className="p-3">★★★☆☆ (Spark-centric)</td>
                <td className="p-3">★★★★☆ (Spark, Flink, Hive)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">Hidden Partitioning</td>
                <td className="p-3 text-green-400">✓ Yes</td>
                <td className="p-3 text-red-400">✗ No</td>
                <td className="p-3 text-red-400">✗ No (Hive-style)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">Partition Evolution</td>
                <td className="p-3 text-green-400">✓ In-place</td>
                <td className="p-3 text-red-400">✗ Requires rewrite</td>
                <td className="p-3 text-yellow-400">~ Limited</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">Schema Evolution</td>
                <td className="p-3 text-green-400">★★★★★</td>
                <td className="p-3">★★★★☆</td>
                <td className="p-3">★★★★☆</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">Time Travel</td>
                <td className="p-3 text-green-400">✓ Snapshots</td>
                <td className="p-3 text-green-400">✓ Commit log</td>
                <td className="p-3 text-green-400">✓ Timeline</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">ACID Isolation</td>
                <td className="p-3">Serializable</td>
                <td className="p-3">Serializable</td>
                <td className="p-3">Snapshot isolation</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">DELETE Performance</td>
                <td className="p-3">★★★★☆ (Copy-on-write)</td>
                <td className="p-3">★★★★☆ (Merge)</td>
                <td className="p-3 text-green-400">★★★★★ (Merge-on-read)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">Cloud Vendor</td>
                <td className="p-3">Vendor-neutral</td>
                <td className="p-3 text-yellow-400">Databricks</td>
                <td className="p-3">Vendor-neutral</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Best For</td>
                <td className="p-3 text-blue-400">Multi-engine analytics</td>
                <td className="p-3 text-green-400">Databricks ecosystem</td>
                <td className="p-3 text-purple-400">Upsert-heavy workloads</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-blue-900/50">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">🎯 When to Choose Iceberg</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-green-400 font-bold mb-2">Perfect For:</h4>
              <ul className="text-sm space-y-1">
                <li>✓ Multi-engine environments (Spark + Trino + Flink)</li>
                <li>✓ Vendor-neutral lakehouse</li>
                <li>✓ Schema/partition evolution needs</li>
                <li>✓ Large-scale analytics (PB scale)</li>
                <li>✓ Cloud-native architectures</li>
              </ul>
            </div>
            <div>
              <h4 className="text-red-400 font-bold mb-2">Consider Alternatives:</h4>
              <ul className="text-sm space-y-1">
                <li>→ Delta: If locked into Databricks</li>
                <li>→ Hudi: If frequent upserts/deletes</li>
                <li>→ Parquet: If no ACID/evolution needed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="pt-8 border-t border-gray-700">
        <p className="text-sm text-gray-500">
          📚 Further Reading: <a href="https://iceberg.apache.org/docs/latest/" className="text-blue-400 hover:underline">Official Iceberg Documentation</a> | 
          <a href="https://iceberg.apache.org/spec/" className="text-blue-400 hover:underline ml-2">Table Format Specification</a>
        </p>
      </div>
    </div>
  );
};

export default IcebergDocs;
