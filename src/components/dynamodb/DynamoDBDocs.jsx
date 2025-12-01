import React from 'react';
import { MarkerType } from 'reactflow';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';

const DynamoDBDocs = () => {
  const partitionNodes = [
    { id: 'app', position: { x: 400, y: 0 }, data: { label: 'Application' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 150 } },
    { id: 'lb', position: { x: 400, y: 100 }, data: { label: 'Request Router' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 150 } },
    
    // Partitions
    { id: 'p1', position: { x: 150, y: 250 }, data: { label: 'Partition 1\n(Hash: 0-999)' }, style: { background: '#f59e0b', color: 'white', border: '1px solid #d97706', width: 160 } },
    { id: 'p2', position: { x: 400, y: 250 }, data: { label: 'Partition 2\n(Hash: 1000-1999)' }, style: { background: '#f59e0b', color: 'white', border: '1px solid #d97706', width: 160 } },
    { id: 'p3', position: { x: 650, y: 250 }, data: { label: 'Partition 3\n(Hash: 2000-2999)' }, style: { background: '#f59e0b', color: 'white', border: '1px solid #d97706', width: 160 } },
    
    // Replicas for Partition 1
    { id: 'az1', position: { x: 50, y: 400 }, data: { label: 'AZ1 Replica' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', width: 100, fontSize: '12px' } },
    { id: 'az2', position: { x: 180, y: 400 }, data: { label: 'AZ2 Replica' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', width: 100, fontSize: '12px' } },
    { id: 'az3', position: { x: 310, y: 400 }, data: { label: 'AZ3 Replica' }, style: { background: '#10b981', color: 'white', border: '1px solid #059669', width: 100, fontSize: '12px' } },
  ];

  const partitionEdges = [
    { id: 'e1', source: 'app', target: 'lb', animated: true, style: { stroke: '#9ca3af' } },
    { id: 'e2', source: 'lb', target: 'p1', style: { stroke: '#f59e0b' } },
    { id: 'e3', source: 'lb', target: 'p2', style: { stroke: '#f59e0b' } },
    { id: 'e4', source: 'lb', target: 'p3', style: { stroke: '#f59e0b' } },
    
    // Replication
    { id: 'r1', source: 'p1', target: 'az1', label: 'Replicate', style: { stroke: '#10b981', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r2', source: 'p1', target: 'az2', style: { stroke: '#10b981', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r3', source: 'p1', target: 'az3', style: { stroke: '#10b981', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Amazon DynamoDB: The Deep Dive</h1>
        <p className="text-xl text-gray-400">
          A comprehensive guide to AWS's fully-managed NoSQL database service designed for serverless architectures.
        </p>
      </div>

      {/* Section 1: Architecture & Core Concepts */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">01</span>
          Architecture & Core Concepts
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          DynamoDB is a <strong>fully-managed, serverless NoSQL database</strong> that automatically scales and handles all infrastructure management.
        </p>
        
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Partition-Based Architecture</h3>
          <InteractiveDiagram 
            initialNodes={partitionNodes} 
            initialEdges={partitionEdges} 
            title="DynamoDB Partitioning & Replication" 
          />
          
          <div className="mt-6 space-y-4">
            <div className="bg-gray-900 p-4 rounded border border-orange-900/50">
              <strong className="text-orange-400">Automatic Partitioning</strong>
              <p className="text-sm mt-2">Data distributed across partitions based on partition key hash. Automatically splits when needed.</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
              <strong className="text-blue-400">3-AZ Replication</strong>
              <p className="text-sm mt-2">Data automatically replicated across 3 Availability Zones for durability and availability.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Capacity Modes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-4 rounded border border-green-900/50">
              <strong className="text-green-400">On-Demand</strong>
              <CodeBlock language="text" code={`Pay per request
✓ Auto-scales instantly
✓ No capacity planning
✓ Best for: Unpredictable workloads

Cost: $1.25 per million reads
      $6.25 per million writes`} />
            </div>
            <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
              <strong className="text-blue-400">Provisioned</strong>
              <CodeBlock language="text" code={`Pre-allocate capacity
✓ Lower cost for steady traffic
✓ Auto-scaling available
✓ Best for: Predictable workloads

Cost: $0.00065 per RCU/hour
      $0.00065 per WCU/hour`} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Data Model & Storage */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">02</span>
          Data Model & Storage
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Primary Keys</h3>
            <CodeBlock language="python" code={`# Simple Primary Key (Partition Key only)
Table: Users
PK: user_id

Item: {user_id: "123", name: "Alice", email: "alice@example.com"}

# Composite Primary Key (Partition + Sort Key)
Table: Orders
PK: customer_id (Partition Key)
SK: order_date (Sort Key)

Item: {
    customer_id: "customer_123",  # Partition key
    order_date: "2024-01-15",     # Sort key
    order_id: "order_456",
    total: 99.99
}

# Benefits of Sort Key:
# 1. Query items within partition (range queries)
# 2. Store related items together
# 3. Enable efficient filtering`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Single-Table Design Pattern</h3>
            <CodeBlock language="python" code={`# Instead of multiple tables, use one table with overloading
# Entity Relationships: Users, Orders, Products

Table: AppData
PK              SK                  Attributes
---------------------------------------------------------------
USER#alice      PROFILE             name, email, created_at
USER#alice      ORDER#2024-01-15    order_id, total, status
USER#alice      ORDER#2024-01-20    order_id, total, status
PRODUCT#laptop  METADATA            name, price, stock
PRODUCT#laptop  REVIEW#alice        rating, comment, date

# Advantages:
# ✓ Single table to manage
# ✓ Atomic transactions across entities
# ✓ Fewer round trips
# ✓ Lower cost

# Access Patterns:
# Get user profile:     GetItem(PK=USER#alice, SK=PROFILE)
# Get user orders:      Query(PK=USER#alice, SK begins_with ORDER#)
# Get product reviews:  Query(PK=PRODUCT#laptop, SK begins_with REVIEW#)`} />
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-yellow-900/50">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Design Principles</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-yellow-400">1.</span> <strong>Model for access patterns</strong>, not entities</li>
              <li className="flex gap-2"><span className="text-yellow-400">2.</span> <strong>Denormalize</strong> data to minimize queries</li>
              <li className="flex gap-2"><span className="text-yellow-400">3.</span> <strong>Overload</strong> keys (e.g., PK contains entity type)</li>
              <li className="flex gap-2"><span className="text-yellow-400">4.</span> <strong>Use sparse indexes</strong> for optional attributes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Querying & Indexing */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">03</span>
          Querying & Indexing
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Read Operations</h3>
            <CodeBlock language="python" code={`import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Users')

# GetItem: Fetch by primary key (fast, predictable)
response = table.get_item(
    Key={'user_id': '123'}
)
item = response['Item']

# Query: Fetch items with same partition key
response = table.query(
    KeyConditionExpression=Key('customer_id').eq('customer_123') &
                          Key('order_date').gte('2024-01-01')
)
items = response['Items']

# Scan: Full table scan (slow, expensive - AVOID!)
response = table.scan(
    FilterExpression=Attr('age').gt(30)
)  # ❌ Scans entire table!

# BatchGetItem: Fetch multiple items efficiently
response = dynamodb.batch_get_item(
    RequestItems={
        'Users': {
            'Keys': [
                {'user_id': '123'},
                {'user_id': '456'},
            ]
        }
    }
)`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Global Secondary Index (GSI)</h3>
            <CodeBlock language="python" code={`# Base table: Users (PK: user_id)
# Want to query by email? Create GSI

GSI: EmailIndex
PK: email
SK: (none or another attribute)

# Create GSI
table.create_global_secondary_index(
    IndexName='EmailIndex',
    KeySchema=[
        {'AttributeName': 'email', 'KeyType': 'HASH'},
    ],
    Projection={'ProjectionType': 'ALL'},
    ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
)

# Query GSI
response = table.query(
    IndexName='EmailIndex',
    KeyConditionExpression=Key('email').eq('alice@example.com')
)

# GSI Characteristics:
# ✓ Eventually consistent (async updates)
# ✓ Different PK/SK than base table
# ✓ Can have different throughput
# ✓ Up to 20 GSIs per table`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Local Secondary Index (LSI)</h3>
            <CodeBlock language="python" code={`# Base table: Orders (PK: customer_id, SK: order_date)
# Want to sort by total amount? Create LSI

LSI: TotalIndex
PK: customer_id (same as base table)
SK: total

# LSI must be created at table creation
# Cannot add LSI to existing table

# Query LSI
response = table.query(
    IndexName='TotalIndex',
    KeyConditionExpression=Key('customer_id').eq('customer_123'),
    ScanIndexForward=False  # Descending order by total
)

# LSI vs GSI:
# LSI: Same PK as base, strongly consistent, max 10KB items
# GSI: Different PK, eventually consistent, no size limit`} />
          </div>
        </div>
      </section>

      {/* Section 4: Scaling & Distribution */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-sm px-3 py-1 rounded-full">04</span>
          Scaling & Distribution
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Auto-Scaling</h3>
            <CodeBlock language="python" code={`# Configure auto-scaling for provisioned mode
client = boto3.client('application-autoscaling')

# Register table as scalable target
client.register_scalable_target(
    ServiceNamespace='dynamodb',
    ResourceId='table/Users',
    ScalableDimension='dynamodb:table:WriteCapacityUnits',
    MinCapacity=5,
    MaxCapacity=100
)

# Create scaling policy
client.put_scaling_policy(
    PolicyName='WriteAutoScaling',
    ServiceNamespace='dynamodb',
    ResourceId='table/Users',
    ScalableDimension='dynamodb:table:WriteCapacityUnits',
    PolicyType='TargetTrackingScaling',
    TargetTrackingScalingPolicyConfiguration={
        'TargetValue': 70.0,  # Target 70% utilization
        'PredefinedMetricSpecification': {
            'PredefinedMetricType': 'DynamoDBWriteCapacityUtilization'
        }
    }
)`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">DynamoDB Streams</h3>
            <CodeBlock language="python" code={`# Enable streams for change data capture
table = dynamodb.create_table(
    TableName='Orders',
    StreamSpecification={
        'StreamEnabled': True,
        'StreamViewType': 'NEW_AND_OLD_IMAGES'  # Include before/after
    },
    # ... other config
)

# Process stream with Lambda
def lambda_handler(event, context):
    for record in event['Records']:
        if record['eventName'] == 'INSERT':
            new_item = record['dynamodb']['NewImage']
            # Process new order...
        elif record['eventName'] == 'MODIFY':
            old_item = record['dynamodb']['OldImage']
            new_item = record['dynamodb']['NewImage']
            # Handle update...

# Use cases:
# ✓ Real-time analytics
# ✓ Data replication
# ✓ Triggering workflows
# ✓ Maintaining materialized views`} />
          </div>
        </div>
      </section>

      {/* Section 5: Performance Optimization */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-orange-600 text-sm px-3 py-1 rounded-full">05</span>
          Performance Optimization
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">DAX (DynamoDB Accelerator)</h3>
            <CodeBlock language="python" code={`# In-memory cache for DynamoDB (microsecond latency)
import amazondax

# Connect to DAX cluster
dax = amazondax.AmazonDaxClient(
    endpoint_url='dax://my-cluster.abc123.dax-clusters.us-east-1.amazonaws.com'
)

# Use DAX like regular DynamoDB client
response = dax.get_item(
    TableName='Users',
    Key={'user_id': {'S': '123'}}
)

# DAX benefits:
# ✓ 10x performance improvement
# ✓ Microsecond response times
# ✓ Reduces read load on DynamoDB
# ✓ Eventually consistent reads only

# When to use DAX:
# ✓ Read-heavy workloads
# ✓ Repeated reads of same items
# ✓ Latency-sensitive applications`} />
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-yellow-900/50">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Hot Partition Prevention</h3>
            <CodeBlock language="python" code={`# ❌ BAD: Monotonic partition key (all writes go to one partition)
PK: timestamp  # All recent writes hit same partition!

# ✓ GOOD: Add random suffix
PK: timestamp#random(1-100)  # Distributes writes

# ✓ GOOD: Composite key with high-cardinality prefix
PK: user_id#timestamp  # Distributes by user

# ✓ GOOD: Hash partition key
import hashlib
def get_partition_key(user_id):
    hash_val = int(hashlib.md5(user_id.encode()).hexdigest(), 16)
    shard = hash_val % 100  # 100 shards
    return f"{shard}#{user_id}"`} />
          </div>
        </div>
      </section>

      {/* Section 6: Use Cases & Comparisons */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">06</span>
          Use Cases & Comparisons
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-xl border border-green-900/50">
            <h3 className="text-xl font-semibold text-green-400 mb-4">🎯 When to Use DynamoDB</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-green-400 font-bold mb-2">Perfect For:</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Serverless applications (Lambda)</li>
                  <li>✓ Gaming leaderboards</li>
                  <li>✓ Mobile backends</li>
                  <li>✓ Session management</li>
                  <li>✓ IoT data streams</li>
                  <li>✓ Unpredictable traffic</li>
                </ul>
              </div>
              <div>
                <h4 className="text-red-400 font-bold mb-2">Not Ideal For:</h4>
                <ul className="text-sm space-y-1">
                  <li>→ Complex joins</li>
                  <li>→ Analytics (use Athena instead)</li>
                  <li>→ Full-text search</li>
                  <li>→ Small workloads (cost)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-700">
              <thead>
                <tr className="bg-gray-800 border-b border-gray-700">
                  <th className="text-left p-3 text-white">Feature</th>
                  <th className="text-left p-3 text-orange-400">DynamoDB</th>
                  <th className="text-left p-3 text-green-400">MongoDB</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Management</td>
                  <td className="p-3 text-green-400">Fully managed</td>
                  <td className="p-3">Self-hosted or Atlas</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Schema</td>
                  <td className="p-3">Key-value + documents</td>
                  <td className="p-3 text-green-400">Flexible documents</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Queries</td>
                  <td className="p-3">PK-based only</td>
                  <td className="p-3 text-green-400">Rich query language</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Scaling</td>
                  <td className="p-3 text-green-400">Auto-scales</td>
                  <td className="p-3">Manual sharding</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="p-3 font-semibold">Pricing</td>
                  <td className="p-3">Pay per request</td>
                  <td className="p-3">Instance-based</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="pt-8 border-t border-gray-700">
        <p className="text-sm text-gray-500">
          📚 Further Reading: <a href="https://docs.aws.amazon.com/dynamodb/" className="text-blue-400 hover:underline">AWS DynamoDB Documentation</a>
        </p>
      </div>
    </div>
  );
};

export default DynamoDBDocs;
