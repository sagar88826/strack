import { useState } from 'react';
import { Clock, Target, Trophy } from 'lucide-react';
import { Goal } from '../../shared/types';
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card"
import { Progress } from "@/shared/components/ui/progress"
import GoalForm from './goal-form';

const initialGoals: Goal[] = [
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
    ],
  },
  // Add more mock goals as needed
];

export default function Dashboard() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);

  const handleAddGoal = (newGoal: Goal) => {
    setGoals([...goals, newGoal]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <GoalForm onAddGoal={handleAddGoal} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: Target, label: 'Active Goals', value: goals.filter(g => g.status === 'in-progress').length.toString(), color: 'bg-blue-500' },
          { icon: Trophy, label: 'Completed', value: goals.filter(g => g.status === 'completed').length.toString(), color: 'bg-green-500' },
          { icon: Clock, label: 'Not Started', value: goals.filter(g => g.status === 'not-started').length.toString(), color: 'bg-yellow-500' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-600">{stat.label}</h3>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Goals</CardTitle>
        </CardHeader>
        <CardContent className="divide-y divide-gray-200">
          {goals.map((goal) => (
            <div key={goal.id} className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{goal.title}</h3>
                  <p className="text-gray-600 mt-1">{goal.description}</p>
                </div>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="text-sm text-gray-600 mb-1">Progress</div>
                    <Progress value={goal.progress} className="w-48 h-2 bg-gray-200" />
                  </div>
                  <span className="text-lg font-semibold text-blue-500">
                    {goal.progress}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}