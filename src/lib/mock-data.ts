// Mock data for the fitness app

export const mockUser = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "",
  streak: 12,
  level: "Intermediate",
  joinDate: "2024-01-15",
};

export const mockStats = {
  steps: 6542,
  stepsGoal: 10000,
  heartRate: 72,
  caloriesBurned: 485,
  caloriesGoal: 600,
  activeMinutes: 45,
  activeMinutesGoal: 60,
  waterIntake: 5,
  waterGoal: 8,
};

export const mockWeeklySteps = [
  { day: "Mon", steps: 8200 },
  { day: "Tue", steps: 6300 },
  { day: "Wed", steps: 9100 },
  { day: "Thu", steps: 5400 },
  { day: "Fri", steps: 7800 },
  { day: "Sat", steps: 10200 },
  { day: "Sun", steps: 6542 },
];

export const mockWeeklyCalories = [
  { day: "Mon", burned: 520, consumed: 1900 },
  { day: "Tue", burned: 380, consumed: 2100 },
  { day: "Wed", burned: 610, consumed: 1800 },
  { day: "Thu", burned: 290, consumed: 2200 },
  { day: "Fri", burned: 480, consumed: 1950 },
  { day: "Sat", burned: 700, consumed: 2300 },
  { day: "Sun", burned: 485, consumed: 2000 },
];

export const mockProgressData = [
  { week: "W1", strength: 30, endurance: 25, consistency: 60 },
  { week: "W2", strength: 35, endurance: 30, consistency: 70 },
  { week: "W3", strength: 38, endurance: 35, consistency: 65 },
  { week: "W4", strength: 42, endurance: 40, consistency: 80 },
  { week: "W5", strength: 45, endurance: 42, consistency: 75 },
  { week: "W6", strength: 50, endurance: 48, consistency: 85 },
  { week: "W7", strength: 55, endurance: 52, consistency: 90 },
  { week: "W8", strength: 58, endurance: 55, consistency: 88 },
];

export type WorkoutType = "Strength" | "Yoga" | "Aerobics" | "Flexibility" | "Recovery";

export interface Workout {
  id: string;
  name: string;
  type: WorkoutType;
  duration: number;
  calories: number;
  difficulty: "Easy" | "Medium" | "Hard";
  exercises: string[];
  description: string;
}

export const mockWorkouts: Workout[] = [
  {
    id: "w1",
    name: "Full Body Blitz",
    type: "Strength",
    duration: 45,
    calories: 400,
    difficulty: "Hard",
    exercises: ["Squats", "Deadlifts", "Bench Press", "Pull-ups", "Planks"],
    description: "High-intensity full body strength session",
  },
  {
    id: "w2",
    name: "Morning Flow",
    type: "Yoga",
    duration: 30,
    calories: 150,
    difficulty: "Easy",
    exercises: ["Sun Salutation", "Warrior I", "Tree Pose", "Child's Pose", "Savasana"],
    description: "Gentle yoga flow to start your day right",
  },
  {
    id: "w3",
    name: "Cardio Burn",
    type: "Aerobics",
    duration: 35,
    calories: 350,
    difficulty: "Medium",
    exercises: ["Jump Rope", "Burpees", "Mountain Climbers", "High Knees", "Box Jumps"],
    description: "Get your heart pumping with this cardio blast",
  },
  {
    id: "w4",
    name: "Deep Stretch",
    type: "Flexibility",
    duration: 25,
    calories: 100,
    difficulty: "Easy",
    exercises: ["Hamstring Stretch", "Hip Flexor", "Shoulder Opener", "Spinal Twist", "Pigeon Pose"],
    description: "Improve flexibility and prevent injuries",
  },
  {
    id: "w5",
    name: "Active Recovery",
    type: "Recovery",
    duration: 20,
    calories: 80,
    difficulty: "Easy",
    exercises: ["Foam Rolling", "Light Walking", "Gentle Stretching", "Breathing", "Meditation"],
    description: "Rest day recovery to help muscles heal",
  },
  {
    id: "w6",
    name: "Upper Body Power",
    type: "Strength",
    duration: 40,
    calories: 350,
    difficulty: "Hard",
    exercises: ["Overhead Press", "Dumbbell Rows", "Chest Flyes", "Tricep Dips", "Bicep Curls"],
    description: "Build upper body strength and definition",
  },
];

