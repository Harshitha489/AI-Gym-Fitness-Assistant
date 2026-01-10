import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { DietTracker } from '@/components/diet/DietTracker';

export default function Diet() {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">AI Diet Coach</h1>
          <p className="text-muted-foreground">
            Track your meals and get personalized nutrition recommendations.
          </p>
        </div>
        <DietTracker />
      </motion.div>
    </AppLayout>
  );
}
