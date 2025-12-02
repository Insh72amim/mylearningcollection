import React from 'react';
import CodeBlock from '../common/CodeBlock';

const WebSocketsDocs = () => {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-4 text-white">WebSockets: The Deep Dive</h1>
      <p className="text-xl text-gray-300 mb-8">
        A communication protocol providing full-duplex, bidirectional communication channels over a single TCP connection. WebSockets enable real-time data exchange between clients and servers with minimal overhead.
      </p>

      {/* What are WebSockets */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">What are WebSockets?</h2>
        <p className="text-gray-300 mb-4">
          WebSockets provide a persistent connection between a client and server, allowing both parties to send data at any time. Unlike HTTP's request-response model, WebSockets support true bidirectional communication.
        </p>
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-4">
          <h3 className="text-xl font-semibold mb-3 text-green-400">Key Benefits</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li><strong>Real-time Communication:</strong> Instant bidirectional data transfer</li>
            <li><strong>Low Latency:</strong> No overhead of HTTP headers on every message</li>
            <li><strong>Persistent Connection:</strong> Single TCP connection stays open</li>
            <li><strong>Efficient:</strong> Reduced bandwidth compared to polling</li>
            <li><strong>Browser Support:</strong> Native support in all modern browsers</li>
            <li><strong>Firewall Friendly:</strong> Works over standard HTTP ports (80/443)</li>
          </ul>
        </div>
      </section>

      {/* How WebSockets Work */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">How WebSockets Work</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">1. Handshake</h3>
            <p className="text-gray-300 mb-3">
              WebSocket connection starts with an HTTP upgrade request.
            </p>
            <CodeBlock
              language="http"
              code={`GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13

HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=`}
            />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">2. Data Frames</h3>
            <p className="text-gray-300">
              After handshake, data is sent in frames (text or binary). Each frame has minimal overhead, making WebSockets very efficient for frequent messages.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">3. Connection Close</h3>
            <p className="text-gray-300">
              Either party can initiate connection closure. A close frame is sent, followed by TCP connection termination.
            </p>
          </div>
        </div>
      </section>

      {/* Client Implementation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Client Implementation</h2>
        
        <CodeBlock
          language="javascript"
          title="Browser WebSocket Client"
          code={`// Create WebSocket connection
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', (event) => {
  console.log('Connected to server');
  
  // Send message
  socket.send(JSON.stringify({
    type: 'join',
    username: 'Alice'
  }));
});

// Listen for messages
socket.addEventListener('message', (event) => {
  console.log('Message from server:', event.data);
  
  const data = JSON.parse(event.data);
  
  switch (data.type) {
    case 'chat':
      displayMessage(data.username, data.message);
      break;
    case 'user_joined':
      console.log(\`\${data.username} joined\`);
      break;
    case 'user_left':
      console.log(\`\${data.username} left\`);
      break;
  }
});

// Connection closed
socket.addEventListener('close', (event) => {
  console.log('Disconnected from server');
  console.log('Code:', event.code, 'Reason:', event.reason);
  
  // Attempt to reconnect
  if (event.code !== 1000) {
    setTimeout(() => reconnect(), 3000);
  }
});

// Handle errors
socket.addEventListener('error', (error) => {
  console.error('WebSocket error:', error);
});

// Send chat message
function sendMessage(message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      type: 'chat',
      message: message
    }));
  } else {
    console.error('WebSocket is not open');
  }
}

// Close connection
function disconnect() {
  socket.close(1000, 'User disconnected');
}

// Check connection state
console.log('ReadyState:', {
  'CONNECTING': socket.CONNECTING,  // 0
  'OPEN': socket.OPEN,              // 1
  'CLOSING': socket.CLOSING,        // 2
  'CLOSED': socket.CLOSED           // 3
});`}
        />
      </section>

      {/* Server Implementation */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Server Implementation</h2>
        
        <CodeBlock
          language="javascript"
          title="Node.js WebSocket Server (ws library)"
          code={`const WebSocket = require('ws');
const http = require('http');

// Create HTTP server
const server = http.createServer();

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Map();

// Handle new connections
wss.on('connection', (ws, req) => {
  console.log('New client connected from:', req.socket.remoteAddress);
  
  let clientId = null;
  let username = null;
  
  // Handle messages from client
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      
      switch (message.type) {
        case 'join':
          username = message.username;
          clientId = generateId();
          clients.set(clientId, { ws, username });
          
          // Broadcast user joined
          broadcast({
            type: 'user_joined',
            username: username
          }, clientId);
          
          // Send current users list
          ws.send(JSON.stringify({
            type: 'users',
            users: Array.from(clients.values()).map(c => c.username)
          }));
          break;
          
        case 'chat':
          // Broadcast chat message
          broadcast({
            type: 'chat',
            username: username,
            message: message.message,
            timestamp: new Date().toISOString()
          }, clientId);
          break;
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });
  
  // Handle client disconnect
  ws.on('close', (code, reason) => {
    console.log(\`Client disconnected: \${username}\`);
    
    if (clientId) {
      clients.delete(clientId);
      
      // Broadcast user left
      broadcast({
        type: 'user_left',
        username: username
      });
    }
  });
  
  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
  
  // Send ping to keep connection alive
  const pingInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping();
    }
  }, 30000);
  
  ws.on('close', () => clearInterval(pingInterval));
});

// Broadcast message to all clients except sender
function broadcast(message, senderId = null) {
  const data = JSON.stringify(message);
  
  clients.forEach((client, id) => {
    if (id !== senderId && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(data);
    }
  });
}

// Start server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(\`WebSocket server running on port \${PORT}\`);
});

function generateId() {
  return Math.random().toString(36).substring(7);
}`}
        />
      </section>

      {/* Socket.IO */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Socket.IO - Enhanced WebSockets</h2>
        <p className="text-gray-300 mb-4">
          Socket.IO is a popular library that provides additional features on top of WebSockets, including automatic reconnection, rooms, and fallback to HTTP long polling.
        </p>
        
        <CodeBlock
          language="javascript"
          title="Socket.IO Server"
          code={`const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

// Middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (validateToken(token)) {
    next();
  } else {
    next(new Error('Authentication error'));
  }
});

// Handle connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Join a room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(\`User \${socket.id} joined room \${roomId}\`);
    
    // Notify others in the room
    socket.to(roomId).emit('user-joined', {
      userId: socket.id,
      timestamp: Date.now()
    });
  });
  
  // Handle chat message
  socket.on('chat-message', (data) => {
    // Emit to everyone in the room except sender
    socket.to(data.roomId).emit('chat-message', {
      userId: socket.id,
      message: data.message,
      timestamp: Date.now()
    });
  });
  
  // Private message
  socket.on('private-message', (data) => {
    io.to(data.recipientId).emit('private-message', {
      senderId: socket.id,
      message: data.message
    });
  });
  
  // Broadcast to everyone
  socket.on('announcement', (data) => {
    io.emit('announcement', {
      message: data.message,
      timestamp: Date.now()
    });
  });
  
  // Handle disconnect
  socket.on('disconnect', (reason) => {
    console.log('User disconnected:', socket.id, reason);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`}
        />
        
        <CodeBlock
          language="javascript"
          title="Socket.IO Client"
          code={`import { io } from 'socket.io-client';

// Connect to server
const socket = io('http://localhost:3000', {
  auth: {
    token: 'your-auth-token'
  },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});

// Connection events
socket.on('connect', () => {
  console.log('Connected:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected:', reason);
  
  if (reason === 'io server disconnect') {
    // Server forcefully disconnected, reconnect manually
    socket.connect();
  }
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error.message);
});

// Join room
socket.emit('join-room', 'room123');

// Listen for events
socket.on('user-joined', (data) => {
  console.log('User joined:', data.userId);
});

socket.on('chat-message', (data) => {
  console.log(\`\${data.userId}: \${data.message}\`);
});

// Send message
function sendMessage(roomId, message) {
  socket.emit('chat-message', {
    roomId,
    message
  });
}

// Send private message
function sendPrivateMessage(recipientId, message) {
  socket.emit('private-message', {
    recipientId,
    message
  });
}

// Disconnect
function disconnect() {
  socket.disconnect();
}`}
        />
      </section>

      {/* Common Use Cases */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Common Use Cases</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Chat Applications</h3>
            <p className="text-gray-300">Real-time messaging between users with instant delivery and typing indicators</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Live Notifications</h3>
            <p className="text-gray-300">Push notifications to users without polling</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Collaborative Editing</h3>
            <p className="text-gray-300">Multiple users editing same document simultaneously</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Live Sports Updates</h3>
            <p className="text-gray-300">Real-time scoreboards and game statistics</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Trading Platforms</h3>
            <p className="text-gray-300">Live stock prices and order book updates</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Multiplayer Games</h3>
            <p className="text-gray-300">Real-time game state synchronization</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Live Dashboards</h3>
            <p className="text-gray-300">Real-time analytics and monitoring displays</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">IoT Data Streams</h3>
            <p className="text-gray-300">Continuous sensor data transmission</p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Best Practices</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">1. Implement Reconnection Logic</h3>
            <CodeBlock
              language="javascript"
              code={`class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.connect();
  }
  
  connect() {
    this.ws = new WebSocket(this.url);
    
    this.ws.onopen = () => {
      console.log('Connected');
      this.reconnectAttempts = 0;
    };
    
    this.ws.onclose = (event) => {
      if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
        
        console.log(\`Reconnecting in \${delay}ms...\`);
        setTimeout(() => this.connect(), delay);
      }
    };
  }
}`}
            />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">2. Implement Heartbeat/Ping-Pong</h3>
            <CodeBlock
              language="javascript"
              code={`// Client
let pingInterval;

socket.addEventListener('open', () => {
  pingInterval = setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'ping' }));
    }
  }, 30000);
});

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'pong') {
    // Server is alive
  }
});

socket.addEventListener('close', () => {
  clearInterval(pingInterval);
});

// Server
ws.on('message', (data) => {
  const message = JSON.parse(data);
  if (message.type === 'ping') {
    ws.send(JSON.stringify({ type: 'pong' }));
  }
});`}
            />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">3. Handle Message Ordering</h3>
            <CodeBlock
              language="javascript"
              code={`// Add sequence numbers to messages
let sequenceNumber = 0;

function sendMessage(data) {
  const message = {
    ...data,
    seq: sequenceNumber++,
    timestamp: Date.now()
  };
  socket.send(JSON.stringify(message));
}

// On receiver side
let expectedSeq = 0;
const messageBuffer = [];

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  
  if (message.seq === expectedSeq) {
    processMessage(message);
    expectedSeq++;
    
    // Process buffered messages
    while (messageBuffer.length > 0) {
      const buffered = messageBuffer.find(m => m.seq === expectedSeq);
      if (buffered) {
        processMessage(buffered);
        messageBuffer.splice(messageBuffer.indexOf(buffered), 1);
        expectedSeq++;
      } else {
        break;
      }
    }
  } else if (message.seq > expectedSeq) {
    // Buffer out-of-order message
    messageBuffer.push(message);
  }
};`}
            />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">4. Implement Rate Limiting</h3>
            <CodeBlock
              language="javascript"
              code={`// Server-side rate limiting
const rateLimits = new Map();

ws.on('message', (data) => {
  const clientId = getClientId(ws);
  const now = Date.now();
  
  if (!rateLimits.has(clientId)) {
    rateLimits.set(clientId, { count: 0, resetTime: now + 60000 });
  }
  
  const limit = rateLimits.get(clientId);
  
  if (now > limit.resetTime) {
    limit.count = 0;
    limit.resetTime = now + 60000;
  }
  
  if (limit.count >= 100) {  // Max 100 messages per minute
    ws.send(JSON.stringify({
      type: 'error',
      message: 'Rate limit exceeded'
    }));
    return;
  }
  
  limit.count++;
  // Process message
});`}
            />
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Security Considerations</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">Use WSS (WebSocket Secure)</h3>
            <CodeBlock
              language="javascript"
              code={`// Always use wss:// in production
const socket = new WebSocket('wss://example.com');

// Server with TLS
const https = require('https');
const fs = require('fs');

const server = https.createServer({
  cert: fs.readFileSync('/path/to/cert.pem'),
  key: fs.readFileSync('/path/to/key.pem')
});

const wss = new WebSocket.Server({ server });`}
            />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">Validate Origin</h3>
            <CodeBlock
              language="javascript"
              code={`wss.on('connection', (ws, req) => {
  const origin = req.headers.origin;
  const allowedOrigins = ['https://example.com', 'https://app.example.com'];
  
  if (!allowedOrigins.includes(origin)) {
    ws.close(1008, 'Origin not allowed');
    return;
  }
  
  // Process connection
});`}
            />
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-400">Authenticate Connections</h3>
            <CodeBlock
              language="javascript"
              code={`// Client sends token
const socket = new WebSocket('wss://example.com?token=jwt_token');

// Server validates token  
wss.on('connection', (ws, req) => {
  const url = new URL(req.url, 'wss://example.com');
  const token = url.searchParams.get('token');
  
  if (!validateJWT(token)) {
    ws.close(1008, 'Invalid authentication');
    return;
  }
  
  const user = getUserFromToken(token);
  // Store user info with connection
});`}
            />
          </div>
        </div>
      </section>

      {/* Scaling */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Scaling WebSocket Applications</h2>
        
        <CodeBlock
          language="javascript"
          title="Using Redis for Multi-Server Setup"
          code={`const Redis = require('ioredis');
const { Server } = require('socket.io');

const io = new Server(server);

// Create Redis pub/sub clients
const pub = new Redis();
const sub = new Redis();

// Subscribe to Redis channel
sub.subscribe('messages');

// Forward Redis messages to WebSocket clients
sub.on('message', (channel, message) => {
  if (channel === 'messages') {
    const data = JSON.parse(message);
    io.to(data.room).emit(data.event, data.payload);
  }
});

// Publish WebSocket messages to Redis
io.on('connection', (socket) => {
  socket.on('chat-message', (data) => {
    pub.publish('messages', JSON.stringify({
      room: data.room,
      event: 'chat-message',
      payload: data
    }));
  });
});`}
        />
      </section>

      {/* WebSockets vs Polling */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">WebSockets vs HTTP Polling</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-700 px-4 py-3 text-left text-white">Aspect</th>
                <th className="border border-gray-700 px-4 py-3 text-left text-white">WebSockets</th>
                <th className="border border-gray-700 px-4 py-3 text-left text-white">HTTP Polling</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">Connection</td>
                <td className="border border-gray-700 px-4 py-3">Persistent (one TCP connection)</td>
                <td className="border border-gray-700 px-4 py-3">New connection per request</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">Latency</td>
                <td className="border border-gray-700 px-4 py-3">Very low (milliseconds)</td>
                <td className="border border-gray-700 px-4 py-3">Higher (poll interval + RTT)</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">Overhead</td>
                <td className="border border-gray-700 px-4 py-3">Minimal (small frame headers)</td>
                <td className="border border-gray-700 px-4 py-3">High (full HTTP headers)</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">Server Push</td>
                <td className="border border-gray-700 px-4 py-3">Native support</td>
                <td className="border border-gray-700 px-4 py-3">Not supported</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">Bandwidth</td>
                <td className="border border-gray-700 px-4 py-3">Efficient</td>
                <td className="border border-gray-700 px-4 py-3">Wasteful (empty responses)</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">Complexity</td>
                <td className="border border-gray-700 px-4 py-3">Moderate</td>
                <td className="border border-gray-700 px-4 py-3">Simple</td>
              </tr>
              <tr>
                <td className="border border-gray-700 px-4 py-3 font-semibold">Use Case</td>
                <td className="border border-gray-700 px-4 py-3">Real-time applications</td>
                <td className="border border-gray-700 px-4 py-3">Occasional updates</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Libraries and Tools */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-blue-400">Popular WebSocket Libraries</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Socket.IO</h3>
            <p className="text-gray-300">Feature-rich library with rooms, namespaces, and auto-reconnection</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">ws (Node.js)</h3>
            <p className="text-gray-300">Fast and lightweight WebSocket implementation</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">uWebSockets.js</h3>
            <p className="text-gray-300">Ultra-fast WebSocket server for high performance</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Primus</h3>
            <p className="text-gray-300">Abstraction layer supporting multiple real-time frameworks</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">SockJS</h3>
            <p className="text-gray-300">WebSocket emulation with fallback options</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-green-400">SignalR (.NET)</h3>
            <p className="text-gray-300">Real-time web functionality for .NET applications</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebSocketsDocs;
