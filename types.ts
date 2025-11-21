export interface TeamMember {
  sno: number;
  id: string | number;
  name: string;
  status: string;
  alignment: string;
  manager: string;
  role: string;
  clientRole: string;
  [key: string]: any; // Allow index signature for dynamic skill access
}

export interface SkillCategory {
  key: string;
  label: string;
}

export type ViewType = 'all' | 'domain' | 'tools';

export interface FilterState {
  search: string;
  status: string;
  role: string;
  manager: string;
  domainSkill: string;
  toolSkill: string;
}

export interface SkillDefinition {
    level: number;
    label: string;
    description: string;
}