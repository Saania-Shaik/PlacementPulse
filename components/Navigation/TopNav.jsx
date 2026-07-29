import React, { useState } from 'react';
import { Bell, PlayCircle, Settings, Moon, Sun, RefreshCw, X, Check, Download, Sliders } from 'lucide-react';

const TopNav = ({ isDark, setIsDark }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('3min ago');
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated('Just now');
      triggerToast('Data refreshed successfully!');
    }, 1000);
  };

  const handlePlayDemo = () => {
    triggerToast('🚀 Interactive Mode: Click on any branch or chart slice to filter data!');
  };

  return (
    <nav className="w-full bg-[#1f0b3e] text-white px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 relative z-50 shadow-md">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2 animate-slide-up">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)}><X className="w-3 h-3" /></button>
        </div>
      )}

      {/* Left side: Title */}
      <div className="flex items-center gap-3 self-start md:self-auto">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold leading-tight tracking-wide">Placement Plus</h1>
          <span className="text-xs text-indigo-200/80">Student Placement Dashboard</span>
        </div>
      </div>

      {/* Center/Right: Actions & Profile */}
      <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
        {/* Icons */}
        <div className="flex items-center gap-3 md:gap-4 text-indigo-200">
          
          {/* Notifications Button */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowSettings(false);
              }}
              className="hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-100 p-4 animate-fade-in z-50">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-sm text-slate-900">Notifications</h4>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3 mt-3">
                  <div className="p-2.5 rounded-lg bg-indigo-50/50 hover:bg-indigo-50 transition-colors">
                    <p className="text-xs font-semibold text-slate-800">Placement Batch 2026 Updated</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">35 new students placed in CSE branch with average 12 LPA package.</p>
                    <span className="text-[10px] text-indigo-600 font-medium mt-1 block">10 mins ago</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                    <p className="text-xs font-semibold text-slate-800">Highest Package Record</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Highest package reached ₹45.0 LPA in AI Branch.</p>
                    <span className="text-[10px] text-emerald-600 font-medium mt-1 block">1 hour ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Play / Interactive Tour Button */}
          <button 
            onClick={handlePlayDemo}
            className="hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
            title="Interactive Demo Mode"
          >
            <PlayCircle className="w-5 h-5" />
          </button>

          {/* Settings Button */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowSettings(!showSettings);
                setShowNotifications(false);
              }}
              className="hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
              title="Dashboard Settings"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Settings Popover */}
            {showSettings && (
              <div className="absolute right-0 mt-3 w-72 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-100 p-4 animate-fade-in z-50">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <h4 className="font-bold text-sm text-slate-900">Dashboard Options</h4>
                  <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3 mt-3 text-xs">
                  <button 
                    onClick={() => {
                      setIsDark(!isDark);
                      triggerToast(isDark ? 'Switched to Light Mode' : 'Switched to Dark Mode');
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <span className="font-medium text-slate-700 flex items-center gap-2">
                      {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                      Appearance
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">{isDark ? 'Dark' : 'Light'}</span>
                  </button>
                  <button 
                    onClick={() => {
                      handleRefresh();
                      setShowSettings(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <span className="font-medium text-slate-700 flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-emerald-500" />
                      Sync Records
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600">Live</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={() => {
              setIsDark(!isDark);
              triggerToast(isDark ? 'Switched to Light Mode' : 'Switched to Dark Mode');
            }}
            className="hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-6 w-px bg-white/10"></div>

        {/* Last Updated & Refresh Button */}
        <div className="flex items-center gap-2 text-xs text-indigo-200">
          <span>Last updated <strong className="text-white">{lastUpdated}</strong></span>
          <button 
            onClick={handleRefresh}
            className="hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-primary' : ''}`} />
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-indigo-200 hidden sm:inline">Signed in as <strong className="text-white">Admin</strong></span>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-purple-500 border border-white/20 shadow-sm">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carter&mouth=smile&eyes=happy" alt="Admin Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
