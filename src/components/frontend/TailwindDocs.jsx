import React from "react";
import { MarkerType } from "reactflow";
import InteractiveDiagram from "../common/InteractiveDiagram";
import CodeBlock from "../common/CodeBlock";

const TailwindDocs = () => {
  const workflowNodes = [
    {
      id: "design",
      position: { x: 60, y: 150 },
      data: { label: "Design Tokens" },
      style: {
        width: 150,
        background: "#1f2937",
        color: "white",
        border: "1px solid #374151",
      },
    },
    {
      id: "config",
      position: { x: 240, y: 70 },
      data: { label: "tailwind.config.js" },
      style: {
        width: 180,
        background: "#7c3aed",
        color: "white",
        border: "1px solid #a855f7",
      },
    },
    {
      id: "content",
      position: { x: 240, y: 230 },
      data: { label: "content paths" },
      style: {
        width: 160,
        background: "#065f46",
        color: "white",
        border: "1px solid #34d399",
      },
    },
    {
      id: "jit",
      position: { x: 450, y: 150 },
      data: { label: "JIT Compiler" },
      style: {
        width: 160,
        background: "#312e81",
        color: "white",
        border: "1px solid #6366f1",
      },
    },
    {
      id: "css",
      position: { x: 640, y: 150 },
      data: { label: "Generated CSS" },
      style: {
        width: 170,
        background: "#78350f",
        color: "white",
        border: "1px solid #f59e0b",
      },
    },
    {
      id: "ui",
      position: { x: 820, y: 150 },
      data: { label: "Component" },
      style: {
        width: 140,
        background: "#0f172a",
        color: "white",
        border: "1px solid #94a3b8",
      },
    },
  ];

  const workflowEdges = [
    {
      id: "t1",
      source: "design",
      target: "config",
      label: "theme.extend",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#a855f7" },
    },
    {
      id: "t2",
      source: "design",
      target: "content",
      label: "scan glob",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#34d399" },
    },
    {
      id: "t3",
      source: "config",
      target: "jit",
      label: "presets",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#6366f1" },
    },
    {
      id: "t4",
      source: "content",
      target: "jit",
      label: "utility usage",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#10b981" },
    },
    {
      id: "t5",
      source: "jit",
      target: "css",
      label: "purged CSS",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#f59e0b" },
    },
    {
      id: "t6",
      source: "css",
      target: "ui",
      label: "apply classes",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#94a3b8" },
    },
  ];

  return (
    <div className="max-w-4xl text-gray-300 space-y-12">
      <header className="border-b border-gray-700 pb-6">
        <h1 className="text-4xl font-bold text-white mb-3">
          Tailwind CSS Workflow
        </h1>
        <p className="text-lg text-gray-400">
          Tailwind provides low-level utility classes compiled on-demand. Its
          JIT engine scans your templates, emits only the classes you use, and
          keeps design tokens centralized inside configuration.
        </p>
      </header>

      <section>
        <h2 className="text-3xl font-semibold text-pink-300 mb-4">
          Build Pipeline
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <p className="mb-4">
              Customize `tailwind.config.js` with theme tokens, plugins, and
              custom utilities. When the dev server runs, Tailwind watches your
              `content` globs and adds utilities to the compiled CSS instantly.
            </p>
            <ul className="text-sm space-y-2">
              <li>
                Keep tokens (colors, spacing, fonts) under `theme.extend`.
              </li>
              <li>Use `@layer components` for semantic abstractions.</li>
              <li>Enable dark mode via `media` or `class` strategy.</li>
            </ul>
          </div>
          <InteractiveDiagram
            initialNodes={workflowNodes}
            initialEdges={workflowEdges}
            title="Tailwind JIT Flow"
            height="340px"
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-pink-300 mb-4">
          Config Example
        </h2>
        <CodeBlock
          language="javascript"
          title="tailwind.config.js"
          code={`const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          50: '#fff7f9',
          500: '#ec4899',
          600: '#db2777',
        },
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};`}
        />
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-pink-300 mb-4">
          Utility Patterns
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2 text-sm">
              Composition
            </h3>
            <ul className="text-xs space-y-1">
              <li>Group classes using `@apply` for shared layouts.</li>
              <li>Extract components in React and use props for variants.</li>
              <li>
                Organize responsive tweaks with `sm:`, `lg:`, `dark:` prefixes.
              </li>
            </ul>
          </div>
          <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2 text-sm">
              Performance
            </h3>
            <ul className="text-xs space-y-1">
              <li>
                Rely on `content` globs to purge unused utilities in prod
                builds.
              </li>
              <li>
                Use `@tailwindcss/container-queries` for adaptive layouts.
              </li>
              <li>
                Keep CSS file small (&lt;30KB) thanks to per-class generation.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TailwindDocs;
