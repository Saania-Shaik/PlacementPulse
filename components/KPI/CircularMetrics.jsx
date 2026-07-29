import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Code, GraduationCap, Cpu } from 'lucide-react';

const CircularProgress = ({ value, label, color, icon: Icon, bgLight }) => {
  const data = [
    { name: 'Value', value: value },
    { name: 'Remainder', value: Math.max(0, 100 - value) }
  ];

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-24 h-24 mb-3 transition-transform group-hover:scale-105">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={40}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              cornerRadius={8}
            >
              <Cell fill={color} />
              <Cell fill={`${color}18`} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-sm font-extrabold text-text">{value.toFixed(1)}%</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: bgLight, color: color }}>
        <Icon className="w-3.5 h-3.5" />
        <span>{label}</span>
      </div>
    </div>
  );
};

const CircularMetrics = ({ data }) => {
  const metrics = useMemo(() => {
    if (!data || data.length === 0) return { cgpa: 0, coding: 0, logic: 0 };
    
    let totalCGPA = 0;
    let totalCoding = 0;
    let totalLogic = 0;
    
    for (let i = 0; i < data.length; i++) {
      totalCGPA += parseFloat(data[i].CGPA) || 0;
      totalCoding += parseInt(data[i].Coding_Score) || 0;
      totalLogic += parseInt(data[i].Logical_Reasoning_Score) || 0;
    }
    
    return {
      cgpa: (totalCGPA / data.length) * 10,
      coding: totalCoding / data.length,
      logic: totalLogic / data.length
    };
  }, [data]);

  return (
    <div className="glass-card p-6 w-full relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-text">Average Score</h3>
          <p className="text-xs text-textSecondary mt-0.5">Cohort skill proficiency metrics</p>
        </div>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Cohort Benchmarks
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-2 items-center justify-items-center">
        <CircularProgress value={metrics.coding} label="Coding" color="#522fd4" icon={Code} bgLight="#f5f3ff" />
        <CircularProgress value={metrics.cgpa} label="CGPA" color="#8b5cf6" icon={GraduationCap} bgLight="#f3e8ff" />
        <CircularProgress value={metrics.logic} label="Logic" color="#06b6d4" icon={Cpu} bgLight="#ecfeff" />
      </div>
    </div>
  );
};

export default CircularMetrics;
