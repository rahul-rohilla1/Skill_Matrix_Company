import React, { useEffect, useState } from 'react';
import { TeamMember } from '../types';
import { DOMAIN_SKILLS, TOOL_SKILLS } from '../constants';
import { X, User, Briefcase, UserCheck, Users } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: Partial<TeamMember>, isNew: boolean) => void;
    user: TeamMember | null;
    uniqueValues: { roles: string[], managers: string[], alignments: string[] };
}

const UserModal: React.FC<Props> = ({ isOpen, onClose, onSave, user, uniqueValues }) => {
    const [formData, setFormData] = useState<Partial<TeamMember>>({});

    useEffect(() => {
        if (user) {
            setFormData({ ...user });
        } else {
            setFormData({
                name: '', id: '', status: 'Billable', clientRole: 'N', alignment: 'TBD', manager: 'TBD', role: 'TBD',
                ...DOMAIN_SKILLS.reduce((acc, s) => ({ ...acc, [s.key]: 0 }), {}),
                ...TOOL_SKILLS.reduce((acc, s) => ({ ...acc, [s.key]: 0 }), {})
            });
        }
    }, [user, isOpen]);

    if (!isOpen) return null;

    const handleChange = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        {user ? <User className="text-blue-500" size={20} /> : <UserCheck className="text-green-500" size={20} />}
                        {user ? 'Edit Member' : 'Add New Member'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-xs font-medium text-slate-500 mb-1">Full Name</label>
                            <input 
                                type="text" 
                                value={formData.name || ''}
                                onChange={e => handleChange('name', e.target.value)}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Employee ID</label>
                            <input 
                                type="text" 
                                value={formData.id || ''}
                                disabled={!!user}
                                onChange={e => handleChange('id', e.target.value)}
                                className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 outline-none disabled:bg-slate-50 disabled:text-slate-400"
                                placeholder="12345"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Status</label>
                            <select 
                                value={formData.status || 'Billable'} 
                                onChange={e => handleChange('status', e.target.value)}
                                className="w-full p-2 border border-slate-200 rounded-lg bg-white"
                            >
                                {['Billable', 'Active', 'Shadow', 'Maternity', 'Resigned', 'OPAS', 'Developmental', 'Future billable'].map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Client Role?</label>
                            <select 
                                value={formData.clientRole || 'N'} 
                                onChange={e => handleChange('clientRole', e.target.value)}
                                className="w-full p-2 border border-slate-200 rounded-lg bg-white"
                            >
                                <option value="Y">Yes</option>
                                <option value="N">No</option>
                            </select>
                        </div>

                         <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Role</label>
                            <input 
                                list="roles"
                                type="text"
                                value={formData.role || ''}
                                onChange={e => handleChange('role', e.target.value)}
                                className="w-full p-2 border border-slate-200 rounded-lg"
                            />
                            <datalist id="roles">{uniqueValues.roles.map(r => <option key={r} value={r} />)}</datalist>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Alignment</label>
                            <input 
                                list="alignments"
                                type="text"
                                value={formData.alignment || ''}
                                onChange={e => handleChange('alignment', e.target.value)}
                                className="w-full p-2 border border-slate-200 rounded-lg"
                            />
                             <datalist id="alignments">{uniqueValues.alignments.map(r => <option key={r} value={r} />)}</datalist>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Manager</label>
                            <input 
                                list="managers"
                                type="text"
                                value={formData.manager || ''}
                                onChange={e => handleChange('manager', e.target.value)}
                                className="w-full p-2 border border-slate-200 rounded-lg"
                            />
                             <datalist id="managers">{uniqueValues.managers.map(r => <option key={r} value={r} />)}</datalist>
                        </div>
                    </div>
                </div>

                <div className="p-5 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                    <button 
                        onClick={() => onSave(formData, !user)} 
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg shadow-blue-200 transition-all transform active:scale-95"
                    >
                        {user ? 'Save Changes' : 'Create Member'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserModal;