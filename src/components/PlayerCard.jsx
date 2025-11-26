import { Clock, Facebook, Trophy } from 'lucide-react';
import React from 'react';
import { useMockData } from '../context/MockDataContext';

const PlayerCard = ({ player }) => {
  const { currentUser } = useMockData();

  const handleContactClick = (e) => {
    e.stopPropagation();
    if (player.facebookUsername) {
      window.open(`https://m.me/${player.facebookUsername}`, '_blank');
    } else {
      alert("This player hasn't linked their Facebook account yet.");
    }
  };

  return (
    <div className="group bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:border-red-300 dark:hover:border-red-500 transition-all duration-200 overflow-hidden flex flex-col h-full cursor-pointer">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              {player.name}
            </h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${player.status === 'Team Found' ? 'bg-slate-100 text-slate-600 dark:bg-neutral-700 dark:text-neutral-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                {player.status}
              </span>
              {player.teamName && (
                <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  {player.teamName}
                </span>
              )}
            </div>
          </div>
          <span className="text-xs text-slate-400 dark:text-neutral-500 font-mono">{player.joined}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {player.positions.map((pos) => (
            <span key={pos} className="px-2 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-neutral-700 text-slate-600 dark:text-neutral-300 border border-slate-200 dark:border-neutral-600">
              {pos}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-xs text-slate-400 dark:text-neutral-500 uppercase font-bold tracking-wider">Level</span>
            <div className="flex items-center mt-1 font-medium text-slate-700 dark:text-neutral-200">
              <Trophy className="w-3 h-3 mr-1.5 text-red-500" />
              {player.skillLevel}
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-400 dark:text-neutral-500 uppercase font-bold tracking-wider">Availability</span>
            <div className="flex items-center mt-1 font-medium text-slate-700 dark:text-neutral-200">
              <Clock className="w-3 h-3 mr-1.5 text-red-500" />
              {player.availability}
            </div>
          </div>
          <div>
             <span className="text-xs text-slate-400 dark:text-neutral-500 uppercase font-bold tracking-wider">Age / Gender</span>
             <div className="mt-1 font-medium text-slate-700 dark:text-neutral-200">
                {player.age} • {player.gender}
             </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-neutral-400 line-clamp-2 mb-4">
          {player.bio}
        </p>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-neutral-900/50 border-t border-slate-100 dark:border-neutral-700 mt-auto">
        <button 
          onClick={handleContactClick}
          className="w-full flex justify-center items-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white font-medium py-2 rounded-lg transition-all shadow-sm cursor-pointer"
        >
          <Facebook className="w-4 h-4" />
          Message on Facebook
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;
