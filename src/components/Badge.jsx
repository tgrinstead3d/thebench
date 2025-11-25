import React from 'react';

const Badge = ({ children, color = "blue", icon: Icon }) => {
  const colors = {
    blue: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
    gray: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700",
    purple: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>
      {Icon && <Icon className="w-3 h-3 mr-1" />}
      {children}
    </span>
  );
};

export default Badge;
