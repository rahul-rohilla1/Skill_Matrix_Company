import React from 'react';
import { SKILL_DEFINITIONS } from '../constants';

const SkillLegend: React.FC = () => {
    return (
        <div className="flex items-center gap-2 mb-4 flex-wrap relative z-50">
             <div className="text-xs font-semibold text-slate-400 uppercase mr-2">Skill Levels:</div>
             <div className="flex gap-3">
                 {SKILL_DEFINITIONS.map((def) => (
                     <div key={def.level} className="group relative flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm cursor-help transition-all hover:border-blue-300 hover:shadow-md">
                         <span className={`
                            w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold
                            ${def.level === 0 ? 'bg-slate-100 text-slate-500' : ''}
                            ${def.level === 1 ? 'bg-red-50 text-red-600' : ''}
                            ${def.level === 2 ? 'bg-orange-50 text-orange-600' : ''}
                            ${def.level === 3 ? 'bg-yellow-50 text-yellow-700' : ''}
                            ${def.level === 4 ? 'bg-green-50 text-green-700' : ''}
                            ${def.level === 5 ? 'bg-emerald-100 text-emerald-800' : ''}
                         `}>
                             {def.level}
                         </span>
                         <span className="text-xs font-medium text-slate-600">{def.label}</span>
                         
                         {/* Tooltip */}
                         <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-[100] shadow-lg text-center">
                             {def.description}
                             <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    );
};

export default SkillLegend;