import React from 'react';
import { MarkerType } from 'reactflow';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';

const ParquetDocs = () => {
  const fileStructureNodes = [
    { id: 'h1', position: { x: 250, y: 0 }, data: { label: 'Header: PAR1' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 200 } },
    
    // Row Group 1
    { id: 'rg1', position: { x: 100, y: 100 }, data: { label: 'Row Group 1' }, style: { background: 'rgba(30, 58, 138, 0.1)', color: 'white', border: '1px dashed #3b82f6', width: 200, height: 250, zIndex: -1 } },
    { id: 'cc1a', position: { x: 125, y: 140 }, data: { label: 'Col Chunk: id' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 150 } },
    { id: 'cc1b', position: { x: 125, y: 200 }, data: { label: 'Col Chunk: name' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 150 } },
    { id: 'cc1c', position: { x: 125, y: 260 }, data: { label: 'Col Chunk: age' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 150 } },

    // Row Group 2
    { id: 'rg2', position: { x: 400, y: 100 }, data: { label: 'Row Group 2' }, style: { background: 'rgba(30, 58, 138, 0.1)', color: 'white', border: '1px dashed #3b82f6', width: 200, height: 250, zIndex: -1 } },
    { id: 'cc2a', position: { x: 425, y: 140 }, data: { label: 'Col Chunk: id' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 150 } },
    { id: 'cc2b', position: { x: 425, y: 200 }, data: { label: 'Col Chunk: name' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 150 } },
    { id: 'cc2c', position: { x: 425, y: 260 }, data: { label: 'Col Chunk: age' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 150 } },

    { id: 'fm', position: { x: 250, y: 400 }, data: { label: 'Footer Metadata' }, style: { background: '#7c2d12', color: 'white', border: '1px solid #f97316', width: 200 } },
    { id: 'h2', position: { x: 250, y: 500 }, data: { label: 'Footer: PAR1' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 200 } },
  ];

  const fileStructureEdges = [
    { id: 'e1', source: 'h1', target: 'rg1', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2', source: 'h1', target: 'rg2', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    
    { id: 'e3', source: 'rg1', target: 'fm', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e4', source: 'rg2', target: 'fm', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    
    { id: 'e5', source: 'fm', target: 'h2', style: { stroke: '#f97316' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Apache Parquet: The Deep Dive</h1>
        <p className="text-xl text-gray-400">
          A comprehensive guide to the columnar storage format that powers modern data lakes and analytics platforms.
        </p>
      </div>

      {/* Section 1: Columnar Storage Architecture */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">01</span>
          Columnar Storage Architecture
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Unlike traditional row-based formats (CSV, JSON), Parquet stores data <strong>by column</strong>. This fundamental design choice unlocks massive performance gains for analytical queries.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Row-Based Storage</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600 font-mono text-sm">
              <div>Record 1: [id=1, name="Alice", age=30, ...]</div>
              <div>Record 2: [id=2, name="Bob", age=25, ...]</div>
              <div>Record 3: [id=3, name="Charlie", age=35, ...]</div>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Good for: OLTP, row-level updates, full record scans
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
            <h3 className="text-xl font-semibold text-white mb-4">Column-Based Storage (Parquet)</h3>
            <div className="bg-gray-900 p-4 rounded border border-blue-600 font-mono text-sm">
              <div className="text-blue-400">id: [1, 2, 3, ...]</div>
              <div className="text-blue-400">name: ["Alice", "Bob", "Charlie", ...]</div>
              <div className="text-blue-400">age: [30, 25, 35, ...]</div>
            </div>
            <p className="mt-3 text-sm text-green-400">
              Good for: OLAP, column scans, aggregations, compression
            </p>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Why Columnar Wins for Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-800 p-4 rounded border border-blue-900/50">
              <strong className="text-blue-400 block mb-2">I/O Efficiency</strong>
              Query: SELECT AVG(age) FROM users
              <br/>Row format: Read ALL columns
              <br/>Parquet: Read ONLY age column
            </div>
            <div className="bg-gray-800 p-4 rounded border border-green-900/50">
              <strong className="text-green-400 block mb-2">Better Compression</strong>
              Similar data types cluster together.
              <br/>Example: 1M rows of "USA" compress to a few bytes.
            </div>
            <div className="bg-gray-800 p-4 rounded border border-purple-900/50">
              <strong className="text-purple-400 block mb-2">Predicate Pushdown</strong>
              WHERE age {'>'} 30: Skip entire column chunks using min/max stats.
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: File Format Internals */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">02</span>
          File Format Internals
        </h2>
        <p className="mb-6">
          A Parquet file is a self-contained bundle of data + metadata. Let's break down its structure.
        </p>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Parquet File Structure</h3>
          <InteractiveDiagram 
            initialNodes={fileStructureNodes} 
            initialEdges={fileStructureEdges} 
            title="Parquet File Structure" 
          />
          
          <div className="mt-6 space-y-4">
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <strong className="text-blue-400">Row Group</strong> - A horizontal partition of data (typically 128MB-1GB). Contains all columns for a subset of rows.
            </div>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <strong className="text-green-400">Column Chunk</strong> - All values for a single column within a row group. Split into pages.
            </div>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <strong className="text-purple-400">Page</strong> - Smallest unit of compression/encoding (typically 1MB). Types: Data Page, Dictionary Page, Index Page.
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Footer Metadata - The Secret Sauce</h3>
          <p className="mb-4">
            The footer contains <strong>schema</strong>, <strong>row group locations</strong>, and <strong>column statistics</strong>. This allows readers to skip irrelevant data without scanning the file.
          </p>
          <CodeBlock language="json" code={`{
  "version": 2,
  "schema": [...],
  "row_groups": [
    {
      "total_byte_size": 134217728,
      "num_rows": 1000000,
      "columns": [
        {
          "file_path": "part-00000.parquet",
          "file_offset": 4,
          "metadata_length": 89,
          "statistics": {
            "min": 1,
            "max": 1000000,
            "null_count": 0
          }
        }
      ]
    }
  ]
}`} />
        </div>
      </section>

      {/* Section 3: Encoding & Compression */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">03</span>
          Encoding & Compression
        </h2>
        <p className="mb-6">
          Parquet applies <strong>two layers</strong> of space reduction: encoding (logical) and compression (physical).
        </p>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Layer 1: Encoding Schemes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
                <h4 className="font-bold text-blue-400 mb-2">Dictionary Encoding</h4>
                <p className="text-sm mb-2">Best for: Low-cardinality columns (country, status)</p>
                <div className="bg-gray-800 p-2 rounded text-xs font-mono">
                  Values: ["USA", "USA", "UK", "USA"]<br/>
                  Dictionary: {'{0: "USA", 1: "UK"}'}<br/>
                  Encoded: [0, 0, 1, 0]
                </div>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-green-900/50">
                <h4 className="font-bold text-green-400 mb-2">Run-Length Encoding (RLE)</h4>
                <p className="text-sm mb-2">Best for: Repeated values</p>
                <div className="bg-gray-800 p-2 rounded text-xs font-mono">
                  Values: [1, 1, 1, 1, 2, 2, 3]<br/>
                  RLE: [(1, 4), (2, 2), (3, 1)]
                </div>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-purple-900/50">
                <h4 className="font-bold text-purple-400 mb-2">Delta Encoding</h4>
                <p className="text-sm mb-2">Best for: Sequential/monotonic data (timestamps, IDs)</p>
                <div className="bg-gray-800 p-2 rounded text-xs font-mono">
                  Values: [100, 101, 102, 103]<br/>
                  Delta: [100, +1, +1, +1]
                </div>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-orange-900/50">
                <h4 className="font-bold text-orange-400 mb-2">Bit-Packing</h4>
                <p className="text-sm mb-2">Best for: Small integers</p>
                <div className="bg-gray-800 p-2 rounded text-xs font-mono">
                  Values: [0, 1, 2, 3]<br/>
                  Uses 2 bits instead of 32 bits per int
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Layer 2: Compression Codecs</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-white">Codec</th>
                  <th className="text-left py-2 text-white">Ratio</th>
                  <th className="text-left py-2 text-white">Speed</th>
                  <th className="text-left py-2 text-white">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-blue-400 font-bold">Snappy</td>
                  <td className="py-2">2-3x</td>
                  <td className="py-2 text-green-400">Very Fast</td>
                  <td className="py-2">General purpose, default choice</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-purple-400 font-bold">GZIP</td>
                  <td className="py-2">4-5x</td>
                  <td className="py-2 text-yellow-400">Medium</td>
                  <td className="py-2">Better compression, slower reads</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-green-400 font-bold">ZSTD</td>
                  <td className="py-2">4-6x</td>
                  <td className="py-2 text-green-400">Fast</td>
                  <td className="py-2">Best balance (modern choice)</td>
                </tr>
                <tr>
                  <td className="py-2 text-orange-400 font-bold">LZ4</td>
                  <td className="py-2">2x</td>
                  <td className="py-2 text-green-400">Fastest</td>
                  <td className="py-2">CPU-bound workloads</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: Predicate Pushdown & Statistics */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-sm px-3 py-1 rounded-full">04</span>
          Predicate Pushdown & Statistics
        </h2>
        <p className="mb-6">
          Parquet's metadata enables <strong>query engines to skip reading entire row groups</strong> without decompressing data.
        </p>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Column Statistics in Action</h3>
          <p className="mb-4">Each column chunk stores min/max/null_count. Query engines use these to prune row groups.</p>
          
          <div className="bg-gray-900 p-4 rounded border border-gray-700 mb-4">
            <div className="text-yellow-400 font-mono text-sm mb-2">Query: SELECT * FROM users WHERE age {'>'} 50</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900 p-4 rounded border border-green-900">
              <div className="text-xs text-gray-400 mb-1">Row Group 1</div>
              <div className="text-sm">age: min=18, max=35</div>
              <div className="text-green-400 text-xs mt-2">✓ SKIP (max {'<'} 50)</div>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-green-900">
              <div className="text-xs text-gray-400 mb-1">Row Group 2</div>
              <div className="text-sm">age: min=36, max=55</div>
              <div className="text-blue-400 text-xs mt-2">⟳ READ (overlaps)</div>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-green-900">
              <div className="text-xs text-gray-400 mb-1">Row Group 3</div>
              <div className="text-sm">age: min=56, max=80</div>
              <div className="text-blue-400 text-xs mt-2">⟳ READ (min {'>'} 50)</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Bloom Filters (Advanced)</h3>
          <p className="mb-4">
            Parquet v2.10+ supports <strong>Bloom filters</strong> for equality checks (WHERE id = 12345), enabling fast negative lookups.
          </p>
          <CodeBlock language="python" code={`# Writing with Bloom filters (PyArrow)
import pyarrow.parquet as pq

pq.write_table(
    table,
    'data.parquet',
    bloom_filter_columns=['user_id'],
    bloom_filter_fpp=0.01  # 1% false positive rate
)`} />
        </div>
      </section>

      {/* Section 5: Writing & Reading */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-orange-600 text-sm px-3 py-1 rounded-full">05</span>
          Writing & Reading Best Practices
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Python (PyArrow/Pandas)</h3>
            <CodeBlock language="python" code={`import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq

# Write
df = pd.DataFrame({'id': [1, 2, 3], 'name': ['Alice', 'Bob', 'Charlie']})
table = pa.Table.from_pandas(df)
pq.write_table(
    table, 
    'output.parquet',
    compression='ZSTD',
    row_group_size=100000,
    use_dictionary=True
)

# Read
df = pd.read_parquet('output.parquet', columns=['id'])  # Column pruning
df = pd.read_parquet('output.parquet', filters=[('id', '>', 100)])  # Predicate pushdown`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Spark (Scala/PySpark)</h3>
            <CodeBlock language="python" code={`from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Parquet").getOrCreate()

# Write
df.write \\
    .mode("overwrite") \\
    .option("compression", "zstd") \\
    .partitionBy("year", "month") \\
    .parquet("s3://bucket/data/")

# Read with partition pruning
df = spark.read.parquet("s3://bucket/data/") \\
    .filter("year = 2024 AND month = 12") \\
    .select("id", "name")  # Column pruning`} />
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-yellow-900/50">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Performance Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Use <strong>ZSTD</strong> compression for best balance</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Set row group size to 128MB-1GB for optimal S3 reads</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Partition by low-cardinality columns (date, region)</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Avoid over-partitioning (small file problem)</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Use dictionary encoding for strings with {'<'}100k unique values</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Schema Evolution & Nested Data */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">06</span>
          Schema Evolution & Nested Data
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Schema Evolution</h3>
            <p className="mb-4">Parquet supports safe schema changes without rewriting data:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-900/20 p-4 rounded border border-green-900/50">
                <h4 className="text-green-400 font-bold mb-2">✓ Safe Operations</h4>
                <ul className="text-sm space-y-1">
                  <li>• Add new columns (defaults to null)</li>
                  <li>• Remove columns (ignored on read)</li>
                  <li>• Rename columns (logical mapping)</li>
                </ul>
              </div>
              <div className="bg-red-900/20 p-4 rounded border border-red-900/50">
                <h4 className="text-red-400 font-bold mb-2">✗ Unsafe Operations</h4>
                <ul className="text-sm space-y-1">
                  <li>• Change column data type</li>
                  <li>• Change nested structure depth</li>
                  <li>• Modify encoding (requires rewrite)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Nested & Complex Types</h3>
            <p className="mb-4">Parquet natively supports structs, arrays, and maps using the Dremel encoding.</p>
            <CodeBlock language="python" code={`# Complex schema example
schema = pa.schema([
    ('user_id', pa.int64()),
    ('profile', pa.struct([
        ('name', pa.string()),
        ('age', pa.int32())
    ])),
    ('tags', pa.list_(pa.string())),
    ('metadata', pa.map_(pa.string(), pa.string()))
])

# Nested column access in Spark
df.select("profile.name", "tags[0]").show()`} />
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-blue-900/50">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">🎯 When to Use Parquet</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-green-400 font-bold mb-2">Perfect For:</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Data lakes (S3, ADLS, GCS)</li>
                  <li>✓ OLAP / analytics workloads</li>
                  <li>✓ Large datasets ({'>'} 1GB)</li>
                  <li>✓ Column-heavy queries</li>
                  <li>✓ Spark, Presto, Athena, BigQuery</li>
                </ul>
              </div>
              <div>
                <h4 className="text-red-400 font-bold mb-2">NOT Ideal For:</h4>
                <ul className="text-sm space-y-1">
                  <li>✗ Row-level updates (use Delta/Iceberg)</li>
                  <li>✗ Streaming writes (high latency)</li>
                  <li>✗ Small files ({'<'} 100MB)</li>
                  <li>✗ Human-readable output</li>
                  <li>✗ Real-time point lookups</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="pt-8 border-t border-gray-700">
        <p className="text-sm text-gray-500">
          📚 Further Reading: <a href="https://parquet.apache.org/docs/" className="text-blue-400 hover:underline">Official Parquet Documentation</a> | 
          <a href="https://github.com/apache/parquet-format" className="text-blue-400 hover:underline ml-2">Parquet Format Spec</a>
        </p>
      </div>
    </div>
  );
};

export default ParquetDocs;
