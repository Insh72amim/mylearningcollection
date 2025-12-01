import React from 'react';
import { MarkerType } from 'reactflow';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';

const ProtobufDocs = () => {
  const protoNodes = [
    // Definition
    { id: 'def', position: { x: 50, y: 150 }, data: { label: '.proto File (Schema)' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 150 } },
    
    // Compiler
    { id: 'comp', position: { x: 250, y: 150 }, data: { label: 'protoc Compiler' }, style: { background: '#7c2d12', color: 'white', border: '1px solid #f97316', width: 150 } },
    
    // Generated Code
    { id: 'gen', position: { x: 450, y: 50 }, data: { label: 'Generated Code' }, style: { background: '#374151', color: 'white', border: '1px dashed #4b5563', width: 180, height: 220 }, type: 'group' },
    { id: 'java', position: { x: 20, y: 40 }, data: { label: 'Java Classes' }, parentNode: 'gen', extent: 'parent', style: { width: 140, fontSize: '12px' } },
    { id: 'py', position: { x: 20, y: 80 }, data: { label: 'Python Classes' }, parentNode: 'gen', extent: 'parent', style: { width: 140, fontSize: '12px' } },
    { id: 'go', position: { x: 20, y: 120 }, data: { label: 'Go Structs' }, parentNode: 'gen', extent: 'parent', style: { width: 140, fontSize: '12px' } },
    { id: 'cpp', position: { x: 20, y: 160 }, data: { label: 'C++ Classes' }, parentNode: 'gen', extent: 'parent', style: { width: 140, fontSize: '12px' } },

    // Runtime
    { id: 'run', position: { x: 700, y: 50 }, data: { label: 'Runtime' }, style: { background: '#064e3b', color: 'white', border: '1px dashed #059669', width: 200, height: 220 }, type: 'group' },
    { id: 'ser', position: { x: 30, y: 40 }, data: { label: 'Serialization' }, parentNode: 'run', extent: 'parent', style: { width: 140 } },
    { id: 'bin', position: { x: 30, y: 100 }, data: { label: 'Binary Message' }, parentNode: 'run', extent: 'parent', style: { width: 140, background: '#065f46', border: '1px solid #10b981' } },
    { id: 'deser', position: { x: 30, y: 160 }, data: { label: 'Deserialization' }, parentNode: 'run', extent: 'parent', style: { width: 140 } },
  ];

  const protoEdges = [
    { id: 'e1', source: 'def', target: 'comp', label: 'Compile', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2', source: 'comp', target: 'java', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e3', source: 'comp', target: 'py', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e4', source: 'comp', target: 'go', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e5', source: 'comp', target: 'cpp', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    
    { id: 'e6', source: 'java', target: 'ser', label: 'Use', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e7', source: 'py', target: 'ser', label: 'Use', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed } },
    
    { id: 'e8', source: 'ser', target: 'bin', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e9', source: 'bin', target: 'deser', markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Protocol Buffers: The Deep Dive</h1>
        <p className="text-xl text-gray-400">
          A comprehensive guide to Google's language-neutral, platform-neutral serialization mechanism that powers gRPC and billions of requests per day.
        </p>
      </div>

      {/* Section 1: Core Concepts & Architecture */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">01</span>
          Core Concepts & Architecture
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Protocol Buffers (Protobuf) is a <strong>binary serialization format</strong> that uses a schema definition language (.proto files) to generate strongly-typed code in multiple languages.
        </p>
        
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">The Protobuf Workflow</h3>
          <InteractiveDiagram 
            initialNodes={protoNodes} 
            initialEdges={protoEdges} 
            title="Protobuf Workflow"
            height="400px"
          />
          
          <div className="mt-6 space-y-4">
            <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
              <strong className="text-blue-400">.proto File</strong>
              <p className="text-sm mt-2">Human-readable schema definition using Protocol Buffer language.</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-orange-900/50">
              <strong className="text-orange-400">protoc Compiler</strong>
              <p className="text-sm mt-2">Generates language-specific code (getters, setters, serialization).</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-green-900/50">
              <strong className="text-green-400">Binary Wire Format</strong>
              <p className="text-sm mt-2">Compact, versioned binary representation (3-10x smaller than JSON).</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Simple .proto Example</h3>
          <CodeBlock language="protobuf" code={`syntax = "proto3";

package tutorial;

message Person {
  string name = 1;          // Field number 1
  int32 id = 2;             // Field number 2
  string email = 3;         // Field number 3
  
  enum PhoneType {
    MOBILE = 0;
    HOME = 1;
    WORK = 2;
  }
  
  message PhoneNumber {
    string number = 1;
    PhoneType type = 2;
  }
  
  repeated PhoneNumber phones = 4;  // List of phone numbers
}`} />
        </div>
      </section>

      {/* Section 2: Wire Format & Encoding */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">02</span>
          Binary Wire Format & Encoding
        </h2>
        <p className="mb-6">
          Protobuf's efficiency comes from its <strong>tag-length-value</strong> encoding and clever use of variable-length integers (varints).
        </p>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Tag-Length-Value (TLV) Encoding</h3>
          <div className="bg-gray-900 p-6 rounded border border-gray-700 mb-4">
            <div className="font-mono text-sm space-y-2">
              <div className="text-yellow-400">Tag = (field_number {'<<'} 3) | wire_type</div>
              <div className="text-blue-400">Length = Only for length-delimited types (strings, bytes, messages)</div>
              <div className="text-green-400">Value = The actual data</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-3">Wire Types</h4>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 text-blue-400 font-mono">0</td>
                    <td className="py-2">Varint (int32, int64, bool)</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 text-blue-400 font-mono">1</td>
                    <td className="py-2">64-bit (fixed64, double)</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 text-blue-400 font-mono">2</td>
                    <td className="py-2">Length-delimited (string, bytes, message)</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="py-2 text-blue-400 font-mono">5</td>
                    <td className="py-2">32-bit (fixed32, float)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3">Encoding Example</h4>
              <div className="bg-gray-900 p-4 rounded text-xs font-mono space-y-2">
                <div className="text-gray-400">// Field: int32 id = 2; Value: 150</div>
                <div className="text-yellow-400">Tag: (2 {'<<'} 3) | 0 = 0x10</div>
                <div className="text-green-400">Value: 150 (varint) = 0x96 0x01</div>
                <div className="text-white">Wire: [0x10 0x96 0x01]</div>
                <div className="mt-3 text-gray-400">// vs JSON: "id":150 (8 bytes)</div>
                <div className="text-white">Protobuf: 3 bytes (62% smaller!)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Variable-Length Integer (Varint)</h3>
            <p className="mb-4">Varints use 1-10 bytes depending on the value. Small numbers = fewer bytes.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
                <strong className="text-blue-400 block mb-2">How Varint Works</strong>
                <div className="font-mono text-xs space-y-1">
                  <div>MSB = 1: More bytes follow</div>
                  <div>MSB = 0: Last byte</div>
                  <div className="mt-2 text-gray-400">300 in binary:</div>
                  <div>10101100 00000010</div>
                  <div className="text-green-400">Wire: [0xAC 0x02]</div>
                </div>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-green-900/50">
                <strong className="text-green-400 block mb-2">Size Examples</strong>
                <div className="font-mono text-xs space-y-1">
                  <div>0-127: 1 byte</div>
                  <div>128-16,383: 2 bytes</div>
                  <div>16,384-2,097,151: 3 bytes</div>
                  <div>Max (64-bit): 10 bytes</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">ZigZag Encoding for Signed Integers</h3>
            <CodeBlock language="python" code={`# Problem: Varints waste space for negative numbers
# -1 as varint = 10 bytes (all bits set)

# Solution: ZigZag encoding maps signed to unsigned
# -1 → 1, -2 → 3, 0 → 0, 1 → 2, 2 → 4

def zigzag_encode(n):
    return (n << 1) ^ (n >> 31)  # For 32-bit

# Examples:
#  0 → 0 (1 byte)
# -1 → 1 (1 byte)
#  1 → 2 (1 byte)
# -2 → 3 (1 byte)

# Use sint32/sint64 in .proto for signed numbers`} />
          </div>
        </div>
      </section>

      {/* Section 3: Schema Evolution & Compatibility */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">03</span>
          Schema Evolution & Versioning
        </h2>
        <p className="mb-6">
          Protobuf's <strong>field numbers</strong> are the secret to backward/forward compatibility. Never change or reuse them!
        </p>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Evolution Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-900/20 p-5 rounded border border-green-900/50">
              <h4 className="font-bold text-green-400 mb-3">✓ Safe Operations</h4>
              <ul className="text-sm space-y-2">
                <li className="flex gap-2"><span className="text-green-400">•</span> Add new fields (old code ignores them)</li>
                <li className="flex gap-2"><span className="text-green-400">•</span> Delete fields (mark as reserved)</li>
                <li className="flex gap-2"><span className="text-green-400">•</span> Change field name (wire format uses numbers)</li>
                <li className="flex gap-2"><span className="text-green-400">•</span> Make repeated ↔ optional (proto3)</li>
              </ul>
            </div>
            <div className="bg-red-900/20 p-5 rounded border border-red-900/50">
              <h4 className="font-bold text-red-400 mb-3">✗ Breaking Changes</h4>
              <ul className="text-sm space-y-2">
                <li className="flex gap-2"><span className="text-red-400">•</span> Change field number</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Change field type (int32 → string)</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Reuse deleted field numbers</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Change message/package names (if using reflection)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Field Number Reservation</h3>
            <CodeBlock language="protobuf" code={`message User {
  // Version 1
  string name = 1;
  int32 age = 2;
  
  // Version 2: Removed 'email' field - MUST reserve it!
  reserved 3;              // Reserve field number
  reserved "old_email";    // Reserve field name (optional but recommended)
  
  // Version 3: Add new field
  string phone = 4;        // Never use 3!
  
  // Can also reserve ranges
  reserved 10 to 20;
  reserved 100 to max;     // Reserve all field numbers >= 100
}`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Default Values (Proto3)</h3>
            <p className="mb-4">Proto3 removed explicit default values. All fields have implicit defaults:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <strong className="text-blue-400">string</strong><br/>
                <span className="text-xs text-gray-400">""</span>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <strong className="text-blue-400">bool</strong><br/>
                <span className="text-xs text-gray-400">false</span>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <strong className="text-blue-400">int32/int64</strong><br/>
                <span className="text-xs text-gray-400">0</span>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <strong className="text-blue-400">enum</strong><br/>
                <span className="text-xs text-gray-400">First value (0)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Advanced Features */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-sm px-3 py-1 rounded-full">04</span>
          Advanced Features & Types
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Nested Messages & Imports</h3>
            <CodeBlock language="protobuf" code={`// address.proto
syntax = "proto3";
package company;

message Address {
  string street = 1;
  string city = 2;
  string zip = 3;
}

// person.proto
syntax = "proto3";
package company;

import "address.proto";  // Import other .proto files

message Person {
  string name = 1;
  
  // Nested message (only used here)
  message ContactInfo {
    string email = 1;
    string phone = 2;
  }
  
  ContactInfo contact = 2;   // Use nested message
  Address home = 3;          // Use imported message
  repeated Address others = 4;
}`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Oneof (Union Types)</h3>
            <p className="mb-4">Only one field in a oneof can be set at a time (like Rust enums or C unions).</p>
            <CodeBlock language="protobuf" code={`message SampleMessage {
  oneof test_oneof {
    string name = 4;
    int32 id = 5;
    bool is_active = 6;
  }
}

// Usage in Python:
msg = SampleMessage()
msg.name = "Alice"     # Sets name
print(msg.id)          # 0 (default, name is set)
msg.id = 123           # Sets id, clears name!
print(msg.name)        # "" (cleared)

# Check which field is set:
print(msg.WhichOneof('test_oneof'))  # "id"`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Maps</h3>
            <CodeBlock language="protobuf" code={`message Project {
  string name = 1;
  
  // Map type: map<key_type, value_type>
  map<string, int32> file_sizes = 2;
  map<int32, string> id_to_name = 3;
  
  // Key types: int32, int64, uint32, uint64, sint32, sint64, string, bool
  // Value types: any type except another map
}

// Generated code (Python):
project = Project()
project.file_sizes["main.py"] = 1024
project.file_sizes["test.py"] = 512

for filename, size in project.file_sizes.items():
    print(f"{filename}: {size} bytes")`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Well-Known Types (WKT)</h3>
            <p className="mb-4">Google provides standard message types for common use cases:</p>
            <CodeBlock language="protobuf" code={`import "google/protobuf/timestamp.proto";
import "google/protobuf/duration.proto";
import "google/protobuf/any.proto";
import "google/protobuf/struct.proto";

message Event {
  google.protobuf.Timestamp created_at = 1;  // Unix timestamp
  google.protobuf.Duration timeout = 2;       // Time duration
  google.protobuf.Any metadata = 3;           // Any message type
  google.protobuf.Struct config = 4;          // JSON-like structure
}`} />
          </div>
        </div>
      </section>

      {/* Section 5: gRPC Integration */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-orange-600 text-sm px-3 py-1 rounded-full">05</span>
          gRPC & Service Definitions
        </h2>
        <p className="mb-6">
          Protobuf is the default serialization format for <strong>gRPC</strong>, Google's high-performance RPC framework.
        </p>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">gRPC Service Definition</h3>
          <CodeBlock language="protobuf" code={`syntax = "proto3";

package greet;

// The greeting service definition
service Greeter {
  // Unary RPC: single request, single response
  rpc SayHello (HelloRequest) returns (HelloReply) {}
  
  // Server streaming: single request, stream of responses
  rpc SayHelloStream (HelloRequest) returns (stream HelloReply) {}
  
  // Client streaming: stream of requests, single response
  rpc SayHelloClientStream (stream HelloRequest) returns (HelloReply) {}
  
  // Bidirectional streaming
  rpc SayHelloBidi (stream HelloRequest) returns (stream HelloReply) {}
}

message HelloRequest {
  string name = 1;
}

message HelloReply {
  string message = 1;
}`} />
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Generated gRPC Server (Python)</h3>
            <CodeBlock language="python" code={`import grpc
from concurrent import futures
import greet_pb2
import greet_pb2_grpc

class GreeterServicer(greet_pb2_grpc.GreeterServicer):
    def SayHello(self, request, context):
        return greet_pb2.HelloReply(
            message=f"Hello, {request.name}!"
        )
    
    def SayHelloStream(self, request, context):
        for i in range(5):
            yield greet_pb2.HelloReply(
                message=f"Hello {request.name}, message {i}"
            )

# Start server
server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
greet_pb2_grpc.add_GreeterServicer_to_server(GreeterServicer(), server)
server.add_insecure_port('[::]:50051')
server.start()
server.wait_for_termination()`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Generated gRPC Client (Python)</h3>
            <CodeBlock language="python" code={`import grpc
import greet_pb2
import greet_pb2_grpc

# Connect to server
channel = grpc.insecure_channel('localhost:50051')
stub = greet_pb2_grpc.GreeterStub(channel)

# Unary call
response = stub.SayHello(greet_pb2.HelloRequest(name="Alice"))
print(response.message)  # "Hello, Alice!"

# Server streaming
for response in stub.SayHelloStream(greet_pb2.HelloRequest(name="Bob")):
    print(response.message)  # 5 messages

channel.close()`} />
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-yellow-900/50">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">⚡ gRPC Advantages</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-yellow-400">•</span> <strong>HTTP/2</strong> multiplexing (multiple RPCs on one connection)</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> <strong>Binary protocol</strong> (faster than JSON/REST)</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> <strong>Streaming</strong> support (server, client, bidirectional)</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> <strong>Code generation</strong> in 10+ languages</li>
              <li className="flex gap-2"><span className="text-yellow-400">•</span> <strong>Load balancing</strong> and health checking built-in</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 6: Code Generation & Best Practices */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">06</span>
          Code Generation & Best Practices
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Compiling .proto Files</h3>
            <CodeBlock language="bash" code={`# Install protoc compiler
# Download from: https://github.com/protocolbuffers/protobuf/releases

# Python
protoc --python_out=. person.proto

# Python + gRPC
python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. person.proto

# Java
protoc --java_out=./src person.proto

# Go
protoc --go_out=. --go_opt=paths=source_relative person.proto
protoc --go-grpc_out=. --go-grpc_opt=paths=source_relative person.proto

# C++
protoc --cpp_out=. person.proto

# JavaScript/TypeScript
protoc --js_out=import_style=commonjs,binary:. person.proto
protoc --ts_out=. person.proto`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Using Generated Code (Python)</h3>
            <CodeBlock language="python" code={`import person_pb2

# Create a message
person = person_pb2.Person()
person.name = "Alice"
person.id = 12345
person.email = "alice@example.com"

# Add phone numbers
phone1 = person.phones.add()
phone1.number = "555-1234"
phone1.type = person_pb2.Person.MOBILE

phone2 = person.phones.add()
phone2.number = "555-5678"
phone2.type = person_pb2.Person.WORK

# Serialize to binary
binary = person.SerializeToString()
print(f"Size: {len(binary)} bytes")

# Deserialize from binary
person2 = person_pb2.Person()
person2.ParseFromString(binary)
print(person2.name)  # "Alice"

# JSON interop (debugging)
from google.protobuf import json_format
json_str = json_format.MessageToJson(person)
print(json_str)`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Performance Comparison</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-2 text-white">Format</th>
                  <th className="text-left py-2 text-white">Size</th>
                  <th className="text-left py-2 text-white">Serialize Speed</th>
                  <th className="text-left py-2 text-white">Parse Speed</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-2 font-bold">JSON</td>
                  <td className="py-2">100%</td>
                  <td className="py-2">100%</td>
                  <td className="py-2">100%</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 font-bold text-green-400">Protobuf</td>
                  <td className="py-2 text-green-400">30-40%</td>
                  <td className="py-2 text-green-400">3-5x faster</td>
                  <td className="py-2 text-green-400">4-6x faster</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 font-bold">Avro</td>
                  <td className="py-2">35-45%</td>
                  <td className="py-2">2-3x faster</td>
                  <td className="py-2">2-3x faster</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">MessagePack</td>
                  <td className="py-2">50-60%</td>
                  <td className="py-2">2x faster</td>
                  <td className="py-2">2x faster</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl border border-blue-900/50">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">🎯 Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-green-400 font-bold mb-2">Do:</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Use <strong>field numbers 1-15</strong> for frequently set fields (1 byte tag)</li>
                  <li>✓ Reserve deleted field numbers</li>
                  <li>✓ Use <strong>sint32/sint64</strong> for negative numbers</li>
                  <li>✓ Use <strong>repeated</strong> for arrays/lists</li>
                  <li>✓ Version your .proto files in git</li>
                  <li>✓ Use <strong>optional</strong> (proto3) for nullable fields</li>
                </ul>
              </div>
              <div>
                <h4 className="text-red-400 font-bold mb-2">Don't:</h4>
                <ul className="text-sm space-y-1">
                  <li>✗ Change field numbers (breaks compatibility)</li>
                  <li>✗ Use <strong>required</strong> (removed in proto3)</li>
                  <li>✗ Put large data in Protobuf (use blob storage)</li>
                  <li>✗ Nest messages more than 3-4 levels deep</li>
                  <li>✗ Use Protobuf for human-readable config</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">When to Use Protobuf</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-green-400 font-bold mb-3">Perfect For:</h4>
                <ul className="text-sm space-y-1">
                  <li>✓ Microservices communication (gRPC)</li>
                  <li>✓ Low-bandwidth IoT/mobile apps</li>
                  <li>✓ High-throughput APIs ({'>'} 10k RPS)</li>
                  <li>✓ Strongly-typed contracts</li>
                  <li>✓ Cross-language systems</li>
                </ul>
              </div>
              <div>
                <h4 className="text-red-400 font-bold mb-3">NOT Ideal For:</h4>
                <ul className="text-sm space-y-1">
                  <li>✗ Browser-based REST APIs (use JSON)</li>
                  <li>✗ Human-readable logs/config</li>
                  <li>✗ Large binary blobs (use S3)</li>
                  <li>✗ Ad-hoc queries (use JSON/Avro)</li>
                  <li>✗ Dynamic schemas (use Avro)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="pt-8 border-t border-gray-700">
        <p className="text-sm text-gray-500">
          📚 Further Reading: <a href="https://protobuf.dev/" className="text-blue-400 hover:underline">Official Protocol Buffers Documentation</a> | 
          <a href="https://grpc.io/docs/" className="text-blue-400 hover:underline ml-2">gRPC Documentation</a>
        </p>
      </div>
    </div>
  );
};

export default ProtobufDocs;
