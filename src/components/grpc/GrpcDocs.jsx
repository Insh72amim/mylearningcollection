import React from "react";
import { MarkerType } from "reactflow";
import InteractiveDiagram from "../common/InteractiveDiagram";
import CodeBlock from "../common/CodeBlock";

const GrpcDocs = () => {
  const overviewNodes = [
    {
      id: "clientA",
      position: { x: 50, y: 80 },
      data: { label: "Mobile Client" },
      style: {
        width: 140,
        background: "#1f2937",
        color: "white",
        border: "1px solid #374151",
      },
    },
    {
      id: "clientB",
      position: { x: 50, y: 220 },
      data: { label: "Backend Job" },
      style: {
        width: 140,
        background: "#1f2937",
        color: "white",
        border: "1px solid #374151",
      },
    },
    {
      id: "gateway",
      position: { x: 260, y: 150 },
      data: { label: "API Gateway" },
      style: {
        width: 150,
        background: "#312e81",
        color: "white",
        border: "1px solid #6366f1",
      },
    },
    {
      id: "grpcServer",
      position: { x: 470, y: 150 },
      data: { label: "gRPC Service" },
      style: {
        width: 160,
        background: "#1e40af",
        color: "white",
        border: "1px solid #3b82f6",
      },
    },
    {
      id: "serviceA",
      position: { x: 690, y: 60 },
      data: { label: "User Service" },
      style: {
        width: 150,
        background: "#064e3b",
        color: "white",
        border: "1px solid #10b981",
      },
    },
    {
      id: "serviceB",
      position: { x: 690, y: 160 },
      data: { label: "Billing Service" },
      style: {
        width: 150,
        background: "#064e3b",
        color: "white",
        border: "1px solid #10b981",
      },
    },
    {
      id: "datastore",
      position: { x: 690, y: 260 },
      data: { label: "Data Store" },
      style: {
        width: 150,
        background: "#78350f",
        color: "white",
        border: "1px solid #f59e0b",
      },
    },
  ];

  const overviewEdges = [
    {
      id: "c1",
      source: "clientA",
      target: "gateway",
      label: "HTTP/2 + TLS",
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#818cf8" },
    },
    {
      id: "c2",
      source: "clientB",
      target: "gateway",
      label: "mTLS",
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#818cf8" },
    },
    {
      id: "g1",
      source: "gateway",
      target: "grpcServer",
      label: "Proto Contracts",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#34d399" },
    },
    {
      id: "s1",
      source: "grpcServer",
      target: "serviceA",
      label: "Unary / Streaming",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#fb7185" },
    },
    {
      id: "s2",
      source: "grpcServer",
      target: "serviceB",
      label: "Observability",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#fb7185" },
    },
    {
      id: "s3",
      source: "serviceB",
      target: "datastore",
      label: "Persist",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#f59e0b" },
    },
  ];

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-4 text-white">
        gRPC: The Deep Dive
      </h1>
      <p className="text-xl text-gray-300 mb-8">
        A high-performance, open-source universal RPC framework originally
        developed by Google. gRPC uses Protocol Buffers for serialization and
        HTTP/2 for transport.
      </p>

      {/* What is gRPC */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">What is gRPC?</h2>
        <p className="text-gray-300 mb-4">
          gRPC (gRPC Remote Procedure Call) is a modern, high-performance
          framework that enables efficient communication between services. It
          allows you to define service contracts using Protocol Buffers and
          generates client and server code in multiple languages.
        </p>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3 text-green-400">
            Key Benefits
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              <strong>High Performance:</strong> Binary serialization with
              Protocol Buffers
            </li>
            <li>
              <strong>HTTP/2:</strong> Multiplexing, server push, and header
              compression
            </li>
            <li>
              <strong>Streaming:</strong> Built-in support for bidirectional
              streaming
            </li>
            <li>
              <strong>Language Agnostic:</strong> Generate code for 10+
              programming languages
            </li>
            <li>
              <strong>Strongly Typed:</strong> Contract-first API design with
              .proto files
            </li>
            <li>
              <strong>Deadline/Timeouts:</strong> First-class support for
              request deadlines
            </li>
          </ul>
        </div>
      </section>

      {/* High-Level Architecture */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          High-Level Architecture
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 space-y-4">
            <p className="text-gray-300">
              A typical gRPC deployment terminates TLS at an API gateway,
              funnels requests to shared service runtimes, and fans out into
              domain microservices. Protocol Buffers contract enforcement keeps
              the boundary strongly typed while HTTP/2 provides multiplexed
              streaming.
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex gap-2">
                <span className="text-blue-400">•</span>
                <span>
                  Clients negotiate HTTP/2 upgrade, sending metadata such as
                  deadlines.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">•</span>
                <span>
                  Gateway performs auth, routing, retries, and circuit breaking.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">•</span>
                <span>
                  Services expose unary or streaming RPCs backed by storage
                  layers.
                </span>
              </li>
            </ul>
          </div>
          <InteractiveDiagram
            initialNodes={overviewNodes}
            initialEdges={overviewEdges}
            title="gRPC Request Flow"
            height="360px"
          />
        </div>
      </section>

      {/* Protocol Buffers */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Protocol Buffers (protobuf)
        </h2>
        <p className="text-gray-300 mb-4">
          Protocol Buffers is gRPC's Interface Definition Language (IDL) and
          binary serialization format. You define your service and message types
          in .proto files.
        </p>

        <CodeBlock
          language="protobuf"
          title="user.proto - Service Definition"
          code={`syntax = "proto3";

package user.v1;

// User service definition
service UserService {
  // Unary RPC - single request, single response
  rpc GetUser(GetUserRequest) returns (GetUserResponse);
  
  // Server streaming - single request, stream of responses
  rpc ListUsers(ListUsersRequest) returns (stream User);
  
  // Client streaming - stream of requests, single response
  rpc CreateUsers(stream CreateUserRequest) returns (CreateUsersResponse);
  
  // Bidirectional streaming
  rpc Chat(stream ChatMessage) returns (stream ChatMessage);
}

// Message definitions
message User {
  string id = 1;
  string name = 2;
  string email = 3;
  int32 age = 4;
  repeated string tags = 5;
  google.protobuf.Timestamp created_at = 6;
}

message GetUserRequest {
  string id = 1;
}

message GetUserResponse {
  User user = 1;
}

message ListUsersRequest {
  int32 page_size = 1;
  string page_token = 2;
}

message CreateUserRequest {
  string name = 1;
  string email = 2;
  int32 age = 3;
}

message CreateUsersResponse {
  repeated User users = 1;
  int32 count = 2;
}

message ChatMessage {
  string user_id = 1;
  string message = 2;
  google.protobuf.Timestamp timestamp = 3;
}`}
        />
      </section>

      {/* Server Implementation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Server Implementation
        </h2>

        <CodeBlock
          language="javascript"
          title="Node.js gRPC Server"
          code={`const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load proto file
const packageDefinition = protoLoader.loadSync('user.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user.v1;

// In-memory user database
const users = new Map();

// Implement service methods
const userService = {
  // Unary RPC
  getUser: (call, callback) => {
    const userId = call.request.id;
    const user = users.get(userId);
    
    if (user) {
      callback(null, { user });
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        message: 'User not found'
      });
    }
  },

  // Server streaming RPC
  listUsers: (call) => {
    const pageSize = call.request.page_size || 10;
    
    let count = 0;
    for (const [id, user] of users.entries()) {
      if (count >= pageSize) break;
      
      call.write(user);
      count++;
    }
    
    call.end();
  },

  // Client streaming RPC
  createUsers: (call, callback) => {
    const createdUsers = [];
    
    call.on('data', (request) => {
      const user = {
        id: generateId(),
        name: request.name,
        email: request.email,
        age: request.age,
        tags: [],
        created_at: new Date().toISOString()
      };
      
      users.set(user.id, user);
      createdUsers.push(user);
    });
    
    call.on('end', () => {
      callback(null, {
        users: createdUsers,
        count: createdUsers.length
      });
    });
  },

  // Bidirectional streaming RPC
  chat: (call) => {
    call.on('data', (message) => {
      console.log('Received:', message);
      
      // Echo back with timestamp
      call.write({
        user_id: message.user_id,
        message: \`Echo: \${message.message}\`,
        timestamp: new Date().toISOString()
      });
    });
    
    call.on('end', () => {
      call.end();
    });
  }
};

// Create and start server
const server = new grpc.Server();

server.addService(userProto.UserService.service, userService);

server.bindAsync(
  '0.0.0.0:50051',
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(\`Server running on port \${port}\`);
    server.start();
  }
);`}
        />
      </section>

      {/* Client Implementation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Client Implementation
        </h2>

        <CodeBlock
          language="javascript"
          title="Node.js gRPC Client"
          code={`const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load proto file
const packageDefinition = protoLoader.loadSync('user.proto');
const userProto = grpc.loadPackageDefinition(packageDefinition).user.v1;

// Create client
const client = new userProto.UserService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Unary RPC call
function getUser(userId) {
  return new Promise((resolve, reject) => {
    client.getUser({ id: userId }, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response.user);
      }
    });
  });
}

// Server streaming RPC
function listUsers(pageSize = 10) {
  const call = client.listUsers({ page_size: pageSize });
  
  call.on('data', (user) => {
    console.log('Received user:', user);
  });
  
  call.on('end', () => {
    console.log('Stream ended');
  });
  
  call.on('error', (error) => {
    console.error('Stream error:', error);
  });
}

// Client streaming RPC
function createUsers(users) {
  return new Promise((resolve, reject) => {
    const call = client.createUsers((error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
    
    // Send multiple user requests
    users.forEach(user => {
      call.write(user);
    });
    
    call.end();
  });
}

// Bidirectional streaming RPC
function startChat() {
  const call = client.chat();
  
  // Receive messages
  call.on('data', (message) => {
    console.log(\`[\${message.user_id}]: \${message.message}\`);
  });
  
  call.on('end', () => {
    console.log('Chat ended');
  });
  
  call.on('error', (error) => {
    console.error('Chat error:', error);
  });
  
  // Send messages
  return {
    send: (userId, message) => {
      call.write({
        user_id: userId,
        message,
        timestamp: new Date().toISOString()
      });
    },
    end: () => call.end()
  };
}

// Usage
async function main() {
  try {
    // Unary call
    const user = await getUser('123');
    console.log('User:', user);
    
    // Server streaming
    listUsers(5);
    
    // Client streaming
    const result = await createUsers([
      { name: 'Alice', email: 'alice@example.com', age: 30 },
      { name: 'Bob', email: 'bob@example.com', age: 25 }
    ]);
    console.log('Created:', result);
    
    // Bidirectional streaming
    const chat = startChat();
    chat.send('user1', 'Hello!');
    chat.send('user1', 'How are you?');
    
    setTimeout(() => chat.end(), 5000);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();`}
        />
      </section>

      {/* Streaming Patterns */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Streaming Patterns
        </h2>

        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              1. Unary RPC
            </h3>
            <p className="text-gray-300 mb-3">
              Single request, single response - like a traditional function
              call.
            </p>
            <CodeBlock
              language="protobuf"
              code={`rpc GetUser(GetUserRequest) returns (GetUserResponse);`}
            />
            <p className="text-gray-300 mt-2">
              <strong>Use case:</strong> Fetching a single record, simple CRUD
              operations
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              2. Server Streaming RPC
            </h3>
            <p className="text-gray-300 mb-3">
              Client sends a single request, server responds with a stream of
              messages.
            </p>
            <CodeBlock
              language="protobuf"
              code={`rpc ListUsers(ListUsersRequest) returns (stream User);`}
            />
            <p className="text-gray-300 mt-2">
              <strong>Use case:</strong> Downloading large datasets, live
              updates, subscriptions
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              3. Client Streaming RPC
            </h3>
            <p className="text-gray-300 mb-3">
              Client sends a stream of requests, server responds with a single
              message.
            </p>
            <CodeBlock
              language="protobuf"
              code={`rpc CreateUsers(stream CreateUserRequest) returns (CreateUsersResponse);`}
            />
            <p className="text-gray-300 mt-2">
              <strong>Use case:</strong> Uploading files, batch inserts,
              aggregation
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              4. Bidirectional Streaming RPC
            </h3>
            <p className="text-gray-300 mb-3">
              Both client and server send a stream of messages independently.
            </p>
            <CodeBlock
              language="protobuf"
              code={`rpc Chat(stream ChatMessage) returns (stream ChatMessage);`}
            />
            <p className="text-gray-300 mt-2">
              <strong>Use case:</strong> Chat applications, real-time
              collaboration, game state synchronization
            </p>
          </div>
        </div>
      </section>

      {/* Error Handling */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Error Handling
        </h2>
        <p className="text-gray-300 mb-4">
          gRPC uses status codes to communicate errors. Here are the most common
          codes:
        </p>

        <CodeBlock
          language="javascript"
          title="Error Handling Example"
          code={`const grpc = require('@grpc/grpc-js');

// Server-side error handling
const userService = {
  getUser: (call, callback) => {
    const userId = call.request.id;
    
    if (!userId) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'User ID is required'
      });
    }
    
    const user = users.get(userId);
    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: \`User \${userId} not found\`
      });
    }
    
    // Check permissions
    if (!hasPermission(call.metadata)) {
      return callback({
        code: grpc.status.PERMISSION_DENIED,
        message: 'Insufficient permissions'
      });
    }
    
    callback(null, { user });
  }
};

// Client-side error handling
client.getUser({ id: '123' }, (error, response) => {
  if (error) {
    switch (error.code) {
      case grpc.status.NOT_FOUND:
        console.error('User not found');
        break;
      case grpc.status.INVALID_ARGUMENT:
        console.error('Invalid request:', error.message);
        break;
      case grpc.status.PERMISSION_DENIED:
        console.error('Access denied');
        break;
      case grpc.status.UNAVAILABLE:
        console.error('Service unavailable, retrying...');
        // Implement retry logic
        break;
      default:
        console.error('Unknown error:', error);
    }
    return;
  }
  
  console.log('User:', response.user);
});`}
        />

        <div className="mt-6 bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-green-400">
            Common Status Codes
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>
              <code className="text-blue-300">OK (0)</code>: Success
            </li>
            <li>
              <code className="text-blue-300">CANCELLED (1)</code>: Operation
              cancelled
            </li>
            <li>
              <code className="text-blue-300">INVALID_ARGUMENT (3)</code>:
              Invalid request
            </li>
            <li>
              <code className="text-blue-300">NOT_FOUND (5)</code>: Resource not
              found
            </li>
            <li>
              <code className="text-blue-300">PERMISSION_DENIED (7)</code>:
              Permission denied
            </li>
            <li>
              <code className="text-blue-300">UNAVAILABLE (14)</code>: Service
              unavailable
            </li>
            <li>
              <code className="text-blue-300">UNAUTHENTICATED (16)</code>:
              Authentication required
            </li>
          </ul>
        </div>
      </section>

      {/* Metadata and Interceptors */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Metadata & Interceptors
        </h2>

        <CodeBlock
          language="javascript"
          title="Using Metadata for Authentication"
          code={`// Client: Sending metadata
const metadata = new grpc.Metadata();
metadata.add('authorization', 'Bearer token123');

client.getUser({ id: '123' }, metadata, (error, response) => {
  // Handle response
});

// Server: Reading metadata
const userService = {
  getUser: (call, callback) => {
    const metadata = call.metadata;
    const auth = metadata.get('authorization')[0];
    
    if (!auth || !validateToken(auth)) {
      return callback({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Invalid authentication'
      });
    }
    
    // Process request
    callback(null, { user });
  }
};

// Interceptor for logging
function loggingInterceptor(options, nextCall) {
  return new grpc.InterceptingCall(nextCall(options), {
    start: function(metadata, listener, next) {
      console.log('Request started:', options.method_definition.path);
      next(metadata, listener);
    },
    sendMessage: function(message, next) {
      console.log('Sending:', message);
      next(message);
    },
    receiveMessage: function(message, next) {
      console.log('Received:', message);
      next(message);
    }
  });
}

// Apply interceptor to client
const client = new userProto.UserService(
  'localhost:50051',
  grpc.credentials.createInsecure(),
  { interceptors: [loggingInterceptor] }
);`}
        />
      </section>

      {/* Deadlines and Timeouts */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Deadlines & Timeouts
        </h2>

        <CodeBlock
          language="javascript"
          title="Setting Deadlines"
          code={`// Client: Set a 5-second deadline
const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);

client.getUser(
  { id: '123' },
  { deadline: deadline.getTime() },
  (error, response) => {
    if (error && error.code === grpc.status.DEADLINE_EXCEEDED) {
      console.error('Request timed out');
    }
  }
);

// Server: Check if deadline exceeded
const userService = {
  getUser: (call, callback) => {
    // Check if client cancelled or deadline exceeded
    if (call.cancelled) {
      return callback({
        code: grpc.status.CANCELLED,
        message: 'Request cancelled'
      });
    }
    
    // Long-running operation
    performLongOperation()
      .then(user => callback(null, { user }))
      .catch(error => callback({
        code: grpc.status.INTERNAL,
        message: error.message
      }));
  }
};`}
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
              1. Use Proper Field Numbers
            </h3>
            <p className="text-gray-300 mb-3">
              Field numbers 1-15 use 1 byte, 16-2047 use 2 bytes. Reserve 1-15
              for frequently used fields.
            </p>
            <CodeBlock
              language="protobuf"
              code={`message User {
  // Frequently used fields (1-15)
  string id = 1;
  string name = 2;
  string email = 3;
  
  // Less frequently used fields (16+)
  string bio = 16;
  string website = 17;
}`}
            />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              2. Version Your APIs
            </h3>
            <CodeBlock
              language="protobuf"
              code={`// v1/user.proto
package user.v1;

service UserService {
  rpc GetUser(GetUserRequest) returns (GetUserResponse);
}

// v2/user.proto
package user.v2;

service UserService {
  rpc GetUser(GetUserRequest) returns (GetUserResponse);
  rpc GetUserProfile(GetUserProfileRequest) returns (GetUserProfileResponse);
}`}
            />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              3. Implement Health Checks
            </h3>
            <CodeBlock
              language="javascript"
              code={`const health = require('@grpc/grpc-health');

// Create health check service
const healthCheckService = new health.HealthCheckService();

// Set service status  
healthCheckService.setServingStatus(
  'user.v1.UserService',
  grpc.health.v1.HealthCheckResponse.ServingStatus.SERVING
);

// Add to server
server.addService(
  health.HealthCheckService.service,
  healthCheckService
);`}
            />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">
              4. Use Connection Pooling
            </h3>
            <CodeBlock
              language="javascript"
              code={`// Keep connections alive with keepalive
const client = new userProto.UserService(
  'localhost:50051',
  grpc.credentials.createInsecure(),
  {
    'grpc.keepalive_time_ms': 10000,
    'grpc.keepalive_timeout_ms': 5000,
    'grpc.keepalive_permit_without_calls': 1,
    'grpc.http2.max_pings_without_data': 0
  }
);`}
            />
          </div>
        </div>
      </section>

      {/* gRPC vs REST */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">gRPC vs REST</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-4 py-3 text-left text-white">
                  Aspect
                </th>
                <th className="border border-gray-700 px-4 py-3 text-left text-white">
                  gRPC
                </th>
                <th className="border border-gray-700 px-4 py-3 text-left text-white">
                  REST
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  Protocol
                </td>
                <td className="border border-gray-700 px-4 py-3">HTTP/2</td>
                <td className="border border-gray-700 px-4 py-3">
                  HTTP/1.1 (usually)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  Serialization
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Protocol Buffers (binary)
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  JSON (text)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  Performance
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Higher (binary, compression)
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Lower (text-based)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  Streaming
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Built-in bidirectional
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Limited (SSE, WebSockets)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  Browser Support
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Limited (requires proxy)
                </td>
                <td className="border border-gray-700 px-4 py-3">Native</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  Code Generation
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Yes (from .proto)
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Optional (OpenAPI)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">
                  Use Case
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Microservices, IoT, mobile
                </td>
                <td className="border border-gray-700 px-4 py-3">
                  Public APIs, web services
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Tools and Libraries */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">
          Popular gRPC Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">
              grpcurl
            </h3>
            <p className="text-gray-300">
              Command-line tool for interacting with gRPC servers
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">
              Bloomrpc
            </h3>
            <p className="text-gray-300">
              GUI client for testing gRPC services
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">
              grpc-gateway
            </h3>
            <p className="text-gray-300">
              Generate RESTful JSON API from gRPC service
            </p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Envoy</h3>
            <p className="text-gray-300">Proxy with first-class gRPC support</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GrpcDocs;
