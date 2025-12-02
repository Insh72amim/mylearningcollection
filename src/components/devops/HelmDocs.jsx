import React from "react";
import { MarkerType } from "reactflow";
import InteractiveDiagram from "../common/InteractiveDiagram";
import CodeBlock from "../common/CodeBlock";

const HelmDocs = () => {
  const releaseNodes = [
    {
      id: "dev",
      position: { x: 30, y: 140 },
      data: { label: "Developer" },
      style: {
        width: 140,
        background: "#1f2937",
        color: "white",
        border: "1px solid #374151",
      },
    },
    {
      id: "cli",
      position: { x: 200, y: 140 },
      data: { label: "Helm CLI" },
      style: {
        width: 140,
        background: "#7c3aed",
        color: "white",
        border: "1px solid #a855f7",
      },
    },
    {
      id: "repo",
      position: { x: 380, y: 60 },
      data: { label: "Chart Repo" },
      style: {
        width: 160,
        background: "#78350f",
        color: "white",
        border: "1px solid #f59e0b",
      },
    },
    {
      id: "values",
      position: { x: 380, y: 220 },
      data: { label: "values.yaml" },
      style: {
        width: 150,
        background: "#064e3b",
        color: "white",
        border: "1px solid #10b981",
      },
    },
    {
      id: "kubeapi",
      position: { x: 560, y: 140 },
      data: { label: "Kubernetes API" },
      style: {
        width: 170,
        background: "#1e3a8a",
        color: "white",
        border: "1px solid #3b82f6",
      },
    },
    {
      id: "release",
      position: { x: 760, y: 140 },
      data: { label: "Release History" },
      style: {
        width: 170,
        background: "#312e81",
        color: "white",
        border: "1px solid #6366f1",
      },
    },
  ];

  const releaseEdges = [
    {
      id: "r1",
      source: "dev",
      target: "cli",
      label: "helm install",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#a855f7" },
    },
    {
      id: "r2",
      source: "cli",
      target: "repo",
      label: "chart pull",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#f59e0b" },
    },
    {
      id: "r3",
      source: "cli",
      target: "values",
      label: "merge overrides",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#10b981" },
    },
    {
      id: "r4",
      source: "cli",
      target: "kubeapi",
      label: "rendered manifests",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#3b82f6" },
    },
    {
      id: "r5",
      source: "kubeapi",
      target: "release",
      label: "status, revisions",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#6366f1" },
    },
  ];

  const chartNodes = [
    {
      id: "chart",
      position: { x: 60, y: 120 },
      data: { label: "Chart" },
      style: {
        width: 140,
        background: "#1f2937",
        color: "white",
        border: "1px solid #374151",
      },
    },
    {
      id: "templates",
      position: { x: 260, y: 40 },
      data: { label: "templates/" },
      style: {
        width: 150,
        background: "#1e3a8a",
        color: "white",
        border: "1px solid #3b82f6",
      },
    },
    {
      id: "valuesBase",
      position: { x: 260, y: 200 },
      data: { label: "values.yaml" },
      style: {
        width: 150,
        background: "#10b981",
        color: "white",
        border: "1px solid #34d399",
      },
    },
    {
      id: "valuesEnv",
      position: { x: 460, y: 200 },
      data: { label: "values-prod.yaml" },
      style: {
        width: 170,
        background: "#b45309",
        color: "white",
        border: "1px solid #f59e0b",
      },
    },
    {
      id: "render",
      position: { x: 460, y: 60 },
      data: { label: "helm template" },
      style: {
        width: 170,
        background: "#7c3aed",
        color: "white",
        border: "1px solid #a855f7",
      },
    },
    {
      id: "manifest",
      position: { x: 660, y: 120 },
      data: { label: "K8s Manifests" },
      style: {
        width: 170,
        background: "#312e81",
        color: "white",
        border: "1px solid #6366f1",
      },
    },
  ];

  const chartEdges = [
    {
      id: "c1",
      source: "chart",
      target: "templates",
      label: "define resources",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#3b82f6" },
    },
    {
      id: "c2",
      source: "chart",
      target: "valuesBase",
      label: "defaults",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#10b981" },
    },
    {
      id: "c3",
      source: "valuesBase",
      target: "valuesEnv",
      label: "override",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#f59e0b" },
    },
    {
      id: "c4",
      source: "templates",
      target: "render",
      label: "Go templates",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#a855f7" },
    },
    {
      id: "c5",
      source: "render",
      target: "manifest",
      label: "apply",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#6366f1" },
    },
  ];

  return (
    <div className="max-w-4xl text-gray-300 space-y-12">
      <header className="border-b border-gray-700 pb-6">
        <h1 className="text-4xl font-bold text-white mb-3">Helm Playbook</h1>
        <p className="text-lg text-gray-400">
          Helm packages Kubernetes applications as versioned charts. It renders
          templates with environment-specific values and tracks release history
          for seamless upgrades and rollbacks.
        </p>
      </header>

      <section>
        <h2 className="text-3xl font-semibold text-blue-400 mb-4">
          Release Workflow
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <p className="mb-4">
              Helm 3 runs entirely client-side: the CLI pulls charts, merges
              overrides, renders manifests, and applies them via the Kubernetes
              API. Each installation becomes a release stored in the target
              cluster's namespace.
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                Use `helm repo add` / `helm dependency update` to manage charts.
              </li>
              <li>
                Values cascade: chart defaults → environment overrides → CLI
                flags.
              </li>
              <li>
                Release status captures revisions, last deploy time, and notes.
              </li>
            </ul>
          </div>
          <InteractiveDiagram
            initialNodes={releaseNodes}
            initialEdges={releaseEdges}
            title="Helm Install Flow"
            height="340px"
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-blue-400 mb-4">
          Chart Structure
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <p className="mb-4">
              Charts are just directories with metadata (`Chart.yaml`), template
              definitions, helper partials, and default values. Rendering uses
              Go templates, enabling conditionals, loops, and reusable snippets.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-gray-900/70 border border-gray-700 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2 text-sm">
                  Folder Layout
                </h3>
                <ul className="text-xs space-y-1">
                  <li>`charts/` vendored dependencies.</li>
                  <li>`templates/_helpers.tpl` for macros (`include`).</li>
                  <li>`values.yaml` holds sane defaults.</li>
                </ul>
              </div>
              <div className="bg-gray-900/70 border border-gray-700 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-2 text-sm">
                  Testing & Security
                </h3>
                <ul className="text-xs space-y-1">
                  <li>`helm lint` validates structure + schema.</li>
                  <li>Sign charts with `helm package --sign`.</li>
                  <li>
                    Keep secrets in external stores; inject via `helm secrets`
                    or SOPS.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <InteractiveDiagram
            initialNodes={chartNodes}
            initialEdges={chartEdges}
            title="Template Rendering"
            height="320px"
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-blue-400 mb-4">
          values.yaml Example
        </h2>
        <CodeBlock
          language="yaml"
          title="values-prod.yaml"
          code={`image:
  repository: ghcr.io/org/api
  tag: 1.4.2
  pullPolicy: IfNotPresent

replicaCount: 4

resources:
  requests:
    cpu: 200m
    memory: 256Mi
  limits:
    cpu: 500m
    memory: 512Mi

env:
  DATABASE_URL: postgresql://svc:5432/app
  FEATURE_FLAGS: beta,workers

livenessProbe:
  httpGet:
    path: /healthz
    port: http
  initialDelaySeconds: 10
  periodSeconds: 15

nodeSelector:
  kubernetes.io/os: linux`}
        />
      </section>
    </div>
  );
};

export default HelmDocs;
