export interface Goal {
    id: string;
    title: string;
    description: string;
    targetDate: Date;
    progress: number;
    status: 'not-started' | 'in-progress' | 'completed';
    milestones: Milestone[];
  }
  
  export interface Milestone {
    id: string;
    title: string;
    completed: boolean;
  }