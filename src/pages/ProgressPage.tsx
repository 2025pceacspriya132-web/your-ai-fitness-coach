import { motion } from "framer-motion";
import { TrendingUp, Dumbbell, Wind, Target } from "lucide-react";
import { mockProgressData } from "@/lib/mock-data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const latestWeek = mockProgressData[mockProgressData.length - 1];
const prevWeek = mockProgressData[mockProgressData.length - 2];

const metrics = [
  { label: "Strength", current: latestWeek.strength, prev: prevWeek.strength, icon: Dumbbell, color: "text-primary" },
  { label: "Endurance", current: latestWeek.endurance, prev: prevWeek.endurance, icon: Wind, color: "text-accent" },
  { label: "Consistency", current: latestWeek.consistency, prev: prevWeek.consistency, icon: Target, color: "text-warning" },
];

const radarData = [
  { metric: "Strength", value: latestWeek.strength },
  { metric: "Endurance", value: latestWeek.endurance },
  { metric: "Consistency", value: latestWeek.consistency },
  { metric: "Flexibility", value: 42 },
  { metric: "Recovery", value: 70 },
];

const ProgressPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold font-display">
        <span className="text-gradient-energy">Progress</span> Tracking
      </h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((m, i) => {
          const change = m.current - m.prev;
          return (
            <motion.div key={m.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-card rounded-xl p-5 border border-border shadow-card">
              <div className="flex items-center justify-between mb-2">
                <m.icon className={`h-5 w-5 ${m.color}`} />
                <span className={`text-xs font-medium ${change >= 0 ? "text-accent" : "text-destructive"}`}>
                  {change >= 0 ? "+" : ""}{change}% <TrendingUp className="inline h-3 w-3" />
                </span>
              </div>
              <p className="text-3xl font-bold font-display">{m.current}%</p>
              <p className="text-xs text-muted-foreground mt-1">{m.label} Score</p>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Chart */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-xl p-5 border border-border shadow-card">
        <h3 className="text-sm font-semibold font-display mb-4">8-Week Progress</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={mockProgressData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
            <XAxis dataKey="week" stroke="hsl(215 15% 55%)" fontSize={12} />
            <YAxis stroke="hsl(215 15% 55%)" fontSize={12} />
            <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: "8px", color: "hsl(210 20% 95%)" }} />
            <Line type="monotone" dataKey="strength" stroke="hsl(25 95% 55%)" strokeWidth={2} dot={{ fill: "hsl(25 95% 55%)" }} />
            <Line type="monotone" dataKey="endurance" stroke="hsl(145 65% 45%)" strokeWidth={2} dot={{ fill: "hsl(145 65% 45%)" }} />
            <Line type="monotone" dataKey="consistency" stroke="hsl(45 93% 55%)" strokeWidth={2} dot={{ fill: "hsl(45 93% 55%)" }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-3 justify-center text-xs">
          <span className="flex items-center gap-1"><div className="w-3 h-0.5 bg-primary rounded" /> Strength</span>
          <span className="flex items-center gap-1"><div className="w-3 h-0.5 bg-accent rounded" /> Endurance</span>
          <span className="flex items-center gap-1"><div className="w-3 h-0.5 bg-warning rounded" /> Consistency</span>
        </div>
      </motion.div>

      {/* Radar Chart */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card rounded-xl p-5 border border-border shadow-card">
        <h3 className="text-sm font-semibold font-display mb-4">Fitness Profile</h3>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(220 15% 18%)" />
            <PolarAngleAxis dataKey="metric" stroke="hsl(215 15% 55%)" fontSize={12} />
            <PolarRadiusAxis stroke="hsl(215 15% 55%)" fontSize={10} />
            <Radar dataKey="value" stroke="hsl(25 95% 55%)" fill="hsl(25 95% 55% / 0.3)" strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default ProgressPage;
