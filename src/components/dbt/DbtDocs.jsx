import React from 'react';
import { Database, Layers, GitBranch, CheckCircle, FileText, RefreshCw, Shield } from 'lucide-react';
import Mermaid from '../common/Mermaid';

const DbtDocs = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          dbt (data build tool)
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Transform data in your warehouse. The standard for analytics engineering, bringing software engineering best practices to SQL.
        </p>
      </div>

      {/* 1. Architecture */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-orange-400 border-b border-gray-700 pb-2">
          <Layers className="w-8 h-8" />
          <h2>The dbt Workflow (ELT)</h2>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <p className="text-gray-300 mb-6 leading-relaxed">
            dbt sits on top of your data warehouse. It doesn't extract or load data (that's for tools like Fivetran/Airbyte). It focuses purely on the <strong>Transform</strong> step of ELT.
          </p>
          
          {/* Mermaid Diagram */}

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6 overflow-x-auto flex justify-center">
            <Mermaid chart={`
graph LR
    subgraph "Sources (Raw Data)"
        S1[Postgres]
        S2[Stripe API]
        S3[Google Sheets]
    end

    subgraph "Data Warehouse (Snowflake/BigQuery)"
        Raw[Raw Tables]
        Staging[Staging Models]
        Inter[Intermediate Models]
        Marts[Data Marts]
    end

    subgraph "dbt"
        Compile[Compiler]
        Run[Runner]
        Docs[Docs Site]
    end

    S1 --> Raw
    S2 --> Raw
    S3 --> Raw

    Raw --> Staging
    Staging --> Inter
    Inter --> Marts

    dbt -.-> Staging
    dbt -.-> Inter
    dbt -.-> Marts

    style dbt fill:#ea580c,stroke:#c2410c,stroke-width:2px
    style Marts fill:#059669,stroke:#10b981,stroke-width:2px
            `} />
            <p className="text-center text-gray-500 text-sm mt-2">Figure 1: The ELT Workflow with dbt</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <h3 className="font-bold text-orange-300 mb-2">Compilation</h3>
              <p className="text-sm text-gray-400">
                dbt compiles your code (SQL + Jinja) into raw SQL. It handles dependency resolution, ensuring models run in the correct order (DAG).
              </p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <h3 className="font-bold text-green-300 mb-2">Materialization</h3>
              <p className="text-sm text-gray-400">
                dbt wraps your SELECT statements in DDL (Data Definition Language). You just write the logic; dbt handles the <code>CREATE TABLE/VIEW</code> boilerplate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Concepts */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-blue-400 border-b border-gray-700 pb-2">
          <FileText className="w-8 h-8" />
          <h2>Models & Materializations</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Everything is a SELECT statement</h3>
            <p className="text-gray-300 mb-4">
              A model is just a `.sql` file in your `models/` directory.
            </p>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 font-mono text-sm text-gray-300 overflow-x-auto">
{`-- models/customers.sql

{{ config(materialized='table') }}

WITH orders AS (
    SELECT * FROM {{ ref('stg_orders') }}
),

payments AS (
    SELECT * FROM {{ ref('stg_payments') }}
)

SELECT
    o.customer_id,
    SUM(p.amount) as lifetime_value
FROM orders o
LEFT JOIN payments p ON o.order_id = p.order_id
GROUP BY 1`}
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/30 p-3 rounded border border-gray-700">
                  <span className="font-bold text-orange-300">Jinja Templating</span>: Use <code>{`{{ ref('model_name') }}`}</code> to reference other models. This builds the lineage graph automatically.
              </div>
              <div className="bg-gray-900/30 p-3 rounded border border-gray-700">
                <span className="font-bold text-orange-300">Config</span>: Define how the model should be built (table, view, incremental) right in the file.
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Materialization Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <h4 className="font-bold text-blue-300 mb-1">View</h4>
                <p className="text-xs text-gray-400">Default. Creates a view. Fast to build, computed at query time.</p>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <h4 className="font-bold text-blue-300 mb-1">Table</h4>
                <p className="text-xs text-gray-400">Creates a physical table. Slower to build, fast to query.</p>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <h4 className="font-bold text-blue-300 mb-1">Incremental</h4>
                <p className="text-xs text-gray-400">Only processes new/changed records. Essential for large datasets.</p>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <h4 className="font-bold text-blue-300 mb-1">Ephemeral</h4>
                <p className="text-xs text-gray-400">Not materialized. Injected as a CTE into downstream models.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Testing & Documentation */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-green-400 border-b border-gray-700 pb-2">
          <CheckCircle className="w-8 h-8" />
          <h2>Testing & Documentation</h2>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <p className="text-gray-300 mb-6">
            dbt treats data quality and documentation as first-class citizens. You define them in YAML files alongside your models.
          </p>

          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 font-mono text-sm text-gray-300 overflow-x-auto mb-6">
{`version: 2

models:
  - name: customers
    description: "One record per customer with LTV."
    columns:
      - name: customer_id
        description: "Primary key"
        tests:
          - unique
          - not_null
      - name: status
        tests:
          - accepted_values:
              values: ['active', 'churned']`}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <h3 className="font-bold text-green-300 mb-2">Generic Tests</h3>
              <p className="text-sm text-gray-400">
                Out-of-the-box tests: `unique`, `not_null`, `accepted_values`, `relationships` (foreign key).
              </p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <h3 className="font-bold text-green-300 mb-2">Singular Tests</h3>
              <p className="text-sm text-gray-400">
                Custom SQL queries that return failing rows. If the query returns 0 rows, the test passes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Advanced Features */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-purple-400 border-b border-gray-700 pb-2">
          <RefreshCw className="w-8 h-8" />
          <h2>Advanced Features</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="font-bold text-white mb-2">Snapshots</h3>
            <p className="text-sm text-gray-400">
              Implements <strong>Type 2 Slowly Changing Dimensions (SCD)</strong>. Tracks how data changes over time by adding `valid_from` and `valid_to` columns.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="font-bold text-white mb-2">Seeds</h3>
            <p className="text-sm text-gray-400">
              Version control small static datasets (CSV files) like country codes or mapping tables directly in your git repo.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="font-bold text-white mb-2">Macros</h3>
            <p className="text-sm text-gray-400">
              Reusable snippets of SQL (like functions) written in Jinja. Abstract away complex logic or dialect-specific SQL.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DbtDocs;
