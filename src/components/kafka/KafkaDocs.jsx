import React from 'react';
import Mermaid from '../common/Mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const KafkaDocs = () => {
  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Apache Kafka: The Deep Dive</h1>
        <p className="text-xl text-gray-400">
          A comprehensive guide to the internals, architecture, and reliability mechanisms of the world's most popular event streaming platform.
        </p>
      </div>

      {/* Section 1: Core Architecture */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">01</span>
          Core Architecture
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Kafka is not just a message queue; it is a <strong>distributed commit log</strong>. Its architecture is designed for horizontal scalability and fault tolerance.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">The Cluster Model</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">Broker:</span>
                <span>A single server in the cluster. Holds partitions.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">Controller:</span>
                <span>The broker responsible for maintaining cluster state (electing leaders).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold">Zookeeper / KRaft:</span>
                <span>Stores metadata (topic configs, ACLs). KRaft removes the Zookeeper dependency.</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-700 flex items-center justify-center">
            <Mermaid chart={`
              graph TD
                C[Controller Broker] -->|Manage| B2[Broker 2]
                C -->|Manage| B3[Broker 3]
                ZK[Zookeeper/KRaft] -.->|Metadata| C
                P[Producer] -->|Push| LB{Load Balancer}
                LB --> B2
                LB --> B3
            `} />
          </div>
        </div>
      </section>

      {/* Section 2: Storage Internals */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">02</span>
          Storage Internals
        </h2>
        <p className="mb-6">
          How does Kafka store data on disk so efficiently? It uses <strong>Segments</strong>.
        </p>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Anatomy of a Partition</h3>
          <p className="mb-4">
            A partition is split into multiple <strong>Segment Files</strong> (`.log`). 
            Each segment has a corresponding <strong>Index File</strong> (`.index`) for fast lookups.
          </p>
          <Mermaid chart={`
            graph LR
              subgraph Partition Dir
                S1[0000.log] --- I1[0000.index]
                S2[1000.log] --- I2[1000.index]
                S3[2000.log] --- I3[2000.index]
              end
              style S3 fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px
              style I3 fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px
          `} />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-900 p-3 rounded border border-gray-600">
              <strong className="text-blue-400 block mb-1">Sequential I/O</strong>
              Kafka always appends to the end of the file. This avoids slow random disk seeks.
            </div>
            <div className="bg-gray-900 p-3 rounded border border-gray-600">
              <strong className="text-blue-400 block mb-1">Zero Copy</strong>
              Data is transferred from disk to network without copying to application memory (via `sendfile`).
            </div>
            <div className="bg-gray-900 p-3 rounded border border-gray-600">
              <strong className="text-blue-400 block mb-1">Page Cache</strong>
              Kafka relies heavily on the OS page cache (RAM) for speed.
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Reliability & Replication */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">03</span>
          Reliability & Replication
        </h2>
        <p className="mb-6">
          Kafka guarantees no data loss through <strong>Replication</strong> and <strong>In-Sync Replicas (ISR)</strong>.
        </p>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">Leader & Followers</h3>
            <p className="mb-4 text-gray-400">
              Every partition has one <strong>Leader</strong> (handles all reads/writes) and multiple <strong>Followers</strong> (passive replicators).
            </p>
            <Mermaid chart={`
              sequenceDiagram
                participant P as Producer
                participant L as Leader Broker
                participant F1 as Follower 1
                participant F2 as Follower 2
                
                P->>L: Send Message
                L->>L: Write to Local Log
                par Replicate
                    L->>F1: Send Data
                    L->>F2: Send Data
                end
                F1->>L: ACK
                F2->>L: ACK
                L->>P: ACK (Committed)
            `} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-5 rounded-lg border border-red-900/50">
              <h4 className="font-bold text-red-400 mb-2">acks=0 (Fire & Forget)</h4>
              <p className="text-sm">Producer sends and doesn't wait. Fastest, but highest risk of data loss.</p>
            </div>
            <div className="bg-gray-900 p-5 rounded-lg border border-yellow-900/50">
              <h4 className="font-bold text-yellow-400 mb-2">acks=1 (Leader Only)</h4>
              <p className="text-sm">Producer waits for Leader to write. Safe unless Leader crashes immediately.</p>
            </div>
            <div className="bg-gray-900 p-5 rounded-lg border border-green-900/50 md:col-span-2">
              <h4 className="font-bold text-green-400 mb-2">acks=all (Strongest)</h4>
              <p className="text-sm">Producer waits for Leader AND all In-Sync Replicas. Zero data loss guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Code Examples */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-orange-600 text-sm px-3 py-1 rounded-full">04</span>
          Production-Grade Code
        </h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-blue-300 mb-3">Robust Java Producer</h3>
            <p className="text-sm text-gray-400 mb-3">
              Configured for high durability (`acks=all`) and high throughput (`linger.ms`, `batch.size`).
            </p>
            <div className="rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
              <SyntaxHighlighter language="java" style={vscDarkPlus} showLineNumbers customStyle={{ margin: 0, padding: '1.5rem' }}>
{`import org.apache.kafka.clients.producer.*;
import java.util.Properties;

public class SecureProducer {
    public static void main(String[] args) {
        Properties props = new Properties();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka-broker:9092");
        
        // Reliability Configs
        props.put(ProducerConfig.ACKS_CONFIG, "all");             // Wait for all replicas
        props.put(ProducerConfig.RETRIES_CONFIG, Integer.MAX_VALUE); // Retry forever
        props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, "true"); // Prevent duplicates
        
        // Throughput Configs
        props.put(ProducerConfig.LINGER_MS_CONFIG, "20");         // Wait 20ms to batch
        props.put(ProducerConfig.BATCH_SIZE_CONFIG, Integer.toString(32 * 1024)); // 32KB batch

        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringSerializer");

        try (Producer<String, String> producer = new KafkaProducer<>(props)) {
            for (int i = 0; i < 100; i++) {
                String key = "user_id_" + i;
                String value = "login_event_" + System.currentTimeMillis();
                
                // Asynchronous send with callback
                producer.send(new ProducerRecord<>("user-events", key, value), (metadata, exception) -> {
                    if (exception != null) {
                        System.err.println("Delivery failed: " + exception.getMessage());
                    } else {
                        System.out.printf("Sent to %s-%d @ offset %d%n", 
                            metadata.topic(), metadata.partition(), metadata.offset());
                    }
                });
            }
        }
    }
}`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-green-300 mb-3">Robust Java Consumer</h3>
            <p className="text-sm text-gray-400 mb-3">
              Demonstrating manual offset management for "At-Least-Once" processing.
            </p>
            <div className="rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
              <SyntaxHighlighter language="java" style={vscDarkPlus} showLineNumbers customStyle={{ margin: 0, padding: '1.5rem' }}>
{`import org.apache.kafka.clients.consumer.*;
import java.time.Duration;
import java.util.Collections;
import java.util.Properties;

public class ReliableConsumer {
    public static void main(String[] args) {
        Properties props = new Properties();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "kafka-broker:9092");
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "payment-processors");
        
        // Disable auto-commit to ensure we process before committing
        props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, "false");
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");

        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer");
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, "org.apache.kafka.common.serialization.StringDeserializer");

        try (KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props)) {
            consumer.subscribe(Collections.singletonList("payments"));

            while (true) {
                ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
                
                for (ConsumerRecord<String, String> record : records) {
                    processPayment(record.value()); // Custom business logic
                }
                
                // Commit only after successful processing
                try {
                    consumer.commitSync();
                } catch (CommitFailedException e) {
                    System.err.println("Commit failed: " + e.getMessage());
                }
            }
        }
    }

    private static void processPayment(String paymentData) {
        // ... logic ...
    }
}`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Consumer Groups & Rebalancing */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">05</span>
          Consumer Groups & Rebalancing
        </h2>
        <p className="mb-6">
          Consumer Groups enable <strong>parallel processing</strong> and <strong>automatic load balancing</strong> of topic partitions.
        </p>

        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">How Consumer Groups Work</h3>
            <p className="mb-4 text-gray-400">
              Each partition is assigned to <strong>exactly one consumer</strong> within a group. 
              Multiple groups can independently consume the same topic.
            </p>
            <Mermaid chart={`
              graph TD
                T[Topic: orders - 4 partitions]
                P0[Partition 0]
                P1[Partition 1]
                P2[Partition 2]
                P3[Partition 3]
                
                T --> P0
                T --> P1
                T --> P2
                T --> P3
                
                subgraph Consumer Group A
                  C1[Consumer 1]
                  C2[Consumer 2]
                end
                
                P0 --> C1
                P1 --> C1
                P2 --> C2
                P3 --> C2
                
                style C1 fill:#1e3a8a,stroke:#3b82f6
                style C2 fill:#1e3a8a,stroke:#3b82f6
            `} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <h4 className="font-bold text-yellow-400 mb-3">Rebalance Trigger Events</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>Consumer joins the group</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>Consumer leaves or crashes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>Topic partition count changes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>Consumer heartbeat timeout</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <h4 className="font-bold text-green-400 mb-3">Partition Assignment Strategies</h4>
              <ul className="space-y-2 text-sm">
                <li><strong>Range:</strong> Assigns consecutive partitions to each consumer</li>
                <li><strong>RoundRobin:</strong> Distributes partitions evenly across consumers</li>
                <li><strong>Sticky:</strong> Minimizes partition movement during rebalance</li>
                <li><strong>CooperativeSticky:</strong> Allows incremental rebalancing (no stop-the-world)</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 p-5 rounded-lg border-l-4 border-orange-500">
            <h4 className="font-bold text-orange-400 mb-2">⚠️ The Rebalance Problem</h4>
            <p className="text-sm">
              During a rebalance, <strong>all consumers stop processing</strong> until partitions are reassigned. 
              This is called a "stop-the-world" rebalance. In Kafka 2.4+, <strong>Incremental Cooperative Rebalancing</strong> 
              allows consumers to keep processing unaffected partitions.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Exactly-Once Semantics */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-sm px-3 py-1 rounded-full">06</span>
          Exactly-Once Semantics (EOS)
        </h2>
        <p className="mb-6">
          Kafka supports <strong>Exactly-Once Semantics</strong> through <strong>Transactions</strong> and <strong>Idempotent Producers</strong>.
        </p>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 p-5 rounded-lg border border-blue-900/50">
              <h4 className="font-bold text-blue-400 mb-2">At-Most-Once</h4>
              <p className="text-sm">Messages may be lost but never duplicated. Use <code className="bg-gray-800 px-1 rounded">acks=0</code>.</p>
            </div>
            <div className="bg-gray-900 p-5 rounded-lg border border-yellow-900/50">
              <h4 className="font-bold text-yellow-400 mb-2">At-Least-Once</h4>
              <p className="text-sm">Messages are never lost but may be duplicated. Default behavior with retries.</p>
            </div>
            <div className="bg-gray-900 p-5 rounded-lg border border-green-900/50">
              <h4 className="font-bold text-green-400 mb-2">Exactly-Once</h4>
              <p className="text-sm">No loss, no duplicates. Requires idempotence + transactions.</p>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Idempotent Producer</h3>
            <p className="mb-4 text-gray-400">
              Prevents duplicate messages when retries occur. Kafka assigns a <strong>Producer ID</strong> and 
              <strong>Sequence Number</strong> to each message.
            </p>
            <div className="rounded-lg overflow-hidden border border-gray-700">
              <SyntaxHighlighter language="java" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1rem' }}>
{`props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, "true");
// Automatically sets: acks=all, retries=MAX, max.in.flight.requests=5`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Transactional Producer</h3>
            <p className="mb-4 text-gray-400">
              Allows atomic writes to multiple partitions. Either all messages commit, or none do.
            </p>
            <div className="rounded-lg overflow-hidden border border-gray-700">
              <SyntaxHighlighter language="java" style={vscDarkPlus} showLineNumbers customStyle={{ margin: 0, padding: '1.5rem' }}>
{`Properties props = new Properties();
props.put(ProducerConfig.TRANSACTIONAL_ID_CONFIG, "tx-producer-1");
props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, "true");

Producer<String, String> producer = new KafkaProducer<>(props);
producer.initTransactions();

try {
    producer.beginTransaction();
    producer.send(new ProducerRecord<>("topic-A", "msg1"));
    producer.send(new ProducerRecord<>("topic-B", "msg2"));
    producer.commitTransaction();
} catch (Exception e) {
    producer.abortTransaction();
}`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Performance Tuning */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-teal-600 text-sm px-3 py-1 rounded-full">07</span>
          Performance Tuning
        </h2>
        
        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Producer Optimization</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left p-3 text-blue-400">Parameter</th>
                    <th className="text-left p-3 text-blue-400">Default</th>
                    <th className="text-left p-3 text-blue-400">Recommended</th>
                    <th className="text-left p-3 text-blue-400">Effect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="p-3 font-mono">batch.size</td>
                    <td className="p-3">16 KB</td>
                    <td className="p-3 text-green-400">32-64 KB</td>
                    <td className="p-3">Larger batches = fewer requests, higher throughput</td>
                  </tr>
                  <tr className="bg-gray-900/50">
                    <td className="p-3 font-mono">linger.ms</td>
                    <td className="p-3">0</td>
                    <td className="p-3 text-green-400">10-20 ms</td>
                    <td className="p-3">Wait for batch to fill before sending</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">compression.type</td>
                    <td className="p-3">none</td>
                    <td className="p-3 text-green-400">lz4, snappy</td>
                    <td className="p-3">Reduce network bandwidth</td>
                  </tr>
                  <tr className="bg-gray-900/50">
                    <td className="p-3 font-mono">buffer.memory</td>
                    <td className="p-3">32 MB</td>
                    <td className="p-3 text-green-400">64-128 MB</td>
                    <td className="p-3">Prevent blocking when sending fast</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Consumer Optimization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded border border-gray-700">
                <h4 className="font-bold text-blue-400 mb-2">fetch.min.bytes</h4>
                <p className="text-sm mb-2">Minimum data to fetch in one request. Higher = better throughput, higher latency.</p>
                <code className="text-xs bg-gray-800 px-2 py-1 rounded block">Recommended: 1 KB - 1 MB</code>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-gray-700">
                <h4 className="font-bold text-blue-400 mb-2">fetch.max.wait.ms</h4>
                <p className="text-sm mb-2">Max time broker waits before responding. Balance throughput vs latency.</p>
                <code className="text-xs bg-gray-800 px-2 py-1 rounded block">Recommended: 500 ms</code>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-gray-700">
                <h4 className="font-bold text-blue-400 mb-2">max.poll.records</h4>
                <p className="text-sm mb-2">Max records returned per poll. Lower if processing is slow to avoid rebalance.</p>
                <code className="text-xs bg-gray-800 px-2 py-1 rounded block">Default: 500</code>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-gray-700">
                <h4 className="font-bold text-blue-400 mb-2">session.timeout.ms</h4>
                <p className="text-sm mb-2">Max time without heartbeat before consumer is considered dead.</p>
                <code className="text-xs bg-gray-800 px-2 py-1 rounded block">Recommended: 10-30 sec</code>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-xl border border-blue-700/50">
            <h3 className="text-xl font-semibold text-white mb-3">🚀 Throughput Benchmark</h3>
            <p className="text-sm mb-4">
              With optimized settings, a single Kafka broker can handle <strong>1 million messages/sec</strong> 
              (200 MB/sec) on commodity hardware.
            </p>
            <div className="flex gap-4 text-sm">
              <div className="bg-gray-900/50 px-4 py-2 rounded">
                <strong>Write:</strong> ~600 MB/s
              </div>
              <div className="bg-gray-900/50 px-4 py-2 rounded">
                <strong>Read:</strong> ~2 GB/s (from page cache)
              </div>
              <div className="bg-gray-900/50 px-4 py-2 rounded">
                <strong>Latency:</strong> ~2ms (p99)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Kafka Streams */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-indigo-600 text-sm px-3 py-1 rounded-full">08</span>
          Kafka Streams & Stateful Processing
        </h2>
        <p className="mb-6">
          <strong>Kafka Streams</strong> is a client library for building real-time stream processing applications. 
          It provides high-level abstractions like <strong>KStream</strong> and <strong>KTable</strong>.
        </p>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">KStream</h3>
              <p className="text-sm text-gray-400 mb-3">
                Represents an <strong>unbounded stream</strong> of events. Each record is an insert.
              </p>
              <Mermaid chart={`
                graph LR
                  A[Event 1] --> B[Event 2]
                  B --> C[Event 3]
                  C --> D[Event 4]
                  style A fill:#1e40af
                  style B fill:#1e40af
                  style C fill:#1e40af
                  style D fill:#1e40af
              `} />
              <p className="text-xs text-gray-500 mt-3">Use for: Transformations, filtering, aggregations</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">KTable</h3>
              <p className="text-sm text-gray-400 mb-3">
                Represents a <strong>changelog stream</strong>. Each record is an update to a key.
              </p>
              <div className="bg-gray-900 p-3 rounded font-mono text-xs">
                <div className="text-green-400">key: "user_123" → value: "Alice"</div>
                <div className="text-yellow-400 mt-1">key: "user_123" → value: "Alice Smith"</div>
                <div className="text-gray-600 mt-1">// Table now: user_123 = "Alice Smith"</div>
              </div>
              <p className="text-xs text-gray-500 mt-3">Use for: Joins, lookups, stateful aggregations</p>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Stream Processing Example: Real-Time Aggregation</h3>
            <div className="rounded-lg overflow-hidden border border-gray-700">
              <SyntaxHighlighter language="java" style={vscDarkPlus} showLineNumbers customStyle={{ margin: 0, padding: '1.5rem' }}>
{`import org.apache.kafka.streams.*;
import org.apache.kafka.streams.kstream.*;
import java.time.Duration;

public class PageViewCounter {
    public static void main(String[] args) {
        StreamsBuilder builder = new StreamsBuilder();
        
        // Input: page view events (userId, page)
        KStream<String, String> pageViews = builder.stream("page-views");
        
        // Count page views per user in 5-minute windows
        KTable<Windowed<String>, Long> counts = pageViews
            .groupByKey()
            .windowedBy(TimeWindows.of(Duration.ofMinutes(5)))
            .count();
        
        // Output to another topic
        counts.toStream().to("page-view-counts");
        
        KafkaStreams streams = new KafkaStreams(builder.build(), config);
        streams.start();
    }
}`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-6 rounded-xl border border-purple-700/50">
            <h3 className="text-xl font-semibold text-white mb-3">🔥 Kafka Streams State Stores</h3>
            <p className="text-sm mb-4">
              Kafka Streams maintains <strong>local state stores</strong> (RocksDB) for fast lookups. 
              The state is backed by a <strong>changelog topic</strong> for fault tolerance.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-purple-400">✓</span>
                <span>Automatic state replication via changelog topics</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400">✓</span>
                <span>Standby replicas for fast failover</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400">✓</span>
                <span>Interactive queries: Query state from external apps</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
};

export default KafkaDocs;
