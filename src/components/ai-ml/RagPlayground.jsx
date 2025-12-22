import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Cpu, 
  Database, 
  Zap, 
  MessageSquare, 
  ArrowRight, 
  Layers,
  Sparkles,
  Info,
  Terminal,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const SAMPLE_DOCS = [
  { id: 1, text: "The capital of France is Paris. It is known for its art, fashion, and the Eiffel Tower.", topic: 'Geography' },
  { id: 2, text: "Quantum computing uses qubits which can exist in multiple states simultaneously due to superposition.", topic: 'Science' },
  { id: 3, text: "The Great Barrier Reef is the world's largest coral reef system, located in the Coral Sea off the coast of Australia.", topic: 'Geography' },
  { id: 4, text: "Machine learning is a subset of AI that focuses on building systems that learn from data.", topic: 'Technology' },
  { id: 5, text: "Transformers are a type of neural network architecture that has revolutionized NLP through self-attention.", topic: 'Technology' }
];

// Helper to project high-dim to 2D for visualization
// (Static positions for demo consistency)
const VECTOR_POSITIONS = {
  1: { x: 20, y: 30 },
  2: { x: 80, y: 70 },
  3: { x: 25, y: 25 },
  4: { x: 70, y: 20 },
  5: { x: 75, y: 15 }
};

