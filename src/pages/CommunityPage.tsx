import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Users, Swords, MessageCircle, UserPlus, Check, X } from "lucide-react";
import { mockLeaderboard, mockChallenges, mockFriendRequests, mockMessages } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

const CommunityPage = () => {
  const [tab, setTab] = useState<"leaderboard" | "challenges" | "friends" | "chat">("leaderboard");
  const [requests, setRequests] = useState(mockFriendRequests);

  const tabs = [
    { id: "leaderboard" as const, label: "Leaderboard", icon: Trophy },
    { id: "challenges" as const, label: "Challenges", icon: Swords },
    { id: "friends" as const, label: "Friends", icon: Users },
    { id: "chat" as const, label: "Chat", icon: MessageCircle },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold font-display">
        <span className="text-gradient-energy">Community</span>
      </h1>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              tab === t.id ? "gradient-energy text-primary-foreground" : "bg-card text-muted-foreground hover:bg-secondary border border-border"
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      {tab === "leaderboard" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          {mockLeaderboard.map((u, i) => (
            <div key={u.id} className={`flex items-center justify-between p-4 ${i !== mockLeaderboard.length - 1 ? "border-b border-border" : ""} hover:bg-secondary/50 transition-colors`}>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold font-display w-6 text-center text-muted-foreground">{i + 1}</span>
                <span className="text-2xl">{u.avatar}</span>
                <div>
                  <p className="text-sm font-semibold">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.workouts} workouts</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-streak">🔥 {u.streak}</p>
                <p className="text-xs text-muted-foreground">day streak</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Challenges */}
      {tab === "challenges" && (
        <div className="space-y-4">
          {mockChallenges.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-card rounded-xl p-5 border border-border shadow-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold font-display">{c.name}</h3>
                <span className="text-xs text-warning font-medium">{c.daysLeft}d left</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span>Goal: {c.goal.toLocaleString()} {c.unit}</span>
                <span>{c.participants} participants</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${c.progress}%` }} transition={{ duration: 1 }} className="h-full gradient-energy rounded-full" />
              </div>
              <p className="text-xs text-primary mt-2 font-medium">{c.progress}% complete</p>
            </motion.div>
          ))}
          <Button className="w-full gradient-energy text-primary-foreground hover:opacity-90">
            <Swords className="h-4 w-4 mr-2" /> Create Challenge
          </Button>
        </div>
      )}

      {/* Friends */}
      {tab === "friends" && (
        <div className="space-y-4">
          {requests.length > 0 && (
            <div className="bg-card rounded-xl p-5 border border-border shadow-card">
              <h3 className="text-sm font-semibold font-display mb-3 flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-primary" /> Friend Requests
              </h3>
              {requests.map((r) => (
                <div key={r.id} className="flex items-center justify-between py-2">
                  <span className="text-sm">{r.name}</span>
                  <div className="flex gap-2">
                    <button onClick={() => setRequests((p) => p.filter((x) => x.id !== r.id))} className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center hover:bg-accent/40 transition-colors">
                      <Check className="h-4 w-4 text-accent" />
                    </button>
                    <button onClick={() => setRequests((p) => p.filter((x) => x.id !== r.id))} className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center hover:bg-destructive/40 transition-colors">
                      <X className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Button className="w-full" variant="outline"><UserPlus className="h-4 w-4 mr-2" /> Add Friend</Button>
        </div>
      )}

      {/* Chat */}
      {tab === "chat" && (
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold font-display">Community Chat</h3>
          </div>
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            {mockMessages.map((m) => (
              <div key={m.id} className="bg-secondary rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-primary">{m.sender}</span>
                  <span className="text-xs text-muted-foreground">{m.time}</span>
                </div>
                <p className="text-sm">{m.message}</p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border flex gap-2">
            <input className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Type a message..." />
            <Button className="gradient-energy text-primary-foreground hover:opacity-90">Send</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPage;
