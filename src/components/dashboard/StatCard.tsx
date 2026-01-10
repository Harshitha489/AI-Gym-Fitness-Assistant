import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'energy' | 'success';
  delay?: number;
}

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  delay = 0,
}: StatCardProps) => {
  const iconBgClasses = {
    default: 'bg-secondary',
    primary: 'gradient-primary',
    energy: 'gradient-energy',
    success: 'gradient-success',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="stat-card"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center',
            iconBgClasses[variant]
          )}
        >
          <Icon
            className={cn(
              'w-6 h-6',
              variant === 'default' ? 'text-primary' : 'text-primary-foreground'
            )}
          />
        </div>
        {trend && (
          <span
            className={cn(
              'text-sm font-medium px-2 py-1 rounded-full',
              trend.isPositive
                ? 'bg-success/20 text-success'
                : 'bg-destructive/20 text-destructive'
            )}
          >
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <h3 className="text-muted-foreground text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-display font-bold">{value}</p>
      {subtitle && (
        <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
      )}
    </motion.div>
  );
};
