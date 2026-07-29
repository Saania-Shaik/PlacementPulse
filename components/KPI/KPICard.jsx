import React from 'react';
import CountUp from 'react-countup';

const KPICard = ({ title, value, prefix = '', suffix = '', isCurrency = false, trend = null }) => {
  const numValue = Number(value) || 0;
  
  return (
    <div className="glass-card p-6 flex flex-col justify-between group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-textSecondary font-medium text-sm">{title}</h3>
        {/* Simple mock sparkline for visual appeal */}
        <div className="w-16 h-8 opacity-50 group-hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 100 30" className="w-full h-full stroke-primary fill-none stroke-2">
            <path d="M0,25 C20,25 20,5 40,15 C60,25 80,10 100,5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      
      <div>
        <div className="text-3xl font-bold tracking-tight text-text flex items-end gap-1">
          {prefix && <span className="text-xl font-medium text-textSecondary">{prefix}</span>}
          <CountUp 
            end={numValue} 
            duration={2} 
            separator="," 
            decimals={isCurrency || numValue % 1 !== 0 ? 1 : 0}
          />
          {suffix && <span className="text-lg font-medium text-textSecondary">{suffix}</span>}
        </div>
        
        {trend && (
          <div className="mt-2 text-xs font-medium text-success bg-success/10 w-fit px-2 py-1 rounded-full flex items-center gap-1">
            <span>📈</span>
            {trend}
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;
