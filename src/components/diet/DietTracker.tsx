import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Utensils, Coffee, Sun, Moon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const mealTypes = [
  { id: 'breakfast', name: 'Breakfast', icon: Coffee, time: '7:00 AM' },
  { id: 'lunch', name: 'Lunch', icon: Sun, time: '12:00 PM' },
  { id: 'dinner', name: 'Dinner', icon: Moon, time: '7:00 PM' },
  { id: 'snack', name: 'Snack', icon: Utensils, time: 'Anytime' },
];

export const DietTracker = () => {
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [foodInput, setFoodInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dailyStats, setDailyStats] = useState({
    calories: 1450,
    protein: 85,
    carbs: 180,
    fats: 45,
    goal: 2000,
  });
  const { user } = useAuth();
  const { toast } = useToast();

  const logMeal = async () => {
    if (!foodInput.trim() || !selectedMeal || !user) return;

    setIsAnalyzing(true);

    try {
      // Call diet advisor for analysis
      const response = await supabase.functions.invoke('diet-advisor', {
        body: {
          prompt: `Analyze this meal and estimate calories and macros: ${foodInput}. Return only numbers in format: calories|protein|carbs|fats`,
        },
      });

      // Simulate calorie estimation (in real app, parse AI response)
      const estimatedCalories = Math.round(200 + Math.random() * 400);
      const estimatedProtein = Math.round(10 + Math.random() * 30);
      const estimatedCarbs = Math.round(20 + Math.random() * 50);
      const estimatedFats = Math.round(5 + Math.random() * 20);

      const { error } = await supabase.from('diet_logs').insert({
        user_id: user.id,
        meal_type: selectedMeal,
        food_items: [{ name: foodInput }],
        total_calories: estimatedCalories,
        protein_g: estimatedProtein,
        carbs_g: estimatedCarbs,
        fats_g: estimatedFats,
      });

      if (error) throw error;

      setDailyStats((prev) => ({
        ...prev,
        calories: prev.calories + estimatedCalories,
        protein: prev.protein + estimatedProtein,
        carbs: prev.carbs + estimatedCarbs,
        fats: prev.fats + estimatedFats,
      }));

      toast({
        title: 'Meal Logged! 🍽️',
        description: `${foodInput} - ${estimatedCalories} calories`,
      });

      setFoodInput('');
      setSelectedMeal(null);
    } catch (error) {
      console.error('Error logging meal:', error);
      toast({
        title: 'Error',
        description: 'Failed to log meal',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const calorieProgress = (dailyStats.calories / dailyStats.goal) * 100;

  return (
    <div className="space-y-6">
      {/* Daily Summary */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-display font-semibold mb-4">Today's Nutrition</h3>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Calories</span>
            <span className="font-bold">{dailyStats.calories} / {dailyStats.goal} kcal</span>
          </div>
          <Progress value={Math.min(calorieProgress, 100)} className="h-4" />
          <p className="text-sm text-muted-foreground mt-2">
            {dailyStats.goal - dailyStats.calories > 0
              ? `${dailyStats.goal - dailyStats.calories} calories remaining`
              : 'Daily goal reached!'}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-muted">
            <p className="text-2xl font-bold text-primary">{dailyStats.protein}g</p>
            <p className="text-sm text-muted-foreground">Protein</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-muted">
            <p className="text-2xl font-bold text-energy">{dailyStats.carbs}g</p>
            <p className="text-sm text-muted-foreground">Carbs</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-muted">
            <p className="text-2xl font-bold text-success">{dailyStats.fats}g</p>
            <p className="text-sm text-muted-foreground">Fats</p>
          </div>
        </div>
      </div>

      {/* Meal Selection */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="font-display font-semibold mb-4">Log a Meal</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {mealTypes.map((meal) => (
            <button
              key={meal.id}
              onClick={() => setSelectedMeal(meal.id)}
              className={`p-4 rounded-xl text-center transition-all ${
                selectedMeal === meal.id
                  ? 'gradient-energy text-primary-foreground shadow-glow'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <meal.icon className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">{meal.name}</p>
              <p className="text-xs opacity-80">{meal.time}</p>
            </button>
          ))}
        </div>

        {selectedMeal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            <Textarea
              value={foodInput}
              onChange={(e) => setFoodInput(e.target.value)}
              placeholder="Describe your meal (e.g., 'Grilled chicken breast with rice and vegetables')"
              className="bg-muted border-0 min-h-[100px]"
            />
            <Button
              onClick={logMeal}
              disabled={isAnalyzing || !foodInput.trim()}
              className="w-full gradient-primary gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Log Meal
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
