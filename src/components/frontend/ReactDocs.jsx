import React from "react";
import { MarkerType } from "reactflow";
import InteractiveDiagram from "../common/InteractiveDiagram";
import CodeBlock from "../common/CodeBlock";

const ReactDocs = () => {
  const componentNodes = [
    {
      id: "app",
      position: { x: 40, y: 140 },
      data: { label: "App" },
      style: {
        width: 120,
        background: "#1f2937",
        color: "white",
        border: "1px solid #374151",
      },
    },
    {
      id: "layout",
      position: { x: 200, y: 40 },
      data: { label: "Layout" },
      style: {
        width: 130,
        background: "#7c3aed",
        color: "white",
        border: "1px solid #a855f7",
      },
    },
    {
      id: "nav",
      position: { x: 380, y: 40 },
      data: { label: "Nav" },
      style: {
        width: 110,
        background: "#312e81",
        color: "white",
        border: "1px solid #6366f1",
      },
    },
    {
      id: "content",
      position: { x: 200, y: 220 },
      data: { label: "Content" },
      style: {
        width: 130,
        background: "#1e3a8a",
        color: "white",
        border: "1px solid #3b82f6",
      },
    },
    {
      id: "list",
      position: { x: 380, y: 220 },
      data: { label: "List" },
      style: {
        width: 110,
        background: "#065f46",
        color: "white",
        border: "1px solid #34d399",
      },
    },
    {
      id: "item",
      position: { x: 540, y: 220 },
      data: { label: "Card" },
      style: {
        width: 110,
        background: "#78350f",
        color: "white",
        border: "1px solid #f59e0b",
      },
    },
    {
      id: "hook",
      position: { x: 540, y: 80 },
      data: { label: "usePosts()" },
      style: {
        width: 140,
        background: "#0f172a",
        color: "white",
        border: "1px solid #94a3b8",
        fontSize: 12,
      },
    },
  ];

  const componentEdges = [
    {
      id: "c1",
      source: "app",
      target: "layout",
      label: "props",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#a855f7" },
    },
    {
      id: "c2",
      source: "layout",
      target: "nav",
      label: "children",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#6366f1" },
    },
    {
      id: "c3",
      source: "layout",
      target: "content",
      label: "outlet",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#3b82f6" },
    },
    {
      id: "c4",
      source: "content",
      target: "list",
      label: "props",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#34d399" },
    },
    {
      id: "c5",
      source: "list",
      target: "item",
      label: "map",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#f59e0b" },
    },
    {
      id: "c6",
      source: "hook",
      target: "list",
      label: "data",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#94a3b8", strokeDasharray: "6 4" },
    },
  ];

  return (
    <div className="max-w-4xl text-gray-300 space-y-12">
      <header className="border-b border-gray-700 pb-6">
        <h1 className="text-4xl font-bold text-white mb-3">
          React Fundamentals
        </h1>
        <p className="text-lg text-gray-400">
          React builds UI using declarative components, one-way data flow, and a
          virtual DOM diffing engine. Hooks expose state, side effects, and
          context composition without classes.
        </p>
      </header>

      <section>
        <h2 className="text-3xl font-semibold text-pink-300 mb-4">
          Component Tree
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <p className="mb-4">
              Components compose like functions. Props flow top → down, while
              events bubble up. Hooks such as `useState`, `useReducer`, and
              `useContext` share data without prop drilling.
            </p>
            <ul className="text-sm space-y-2">
              <li>
                Keep components pure; render derives solely from props + state.
              </li>
              <li>
                Colocate state with components that own it; lift only when
                needed.
              </li>
              <li>
                Custom hooks encapsulate fetching, caching, and subscriptions.
              </li>
            </ul>
          </div>
          <InteractiveDiagram
            initialNodes={componentNodes}
            initialEdges={componentEdges}
            title="Component Composition"
            height="320px"
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-pink-300 mb-4">
          Hooks Pattern
        </h2>
        <CodeBlock
          language="jsx"
          title="usePosts.js"
          code={`import { useEffect, useState } from 'react';

export function usePosts(teamId) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!teamId) return;
    let ignore = false;
    setStatus('loading');

    fetch(
      \`/api/teams/\${teamId}/posts?limit=10\`
    )
      .then((res) => res.json())
      .then((json) => {
        if (!ignore) {
          setData(json.items);
          setStatus('success');
        }
      })
      .catch(() => !ignore && setStatus('error'));

    return () => {
      ignore = true;
    };
  }, [teamId]);

  return { data, status };
}`}
        />
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-pink-300 mb-4">
          Rendering Checklist
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Memoize expensive trees with React.memo or useMemo().",
            "Split code using dynamic import() + Suspense.",
            "Use React DevTools Profiler to spot wasted renders.",
            "Prefer controlled inputs for predictable state.",
            "Handle error boundaries around async components.",
            "Use keys when rendering lists to help reconciliation.",
          ].map((tip, idx) => (
            <div
              key={idx}
              className="bg-gray-800/60 border border-gray-700 rounded-lg p-4 text-sm">
              {tip}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReactDocs;
