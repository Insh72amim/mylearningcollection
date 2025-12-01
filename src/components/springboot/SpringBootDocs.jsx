import React from 'react';
import { MarkerType } from 'reactflow';
import InteractiveDiagram from '../common/InteractiveDiagram';
import CodeBlock from '../common/CodeBlock';
import { Server, Shield, Database, Globe, Layers, Box, GitBranch, Lock, Activity, Cpu } from 'lucide-react';

const SpringBootDocs = () => {
  // 1. IoC Container & Bean Lifecycle
  const iocNodes = [
    { id: 'config', position: { x: 0, y: 150 }, type: 'custom', data: { label: '@Configuration', subLabel: 'Source', icon: 'settings', gradient: 'from-gray-700 to-gray-900', details: 'Defines beans manually' } },
    { id: 'scan', position: { x: 0, y: 50 }, type: 'custom', data: { label: '@Component', subLabel: 'Discovery', icon: 'search', gradient: 'from-gray-700 to-gray-900', details: 'Auto-detected classes' } },
    { id: 'container', position: { x: 300, y: 100 }, type: 'custom', data: { label: 'IoC Container', subLabel: 'ApplicationContext', icon: 'box', gradient: 'from-green-600 to-green-800', details: 'Manages lifecycle & dependencies' } },
    { id: 'bean1', position: { x: 600, y: 50 }, type: 'custom', data: { label: 'UserService', subLabel: 'Singleton', icon: 'user', gradient: 'from-blue-600 to-blue-800' } },
    { id: 'bean2', position: { x: 600, y: 150 }, type: 'custom', data: { label: 'UserRepository', subLabel: 'Singleton', icon: 'database', gradient: 'from-orange-600 to-orange-800' } },
  ];

  const iocEdges = [
    { id: 'e1', source: 'config', target: 'container', animated: true, label: 'Register', style: { stroke: '#9ca3af' } },
    { id: 'e2', source: 'scan', target: 'container', animated: true, label: 'Scan', style: { stroke: '#9ca3af' } },
    { id: 'e3', source: 'container', target: 'bean1', label: 'Instantiate', style: { stroke: '#10b981' } },
    { id: 'e4', source: 'container', target: 'bean2', label: 'Instantiate', style: { stroke: '#10b981' } },
    { id: 'e5', source: 'bean2', target: 'bean1', animated: true, label: '@Autowired', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  // 2. Spring MVC Request Flow
  const mvcNodes = [
    { id: 'client', position: { x: 0, y: 150 }, type: 'custom', data: { label: 'Client', icon: 'globe', gradient: 'from-gray-700 to-gray-900' } },
    { id: 'dispatcher', position: { x: 250, y: 150 }, type: 'custom', data: { label: 'DispatcherServlet', subLabel: 'Front Controller', icon: 'layers', gradient: 'from-purple-600 to-purple-800', details: 'Central entry point' } },
    { id: 'controller', position: { x: 550, y: 150 }, type: 'custom', data: { label: '@RestController', subLabel: 'Endpoint', icon: 'code', gradient: 'from-blue-600 to-blue-800' } },
    { id: 'service', position: { x: 800, y: 150 }, type: 'custom', data: { label: '@Service', subLabel: 'Business Logic', icon: 'cpu', gradient: 'from-teal-600 to-teal-800' } },
    { id: 'repo', position: { x: 1050, y: 150 }, type: 'custom', data: { label: 'Repository', subLabel: 'JPA / Hibernate', icon: 'database', gradient: 'from-orange-600 to-orange-800' } },
  ];

  const mvcEdges = [
    { id: 'm1', source: 'client', target: 'dispatcher', animated: true, label: 'HTTP', style: { stroke: '#9ca3af' } },
    { id: 'm2', source: 'dispatcher', target: 'controller', animated: true, label: 'Route', style: { stroke: '#a855f7' } },
    { id: 'm3', source: 'controller', target: 'service', animated: true, style: { stroke: '#3b82f6' } },
    { id: 'm4', source: 'service', target: 'repo', animated: true, style: { stroke: '#f97316' } },
  ];

  // 3. Spring Security Filter Chain
  const securityNodes = [
    { id: 'req', position: { x: 0, y: 100 }, type: 'custom', data: { label: 'Request', icon: 'globe', gradient: 'from-gray-700 to-gray-900' } },
    { id: 'chain', position: { x: 250, y: 100 }, type: 'custom', data: { label: 'FilterChainProxy', subLabel: 'Delegator', icon: 'shield', gradient: 'from-red-600 to-red-800' } },
    { id: 'jwt', position: { x: 550, y: 0 }, type: 'custom', data: { label: 'JwtFilter', subLabel: 'Custom', icon: 'key', gradient: 'from-pink-600 to-pink-800' } },
    { id: 'auth', position: { x: 550, y: 200 }, type: 'custom', data: { label: 'UsernamePassword', subLabel: 'Standard', icon: 'lock', gradient: 'from-pink-600 to-pink-800' } },
    { id: 'context', position: { x: 850, y: 100 }, type: 'custom', data: { label: 'SecurityContext', subLabel: 'ThreadLocal', icon: 'user-check', gradient: 'from-green-600 to-green-800' } },
  ];

  const securityEdges = [
    { id: 's1', source: 'req', target: 'chain', animated: true, style: { stroke: '#9ca3af' } },
    { id: 's2', source: 'chain', target: 'jwt', style: { stroke: '#ef4444' } },
    { id: 's3', source: 'chain', target: 'auth', style: { stroke: '#ef4444' } },
    { id: 's4', source: 'jwt', target: 'context', label: 'Set Auth', style: { stroke: '#10b981' }, markerEnd: { type: MarkerType.ArrowClosed } },
  ];

  return (
    <div className="max-w-5xl mx-auto text-gray-300 space-y-16 pb-20">
      
      {/* Header */}
      <div className="border-b border-gray-700 pb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Spring Boot Internals & Enterprise Patterns</h1>
        <p className="text-xl text-gray-400">
          Deep dive into the IoC Container, AOP Proxies, and Transaction Management.
        </p>
      </div>

      {/* Section 1: IoC & Dependency Injection */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-green-600 text-sm px-3 py-1 rounded-full">01</span>
          IoC Container & Bean Lifecycle
        </h2>
        <p className="text-lg leading-relaxed mb-6">
          The <strong>ApplicationContext</strong> is the heart of Spring. It scans, instantiates, and wires beans together. Understanding the lifecycle is key to avoiding circular dependencies and memory leaks.
        </p>
        
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Container Initialization</h3>
          <InteractiveDiagram 
            initialNodes={iocNodes} 
            initialEdges={iocEdges} 
            title="Spring IoC Container"
            height="400px"
          />
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Bean Scopes Deep Dive</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-900 p-4 rounded border border-blue-900/50">
              <strong className="text-blue-400 block mb-2">Singleton (Default)</strong>
              One instance per container. Not thread-safe by default! Use stateless beans.
            </div>
            <div className="bg-gray-900 p-4 rounded border border-green-900/50">
              <strong className="text-green-400 block mb-2">Prototype</strong>
              New instance every time it's injected. Useful for stateful beans.
            </div>
            <div className="bg-gray-900 p-4 rounded border border-purple-900/50">
              <strong className="text-purple-400 block mb-2">Request / Session</strong>
              Web-aware scopes. One per HTTP request or user session.
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: AOP & Proxies */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-purple-600 text-sm px-3 py-1 rounded-full">02</span>
          AOP & Transaction Management
        </h2>
        <p className="mb-6">
          Spring uses <strong>Aspect Oriented Programming (AOP)</strong> for cross-cutting concerns like Transactions, Security, and Logging. It wraps your beans in <strong>CGLIB Proxies</strong>.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="font-semibold text-white mb-3">How @Transactional Works</h3>
            <p className="text-sm mb-3 text-gray-400">
              When you call a method, you're actually calling the Proxy. The Proxy opens the transaction, calls your method, then commits/rollbacks.
            </p>
            <CodeBlock language="java" title="Self-Invocation Pitfall" code={`@Service
public class OrderService {

    // ❌ Transaction IGNORED if called from within the same class!
    // Reason: 'this.save()' bypasses the Proxy.
    public void createOrder() {
        this.save(); 
    }

    @Transactional
    public void save() {
        // ...
    }
}`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="font-semibold text-white mb-3">Transaction Propagation</h3>
            <CodeBlock language="java" title="Propagation Levels" code={`@Transactional(propagation = Propagation.REQUIRED)
// Default: Join existing tx or create new one

@Transactional(propagation = Propagation.REQUIRES_NEW)
// Suspend current tx, create completely new one.
// If inner fails, outer can still commit (if caught).

@Transactional(propagation = Propagation.MANDATORY)
// Throw exception if no active transaction exists.`} />
          </div>
        </div>
      </section>

      {/* Section 3: Spring MVC Internals */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-orange-600 text-sm px-3 py-1 rounded-full">03</span>
          Spring MVC Internals
        </h2>

        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">DispatcherServlet Flow</h3>
          <InteractiveDiagram 
            initialNodes={mvcNodes} 
            initialEdges={mvcEdges} 
            title="Request Lifecycle"
            height="400px"
          />
        </div>
      </section>

      {/* Section 4: JVM Tuning & Performance */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="bg-red-600 text-sm px-3 py-1 rounded-full">04</span>
          JVM Tuning & Performance
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="font-semibold text-white mb-3">Memory Management</h3>
            <CodeBlock language="bash" title="JVM Flags" code={`# Initial Heap (-Xms) and Max Heap (-Xmx)
# Set them equal to avoid resizing overhead
java -Xms2G -Xmx2G -jar app.jar

# Garbage Collector
# G1GC is default in Java 9+. Good for large heaps.
-XX:+UseG1GC

# ZGC (Java 15+) for low latency (<10ms pauses)
-XX:+UseZGC`} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="font-semibold text-white mb-3">Spring Boot Actuator</h3>
            <CodeBlock language="yaml" title="application.yml" code={`management:
  endpoints:
    web:
      exposure:
        include: "health,info,metrics,prometheus"
  endpoint:
    health:
      show-details: always`} />
            <p className="text-xs mt-3 text-gray-400">
              Exposes <code>/actuator/metrics</code> for monitoring JVM memory, GC, and thread usage.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpringBootDocs;
