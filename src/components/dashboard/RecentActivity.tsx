import { motion } from 'framer-motion';
import { Dumbbell, Utensils, TrendingUp, Award } from 'lucide-react';

const activities = [
  {
    icon: Dumbbell,
    title: 'Morning Workout',
    description: '45 min strength training',
    time: '2 hours ago',
    color: 'text-primary',
  },
  {
    icon: Utensils,
    title: 'Lunch Logged',
    description: 'Grilled chicken salad - 450 cal',
    time: '4 hours ago',
    color: 'text-energy',
  },
  {
    icon: TrendingUp,
    title: 'New Personal Best',
    description: 'Bench press: 185 lbs',
    time: 'Yesterday',
    color: 'text-success',
  },
  {
    icon: Award,
    title: '7-Day Streak',
    description: 'Completed daily workout goal',
    time: '2 days ago',
    color: 'text-warning',
  },
];

export const RecentActivity = () => {
  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-lg font-display font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <activity.icon className={`w-5 h-5 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm">{activity.title}</h3>
              <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
