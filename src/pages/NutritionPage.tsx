import { motion } from "framer-motion";
import { Apple, Clock, Flame, Beef, Wheat, Droplet } from "lucide-react";
import { mockMealPlan, mockRecipes } from "@/lib/mock-data";

const macroCards = [
  { label: "Protein", value: `${mockMealPlan.protein}g`, icon: Beef, color: "text-primary" },
  { label: "Carbs", value: `${mockMealPlan.carbs}g`, icon: Wheat, color: "text-warning" },
  { label: "Fat", value: `${mockMealPlan.fat}g`, icon: Droplet, color: "text-info" },
  { label: "Calories", value: `${mockMealPlan.calories}`, icon: Flame, color: "text-destructive" },
];

const NutritionPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold font-display">
        <span className="text-gradient-energy">Nutrition</span> Plan
      </h1>

      {/* Macros */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {macroCards.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-card rounded-xl p-4 border border-border shadow-card">
            <m.icon className={`h-5 w-5 ${m.color} mb-2`} />
            <p className="text-2xl font-bold font-display">{m.value}</p>
            <p className="text-xs text-muted-foreground">{m.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Today's Meals */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-xl p-5 border border-border shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <Apple className="h-4 w-4 text-accent" />
          <h2 className="text-lg font-bold font-display">Today's Meal Plan</h2>
        </div>
        <div className="space-y-3">
          {mockMealPlan.meals.map((meal, i) => (
            <div key={i} className="flex items-center justify-between bg-secondary rounded-lg p-4 hover:bg-muted transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full gradient-energy flex items-center justify-center text-primary-foreground text-xs font-bold">{i + 1}</div>
                <div>
                  <p className="text-sm font-medium">{meal.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{meal.time}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-primary">{meal.calories} cal</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Recipes */}
      <div>
        <h2 className="text-lg font-bold font-display mb-4">Quick Healthy Recipes</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mockRecipes.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="bg-card rounded-xl p-4 border border-border shadow-card hover:border-primary/40 transition-all cursor-pointer">
              <div className="text-4xl mb-3">{r.image}</div>
              <h3 className="text-sm font-semibold">{r.name}</h3>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Flame className="h-3 w-3" />{r.calories} cal</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{r.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;
