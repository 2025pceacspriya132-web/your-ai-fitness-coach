import { type Workout, mockWorkouts } from "./mock-data";

export interface UserState {
  steps: number;
  fatigueLevel: "fresh" | "normal" | "tired" | "exhausted";
  lastDifficulty: "Easy" | "Medium" | "Hard";
  lastFeedback: "too_easy" | "just_right" | "too_hard" | null;
  preferredTypes: string[];
}

export function getRecommendedWorkout(state: UserState): Workout {
  let targetDifficulty: "Easy" | "Medium" | "Hard" = "Medium";
  let preferredType: string | null = null;

  // Step-based logic
  if (state.steps > 8000) {
    targetDifficulty = "Easy";
    preferredType = "Yoga";
  } else if (state.steps < 3000) {
    targetDifficulty = "Hard";
    preferredType = "Strength";
  }

  // Fatigue override
  if (state.fatigueLevel === "tired" || state.fatigueLevel === "exhausted") {
    targetDifficulty = "Easy";
    preferredType = "Recovery";
  }

  // Feedback adjustment
  if (state.lastFeedback === "too_easy") {
    if (targetDifficulty === "Easy") targetDifficulty = "Medium";
    else if (targetDifficulty === "Medium") targetDifficulty = "Hard";
  } else if (state.lastFeedback === "too_hard") {
    if (targetDifficulty === "Hard") targetDifficulty = "Medium";
    else if (targetDifficulty === "Medium") targetDifficulty = "Easy";
  }

  // Find best match
  let candidates = mockWorkouts.filter((w) => w.difficulty === targetDifficulty);
  if (preferredType) {
    const typed = candidates.filter((w) => w.type === preferredType);
    if (typed.length > 0) candidates = typed;
  }

  if (candidates.length === 0) candidates = mockWorkouts;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function getCoachMessage(state: UserState): string {
  if (state.fatigueLevel === "exhausted") {
    return "Your body needs rest today. Let's do a gentle recovery session. 🧘";
  }
  if (state.fatigueLevel === "tired") {
    return "You seem tired. A light workout will help you recover without overtraining. 💆";
  }
  if (state.steps > 8000) {
    return "You've been very active today! Let's keep it light with some stretching. 🚶";
  }
  if (state.steps < 3000) {
    return "Time to get moving! An intense workout will fire up your metabolism. 🔥";
  }
  if (state.lastFeedback === "too_easy") {
    return "Ready for a bigger challenge? Let's push your limits today! 💪";
  }
  return "Looking good! Here's a balanced workout to keep your momentum. ⚡";
}
