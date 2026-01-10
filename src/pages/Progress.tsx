import { motion } from 'framer-motion';
import { TrendingUp, Award, Target, Calendar } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const weeklyData = [
  { week: 'Week 1', weight: 85, workouts: 3, calories: 1800 },
  { week: 'Week 2', weight: 84.5, workouts: 4, calories: 1750 },
  { week: 'Week 3', weight: 84, workouts: 5, calories: 1700 },
  { week: 'Week 4', weight: 83.2, workouts: 5, calories: 1650 },
];

const performanceData = [
  { exercise: 'Squats', score: 85 },
  { exercise: 'Push-ups', score: 78 },
  { exercise: 'Lunges', score: 90 },
  { exercise: 'Planks', score: 95 },
  { exercise: 'Burpees', score: 72 },
];

export default function Progress() {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Progress Analytics</h1>
          <p className="text-muted-foreground">
            Track your fitness journey with detailed performance insights.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Weight Change"
            value="-1.8 kg"
            subtitle="Last 4 weeks"
            icon={TrendingUp}
            trend={{ value: 15, isPositive: true }}
            variant="success"
          />
          <StatCard
            title="Performance Score"
            value="84%"
            subtitle="Average across exercises"
            icon={Award}
            trend={{ value: 8, isPositive: true }}
            variant="primary"
          />
          <StatCard
            title="Goals Completed"
            value="12/15"
            subtitle="This month"
            icon={Target}
            variant="energy"
          />
          <StatCard
            title="Consistency"
            value="92%"
            subtitle="Workout attendance"
            icon={Calendar}
            trend={{ value: 5, isPositive: true }}
            variant="default"
          />
        </div>

        {/* Weight Progress Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="font-display font-semibold mb-4">Weight Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="week"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
                />
                <YAxis
                  domain={[80, 90]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222, 47%, 9%)',
                    border: '1px solid hsl(217, 33%, 17%)',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value} kg`, 'Weight']}
                />
                <Area
                  type="monotone"
                  dataKey="weight"
                  stroke="hsl(187, 100%, 50%)"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorWeight)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Performance Scores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="font-display font-semibold mb-4">Exercise Performance Scores</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  type="category"
                  dataKey="exercise"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222, 47%, 9%)',
                    border: '1px solid hsl(217, 33%, 17%)',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value}%`, 'Score']}
                />
                <Bar
                  dataKey="score"
                  fill="hsl(142, 76%, 45%)"
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
}
