import { CheckCircle, Clock, Mail, Trophy } from 'lucide-react';
import React from 'react';
import Badge from './Badge';

const PlayerCard = ({ player }) => {
  return (
    <div className="group bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:border-red-300 dark:hover:border-red-500 transition-all duration-200 overflow-hidden flex flex-col h-full">
      {/* Card Header */}
      <div className="p-5 border-b border-slate-50 dark:border-neutral-700 bg-gradient-to-r from-white to-slate-50/50 dark:from-neutral-800 dark:to-neutral-800/50">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              {player.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-0.5">Joined {player.joined}</p>
          </div>
          {player.status === "Free Agent" ? (
            <Badge color="green" icon={CheckCircle}>Available</Badge>
          ) : (
            <Badge color="gray" icon={Clock}>Taken</Badge>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {player.positions.map(pos => (
            <span key={pos} className="text-xs font-semibold text-slate-700 dark:text-neutral-300 bg-slate-100 dark:bg-neutral-700 px-2 py-1 rounded">
              {pos.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-grow">
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-xs text-slate-400 dark:text-neutral-500 uppercase font-semibold block mb-1">Level</span>
            <div className="flex items-center text-slate-700 dark:text-neutral-200 font-medium">
              <Trophy className="w-3 h-3 mr-1.5 text-red-500" />
              {player.skillLevel}
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-400 dark:text-neutral-500 uppercase font-semibold block mb-1">Availability</span>
            <div className="flex items-center text-slate-700 dark:text-neutral-200 font-medium">
              <Clock className="w-3 h-3 mr-1.5 text-red-500" />
              {player.availability}
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-neutral-900/50 p-3 rounded-lg border border-slate-100 dark:border-neutral-700 mb-4">
          <p className="text-sm text-slate-600 dark:text-neutral-400 italic leading-relaxed line-clamp-3">
            "{player.bio}"
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 pt-0 mt-auto">
        <button className="w-full flex items-center justify-center space-x-2 bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-600 hover:border-red-500 dark:hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 text-slate-700 dark:text-neutral-200 hover:text-red-700 dark:hover:text-red-400 font-medium py-2.5 px-4 rounded-lg transition-all duration-200">
          <Mail className="w-4 h-4" />
          <span>Contact Player</span>
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;
