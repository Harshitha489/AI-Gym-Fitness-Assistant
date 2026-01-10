import { motion } from 'framer-motion';
import { Flame, Dumbbell, Droplet, Timer } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { WeeklyProgress } from '@/components/dashboard/WeeklyProgress';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Athlete';

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold mb-2">
            Welcome back, <span className="text-gradient-primary">{displayName}</span>! 💪
          </h1>
          <p className="text-muted-foreground">
            Let's crush your fitness goals today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Calories Burned"
            value="1,847"
            subtitle="of 2,500 goal"
            icon={Flame}
            trend={{ value: 12, isPositive: true }}
            variant="energy"
            delay={0}
          />
          <StatCard
            title="Workouts"
            value="5"
            subtitle="this week"
            icon={Dumbbell}
            trend={{ value: 25, isPositive: true }}
            variant="primary"
            delay={0.1}
          />
          <StatCard
            title="Water Intake"
            value="2.4L"
            subtitle="of 3L goal"
            icon={Droplet}
            variant="default"
            delay={0.2}
          />
          <StatCard
            title="Active Minutes"
            value="156"
            subtitle="this week"
            icon={Timer}
            trend={{ value: 8, isPositive: true }}
            variant="success"
            delay={0.3}
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeeklyProgress />
          <RecentActivity />
        </div>
      </div>
    </AppLayout>
  );
}
