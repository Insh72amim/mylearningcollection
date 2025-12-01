import React from 'react';
import Mermaid from '../common/Mermaid';
import CodeBlock from '../common/CodeBlock';

const SnowflakeDocs = () => {
  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Snowflake: The Deep Dive</h1>
        <p className="text-xl text-gray-400">
          A comprehensive guide to the cloud data warehouse that revolutionized analytics with its unique multi-cluster shared data architecture.
        </p>
      </div>

      {/* Section 1: Architecture Deep Dive */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">01</span>
          Multi-Cluster Shared Data Architecture
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Snowflake's genius: <strong>separate compute from storage</strong>. Unlike traditional databases, Snowflake has three independent layers.
        </p>
        
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">The Three-Layer Architecture</h3>
          <Mermaid chart={`
            graph TB
              subgraph Users [Users & Applications]
                U1[BI Tools]
                U2[ETL Pipelines]
                U3[Data Scientists]
              end
              
              subgraph Compute [Virtual Warehouses - Compute Layer]
                VW1[VW: SMALL<br/>1 node]
                VW2[VW: LARGE<br/>8 nodes]
                VW3[VW: X-LARGE<br/>16 nodes]
              end
              
              subgraph Services [Cloud Services Layer]
                AUTH[Authentication]
                META[Metadata]
                QO[Query Optimizer]
                TX[Transaction Manager]
              end
              
              subgraph Storage [Storage Layer - S3/Azure Blob/GCS]
                T1[(Table 1<br/>Micro-partitions)]
                T2[(Table 2<br/>Micro-partitions)]
                T3[(Table 3<br/>Micro-partitions)]
              end
              
              U1 --> Services
              U2 --> Services
              U3 --> Services
              
              Services --> VW1
              Services --> VW2
              Services --> VW3
              
              VW1 --> Storage
              VW2 --> Storage
              VW3 --> Storage
              
              style Services fill:#7c2d12,stroke:#f97316
              style Compute fill:#1e3a8a,stroke:#3b82f6
              style Storage fill:#065f46,stroke:#10b981
          `} />
          
          <div className="mt-6 space-y-4">
            <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
              <strong className="text-blue-400">Compute Layer (Virtual Warehouses)</strong>
              <p className="text-sm mt-2">Independent compute clusters. Auto-suspend when idle. Scale up/down instantly.</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-orange-900/50">
              <strong className="text-orange-400">Services Layer</strong>
              <p className="text-sm mt-2">Brain of Snowflake: query optimization, metadata, access control, always-on.</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-green-900/50">
              <strong className="text-green-400">Storage Layer</strong>
              <p className="text-sm mt-2">Columnar, compressed, immutable micro-partitions on cloud object storage.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Why This Architecture Wins</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-green-400 font-bold mb-3">Benefits</h4>
              <ul className="text-sm space-y-2">
                <li className="flex gap-2"><span className="text-green-400">✓</span> Infinite concurrency (spin up 100 warehouses)</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Zero storage management (cloud handles it)</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Pay only for compute used (auto-suspend)</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Instant scaling (no downtime)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-orange-400 font-bold mb-3">vs Traditional Databases</h4>
              <ul className="text-sm space-y-2">
                <li className="flex gap-2"><span className="text-red-400">✗</span> Single compute pool (contention)</li>
                <li className="flex gap-2"><span className="text-red-400">✗</span> Disk management overhead</li>
                <li className="flex gap-2"><span className="text-red-400">✗</span> Always-on pricing</li>
                <li className="flex gap-2"><span className="text-red-400">✗</span> Downtime for scaling</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Virtual Warehouses */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">02</span>
          Virtual Warehouses & Auto-Scaling
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Warehouse Sizes</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-white">Size</th>
                  <th className="text-left py-2 text-white">Nodes</th>
                  <th className="text-left py-2 text-white">Credits/Hour</th>
                  <th className="text-left py-2 text-white">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-2 font-bold">X-Small</td>
                  <td className="py-2">1</td>
                  <td className="py-2">1</td>
                  <td className="py-2">Dev/test, simple queries</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 font-bold">Small</td>
                  <td className="py-2">2</td>
                  <td className="py-2">2</td>
                  <td className="py-2">Light production</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 font-bold text-blue-400">Medium</td>
                  <td className="py-2">4</td>
                  <td className="py-2">4</td>
                  <td className="py-2">Standard production</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 font-bold text-green-400">Large</td>
                  <td className="py-2">8</td>
                  <td className="py-2">8</td>
                  <td className="py-2">Heavy ETL, large scans</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 font-bold">X-Large</td>
                  <td className="py-2">16</td>
                  <td className="py-2">16</td>
                  <td className="py-2">Complex joins, aggregations</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-purple-400">6X-Large</td>
                  <td className="py-2">128</td>
                  <td className="py-2">128</td>
                  <td className="py-2">Massive parallel queries</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Multi-Cluster Warehouses</h3>
            <CodeBlock language="sql" code={`-- Create auto-scaling warehouse
CREATE WAREHOUSE ETL_WH
    WAREHOUSE_SIZE = 'LARGE'
    MIN_CLUSTER_COUNT = 1
    MAX_CLUSTER_COUNT = 10
    SCALING_POLICY = 'STANDARD'    -- Start new cluster when queue builds up
    AUTO_SUSPEND = 60              -- Suspend after 60 seconds idle
    AUTO_RESUME = TRUE;            -- Auto-start on query

-- Economy mode: slower to scale, cheaper
ALTER WAREHOUSE ETL_WH SET SCALING_POLICY = 'ECONOMY';`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Result Set Caching</h3>
            <p className="mb-4">Snowflake caches query results for 24 hours. Identical queries = instant results, zero compute cost.</p>
            <Mermaid chart={`
              sequenceDiagram
                participant U1 as User 1
                participant VW as Virtual Warehouse
                participant RC as Result Cache
                participant S as Storage
                
                U1->>VW: SELECT * FROM sales WHERE date='2024-01-15'
                VW->>S: Read micro-partitions
                S->>VW: Data
                VW->>VW: Process query
                VW->>RC: Cache result (24h TTL)
                VW->>U1: Result
                
                Note over U1,RC: 10 minutes later...
                
                participant U2 as User 2
                U2->>VW: SELECT * FROM sales WHERE date='2024-01-15' (exact same)
                VW->>RC: Check cache
                RC->>U2: Cached result (0 compute cost!)
            `} />
          </div>
        </div>
      </section>

      {/* Section 3: Micro-partitions & Clustering */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">03</span>
          Micro-Partitions & Clustering
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">What are Micro-Partitions?</h3>
            <p className="mb-4">
              Snowflake automatically splits tables into immutable, compressed, columnar micro-partitions (50-500MB uncompressed).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-blue-400 font-bold mb-3">Automatic Features</h4>
                <ul className="text-sm space-y-1">
                  <li>• No user-defined partitions (unlike Hive)</li>
                  <li>• Automatically maintains statistics (min/max/distinct)</li>
                  <li>• Immutable (updates create new micro-partitions)</li>
                  <li>• Columnar compression (5-10x typical)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-green-400 font-bold mb-3">Query Optimization</h4>
                <ul className="text-sm space-y-1">
                  <li>• Pruning: Skip micro-partitions using metadata</li>
                  <li>• Min/max zone maps for every column</li>
                  <li>• Bloom filters for equality checks</li>
                  <li>• Automatic columnar projection</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Clustering Keys</h3>
            <p className="mb-4">For large tables, define clustering to co-locate related data:</p>
            <CodeBlock language="sql" code={`-- Define clustering key (sort order)
ALTER TABLE events CLUSTER BY (event_date, user_id);

-- Snowflake will automatically re-cluster in the background
-- Check clustering health
SELECT SYSTEM$CLUSTERING_INFORMATION('events', '(event_date, user_id)');

-- Manual re-clustering (usually not needed)
ALTER TABLE events RECLUSTER;

-- Monitor clustering depth (lower = better)
SELECT 
    table_name,
    clustering_key,
    average_depth,
    average_overlaps
FROM TABLE(INFORMATION_SCHEMA.AUTOMATIC_CLUSTERING_HISTORY())
WHERE table_name = 'EVENTS';`} />
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-yellow-900/50">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Clustering Best Practices</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Cluster on columns used in WHERE clauses (date, region, category)</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Use 1-4 columns max (diminishing returns)</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> High-cardinality columns first (date before boolean)</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Only cluster tables {'>'} 1TB (overhead for small tables)</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Enable automatic clustering for frequently updated tables</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 4: Time Travel & Fail-Safe */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-sm px-3 py-1 rounded-full">04</span>
          Time Travel & Data Protection
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Time Travel Capabilities</h3>
            <Mermaid chart={`
              timeline
                title Data Retention Timeline
                section Time Travel (Queryable)
                  Standard: 1 day (default)
                  Enterprise: Up to 90 days
                section Fail-Safe (Recovery Only)
                  All Editions: 7 days after Time Travel
                section Permanently Deleted
                  After Fail-Safe: Data gone
            `} />
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
                <h4 className="font-bold text-blue-400 mb-2">Time Travel (User-Accessible)</h4>
                <p className="text-sm mb-2">Query historical data, restore dropped objects</p>
                <CodeBlock language="sql" code={`-- Query table as of 1 hour ago
SELECT * FROM sales
AT(OFFSET => -3600);

-- Query at specific timestamp
SELECT * FROM sales
AT(TIMESTAMP => '2024-01-15 10:00:00');

-- Restore dropped table
UNDROP TABLE sales;

-- Clone table at point in time
CREATE TABLE sales_backup
CLONE sales
AT(TIMESTAMP => '2024-01-15 00:00:00');`} />
              </div>
              <div className="bg-gray-900 p-4 rounded border border-red-900/50">
                <h4 className="font-bold text-red-400 mb-2">Fail-Safe (Snowflake-Only)</h4>
                <p className="text-sm mb-2">No user access. Contact Snowflake support for recovery.</p>
                <ul className="text-sm space-y-1 mt-3">
                  <li>• Last resort disaster recovery</li>
                  <li>• Automatic for all permanent tables</li>
                  <li>• No additional cost (included)</li>
                  <li>• 7-day window after Time Travel expires</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Zero-Copy Cloning</h3>
            <p className="mb-4">Clone entire databases/schemas/tables instantly without copying data.</p>
            <CodeBlock language="sql" code={`-- Clone production database for testing (instant, no extra storage initially)
CREATE DATABASE dev_db CLONE prod_db;

-- Clone table for experimentation
CREATE TABLE sales_experiment CLONE sales;

-- Clone shares metadata only; storage is shared until modifications
-- Modified micro-partitions are copied (copy-on-write)`} />
          </div>
        </div>
      </section>

      {/* Section 5: Data Sharing */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-orange-600 text-sm px-3 py-1 rounded-full">05</span>
          Secure Data Sharing
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">How Data Sharing Works</h3>
            <Mermaid chart={`
              graph LR
                subgraph Provider Account
                  DB[(Production DB)]
                  SHARE[Share Object]
                  DB --> SHARE
                end
                
                subgraph Consumer Account 1
                  VWDB1[(Virtual DB)]
                end
                
                subgraph Consumer Account 2
                  VWDB2[(Virtual DB)]
                end
                
                SHARE -.-> VWDB1
                SHARE -.-> VWDB2
                
                style SHARE fill:#1e3a8a,stroke:#3b82f6
                style VWDB1 fill:#065f46,stroke:#10b981
                style VWDB2 fill:#065f46,stroke:#10b981
            `} />
            
            <div className="mt-6 bg-gray-900 p-4 rounded border border-gray-700">
              <p className="text-sm">
                <strong className="text-blue-400">Key Feature:</strong> No data movement. Consumer queries directly access provider's storage. Provider pays storage, consumer pays compute.
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Creating a Share</h3>
            <CodeBlock language="sql" code={`-- Provider: Create and configure share
CREATE SHARE sales_share;

-- Add database/schema/tables
GRANT USAGE ON DATABASE prod_db TO SHARE sales_share;
GRANT USAGE ON SCHEMA prod_db.public TO SHARE sales_share;
GRANT SELECT ON TABLE prod_db.public.sales TO SHARE sales_share;

-- Add consumer account
ALTER SHARE sales_share ADD ACCOUNTS = XYZ12345;

-- Consumer: Create database from share
CREATE DATABASE shared_sales_data 
FROM SHARE provider_account.sales_share;

-- Query shared data (no copy!)
SELECT * FROM shared_sales_data.public.sales;`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Secure Views for Row-Level Security</h3>
            <CodeBlock language="sql" code={`-- Provider: Create secure view with row filtering
CREATE SECURE VIEW sales_filtered AS
SELECT 
    order_id,
    product,
    amount,
    customer_id
FROM sales
WHERE region = CURRENT_ACCOUNT();  -- Only show data for consumer's region

-- Share the view (not the base table)
GRANT SELECT ON VIEW sales_filtered TO SHARE sales_share;

-- Consumer sees only their region's data
-- Cannot see view definition (SECURE keyword)`} />
          </div>
        </div>
      </section>

      {/* Section 6: Performance Optimization */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">06</span>
          Query Optimization & Monitoring
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Query Profile - The Ultimate Debug Tool</h3>
            <CodeBlock language="sql" code={`-- Get query ID
SELECT QUERY_ID, QUERY_TEXT, EXECUTION_TIME 
FROM TABLE(INFORMATION_SCHEMA.QUERY_HISTORY())
WHERE QUERY_TEXT LIKE '%sales%'
ORDER BY START_TIME DESC
LIMIT 10;

-- Analyze query profile (in Snowflake UI: Query ID → Query Profile)
-- Shows:
-- - Execution plan with node-level metrics
-- - Partitions scanned vs pruned
-- - Spilling to disk (bad!)
-- - Join strategies`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Materialized Views</h3>
            <CodeBlock language="sql" code={`-- Create materialized view (automatically maintained)
CREATE MATERIALIZED VIEW daily_sales_summary AS
SELECT 
    DATE(order_time) AS order_date,
    product_category,
    SUM(amount) AS total_sales,
    COUNT(*) AS order_count
FROM sales
GROUP BY DATE(order_time), product_category;

-- Query the MV (instant, pre-computed)
SELECT * FROM daily_sales_summary WHERE order_date = '2024-01-15';

-- Snowflake auto-refreshes when base table changes
-- Manual refresh if needed
ALTER MATERIALIZED VIEW daily_sales_summary REFRESH;`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Search Optimization Service</h3>
            <CodeBlock language="sql" code={`-- Enable for point lookups (WHERE col = value)
ALTER TABLE customers ADD SEARCH OPTIMIZATION ON EQUALITY(email, phone);

-- Automatically creates/maintains search access paths
-- Dramatically speeds up:
-- - WHERE email = 'alice@example.com'
-- - WHERE phone IN ('555-1234', '555-5678')

-- Check search optimization progress
SELECT * FROM TABLE(INFORMATION_SCHEMA.SEARCH_OPTIMIZATION_HISTORY(
    TABLE_NAME => 'CUSTOMERS'
));`} />
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-yellow-900/50">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Performance Checklist</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> Use <strong>clustering keys</strong> for large tables with filter patterns</li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> Enable <strong>search optimization</strong> for point lookups</li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> Create <strong>materialized views</strong> for expensive aggregations</li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> Use <strong>result caching</strong> (free!) for repeated queries</li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> Right-size warehouses (check Query Profile for spilling)</li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> Use <strong>transient tables</strong> for ETL staging (no Fail-Safe cost)</li>
              <li className="flex gap-2"><span className="text-yellow-400">✓</span> Monitor credit usage: ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Cost Monitoring</h3>
            <CodeBlock language="sql" code={`-- Top 10 most expensive queries (by credits)
SELECT 
    query_id,
    query_text,
    warehouse_name,
    credits_used_cloud_services,
    execution_time
FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
WHERE execution_time > 1000  -- > 1 second
ORDER BY credits_used_cloud_services DESC
LIMIT 10;

-- Daily credit consumption by warehouse
SELECT 
    DATE(start_time) AS date,
    warehouse_name,
    SUM(credits_used) AS total_credits
FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
GROUP BY DATE(start_time), warehouse_name
ORDER BY date DESC, total_credits DESC;`} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="pt-8 border-t border-gray-700">
        <p className="text-sm text-gray-500">
          📚 Further Reading: <a href="https://docs.snowflake.com/" className="text-blue-400 hover:underline">Official Snowflake Documentation</a> | 
          <a href="https://community.snowflake.com/" className="text-blue-400 hover:underline ml-2">Snowflake Community</a>
        </p>
      </div>
    </div>
  );
};

export default SnowflakeDocs;
