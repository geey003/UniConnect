import React from "react";
import { Flame, Ghost, Users, Compass, Calendar, MessageSquare } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function MobileNav() {
  const { activeTab, setActiveTab } = useApp();

  const navItems = [
    { id: "feed", label: "Feed", icon: Flame },
    { id: "confessions", label: "Secrets", icon: Ghost },
    { id: "study", label: "Study", icon: Users },
    { id: "clubs", label: "Clubs", icon: Compass },
    { id: "events", label: "Events", icon: Calendar },
    { id: "chat", label: "Chat", icon: MessageSquare }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-1.5 transition ${
              isActive
                ? "text-indigo-600 dark:text-indigo-400 font-bold"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px]">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
