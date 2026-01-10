import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { HabitTracker } from '@/components/habits/HabitTracker';

export default function Habits() {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Habit Tracker</h1>
          <p className="text-muted-foreground">
            Build consistent fitness habits with AI-powered predictions.
          </p>
        </div>
        <HabitTracker />
      </motion.div>
    </AppLayout>
  );
}
