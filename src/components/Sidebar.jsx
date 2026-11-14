import React from "react";
import {
  Flame,
  Users,
  Compass,
  Calendar,
  MessageSquare,
  Award,
  BookOpen,
  Coffee,
  Hash,
  ShieldCheck,
  TrendingUp,
  Radio,
  Ghost
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Sidebar() {
  const { activeTab, setActiveTab, currentUser, setSearchQuery } = useApp();

  const navItems = [
    { id: "feed", label: "Campus Feed", icon: Flame, badge: "Live" },
    { id: "confessions", label: "Confessions Vault", icon: Ghost, badge: "Anon 🤫" },
    { id: "study", label: "Study Pods Matcher", icon: Users, badge: "Hot" },
    { id: "clubs", label: "Clubs & Guilds", icon: Compass, badge: null },
    { id: "events", label: "Campus Events", icon: Calendar, badge: "5 This Wk" },
    { id: "chat", label: "Student Chatrooms", icon: MessageSquare, badge: null }
  ];

  const trendingTopics = [
    { tag: "#CS310Midterms", count: "348 posts" },
    { tag: "#Hackathon2026", count: "215 posts" },
    { tag: "#UndergroundBeanCoffee", count: "182 posts" },
    { tag: "#SpringHousingSwap", count: "95 posts" },
    { tag: "#QuadAcousticJam", count: "64 posts" }
  ];

  return (
    <aside className="w-64 shrink-0 space-y-6">
      {/* Navigation Menu */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-3 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Campus Navigation
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Student Karma / Quick Profile Card */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-5 text-white shadow-lg shadow-indigo-500/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-200 mb-2">
          <Award className="w-4 h-4" />
          <span>Campus Karma</span>
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-extrabold tracking-tight">{currentUser.campusReputation}</span>
          <span className="text-xs text-indigo-200 font-medium">Rep Points</span>
        </div>
        <p className="text-xs text-indigo-100/90 leading-relaxed mb-4">
          Earned by helping classmates solve algorithm questions & hosting study pods!
        </p>
        <div className="pt-3 border-t border-indigo-400/30 flex items-center justify-between text-xs text-indigo-200">
          <span>Enrolled Courses</span>
          <span className="font-bold text-white">{currentUser.courses.length} Classes</span>
        </div>
      </div>

      {/* Trending Campus Topics */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
          <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
          <span>Campus Trending</span>
        </div>
        <div className="space-y-2.5">
          {trendingTopics.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setActiveTab("feed");
                setSearchQuery(item.tag);
              }}
              className="flex items-center justify-between text-xs cursor-pointer group hover:bg-slate-50 dark:hover:bg-slate-800/50 p-1.5 rounded-xl transition"
            >
              <div className="flex items-center gap-2">
                <Hash className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {item.tag}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Support & Safety */}
      <div className="p-4 rounded-3xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-3">
        <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
        <div>
          <span className="font-semibold text-slate-700 dark:text-slate-300 block">Verified Student Space</span>
          <span>Only @uni.edu authenticated peers can participate.</span>
        </div>
      </div>
    </aside>
  );
}
