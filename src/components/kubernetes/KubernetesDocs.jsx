import React from 'react';
import { MarkerType } from 'reactflow';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';
import K8sLifecycleVisualizer from './K8sLifecycleVisualizer';

const KubernetesDocs = () => {
  const clusterNodes = [
    // Control Plane
    { id: 'cp', position: { x: 300, y: 0 }, data: { label: 'Control Plane' }, style: { background: 'rgba(29, 78, 216, 0.1)', color: 'white', border: '1px dashed #3b82f6', width: 350, height: 200, zIndex: -1 } },
    { id: 'api', position: { x: 400, y: 30 }, data: { label: 'API Server' }, style: { background: '#1d4ed8', color: 'white', border: '1px solid #3b82f6', width: 150 } },
    { id: 'etcd', position: { x: 400, y: 130 }, data: { label: 'etcd' }, style: { background: '#7c3aed', color: 'white', border: '1px solid #8b5cf6', width: 150 } },
    { id: 'sch', position: { x: 320, y: 80 }, data: { label: 'Scheduler' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 100, fontSize: '12px' } },
    { id: 'cm', position: { x: 530, y: 80 }, data: { label: 'Controller Mgr' }, style: { background: '#1f2937', color: 'white', border: '1px solid #374151', width: 100, fontSize: '12px' } },

    // Worker Node 1
    { id: 'wn1', position: { x: 50, y: 250 }, data: { label: 'Worker Node 1' }, style: { background: 'rgba(5, 150, 105, 0.1)', color: 'white', border: '1px dashed #10b981', width: 250, height: 250, zIndex: -1 } },
    { id: 'k1', position: { x: 100, y: 280 }, data: { label: 'Kubelet' }, style: { background: '#059669', color: 'white', border: '1px solid #10b981', width: 150 } },
    { id: 'p1', position: { x: 100, y: 340 }, data: { label: 'Kube Proxy' }, style: { background: '#059669', color: 'white', border: '1px solid #10b981', width: 150 } },
    { id: 'pod1', position: { x: 70, y: 420 }, data: { label: 'Pod 1' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 80 } },
    { id: 'pod2', position: { x: 180, y: 420 }, data: { label: 'Pod 2' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 80 } },

    // Worker Node 2
    { id: 'wn2', position: { x: 650, y: 250 }, data: { label: 'Worker Node 2' }, style: { background: 'rgba(5, 150, 105, 0.1)', color: 'white', border: '1px dashed #10b981', width: 250, height: 250, zIndex: -1 } },
    { id: 'k2', position: { x: 700, y: 280 }, data: { label: 'Kubelet' }, style: { background: '#059669', color: 'white', border: '1px solid #10b981', width: 150 } },
    { id: 'p2', position: { x: 700, y: 340 }, data: { label: 'Kube Proxy' }, style: { background: '#059669', color: 'white', border: '1px solid #10b981', width: 150 } },
    { id: 'pod3', position: { x: 735, y: 420 }, data: { label: 'Pod 3' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 80 } },
  ];

  const clusterEdges = [
    { id: 'e1', source: 'api', target: 'etcd', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed }, markerStart: { type: MarkerType.ArrowClosed } },
    { id: 'e2', source: 'api', target: 'sch', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e3', source: 'api', target: 'cm', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    
    { id: 'e4', source: 'api', target: 'k1', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed }, markerStart: { type: MarkerType.ArrowClosed } },
    { id: 'e5', source: 'api', target: 'k2', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed }, markerStart: { type: MarkerType.ArrowClosed } },
  ];

  const ingressNodes = [
    { id: 'internet', position: { x: 50, y: 150 }, data: { label: 'Internet' }, style: { background: '#374151', color: 'white', border: '1px solid #4b5563', width: 100 } },
    { id: 'ig', position: { x: 250, y: 150 }, data: { label: 'Ingress Controller' }, style: { background: '#db2777', color: 'white', border: '1px solid #be185d', width: 150 } },
    
    { id: 's1', position: { x: 500, y: 50 }, data: { label: 'API Service' }, style: { background: '#1d4ed8', color: 'white', border: '1px solid #3b82f6', width: 120 } },
    { id: 's2', position: { x: 500, y: 250 }, data: { label: 'Web Service' }, style: { background: '#1d4ed8', color: 'white', border: '1px solid #3b82f6', width: 120 } },
    
    { id: 'p1', position: { x: 700, y: 50 }, data: { label: 'API Pods' }, style: { background: '#059669', color: 'white', border: '1px solid #10b981', width: 100 } },
    { id: 'p2', position: { x: 700, y: 250 }, data: { label: 'Web Pods' }, style: { background: '#059669', color: 'white', border: '1px solid #10b981', width: 100 } },
  ];

  const ingressEdges = [
    { id: 'e1', source: 'internet', target: 'ig', label: 'HTTP/S', style: { stroke: '#9ca3af' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e2', source: 'ig', target: 's1', label: '/api', style: { stroke: '#db2777' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e3', source: 'ig', target: 's2', label: '/web', style: { stroke: '#db2777' }, markerEnd: { type: MarkerType.ArrowClosed } },
    
    { id: 'e4', source: 's1', target: 'p1', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
    { id: 'e5', source: 's2', target: 'p2', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

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
          <InteractiveDiagram 
            initialNodes={clusterNodes} 
            initialEdges={clusterEdges} 
            title="Kubernetes Cluster Architecture" 
          />
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

        <div className="mt-12 bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
           <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Interactive Lifecycle Simulator</h3>
                <p className="text-sm text-gray-400 mt-1">Simulate a deployment lifecycle and see how the Control Plane handles node failures in real-time.</p>
              </div>
              <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Live Simulation</span>
              </div>
           </div>
           <K8sLifecycleVisualizer />
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
            <InteractiveDiagram 
              initialNodes={ingressNodes} 
              initialEdges={ingressEdges} 
              title="Kubernetes Ingress Flow" 
            />
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
