import React from 'react';
import { TeamMember, ViewType } from '../types';
import { DOMAIN_SKILLS, TOOL_SKILLS } from '../constants';
import { Users, Briefcase, Activity, BarChart3, Wrench } from 'lucide-react';

interface Props {
    data: TeamMember[];
}

const StatsCards: React.FC<Props> = ({ data }) => {
    const total = data.length;
    const active = data.filter(d => d.status === 'Billable').length;
    const clientRole = data.filter(d => (d.clientRole || '').toUpperCase() === 'Y').length;

    // Calculate averages
    let dSum = 0, dCount = 0, tSum = 0, tCount = 0;
    data.forEach(p => {
        DOMAIN_SKILLS.forEach(s => { dSum += p[s.key] || 0; dCount++; });
        TOOL_SKILLS.forEach(s => { tSum += p[s.key] || 0; tCount++; });
    });

    const avgDomain = dCount ? (dSum / dCount).toFixed(1) : '0.0';
    const avgTool = tCount ? (tSum / tCount).toFixed(1) : '0.0';

    const cards = [
        { label: 'Total Members', value: total, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Billable', value: active, icon: Briefcase, color: 'text-green-500', bg: 'bg-green-50' },
        { label: 'Client Roles', value: clientRole, icon: Activity, color: 'text-purple-500', bg: 'bg-purple-50' },
        { label: 'Avg Domain', value: avgDomain, icon: BarChart3, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Avg Tools', value: avgTool, icon: Wrench, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {cards.map((card, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center justify-center transition hover:shadow-md hover:scale-[1.02] duration-200">
                    <div className={`p-3 rounded-full ${card.bg} mb-3`}>
                        <card.icon className={`w-6 h-6 ${card.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-slate-800">{card.value}</div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-1">{card.label}</div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;