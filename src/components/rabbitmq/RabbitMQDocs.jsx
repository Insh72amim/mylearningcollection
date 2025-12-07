import React from "react";
import { MarkerType } from "reactflow";
import InteractiveDiagram from "../common/InteractiveDiagram";
import CodeBlock from "../common/CodeBlock";

const RabbitMQDocs = () => {
  const topologyNodes = [
    {
      id: "producer",
      position: { x: 50, y: 160 },
      data: { label: "Producer App" },
      style: {
        width: 140,
        background: "#1f2937",
        color: "white",
        border: "1px solid #374151",
      },
    },
    {
      id: "exchange",
      position: { x: 250, y: 160 },
      data: { label: "Topic Exchange" },
      style: {
        width: 150,
        background: "#7c2d12",
        color: "white",
        border: "1px solid #fb923c",
      },
    },
    {
      id: "queueA",
      position: { x: 470, y: 80 },
      data: { label: "Queue: email" },
      style: {
        width: 140,
        background: "#064e3b",
        color: "white",
        border: "1px solid #10b981",
      },
    },
    {
      id: "queueB",
      position: { x: 470, y: 240 },
      data: { label: "Queue: sms" },
      style: {
        width: 140,
        background: "#064e3b",
        color: "white",
        border: "1px solid #10b981",
      },
    },
    {
      id: "consumerA",
      position: { x: 660, y: 60 },
      data: { label: "Email Worker" },
      style: {
        width: 140,
        background: "#1e3a8a",
        color: "white",
        border: "1px solid #3b82f6",
      },
    },
    {
      id: "consumerB",
      position: { x: 660, y: 220 },
      data: { label: "SMS Worker" },
      style: {
        width: 140,
        background: "#1e3a8a",
        color: "white",
        border: "1px solid #3b82f6",
      },
    },
    {
      id: "dlx",
      position: { x: 470, y: 360 },
      data: { label: "DLX + DLQ" },
      style: {
        width: 140,
        background: "#4c1d95",
        color: "white",
        border: "1px solid #a855f7",
      },
    },
    {
      id: "monitor",
      position: { x: 260, y: 20 },
      data: { label: "Management UI" },
      style: {
        width: 160,
        background: "#1f2937",
        color: "white",
        border: "1px dashed #4b5563",
        fontSize: 12,
      },
    },
  ];

  const topologyEdges = [
    {
      id: "p-ex",
      source: "producer",
      target: "exchange",
      label: "Publish with routing key",
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#fb923c" },
    },
    {
      id: "ex-a",
      source: "exchange",
      target: "queueA",
      label: "user.*",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#34d399" },
    },
    {
      id: "ex-b",
      source: "exchange",
      target: "queueB",
      label: "alerts.#",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#34d399" },
    },
    {
      id: "qa-ca",
      source: "queueA",
      target: "consumerA",
      label: "prefetch=10",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#60a5fa" },
    },
    {
      id: "qb-cb",
      source: "queueB",
      target: "consumerB",
      label: "ack/nack",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#60a5fa" },
    },
    {
      id: "queue-dlx",
      source: "queueB",
      target: "dlx",
      label: "Dead-letter on retry",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#c084fc", strokeDasharray: "6 4" },
    },
    {
      id: "mon-ex",
      source: "monitor",
      target: "exchange",
      label: "Metrics & bindings",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#9ca3af", strokeDasharray: "4 4" },
    },
  ];

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-4 text-white">
        RabbitMQ: The Deep Dive
      </h1>
      <p className="text-xl text-gray-300 mb-8">
        A robust, open-source message broker that implements the Advanced
        Message Queuing Protocol (AMQP). RabbitMQ enables asynchronous
        communication between distributed systems through reliable message
        delivery.
      </p>

      {/* What is RabbitMQ */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          What is RabbitMQ?
        </h2>
        <p className="text-gray-300 mb-4">
          RabbitMQ is a message broker that acts as an intermediary for messages
          between producers (senders) and consumers (receivers). It provides a
          reliable way to decouple services, handle asynchronous processing, and
          implement various messaging patterns.
        </p>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3 text-green-400">
            Key Benefits
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              <strong>Reliability:</strong> Message persistence,
              acknowledgments, and delivery guarantees
            </li>
            <li>
              <strong>Flexible Routing:</strong> Multiple exchange types for
              different routing patterns
            </li>
            <li>
              <strong>Clustering:</strong> High availability through mirrored
              queues
            </li>
            <li>
              <strong>Multi-Protocol:</strong> AMQP, MQTT, STOMP support
            </li>
            <li>
              <strong>Management UI:</strong> Web-based interface for monitoring
              and administration
            </li>
            <li>
              <strong>Language Agnostic:</strong> Client libraries for all major
              programming languages
            </li>
          </ul>
        </div>
      </section>

      {/* Messaging Topology */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Messaging Topology
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 space-y-4">
            <p className="text-gray-300">
              Producers publish to exchanges, which fan out into queues based on
              bindings. Consumers apply backpressure via acknowledgments, while
              dead-letter exchanges capture failed messages for later analysis.
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex gap-2">
                <span className="text-green-400">•</span>
                <span>
                  Bindings map routing keys to queues for fine-grained delivery.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">•</span>
                <span>
                  Prefetch limits combined with ACK/NACK keep consumers stable.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-green-400">•</span>
                <span>
                  DLX routes poison messages into quarantine queues for replay.
                </span>
              </li>
            </ul>
          </div>
          <InteractiveDiagram
            initialNodes={topologyNodes}
            initialEdges={topologyEdges}
            title="RabbitMQ Routing Overview"
            height="360px"
          />
        </div>
      </section>

      {/* Core Concepts */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Core Concepts</h2>

        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              Producer
            </h3>
            <p className="text-gray-300">
              Application that sends messages. Producers never send messages
              directly to queues; they always go through an exchange.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              Exchange
            </h3>
            <p className="text-gray-300">
              Routes messages to queues based on routing rules. Different
              exchange types provide different routing behaviors.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">Queue</h3>
            <p className="text-gray-300">
              Buffer that stores messages until they are consumed. Queues are
              bound to exchanges with binding keys.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              Consumer
            </h3>
            <p className="text-gray-300">
              Application that receives messages from queues. Consumers can
              acknowledge messages to confirm processing.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              Binding
            </h3>
            <p className="text-gray-300">
              Link between an exchange and a queue that defines routing rules
              using a routing key.
            </p>
          </div>
        </div>
      </section>

      {/* Exchange Types */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Exchange Types
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              1. Direct Exchange
            </h3>
            <p className="text-gray-300 mb-3">
              Routes messages to queues based on exact match of routing key.
            </p>
            <CodeBlock
              language="javascript"
              code={`// Producer
await channel.assertExchange('direct_logs', 'direct', { durable: true });

await channel.publish(
  'direct_logs',
  'error',  // routing key
  Buffer.from('Error message')
);

// Consumer
await channel.assertQueue('error_queue');
await channel.bindQueue('error_queue', 'direct_logs', 'error');

channel.consume('error_queue', (msg) => {
  console.log('Received:', msg.content.toString());
  channel.ack(msg);
});`}
            />
            <p className="text-gray-300 mt-3">
              <strong>Use case:</strong> Log routing, task distribution based on
              priority
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              2. Fanout Exchange
            </h3>
            <p className="text-gray-300 mb-3">
              Broadcasts messagesfor to all bound queues (ignores routing key).
            </p>
            <CodeBlock
              language="javascript"
              code={`// Producer
await channel.assertExchange('notifications', 'fanout', { durable: true });

await channel.publish(
  'notifications',
  '',  // routing key ignored
  Buffer.from('New user signed up')
);

// Multiple consumers get the same message
await channel.assertQueue('email_queue');
await channel.bindQueue('email_queue', 'notifications', '');

await channel.assertQueue('sms_queue');
await channel.bindQueue('sms_queue', 'notifications', '');

await channel.assertQueue('push_queue');
await channel.bindQueue('push_queue', 'notifications', '');`}
            />
            <p className="text-gray-300 mt-3">
              <strong>Use case:</strong> Broadcasting notifications, real-time
              updates to multiple services
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              3. Topic Exchange
            </h3>
            <p className="text-gray-300 mb-3">
              Routes based on pattern matching with routing keys (supports
              wildcards: * and #).
            </p>
            <CodeBlock
              language="javascript"
              code={`// Producer
await channel.assertExchange('logs', 'topic', { durable: true });

// Send with different patterns
await channel.publish('logs', 'user.signup', Buffer.from('User signed up'));
await channel.publish('logs', 'user.login', Buffer.from('User logged in'));
await channel.publish('logs', 'order.created', Buffer.from('Order created'));

// Consumer 1: All user events
await channel.assertQueue('user_events');
await channel.bindQueue('user_events', 'logs', 'user.*');

// Consumer 2: All events
await channel.assertQueue('all_events');
await channel.bindQueue('all_events', 'logs', '#');

// Consumer 3: Specific events
await channel.assertQueue('signup_events');
await channel.bindQueue('signup_events', 'logs', '*.signup');`}
            />
            <p className="text-gray-300 mt-3">
              <strong>Wildcards:</strong>{" "}
              <code className="text-blue-300">*</code> matches one word,{" "}
              <code className="text-blue-300">#</code> matches zero or more
              words
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              4. Headers Exchange
            </h3>
            <p className="text-gray-300 mb-3">
              Routes based on message headers instead of routing key.
            </p>
            <CodeBlock
              language="javascript"
              code={`// Producer
await channel.assertExchange('headers_exchange', 'headers', { durable: true });

await channel.publish(
  'headers_exchange',
  '',
  Buffer.from('Message'),
  { headers: { format: 'pdf', type: 'report' } }
);

// Consumer
await channel.assertQueue('pdf_reports');
await channel.bindQueue('pdf_reports', 'headers_exchange', '', {
  'x-match': 'all',  // or 'any'
  'format': 'pdf',
  'type': 'report'
});`}
            />
          </div>
        </div>
      </section>

      {/* Basic Producer and Consumer */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Producer & Consumer Implementation
        </h2>

        <CodeBlock
          language="javascript"
          title="Producer (Node.js with amqplib)"
          code={`const amqp = require('amqplib');

async function sendMessage() {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    // Declare exchange and queue
    const exchange = 'task_exchange';
    const queue = 'task_queue';
    const routingKey = 'task.process';
    
    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);
    
    // Send message
    const message = {
      id: '123',
      type: 'process_data',
      data: { user_id: 456 },
      timestamp: new Date().toISOString()
    };
    
    channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
      {
        persistent: true,  // Survive broker restart
        contentType: 'application/json',
        priority: 5,
        expiration: '60000'  // TTL in milliseconds
      }
    );
    
    console.log('Message sent:', message);
    
    // Close connection after a delay
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error:', error);
  }
}

sendMessage();`}
        />

        <CodeBlock
          language="javascript"
          title="Consumer (Node.js)"
          code={`const amqp = require('amqplib');

async function consumeMessages() {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    const queue = 'task_queue';
    
    // Assert queue exists
    await channel.assertQueue(queue, { durable: true });
    
    // Set prefetch count (QoS)
    channel.prefetch(1);  // Process one message at a time
    
    console.log('Waiting for messages...');
    
    // Consume messages
    channel.consume(queue, async (msg) => {
      if (msg) {
        const content = JSON.parse(msg.content.toString());
        console.log('Received:', content);
        
        try {
          // Process message
          await processTask(content);
          
          // Acknowledge message
          channel.ack(msg);
          console.log('Message processed successfully');
        } catch (error) {
          console.error('Processing failed:', error);
          
          // Reject and requeue
          channel.nack(msg, false, true);
          
          // Or reject without requeue (send to DLX if configured)
          // channel.nack(msg, false, false);
        }
      }
    }, {
      noAck: false  // Manual acknowledgment
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

async function processTask(task) {
  // Simulate processing
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Processing task:', task.id);
      resolve();
    }, 1000);
  });
}

consumeMessages();`}
        />
      </section>

      {/* Dead Letter Exchange */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Dead Letter Exchange (DLX)
        </h2>
        <p className="text-gray-300 mb-4">
          A DLX captures messages that are rejected, expired, or exceed queue
          length limits.
        </p>

        <CodeBlock
          language="javascript"
          title="Dead Letter Exchange Setup"
          code={`// Create dead letter exchange and queue
await channel.assertExchange('dlx_exchange', 'direct', { durable: true });
await channel.assertQueue('dead_letter_queue', { durable: true });
await channel.bindQueue('dead_letter_queue', 'dlx_exchange', 'dead_letter');

// Create main queue with DLX configuration
await channel.assertQueue('main_queue', {
  durable: true,
  deadLetterExchange: 'dlx_exchange',
  deadLetterRoutingKey: 'dead_letter',
  messageTtl: 10000,  // 10 seconds TTL
  maxLength: 100  // Max 100 messages
});

// Consumer for dead letters
channel.consume('dead_letter_queue', (msg) => {
  console.log('Dead letter received:', msg.content.toString());
  console.log('Headers:', msg.properties.headers);
  
  // Check why it was dead-lettered
  const reason = msg.properties.headers['x-death'][0].reason;
  console.log('Reason:', reason);  // 'rejected', 'expired', 'maxlen'
  
  // Handle dead letter (log, retry, alert, etc.)
  channel.ack(msg);
});`}
        />
      </section>

      {/* Message Priority */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Message Priority
        </h2>

        <CodeBlock
          language="javascript"
          title="Priority Queue"
          code={`// Create priority queue
await channel.assertQueue('priority_queue', {
  durable: true,
  maxPriority: 10  // Support priorities 0-10
});

// Send messages with different priorities
await channel.sendToQueue(
  'priority_queue',
  Buffer.from('High priority'),
  { priority: 10, persistent: true }
);

await channel.sendToQueue(
  'priority_queue',
  Buffer.from('Low priority'),
  { priority: 1, persistent: true }
);

await channel.sendToQueue(
  'priority_queue',
  Buffer.from('Medium priority'),
  { priority: 5, persistent: true }
);

// Consumer receives high priority messages first
channel.consume('priority_queue', (msg) => {
  console.log('Received:', msg.content.toString());
  console.log('Priority:', msg.properties.priority);
  channel.ack(msg);
});`}
        />
      </section>

      {/* Message TTL and Expiration */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          TTL & Message Expiration
        </h2>

        <CodeBlock
          language="javascript"
          title="Time-To-Live Configuration"
          code={`// Queue-level TTL (all messages)
await channel.assertQueue('ttl_queue', {
  durable: true,
  messageTtl: 60000,  // 60 seconds
  expires: 300000  // Queue expires after 5 minutes of inactivity
});

// Per-message TTL
await channel.sendToQueue(
  'ttl_queue',
  Buffer.from('This message expires in 30 seconds'),
  {
    persistent: true,
    expiration: '30000'  // Message TTL in milliseconds (string)
  }
);

// Delayed message pattern using DLX
await channel.assertExchange('delayed_exchange', 'direct');
await channel.assertQueue('delay_queue', {
  durable: true,
  messageTtl: 5000,  // 5 second delay
  deadLetterExchange: 'delayed_exchange',
  deadLetterRoutingKey: 'process'
});

await channel.assertQueue('process_queue');
await channel.bindQueue('process_queue', 'delayed_exchange', 'process');

// Message will be processed after 5 seconds
await channel.sendToQueue('delay_queue', Buffer.from('Delayed message'));`}
        />
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Best Practices
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              1. Always Use Acknowledgments
            </h3>
            <p className="text-gray-300 mb-3">
              Enable manual acknowledgments to prevent message loss.
            </p>
            <CodeBlock
              language="javascript"
              code={`// Good: Manual ack
channel.consume('queue', (msg) => {
  processMessage(msg)
    .then(() => channel.ack(msg))
    .catch(() => channel.nack(msg, false, true));
}, { noAck: false });

// Bad: Auto-ack (message could be lost if processing fails)
channel.consume('queue', (msg) => {
  processMessage(msg);  // What if this fails?
}, { noAck: true });`}
            />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              2. Implement Idempotency
            </h3>
            <p className="text-gray-300 mb-3">
              Handle duplicate messages gracefully.
            </p>
            <CodeBlock
              language="javascript"
              code={`const processedMessages = new Set();

channel.consume('queue', async (msg) => {
  const messageId = msg.properties.messageId;
  
  // Check if already processed
  if (processedMessages.has(messageId)) {
    console.log('Duplicate message, skipping');
    channel.ack(msg);
    return;
  }
  
  await processMessage(msg);
  processedMessages.add(messageId);
  channel.ack(msg);
});`}
            />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              3. Use Connection Pooling
            </h3>
            <CodeBlock
              language="javascript"
              code={`class RabbitMQConnection {
  constructor() {
    this.connection = null;
    this.channel = null;
  }
  
  async connect() {
    if (!this.connection) {
      this.connection = await amqp.connect('amqp://localhost');
      this.connection.on('error', (err) => {
        console.error('Connection error:', err);
        this.connection = null;
      });
    }
    return this.connection;
  }
  
  async getChannel() {
    if (!this.channel) {
      const connection = await this.connect();
      this.channel = await connection.createChannel();
    }
    return this.channel;
  }
}

// Singleton instance
const rabbitMQ = new RabbitMQConnection();
module.exports = rabbitMQ;`}
            />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              4. Monitor Queue Depth
            </h3>
            <p className="text-gray-300 mb-3">
              Set alarms for queue depth to detect consumer failures.
            </p>
            <CodeBlock
              language="javascript"
              code={`// Check queue depth
const queueInfo = await channel.checkQueue('task_queue');
console.log('Messages in queue:', queueInfo.messageCount);
console.log('Consumers:', queueInfo.consumerCount);

if (queueInfo.messageCount > 1000 && queueInfo.consumerCount === 0) {
  // Alert: queue backing up with no consumers
  sendAlert('No consumers for task_queue!');
}`}
            />
          </div>
        </div>
      </section>

      {/* Clustering */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          High Availability & Clustering
        </h2>

        <CodeBlock
          language="bash"
          title="Setting Up a Cluster"
          code={`# On node1
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl start_app

# On node2 and node3
rabbitmqctl stop_app
rabbitmqctl reset
rabbitmqctl join_cluster rabbit@node1
rabbitmqctl start_app

# Create mirrored queue policy
rabbitmqctl set_policy ha-all "^" '{"ha-mode":"all"}' --apply-to queues`}
        />

        <CodeBlock
          language="javascript"
          title="Connect to Cluster"
          code={`const connection = await amqp.connect([
  'amqp://node1',
  'amqp://node2',
  'amqp://node3'
], {
  // Connection will try all nodes
  heartbeat: 60
});`}
        />
      </section>

      {/* Monitoring */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Monitoring & Management
        </h2>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-green-400">
            Management UI
          </h3>
          <p className="text-gray-300 mb-3">
            RabbitMQ provides a web-based UI for monitoring and management:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
            <li>View queues, exchanges, and connections</li>
            <li>Monitor message rates and queue depth</li>
            <li>Manage users and permissions</li>
            <li>Set policies and limits</li>
          </ul>
          <CodeBlock
            language="bash"
            code={`# Enable management plugin
rabbitmq-plugins enable rabbitmq_management

# Access UI at https://localhost:15672
# Default credentials: guest/guest`}
          />
        </div>
      </section>
    </div>
  );
};

export default RabbitMQDocs;
