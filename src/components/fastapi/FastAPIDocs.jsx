import React from 'react';
import { MarkerType } from 'reactflow';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';
import { Server, Zap, Box, Shield, Database, Globe, Layers, Cpu } from 'lucide-react';

const FastAPIDocs = () => {
  // 1. ASGI Architecture Diagram
  const asgiNodes = [
    { id: 'client', position: { x: 0, y: 200 }, type: 'custom', data: { label: 'Client', icon: 'globe', gradient: 'from-gray-700 to-gray-900', details: 'Browser / Mobile App' } },
    { id: 'asgi', position: { x: 250, y: 200 }, type: 'custom', data: { label: 'ASGI Server', subLabel: 'Uvicorn / Hypercorn', icon: 'zap', gradient: 'from-purple-600 to-purple-800', details: 'Manages socket connections & protocol parsing' } },
    { id: 'starlette', position: { x: 550, y: 200 }, type: 'custom', data: { label: 'Starlette', subLabel: 'Toolkit', icon: 'layers', gradient: 'from-pink-600 to-pink-800', details: 'Routing, Middleware, WebSockets' } },
    { id: 'fastapi', position: { x: 800, y: 200 }, type: 'custom', data: { label: 'FastAPI', subLabel: 'Framework', icon: 'box', gradient: 'from-teal-600 to-teal-800', details: 'Dependency Injection, Pydantic Validation' } },
    { id: 'app', position: { x: 1050, y: 200 }, type: 'custom', data: { label: 'Path Operation', subLabel: 'Your Code', icon: 'code', gradient: 'from-blue-600 to-blue-800', details: 'async def read_users()...' } },
  ];

  const asgiEdges = [
    { id: 'e1', source: 'client', target: 'asgi', animated: true, label: 'HTTP/WS', style: { stroke: '#9ca3af' } },
    { id: 'e2', source: 'asgi', target: 'starlette', animated: true, label: 'Scope', style: { stroke: '#a855f7' } },
    { id: 'e3', source: 'starlette', target: 'fastapi', animated: true, style: { stroke: '#ec4899' } },
    { id: 'e4', source: 'fastapi', target: 'app', animated: true, style: { stroke: '#14b8a6' } },
  ];

  // 2. Pydantic Validation Flow
  const validationNodes = [
    { id: 'json', position: { x: 0, y: 150 }, type: 'custom', data: { label: 'Raw JSON', icon: 'file', gradient: 'from-gray-700 to-gray-900', details: '{"age": "25"}' } },
    { id: 'rust', position: { x: 250, y: 150 }, type: 'custom', data: { label: 'Pydantic Core', subLabel: 'Rust Engine', icon: 'cpu', gradient: 'from-red-700 to-red-900', details: 'High-performance parsing & validation' } },
    { id: 'model', position: { x: 550, y: 50 }, type: 'custom', data: { label: 'Python Model', subLabel: 'Success', icon: 'check', gradient: 'from-green-600 to-green-800', details: 'age: int = 25' } },
    { id: 'error', position: { x: 550, y: 250 }, type: 'custom', data: { label: 'ValidationError', subLabel: 'Failure', icon: 'alert-triangle', gradient: 'from-red-600 to-red-800', details: '422 Unprocessable Entity' } },
  ];

  const validationEdges = [
    { id: 'v1', source: 'json', target: 'rust', animated: true, label: 'Parse', style: { stroke: '#9ca3af' } },
    { id: 'v2', source: 'rust', target: 'model', label: 'Valid', style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'v3', source: 'rust', target: 'error', label: 'Invalid', style: { stroke: '#dc2626' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  // 3. Dependency Injection Tree
  const diNodes = [
    { id: 'route', position: { x: 300, y: 0 }, type: 'custom', data: { label: 'Route Handler', icon: 'code', gradient: 'from-blue-600 to-blue-800' } },
    { id: 'service', position: { x: 300, y: 150 }, type: 'custom', data: { label: 'Service Logic', subLabel: 'Depends()', icon: 'settings', gradient: 'from-teal-600 to-teal-800' } },
    { id: 'db', position: { x: 100, y: 300 }, type: 'custom', data: { label: 'DB Session', subLabel: 'Depends()', icon: 'database', gradient: 'from-orange-600 to-orange-800', details: 'Yields session, closes after request' } },
    { id: 'auth', position: { x: 500, y: 300 }, type: 'custom', data: { label: 'Current User', subLabel: 'Depends()', icon: 'lock', gradient: 'from-pink-600 to-pink-800', details: 'Validates JWT token' } },
  ];

  const diEdges = [
    { id: 'd1', source: 'route', target: 'service', animated: true, style: { stroke: '#9ca3af' } },
    { id: 'd2', source: 'service', target: 'db', animated: true, style: { stroke: '#f97316' } },
    { id: 'd3', source: 'service', target: 'auth', animated: true, style: { stroke: '#ec4899' } },
  ];

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">FastAPI Internals & Performance</h1>
        <p className="text-xl text-gray-400">
          Understanding ASGI, Pydantic v2 (Rust), and the Dependency Injection system.
        </p>
      </div>

      {/* Section 1: ASGI & Architecture */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">01</span>
          ASGI & Starlette
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          FastAPI is a wrapper around <strong>Starlette</strong>. It adds data validation (Pydantic) and dependency injection. The underlying server (Uvicorn) speaks <strong>ASGI</strong>, the standard for async Python web servers.
        </p>
        
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Request Lifecycle</h3>
          <InteractiveDiagram 
            initialNodes={asgiNodes} 
            initialEdges={asgiEdges} 
            title="FastAPI Architecture"
            height="400px"
          />
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Middleware Internals</h3>
          <p className="text-sm mb-4 text-gray-400">
            Middleware wraps the entire application. It intercepts the ASGI `scope`, `receive`, and `send` callables.
          </p>
          <CodeBlock language="python" title="Custom ASGI Middleware" code={`import time
from starlette.types import ASGIApp, Scope, Receive, Send

class TimingMiddleware:
    def __init__(self, app: ASGIApp):
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send):
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        start_time = time.time()
        
        async def send_wrapper(message):
            if message["type"] == "http.response.start":
                process_time = time.time() - start_time
                # Add custom header
                headers = MutableHeaders(scope=message)
                headers["X-Process-Time"] = str(process_time)
            await send(message)

        await self.app(scope, receive, send_wrapper)`} />
        </div>
      </section>

      {/* Section 2: Pydantic v2 (Rust) */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-sm px-3 py-1 rounded-full">02</span>
          Pydantic v2 & Validation
        </h2>
        <p className="mb-6">
          Pydantic v2 is rewritten in <strong>Rust</strong> (pydantic-core), offering 5-50x performance improvements over v1. It handles parsing, validation, and serialization.
        </p>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Validation Flow</h3>
          <InteractiveDiagram 
            initialNodes={validationNodes} 
            initialEdges={validationEdges} 
            title="Pydantic Core Execution"
            height="400px"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="font-semibold text-white mb-3">Model Config (v2)</h3>
            <CodeBlock language="python" title="Strict Mode" code={`from pydantic import BaseModel, ConfigDict

class User(BaseModel):
    model_config = ConfigDict(strict=True)
    
    id: int
    name: str

# User(id="123", name="Bob") 
# ❌ ValidationError: Input should be a valid integer`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="font-semibold text-white mb-3">Computed Fields</h3>
            <CodeBlock language="python" title="@computed_field" code={`from pydantic import computed_field

class Rectangle(BaseModel):
    width: int
    height: int

    @computed_field
    @property
    def area(self) -> int:
        return self.width * self.height`} />
          </div>
        </div>
      </section>

      {/* Section 3: Advanced Dependency Injection */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">03</span>
          Advanced Dependency Injection
        </h2>
        
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Dependency Graph Resolution</h3>
          <InteractiveDiagram 
            initialNodes={diNodes} 
            initialEdges={diEdges} 
            title="Topological Sort of Dependencies"
            height="500px"
          />
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Class-Based Dependencies</h3>
          <p className="text-sm mb-4 text-gray-400">
            Dependencies can be classes. `__init__` defines sub-dependencies, and `__call__` makes the instance callable.
          </p>
          <CodeBlock language="python" title="Reusable Query Parser" code={`class CommonQueryParams:
    def __init__(
        self, 
        q: str | None = None, 
        skip: int = 0, 
        limit: int = 100
    ):
        self.q = q
        self.skip = skip
        self.limit = limit

@app.get("/items/")
async def read_items(commons: CommonQueryParams = Depends()):
    response = {}
    if commons.q:
        response.update({"q": commons.q})
    items = fake_items_db[commons.skip : commons.skip + commons.limit]
    response.update({"items": items})
    return response`} />
        </div>
      </section>

      {/* Section 4: Performance Optimization */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-teal-600 text-sm px-3 py-1 rounded-full">04</span>
          Performance Optimization
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="font-semibold text-white mb-3">JSON Serialization</h3>
            <p className="text-sm mb-3 text-gray-400">
              Standard `json` is slow. Use `orjson` for massive speedups.
            </p>
            <CodeBlock language="python" title="ORJSONResponse" code={`from fastapi.responses import ORJSONResponse

@app.get("/items/", response_class=ORJSONResponse)
async def read_items():
    return [{"id": "foo", "val": "bar"}]`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="font-semibold text-white mb-3">Profiling</h3>
            <CodeBlock language="bash" title="PyInstrument" code={`pip install pyinstrument

# Middleware
from pyinstrument import Profiler
from fastapi import Request

@app.middleware("http")
async def profile_request(request: Request, call_next):
    profiler = Profiler(interval=0.001, async_mode="enabled")
    profiler.start()
    await call_next(request)
    profiler.stop()
    profiler.print()
    return response`} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FastAPIDocs;
