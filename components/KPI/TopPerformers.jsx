import React, { useMemo } from 'react';
import { Trophy, Star, Award } from 'lucide-react';

const avatars = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&mouth=smile&eyes=happy",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&mouth=smile&eyes=happy",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jocelyn&mouth=smile&eyes=happy"
];

const rankBadges = [
  { label: '#1 Top Package', color: 'from-amber-400 to-amber-600', icon: Trophy, ring: 'ring-amber-400' },
  { label: '#2 High Package', color: 'from-slate-300 to-slate-500', icon: Star, ring: 'ring-slate-400' },
  { label: '#3 Star Performer', color: 'from-amber-600 to-amber-800', icon: Award, ring: 'ring-amber-600' }
];

const TopPerformers = ({ data }) => {
  // Get top 3 students by salary
  const topSalary = useMemo(() => {
    return [...data]
      .filter(s => s.Placement_Status === 'Placed')
      .sort((a, b) => parseFloat(b.Salary_Package) - parseFloat(a.Salary_Package))
      .slice(0, 3);
  }, [data]);

  return (
    <div className="glass-card p-6 w-full relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-text flex items-center gap-2">
            Highest Packages <span className="text-amber-500">🏆</span>
          </h3>
          <p className="text-xs text-textSecondary mt-0.5">Top placed candidates across all streams</p>
        </div>
        <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          Rankings
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {topSalary.map((student, i) => {
          const RankIcon = rankBadges[i % rankBadges.length].icon;
          return (
            <div 
              key={student.Student_ID} 
              className="flex flex-col items-center p-4 border border-border rounded-2xl bg-surface dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 relative group shadow-sm hover:shadow-md"
            >
              {/* Rank Pill */}
              <div className={`text-[10px] font-extrabold text-white bg-gradient-to-r ${rankBadges[i].color} px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm mb-3`}>
                <RankIcon className="w-3 h-3" />
                <span>Rank #{i + 1}</span>
              </div>

              {/* Avatar with Glow Ring */}
              <div className={`w-16 h-16 rounded-full overflow-hidden bg-indigo-50 mb-3 ring-2 ${rankBadges[i].ring} shadow-md group-hover:scale-105 transition-transform`}>
                <img src={avatars[i % avatars.length]} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-md mb-1">
                {student.Branch}
              </span>
              <h4 className="text-xs font-bold text-text text-center">{student.Student_ID}</h4>
              
              <div className="grid grid-cols-3 gap-1 w-full mt-4 text-center border-t border-border/60 pt-3">
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-indigo-600">₹{parseFloat(student.Salary_Package).toFixed(1)}</span>
                  <span className="text-[9px] font-semibold text-textSecondary uppercase">LPA</span>
                </div>
                <div className="flex flex-col border-x border-border/60">
                  <span className="text-xs font-extrabold text-emerald-600">{student.CGPA}</span>
                  <span className="text-[9px] font-semibold text-textSecondary uppercase">CGPA</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold text-purple-600">{student.Coding_Score}</span>
                  <span className="text-[9px] font-semibold text-textSecondary uppercase">Code</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopPerformers;
