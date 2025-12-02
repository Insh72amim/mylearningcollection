import React from "react";
import { MarkerType } from "reactflow";
import InteractiveDiagram from "../common/InteractiveDiagram";
import CodeBlock from "../common/CodeBlock";

const ReduxDocs = () => {
  const flowNodes = [
    {
      id: "component",
      position: { x: 40, y: 160 },
      data: { label: "React Component" },
      style: {
        width: 170,
        background: "#1f2937",
        color: "white",
        border: "1px solid #374151",
      },
    },
    {
      id: "dispatch",
      position: { x: 240, y: 60 },
      data: { label: "dispatch(action)" },
      style: {
        width: 160,
        background: "#7c3aed",
        color: "white",
        border: "1px solid #a855f7",
      },
    },
    {
      id: "middleware",
      position: { x: 240, y: 220 },
      data: { label: "Middleware" },
      style: {
        width: 160,
        background: "#312e81",
        color: "white",
        border: "1px solid #6366f1",
      },
    },
    {
      id: "reducer",
      position: { x: 450, y: 140 },
      data: { label: "Reducer" },
      style: {
        width: 150,
        background: "#065f46",
        color: "white",
        border: "1px solid #34d399",
      },
    },
    {
      id: "store",
      position: { x: 640, y: 140 },
      data: { label: "Store State" },
      style: {
        width: 160,
        background: "#78350f",
        color: "white",
        border: "1px solid #f59e0b",
      },
    },
    {
      id: "selector",
      position: { x: 450, y: 260 },
      data: { label: "Selectors" },
      style: {
        width: 150,
        background: "#0f172a",
        color: "white",
        border: "1px solid #94a3b8",
      },
    },
  ];

  const flowEdges = [
    {
      id: "r1",
      source: "component",
      target: "dispatch",
      label: "UI event",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#a855f7" },
    },
    {
      id: "r2",
      source: "component",
      target: "middleware",
      label: "thunk",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#6366f1" },
    },
    {
      id: "r3",
      source: "dispatch",
      target: "reducer",
      label: "plain action",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#34d399" },
    },
    {
      id: "r4",
      source: "middleware",
      target: "dispatch",
      label: "async",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#6366f1", strokeDasharray: "6 4" },
    },
    {
      id: "r5",
      source: "reducer",
      target: "store",
      label: "next state",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#f59e0b" },
    },
    {
      id: "r6",
      source: "store",
      target: "selector",
      label: "subscribe",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#94a3b8" },
    },
    {
      id: "r7",
      source: "selector",
      target: "component",
      label: "derived props",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#94a3b8", strokeDasharray: "4 4" },
    },
  ];

  return (
    <div className="max-w-4xl text-gray-300 space-y-12">
      <header className="border-b border-gray-700 pb-6">
        <h1 className="text-4xl font-bold text-white mb-3">Redux Toolkit</h1>
        <p className="text-lg text-gray-400">
          Redux centralizes application state with predictable pure reducers.
          The modern Toolkit API removes boilerplate via slices, Immer-based
          mutability, and built-in middleware for async jobs.
        </p>
      </header>

      <section>
        <h2 className="text-3xl font-semibold text-pink-300 mb-4">Data Flow</h2>
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <p className="mb-4">
              Components dispatch plain objects. Middleware such as thunks or
              sagas intercept actions to run async effects before forwarding
              them to reducers. Selectors derive memoized data from the store to
              keep components lean.
            </p>
            <ul className="text-sm space-y-2">
              <li>
                Use RTK Query for data fetching, caching, and invalidation.
              </li>
              <li>
                Derive UI state via `createSelector` to prevent recompute.
              </li>
              <li>
                Persist critical slices using storage middleware (localStorage).
              </li>
            </ul>
          </div>
          <InteractiveDiagram
            initialNodes={flowNodes}
            initialEdges={flowEdges}
            title="Redux Unidirectional Flow"
            height="340px"
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-pink-300 mb-4">
          Slice Example
        </h2>
        <CodeBlock
          language="typescript"
          title="features/todos/todoSlice.ts"
          code={`import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  const res = await fetch('/api/todos');
  if (!res.ok) throw new Error('Failed');
  return res.json();
});

const slice = createSlice({
  name: 'todos',
  initialState: { items: [], status: 'idle' },
  reducers: {
    toggled(state, action) {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { toggled } = slice.actions;
export const selectTodos = (state: RootState) => state.todos.items;
export default slice.reducer;`}
        />
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-pink-300 mb-4">
          Integration Tips
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2 text-sm">
              Store Setup
            </h3>
            <ul className="text-xs space-y-1">
              <li>
                Use `configureStore` to auto-enable Redux DevTools + middleware.
              </li>
              <li>Co-locate slices near features for modularity.</li>
              <li>
                Reset state on logout by intercepting a `user/logout` action.
              </li>
            </ul>
          </div>
          <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2 text-sm">
              Performance
            </h3>
            <ul className="text-xs space-y-1">
              <li>
                Wrap heavy child trees with `React.memo` and feed them
                selectors.
              </li>
              <li>
                Split slices into multiple files if reducers exceed ~300 lines.
              </li>
              <li>Use the `useSelector` equalityFn to avoid rerenders.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReduxDocs;
