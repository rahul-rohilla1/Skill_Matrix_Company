import React from 'react';
import { TeamMember } from '../types';
import { DOMAIN_SKILLS, TOOL_SKILLS } from '../constants';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { X } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user: TeamMember | null;
}

const SpiderChartModal: React.FC<Props> = ({ isOpen, onClose, user }) => {
    if (!isOpen || !user) return null;

    const domainData = DOMAIN_SKILLS.map(s => ({
        subject: s.label,
        A: user[s.key] || 0,
        fullMark: 5
    }));

    const toolData = TOOL_SKILLS.map(s => ({
        subject: s.label,
        A: user[s.key] || 0,
        fullMark: 5
    }));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
                        <p className="text-slate-500 text-sm font-mono">{user.role} | {user.id}</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-slate-200 rounded-full hover:bg-slate-300 transition-colors">
                        <X size={24} className="text-slate-700" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                        {/* Domain Chart */}
                        <div className="flex flex-col items-center h-[400px] md:h-full min-h-[400px]">
                            <h3 className="text-lg font-semibold text-blue-600 mb-4">Domain Expertise</h3>
                            <div className="w-full h-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={domainData}>
                                        <PolarGrid stroke="#e2e8f0" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{fontSize: 10}} />
                                        <Radar name="Domain Score" dataKey="A" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.3} />
                                        <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Tools Chart */}
                        <div className="flex flex-col items-center h-[400px] md:h-full min-h-[400px]">
                            <h3 className="text-lg font-semibold text-purple-600 mb-4">Tools & Tech</h3>
                            <div className="w-full h-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={toolData}>
                                        <PolarGrid stroke="#e2e8f0" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{fontSize: 10}} />
                                        <Radar name="Tool Score" dataKey="A" stroke="#9333ea" fill="#a855f7" fillOpacity={0.3} />
                                        <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpiderChartModal;