import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Server, 
  Database, 
  Cpu, 
  Box, 
  Activity, 
  Play, 
  RefreshCcw, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const K8sLifecycleVisualizer = () => {
  const [step, setStep] = useState('idle');
  const [logs, setLogs] = useState([]);
  const [activeNode, setActiveNode] = useState(null);

  const addLog = (message, type = 'info') => {
    setLogs(prev => [{ id: Date.now(), message, type }, ...prev].slice(0, 5));
  };

  const startSimulation = async () => {
    setStep('idle');
    setLogs([]);
    setActiveNode(null);
    
    await new Promise(r => setTimeout(r, 500));
    
    setStep('kubectl-apply');
    addLog('kubectl apply -f deployment.yaml', 'cmd');
    
    await new Promise(r => setTimeout(r, 1000));
    setStep('api-server');
    addLog('API Server received request', 'info');
    
    await new Promise(r => setTimeout(r, 1000));
    setStep('etcd');
    addLog('State persistent in etcd', 'success');
    
    await new Promise(r => setTimeout(r, 1000));
    setStep('scheduler');
    addLog('Scheduler: Picking optimal node...', 'info');
    
    await new Promise(r => setTimeout(r, 1500));
    const targetNode = Math.random() > 0.5 ? 1 : 2;
    setActiveNode(targetNode);
    setStep('kubelet');
    addLog(`Scheduler chose Worker Node ${targetNode}`, 'success');
    addLog(`Kubelet on Node ${targetNode} pulling image...`, 'info');
    
    await new Promise(r => setTimeout(r, 2000));
    setStep('running');
    addLog(`Pod is now RUNNING on Node ${targetNode}`, 'success');
  };

  const simulateFailure = async () => {
    if (step !== 'running' || !activeNode) return;
    
    const failedNode = activeNode;
    setStep('node-failed');
    addLog(`CRITICAL: Worker Node ${failedNode} is UNREACHABLE`, 'error');
    
    await new Promise(r => setTimeout(r, 1500));
    setStep('api-detect-failure');
    addLog('Control Plane detected node failure', 'info');
    
    await new Promise(r => setTimeout(r, 1500));
    setStep('reschedule');
    addLog('Scheduler: Rescheduling Pod to healthy node...', 'info');
    
    await new Promise(r => setTimeout(r, 1500));
    const newNode = failedNode === 1 ? 2 : 1;
    setActiveNode(newNode);
    setStep('running');
    addLog(`Pod successfully recovered on Node ${newNode}`, 'success');
  };

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl flex flex-col h-[600px]">
      {/* Header / Controls */}
      <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-blue-400" />
          <span className="text-sm font-bold text-white uppercase tracking-wider">K8s Lifecycle Simulator</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={startSimulation}
            disabled={step !== 'idle' && step !== 'running' && step !== 'node-failed'}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-all"
          >
            <Play size={14} /> Deploy App
          </button>
          <button 
            onClick={simulateFailure}
            disabled={step !== 'running'}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-900/50 disabled:opacity-20 text-xs font-bold rounded-lg transition-all"
          >
            <AlertTriangle size={14} /> Fail Node
          </button>
          <button 
            onClick={() => { setStep('idle'); setLogs([]); setActiveNode(null); }}
            className="p-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-all"
          >
            <RefreshCcw size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Visual Canvas */}
        <div className="flex-2 p-8 relative flex flex-col items-center justify-between bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-gray-900 to-gray-900">
          
          {/* Control Plane Block */}
          <div className="relative z-10 p-6 bg-gray-800/80 backdrop-blur-md rounded-2xl border-2 border-blue-500/30 flex flex-col items-center gap-4 w-80 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
            <div className="absolute -top-3 left-6 px-2 bg-blue-600 text-[10px] font-bold text-white uppercase rounded">Control Plane</div>
            
            <div className="flex justify-around w-full">
              {/* API Server */}
              <motion.div 
                animate={{ 
                  scale: step === 'api-server' ? 1.1 : 1,
                  boxShadow: step === 'api-server' ? '0 0 20px rgba(59,130,246,0.5)' : 'none',
                  borderColor: step === 'api-server' ? '#3b82f6' : '#374151'
                }}
                className="p-3 bg-gray-900 rounded-xl border flex flex-col items-center gap-1 w-24"
              >
                <Cpu size={20} className={step === 'api-server' ? 'text-blue-400' : 'text-gray-500'} />
                <span className="text-[10px] font-bold text-gray-400 uppercase">API Server</span>
              </motion.div>

              {/* Scheduler */}
              <motion.div 
                animate={{ 
                  scale: (step === 'scheduler' || step === 'reschedule') ? 1.1 : 1,
                  boxShadow: (step === 'scheduler' || step === 'reschedule') ? '0 0 20px rgba(168,85,247,0.5)' : 'none',
                  borderColor: (step === 'scheduler' || step === 'reschedule') ? '#a855f7' : '#374151'
                }}
                className="p-3 bg-gray-900 rounded-xl border flex flex-col items-center gap-1 w-24"
              >
                <RefreshCcw size={20} className={(step === 'scheduler' || step === 'reschedule') ? 'text-purple-400' : 'text-gray-500'} />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Scheduler</span>
              </motion.div>
            </div>

            {/* etcd */}
            <motion.div 
              animate={{ 
                y: step === 'etcd' ? [0, -5, 0] : 0,
                borderColor: step === 'etcd' ? '#10b981' : '#374151'
              }}
              className="p-3 bg-gray-900 rounded-xl border flex items-center gap-3 w-48"
            >
              <Database size={20} className={step === 'etcd' ? 'text-emerald-400' : 'text-gray-500'} />
              <span className="text-[10px] font-bold text-gray-400 uppercase">etcd (Desired State)</span>
            </motion.div>
          </div>

          {/* Connection Lines (Paths) */}
          <div className="h-20 w-px bg-gradient-to-b from-blue-500/50 to-emerald-500/50 relative">
            <AnimatePresence>
              {(step === 'kubelet' || step === 'running') && (
                <motion.div 
                  initial={{ top: 0 }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full blur-sm"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Worker Nodes Block */}
          <div className="flex gap-8 z-10">
            {[1, 2].map(nodeId => (
              <motion.div
                key={nodeId}
                animate={{
                  opacity: (step === 'node-failed' && activeNode === nodeId) ? 0.3 : 1,
                  scale: activeNode === nodeId ? 1.05 : 1,
                  borderColor: activeNode === nodeId ? '#10b981' : '#374151'
                }}
                className={`p-6 bg-gray-800/80 backdrop-blur-md rounded-2xl border-2 w-56 flex flex-col gap-4 relative shadow-xl`}
              >
                <div className="absolute -top-3 left-6 px-2 bg-gray-700 text-[10px] font-bold text-gray-400 uppercase rounded">Node {nodeId}</div>
                
                <div className="flex items-center gap-3 border-b border-gray-700 pb-3">
                  <div className={`p-2 rounded-lg ${activeNode === nodeId ? 'bg-emerald-500/20' : 'bg-gray-900'}`}>
                    <Server size={18} className={activeNode === nodeId ? 'text-emerald-400' : 'text-gray-500'} />
                  </div>
                  <div className="text-[10px] font-bold text-gray-200">Kubelet</div>
                </div>

                {/* Container Placeholder */}
                <div className="h-16 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-xl relative overflow-hidden">
                  <AnimatePresence>
                    {activeNode === nodeId && step === 'running' && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg border border-emerald-500/50 flex items-center gap-2"
                      >
                        <Box size={16} />
                        <span className="text-[10px] font-black uppercase">Pod: Running</span>
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1] }} 
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-2 h-2 bg-emerald-500 rounded-full" 
                        />
                      </motion.div>
                    )}
                    {activeNode === nodeId && step === 'kubelet' && (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      >
                        <RefreshCcw size={20} className="text-blue-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating Instructions */}
          <div className="absolute top-40 left-10 w-48 pointer-events-none">
             <AnimatePresence mode="wait">
                {step === 'api-server' && (
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ opacity: 0 }} className="bg-blue-600/20 p-3 rounded-lg border border-blue-500/30">
                    <p className="text-[10px] text-blue-300 font-medium italic">"Hey Control Plane, make sure I have 1 replica of this app running."</p>
                  </motion.div>
                )}
                {step === 'scheduler' && (
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ opacity: 0 }} className="bg-purple-600/20 p-3 rounded-lg border border-purple-500/30">
                    <p className="text-[10px] text-purple-300 font-medium italic">"Hmm, Node 2 has more free RAM. Let's put it there."</p>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>

        {/* Logs Sidebar */}
        <div className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col">
          <div className="p-3 border-b border-gray-700 bg-gray-800/50 flex items-center gap-2">
            <Activity size={14} className="text-gray-500" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cluster Events</span>
          </div>
          <div className="flex-1 p-4 font-mono text-[11px] space-y-3 overflow-y-auto">
            <AnimatePresence initial={false}>
              {logs.map((log) => (
                <motion.div 
                  key={log.id} 
                  initial={{ x: 20, opacity: 0 }} 
                  animate={{ x: 0, opacity: 1 }}
                  className={`flex gap-2 ${
                    log.type === 'cmd' ? 'text-blue-400' :
                    log.type === 'success' ? 'text-emerald-400' :
                    log.type === 'error' ? 'text-red-400' : 'text-gray-400'
                  }`}
                >
                  <span className="shrink-0">{log.type === 'cmd' ? '$' : '•'}</span>
                  <span>{log.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {logs.length === 0 && (
              <div className="h-full flex items-center justify-center text-gray-600 italic">
                Waiting for deployment...
              </div>
            )}
          </div>
          
          {/* Quick Explanation */}
          <div className="p-4 bg-gray-800/30 border-t border-gray-700">
             <h5 className="text-[10px] font-black text-gray-300 uppercase mb-2">Did you know?</h5>
             <p className="text-[10px] text-gray-500 leading-relaxed italic">
               The <strong>Control Plane</strong> maintains the 'Desired State'. If a node fails, it automatically detects the drift and recovers the 'Actual State' on another node.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default K8sLifecycleVisualizer;
