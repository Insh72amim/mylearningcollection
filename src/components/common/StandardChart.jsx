import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-3 rounded shadow-lg">
        <p className="text-gray-300 font-medium mb-1">{`X: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const StandardChart = ({ data, type = "line", title, xKey = "x", lines = [] }) => {
  return (
    <div className="w-full h-[350px] bg-gray-900 rounded-xl border border-gray-700 p-4">
      {title && (
        <h4 className="text-sm font-semibold text-gray-400 mb-4 text-center uppercase tracking-wider">
          {title}
        </h4>
      )}
      <ResponsiveContainer width="100%" height="100%">
        {type === 'line' && (
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey={xKey} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {lines.map((line, idx) => (
              <Line
                key={idx}
                type="monotone"
                dataKey={line.key}
                name={line.name || line.key}
                stroke={line.color || "#8884d8"}
                activeDot={{ r: 8 }}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        )}

        {type === 'area' && (
           <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey={xKey} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {lines.map((line, idx) => (
                <Area 
                    key={idx}
                    type="monotone" 
                    dataKey={line.key} 
                    name={line.name}
                    stroke={line.color} 
                    fillOpacity={1} 
                    fill={`url(#${line.gradientId})`} 
                />
            ))}
          </AreaChart>
        )}

        {type === 'bar' && (
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey={xKey} stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                <Legend />
                 {lines.map((line, idx) => (
                    <Bar key={idx} dataKey={line.key} name={line.name} fill={line.color} />
                 ))}
            </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default StandardChart;
