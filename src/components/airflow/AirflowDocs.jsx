import React from 'react';
import { BookOpen, Server, Activity, Clock, GitBranch, Database, Shield, Cpu } from 'lucide-react';
import Mermaid from '../common/Mermaid';

const AirflowDocs = () => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          Apache Airflow
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          The industry standard for programmatic workflow orchestration. Define, schedule, and monitor complex data pipelines as code.
        </p>
      </div>

      {/* 1. Architecture */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-blue-400 border-b border-gray-700 pb-2">
          <Server className="w-8 h-8" />
          <h2>High-Level Architecture</h2>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <p className="text-gray-300 mb-6 leading-relaxed">
            Airflow is a distributed system consisting of several distinct components that work together to schedule and execute tasks. Understanding how these components interact is crucial for debugging and scaling.
          </p>
          
          {/* Mermaid Diagram */}

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6 overflow-x-auto flex justify-center">
            <Mermaid chart={`
graph TD
    subgraph "Control Plane"
        WS[Web Server] <--> DB[(Metadata DB)]
        SCH[Scheduler] <--> DB
        SCH --> EX[Executor]
    end
    
    subgraph "Data Plane"
        EX -.-> W1[Worker 1]
        EX -.-> W2[Worker 2]
        EX -.-> W3[Worker 3]
    end

    subgraph "Storage"
        DAGs[DAG Files] -.-> SCH
        DAGs -.-> WS
        DAGs -.-> W1
        DAGs -.-> W2
        DAGs -.-> W3
        Logs[Task Logs]
    end

    W1 --> Logs
    W2 --> Logs
    W3 --> Logs
    WS -.-> Logs

    style WS fill:#2563eb,stroke:#3b82f6,stroke-width:2px
    style SCH fill:#2563eb,stroke:#3b82f6,stroke-width:2px
    style DB fill:#7c3aed,stroke:#8b5cf6,stroke-width:2px
    style W1 fill:#059669,stroke:#10b981,stroke-width:2px
    style W2 fill:#059669,stroke:#10b981,stroke-width:2px
    style W3 fill:#059669,stroke:#10b981,stroke-width:2px
            `} />
            <p className="text-center text-gray-500 text-sm mt-2">Figure 1: Airflow Multi-Node Architecture</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <h3 className="font-bold text-blue-300 mb-2">The Scheduler</h3>
              <p className="text-sm text-gray-400">
                The heartbeat of Airflow. It monitors all tasks and DAGs, triggers task instances whose dependencies have been met, and submits them to the executor. It runs a continuous loop to check the state of the world in the Metadata DB.
              </p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <h3 className="font-bold text-purple-300 mb-2">Metadata Database</h3>
              <p className="text-sm text-gray-400">
                The source of truth (usually PostgreSQL or MySQL). It stores the state of all DAGs, task instances, variables, connections, and user information. The Scheduler writes to it, and the Webserver reads from it.
              </p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <h3 className="font-bold text-green-300 mb-2">Executors</h3>
              <p className="text-sm text-gray-400">
                Determines <em>how</em> and <em>where</em> tasks are run.
                <ul className="list-disc ml-4 mt-2 space-y-1">
                  <li><span className="text-white">SequentialExecutor</span>: Default, runs locally, no parallelism (SQLite).</li>
                  <li><span className="text-white">LocalExecutor</span>: Runs tasks as local processes. Good for single-node.</li>
                  <li><span className="text-white">CeleryExecutor</span>: Distributes tasks to a cluster of worker nodes via a message broker (Redis/RabbitMQ).</li>
                  <li><span className="text-white">KubernetesExecutor</span>: Launches a new Pod for every task instance. High isolation.</li>
                </ul>
              </p>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
              <h3 className="font-bold text-orange-300 mb-2">Web Server</h3>
              <p className="text-sm text-gray-400">
                A Flask application that provides the UI to inspect, trigger, and debug DAGs. It reads directly from the Metadata DB and DAG files but does not schedule tasks itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Concepts */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-teal-400 border-b border-gray-700 pb-2">
          <Activity className="w-8 h-8" />
          <h2>Core Concepts</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">DAGs, Operators, and Tasks</h3>
            <p className="text-gray-300 mb-4">
              A <strong>DAG (Directed Acyclic Graph)</strong> represents a workflow. It is a collection of tasks with dependencies.
            </p>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 font-mono text-sm text-gray-300 overflow-x-auto">
{`from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime

def process_data():
    print("Processing data...")

with DAG('example_dag', start_date=datetime(2023, 1, 1), schedule_interval='@daily') as dag:
    
    # Task 1: Extract
    extract = PythonOperator(
        task_id='extract_data',
        python_callable=lambda: print("Extracting")
    )

    # Task 2: Process
    process = PythonOperator(
        task_id='process_data',
        python_callable=process_data
    )

    # Dependency Definition
    extract >> process`}
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900/30 p-3 rounded border border-gray-700">
                <span className="font-bold text-teal-300">Operators</span>: Templates for tasks (e.g., `PythonOperator`, `BashOperator`, `PostgresOperator`). They define <em>what</em> to do.
              </div>
              <div className="bg-gray-900/30 p-3 rounded border border-gray-700">
                <span className="font-bold text-teal-300">Tasks</span>: Instantiated operators. A task instance represents a specific run of a task for a specific execution date.
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">XComs (Cross-Communication)</h3>
            <p className="text-gray-300 mb-4">
              Tasks in Airflow are isolated. XComs allow tasks to exchange small amounts of metadata (e.g., a file path, a status code).
            </p>
            <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-700/50">
              <h4 className="font-bold text-yellow-400 mb-2">⚠️ Critical Limitation</h4>
              <p className="text-sm text-gray-300">
                XComs are stored in the Metadata DB. <strong>Never pass large datasets (like DataFrames) through XComs.</strong> It will crash your database. Instead, save the data to S3/GCS and pass the <em>path</em> via XCom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Scheduling & Time */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-purple-400 border-b border-gray-700 pb-2">
          <Clock className="w-8 h-8" />
          <h2>Scheduling & Time Travel</h2>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Execution Date vs. Run Date</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                This is the most confusing concept for beginners. The <code>execution_date</code> is the <strong>start</strong> of the period being processed, not the time the task actually runs.
              </p>
              <div className="bg-gray-900 p-3 rounded border border-gray-700 text-sm">
                <p className="mb-2"><strong className="text-purple-300">Scenario:</strong> Daily DAG scheduled at 12:00 AM.</p>
                <p className="mb-1">Run for <code className="text-green-400">2023-01-01</code>:</p>
                <ul className="list-disc ml-4 text-gray-400">
                  <li>Period Starts: 2023-01-01 00:00</li>
                  <li>Period Ends: 2023-01-02 00:00</li>
                  <li><strong>Actual Run Time:</strong> 2023-01-02 00:00 (Wait for period to finish!)</li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Backfill & Catchup</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Airflow can run DAGs for past dates. This is powerful for reprocessing historical data.
              </p>
              <ul className="space-y-3">
                <li className="bg-gray-900/50 p-3 rounded border border-gray-700">
                  <strong className="text-purple-300">Catchup</strong>: If you pause a DAG for 5 days and unpause it, Airflow will schedule 5 runs to "catch up" by default. Set <code>catchup=False</code> to disable.
                </li>
                <li className="bg-gray-900/50 p-3 rounded border border-gray-700">
                  <strong className="text-purple-300">Backfill</strong>: CLI command to manually trigger runs for a specific date range.
                  <code className="block mt-1 text-xs bg-black p-1 rounded">airflow dags backfill -s 2023-01-01 -e 2023-01-31 my_dag</code>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Advanced Patterns */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-red-400 border-b border-gray-700 pb-2">
          <GitBranch className="w-8 h-8" />
          <h2>Advanced Patterns</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="font-bold text-white mb-2">Sensors</h3>
            <p className="text-sm text-gray-400 mb-4">
              Special operators that wait for an external event (e.g., a file landing in S3, a specific time, or another DAG to finish).
            </p>
            <div className="bg-red-900/20 p-3 rounded border border-red-700/30 text-xs">
              <strong>Tip:</strong> Use <code>mode='reschedule'</code> for long-running sensors to free up the worker slot while waiting.
            </div>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="font-bold text-white mb-2">Hooks</h3>
            <p className="text-sm text-gray-400">
              Interfaces to external platforms (AWS, Postgres, Slack). Operators use Hooks to do the heavy lifting. You can use Hooks directly in Python code to interact with systems without defining a full task.
            </p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="font-bold text-white mb-2">Dynamic DAGs</h3>
            <p className="text-sm text-gray-400">
              Since DAGs are Python code, you can generate them dynamically! For example, reading a config file (YAML/JSON) and creating one DAG per entry in a loop.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Production Best Practices */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 text-2xl font-bold text-green-400 border-b border-gray-700 pb-2">
          <Shield className="w-8 h-8" />
          <h2>Production Best Practices</h2>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-400 shrink-0" />
              <p className="text-gray-300 text-sm"><strong>Idempotency:</strong> Tasks should produce the same result if run multiple times. Use <code>INSERT OVERWRITE</code> instead of <code>APPEND</code>.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-400 shrink-0" />
              <p className="text-gray-300 text-sm"><strong>Avoid Top-Level Code:</strong> Don't make DB calls or heavy computations at the top level of your DAG file. The Scheduler parses this file every 30s!</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-400 shrink-0" />
              <p className="text-gray-300 text-sm"><strong>Task Granularity:</strong> Don't make tasks too small (overhead) or too big (monolithic, hard to retry). Atomic tasks are best.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-400 shrink-0" />
              <p className="text-gray-300 text-sm"><strong>Versioning:</strong> Version your DAGs (e.g., <code>my_dag_v1</code>) when making breaking changes to avoid messing up history.</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AirflowDocs;