const RagPlayground = () => {
  const [stage, setStage] = useState('idle'); // idle, ingest, search, retrieve, generate
  const [chunks, setChunks] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [logs, setLogs] = useState([]);
  const [activeChip, setActiveChip] = useState(null);

  const addLog = (msg, type = 'info') => {
    setLogs(prev => [...prev, { id: Date.now(), msg, type }].slice(-4));
  };

  const startIngestion = async () => {
    setStage('ingest');
    setChunks([]);
    setLogs([]);
    addLog("Starting Data Ingestion...", "step");

    for (const doc of SAMPLE_DOCS) {
      addLog(`Chunking: ${doc.topic} document...`);
      await new Promise(r => setTimeout(r, 600));
      setChunks(prev => [...prev, { ...doc, pos: VECTOR_POSITIONS[doc.id] }]);
    }
    
    addLog("Vectors stored in DB", "success");
    setStage('ready');
  };

  const performSearch = async () => {
    if (!query || stage !== 'ready') return;
    
    setStage('search');
    addLog(`Embedding query: "${query}"`, "step");
    await new Promise(r => setTimeout(r, 1000));
    
    setStage('retrieve');
    addLog("Searching vector space for nearest neighbors...", "step");
    
    // Simulate finding neighbors based on keywords in query
    await new Promise(r => setTimeout(r, 1500));
    const neighbors = chunks.filter(c => 
      query.toLowerCase().split(' ').some(word => 
        c.text.toLowerCase().includes(word) || c.topic.toLowerCase().includes(word)
      )
    );
    
    setResults(neighbors.length > 0 ? neighbors.map(n => n.id) : [1]); // Default if none
    addLog(`Retrieved ${neighbors.length || 1} relevant chunks`, "success");
    
    await new Promise(r => setTimeout(r, 1000));
    setStage('generate');
    addLog("Augmenting prompt with retrieved context...", "step");
  };

  const reset = () => {
    setStage('idle');
    setChunks([]);
    setResults([]);
    setLogs([]);
    setQuery("");
  };

  return (
    <div className="bg-gray-950 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl flex flex-col h-[700px] font-sans">
      {/* Header */}
      <div className="bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-gray-900">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">RAG Pipeline Explorer</h3>
            <p className="text-[10px] text-gray-500 font-bold">Concept retrieval for LLMs</p>
          </div>
        </div>
        <div className="flex gap-2">
          {stage === 'idle' && (
            <button 
              onClick={startIngestion}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black rounded-lg transition-all"
            >
              <Database size={14} /> INGEST DOCUMENTS
            </button>
          )}
          {stage !== 'idle' && (
            <button 
              onClick={reset}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 text-[11px] font-black rounded-lg transition-all"
            >
              RESET
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Input & Flow */}
        <div className="w-80 border-r border-gray-900 bg-gray-950 flex flex-col">
          <div className="p-6 flex-1 space-y-8 overflow-y-auto">
            {/* Step 1: Query Input */}
            <div className={`transition-opacity ${stage === 'idle' ? 'opacity-30' : 'opacity-100'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Search size={14} className="text-blue-400" />
                <span className="text-[10px] font-black text-gray-400 uppercase">1. User Query</span>
              </div>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Ask about AI, Geography..."
                  disabled={stage !== 'ready' && stage !== 'generate'}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && performSearch()}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button 
                  onClick={performSearch}
                  disabled={!query}
                  className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-30"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Step 2: Retrieval Logic */}
            <div className={`transition-opacity ${(stage === 'search' || stage === 'retrieve' || stage === 'generate') ? 'opacity-100' : 'opacity-30'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Layers size={14} className="text-purple-400" />
                <span className="text-[10px] font-black text-gray-400 uppercase">2. Top Search Results</span>
              </div>
              <div className="space-y-2">
                <AnimatePresence>
                  {results.map((id) => {
                    const chunk = SAMPLE_DOCS.find(d => d.id === id);
                    return (
                      <motion.div 
                        key={id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="p-3 bg-purple-900/10 border border-purple-500/30 rounded-xl"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 size={12} className="text-purple-400" />
                          <span className="text-[9px] font-black text-purple-400 uppercase tracking-tighter">Chunk {id}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-tight italic line-clamp-2">"{chunk?.text}"</p>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                {results.length === 0 && (
                  <div className="text-[10px] text-gray-600 italic">Enter a query to retrieve context...</div>
                )}
              </div>
            </div>

            {/* Step 3: Generation */}
            <div className={`transition-opacity ${stage === 'generate' ? 'opacity-100' : 'opacity-30'}`}>
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare size={14} className="text-emerald-400" />
                <span className="text-[10px] font-black text-gray-400 uppercase">3. Augmented Response</span>
              </div>
              <div className="p-4 bg-emerald-900/10 border border-emerald-500/30 rounded-xl">
                 <div className="flex items-center gap-2 mb-2">
                    <Cpu size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase">LLM Generation</span>
                 </div>
                 <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] text-gray-300 leading-relaxed font-mono"
                  >
                    Based on the retrieved context about {SAMPLE_DOCS.find(d => d.id === results[0])?.topic}... [Simulated Response]
                 </motion.p>
              </div>
            </div>
          </div>

          {/* Logs */}
          <div className="h-32 border-t border-gray-900 bg-black/40 p-4 overflow-hidden">
             <div className="flex items-center gap-2 mb-2 text-[9px] text-gray-600 font-black uppercase">
                <Terminal size={10} /> Internal Pipeline Logs
             </div>
             <div className="space-y-1">
                <AnimatePresence initial={false}>
                  {logs.map(log => (
                    <motion.div 
                      key={log.id} 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-[9px] font-mono ${
                        log.type === 'success' ? 'text-emerald-500' : 
                        log.type === 'step' ? 'text-blue-400' : 'text-gray-500'
                      }`}
                    >
                      <span className="opacity-40">[{new Date(log.id).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span> {log.msg}
                    </motion.div>
                  ))}
                </AnimatePresence>
             </div>
          </div>
        </div>

        {/* Right: Vector Space Visualizer */}
        <div className="flex-1 relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-gray-950 to-black p-8">
           <div className="absolute top-6 left-6 z-10">
              <h4 className="text-xs font-black text-white uppercase flex items-center gap-2">
                 <Database size={14} className="text-blue-500" /> Vector Store (Embedding Space)
              </h4>
              <p className="text-[10px] text-gray-500 mt-1 max-w-xs leading-relaxed">
                Documents are converted into multi-dimensional vectors. Similar meanings cluster together.
              </p>
           </div>

           {/* Semantic Grid / Map */}
           <div className="w-full h-full relative border border-gray-900/50 rounded-2xl overflow-hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay pointer-events-none" />
           
           {/* Vector Points */}
           <div className="absolute inset-8 border-l border-b border-gray-800/50">
             {/* X/Y Axes */}
             <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-[8px] font-bold text-gray-700 uppercase">Semantic Dimension 1</div>
             <div className="absolute left-[-30px] top-1/2 -rotate-90 -translate-y-1/2 text-[8px] font-bold text-gray-700 uppercase">Semantic Dimension 2</div>

             <AnimatePresence>
               {chunks.map((chunk) => {
                  const isActive = results.includes(chunk.id);
                  return (
                    <motion.div
                      key={chunk.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: isActive ? 1.5 : 1, 
                        opacity: 1,
                        x: `${chunk.pos.x}%`, 
                        y: `${chunk.pos.y}%` 
                      }}
                      className="absolute group pointer-events-auto"
                      onMouseEnter={() => setActiveChip(chunk.id)}
                      onMouseLeave={() => setActiveChip(null)}
                      style={{ left: 0, top: 0 }}
                    >
                      <div className={`relative -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full transition-all cursor-crosshair ${
                        isActive ? 'bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] z-50' : 'bg-blue-500/40 border border-blue-400 group-hover:bg-blue-400'
                      }`} />
                      
                      {/* Tooltip */}
                      {(activeChip === chunk.id || isActive) && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-48 p-3 rounded-xl border backdrop-blur-md z-[60] pointer-events-none ${
                            isActive ? 'bg-purple-900/90 border-purple-500/50' : 'bg-gray-900/90 border-gray-700/50'
                          }`}
                        >
                           <div className="text-[9px] font-black uppercase text-white mb-2 pb-1 border-b border-white/10">{chunk.topic}</div>
                           <p className="text-[9px] text-gray-100 leading-tight italic">"{chunk.text}"</p>
                        </motion.div>
                      )}
                    </motion.div>
                  );
               })}
             </AnimatePresence>

             {/* Embedding Connector Line (Visual only) */}
             {stage === 'retrieve' && (
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                 className="absolute inset-0 pointer-events-none"
               >
                 <svg className="w-full h-full">
                    {results.map(rid => {
                      const pos = VECTOR_POSITIONS[rid];
                      return (
                        <motion.line 
                          key={rid}
                          x1="50%" y1="50%" 
                          x2={`${pos.x}%`} y2={`${pos.y}%`}
                          stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                        />
                      );
                    })}
                 </svg>
               </motion.div>
             )}
           </div>

           {/* Pipeline HUD */}
           <div className="absolute right-6 top-6 flex flex-col gap-4 w-48">
              <div className="p-4 bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl shadow-xl">
                 <div className="text-[10px] font-black text-gray-500 uppercase mb-3">Pipeline Status</div>
                 <div className="space-y-3">
                    <StatusItem label="Ingestion" active={stage !== 'idle'} complete={stage === 'ready' || stage === 'search' || stage === 'retrieve' || stage === 'generate'} />
                    <StatusItem label="Query Embedding" active={stage === 'search'} complete={stage === 'retrieve' || stage === 'generate'} />
                    <StatusItem label="Retriever" active={stage === 'retrieve'} complete={stage === 'generate'} />
                    <StatusItem label="Gen AI" active={stage === 'generate'} complete={false} />
                 </div>
              </div>
              
              <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
                 <div className="flex items-center gap-2 mb-2">
                    <Info size={12} className="text-blue-400" />
                    <span className="text-[9px] font-black text-blue-400 uppercase">Did you know?</span>
                 </div>
                 <p className="text-[10px] text-blue-300 leading-relaxed font-medium italic">
                    Vector retrieval reduces hallucinations by giving the LLM "facts" to reference.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const StatusItem = ({ label, active, complete }) => (
  <div className="flex items-center justify-between">
    <span className={`text-[10px] font-bold ${active ? 'text-white' : complete ? 'text-emerald-500' : 'text-gray-700'}`}>{label}</span>
    {complete ? (
      <CheckCircle2 size={12} className="text-emerald-500" />
    ) : active ? (
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }} 
        transition={{ repeat: Infinity, duration: 1 }}
        className="w-2 h-2 bg-blue-500 rounded-full" 
      />
    ) : (
      <div className="w-2 h-2 rounded-full bg-gray-900 border border-gray-800" />
    )}
  </div>
);

export default RagPlayground;
