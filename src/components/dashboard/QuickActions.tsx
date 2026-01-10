import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, Utensils, MessageCircle, Activity } from 'lucide-react';

const actions = [
  {
    icon: Dumbbell,
    label: 'Start Workout',
    description: 'Begin a new training session',
    path: '/workouts',
    gradient: 'gradient-primary',
  },
  {
    icon: Utensils,
    label: 'Log Meal',
    description: 'Track your nutrition',
    path: '/diet',
    gradient: 'gradient-energy',
  },
  {
    icon: MessageCircle,
    label: 'Chat with AI',
    description: 'Get personalized advice',
    path: '/chat',
    gradient: 'gradient-success',
  },
  {
    icon: Activity,
    label: 'View Sensors',
    description: 'Check IoT equipment data',
    path: '/sensors',
    gradient: 'bg-secondary',
  },
];

export const QuickActions = () => {
  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-lg font-display font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.path}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link
              to={action.path}
              className="block p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all duration-200 group"
            >
              <div
                className={`w-10 h-10 rounded-lg ${action.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
              >
                <action.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-medium text-sm mb-1">{action.label}</h3>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
