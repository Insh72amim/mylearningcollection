import React from 'react';
import Mermaid from '../common/Mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SQLDocs = () => {
  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">SQL: The Deep Dive</h1>
        <p className="text-xl text-gray-400">
          A comprehensive guide to Structured Query Language, from query fundamentals to advanced optimization techniques.
        </p>
      </div>

      {/* Section 1: SQL Fundamentals */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">01</span>
          SQL Query Execution Pipeline
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Understanding how a SQL database processes your query from <strong>parsing</strong> to <strong>execution</strong> is critical for writing efficient queries.
        </p>
        
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">The Query Execution Flow</h3>
          <Mermaid chart={`
            graph LR
              SQL[SQL Query] --> P[Parser]
              P --> LP[Logical Plan]
              LP --> OPT[Optimizer]
              OPT --> PP[Physical Plan]
              PP --> EX[Executor]
              EX --> R[Results]
              
              style OPT fill:#7c3aed,stroke:#a78bfa
              style PP fill:#059669,stroke:#10b981
          `} />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
            <div className="bg-gray-900 p-3 rounded">
              <strong className="text-blue-400 block mb-1">1. Parser</strong>
              Syntax check & AST creation
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <strong className="text-blue-400 block mb-1">2. Optimizer</strong>
              Cost-based query optimization
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <strong className="text-blue-400 block mb-1">3. Planner</strong>
              Generate execution plan
            </div>
            <div className="bg-gray-900 p-3 rounded">
              <strong className="text-blue-400 block mb-1">4. Executor</strong>
              Execute operations
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Joins Deep Dive */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">02</span>
          Join Types & Algorithms
        </h2>
        <p className="mb-6">
          Joins are the foundation of relational databases. Understanding different join types and their implementation algorithms is crucial.
        </p>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Join Types</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-900 p-3 rounded">
                  <strong className="text-blue-400">INNER JOIN</strong>
                  <p className="text-xs mt-1">Returns matching rows from both tables</p>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <strong className="text-green-400">LEFT/RIGHT JOIN</strong>
                  <p className="text-xs mt-1">Returns all from one table + matches from other</p>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <strong className="text-purple-400">FULL OUTER JOIN</strong>
                  <p className="text-xs mt-1">Returns all rows with NULLs for non-matches</p>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <strong className="text-orange-400">CROSS JOIN</strong>
                  <p className="text-xs mt-1">Cartesian product (every combination)</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">Join Algorithms</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-900 p-3 rounded">
                  <strong className="text-yellow-400">Nested Loop Join</strong>
                  <p className="text-xs mt-1">O(n×m) - For small tables or when no indexes</p>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <strong className="text-yellow-400">Hash Join</strong>
                  <p className="text-xs mt-1">O(n+m) - Build hash table from smaller table</p>
                </div>
                <div className="bg-gray-900 p-3 rounded">
                  <strong className="text-yellow-400">Merge Join</strong>
                  <p className="text-xs mt-1">O(n log n + m log m) - Requires sorted inputs</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray- 800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Join Example with Execution Plan</h3>
            <div className="rounded-lg overflow-hidden border border-gray-700">
              <SyntaxHighlighter language="sql" style={vscDarkPlus} showLineNumbers customStyle={{ margin: 0, padding: '1.5rem' }}>
{`-- Query: Find all orders with customer details
SELECT 
  c.name,
  o.order_id,
  o.total_amount
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
WHERE c.country = 'USA'
  AND o.order_date >= '2024-01-01';

-- Execution plan insights:
-- 1. Filter on customers.country (index scan if indexed)
-- 2. Filter on orders.order_date (index scan if indexed)
-- 3. Choose join algorithm:
--    - Hash Join if no indexes
--    - Index Nested Loop if orders.customer_id indexed
-- 4. Project only needed columns`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Indexes */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">03</span>
          Indexes & Query Performance
        </h2>
        <p className="mb-6">
          Indexes are data structures that improve query speed at the cost of write performance and storage.
        </p>

        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Index Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-900 p-4 rounded">
                <strong className="text-blue-400 block mb-2">B-Tree (Default)</strong>
                <p className="text-xs mb-2">Balanced tree structure. Good for range queries.</p>
                <code className="text-[10px] bg-gray-800 px-1 rounded block">O(log n) lookup</code>
              </div>
              <div className="bg-gray-900 p-4 rounded">
                <strong className="text-green-400 block mb-2">Hash Index</strong>
                <p className="text-xs mb-2">Fast equality checks. No range queries.</p>
                <code className="text-[10px] bg-gray-800 px-1 rounded block">O(1) lookup</code>
              </div>
              <div className="bg-gray-900 p-4 rounded">
                <strong className="text-purple-400 block mb-2">GiST/GIN (Postgres)</strong>
                <p className="text-xs mb-2">For full-text search, arrays, JSON.</p>
                <code className="text-[10px] bg-gray-800 px-1 rounded block">Specialized</code>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Creating Indexes</h3>
              <div className="rounded-lg overflow-hidden border border-gray-700">
                <SyntaxHighlighter language="sql" style={vscDarkPlus} showLineNumbers customStyle={{ margin: 0, padding: '1rem' }}>
{`-- Single column index
CREATE INDEX idx_users_email 
ON users(email);

-- Composite index (order matters!)
CREATE INDEX idx_orders_customer_date 
ON orders(customer_id, order_date);

-- Partial index (PostgreSQL)
CREATE INDEX idx_active_users 
ON users(email) 
WHERE is_active = true;

-- Covering index
CREATE INDEX idx_orders_covering 
ON orders(customer_id) 
INCLUDE (order_date, total);`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">When to Use Indexes</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-green-900/30 p-3 rounded border border-green-700/50">
                  <strong className="text-green-400">✓ Good for:</strong>
                  <ul className="mt-2 space-y-1 text-xs">
                    <li>• WHERE clauses (filtering)</li>
                    <li>• JOIN conditions</li>
                    <li>• ORDER BY columns</li>
                    <li>• Large tables with selective queries</li>
                  </ul>
                </div>
                <div className="bg-red-900/30 p-3 rounded border border-red-700/50">
                  <strong className="text-red-400">✗ Bad for:</strong>
                  <ul className="mt-2 space-y-1 text-xs">
                    <li>• Small tables (&lt; 1000 rows)</li>
                    <li>• Columns with low cardinality</li>
                    <li>• Write-heavy tables (INSERT/UPDATE cost)</li>
                    <li>• Queries that scan most rows</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Transactions & ACID */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-orange-600 text-sm px-3 py-1 rounded-full">04</span>
          Transactions & ACID Properties
        </h2>
        <p className="mb-6">
          Transactions ensure data integrity through <strong>ACID</strong> properties.
        </p>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
              <h4 className="font-bold text-blue-400 mb-2 text-lg">Atomicity</h4>
              <p className="text-sm">All or nothing. If one statement fails, the entire transaction rolls back.</p>
            </div>
            <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
              <h4 className="font-bold text-green-400 mb-2 text-lg">Consistency</h4>
              <p className="text-sm">Transactions move the database from one valid state to another.</p>
            </div>
            <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
              <h4 className="font-bold text-purple-400 mb-2 text-lg">Isolation</h4>
              <p className="text-sm">Concurrent transactions don't interfere with each other.</p>
            </div>
            <div className="bg-gray-800 p-5 rounded-xl border border-gray-700">
              <h4 className="font-bold text-orange-400 mb-2 text-lg">Durability</h4>
              <p className="text-sm">Committed data persists even after crashes.</p>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Isolation Levels</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left p-3 text-blue-400">Level</th>
                    <th className="text-left p-3 text-blue-400">Dirty Read</th>
                    <th className="text-left p-3 text-blue-400">Non-Repeatable</th>
                    <th className="text-left p-3 text-blue-400">Phantom</th>
                    <th className="text-left p-3 text-blue-400">Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="p-3 font-mono">READ UNCOMMITTED</td>
                    <td className="p-3 text-red-400">✗</td>
                    <td className="p-3 text-red-400">✗</td>
                    <td className="p-3 text-red-400">✗</td>
                    <td className="p-3 text-xs">Analytics (dirty data OK)</td>
                  </tr>
                  <tr className="bg-gray-900/50">
                    <td className="p-3 font-mono">READ COMMITTED</td>
                    <td className="p-3 text-green-400">✓</td>
                    <td className="p-3 text-red-400">✗</td>
                    <td className="p-3 text-red-400">✗</td>
                    <td className="p-3 text-xs">Default (PostgreSQL)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">REPEATABLE READ</td>
                    <td className="p-3 text-green-400">✓</td>
                    <td className="p-3 text-green-400">✓</td>
                    <td className="p-3 text-red-400">✗</td>
                    <td className="p-3 text-xs">Reports, batch jobs</td>
                  </tr>
                  <tr className="bg-gray-900/50">
                    <td className="p-3 font-mono">SERIALIZABLE</td>
                    <td className="p-3 text-green-400">✓</td>
                    <td className="p-3 text-green-400">✓</td>
                    <td className="p-3 text-green-400">✓</td>
                    <td className="p-3 text-xs">Financial transactions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Transaction Example</h3>
            <div className="rounded-lg overflow-hidden border border-gray-700">
              <SyntaxHighlighter language="sql" style={vscDarkPlus} showLineNumbers customStyle={{ margin: 0, padding: '1.5rem' }}>
{`-- Bank transfer: Atomic money movement
BEGIN TRANSACTION;

-- Deduct from account A
UPDATE accounts 
SET balance = balance - 100 
WHERE account_id = 'A123';

-- Add to account B
UPDATE accounts 
SET balance = balance + 100 
WHERE account_id = 'B456';

-- Check constraints
IF (SELECT balance FROM accounts WHERE account_id = 'A123') < 0 THEN
  ROLLBACK;  -- Insufficient funds
ELSE
  COMMIT;    -- Success
END IF;`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Query Optimization */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">05</span>
          Query Optimization Techniques
        </h2>
        
        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">EXPLAIN ANALYZE</h3>
            <p className="text-sm text-gray-400 mb-4">
              Always use <code className="bg-gray-900 px-1">EXPLAIN ANALYZE</code> to understand your query's execution plan.
            </p>
            <div className="rounded-lg overflow-hidden border border-gray-700">
              <SyntaxHighlighter language="sql" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem' }}>
{`EXPLAIN ANALYZE
SELECT * FROM orders 
WHERE customer_id = 123 
  AND order_date >= '2024-01-01';

-- Output shows:
-- - Seq Scan vs Index Scan
-- - Actual time vs Estimated time
-- - Rows scanned vs returned
-- - Join methods used`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-5 rounded-lg border border-gray-700">
              <h4 className="font-bold text-green-400 mb-3">✓ Best Practices</h4>
              <ul className="space-y-2 text-sm">
                <li>• SELECT only needed columns (avoid SELECT *)</li>
                <li>• Use WHERE to filter early</li>
                <li>• Index foreign keys and WHERE columns</li>
                <li>• Use LIMIT for pagination</li>
                <li>• Avoid functions in WHERE (prevents index use)</li>
                <li>• Use EXISTS instead of IN for subqueries</li>
              </ul>
            </div>

            <div className="bg-gray-900 p-5 rounded-lg border border-gray-700">
              <h4 className="font-bold text-red-400 mb-3">✗ Anti-Patterns</h4>
              <ul className="space-y-2 text-sm">
                <li>• N+1 queries (fetch in loop)</li>
                <li>• SELECT * with large tables</li>
                <li>• LIKE '%pattern%' (can't use index)</li>
                <li>• OR conditions (hard to optimize)</li>
                <li>• Unnecessary DISTINCT</li>
                <li>• Too many joins in one query</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Advanced SQL */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-sm px-3 py-1 rounded-full">06</span>
          Advanced SQL Features
        </h2>
        
        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Window Functions</h3>
            <p className="text-sm text-gray-400 mb-4">
              Perform calculations across rows related to the current row.
            </p>
            <div className="rounded-lg overflow-hidden border border-gray-700">
              <SyntaxHighlighter language="sql" style={vscDarkPlus} showLineNumbers customStyle={{ margin: 0, padding: '1.5rem' }}>
{`-- Running total
SELECT 
  order_id,
  order_date,
  amount,
  SUM(amount) OVER (ORDER BY order_date) as running_total
FROM orders;

-- Rank within partition
SELECT 
  product_name,
  category,
  price,
  RANK() OVER (PARTITION BY category ORDER BY price DESC) as price_rank
FROM products;

-- Moving average (last 7 days)
SELECT 
  date,
  revenue,
  AVG(revenue) OVER (
    ORDER BY date 
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) as moving_avg_7d
FROM daily_sales;`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Common Table Expressions (CTEs)</h3>
            <div className="rounded-lg overflow-hidden border border-gray-700">
              <SyntaxHighlighter language="sql" style={vscDarkPlus} showLineNumbers customStyle={{ margin: 0, padding: '1.5rem' }}>
{`-- Recursive CTE: Organization hierarchy
WITH RECURSIVE org_chart AS (
  -- Base case: CEO
  SELECT id, name, manager_id, 1 as level
  FROM employees
  WHERE manager_id IS NULL
  
  UNION ALL
  
  -- Recursive case: direct reports
  SELECT e.id, e.name, e.manager_id, oc.level + 1
  FROM employees e
  INNER JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart ORDER BY level, name;`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">JSONB (PostgreSQL)</h3>
              <div className="rounded-lg overflow-hidden border border-gray-700">
                <SyntaxHighlighter language="sql" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', fontSize: '0.75rem' }}>
{`-- Query JSON data
SELECT 
  id,
  data->>'name' as name,
  data->'address'->>'city' as city
FROM users
WHERE data @> '{"active": true}';

-- Create GIN index for fast JSON queries
CREATE INDEX idx_users_data 
ON users USING GIN (data);`}
                </SyntaxHighlighter>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Materialized Views</h3>
              <div className="rounded-lg overflow-hidden border border-gray-700">
                <SyntaxHighlighter language="sql" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem', fontSize: '0.75rem' }}>
{`-- Pre-compute expensive aggregations
CREATE MATERIALIZED VIEW daily_summary AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as order_count,
  SUM(total) as revenue
FROM orders
GROUP BY DATE(created_at);

-- Refresh periodically
REFRESH MATERIALIZED VIEW daily_summary;`}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default SQLDocs;
