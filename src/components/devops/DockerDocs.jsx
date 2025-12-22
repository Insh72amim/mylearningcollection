import React from "react";
import { MarkerType } from "reactflow";
import InteractiveDiagram from "../common/InteractiveDiagram";
import CodeBlock from '../common/CodeBlock';
import DockerLayerVisualizer from './DockerLayerVisualizer';

const DockerDocs = () => {
  const architectureNodes = [
    {
      id: "cli",
      position: { x: 60, y: 150 },
      data: { label: "Docker CLI" },
      style: {
        width: 140,
        background: "#1f2937",
        color: "white",
        border: "1px solid #374151",
      },
    },
    {
      id: "daemon",
      position: { x: 260, y: 150 },
      data: { label: "dockerd" },
      style: {
        width: 150,
        background: "#7c3aed",
        color: "white",
        border: "1px solid #a855f7",
      },
    },
    {
      id: "container",
      position: { x: 470, y: 60 },
      data: { label: "Containers" },
      style: {
        width: 160,
        background: "#064e3b",
        color: "white",
        border: "1px solid #10b981",
      },
    },
    {
      id: "runtime",
      position: { x: 470, y: 220 },
      data: { label: "Container Runtime" },
      style: {
        width: 170,
        background: "#1e3a8a",
        color: "white",
        border: "1px solid #3b82f6",
      },
    },
    {
      id: "registry",
      position: { x: 680, y: 150 },
      data: { label: "Image Registry" },
      style: {
        width: 160,
        background: "#78350f",
        color: "white",
        border: "1px solid #f59e0b",
      },
    },
  ];

  const architectureEdges = [
    {
      id: "e1",
      source: "cli",
      target: "daemon",
      label: "REST API",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#a855f7" },
    },
    {
      id: "e2",
      source: "daemon",
      target: "container",
      label: "Create / Start",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#10b981" },
    },
    {
      id: "e3",
      source: "daemon",
      target: "runtime",
      label: "runC / containerd",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#3b82f6" },
    },
    {
      id: "e4",
      source: "daemon",
      target: "registry",
      label: "push / pull",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#f59e0b" },
    },
    {
      id: "e5",
      source: "registry",
      target: "daemon",
      label: "layers",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#f59e0b", strokeDasharray: "6 4" },
    },
  ];

  const lifecycleNodes = [
    {
      id: "dockerfile",
      position: { x: 40, y: 120 },
      data: { label: "Dockerfile" },
      style: {
        width: 150,
        background: "#1f2937",
        color: "white",
        border: "1px solid #374151",
      },
    },
    {
      id: "build",
      position: { x: 230, y: 40 },
      data: { label: "docker build" },
      style: {
        width: 160,
        background: "#7c3aed",
        color: "white",
        border: "1px solid #a855f7",
      },
    },
    {
      id: "image",
      position: { x: 430, y: 120 },
      data: { label: "Image Layers" },
      style: {
        width: 150,
        background: "#064e3b",
        color: "white",
        border: "1px solid #10b981",
      },
    },
    {
      id: "registry2",
      position: { x: 230, y: 220 },
      data: { label: "docker push" },
      style: {
        width: 160,
        background: "#78350f",
        color: "white",
        border: "1px solid #f59e0b",
      },
    },
    {
      id: "run",
      position: { x: 620, y: 120 },
      data: { label: "docker run" },
      style: {
        width: 150,
        background: "#1e3a8a",
        color: "white",
        border: "1px solid #3b82f6",
      },
    },
  ];

  const lifecycleEdges = [
    {
      id: "l1",
      source: "dockerfile",
      target: "build",
      label: "instructions",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#a855f7" },
    },
    {
      id: "l2",
      source: "build",
      target: "image",
      label: "layers",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#10b981" },
    },
    {
      id: "l3",
      source: "image",
      target: "registry2",
      label: "push",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#f59e0b" },
    },
    {
      id: "l4",
      source: "registry2",
      target: "run",
      label: "pull",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#f59e0b", strokeDasharray: "4 4" },
    },
    {
      id: "l5",
      source: "run",
      target: "image",
      label: "copy-on-write",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#3b82f6", strokeDasharray: "6 4" },
    },
  ];

  return (
    <div className="max-w-4xl text-gray-300 space-y-12">
      <header className="border-b border-gray-700 pb-6">
        <h1 className="text-4xl font-bold text-white mb-3">
          Docker Essentials
        </h1>
        <p className="text-lg text-gray-400">
          Build, ship, and run applications as lightweight containers. Docker
          standardizes packaging by combining file system layers with runtime
          metadata, enabling reproducible deployments everywhere.
        </p>
      </header>

      <section>
        <h2 className="text-3xl font-semibold text-blue-400 mb-4">
          Platform Components
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <p className="mb-4">
              The Docker client talks to the daemon via a REST API. The daemon
              coordinates low-level runtimes (containerd/runC) to create
              isolated processes based on OCI images pulled from registries such
              as Docker Hub or ECR.
            </p>
            <ul className="space-y-2 text-sm">
              <li>CLI issues commands like build, push, run.</li>
              <li>
                Daemon manages images, networks, volumes, and container state.
              </li>
              <li>Registries store layered images addressable via tags.</li>
            </ul>
          </div>
          <InteractiveDiagram
            initialNodes={architectureNodes}
            initialEdges={architectureEdges}
            title="Docker Control Plane"
            height="360px"
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-blue-400 mb-4">
          Image Lifecycle
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <p className="mb-4">
              Dockerfiles describe how to assemble images layer-by-layer. Build
              cache and multi-stage patterns keep artifacts slim. Once pushed to
              a registry, images are immutable and can be safely promoted across
              environments.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2 text-sm">
                  Layering Principles
                </h3>
                <ul className="text-xs space-y-1">
                  <li>
                    Order matters—changes invalidate cache for following steps.
                  </li>
                  <li>Use `.dockerignore` to avoid copying build artifacts.</li>
                  <li>
                    Prefer multi-stage builds for compiling + runtime split.
                  </li>
                </ul>
              </div>
              <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2 text-sm">
                  Runtime Tips
                </h3>
                <ul className="text-xs space-y-1">
                  <li>Pin base image digests for deterministic deploys.</li>
                  <li>Use healthchecks plus `--restart` policies.</li>
                  <li>Mount volumes for mutable data.</li>
                </ul>
              </div>
            </div>
          </div>
          <InteractiveDiagram
            initialNodes={lifecycleNodes}
            initialEdges={lifecycleEdges}
            title="Build → Ship → Run"
            height="320px"
          />

          <div className="mt-8 bg-gray-800 p-8 rounded-2xl border border-gray-700">
             <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Interactive Layer Explorer</h3>
                  <p className="text-sm text-gray-400 mt-1">Witness the "Copy-on-Write" mechanism and layer caching in action.</p>
                </div>
                <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Stack Simulator</span>
                </div>
             </div>
             <DockerLayerVisualizer />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-blue-400 mb-4">
          Sample Dockerfile
        </h2>
        <CodeBlock
          language="dockerfile"
          title="Dockerfile"
          code={`# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build

# Runtime stage
FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
COPY --from=build /app/dist ./dist
ENV NODE_ENV=production
USER nonroot
CMD ["node", "dist/server.js"]`}
        />
      </section>
    </div>
  );
};

export default DockerDocs;
