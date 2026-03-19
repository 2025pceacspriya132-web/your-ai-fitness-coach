import { motion } from "framer-motion";
import { Footprints, Heart, Flame, Timer, Droplets, Zap, Cloud, Quote, Play } from "lucide-react";
import { mockStats, mockWeeklySteps, mockWeeklyCalories, mockQuote, mockWeather, mockVideos, mockUser } from "@/lib/mock-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const statCards = [
  { label: "Steps", value: mockStats.steps.toLocaleString(), goal: mockStats.stepsGoal.toLocaleString(), icon: Footprints, pct: (mockStats.steps / mockStats.stepsGoal) * 100, color: "primary" },
  { label: "Heart Rate", value: `${mockStats.heartRate} bpm`, goal: "Resting", icon: Heart, pct: 72, color: "destructive" },
  { label: "Calories", value: mockStats.caloriesBurned.toString(), goal: mockStats.caloriesGoal.toString(), icon: Flame, pct: (mockStats.caloriesBurned / mockStats.caloriesGoal) * 100, color: "accent" },
  { label: "Active Min", value: `${mockStats.activeMinutes}`, goal: `${mockStats.activeMinutesGoal}`, icon: Timer, pct: (mockStats.activeMinutes / mockStats.activeMinutesGoal) * 100, color: "info" },
];

const card = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.08 } });

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">
            Welcome back, <span className="text-gradient-energy">{mockUser.name}</span>
          </h1>
          <p className="text-muted-foreground mt-1">Let's crush today's goals</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-card rounded-xl px-4 py-2 border border-border">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-xs text-muted-foreground">Streak</p>
              <p className="text-lg font-bold text-streak">{mockUser.streak} days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div key={s.label} {...card(i)} className="bg-card rounded-xl p-4 border border-border shadow-card">
            <div className="flex items-center justify-between mb-3">
              <s.icon className="h-5 w-5 text-primary" />
              <span className="text-xs text-muted-foreground">{s.goal}</span>
            </div>
            <p className="text-2xl font-bold font-display">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(s.pct, 100)}%` }}
                transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                className="h-full rounded-full gradient-energy"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div {...card(4)} className="bg-card rounded-xl p-5 border border-border shadow-card">
          <h3 className="text-sm font-semibold font-display mb-4">Weekly Steps</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockWeeklySteps}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
              <XAxis dataKey="day" stroke="hsl(215 15% 55%)" fontSize={12} />
              <YAxis stroke="hsl(215 15% 55%)" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "8px", color: "hsl(210 20% 95%)" }} />
              <Area type="monotone" dataKey="steps" stroke="hsl(25 95% 55%)" fill="hsl(25 95% 55% / 0.2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div {...card(5)} className="bg-card rounded-xl p-5 border border-border shadow-card">
          <h3 className="text-sm font-semibold font-display mb-4">Calories This Week</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockWeeklyCalories}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
              <XAxis dataKey="day" stroke="hsl(215 15% 55%)" fontSize={12} />
              <YAxis stroke="hsl(215 15% 55%)" fontSize={12} />
              <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "8px", color: "hsl(210 20% 95%)" }} />
              <Bar dataKey="burned" fill="hsl(25 95% 55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="consumed" fill="hsl(145 65% 45% / 0.5)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Weather */}
        <motion.div {...card(6)} className="bg-card rounded-xl p-5 border border-border shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <Cloud className="h-4 w-4 text-info" />
            <h3 className="text-sm font-semibold font-display">Weather</h3>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{mockWeather.icon}</span>
            <div>
              <p className="text-2xl font-bold">{mockWeather.temp}°C</p>
              <p className="text-xs text-muted-foreground">{mockWeather.condition}</p>
            </div>
          </div>
          <p className="text-xs text-accent">{mockWeather.recommendation}</p>
        </motion.div>

        {/* Motivation */}
        <motion.div {...card(7)} className="bg-card rounded-xl p-5 border border-border shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <Quote className="h-4 w-4 text-warning" />
            <h3 className="text-sm font-semibold font-display">Daily Motivation</h3>
          </div>
          <p className="text-sm italic text-foreground leading-relaxed">"{mockQuote.q}"</p>
          <p className="text-xs text-muted-foreground mt-2">— {mockQuote.a}</p>
        </motion.div>

        {/* Water */}
        <motion.div {...card(8)} className="bg-card rounded-xl p-5 border border-border shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <Droplets className="h-4 w-4 text-info" />
            <h3 className="text-sm font-semibold font-display">Hydration</h3>
          </div>
          <p className="text-3xl font-bold">{mockStats.waterIntake}<span className="text-sm text-muted-foreground font-normal">/{mockStats.waterGoal} glasses</span></p>
          <div className="flex gap-1 mt-3">
            {Array.from({ length: mockStats.waterGoal }).map((_, i) => (
              <div key={i} className={`h-6 flex-1 rounded-md ${i < mockStats.waterIntake ? "bg-info" : "bg-secondary"}`} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Videos */}
      <motion.div {...card(9)} className="bg-card rounded-xl p-5 border border-border shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Play className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold font-display">Recommended Videos</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {mockVideos.map((v) => (
            <div key={v.id} className="bg-secondary rounded-lg p-4 hover:bg-muted transition-colors cursor-pointer">
              <div className="text-3xl mb-2">{v.thumbnail}</div>
              <p className="text-sm font-medium truncate">{v.title}</p>
              <p className="text-xs text-muted-foreground">{v.channel} · {v.views}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
