import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from "@/shared/components/ui/card";
import { CheckCircle2, ChevronDown, Circle, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { Goal, Milestone } from '../../shared/types';
import { Progress } from "@/shared/components/ui/progress"

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Learn TypeScript',      
    description: 'Master TypeScript fundamentals and advanced concepts',
    targetDate: new Date('2024-06-30'),
    progress: 45,
    status: 'in-progress',
    milestones: [
      { id: '1', title: 'Basic Types', completed: true },
      { id: '2', title: 'Interfaces', completed: true },
      { id: '3', title: 'Generics', completed: false },
      { id: '4', title: 'Advanced Types', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Build Portfolio Website',
    description: 'Create a professional portfolio showcasing my projects',
    targetDate: new Date('2024-05-15'),
    progress: 75,
    status: 'in-progress',
    milestones: [
      { id: '1', title: 'Design Mockups', completed: true },
      { id: '2', title: 'Frontend Implementation', completed: true },
      { id: '3', title: 'Content Creation', completed: false },
      { id: '4', title: 'Deployment', completed: false },
    ],
  },
];

export default function Goals() {
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null);

  const toggleGoal = (goalId: string) => {
    setExpandedGoal(expandedGoal === goalId ? null : goalId);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Goals</h1>
        <Button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Goal
        </Button>
      </div>

      <div className="space-y-4">
        {mockGoals.map((goal) => (
          <Card key={goal.id} className="mb-4">
            <CardContent 
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleGoal(goal.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">{goal.title}</h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        expandedGoal === goal.id ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                  <p className="text-gray-600 mt-1">{goal.description}</p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-blue-500">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="w-full h-2 bg-gray-200" />
                  </div>
                </div>
              </div>
            </CardContent>
            
            {expandedGoal === goal.id && (
              <CardContent className="border-t border-gray-200 p-6 bg-gray-50">
                <h4 className="text-sm font-semibold text-gray-700 mb-4">Milestones</h4>
                <div className="space-y-3">
                  {goal.milestones.map((milestone: Milestone) => (
                    <div key={milestone.id} className="flex items-center">
                      {milestone.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 mr-3" />
                      )}
                      <span className={`${milestone.completed ? 'text-gray-600' : 'text-gray-800'}`}>
                        {milestone.title}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-end space-x-3">
                  <Button className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                    Edit Goal
                  </Button>
                  <Button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Update Progress
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}