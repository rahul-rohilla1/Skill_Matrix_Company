import { WEB_APP_URL } from '../constants';
import { TeamMember } from '../types';

export const fetchTeamData = async (): Promise<TeamMember[]> => {
    try {
        const response = await fetch(WEB_APP_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        // Normalize number strings to integers
        return data.map((item: any) => {
            const normalized = { ...item };
            // Ensure all skill keys are numbers
            Object.keys(normalized).forEach(key => {
                if (key !== 'id' && key !== 'name' && !isNaN(Number(normalized[key])) && key !== 'sno') {
                   normalized[key] = parseInt(normalized[key], 10) || 0;
                }
            });
            return normalized;
        });
    } catch (error) {
        console.error("API Fetch Error:", error);
        throw error;
    }
};

export const saveTeamData = async (data: TeamMember[]): Promise<boolean> => {
    try {
        const response = await fetch(WEB_APP_URL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "text/plain" }
        });
        const result = await response.json();
        return result.status === "success";
    } catch (error) {
        console.error("API Save Error:", error);
        throw error;
    }
};