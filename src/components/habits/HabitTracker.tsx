import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Flame, Target, TrendingUp } from 'lucide-react';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const habits = [
  { id: 'workout', name: 'Daily Workout', icon: '💪', streak: 7 },
  { id: 'water', name: '8 Glasses of Water', icon: '💧', streak: 12 },
  { id: 'sleep', name: '7+ Hours Sleep', icon: '😴', streak: 5 },
  { id: 'steps', name: '10K Steps', icon: '👟', streak: 3 },
  { id: 'meditation', name: 'Morning Meditation', icon: '🧘', streak: 9 },
];

interface HabitDay {
  [key: string]: boolean[];
}

export const HabitTracker = () => {
  const [habitCompletion, setHabitCompletion] = useState<HabitDay>({
    workout: [true, true, true, false, true, true, false],
    water: [true, true, true, true, true, true, true],
    sleep: [true, false, true, true, false, true, true],
    steps: [false, true, true, false, true, false, true],
    meditation: [true, true, true, true, true, true, false],
  });

  const toggleHabit = (habitId: string, dayIndex: number) => {
    setHabitCompletion((prev) => ({
      ...prev,
      [habitId]: prev[habitId].map((v, i) => (i === dayIndex ? !v : v)),
    }));
  };

  const totalCompleted = Object.values(habitCompletion).flat().filter(Boolean).length;
  const totalPossible = Object.values(habitCompletion).flat().length;
  const completionRate = Math.round((totalCompleted / totalPossible) * 100);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="stat-card"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Weekly Completion</p>
              <p className="text-2xl font-display font-bold">{completionRate}%</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stat-card"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-energy flex items-center justify-center">
              <Flame className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Longest Streak</p>
              <p className="text-2xl font-display font-bold">12 days</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-success flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Habits Tracked</p>
              <p className="text-2xl font-display font-bold">{habits.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Habit Grid */}
      <div className="glass-card rounded-xl p-6 overflow-x-auto">
        <h3 className="font-display font-semibold mb-6">This Week</h3>
        
        <div className="min-w-[600px]">
          {/* Header */}
          <div className="grid grid-cols-8 gap-2 mb-4">
            <div className="col-span-1"></div>
            {weekDays.map((day) => (
              <div key={day} className="text-center text-sm text-muted-foreground font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Habits */}
          {habits.map((habit, habitIndex) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: habitIndex * 0.05 }}
              className="grid grid-cols-8 gap-2 mb-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{habit.icon}</span>
                <div>
                  <p className="text-sm font-medium truncate">{habit.name}</p>
                  <div className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-energy" />
                    <span className="text-xs text-muted-foreground">{habit.streak}</span>
                  </div>
                </div>
              </div>
              {habitCompletion[habit.id]?.map((completed, dayIndex) => (
                <button
                  key={dayIndex}
                  onClick={() => toggleHabit(habit.id, dayIndex)}
                  className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center transition-all ${
                    completed
                      ? 'gradient-success text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {completed && <Check className="w-5 h-5" />}
                </button>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Prediction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-6 border-l-4 border-primary"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h4 className="font-semibold mb-2">AI Prediction</h4>
            <p className="text-muted-foreground text-sm">
              Based on your patterns, you're likely to miss your <span className="text-primary font-medium">10K Steps</span> goal tomorrow. 
              Consider scheduling a 30-minute walk in the morning!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
