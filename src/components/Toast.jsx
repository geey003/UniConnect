import React from "react";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-900/10 dark:shadow-black/40 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      {icons[toast.type] || icons.info}
      <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{toast.message}</span>
    </div>
  );
}
