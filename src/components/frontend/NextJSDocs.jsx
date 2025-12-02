import React from "react";
import { MarkerType } from "reactflow";
import InteractiveDiagram from "../common/InteractiveDiagram";
import CodeBlock from "../common/CodeBlock";

const NextJSDocs = () => {
  const renderingNodes = [
    {
      id: "request",
      position: { x: 30, y: 140 },
      data: { label: "Incoming Request" },
      style: {
        width: 170,
        background: "#1f2937",
        color: "white",
        border: "1px solid #374151",
      },
    },
    {
      id: "routing",
      position: { x: 230, y: 60 },
      data: { label: "App Router" },
      style: {
        width: 160,
        background: "#7c3aed",
        color: "white",
        border: "1px solid #a855f7",
      },
    },
    {
      id: "layout",
      position: { x: 430, y: 60 },
      data: { label: "Server Components" },
      style: {
        width: 180,
        background: "#312e81",
        color: "white",
        border: "1px solid #6366f1",
      },
    },
    {
      id: "stream",
      position: { x: 630, y: 60 },
      data: { label: "Flight Stream" },
      style: {
        width: 150,
        background: "#065f46",
        color: "white",
        border: "1px solid #34d399",
      },
    },
    {
      id: "client",
      position: { x: 430, y: 220 },
      data: { label: "Client Components" },
      style: {
        width: 180,
        background: "#b45309",
        color: "white",
        border: "1px solid #f59e0b",
      },
    },
    {
      id: "browser",
      position: { x: 630, y: 220 },
      data: { label: "Hydrated UI" },
      style: {
        width: 160,
        background: "#0f172a",
        color: "white",
        border: "1px solid #94a3b8",
      },
    },
  ];

  const renderingEdges = [
    {
      id: "n1",
      source: "request",
      target: "routing",
      label: "segment match",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#a855f7" },
    },
    {
      id: "n2",
      source: "routing",
      target: "layout",
      label: "load RSC",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#6366f1" },
    },
    {
      id: "n3",
      source: "layout",
      target: "stream",
      label: "serialize tree",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#34d399" },
    },
    {
      id: "n4",
      source: "layout",
      target: "client",
      label: "props",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#f59e0b" },
    },
    {
      id: "n5",
      source: "client",
      target: "browser",
      label: "hydrate",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#94a3b8" },
    },
    {
      id: "n6",
      source: "stream",
      target: "browser",
      label: "progressive HTML",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#34d399", strokeDasharray: "6 4" },
    },
  ];

  return (
    <div className="max-w-4xl text-gray-300 space-y-12">
      <header className="border-b border-gray-700 pb-6">
        <h1 className="text-4xl font-bold text-white mb-3">
          Next.js in Practice
        </h1>
        <p className="text-lg text-gray-400">
          Next.js blends server rendering, static generation, and edge delivery.
          The App Router unlocks React Server Components, nested layouts, and
          streaming responses for near-instant interactivity.
        </p>
      </header>

      <section>
        <h2 className="text-3xl font-semibold text-pink-300 mb-4">
          Rendering Pipeline
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <p className="mb-4">
              Requests are matched to route segments that load server and client
              components. Server components execute on the server, fetch data,
              and stream serialized payloads to the browser, which hydrates any
              interleaved client components.
            </p>
            <ul className="text-sm space-y-2">
              <li>
                Place data fetching inside server components to keep bundles
                tiny.
              </li>
              <li>
                Use `loading.js` and `error.js` at route level for suspense
                boundaries.
              </li>
              <li>
                Leverage `headers()` + `cookies()` for per-request
                personalization.
              </li>
            </ul>
          </div>
          <InteractiveDiagram
            initialNodes={renderingNodes}
            initialEdges={renderingEdges}
            title="App Router Flow"
            height="340px"
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-pink-300 mb-4">
          Route Example
        </h2>
        <CodeBlock
          language="tsx"
          title="app/dashboard/page.tsx"
          code={`import { Suspense } from 'react';
import { getMetrics } from '@/lib/data';
import { Charts } from './Charts'; // client component

export const revalidate = 30; // ISR

export default async function DashboardPage() {
  const metrics = await getMetrics();

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Team Metrics</h1>
        <p className="text-gray-400">Updated every 30 seconds via ISR.</p>
      </header>

      <Suspense fallback={<p>Loading charts…</p>}>
        <Charts data={metrics} />
      </Suspense>
    </section>
  );
}`}
        />
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-pink-300 mb-4">
          Deployment Notes
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2 text-sm">Caching</h3>
            <ul className="text-xs space-y-1">
              <li>
                `fetch()` defaults to full-cache; override with `cache:
                'no-store'`.
              </li>
              <li>Static routes auto-optimize to Edge + CDN.</li>
              <li>Use Route Handlers for custom HTTP caching headers.</li>
            </ul>
          </div>
          <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2 text-sm">
              Observability
            </h3>
            <ul className="text-xs space-y-1">
              <li>Log via `next/headers` `requestAsyncStorage`.</li>
              <li>Use `instrumentation.ts` for tracing initialization.</li>
              <li>Measure Route Handlers with Web Vitals events.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NextJSDocs;
