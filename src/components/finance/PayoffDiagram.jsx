import React from "react";

const PayoffDiagram = ({ type, title }) => {
  // Simple payoff diagrams using SVG
  // Can be extended for more complex strategies
  
  const getPath = () => {
    switch (type) {
      case "long_call":
        // Long Call: Max(S-K, 0) - Premium
        return (
          <>
            <path d="M 50 250 L 200 250 L 350 100" stroke="#4ade80" strokeWidth="3" fill="none" />
            <line x1="50" y1="200" x2="350" y2="200" stroke="#6b7280" strokeDasharray="4" />
            <text x="210" y="270" fill="#9ca3af" fontSize="12">K (Strike)</text>
            <text x="300" y="80" fill="#4ade80" fontSize="12">Profit</text>
            <text x="60" y="240" fill="#ef4444" fontSize="12">Loss (Premium)</text>
          </>
        );
      case "short_call":
        return (
          <>
             <path d="M 50 150 L 200 150 L 350 300" stroke="#ef4444" strokeWidth="3" fill="none" />
             <line x1="50" y1="200" x2="350" y2="200" stroke="#6b7280" strokeDasharray="4" />
             <text x="210" y="140" fill="#9ca3af" fontSize="12">K (Strike)</text>
             <text x="60" y="140" fill="#4ade80" fontSize="12">Profit (Premium)</text>
             <text x="300" y="280" fill="#ef4444" fontSize="12">Unlimited Loss</text>
          </>
        );
      case "long_put":
        return (
          <>
            <path d="M 50 100 L 200 250 L 350 250" stroke="#4ade80" strokeWidth="3" fill="none" />
            <line x1="50" y1="200" x2="350" y2="200" stroke="#6b7280" strokeDasharray="4" />
             <text x="190" y="270" fill="#9ca3af" fontSize="12">K (Strike)</text>
             <text x="60" y="80" fill="#4ade80" fontSize="12">Profit</text>
             <text x="280" y="240" fill="#ef4444" fontSize="12">Loss (Premium)</text>
          </>
        );
       case "bull_spread":
        return (
          <>
             <path d="M 50 250 L 150 250 L 250 150 L 350 150" stroke="#60a5fa" strokeWidth="3" fill="none" />
             <line x1="50" y1="200" x2="350" y2="200" stroke="#6b7280" strokeDasharray="4" />
             <text x="140" y="270" fill="#9ca3af" fontSize="12">K1</text>
             <text x="240" y="270" fill="#9ca3af" fontSize="12">K2</text>
             <text x="80" y="240" fill="#ef4444" fontSize="12">Limited Loss</text>
             <text x="280" y="140" fill="#4ade80" fontSize="12">Limited Profit</text>
          </>
        );
       case "straddle":
        return (
           <>
             <path d="M 50 100 L 200 250 L 350 100" stroke="#c084fc" strokeWidth="3" fill="none" />
             <line x1="50" y1="200" x2="350" y2="200" stroke="#6b7280" strokeDasharray="4" />
              <text x="190" y="270" fill="#9ca3af" fontSize="12">K (Strike)</text>
              <text x="320" y="80" fill="#4ade80" fontSize="12">Profit</text>
              <text x="200" y="240" fill="#ef4444" fontSize="12">Max Loss</text>
           </>
        );
      default:
        return null; // Handle unknown types
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 flex flex-col items-center">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <svg width="400" height="300" viewBox="0 0 400 300">
        {/* Axes */}
        <line x1="50" y1="50" x2="50" y2="250" stroke="#4b5563" strokeWidth="2" />
        <line x1="50" y1="250" x2="350" y2="250" stroke="#4b5563" strokeWidth="2" />
        
        {/* Labels */}
        <text x="360" y="255" fill="#9ca3af" fontSize="12">Stock Price (ST)</text>
        <text x="10" y="40" fill="#9ca3af" fontSize="12">P/L</text>
        
        {/* Strategy Path */}
        {getPath()}
      </svg>
    </div>
  );
};

export default PayoffDiagram;
