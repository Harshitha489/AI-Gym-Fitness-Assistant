import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { IoTDashboard } from '@/components/sensors/IoTDashboard';

export default function Sensors() {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Smart Gym Sensors</h1>
          <p className="text-muted-foreground">
            Real-time data from connected IoT gym equipment.
          </p>
        </div>
        <IoTDashboard />
      </motion.div>
    </AppLayout>
  );
}
