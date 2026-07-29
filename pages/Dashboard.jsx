import React, { useState, useMemo, useCallback, useEffect } from 'react';
import useFilteredData from '../hooks/useFilteredData';
import { calculateKPIs } from '../utils/calculations';
import { Filter, X, TrendingUp, TrendingDown, Users, BookOpen } from 'lucide-react';
import KPICard from '../components/KPI/KPICard';
import TopNav from '../components/Navigation/TopNav';
import PlacementCharts from '../components/Charts/PlacementCharts';
import StudentTable from '../components/Table/StudentTable';
import TopPerformers from '../components/KPI/TopPerformers';
import CircularMetrics from '../components/KPI/CircularMetrics';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);
  
  const [filters, setFilters] = useState({
    branch: 'All',
    status: 'All',
    tier: 'All'
  });
  
  const { data, isLoading } = useFilteredData(filters, '');
  const kpis = useMemo(() => calculateKPIs(data), [data]);

  const handleChartClick = useCallback((filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  }, []);

  const clearFilter = (type) => {
    setFilters(prev => ({ ...prev, [type]: 'All' }));
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const activeFilterChips = Object.entries(filters).filter(([_, val]) => val !== 'All');

  return (
    <div className="min-h-screen bg-background text-text flex flex-col font-sans transition-colors duration-300">
      <TopNav isDark={isDark} setIsDark={setIsDark} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-textSecondary animate-pulse">Loading Placement Data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-in">
            
            {/* Left Column - Larger */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* Top Controls Row */}
              <div className="flex flex-wrap md:flex-nowrap gap-4">
                {/* Selectors */}
                <div className="glass-card p-4 flex gap-3 w-full md:w-auto items-center">
                  <div className="flex flex-col w-full min-w-[140px]">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-1">Branch</label>
                    <select 
                      value={filters.branch}
                      onChange={(e) => handleChartClick('branch', e.target.value)}
                      className="bg-slate-50 dark:bg-slate-800/80 text-text dark:text-slate-100 text-xs font-semibold border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full transition-all cursor-pointer"
                    >
                      <option value="All" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">All Branches</option>
                      {['CSE', 'ECE', 'AI', 'EEE', 'ME', 'Civil', 'BBA', 'MBA'].map(b => (
                        <option key={b} value={b} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">{b}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col w-full min-w-[140px]">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-textSecondary mb-1">Status</label>
                    <select 
                      value={filters.status}
                      onChange={(e) => handleChartClick('status', e.target.value)}
                      className="bg-slate-50 dark:bg-slate-800/80 text-text dark:text-slate-100 text-xs font-semibold border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full transition-all cursor-pointer"
                    >
                      <option value="All" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">All Statuses</option>
                      <option value="Placed" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">Placed</option>
                      <option value="Not Placed" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">Not Placed</option>
                    </select>
                  </div>
                </div>

                {/* KPI Cards Summary */}
                <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                  <div className="glass-card p-4 flex items-center gap-4 min-w-[190px] border-l-4 border-l-primary">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-indigo-400 font-bold shadow-sm">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xl font-extrabold text-text tracking-tight">{Number(kpis.total).toLocaleString()}</h4>
                      <p className="text-[10px] text-textSecondary font-extrabold uppercase tracking-wider">Total Students</p>
                    </div>
                  </div>
                  <div className="glass-card p-4 flex items-center gap-4 min-w-[190px] border-l-4 border-l-emerald-500">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold shadow-sm">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xl font-extrabold text-text tracking-tight">{kpis.placementRate}%</h4>
                      <p className="text-[10px] text-textSecondary font-extrabold uppercase tracking-wider">Placement Rate</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trend Pills */}
              <div className="flex flex-wrap gap-3">
                <div className="glass-card px-4 py-2 flex items-center gap-2 rounded-full shadow-sm text-xs font-bold bg-surface dark:bg-slate-800/80">
                  <span className="text-textSecondary font-medium">Average Salary:</span> 
                  <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{kpis.avgSalary} LPA</span>
                  <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="glass-card px-4 py-2 flex items-center gap-2 rounded-full shadow-sm text-xs font-bold bg-surface dark:bg-slate-800/80">
                  <span className="text-textSecondary font-medium">Highest Package:</span> 
                  <span className="text-amber-600 dark:text-amber-400 font-extrabold">{kpis.highestSalary} LPA</span>
                  <div className="p-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Charts */}
              <PlacementCharts data={data} onChartClick={handleChartClick} />

            </div>

            {/* Right Column - Top Performers & Details */}
            <div className="xl:col-span-1 flex flex-col gap-6">
              
              {/* Top Performers (Best in Marks / Attendance mapping) */}
              <TopPerformers data={data} />
              
              {/* Average Circular Metrics */}
              <CircularMetrics data={data} />

              {/* Insights Panel mapped to Student Table/Details */}
              <div className="glass-card flex-1 flex flex-col overflow-hidden h-[400px]">
                <StudentTable data={data} />
              </div>

            </div>

          </div>
        )}
      </main>
    </div>
  );
}
