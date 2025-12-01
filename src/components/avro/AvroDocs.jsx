import React from 'react';
import { MarkerType } from 'reactflow';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';

const AvroDocs = () => {
  // 1. Encoding Flow
  const encNodes = [
    { id: 'ws', position: { x: 50, y: 0 }, data: { label: 'Writer Schema' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 120 } },
    { id: 'obj', position: { x: 50, y: 100 }, data: { label: 'Object Data' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 120 } },
    { id: 'enc', position: { x: 250, y: 50 }, data: { label: 'Binary Encoding' }, style: { background: '#1e40af', color: 'white', border: '1px solid #3b82f6', width: 150 } },
    { id: 'rs', position: { x: 450, y: 0 }, data: { label: 'Reader Schema' }, style: { background: '#064e3b', color: 'white', border: '1px solid #10b981', width: 120 } },
    { id: 'out', position: { x: 450, y: 100 }, data: { label: 'Output Object' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 120 } },
  ];
  const encEdges = [
    { id: 'e1', source: 'ws', target: 'enc', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2', source: 'obj', target: 'enc', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e3', source: 'enc', target: 'rs', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e4', source: 'rs', target: 'out', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  // 2. Registry Flow
  const regNodes = [
    { id: 'p', position: { x: 50, y: 100 }, data: { label: 'Producer' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 120 } },
    { id: 'sr', position: { x: 250, y: 0 }, data: { label: 'Schema Registry' }, style: { background: '#7c3aed', color: 'white', border: '1px solid #8b5cf6', width: 150 } },
    { id: 'k', position: { x: 250, y: 200 }, data: { label: 'Kafka' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 120 } },
    { id: 'c', position: { x: 450, y: 100 }, data: { label: 'Consumer' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 120 } },
  ];
  const regEdges = [
    { id: 'r1', source: 'p', target: 'sr', label: '1. Register', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r2', source: 'sr', target: 'p', label: 'ID', style: { stroke: '#9ca3af', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r3', source: 'p', target: 'k', label: '2. Send (ID+Data)', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r4', source: 'k', target: 'c', label: '3. Read', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r5', source: 'c', target: 'sr', label: '4. Fetch Schema', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'r6', source: 'sr', target: 'c', label: 'Schema', style: { stroke: '#9ca3af', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Apache Avro: The Deep Dive</h1>
        <p className="text-xl text-gray-400">
          A comprehensive guide to the data serialization framework that powers schema evolution in distributed systems.
        </p>
      </div>

      {/* Section 1: Schema Evolution */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">01</span>
          Schema Evolution Mastery
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Avro's killer feature: <strong>schemas evolve independently</strong> of data. Writers and readers can use different schema versions without breaking compatibility.
        </p>
        
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">The Four Compatibility Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-5 rounded border border-blue-900/50">
              <h4 className="font-bold text-blue-400 mb-2">Backward Compatible</h4>
              <p className="text-sm mb-3">New schema can read OLD data</p>
              <div className="bg-gray-800 p-3 rounded text-xs">
                ✓ Add optional fields (with defaults)<br/>
                ✓ Delete fields<br/>
                ✗ Add required fields
              </div>
            </div>
            <div className="bg-gray-900 p-5 rounded border border-green-900/50">
              <h4 className="font-bold text-green-400 mb-2">Forward Compatible</h4>
              <p className="text-sm mb-3">Old schema can read NEW data</p>
              <div className="bg-gray-800 p-3 rounded text-xs">
                ✓ Add fields<br/>
                ✓ Delete optional fields<br/>
                ✗ Delete required fields
              </div>
            </div>
            <div className="bg-gray-900 p-5 rounded border border-purple-900/50">
              <h4 className="font-bold text-purple-400 mb-2">Full Compatible</h4>
              <p className="text-sm mb-3">Both backward AND forward</p>
              <div className="bg-gray-800 p-3 rounded text-xs">
                ✓ Add optional fields with defaults<br/>
                ✓ Delete optional fields with defaults<br/>
                Most restrictive, safest
              </div>
            </div>
            <div className="bg-gray-900 p-5 rounded border border-orange-900/50">
              <h4 className="font-bold text-orange-400 mb-2">None (Breaking)</h4>
              <p className="text-sm mb-3">Incompatible changes</p>
              <div className="bg-gray-800 p-3 rounded text-xs">
                • Change field type<br/>
                • Rename fields (without aliases)<br/>
                Requires data migration
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Schema Evolution Example</h3>
          <CodeBlock language="json" code={`// Version 1 (Writer Schema)
{
  "type": "record",
  "name": "User",
  "fields": [
    {"name": "id", "type": "int"},
    {"name": "name", "type": "string"}
  ]
}

// Version 2 (Reader Schema) - Backward Compatible
{
  "type": "record",
  "name": "User",
  "fields": [
    {"name": "id", "type": "int"},
    {"name": "name", "type": "string"},
    {"name": "email", "type": ["null", "string"], "default": null}  // Optional
  ]
}

// Avro resolves: V2 reader reads V1 data → email field gets null`} />
        </div>
      </section>

      {/* Section 2: Data Serialization */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">02</span>
          Binary Serialization Format
        </h2>
        <p className="mb-6">
          Avro encodes data in a <strong>compact binary format</strong>. No field names, no field tags—just raw values.
        </p>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">How Avro Encodes Data</h3>
          <InteractiveDiagram 
            initialNodes={encNodes} 
            initialEdges={encEdges} 
            title="Avro Binary Encoding" 
          />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <strong className="text-blue-400 block mb-2">Variable-Length Encoding</strong>
              <p className="text-sm">Integers use ZigZag + VarInt encoding for space efficiency.</p>
              <div className="bg-gray-800 p-2 mt-2 rounded text-xs font-mono">
                int 1 → 1 byte<br/>
                int 16383 → 2 bytes<br/>
                int 2097151 → 3 bytes
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <strong className="text-green-400 block mb-2">String Encoding</strong>
              <p className="text-sm">Length-prefixed UTF-8 bytes.</p>
              <div className="bg-gray-800 p-2 mt-2 rounded text-xs font-mono">
                "hello" → [0x0A, h, e, l, l, o]<br/>
                (length=5 as VarInt, then bytes)
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Avro vs JSON Size Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-yellow-400 font-bold mb-3">JSON (Human-Readable)</h4>
              <CodeBlock language="json" code={`{
  "id": 12345,
  "name": "Alice",
  "age": 30
}
// Size: 48 bytes`} />
            </div>
            <div>
              <h4 className="text-blue-400 font-bold mb-3">Avro (Binary)</h4>
              <div className="bg-gray-900 p-4 rounded font-mono text-xs">
                [0xB9 0xC0 0x01]  // id=12345<br/>
                [0x0A A l i c e]  // name<br/>
                [0x3C]            // age=30<br/>
                <br/>
                // Size: 12 bytes (75% smaller)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Schema Registry Integration */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">03</span>
          Schema Registry Integration
        </h2>
        <p className="mb-6">
          In production, schemas are stored centrally. Messages only contain a <strong>schema ID</strong>, not the full schema.
        </p>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Confluent Schema Registry Flow</h3>
          <InteractiveDiagram 
            initialNodes={regNodes} 
            initialEdges={regEdges} 
            title="Schema Registry Flow" 
          />
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Producer Example (Python)</h3>
            <CodeBlock language="python" code={`from confluent_kafka import SerializingProducer
from confluent_kafka.schema_registry import SchemaRegistryClient
from confluent_kafka.schema_registry.avro import AvroSerializer

schema_str = """
{
  "type": "record",
  "name": "User",
  "fields": [
    {"name": "id", "type": "int"},
    {"name": "name", "type": "string"}
  ]
}
"""

schema_registry_client = SchemaRegistryClient({'url': 'http://localhost:8081'})
avro_serializer = AvroSerializer(schema_registry_client, schema_str)

producer = SerializingProducer({
    'bootstrap.servers': 'localhost:9092',
    'value.serializer': avro_serializer
})

user = {'id': 123, 'name': 'Alice'}
producer.produce(topic='users', value=user)
producer.flush()`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Schema Versioning Strategy</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-white">Strategy</th>
                  <th className="text-left py-2 text-white">Description</th>
                  <th className="text-left py-2 text-white">Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-blue-400 font-bold">TopicName</td>
                  <td className="py-2">One schema per topic</td>
                  <td className="py-2">Simple systems</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-green-400 font-bold">RecordName</td>
                  <td className="py-2">Schema ID = topic + record name</td>
                  <td className="py-2">Multiple record types per topic</td>
                </tr>
                <tr>
                  <td className="py-2 text-purple-400 font-bold">TopicRecordName</td>
                  <td className="py-2">Schema ID = topic + record + version</td>
                  <td className="py-2">Complex multi-tenant systems</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: Data Types & Complex Types */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-sm px-3 py-1 rounded-full">04</span>
          Data Types & Complex Schemas
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Primitive Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <strong className="text-blue-400">null</strong><br/>
                <span className="text-xs text-gray-400">No value</span>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <strong className="text-blue-400">boolean</strong><br/>
                <span className="text-xs text-gray-400">true/false</span>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <strong className="text-blue-400">int</strong><br/>
                <span className="text-xs text-gray-400">32-bit signed</span>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <strong className="text-blue-400">long</strong><br/>
                <span className="text-xs text-gray-400">64-bit signed</span>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <strong className="text-blue-400">float</strong><br/>
                <span className="text-xs text-gray-400">32-bit IEEE</span>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <strong className="text-blue-400">double</strong><br/>
                <span className="text-xs text-gray-400">64-bit IEEE</span>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <strong className="text-blue-400">bytes</strong><br/>
                <span className="text-xs text-gray-400">Raw binary</span>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <strong className="text-blue-400">string</strong><br/>
                <span className="text-xs text-gray-400">UTF-8 text</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Complex Type Example</h3>
            <CodeBlock language="json" code={`{
  "type": "record",
  "name": "Order",
  "fields": [
    {"name": "order_id", "type": "long"},
    {
      "name": "customer",
      "type": {
        "type": "record",
        "name": "Customer",
        "fields": [
          {"name": "name", "type": "string"},
          {"name": "email", "type": ["null", "string"], "default": null}
        ]
      }
    },
    {
      "name": "items",
      "type": {
        "type": "array",
        "items": {
          "type": "record",
          "name": "LineItem",
          "fields": [
            {"name": "product_id", "type": "int"},
            {"name": "quantity", "type": "int"},
            {"name": "price", "type": "double"}
          ]
        }
      }
    },
    {
      "name": "metadata",
      "type": {
        "type": "map",
        "values": "string"
      }
    },
    {
      "name": "status",
      "type": {
        "type": "enum",
        "name": "OrderStatus",
        "symbols": ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"]
      }
    }
  ]
}`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Union Types (Optional Fields)</h3>
            <CodeBlock language="json" code={`// Nullable field: union of [null, string]
{"name": "email", "type": ["null", "string"], "default": null}

// Multiple types
{"name": "value", "type": ["int", "string", "boolean"]}

// Optional nested record
{"name": "address", "type": ["null", {"type": "record", "name": "Address", ...}]}`} />
          </div>
        </div>
      </section>

      {/* Section 5: Avro vs Protobuf vs Thrift */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-orange-600 text-sm px-3 py-1 rounded-full">05</span>
          Avro vs Protobuf vs Thrift
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-700">
            <thead>
              <tr className="bg-gray-800 border-b border-gray-700">
                <th className="text-left p-3 text-white">Feature</th>
                <th className="text-left p-3 text-blue-400">Avro</th>
                <th className="text-left p-3 text-green-400">Protobuf</th>
                <th className="text-left p-3 text-purple-400">Thrift</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">Schema Definition</td>
                <td className="p-3">JSON</td>
                <td className="p-3">.proto files</td>
                <td className="p-3">.thrift files</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">Schema Evolution</td>
                <td className="p-3 text-green-400">★★★★★ (Best)</td>
                <td className="p-3">★★★★☆</td>
                <td className="p-3">★★★☆☆</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">Binary Size</td>
                <td className="p-3">★★★★☆</td>
                <td className="p-3 text-green-400">★★★★★ (Smallest)</td>
                <td className="p-3">★★★★☆</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">Speed</td>
                <td className="p-3">★★★☆☆</td>
                <td className="p-3 text-green-400">★★★★★</td>
                <td className="p-3">★★★★☆</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">Schema in Message</td>
                <td className="p-3 text-green-400">Optional (can embed)</td>
                <td className="p-3 text-red-400">No</td>
                <td className="p-3 text-red-400">No</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">Dynamic Typing</td>
                <td className="p-3 text-green-400">Yes (GenericRecord)</td>
                <td className="p-3 text-red-400">No</td>
                <td className="p-3 text-red-400">No</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">RPC Support</td>
                <td className="p-3">Basic</td>
                <td className="p-3 text-green-400">gRPC (Excellent)</td>
                <td className="p-3 text-green-400">Built-in</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="p-3 font-semibold">Language Support</td>
                <td className="p-3">★★★★☆</td>
                <td className="p-3 text-green-400">★★★★★</td>
                <td className="p-3">★★★★☆</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Best Use Case</td>
                <td className="p-3 text-blue-400">Kafka, data lakes, Hadoop</td>
                <td className="p-3 text-green-400">Microservices, gRPC APIs</td>
                <td className="p-3 text-purple-400">Facebook services</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-gray-900 p-6 rounded-xl border border-blue-900/50">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">🎯 When to Choose Avro</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><span className="text-blue-400">✓</span> You need <strong>dynamic schema evolution</strong> without breaking consumers</li>
            <li className="flex gap-2"><span className="text-blue-400">✓</span> Working with <strong>Kafka</strong> and Schema Registry</li>
            <li className="flex gap-2"><span className="text-blue-400">✓</span> Data storage in <strong>Hadoop/Hive/Spark</strong></li>
            <li className="flex gap-2"><span className="text-blue-400">✓</span> Need to read data without generated code (GenericRecord)</li>
            <li className="flex gap-2"><span className="text-red-400">✗</span> For low-latency RPCs → use Protobuf/gRPC</li>
          </ul>
        </div>
      </section>

      {/* Section 6: Code Generation & Tools */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">06</span>
          Code Generation & Tooling
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Generating Classes from Schema</h3>
            <CodeBlock language="bash" code={`# Java
java -jar avro-tools.jar compile schema user.avsc .

# Python
avro-tools generate -i user.avsc -o ./generated

# C#
avrogen -s user.avsc .`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Using Generated Code (Java)</h3>
            <CodeBlock language="java" code={`// Write Avro file
User user1 = User.newBuilder()
    .setId(1)
    .setName("Alice")
    .setEmail("alice@example.com")
    .build();

DatumWriter<User> userDatumWriter = new SpecificDatumWriter<>(User.class);
DataFileWriter<User> dataFileWriter = new DataFileWriter<>(userDatumWriter);
dataFileWriter.create(user1.getSchema(), new File("users.avro"));
dataFileWriter.append(user1);
dataFileWriter.close();

// Read Avro file
DatumReader<User> userDatumReader = new SpecificDatumReader<>(User.class);
DataFileReader<User> dataFileReader = new DataFileReader<>(new File("users.avro"), userDatumReader);
User user = null;
while (dataFileReader.hasNext()) {
    user = dataFileReader.next(user);
    System.out.println(user);
}`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Dynamic Deserialization (No Code Gen)</h3>
            <CodeBlock language="python" code={`from avro.datafile import DataFileReader
from avro.io import DatumReader

# Read without knowing schema at compile time
reader = DataFileReader(open("users.avro", "rb"), DatumReader())
for user in reader:
    print(user['name'], user['email'])  # Dict access
reader.close()`} />
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-yellow-900/50">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ Best Practices</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Use <strong>Schema Registry</strong> for all production Kafka deployments</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Always set <strong>default values</strong> for new optional fields</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Use <strong>aliases</strong> when renaming fields for backward compatibility</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Test schema evolution with <strong>compatibility checks</strong> before deployment</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Prefer <strong>record types</strong> over primitive types for extensibility</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> Document schema changes in <strong>version control</strong></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="pt-8 border-t border-gray-700">
        <p className="text-sm text-gray-500">
          📚 Further Reading: <a href="https://avro.apache.org/docs/current/" className="text-blue-400 hover:underline">Official Avro Documentation</a> | 
          <a href="https://docs.confluent.io/platform/current/schema-registry/index.html" className="text-blue-400 hover:underline ml-2">Confluent Schema Registry</a>
        </p>
      </div>
    </div>
  );
};

export default AvroDocs;
