import React, { useMemo } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import { aggregateByBranch } from '../../utils/calculations';

// New Theme Colors
const COLORS = ['#3b82f6', '#06b6d4', '#a855f7', '#10b981', '#f59e0b', '#ec4899', '#f43f5e', '#8b5cf6'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-border p-3 rounded-lg shadow-xl text-sm">
        <p className="font-semibold mb-1 text-text">{label || payload[0].name}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="flex items-center gap-2" style={{ color: entry.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            {entry.name}: <span className="font-medium">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PlacementCharts = ({ data, onChartClick }) => {
  const branchData = useMemo(() => {
    const raw = aggregateByBranch(data);
    // Sort by total placed descending for better visualization
    return raw.sort((a, b) => b.placed - a.placed);
  }, [data]);

  const totalPlaced = branchData.reduce((acc, curr) => acc + curr.placed, 0);

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* Placements by Branch - Donut Chart + Custom Legend */}
      <div className="glass-card p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-text">Placements by Branch</h3>
            <p className="text-xs text-textSecondary mt-0.5">Total Placed: <strong className="text-primary">{totalPlaced.toLocaleString()}</strong> students</p>
          </div>
          <div className="flex gap-4 text-xs font-semibold text-primary">
            <span>Branch &darr;</span>
            <span>Count &darr;</span>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Donut Chart */}
          <div className="relative w-64 h-64 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={branchData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="placed"
                  nameKey="branch"
                  onClick={(entry) => onChartClick('branch', entry.branch)}
                  className="cursor-pointer focus:outline-none"
                  stroke="none"
                >
                  {branchData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-text">{((branchData[0]?.placed / totalPlaced) * 100 || 0).toFixed(1)}%</span>
              <span className="text-xs text-textSecondary uppercase font-bold tracking-wider">{branchData[0]?.branch}</span>
            </div>
          </div>

          {/* Custom Horizontal Bar Legend - All Branches */}
          <div className="flex-1 w-full space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {branchData.map((entry, index) => {
              const percentage = totalPlaced > 0 ? (entry.placed / totalPlaced) * 100 : 0;
              return (
                <div key={entry.branch} className="flex items-center gap-4 w-full">
                  <div className="flex items-center gap-2 w-24 flex-shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    <span className="text-sm font-semibold text-textSecondary">{entry.branch}</span>
                  </div>
                  <div className="flex-1 bg-slate-100 rounded-full h-4 overflow-hidden relative">
                    <div 
                      className="absolute top-0 left-0 h-full rounded-full flex items-center pl-2 transition-all duration-500"
                      style={{ width: `${percentage}%`, backgroundColor: COLORS[index % COLORS.length] }}
                    >
                      <span className="text-[10px] font-bold text-white leading-none">{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-text w-12 text-right">{entry.placed.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Average Salary by Branch - Bar Chart */}
      <div className="glass-card p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-text">Average Salary by Branch</h3>
            <p className="text-xs text-textSecondary mt-0.5">Package breakdown per specialization (in LPA)</p>
          </div>
          <div className="flex gap-4 text-xs font-semibold text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
            <span>Branch &darr;</span>
            <span>Salary &darr;</span>
          </div>
        </div>
        
        <div className="h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={branchData}
              margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
              barGap={4}
            >
              <defs>
                <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#4338ca" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef1f6" />
              <XAxis dataKey="branch" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 600}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: '#6366f1', opacity: 0.06}} />
              <Bar dataKey="avgSalary" name="Average Salary (LPA)" fill="url(#salaryGradient)" radius={[8, 8, 0, 0]} maxBarSize={44} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default PlacementCharts;
