import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { WorkoutTracker } from '@/components/workout/WorkoutTracker';

export default function Workouts() {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">AI Workout Trainer</h1>
          <p className="text-muted-foreground">
            Start a workout session with real-time posture detection and rep counting.
          </p>
        </div>
        <WorkoutTracker />
      </motion.div>
    </AppLayout>
  );
}
