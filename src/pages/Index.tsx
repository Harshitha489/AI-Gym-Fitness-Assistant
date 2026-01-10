import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Dumbbell, Utensils, Activity, MessageCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const features = [
  {
    icon: Dumbbell,
    title: 'AI Workout Trainer',
    description: 'Smart posture detection and real-time feedback during exercises',
  },
  {
    icon: Utensils,
    title: 'Diet & Nutrition Coach',
    description: 'Personalized meal plans and calorie tracking powered by AI',
  },
  {
    icon: Activity,
    title: 'IoT Gym Equipment',
    description: 'Connect and monitor smart fitness equipment in real-time',
  },
  {
    icon: MessageCircle,
    title: 'Virtual Gym Buddy',
    description: 'AI companion for motivation, tips, and fitness guidance',
  },
  {
    icon: TrendingUp,
    title: 'Progress Analytics',
    description: 'Detailed insights and performance tracking over time',
  },
];

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-dark)' }}>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">AI-Powered Fitness</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              Your Personal
              <br />
              <span className="text-gradient-primary">AI Fitness Assistant</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Transform your fitness journey with AI-powered workouts, nutrition coaching,
              smart equipment integration, and a virtual gym buddy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary text-lg px-8">
                <Link to="/auth">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground text-lg">
            A complete AI fitness ecosystem at your fingertips
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 hover:shadow-glow transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-glow"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Transform Your Fitness?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Join thousands of athletes using AI to reach their fitness goals faster than ever.
          </p>
          <Button asChild size="lg" className="gradient-primary text-lg px-10">
            <Link to="/auth">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 FitAI. Built with ❤️ for fitness enthusiasts.</p>
        </div>
      </footer>
    </div>
  );
}