export interface MealPlan {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: { name: string; time: string; calories: number }[];
}

export const mockMealPlan: MealPlan = {
  id: "mp1",
  name: "Balanced Fitness Plan",
  calories: 2000,
  protein: 150,
  carbs: 200,
  fat: 67,
  meals: [
    { name: "Oatmeal with Berries & Protein", time: "7:00 AM", calories: 450 },
    { name: "Grilled Chicken Salad", time: "12:00 PM", calories: 550 },
    { name: "Greek Yogurt & Almonds", time: "3:00 PM", calories: 200 },
    { name: "Salmon with Quinoa & Veggies", time: "7:00 PM", calories: 600 },
    { name: "Casein Protein Shake", time: "9:00 PM", calories: 200 },
  ],
};

export const mockRecipes = [
  { id: "r1", name: "Protein Pancakes", calories: 350, time: "15 min", image: "🥞" },
  { id: "r2", name: "Chicken Stir Fry", calories: 420, time: "20 min", image: "🍳" },
  { id: "r3", name: "Quinoa Power Bowl", calories: 380, time: "15 min", image: "🥗" },
  { id: "r4", name: "Salmon & Avocado", calories: 450, time: "25 min", image: "🐟" },
  { id: "r5", name: "Green Smoothie", calories: 200, time: "5 min", image: "🥤" },
  { id: "r6", name: "Turkey Wrap", calories: 320, time: "10 min", image: "🌯" },
];

export const mockLeaderboard = [
  { id: "u1", name: "Sarah K.", streak: 45, workouts: 120, avatar: "🏆" },
  { id: "u2", name: "Mike R.", streak: 38, workouts: 98, avatar: "🥈" },
  { id: "u3", name: "Alex J.", streak: 12, workouts: 75, avatar: "🥉" },
  { id: "u4", name: "Emma L.", streak: 30, workouts: 88, avatar: "💪" },
  { id: "u5", name: "Chris D.", streak: 22, workouts: 65, avatar: "🔥" },
  { id: "u6", name: "Priya M.", streak: 18, workouts: 52, avatar: "⭐" },
];

export const mockChallenges = [
  { id: "c1", name: "10K Steps Challenge", goal: 10000, unit: "steps", participants: 24, daysLeft: 5, progress: 68 },
  { id: "c2", name: "7-Day Yoga Streak", goal: 7, unit: "days", participants: 15, daysLeft: 3, progress: 57 },
  { id: "c3", name: "500 Cal Burn", goal: 500, unit: "cal", participants: 32, daysLeft: 1, progress: 85 },
];

export const mockFriendRequests = [
  { id: "fr1", name: "Jordan T.", status: "pending" as const },
  { id: "fr2", name: "Riley S.", status: "pending" as const },
];

export const mockMessages = [
  { id: "m1", sender: "Sarah K.", message: "Great workout today! 💪", time: "2 min ago" },
  { id: "m2", sender: "Mike R.", message: "Anyone up for the step challenge?", time: "15 min ago" },
  { id: "m3", sender: "Emma L.", message: "Just hit my PR on deadlifts!", time: "1 hr ago" },
];

export const mockQuote = {
  q: "The only bad workout is the one that didn't happen.",
  a: "Unknown",
};

export const mockWeather = {
  temp: 22,
  condition: "Partly Cloudy",
  icon: "⛅",
  recommendation: "Great weather for an outdoor run!",
};

export const mockVideos = [
  { id: "v1", title: "15-Min HIIT Workout", channel: "FitLife", views: "1.2M", thumbnail: "🎬" },
  { id: "v2", title: "Morning Yoga Routine", channel: "ZenFit", views: "890K", thumbnail: "🧘" },
  { id: "v3", title: "Full Body Strength", channel: "IronCore", views: "2.1M", thumbnail: "🏋️" },
  { id: "v4", title: "Flexibility Training", channel: "StretchPro", views: "650K", thumbnail: "🤸" },
];
