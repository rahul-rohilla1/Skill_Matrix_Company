import React, { useState } from 'react';
import { TeamMember, ViewType } from '../types';
import { DOMAIN_SKILLS, TOOL_SKILLS, STATUS_COLORS } from '../constants';
import { Edit3, Trash2, Eye } from 'lucide-react';

interface Props {
    data: TeamMember[];
    view: ViewType;
    onEditUser: (id: string) => void;
    onDeleteUser: (id: string) => void;
    onSkillUpdate: (id: string, key: string, value: number) => void;
    onViewChart: (user: TeamMember) => void;
}

const SkillTable: React.FC<Props> = ({ data, view, onEditUser, onDeleteUser, onSkillUpdate, onViewChart }) => {
    const [sortCol, setSortCol] = useState<string | null>(null);
    const [sortAsc, setSortAsc] = useState(true);
    const [editCell, setEditCell] = useState<{id: string | number, key: string} | null>(null);

    const handleSort = (col: string) => {
        if (sortCol === col) setSortAsc(!sortAsc);
        else {
            setSortCol(col);
            setSortAsc(true);
        }
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortCol) return 0;
        const valA = a[sortCol];
        const valB = b[sortCol];
        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
    });

    const getSkillColor = (val: number) => {
        switch(val) {
            case 0: return 'bg-slate-100 text-slate-400';
            case 1: return 'bg-red-50 text-red-600';
            case 2: return 'bg-orange-50 text-orange-600';
            case 3: return 'bg-yellow-50 text-yellow-700';
            case 4: return 'bg-green-50 text-green-700';
            case 5: return 'bg-emerald-100 text-emerald-800 font-bold border border-emerald-200';
            default: return 'bg-slate-100';
        }
    };

    const renderSkillCell = (item: TeamMember, key: string) => {
        const isEditing = editCell?.id === item.id && editCell?.key === key;
        const value = item[key];

        if (isEditing) {
            return (
                <select 
                    autoFocus
                    className="w-full p-1 text-xs border rounded bg-white shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                    value={value}
                    onChange={(e) => {
                        onSkillUpdate(String(item.id), key, parseInt(e.target.value));
                        setEditCell(null);
                    }}
                    onBlur={() => setEditCell(null)}
                >
                    {[0,1,2,3,4,5].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
            )
        }

        return (
            <button 
                onClick={() => setEditCell({ id: item.id, key })}
                className={`w-7 h-7 rounded-md flex items-center justify-center text-xs transition-transform hover:scale-110 ${getSkillColor(value)}`}
            >
                {value}
            </button>
        );
    };

    const showDomain = view === 'all' || view === 'domain';
    const showTools = view === 'all' || view === 'tools';

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
            <div className="overflow-auto flex-1 relative">
                <table className="w-full border-collapse text-left text-sm">
                    <thead className="bg-slate-50/80 backdrop-blur-md sticky top-0 z-40 shadow-sm">
                        {/* Top Grouping Header */}
                        <tr className="border-b border-slate-200">
                            <th colSpan={8} className="p-3 text-center text-xs font-semibold text-slate-500 bg-slate-50 border-r border-slate-200">Employee Details</th>
                            {showDomain && <th colSpan={15} className="p-2 text-center text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 border-r border-blue-600">DOMAIN EXPERTISE</th>}
                            {showTools && <th colSpan={17} className="p-2 text-center text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600">TOOLS & TECHNOLOGIES</th>}
                            <th className="bg-slate-50 sticky right-0 z-50 border-l border-slate-200"></th>
                        </tr>
                        
                        {/* Main Column Header */}
                        <tr className="text-xs font-semibold text-slate-600 border-b border-slate-200">
                            {/* Sticky Columns Headers */}
                            <th 
                                className="p-3 w-[50px] min-w-[50px] whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors border-r border-slate-100 sticky left-0 z-50 bg-slate-50" 
                                onClick={() => handleSort('sno')}
                            >
                                S.No
                            </th>
                            <th 
                                className="p-3 w-[80px] min-w-[80px] whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors border-r border-slate-100 sticky left-[50px] z-50 bg-slate-50" 
                                onClick={() => handleSort('id')}
                            >
                                ID
                            </th>
                            <th 
                                className="p-3 w-[200px] min-w-[200px] max-w-[200px] whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors border-r border-slate-100 sticky left-[130px] z-50 bg-slate-50 shadow-[4px_0_6px_-2px_rgba(0,0,0,0.1)]" 
                                onClick={() => handleSort('name')}
                            >
                                Name
                            </th>

                            {/* Scrollable Employee Details */}
                            {['Status', 'Alignment', 'Manager', 'Role', 'Client'].map((h, i) => (
                                <th key={i} className="p-3 whitespace-nowrap cursor-pointer hover:bg-slate-100 transition-colors border-r border-slate-100" onClick={() => handleSort(h.toLowerCase().replace(/\s/g, ''))}>
                                    {h}
                                </th>
                            ))}

                            {showDomain && DOMAIN_SKILLS.map(skill => (
                                <th key={skill.key} className="p-2 min-w-[60px] text-center cursor-pointer hover:bg-blue-50 text-blue-900 border-r border-blue-50/50" title={skill.label} onClick={() => handleSort(skill.key)}>
                                    <span className="block truncate w-full text-[10px]">{skill.label}</span>
                                </th>
                            ))}

                            {showTools && TOOL_SKILLS.map(skill => (
                                <th key={skill.key} className="p-2 min-w-[60px] text-center cursor-pointer hover:bg-purple-50 text-purple-900 border-r border-purple-50/50" title={skill.label} onClick={() => handleSort(skill.key)}>
                                    <span className="block truncate w-full text-[10px]">{skill.label}</span>
                                </th>
                            ))}
                             <th className="p-3 text-center bg-slate-50 sticky right-0 z-50 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.1)] border-l border-slate-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {sortedData.length === 0 ? (
                            <tr><td colSpan={40} className="p-10 text-center text-slate-400">No records found</td></tr>
                        ) : sortedData.map((item, idx) => (
                            <tr key={item.id} className="group hover:bg-blue-50/30 transition-colors">
                                {/* Sticky Columns Body */}
                                <td className="p-3 text-slate-500 border-r border-slate-50 sticky left-0 z-30 bg-white group-hover:bg-slate-50">{idx + 1}</td>
                                <td className="p-3 font-mono text-xs text-slate-500 border-r border-slate-50 cursor-pointer hover:text-blue-600 hover:underline sticky left-[50px] z-30 bg-white group-hover:bg-slate-50" onClick={() => onViewChart(item)}>{item.id}</td>
                                <td className="p-3 font-medium text-slate-800 border-r border-slate-50 min-w-[200px] max-w-[200px] cursor-pointer hover:text-blue-600 sticky left-[130px] z-30 bg-white group-hover:bg-slate-50 shadow-[4px_0_6px_-2px_rgba(0,0,0,0.05)]" onClick={() => onViewChart(item)}>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                            {item.name.charAt(0)}
                                        </div>
                                        <span className="truncate">{item.name}</span>
                                    </div>
                                </td>

                                <td className="p-3 border-r border-slate-50">
                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[item.status] || STATUS_COLORS['default']}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="p-3 text-xs border-r border-slate-50 whitespace-nowrap">{item.alignment}</td>
                                <td className="p-3 text-xs border-r border-slate-50 whitespace-nowrap">{item.manager}</td>
                                <td className="p-3 text-xs border-r border-slate-50 whitespace-nowrap">{item.role}</td>
                                <td className="p-3 text-xs font-semibold border-r border-slate-50">{item.clientRole}</td>

                                {showDomain && DOMAIN_SKILLS.map(skill => (
                                    <td key={skill.key} className="p-1 text-center border-r border-slate-50">
                                        <div className="flex justify-center">
                                            {renderSkillCell(item, skill.key)}
                                        </div>
                                    </td>
                                ))}

                                {showTools && TOOL_SKILLS.map(skill => (
                                    <td key={skill.key} className="p-1 text-center border-r border-slate-50">
                                        <div className="flex justify-center">
                                            {renderSkillCell(item, skill.key)}
                                        </div>
                                    </td>
                                ))}

                                <td className="p-2 text-center bg-white group-hover:bg-blue-50/30 sticky right-0 z-30 shadow-[-5px_0_10px_-5px_rgba(0,0,0,0.05)] border-l border-slate-100">
                                    <div className="flex items-center justify-center gap-1">
                                        <button onClick={() => onViewChart(item)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Chart">
                                            <Eye size={14} />
                                        </button>
                                        <button onClick={() => onEditUser(String(item.id))} className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors" title="Edit">
                                            <Edit3 size={14} />
                                        </button>
                                        <button onClick={() => onDeleteUser(String(item.id))} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-3 border-t border-slate-200 bg-slate-50 text-xs text-slate-500 flex justify-between items-center">
                <span>Showing {sortedData.length} of {data.length} records</span>
            </div>
        </div>
    );
};

export default SkillTable;