import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Zap, 
  HardDrive, 
  Box, 
  Terminal, 
  History, 
  Hammer, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const DOCKERFILE_STEPS = [
  { id: 1, cmd: 'FROM', val: 'node:20-alpine', desc: 'Base OS & Runtime' },
  { id: 2, cmd: 'WORKDIR', val: '/app', desc: 'Working directory' },
  { id: 3, cmd: 'COPY', val: 'package*.json .', desc: 'Dependency manifests' },
  { id: 4, cmd: 'RUN', val: 'npm install', desc: 'External binaries' },
  { id: 5, cmd: 'COPY', val: '.', desc: 'Source code' },
  { id: 6, cmd: 'CMD', val: '["node", "app.js"]', desc: 'Runtime metadata' }
];

const DockerLayerVisualizer = () => {
  const [layers, setLayers] = useState([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [useCache, setUseCache] = useState(true);
  const [currentStep, setCurrentStep] = useState(null);

  const startBuild = async () => {
    setIsBuilding(true);
    setIsRunning(false);
    setLayers([]);
    setCurrentStep(0);

    for (let i = 0; i < DOCKERFILE_STEPS.length; i++) {
      setCurrentStep(i);
      const step = DOCKERFILE_STEPS[i];
      const cached = useCache && i < 3; // Simulate cache for first 3 steps
      
      await new Promise(r => setTimeout(r, cached ? 400 : 1000));
      
      setLayers(prev => [{
        ...step,
        cached,
        uniqueId: Date.now() + i
      }, ...prev]);
    }
    
    setIsBuilding(false);
    setCurrentStep(null);
  };

  const startRun = () => {
    if (layers.length < DOCKERFILE_STEPS.length) return;
    setIsRunning(true);
  };

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl flex flex-col h-[550px]">
      {/* Header */}
      <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-blue-400" />
          <span className="text-sm font-bold text-white uppercase tracking-wider">Image Layer Visualizer</span>
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <span className="text-[10px] text-gray-400 font-bold uppercase transition-colors group-hover:text-gray-300">Build Cache</span>
            <div 
              onClick={() => setUseCache(!useCache)}
              className={`w-8 h-4 rounded-full p-0.5 transition-colors ${useCache ? 'bg-emerald-500' : 'bg-gray-700'}`}
            >
              <motion.div 
                animate={{ x: useCache ? 16 : 0 }}
                className="w-3 h-3 bg-white rounded-full shadow-sm"
              />
            </div>
          </label>
          <div className="flex gap-2">
            <button 
              onClick={startBuild}
              disabled={isBuilding}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-all"
            >
              <Hammer size={14} /> docker build
            </button>
            <button 
              onClick={startRun}
              disabled={isBuilding || layers.length === 0 || isRunning}
              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-all"
            >
              <Zap size={14} /> docker run
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Dockerfile Panel */}
        <div className="w-80 border-r border-gray-700 bg-gray-900/50 p-6 flex flex-col gap-3 font-mono">
          <div className="flex items-center gap-2 mb-2">
            <Terminal size={14} className="text-gray-500" />
            <span className="text-[10px] font-black text-gray-500 uppercase">Dockerfile</span>
          </div>
          {DOCKERFILE_STEPS.map((step, idx) => (
            <div 
              key={step.id} 
              className={`p-3 rounded-lg border transition-all ${
                currentStep === idx 
                  ? 'bg-blue-600/10 border-blue-500/50 scale-105 shadow-lg shadow-blue-900/20' 
                  : (currentStep !== null && idx < currentStep)
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
                    : 'bg-gray-800/40 border-gray-700 text-gray-400'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[11px] font-black ${currentStep === idx ? 'text-blue-400' : 'text-gray-500'}`}>{step.cmd}</span>
                {currentStep !== null && idx < currentStep && <CheckCircle2 size={12} className="text-emerald-500" />}
              </div>
              <div className="text-[10px] break-all mb-1 font-bold">{step.val}</div>
              <div className="text-[9px] text-gray-500 italic"># {step.desc}</div>
            </div>
          ))}
        </div>

        {/* Layer Stack Panel */}
        <div className="flex-1 p-8 bg-gray-900 flex flex-col items-center justify-end relative">
          <div className="absolute top-4 left-4 flex flex-col gap-2">
             <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                <ShieldCheck size={14} className="text-blue-500" /> Read-Only Layers
             </div>
             {isRunning && (
               <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-[10px] text-emerald-400 font-black uppercase tracking-widest">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Writable Layer
               </motion.div>
             )}
          </div>

          <div className="w-96 flex flex-col-reverse relative">
            <AnimatePresence>
              {layers.map((layer, idx) => (
                <motion.div
                  key={layer.uniqueId}
                  initial={{ y: -50, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`mb-1 p-4 h-16 rounded-xl border flex items-center justify-between relative shadow-lg ${
                    layer.cached 
                      ? 'bg-emerald-600/10 border-emerald-500/30' 
                      : 'bg-blue-600/10 border-blue-500/30'
                  }`}
                  style={{ zIndex: layers.length - idx }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${layer.cached ? 'bg-emerald-500/20' : 'bg-blue-500/20'}`}>
                      <HardDrive size={18} className={layer.cached ? 'text-emerald-400' : 'text-blue-400'} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-white uppercase">{layer.cmd} {layer.val}</div>
                      <div className="text-[9px] text-gray-500 mt-0.5">SHA256: {Math.random().toString(16).substring(2, 10)}...</div>
                    </div>
                  </div>
                  {layer.cached && (
                    <div className="flex items-center gap-1 bg-emerald-500/20 px-2 py-0.5 rounded text-[8px] font-black text-emerald-400 uppercase tracking-tighter">
                      <History size={10} /> Using Cache
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Writable Layer */}
              {isRunning && (
                <motion.div
                  initial={{ y: -50, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1.05 }}
                  className="mb-1 p-4 h-20 rounded-xl border-2 border-emerald-500 bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-between relative z-50"
                >
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-emerald-500 rounded-lg">
                        <Box size={20} className="text-white" />
                     </div>
                     <div>
                        <div className="text-[11px] font-black text-white uppercase">Container: Running</div>
                        <div className="text-[9px] text-emerald-400 font-bold mt-0.5">Diff: /var/lib/docker/overlay2/...</div>
                     </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                     <span className="text-[8px] font-black bg-white/20 text-white px-2 py-0.5 rounded uppercase">RW: Read-Write</span>
                     <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-[8px] text-emerald-400 font-bold italic">Application logs streaming...</motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {layers.length === 0 && !isBuilding && (
              <div className="h-64 flex flex-col items-center justify-center text-gray-600 border-2 border-dashed border-gray-800 rounded-2xl">
                 <Hammer size={32} className="mb-2 opacity-50" />
                 <p className="text-xs font-bold uppercase tracking-widest">Click 'docker build' to start</p>
              </div>
            )}
          </div>

          <div className="w-full mt-12 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
             <div className="flex items-center gap-2 mb-2">
                <Zap size={14} className="text-yellow-400" />
                <span className="text-[10px] font-black text-gray-300 uppercase">Architecture Insight</span>
             </div>
             <p className="text-[10px] text-gray-500 leading-relaxed italic">
                Docker images are a stack of <strong>immutable layers</strong>. When you start a container, a thin <strong>writable layer</strong> is added. This "Copy-on-Write" strategy makes Docker incredibly efficient with disk space.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DockerLayerVisualizer;
