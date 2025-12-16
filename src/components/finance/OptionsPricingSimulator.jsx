import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Settings, TrendingUp, Activity, Clock, Percent } from 'lucide-react';

const OptionsPricingSimulator = () => {
  // --- State for Inputs ---
  const [S, setS] = useState(100);    // Stock Price
  const [K, setK] = useState(100);    // Strike Price
  const [T, setT] = useState(1);      // Time to Maturity (years)
  const [r, setR] = useState(0.05);   // Risk-free Rate (5%)
  const [sigma, setSigma] = useState(0.2); // Volatility (20%)

  // --- Black-Scholes Math ---
  // Cumulative Normal Distribution Function
  const N = (x) => {
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    const sign = (x < 0) ? -1 : 1;
    x = Math.abs(x) / Math.sqrt(2.0);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return 0.5 * (1.0 + sign * y);
  };
  
  // Standard Normal Probability Density Function
  const n = (x) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);

  const calculateBS = (sVal, kVal, tVal, rVal, sigmaVal) => {
    // Avoid division by zero
    if (tVal <= 0 || sigmaVal <= 0) return { call: Math.max(0, sVal - kVal), put: Math.max(0, kVal - sVal), deltaCall: 0, deltaPut: 0, gamma: 0, theta: 0, vega: 0 };

    const d1 = (Math.log(sVal / kVal) + (rVal + 0.5 * sigmaVal * sigmaVal) * tVal) / (sigmaVal * Math.sqrt(tVal));
    const d2 = d1 - sigmaVal * Math.sqrt(tVal);

    const Nd1 = N(d1);
    const Nd2 = N(d2);
    const Nnegd1 = N(-d1);
    const Nnegd2 = N(-d2);
    const nd1 = n(d1);

    const callPrice = sVal * Nd1 - kVal * Math.exp(-rVal * tVal) * Nd2;
    const putPrice = kVal * Math.exp(-rVal * tVal) * Nnegd2 - sVal * Nnegd1;

    // Greeks
    const deltaCall = Nd1;
    const deltaPut = Nd1 - 1;
    const gamma = nd1 / (sVal * sigmaVal * Math.sqrt(tVal));
    const vega = sVal * Math.sqrt(tVal) * nd1 / 100; // Divide by 100 for % change
    const thetaCall = (- (sVal * nd1 * sigmaVal) / (2 * Math.sqrt(tVal)) - rVal * kVal * Math.exp(-rVal * tVal) * Nd2) / 365; // Daily decay
    const thetaPut = (- (sVal * nd1 * sigmaVal) / (2 * Math.sqrt(tVal)) + rVal * kVal * Math.exp(-rVal * tVal) * Nnegd2) / 365;

    return { 
      call: callPrice, 
      put: putPrice, 
      deltaCall, 
      deltaPut, 
      gamma, 
      vega, 
      thetaCall, 
      thetaPut 
    };
  };

  const results = useMemo(() => calculateBS(S, K, T, r, sigma), [S, K, T, r, sigma]);

  // --- Chart Data Generation ---
  const chartData = useMemo(() => {
    const data = [];
    const range = 50; // Plot +/- 50 around current price or strike
    const center = K; 
    const step = 2; // Step size

    for (let price = center - range; price <= center + range; price += step) {
       if (price <= 0) continue;
       const res = calculateBS(price, K, T, r, sigma);
       // Intrinsic Value (Payoff at Expiry)
       const intrinsicCall = Math.max(0, price - K);
       const intrinsicPut = Math.max(0, K - price);

       data.push({
         name: price,
         callPrice: res.call.toFixed(2),
         putPrice: res.put.toFixed(2),
         intrinsicCall: intrinsicCall.toFixed(2),
         intrinsicPut: intrinsicPut.toFixed(2),
         gamma: res.gamma.toFixed(4) * 1000, // Scale for visibility
       });
    }
    return data;
  }, [K, T, r, sigma]); // Re-calculate grid when params change (S is X-axis so doesn't trigger regen, but S marker does)


  // --- Helper Components ---
  const SliderControl = ({ label, value, onChange, min, max, step, format = (v) => v }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        <span className="text-sm font-mono text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded border border-blue-800">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
      />
    </div>
  );

  const StatCard = ({ title, value, subValue, icon: Icon, colorClass }) => (
    <div className={`bg-gray-800/80 border border-gray-700 rounded-lg p-3 flex-1 min-w-[140px] ${colorClass}`}>
      <div className="flex items-center gap-2 mb-2 opacity-80">
        {Icon && <Icon size={16} />}
        <span className="text-xs font-semibold uppercase tracking-wider">{title}</span>
      </div>
      <div className="text-2xl font-bold font-mono">{typeof value === 'number' ? value.toFixed(2) : value}</div>
      {subValue && <div className="text-xs opacity-60 mt-1">{subValue}</div>}
    </div>
  );

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
            <Activity className="text-blue-400" size={20} />
          </div>
          <h3 className="text-lg font-bold text-white">Black-Scholes Options Simulator</h3>
        </div>
        <div className="text-xs text-gray-500 font-mono">Real-time Pricing Model</div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Controls Panel */}
        <div className="p-6 bg-gray-800/30 border-r border-gray-700 lg:w-80 space-y-6">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            <Settings size={16} /> Market Inputs
          </h4>
          
          <SliderControl 
            label="Stock Price (S)" 
            value={S} 
            onChange={setS} 
            min={10} max={200} step={1} 
            format={v => `$${v}`}
          />
          <SliderControl 
            label="Strike Price (K)" 
            value={K} 
            onChange={setK} 
            min={10} max={200} step={1} 
            format={v => `$${v}`}
          />
          <SliderControl 
            label="Volatility (σ)" 
            value={sigma} 
            onChange={setSigma} 
            min={0.01} max={1.0} step={0.01} 
            format={v => `${(v*100).toFixed(0)}%`}
          />
          <SliderControl 
            label="Time to Expiry (T)" 
            value={T} 
            onChange={setT} 
            min={0.01} max={5} step={0.01} 
            format={v => `${v.toFixed(2)} Yrs`}
          />
          <SliderControl 
            label="Risk-free Rate (r)" 
            value={r} 
            onChange={setR} 
            min={0} max={0.2} step={0.005} 
            format={v => `${(v*100).toFixed(1)}%`}
          />
        </div>

        {/* Main Display Area */}
        <div className="flex-1 p-6 space-y-6">
          
          {/* Output Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {/* Call Price */}
             <StatCard 
               title="Call Price" 
               value={results.call} 
               subValue="Right to BUY" 
               icon={TrendingUp} 
               colorClass="text-green-400 border-green-900/50 bg-green-900/10"
             />
             {/* Put Price */}
             <StatCard 
               title="Put Price" 
               value={results.put} 
               subValue="Right to SELL" 
               icon={TrendingUp} 
               colorClass="text-red-400 border-red-900/50 bg-red-900/10" // Put usually red/bearish context (simplified)
             />
             {/* Delta */}
             <StatCard 
               title="Delta (Δ)" 
               value={results.deltaCall} 
               subValue={`Put Δ: ${results.deltaPut.toFixed(2)}`}
               icon={Percent} 
               colorClass="text-blue-400 border-blue-900/50 bg-blue-900/10"
             />
             {/* Theta */}
             <StatCard 
               title="Theta (Θ)" 
               value={results.thetaCall} 
               subValue="Daily Decay" 
               icon={Clock} 
               colorClass="text-yellow-400 border-yellow-900/50 bg-yellow-900/10"
             />
          </div>

          {/* Visualization Chart */}
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4 h-[350px]">
            <h4 className="text-sm font-medium text-gray-400 mb-4 text-center">Option Price vs Stock Price (Payoff Diagram)</h4>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  stroke="#9ca3af" 
                  label={{ value: 'Stock Price ($)', position: 'insideBottom', offset: -5 }} 
                  domain={['dataMin', 'dataMax']}
                />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#4b5563', color: '#fff' }}
                />
                <Legend verticalAlign="top"/>
                
                {/* Intrinsic Values (Dashed) */}
                <Line type="monotone" dataKey="intrinsicCall" stroke="#22c55e" strokeDasharray="3 3" name="Intrinsic (Call)" dot={false} strokeWidth={1} />
                
                {/* Real Option Prices (Solid) */}
                <Line type="monotone" dataKey="callPrice" stroke="#4ade80" strokeWidth={3} name="Call Price (Model)" dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="putPrice" stroke="#f87171" strokeWidth={3} name="Put Price (Model)" dot={false} />

                {/* Current Stock Price Reference Line would be cool but Recharts RefLine is static mostly, we use a dot maybe? */}
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500 bg-gray-900/50 p-3 rounded-lg border border-gray-700/50">
             <div>
               <strong className="text-gray-400 block mb-1">Delta (Δ):</strong>
               Sensitivity to stock price. Call Delta approaches 1.0 as it goes Deep ITM (behaves like stock).
             </div>
             <div>
               <strong className="text-gray-400 block mb-1">Theta (Θ):</strong>
               Time decay. Options lose value every day as they approach expiry ($T \to 0$), especially ATM options.
             </div>
             <div>
               <strong className="text-gray-400 block mb-1">Vega (ν):</strong>
               Sensitivity to volatility. Higher $\sigma$ increases the value of both Calls and Puts (more chance to end ITM).
             </div>
             <div>
               <strong className="text-gray-400 block mb-1">Gamma (Γ):</strong>
               Rate of change of Delta. Highest for At-The-Money (ATM) options. Explodes as $T \to 0$.
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OptionsPricingSimulator;
