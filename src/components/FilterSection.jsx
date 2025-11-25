import React from 'react';

const FilterSection = ({ title, options, selected, onChange, type = "checkbox" }) => (
  <div className="mb-6">
    <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">{title}</h3>
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center group cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-red-600 rounded border-slate-300 dark:border-neutral-600 focus:ring-red-500 dark:bg-neutral-700 transition duration-150 ease-in-out"
            checked={selected.includes(option)}
            onChange={() => onChange(option)}
          />
          <span className="ml-3 text-sm text-slate-600 dark:text-neutral-400 group-hover:text-slate-900 dark:group-hover:text-neutral-200 transition-colors">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export default FilterSection;
