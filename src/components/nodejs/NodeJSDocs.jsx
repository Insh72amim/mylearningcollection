import React from 'react';
import { MarkerType } from 'reactflow';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';
import { Server, Zap, GitBranch, Box, Shield, BarChart3, Code, Layers } from 'lucide-react';

const NodeJSDocs = () => {
  // 1. Event Loop Architecture
  const eventLoopNodes = [
    // Phases
    { id: 'timers', position: { x: 250, y: 50 }, type: 'custom', data: { label: '1. Timers', icon: 'activity', gradient: 'from-red-600 to-red-800', details: 'setTimeout(), setInterval()' } },
    { id: 'pending', position: { x: 250, y: 180 }, type: 'custom', data: { label: '2. Pending I/O', icon: 'server', gradient: 'from-orange-600 to-orange-800', details: 'System operations (TCP errors)' } },
    { id: 'idle', position: { x: 250, y: 310 }, type: 'custom', data: { label: '3. Idle/Prepare', icon: 'cpu', gradient: 'from-yellow-600 to-yellow-800', details: 'Internal use only' } },
    { id: 'poll', position: { x: 250, y: 440 }, type: 'custom', data: { label: '4. Poll', icon: 'zap', gradient: 'from-green-600 to-green-800', details: 'Retrieves new I/O events; executes I/O related callbacks' } },
    { id: 'check', position: { x: 250, y: 570 }, type: 'custom', data: { label: '5. Check', icon: 'check', gradient: 'from-blue-600 to-blue-800', details: 'setImmediate() callbacks' } },
    { id: 'close', position: { x: 250, y: 700 }, type: 'custom', data: { label: '6. Close Callbacks', icon: 'x', gradient: 'from-purple-600 to-purple-800', details: 'socket.on("close", ...)' } },
    
    // Queue indicators
    { id: 'microtasks', position: { x: -50, y: 380 }, type: 'custom', data: { label: 'Microtask Queue', subLabel: 'High Priority', icon: 'zap', gradient: 'from-indigo-600 to-indigo-900', details: 'process.nextTick() & Promise callbacks run between phases' } },
    { id: 'callstack', position: { x: 550, y: 380 }, type: 'custom', data: { label: 'V8 Call Stack', subLabel: 'Single Threaded', icon: 'layers', gradient: 'from-gray-600 to-gray-800', details: 'Executes JS code. Offloads async to Libuv.' } },
  ];

  const eventLoopEdges = [
    { id: 'e1', source: 'timers', target: 'pending', animated: true, style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2', source: 'pending', target: 'idle', animated: true, style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e3', source: 'idle', target: 'poll', animated: true, style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e4', source: 'poll', target: 'check', animated: true, style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e5', source: 'check', target: 'close', animated: true, style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e6', source: 'close', target: 'timers', animated: true, style: { stroke: '#10b981', strokeDasharray: '5,5' }, label: 'Next Loop', markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e7', source: 'microtasks', target: 'poll', style: { stroke: '#6366f1', strokeDasharray: '5,5', strokeWidth: 2 }, label: 'Runs between phases' },
    { id: 'e8', source: 'callstack', target: 'poll', style: { stroke: '#9ca3af', strokeDasharray: '5,5' }, label: 'Offload I/O' },
  ];

  // 2. Middleware Chain
  const middlewareNodes = [
    { id: 'req', position: { x: 0, y: 200 }, type: 'custom', data: { label: 'HTTP Request', icon: 'globe', gradient: 'from-gray-700 to-gray-900' } },
    { id: 'mw1', position: { x: 250, y: 50 }, type: 'custom', data: { label: 'CORS', subLabel: 'Security', icon: 'shield', gradient: 'from-blue-600 to-blue-800' } },
    { id: 'mw2', position: { x: 250, y: 200 }, type: 'custom', data: { label: 'Body Parser', subLabel: 'Data', icon: 'file', gradient: 'from-blue-600 to-blue-800' } },
    { id: 'mw3', position: { x: 250, y: 350 }, type: 'custom', data: { label: 'Auth Middleware', subLabel: 'Guard', icon: 'lock', gradient: 'from-blue-600 to-blue-800' } },
    { id: 'route', position: { x: 550, y: 200 }, type: 'custom', data: { label: 'Route Handler', subLabel: 'Controller', icon: 'code', gradient: 'from-green-600 to-green-800' } },
    { id: 'err', position: { x: 250, y: 500 }, type: 'custom', data: { label: 'Error Handler', subLabel: '(err, req, res, next)', icon: 'alert-triangle', gradient: 'from-red-600 to-red-800' } },
    { id: 'res', position: { x: 800, y: 200 }, type: 'custom', data: { label: 'HTTP Response', icon: 'globe', gradient: 'from-gray-700 to-gray-900' } },
  ];

  const middlewareEdges = [
    { id: 'm1', source: 'req', target: 'mw1', animated: true, style: { stroke: '#9ca3af' } },
    { id: 'm2', source: 'req', target: 'mw2', animated: true, style: { stroke: '#9ca3af' } },
    { id: 'm3', source: 'req', target: 'mw3', animated: true, style: { stroke: '#9ca3af' } },
    { id: 'm4', source: 'mw1', target: 'route', style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'm5', source: 'mw2', target: 'route', style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'm6', source: 'mw3', target: 'route', style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'm7', source: 'route', target: 'res', animated: true, style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'm8', source: 'mw3', target: 'err', style: { stroke: '#ef4444', strokeDasharray: '5,5' }, label: 'Error' },
    { id: 'm9', source: 'err', target: 'res', style: { stroke: '#ef4444' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Node.js Internals & Performance</h1>
        <p className="text-xl text-gray-400">
          Deep dive into the V8 engine, Libuv thread pool, and advanced asynchronous patterns.
        </p>
      </div>

      {/* Section 1: Event Loop & Architecture */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-sm px-3 py-1 rounded-full">01</span>
          Event Loop & Libuv
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          Node.js uses <strong>Libuv</strong> to handle asynchronous operations. While JS executes on a single thread (V8), Libuv maintains a thread pool (default size: 4) for heavy operations like file I/O, DNS, and crypto.
        </p>
        
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">The Event Loop Phases</h3>
          <InteractiveDiagram 
            initialNodes={eventLoopNodes} 
            initialEdges={eventLoopEdges} 
            title="Event Loop & Microtasks"
            height="800px"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">V8 Engine Internals</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <strong className="text-yellow-400 min-w-[100px]">Call Stack:</strong>
                <span>LIFO structure. Executes JS frames. If blocked, the loop stops.</span>
              </li>
              <li className="flex gap-2">
                <strong className="text-yellow-400 min-w-[100px]">Memory Heap:</strong>
                <span>Where objects are allocated. Managed by Garbage Collector.</span>
              </li>
              <li className="flex gap-2">
                <strong className="text-yellow-400 min-w-[100px]">Garbage Coll:</strong>
                <span>Uses "Scavenge" (minor GC) for young generation and "Mark-Sweep-Compact" (major GC) for old generation.</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Libuv Thread Pool</h3>
            <p className="text-sm mb-3">
              By default, `UV_THREADPOOL_SIZE=4`. These threads handle:
            </p>
            <ul className="space-y-2 text-sm list-disc list-inside text-gray-400">
              <li>File System operations (`fs.*`)</li>
              <li>DNS lookups (`dns.lookup`)</li>
              <li>Crypto operations (`crypto.pbkdf2`, etc.)</li>
              <li>Zlib compression</li>
            </ul>
            <div className="mt-3 p-3 bg-gray-900 rounded border border-gray-700">
              <code className="text-xs text-green-400">process.env.UV_THREADPOOL_SIZE = os.cpus().length;</code>
            </div>
          </div>
        </div>

        <div className="bg-yellow-900/20 p-6 rounded-xl border border-yellow-700/50 mb-6">
          <h4 className="font-bold text-yellow-400 mb-3">⚡ Advanced: Blocking the Event Loop</h4>
          <CodeBlock language="javascript" title="Don't do this!" code={`// ❌ JSON.parse on large data blocks the loop
app.post('/data', (req, res) => {
  const largeData = fs.readFileSync('huge.json'); // Blocks Libuv thread
  const json = JSON.parse(largeData); // Blocks V8 main thread!
  res.send('Done');
});

// ✅ Use Streams or Worker Threads
const { Worker } = require('worker_threads');
// Offload CPU intensive parsing to a worker`} />
        </div>
      </section>

      {/* Section 2: Async Patterns */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-orange-600 text-sm px-3 py-1 rounded-full">02</span>
          Async Patterns & Promises
        </h2>
        
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Promise Concurrency Control</h3>
            <p className="text-sm mb-4 text-gray-400">
              Running `Promise.all` on 1000 items will launch 1000 requests simultaneously, potentially crashing your DB or API. Use a concurrency limiter.
            </p>
            <CodeBlock language="javascript" title="p-limit pattern" code={`import pLimit from 'p-limit';

const limit = pLimit(5); // Max 5 concurrent promises

const input = [/* 1000 items */];

const tasks = input.map(item => {
  return limit(() => processItem(item));
});

await Promise.all(tasks);`} />
          </div>
        </div>
      </section>

      {/* Section 3: Express Middleware */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">03</span>
          Express.js Middleware Chain
        </h2>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Request Flow Through Middleware</h3>
          <InteractiveDiagram 
            initialNodes={middlewareNodes} 
            initialEdges={middlewareEdges} 
            title="Middleware Execution Order"
            height="600px"
          />
        </div>
      </section>

      {/* Section 4: Streams & Buffers */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">04</span>
          Streams & Backpressure
        </h2>
        <p className="mb-6">
          Handling backpressure is crucial. If the readable stream is faster than the writable stream, memory usage will spike until the process crashes.
        </p>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mt-6">
          <h3 className="text-xl font-semibold text-white mb-4">Manual Backpressure Handling</h3>
          <CodeBlock language="javascript" title="Under the hood of pipe()" code={`const fs = require('fs');
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.on('data', (chunk) => {
  // write() returns false if internal buffer is full
  const canContinue = writeStream.write(chunk);
  
  if (!canContinue) {
    // Stop reading! Backpressure detected.
    readStream.pause();
    
    // Resume when buffer drains
    writeStream.once('drain', () => {
      readStream.resume();
    });
  }
});`} />
        </div>
      </section>

      {/* Section 5: Performance & Clustering */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-teal-600 text-sm px-3 py-1 rounded-full">05</span>
          Performance & Clustering
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="font-semibold text-white mb-3">Zero-Downtime Reloads (PM2)</h3>
            <CodeBlock language="bash" title="PM2 Commands" code={`# Start in cluster mode
pm2 start app.js -i max

# Reload without dropping connections
# PM2 sends SIGINT to old worker, waits, then kills
pm2 reload app

# Monitor memory/cpu
pm2 monit`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="font-semibold text-white mb-3">Memory Leak Debugging</h3>
            <CodeBlock language="javascript" title="Heap Snapshot" code={`const v8 = require('v8');

// Route to trigger snapshot
app.get('/debug/heap', (req, res) => {
  const stream = v8.getHeapSnapshot();
  stream.pipe(res);
});

// Analyze .heapsnapshot in Chrome DevTools`} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default NodeJSDocs;
