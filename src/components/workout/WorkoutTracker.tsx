import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Square, Check, AlertTriangle, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const workoutTypes = [
  { id: 'squats', name: 'Squats', targetReps: 15 },
  { id: 'pushups', name: 'Push-ups', targetReps: 12 },
  { id: 'lunges', name: 'Lunges', targetReps: 20 },
  { id: 'planks', name: 'Planks', targetReps: 1 },
  { id: 'burpees', name: 'Burpees', targetReps: 10 },
];

export const WorkoutTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(workoutTypes[0]);
  const [reps, setReps] = useState(0);
  const [duration, setDuration] = useState(0);
  const [postureScore, setPostureScore] = useState(85);
  const [postureFeedback, setPostureFeedback] = useState<'good' | 'warning' | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Simulate workout detection
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let repInterval: NodeJS.Timeout;

    if (isTracking && !isPaused) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);

      repInterval = setInterval(() => {
        // Simulate rep detection
        setReps((prev) => {
          if (prev < selectedWorkout.targetReps) {
            // Simulate posture feedback
            const randomPosture = Math.random();
            if (randomPosture > 0.7) {
              setPostureFeedback('warning');
              setPostureScore((prev) => Math.max(60, prev - 5));
            } else {
              setPostureFeedback('good');
              setPostureScore((prev) => Math.min(100, prev + 2));
            }
            return prev + 1;
          }
          return prev;
        });
      }, 2000);
    }

    return () => {
      clearInterval(interval);
      clearInterval(repInterval);
    };
  }, [isTracking, isPaused, selectedWorkout.targetReps]);

  const startWorkout = () => {
    setIsTracking(true);
    setIsPaused(false);
    setReps(0);
    setDuration(0);
    setPostureScore(85);
  };

  const pauseWorkout = () => {
    setIsPaused(!isPaused);
  };

  const stopWorkout = async () => {
    setIsTracking(false);
    
    if (user && reps > 0) {
      try {
        const { error } = await supabase.from('workouts').insert({
          user_id: user.id,
          workout_type: selectedWorkout.name,
          duration_minutes: Math.ceil(duration / 60),
          reps_completed: reps,
          posture_score: postureScore,
          calories_burned: Math.round(duration * 0.15 * reps),
        });

        if (error) throw error;

        toast({
          title: 'Workout Saved! 💪',
          description: `${selectedWorkout.name}: ${reps} reps in ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`,
        });
      } catch (error) {
        console.error('Error saving workout:', error);
        toast({
          title: 'Error',
          description: 'Failed to save workout',
          variant: 'destructive',
        });
      }
    }

    setReps(0);
    setDuration(0);
    setPostureScore(85);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (reps / selectedWorkout.targetReps) * 100;

  return (
    <div className="space-y-6">
      {/* Workout Selection */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-display font-semibold mb-4">Select Exercise</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {workoutTypes.map((workout) => (
            <button
              key={workout.id}
              onClick={() => !isTracking && setSelectedWorkout(workout)}
              disabled={isTracking}
              className={`p-4 rounded-xl text-center transition-all ${
                selectedWorkout.id === workout.id
                  ? 'gradient-primary text-primary-foreground shadow-glow'
                  : 'bg-muted hover:bg-muted/80'
              } ${isTracking ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Dumbbell className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">{workout.name}</p>
              <p className="text-xs opacity-80">{workout.targetReps} reps</p>
            </button>
          ))}
        </div>
      </div>

      {/* Workout Display */}
      <div className="glass-card rounded-xl p-8">
        <div className="text-center mb-8">
          <motion.div
            animate={{ scale: isTracking && !isPaused ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-48 h-48 mx-auto rounded-full gradient-primary flex items-center justify-center mb-6 shadow-glow"
          >
            <div className="text-center text-primary-foreground">
              <p className="text-5xl font-display font-bold">{reps}</p>
              <p className="text-sm opacity-80">reps</p>
            </div>
          </motion.div>

          <p className="text-3xl font-display font-bold mb-2">{formatTime(duration)}</p>
          <p className="text-muted-foreground">{selectedWorkout.name}</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{reps}/{selectedWorkout.targetReps} reps</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Posture Feedback */}
        {isTracking && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${
              postureFeedback === 'good'
                ? 'bg-success/20 border border-success/30'
                : postureFeedback === 'warning'
                ? 'bg-warning/20 border border-warning/30'
                : 'bg-muted'
            }`}
          >
            {postureFeedback === 'good' ? (
              <>
                <Check className="w-5 h-5 text-success" />
                <span className="text-success font-medium">Great posture! Keep it up!</span>
              </>
            ) : postureFeedback === 'warning' ? (
              <>
                <AlertTriangle className="w-5 h-5 text-warning" />
                <span className="text-warning font-medium">Adjust your form slightly</span>
              </>
            ) : (
              <span className="text-muted-foreground">Posture detection active...</span>
            )}
            <span className="ml-auto font-bold">Score: {postureScore}%</span>
          </motion.div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!isTracking ? (
            <Button onClick={startWorkout} size="lg" className="gradient-primary gap-2 px-8">
              <Play className="w-5 h-5" />
              Start Workout
            </Button>
          ) : (
            <>
              <Button onClick={pauseWorkout} size="lg" variant="secondary" className="gap-2">
                {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
              <Button onClick={stopWorkout} size="lg" variant="destructive" className="gap-2">
                <Square className="w-5 h-5" />
                Stop & Save
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
