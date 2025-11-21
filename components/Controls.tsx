import React from 'react';
import { FilterState, ViewType, TeamMember } from '../types';
import { DOMAIN_SKILLS, TOOL_SKILLS } from '../constants';
import { Search, Filter, Download, PlusCircle, RotateCcw, Save } from 'lucide-react';

interface Props {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    view: ViewType;
    setView: (v: ViewType) => void;
    uniqueValues: { roles: string[], managers: string[], statuses: string[] };
    onReset: () => void;
    onSave: () => void;
    onAdd: () => void;
    isSaving: boolean;
    lastModified: string;
}

const Controls: React.FC<Props> = ({ filters, setFilters, view, setView, uniqueValues, onReset, onSave, onAdd, isSaving, lastModified }) => {
    
    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
            <div className="flex flex-col gap-4">
                {/* Top Row: View Toggles and Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* View Toggles */}
                    <div className="flex bg-slate-100 p-1 rounded-lg self-start md:self-auto">
                        {(['all', 'domain', 'tools'] as ViewType[]).map((v) => (
                            <button
                                key={v}
                                onClick={() => setView(v)}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-md capitalize transition-all ${view === v ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {v} Skills
                            </button>
                        ))}
                    </div>

                    {/* Right Side: Info & Action Buttons */}
                    <div className="flex items-center gap-3 self-end md:self-auto w-full md:w-auto justify-end">
                         <span className="text-[11px] text-slate-400 font-medium mr-1 whitespace-nowrap">Last updated: {lastModified}</span>
                         
                         <button onClick={onReset} className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors whitespace-nowrap">
                            <RotateCcw size={14} /> Reset
                        </button>
                        
                        <button onClick={onSave} disabled={isSaving} className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-slate-800 rounded-md hover:bg-slate-900 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
                            <Save size={14} /> {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                        
                        <button onClick={onAdd} className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all shadow-md shadow-blue-200 whitespace-nowrap">
                            <PlusCircle size={14} /> Add Member
                        </button>
                    </div>
                </div>

                {/* Bottom Row: Filters - Search + 5 filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                        <input 
                            type="text" 
                            placeholder="Search name or ID..." 
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
                        />
                    </div>
                    
                    <select 
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white focus:ring-2 focus:ring-blue-100 outline-none text-slate-600"
                    >
                        <option value="">All Statuses</option>
                        {uniqueValues.statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>

                    <select 
                        value={filters.role}
                        onChange={(e) => handleFilterChange('role', e.target.value)}
                        className="px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white focus:ring-2 focus:ring-blue-100 outline-none text-slate-600"
                    >
                        <option value="">All Roles</option>
                        {uniqueValues.roles.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>

                    <select 
                        value={filters.manager}
                        onChange={(e) => handleFilterChange('manager', e.target.value)}
                        className="px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white focus:ring-2 focus:ring-blue-100 outline-none text-slate-600"
                    >
                        <option value="">All Managers</option>
                        {uniqueValues.managers.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>

                     {/* Domain Skill Filter */}
                    <select
                        value={filters.domainSkill}
                        onChange={(e) => handleFilterChange('domainSkill', e.target.value)}
                        className="px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white focus:ring-2 focus:ring-blue-100 outline-none text-slate-600"
                    >
                        <option value="">Any Domain Skill</option>
                        {DOMAIN_SKILLS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                    </select>

                    {/* Tool Skill Filter */}
                    <select
                        value={filters.toolSkill}
                        onChange={(e) => handleFilterChange('toolSkill', e.target.value)}
                        className="px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white focus:ring-2 focus:ring-blue-100 outline-none text-slate-600"
                    >
                        <option value="">Any Tool Skill</option>
                        {TOOL_SKILLS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Controls;