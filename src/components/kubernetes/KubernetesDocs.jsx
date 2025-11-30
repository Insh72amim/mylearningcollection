import React from 'react';
import Mermaid from '../common/Mermaid';
import CodeBlock from '../common/CodeBlock';

const KubernetesDocs = () => {
  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Kubernetes: The Deep Dive</h1>
        <p className="text-xl text-gray-400">
          The de facto standard for container orchestration. Understand the Control Plane, Pods, Services, and how to manage scale.
        </p>
      </div>

      {/* Section 1: Architecture */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-blue-600 text-sm px-3 py-1 rounded-full">01</span>
          Cluster Architecture
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          A Kubernetes cluster consists of a <strong>Control Plane</strong> (the brain) and <strong>Worker Nodes</strong> (the muscle).
        </p>
        
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Control Plane vs Worker Nodes</h3>
          <Mermaid chart={`
            graph TD
              subgraph Control Plane
                API[API Server]
                SCH[Scheduler]
                CM[Controller Manager]
                ETCD[(etcd)]
              end
              
              subgraph Worker Node 1
                K1[Kubelet]
                P1[Kube Proxy]
                POD1[Pod]
                POD2[Pod]
              end
              
              subgraph Worker Node 2
                K2[Kubelet]
                P2[Kube Proxy]
                POD3[Pod]
              end
              
              API <--> ETCD
              API --> SCH
              API --> CM
              API <--> K1
              API <--> K2
              
              style API fill:#1d4ed8,stroke:#3b82f6
              style ETCD fill:#7c3aed,stroke:#8b5cf6
              style K1 fill:#059669,stroke:#10b981
              style K2 fill:#059669,stroke:#10b981
          `} />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <strong className="text-blue-400 block mb-1">API Server</strong>
              The entry point for all REST commands. The only component that talks to etcd.
            </div>
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <strong className="text-purple-400 block mb-1">etcd</strong>
              Consistent and highly-available key value store for all cluster data.
            </div>
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <strong className="text-green-400 block mb-1">Kubelet</strong>
              Agent that runs on each node. Ensures containers are running in a Pod.
            </div>
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              <strong className="text-orange-400 block mb-1">Scheduler</strong>
              Watches for newly created Pods and assigns them to a node.
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Pods & Deployments */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">02</span>
          Pods & Workloads
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">The Pod</h3>
            <p className="text-sm text-gray-400 mb-4">
              The smallest deployable unit. Can contain one or more containers (sidecar pattern).
              Containers in a Pod share:
            </p>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex gap-2 text-green-400">✓ Network Namespace (IP address)</li>
              <li className="flex gap-2 text-green-400">✓ Storage Volumes</li>
              <li className="flex gap-2 text-green-400">✓ Lifecycle</li>
            </ul>
            <div className="bg-gray-900 p-3 rounded text-xs font-mono">
              kind: Pod<br/>
              metadata: name: my-app<br/>
              spec: containers: ...
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Deployment</h3>
            <p className="text-sm text-gray-400 mb-4">
              Manages ReplicaSets to provide declarative updates to Pods.
            </p>
            <ul className="space-y-2 text-sm mb-4">
              <li className="flex gap-2 text-blue-400">✓ Self-healing (restarts failed pods)</li>
              <li className="flex gap-2 text-blue-400">✓ Scaling (replicas)</li>
              <li className="flex gap-2 text-blue-400">✓ Rolling Updates / Rollbacks</li>
            </ul>
            <div className="bg-gray-900 p-3 rounded text-xs font-mono">
              kind: Deployment<br/>
              replicas: 3<br/>
              selector: matchLabels: ...
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Services & Networking */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">03</span>
          Services & Networking
        </h2>
        <p className="mb-6">
          Pods are ephemeral (IPs change). Services provide a stable network endpoint.
        </p>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Service Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-gray-900 p-4 rounded border border-gray-700">
                <strong className="text-blue-400 block mb-2">ClusterIP</strong>
                <p className="text-xs">Internal only. Default. Stable IP inside cluster.</p>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-gray-700">
                <strong className="text-green-400 block mb-2">NodePort</strong>
                <p className="text-xs">Exposes service on each Node's IP at a static port.</p>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-gray-700">
                <strong className="text-purple-400 block mb-2">LoadBalancer</strong>
                <p className="text-xs">Provisions cloud LB (AWS ELB, GCP LB).</p>
              </div>
              <div className="bg-gray-900 p-4 rounded border border-gray-700">
                <strong className="text-orange-400 block mb-2">ExternalName</strong>
                <p className="text-xs">Maps service to DNS name (CNAME).</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Ingress</h3>
            <p className="text-sm text-gray-400 mb-4">
              Manages external access to services, typically HTTP/HTTPS. Provides load balancing, SSL termination, and name-based virtual hosting.
            </p>
            <Mermaid chart={`
              graph LR
                Internet -->|HTTP/S| IG[Ingress Controller]
                IG -->|/api| S1[API Service]
                IG -->|/web| S2[Web Service]
                S1 --> P1[API Pods]
                S2 --> P2[Web Pods]
                
                style IG fill:#db2777,stroke:#be185d
            `} />
          </div>
        </div>
      </section>

      {/* Section 4: Configuration & Storage */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-orange-600 text-sm px-3 py-1 rounded-full">04</span>
          Configuration & Storage
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">ConfigMaps & Secrets</h3>
            <p className="text-sm text-gray-400 mb-4">
              Decouple configuration artifacts from image content.
            </p>
            <div className="space-y-3">
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <strong className="text-yellow-400 block mb-1">ConfigMap</strong>
                <p className="text-xs">Non-confidential data (env vars, config files).</p>
              </div>
              <div className="bg-gray-900 p-3 rounded border border-gray-700">
                <strong className="text-red-400 block mb-1">Secret</strong>
                <p className="text-xs">Confidential data (passwords, tokens). Base64 encoded.</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Persistent Storage</h3>
            <p className="text-sm text-gray-400 mb-4">
              Managing state in a stateless environment.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">PV:</span>
                <span>PersistentVolume (Cluster resource)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">PVC:</span>
                <span>PersistentVolumeClaim (User request for storage)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">SC:</span>
                <span>StorageClass (Dynamic provisioning profile)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5: YAML Example */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-pink-600 text-sm px-3 py-1 rounded-full">05</span>
          Full Deployment Example
        </h2>
        
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Deployment + Service</h3>
            <CodeBlock 
              language="yaml" 
              title="deployment.yaml"
              code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
        resources:
          limits:
            memory: "128Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer`} 
            />
        </div>
      </section>

    </div>
  );
};

export default KubernetesDocs;
