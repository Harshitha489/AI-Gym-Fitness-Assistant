import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', calories: 2100, workouts: 45 },
  { day: 'Tue', calories: 1950, workouts: 60 },
  { day: 'Wed', calories: 2200, workouts: 30 },
  { day: 'Thu', calories: 1800, workouts: 55 },
  { day: 'Fri', calories: 2050, workouts: 45 },
  { day: 'Sat', calories: 2300, workouts: 75 },
  { day: 'Sun', calories: 1900, workouts: 40 },
];

export const WeeklyProgress = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <h2 className="text-lg font-display font-semibold mb-4">Weekly Progress</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(187, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorWorkouts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 76%, 45%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(142, 76%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(222, 47%, 9%)',
                border: '1px solid hsl(217, 33%, 17%)',
                borderRadius: '8px',
                color: 'hsl(210, 40%, 98%)',
              }}
            />
            <Area
              type="monotone"
              dataKey="calories"
              stroke="hsl(187, 100%, 50%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCalories)"
            />
            <Area
              type="monotone"
              dataKey="workouts"
              stroke="hsl(142, 76%, 45%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorWorkouts)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Calories</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">Workout (min)</span>
        </div>
      </div>
    </motion.div>
  );
};
