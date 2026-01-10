import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Activity, Thermometer, Timer, Flame } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface SensorData {
  heartRate: number;
  resistance: number;
  reps: number;
  calories: number;
  temperature: number;
  duration: number;
}

const SensorCard = ({
  icon: Icon,
  label,
  value,
  unit,
  color,
  trend,
}: {
  icon: typeof Heart;
  label: string;
  value: number;
  unit: string;
  color: string;
  trend?: number[];
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="stat-card"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6 text-primary-foreground" />
      </div>
    </div>
    <p className="text-muted-foreground text-sm mb-1">{label}</p>
    <p className="text-3xl font-display font-bold">
      {value}
      <span className="text-lg text-muted-foreground ml-1">{unit}</span>
    </p>
    {trend && (
      <div className="h-16 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend.map((v, i) => ({ value: v, index: i }))}>
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(187, 100%, 50%)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}
  </motion.div>
);

export const IoTDashboard = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    heartRate: 75,
    resistance: 5,
    reps: 0,
    calories: 0,
    temperature: 22.5,
    duration: 0,
  });
  const [heartRateTrend, setHeartRateTrend] = useState<number[]>([75, 78, 76, 80, 82, 79, 85]);
  const [isConnected, setIsConnected] = useState(true);

  // Simulate IoT sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prev) => {
        const newHeartRate = Math.max(60, Math.min(180, prev.heartRate + (Math.random() - 0.5) * 10));
        setHeartRateTrend((trend) => [...trend.slice(-9), newHeartRate]);
        
        return {
          heartRate: Math.round(newHeartRate),
          resistance: Math.max(1, Math.min(10, prev.resistance + (Math.random() - 0.5) * 0.5)),
          reps: prev.reps + (Math.random() > 0.7 ? 1 : 0),
          calories: prev.calories + Math.random() * 2,
          temperature: Math.max(20, Math.min(25, prev.temperature + (Math.random() - 0.5) * 0.3)),
          duration: prev.duration + 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="glass-card rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-success animate-pulse' : 'bg-destructive'
            }`}
          />
          <span className="font-medium">
            {isConnected ? 'Connected to Smart Equipment' : 'Disconnected'}
          </span>
        </div>
        <button
          onClick={() => setIsConnected(!isConnected)}
          className="text-sm text-primary hover:underline"
        >
          {isConnected ? 'Disconnect' : 'Connect'}
        </button>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SensorCard
          icon={Heart}
          label="Heart Rate"
          value={sensorData.heartRate}
          unit="BPM"
          color="bg-destructive"
          trend={heartRateTrend}
        />
        <SensorCard
          icon={Zap}
          label="Resistance Level"
          value={Math.round(sensorData.resistance)}
          unit="/ 10"
          color="gradient-primary"
        />
        <SensorCard
          icon={Activity}
          label="Reps Detected"
          value={sensorData.reps}
          unit="reps"
          color="gradient-success"
        />
        <SensorCard
          icon={Flame}
          label="Calories Burned"
          value={Math.round(sensorData.calories)}
          unit="kcal"
          color="gradient-energy"
        />
        <SensorCard
          icon={Thermometer}
          label="Room Temperature"
          value={Math.round(sensorData.temperature * 10) / 10}
          unit="°C"
          color="bg-secondary"
        />
        <SensorCard
          icon={Timer}
          label="Session Duration"
          value={formatDuration(sensorData.duration) as unknown as number}
          unit=""
          color="gradient-primary"
        />
      </div>

      {/* Heart Rate Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="font-display font-semibold mb-4">Heart Rate Monitor</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={heartRateTrend.map((value, index) => ({ value, index }))}>
              <XAxis dataKey="index" hide />
              <YAxis domain={[50, 200]} hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222, 47%, 9%)',
                  border: '1px solid hsl(217, 33%, 17%)',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value} BPM`, 'Heart Rate']}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(0, 84%, 60%)"
                strokeWidth={3}
                dot={false}
                animationDuration={0}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground mt-4">
          <span>Min: {Math.min(...heartRateTrend)} BPM</span>
          <span>Avg: {Math.round(heartRateTrend.reduce((a, b) => a + b, 0) / heartRateTrend.length)} BPM</span>
          <span>Max: {Math.max(...heartRateTrend)} BPM</span>
        </div>
      </motion.div>
    </div>
  );
};
