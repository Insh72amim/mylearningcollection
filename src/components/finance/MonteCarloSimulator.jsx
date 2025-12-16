import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCw, Play, Settings, TrendingUp, Activity } from 'lucide-react';

const MonteCarloSimulator = () => {
  // Inputs
  const [S0, setS0] = useState(100);       // Initial Price
  const [mu, setMu] = useState(0.10);      // Drift (Expected Return)
  const [sigma, setSigma] = useState(0.20);// Volatility
  const [T, setT] = useState(1.0);         // Time Horizon (Years)
  const [steps, setSteps] = useState(50);  // Time Steps
  const [numPaths, setNumPaths] = useState(20); // Number of Paths
  
  const [paths, setPaths] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Box-Muller Transform for generating Standard Normal Random Variables
  const randn_bm = () => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); 
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  };

  const generatePaths = useCallback(() => {
    setIsSimulating(true);
    // Slight delay to show loading state if needed, but synchronous is fine for small N
    setTimeout(() => {
      const dt = T / steps;
      const allPaths = [];

      for (let i = 0; i < numPaths; i++) {
        const path = [{ step: 0, time: 0, value: S0 }];
        let currentS = S0;

        for (let t = 1; t <= steps; t++) {
          const z = randn_bm();
          // Geometric Brownian Motion: S(t+dt) = S(t) * exp((mu - 0.5*sigma^2)*dt + sigma*sqrt(dt)*Z)
          const drift = (mu - 0.5 * sigma * sigma) * dt;
          const diffusion = sigma * Math.sqrt(dt) * z;
          currentS = currentS * Math.exp(drift + diffusion);
          
          path.push({
            step: t,
            time: (t * dt).toFixed(2),
            value: Number(currentS.toFixed(2))
          });
        }
        allPaths.push(path);
      }
      
      const chartData = [];
      for(let t=0; t<=steps; t++) {
         const point = { time: (t * (T/steps)).toFixed(2) };
         allPaths.forEach((path, idx) => {
             point[`path${idx}`] = path[t].value;
         });
         chartData.push(point);
      }

      setPaths(chartData);
      setIsSimulating(false);
    }, 50);
  }, [S0, mu, sigma, T, steps, numPaths]);

  // Initial Run
  useEffect(() => {
    generatePaths();
  }, [S0, mu, sigma, T, steps, numPaths]); // Auto-regen on param change is usually better for "Playground" feel

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-600/20 rounded-lg border border-purple-500/30">
            <Activity className="text-purple-400" size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Monte Carlo Asset Simulator</h3>
        </div>
        <button 
          onClick={generatePaths}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-md transition-colors"
        >
          <RefreshCw size={14} className={isSimulating ? "animate-spin" : ""} />
          Regenerate Paths
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Controls */}
        <div className="p-6 bg-gray-800/30 border-r border-gray-700 lg:w-72 space-y-6">
           <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
             <Settings size={16} /> Parameters
           </h4>

           {/* Volatility */}
           <div className="space-y-2">
             <div className="flex justify-between text-sm">
               <span className="text-gray-300">Volatility (σ)</span>
               <span className="font-mono text-purple-400">{(sigma*100).toFixed(0)}%</span>
             </div>
             <input type="range" min="0.05" max="1.0" step="0.05" value={sigma} onChange={e => setSigma(Number(e.target.value))} className="w-full accent-purple-500"/>
             <p className="text-xs text-gray-500">Uncertainty/Risk</p>
           </div>

           {/* Drift */}
           <div className="space-y-2">
             <div className="flex justify-between text-sm">
               <span className="text-gray-300">Drift (μ)</span>
               <span className="font-mono text-green-400">{(mu*100).toFixed(0)}%</span>
             </div>
             <input type="range" min="-0.2" max="0.5" step="0.01" value={mu} onChange={e => setMu(Number(e.target.value))} className="w-full accent-green-500"/>
             <p className="text-xs text-gray-500">Expected Annual Return</p>
           </div>

           {/* Time Horizon */}
            <div className="space-y-2">
             <div className="flex justify-between text-sm">
               <span className="text-gray-300">Time (T)</span>
               <span className="font-mono text-blue-400">{T} Yrs</span>
             </div>
             <input type="range" min="0.5" max="5.0" step="0.5" value={T} onChange={e => setT(Number(e.target.value))} className="w-full accent-blue-500"/>
           </div>
           
           {/* Path Count */}
            <div className="space-y-2">
             <div className="flex justify-between text-sm">
               <span className="text-gray-300"># Paths</span>
               <span className="font-mono text-gray-400">{numPaths}</span>
             </div>
             <input type="range" min="5" max="100" step="5" value={numPaths} onChange={e => setNumPaths(Number(e.target.value))} className="w-full accent-gray-500"/>
           </div>

        </div>

        {/* Chart */}
        <div className="flex-1 p-6">
           <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4 h-[400px]">
             <h4 className="text-sm font-medium text-gray-400 mb-4 text-center">
                Geometric Brownian Motion Paths (GBM)
             </h4>
             <ResponsiveContainer width="100%" height="90%">
               <LineChart data={paths}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                 <XAxis dataKey="time" stroke="#9ca3af" label={{ value: 'Time (Years)', position: 'insideBottom', offset: -5 }} />
                 <YAxis domain={['auto', 'auto']} stroke="#9ca3af" />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#4b5563', color: '#fff' }}
                    labelFormatter={(val) => `Time: ${val}`}
                    formatter={(val) => [`$${val}`, 'Price']}
                 />
                 {/* Render Lines */}
                 {Array.from({ length: numPaths }).map((_, idx) => (
                    <Line 
                      key={idx} 
                      type="monotone" 
                      dataKey={`path${idx}`} 
                      stroke={idx % 2 === 0 ? "#8b5cf6" : "#6366f1"} // Alternate colors
                      strokeWidth={1} 
                      dot={false}
                      strokeOpacity={0.6}
                    />
                 ))}
                 
                 {/* Reference Line for Start Price */}
                 <Line type="monotone" dataKey={() => S0} stroke="#9ca3af" strokeDasharray="5 5" strokeWidth={1} dot={false} />

               </LineChart>
             </ResponsiveContainer>
           </div>
           <p className="mt-4 text-xs text-gray-500 text-center italic">
              $dS = \mu S dt + \sigma S dz$ (Random Walk with Drift)
           </p>
        </div>
      </div>
    </div>
  );
};

export default MonteCarloSimulator;
