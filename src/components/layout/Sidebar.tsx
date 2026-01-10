import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  Activity,
  MessageCircle,
  TrendingUp,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Dumbbell, label: 'Workouts', path: '/workouts' },
  { icon: Utensils, label: 'Diet Coach', path: '/diet' },
  { icon: Activity, label: 'IoT Sensors', path: '/sensors' },
  { icon: MessageCircle, label: 'AI Buddy', path: '/chat' },
  { icon: TrendingUp, label: 'Progress', path: '/progress' },
  { icon: Calendar, label: 'Habits', path: '/habits' },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { signOut, user } = useAuth();

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border lg:hidden"
      >
        {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          className={cn(
            'fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-40 flex flex-col',
            'w-64 lg:translate-x-0 transition-transform',
            isCollapsed ? '-translate-x-full' : 'translate-x-0'
          )}
        >
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-sidebar-foreground">FitAI</h1>
                <p className="text-xs text-muted-foreground">Smart Fitness</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsCollapsed(true)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    'hover:bg-sidebar-accent group',
                    isActive && 'bg-sidebar-accent shadow-glow'
                  )}
                >
                  <item.icon
                    className={cn(
                      'w-5 h-5 transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                    )}
                  />
                  <span
                    className={cn(
                      'font-medium transition-colors',
                      isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 w-1 h-8 rounded-r-full bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent mb-2">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.email || 'User'}</p>
                <p className="text-xs text-muted-foreground">Free Plan</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                to="/settings"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
              >
                <Settings className="w-4 h-4" />
              </Link>
              <button
                onClick={signOut}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-sidebar-accent transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
};
