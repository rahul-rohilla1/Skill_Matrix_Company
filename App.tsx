import React, { useState, useEffect, useMemo } from 'react';
import { TeamMember, FilterState, ViewType } from './types';
import { fetchTeamData, saveTeamData } from './services/api';
import StatsCards from './components/StatsCards';
import Controls from './components/Controls';
import SkillTable from './components/SkillTable';
import SkillLegend from './components/SkillLegend';
import UserModal from './components/UserModal';
import SpiderChartModal from './components/SpiderChartModal';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastModified, setLastModified] = useState('Never');
  const [view, setView] = useState<ViewType>('all');
  
  // Modals
  const [editUser, setEditUser] = useState<TeamMember | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [chartUser, setChartUser] = useState<TeamMember | null>(null);
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    role: '',
    manager: '',
    domainSkill: '',
    toolSkill: ''
  });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const fetchedData = await fetchTeamData();
      setData(fetchedData);
    } catch (error) {
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const success = await saveTeamData(data);
      if (success) {
        setLastModified(new Date().toLocaleTimeString());
        alert('Successfully Saved to Cloud!');
      } else {
        throw new Error("API returned fail");
      }
    } catch (e) {
      alert('Save Failed');
    } finally {
      setSaving(false);
    }
  };

  const uniqueValues = useMemo(() => {
    const getUnique = (key: string) => Array.from(new Set(data.map(d => d[key] as string).filter(Boolean))).sort();
    return {
      roles: getUnique('role'),
      managers: getUnique('manager'),
      statuses: getUnique('status'),
      alignments: getUnique('alignment')
    };
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = (item.name.toLowerCase().includes(filters.search.toLowerCase()) || String(item.id).includes(filters.search));
      const matchesStatus = !filters.status || item.status === filters.status;
      const matchesRole = !filters.role || item.role === filters.role;
      const matchesManager = !filters.manager || item.manager === filters.manager;
      const matchesDomain = !filters.domainSkill || (item[filters.domainSkill] > 0);
      const matchesTool = !filters.toolSkill || (item[filters.toolSkill] > 0);

      return matchesSearch && matchesStatus && matchesRole && matchesManager && matchesDomain && matchesTool;
    });
  }, [data, filters]);

  const handleSkillUpdate = (id: string, key: string, value: number) => {
    setData(prev => prev.map(p => p.id == id ? { ...p, [key]: value } : p));
  };

  const handleUserSave = (userData: Partial<TeamMember>, isNew: boolean) => {
    if (isNew) {
      const newUser: TeamMember = { ...userData, sno: data.length + 1 } as TeamMember;
      if (data.some(d => d.id == newUser.id)) {
        alert("ID already exists");
        return;
      }
      setData([...data, newUser]);
    } else {
      setData(prev => prev.map(d => d.id == userData.id ? { ...d, ...userData } : d));
    }
    setIsEditModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure? This happens locally until you click Save to Cloud.")) {
      setData(prev => prev.filter(d => String(d.id) !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 max-w-[1920px] mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Team Skill Matrix</h1>
        <p className="text-slate-500 mt-2">Monitor expertise, manage allocations, and visualize team capabilities.</p>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center">
           <Loader2 className="animate-spin text-blue-500 w-10 h-10 mb-4" />
           <p className="text-slate-500">Loading Matrix Data...</p>
        </div>
      ) : (
        <>
          <StatsCards data={data} />

          <Controls 
            filters={filters}
            setFilters={setFilters}
            view={view}
            setView={setView}
            uniqueValues={uniqueValues}
            onReset={() => setFilters({ search: '', status: '', role: '', manager: '', domainSkill: '', toolSkill: '' })}
            onSave={handleSave}
            onAdd={() => { setEditUser(null); setIsEditModalOpen(true); }}
            isSaving={saving}
            lastModified={lastModified}
          />

          <div className="flex flex-col flex-1 min-h-0">
            <SkillLegend />
            <div className="flex-1 min-h-[500px]">
               <SkillTable 
                 data={filteredData} 
                 view={view} 
                 onEditUser={(id) => {
                    const u = data.find(d => String(d.id) === id);
                    if (u) { setEditUser(u); setIsEditModalOpen(true); }
                 }}
                 onDeleteUser={handleDelete}
                 onSkillUpdate={handleSkillUpdate}
                 onViewChart={setChartUser}
               />
            </div>
          </div>
        </>
      )}

      {/* Modals */}
      <UserModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onSave={handleUserSave} 
        user={editUser} 
        uniqueValues={uniqueValues}
      />

      <SpiderChartModal 
        isOpen={!!chartUser} 
        onClose={() => setChartUser(null)} 
        user={chartUser} 
      />

    </div>
  );
};

export default App;