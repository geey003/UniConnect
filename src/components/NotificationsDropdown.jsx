import React from "react";
import { Check, Bell, BookOpen, Calendar, Heart, MessageSquare } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function NotificationsDropdown({ isOpen, onClose }) {
  const { notifications, markAllNotifsAsRead } = useApp();

  if (!isOpen) return null;

  const getTypeIcon = (type) => {
    switch (type) {
      case "study":
        return <BookOpen className="w-3.5 h-3.5 text-indigo-500" />;
      case "event":
        return <Calendar className="w-3.5 h-3.5 text-amber-500" />;
      case "like":
        return <Heart className="w-3.5 h-3.5 text-rose-500" />;
      default:
        return <MessageSquare className="w-3.5 h-3.5 text-sky-500" />;
    }
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-900/15 dark:shadow-black/50 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Campus Notifications</h3>
        </div>
        <button
          onClick={markAllNotifsAsRead}
          className="text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 flex items-center gap-1 transition"
        >
          <Check className="w-3.5 h-3.5" />
          Mark all read
        </button>
      </div>

      <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">No new notifications</div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3.5 flex gap-3 transition hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                !notif.read ? "bg-indigo-50/50 dark:bg-indigo-950/20" : ""
              }`}
            >
              <div className="relative shrink-0">
                <img
                  src={notif.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <span className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-slate-900 rounded-full shadow-sm">
                  {getTypeIcon(notif.type)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {notif.title}
                  </span>
                  <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">{notif.message}</p>
              </div>
              {!notif.read && (
                <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 self-center shrink-0" />
              )}
            </div>
          ))
        )}
      </div>

      <div className="p-2.5 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 text-center">
        <span className="text-xs text-slate-500 dark:text-slate-400">Stay updated on your study pods & campus life</span>
      </div>
    </div>
  );
}
