import { SkillCategory, SkillDefinition } from './types';

export const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxW_3-qr7J-aTam5kyOzcG4CgAB7J1MlnaI3TtKYDOi6InPwWCiK75fYi_tGmAQb0JK/exec";

export const DOMAIN_SKILLS: SkillCategory[] = [
  { key: 'marketAccess', label: 'Market Access' },
  { key: 'pricingAnalytics', label: 'Pricing' },
  { key: 'salesForce', label: 'SFE' },
  { key: 'incentiveComp', label: 'IC' },
  { key: 'patientData', label: 'Patient Data' },
  { key: 'forecasting', label: 'Forecasting' },
  { key: 'pharmaAnalytics', label: 'Pharma' },
  { key: 'marketingAnalytics', label: 'Marketing' },
  { key: 'supplyChain', label: 'Supply Chain' },
  { key: 'fpna', label: 'FP&A' },
  { key: 'targeting', label: 'Targeting' },
  { key: 'dataEngineering', label: 'Data Eng' },
  { key: 'etl', label: 'ETL' },
  { key: 'advancedAnalytics', label: 'Adv Analytics' },
  { key: 'dataScience', label: 'Data Sci' }
];

export const TOOL_SKILLS: SkillCategory[] = [
  { key: 'excelVBA', label: 'Excel/VBA' },
  { key: 'tableau', label: 'Tableau' },
  { key: 'powerBI', label: 'Power BI' },
  { key: 'ssrs', label: 'SSRS' },
  { key: 'sql', label: 'SQL' },
  { key: 'python', label: 'Python' },
  { key: 'sas', label: 'SAS' },
  { key: 'r', label: 'R' },
  { key: 'powerQuery', label: 'P.Query' },
  { key: 'apacheAirflow', label: 'Airflow' },
  { key: 'ssis', label: 'SSIS' },
  { key: 'awsGlue', label: 'Glue' },
  { key: 'adf', label: 'ADF' },
  { key: 'alteryx', label: 'Alteryx' },
  { key: 'knime', label: 'KNIME' },
  { key: 'talend', label: 'Talend' },
  { key: 'databricks', label: 'Databricks' }
];

export const SKILL_DEFINITIONS: SkillDefinition[] = [
    { level: 0, label: 'Aware', description: 'Not at all Aware' },
    { level: 1, label: 'Trained', description: 'Trained theoretically' },
    { level: 2, label: 'POC', description: 'At least worked on a POC' },
    { level: 3, label: 'Project', description: 'Worked on a complete Project' },
    { level: 4, label: 'Solo', description: 'Independently handled project' },
    { level: 5, label: 'Expert', description: 'Guide Others and Solved doubts' },
];

export const STATUS_COLORS: Record<string, string> = {
    'Billable': 'bg-green-100 text-green-700',
    'Active': 'bg-green-100 text-green-700',
    'Maternity': 'bg-orange-100 text-orange-700',
    'Developmental': 'bg-orange-100 text-orange-700',
    'Resigned': 'bg-red-100 text-red-700',
    'Shadow': 'bg-blue-100 text-blue-700',
    'OPAS': 'bg-blue-100 text-blue-700',
    'Future billable': 'bg-purple-100 text-purple-700',
    'default': 'bg-gray-100 text-gray-700'
};