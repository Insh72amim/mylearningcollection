import React from 'react';
import { MarkerType } from 'reactflow';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';

const RedisDocs = () => {
  const eventLoopNodes = [
    { id: 'c1', position: { x: 50, y: 50 }, data: { label: 'Client 1' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 100 } },
    { id: 'c2', position: { x: 50, y: 150 }, data: { label: 'Client 2' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 100 } },
    { id: 'c3', position: { x: 50, y: 250 }, data: { label: 'Client 3' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 100 } },
    
    { id: 'el', position: { x: 300, y: 150 }, data: { label: 'Event Loop\n(Single Thread)' }, style: { background: '#b91c1c', color: 'white', border: '1px solid #ef4444', width: 150, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' } },
    
    { id: 'mem', position: { x: 550, y: 150 }, data: { label: 'In-Memory Data' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 150, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' } },
  ];

  const eventLoopEdges = [
    { id: 'e1', source: 'c1', target: 'el', label: 'Command', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2', source: 'c2', target: 'el', label: 'Command', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e3', source: 'c3', target: 'el', label: 'Command', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    
    { id: 'e4', source: 'el', target: 'mem', label: 'Exec', style: { stroke: '#ef4444' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e5', source: 'mem', target: 'el', label: 'Result', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    
    { id: 'e6', source: 'el', target: 'c1', label: 'Resp', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e7', source: 'el', target: 'c2', label: 'Resp', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e8', source: 'el', target: 'c3', label: 'Resp', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  const sentinelNodes = [
    { id: 'client', position: { x: 350, y: 0 }, data: { label: 'Client' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 100 } },
    
    // Sentinels
    { id: 's1', position: { x: 150, y: 150 }, data: { label: 'Sentinel 1' }, style: { background: '#4b5563', color: 'white', border: '1px solid #374151', width: 100 } },
    { id: 's2', position: { x: 350, y: 150 }, data: { label: 'Sentinel 2' }, style: { background: '#4b5563', color: 'white', border: '1px solid #374151', width: 100 } },
    { id: 's3', position: { x: 550, y: 150 }, data: { label: 'Sentinel 3' }, style: { background: '#4b5563', color: 'white', border: '1px solid #374151', width: 100 } },
    
    // Redis Cluster
    { id: 'm', position: { x: 350, y: 300 }, data: { label: 'Master' }, style: { background: '#b91c1c', color: 'white', border: '1px solid #ef4444', width: 120 } },
    { id: 'r1', position: { x: 200, y: 450 }, data: { label: 'Replica 1' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 120 } },
    { id: 'r2', position: { x: 500, y: 450 }, data: { label: 'Replica 2' }, style: { background: '#1e3a8a', color: 'white', border: '1px solid #3b82f6', width: 120 } },
  ];

  const sentinelEdges = [
    { id: 'e1', source: 'client', target: 's1', label: 'Ask Master?', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    
    { id: 'mon1', source: 's1', target: 'm', label: 'Monitor', style: { stroke: '#10b981', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'mon2', source: 's2', target: 'm', label: 'Monitor', style: { stroke: '#10b981', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'mon3', source: 's3', target: 'm', label: 'Monitor', style: { stroke: '#10b981', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed } },
    
    { id: 'rep1', source: 'm', target: 'r1', label: 'Replicate', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'rep2', source: 'm', target: 'r2', label: 'Replicate', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Redis: The Deep Dive</h1>
        <p className="text-xl text-gray-400">
          A comprehensive guide to the world's fastest in-memory data store, covering architecture, persistence, and advanced data structures.
        </p>
      </div>

      {/* Section 1: Core Architecture */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-sm px-3 py-1 rounded-full">01</span>
          Core Architecture
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Redis is an <strong>in-memory</strong> key-value store known for sub-millisecond latency. 
          Its architecture is unique because it is <strong>single-threaded</strong>.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Why Single-Threaded?</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-red-400 font-bold">No Locks:</span>
                <span>Avoids complex locking mechanisms and race conditions.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 font-bold">CPU Cache:</span>
                <span>Maximizes CPU cache efficiency.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 font-bold">I/O Bound:</span>
                <span>Redis is usually network/memory bound, not CPU bound.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 font-bold">Event Loop:</span>
                <span>Uses I/O multiplexing (epoll/kqueue) to handle thousands of connections.</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-700 flex items-center justify-center">
            <InteractiveDiagram 
              initialNodes={eventLoopNodes} 
              initialEdges={eventLoopEdges} 
              title="Redis Event Loop" 
            />
          </div>
        </div>
      </section>

      {/* Section 2: Data Structures */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">02</span>
          Data Structures
        </h2>
        <p className="mb-6">
          Redis is not just a key-value store; it's a <strong>data structures server</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-2">Strings</h3>
            <p className="text-sm text-gray-400 mb-3">Binary-safe strings (text, images, serialized objects).</p>
            <code className="text-xs bg-gray-900 p-2 rounded block text-green-400">SET key "value"<br/>INCR counter</code>
          </div>
          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-2">Lists</h3>
            <p className="text-sm text-gray-400 mb-3">Linked lists. Good for queues/stacks.</p>
            <code className="text-xs bg-gray-900 p-2 rounded block text-green-400">LPUSH queue "job"<br/>RPOP queue</code>
          </div>
          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-2">Sets</h3>
            <p className="text-sm text-gray-400 mb-3">Unordered unique strings. Set operations (union, intersect).</p>
            <code className="text-xs bg-gray-900 p-2 rounded block text-green-400">SADD users "alice"<br/>SISMEMBER users "bob"</code>
          </div>
          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-2">Hashes</h3>
            <p className="text-sm text-gray-400 mb-3">Maps between string fields and string values. Like objects.</p>
            <code className="text-xs bg-gray-900 p-2 rounded block text-green-400">HSET user:1 name "Alice"<br/>HGETALL user:1</code>
          </div>
          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-2">Sorted Sets (ZSet)</h3>
            <p className="text-sm text-gray-400 mb-3">Unique strings ordered by a score. Perfect for leaderboards.</p>
            <code className="text-xs bg-gray-900 p-2 rounded block text-green-400">ZADD rank 100 "Alice"<br/>ZRANGE rank 0 -1</code>
          </div>
          <div className="bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-2">Streams</h3>
            <p className="text-sm text-gray-400 mb-3">Log data structure (like Kafka). Consumer groups support.</p>
            <code className="text-xs bg-gray-900 p-2 rounded block text-green-400">XADD stream * field value<br/>XREAD BLOCK 0 STREAMS s $</code>
          </div>
        </div>
      </section>

      {/* Section 3: Persistence */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">03</span>
          Persistence: RDB vs AOF
        </h2>
        <p className="mb-6">
          Redis keeps data in RAM, but persists to disk for durability.
        </p>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">RDB (Redis Database)</h3>
              <p className="text-sm text-gray-400 mb-4">
                Point-in-time snapshots of your dataset at specified intervals.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2 text-green-400">✓ Compact files (good for backups)</li>
                <li className="flex gap-2 text-green-400">✓ Faster startup</li>
                <li className="flex gap-2 text-red-400">✗ Data loss since last snapshot</li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-3">AOF (Append Only File)</h3>
              <p className="text-sm text-gray-400 mb-4">
                Logs every write operation received by the server.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2 text-green-400">✓ Higher durability (fsync every sec)</li>
                <li className="flex gap-2 text-red-400">✗ Larger file size</li>
                <li className="flex gap-2 text-red-400">✗ Slower startup (replay logs)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: High Availability */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">04</span>
          Replication & Sentinel
        </h2>
        
        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Redis Sentinel</h3>
            <p className="mb-4 text-gray-400">
              Provides high availability. Monitors master/replicas and performs automatic failover.
            </p>
            <InteractiveDiagram 
              initialNodes={sentinelNodes} 
              initialEdges={sentinelEdges} 
              title="Redis Sentinel Architecture" 
            />
          </div>
        </div>
      </section>

      {/* Section 5: Caching Strategies */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-orange-600 text-sm px-3 py-1 rounded-full">05</span>
          Caching Strategies & Eviction
        </h2>
        
        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Eviction Policies (maxmemory-policy)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left p-3 text-blue-400">Policy</th>
                    <th className="text-left p-3 text-blue-400">Description</th>
                    <th className="text-left p-3 text-blue-400">Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  <tr>
                    <td className="p-3 font-mono">allkeys-lru</td>
                    <td className="p-3">Evict least recently used keys</td>
                    <td className="p-3 text-green-400">General caching</td>
                  </tr>
                  <tr className="bg-gray-900/50">
                    <td className="p-3 font-mono">volatile-lru</td>
                    <td className="p-3">Evict LRU keys with TTL set</td>
                    <td className="p-3 text-green-400">Cache + Persistent data mix</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">allkeys-lfu</td>
                    <td className="p-3">Evict least frequently used</td>
                    <td className="p-3 text-green-400">Access patterns matter</td>
                  </tr>
                  <tr className="bg-gray-900/50">
                    <td className="p-3 font-mono">noeviction</td>
                    <td className="p-3">Return error on write</td>
                    <td className="p-3 text-green-400">DB usage (no cache)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Cache Patterns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 p-5 rounded-lg border border-gray-700">
                <h4 className="font-bold text-yellow-400 mb-2">Cache-Aside (Lazy Loading)</h4>
                <p className="text-sm">App checks cache. If miss, load from DB and set cache.</p>
              </div>
              <div className="bg-gray-900 p-5 rounded-lg border border-gray-700">
                <h4 className="font-bold text-yellow-400 mb-2">Write-Through</h4>
                <p className="text-sm">App writes to cache and DB simultaneously.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Code Example */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">06</span>
          Node.js Implementation
        </h2>
        
        <div className="space-y-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Using ioredis</h3>
            <CodeBlock 
              language="javascript" 
              title="redis_example.js"
              code={`const Redis = require('ioredis');
const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

async function cacheUser(userId) {
  const cacheKey = \`user:\${userId}\`;
  
  // 1. Check Cache
  const cachedUser = await redis.get(cacheKey);
  if (cachedUser) {
    return JSON.parse(cachedUser);
  }
  
  // 2. Fetch from DB (simulated)
  const user = await db.findUser(userId);
  
  // 3. Set Cache with TTL (1 hour)
  await redis.set(cacheKey, JSON.stringify(user), 'EX', 3600);
  
  return user;
}

// Atomic Counter
async function incrementView(postId) {
  return await redis.incr(\`post:\${postId}:views\`);
}

// Pub/Sub
const sub = new Redis();
sub.subscribe('notifications', (err) => {
  if (err) console.error(err);
});

sub.on('message', (channel, message) => {
  console.log(\`Received \${message} from \${channel}\`);
});`} 
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default RedisDocs;
