import React from "react";
import { X, MessageSquare } from "lucide-react";
import { useApp } from "../../context/AppContext";
import ChatView from "./ChatView";

export default function ChatDrawer() {
  const { isChatDrawerOpen, setIsChatDrawerOpen } = useApp();

  if (!isChatDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-xl h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Campus Live Chat</h3>
          </div>
          <button
            onClick={() => setIsChatDrawerOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <ChatView isDrawer onCloseDrawer={() => setIsChatDrawerOpen(false)} />
        </div>
      </div>
    </div>
  );
}
