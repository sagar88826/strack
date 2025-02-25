import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card"

const weeklyProgress = [
  { name: 'Week 1', completed: 4, started: 2 },
  { name: 'Week 2', completed: 3, started: 5 },
  { name: 'Week 3', completed: 6, started: 3 },
  { name: 'Week 4', completed: 4, started: 4 },
];

const monthlyProgress = [
  { name: 'Jan', progress: 65 },
  { name: 'Feb', progress: 75 },
  { name: 'Mar', progress: 82 },
  { name: 'Apr', progress: 78 },
  { name: 'May', progress: 85 },
  { name: 'Jun', progress: 90 },
];

export default function Progress() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Progress Overview</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Weekly Goal Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" name="Completed Goals" fill="#22c55e" />
                <Bar dataKey="started" name="Started Goals" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Monthly Progress Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="progress" 
                  name="Overall Progress"
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 mb-8">
          <CardHeader>
            <CardTitle>Achievement Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Goals Completed', value: '24', change: '+6', isPositive: true },
                { label: 'Success Rate', value: '85%', change: '+2.5%', isPositive: true },
                { label: 'Active Streak', value: '12 days', change: '-3', isPositive: false },
              ].map((stat, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}