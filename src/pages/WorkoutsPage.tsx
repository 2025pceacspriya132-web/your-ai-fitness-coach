import { useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Clock, Flame, Star, ThumbsUp, ThumbsDown, Minus, Brain } from "lucide-react";
import { mockWorkouts, mockStats, type Workout } from "@/lib/mock-data";
import { getRecommendedWorkout, getCoachMessage, type UserState } from "@/lib/ai-coach";
import { Button } from "@/components/ui/button";

const diffColors = { Easy: "text-accent", Medium: "text-warning", Hard: "text-destructive" };
const typeIcons: Record<string, string> = { Strength: "🏋️", Yoga: "🧘", Aerobics: "🏃", Flexibility: "🤸", Recovery: "💆" };

const WorkoutsPage = () => {
  const [userState, setUserState] = useState<UserState>({
    steps: mockStats.steps,
    fatigueLevel: "normal",
    lastDifficulty: "Medium",
    lastFeedback: null,
    preferredTypes: [],
  });

  const [recommended, setRecommended] = useState<Workout>(() => getRecommendedWorkout(userState));
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [rating, setRating] = useState(0);
  const coachMessage = getCoachMessage(userState);

  const handleFeedback = (fb: "too_easy" | "just_right" | "too_hard") => {
    const newState = { ...userState, lastFeedback: fb };
    setUserState(newState);
    setRecommended(getRecommendedWorkout(newState));
  };

  const handleFatigue = (level: UserState["fatigueLevel"]) => {
    const newState = { ...userState, fatigueLevel: level };
    setUserState(newState);
    setRecommended(getRecommendedWorkout(newState));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold font-display">
        <span className="text-gradient-energy">AI Coach</span> Workouts
      </h1>

      {/* Coach Message */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl p-5 border border-border shadow-card">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full gradient-energy flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary mb-1">AI Coach Says</p>
            <p className="text-foreground">{coachMessage}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">How do you feel?</span>
          {(["fresh", "normal", "tired", "exhausted"] as const).map((l) => (
            <button
              key={l}
              onClick={() => handleFatigue(l)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                userState.fatigueLevel === l ? "gradient-energy text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Recommended Workout */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-card rounded-xl p-6 border-2 border-primary/30 shadow-glow-primary">
        <div className="flex items-center gap-2 mb-1">
          <Star className="h-4 w-4 text-warning" />
          <span className="text-xs font-semibold text-warning uppercase tracking-wider">Recommended for you</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold font-display flex items-center gap-2">
              <span className="text-2xl">{typeIcons[recommended.type]}</span>
              {recommended.name}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">{recommended.description}</p>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{recommended.duration} min</span>
              <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5" />{recommended.calories} cal</span>
              <span className={diffColors[recommended.difficulty]}>{recommended.difficulty}</span>
            </div>
          </div>
          <Button className="gradient-energy text-primary-foreground hover:opacity-90" onClick={() => setSelectedWorkout(recommended)}>
            Start Workout
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">How was your last workout?</p>
          <div className="flex gap-2">
            <button onClick={() => handleFeedback("too_easy")} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary text-xs hover:bg-accent hover:text-accent-foreground transition-all">
              <ThumbsUp className="h-3 w-3" /> Too Easy
            </button>
            <button onClick={() => handleFeedback("just_right")} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary text-xs hover:bg-accent hover:text-accent-foreground transition-all">
              <Minus className="h-3 w-3" /> Just Right
            </button>
            <button onClick={() => handleFeedback("too_hard")} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary text-xs hover:bg-accent hover:text-accent-foreground transition-all">
              <ThumbsDown className="h-3 w-3" /> Too Hard
            </button>
          </div>
        </div>
      </motion.div>

      {/* All Workouts */}
      <div>
        <h2 className="text-lg font-bold font-display mb-4">All Workouts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockWorkouts.map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-5 border border-border shadow-card hover:border-primary/40 transition-all cursor-pointer"
              onClick={() => setSelectedWorkout(w)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{typeIcons[w.type]}</span>
                <span className={`text-xs font-medium ${diffColors[w.difficulty]}`}>{w.difficulty}</span>
              </div>
              <h3 className="font-semibold font-display">{w.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{w.description}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{w.duration}m</span>
                <span className="flex items-center gap-1"><Flame className="h-3 w-3" />{w.calories} cal</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Workout Detail Modal */}
      {selectedWorkout && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedWorkout(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-2xl p-6 max-w-md w-full border border-border shadow-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl mb-3">{typeIcons[selectedWorkout.type]}</div>
            <h2 className="text-xl font-bold font-display">{selectedWorkout.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">{selectedWorkout.description}</p>

            <div className="flex gap-4 mt-4 text-sm">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-primary" />{selectedWorkout.duration} min</span>
              <span className="flex items-center gap-1"><Flame className="h-4 w-4 text-primary" />{selectedWorkout.calories} cal</span>
              <span className={diffColors[selectedWorkout.difficulty]}>{selectedWorkout.difficulty}</span>
            </div>

            <div className="mt-5">
              <h4 className="text-sm font-semibold mb-2">Exercises</h4>
              <ul className="space-y-2">
                {selectedWorkout.exercises.map((ex, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    {ex}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <p className="text-xs text-muted-foreground mb-2">Rate this workout</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} onClick={() => setRating(s)}>
                    <Star className={`h-5 w-5 ${s <= rating ? "text-warning fill-warning" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button className="flex-1 gradient-energy text-primary-foreground hover:opacity-90">Start</Button>
              <Button variant="outline" className="flex-1" onClick={() => setSelectedWorkout(null)}>Close</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WorkoutsPage;
