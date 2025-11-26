import { MapPin, Shield, Trophy, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../components/Badge';
import { useMockData } from '../context/MockDataContext';

const TeamsPage = () => {
  const { teams } = useMockData();

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Teams</h1>
          <p className="text-slate-500 dark:text-neutral-400 max-w-2xl">
            Browse local teams looking for players. Find a squad that matches your skill level and schedule.
          </p>
        </div>
        <Link to="/register-team" className="flex items-center gap-2 bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 hover:border-red-500 dark:hover:border-red-400 text-slate-700 dark:text-neutral-200 hover:text-red-600 dark:hover:text-red-400 font-medium px-4 py-2 rounded-lg transition-all shadow-sm">
            <Users className="w-4 h-4" />
            <span>Register Team</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="group bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:border-red-300 dark:hover:border-red-500 transition-all duration-200 overflow-hidden flex flex-col">
            <div className={`h-2 ${team.color}`}></div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${team.color} flex items-center justify-center text-white font-bold shadow-md`}>
                        {team.name.substring(0, 1)}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                            {team.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono">{team.league}</p>
                    </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-slate-600 dark:text-neutral-300">
                    <Trophy className="w-4 h-4 mr-2 text-slate-400" />
                    <span>{team.skillLevel}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600 dark:text-neutral-300">
                    <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                    <span>{team.location}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600 dark:text-neutral-300">
                    <Users className="w-4 h-4 mr-2 text-slate-400" />
                    <span>{team.members} Members</span>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-neutral-700 pt-4 mt-auto">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Looking For</span>
                <div className="flex flex-wrap gap-2">
                    {team.lookingFor.length > 0 ? (
                        team.lookingFor.map(role => (
                            <span key={role} className="text-xs font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded border border-red-100 dark:border-red-900/30">
                                {role}
                            </span>
                        ))
                    ) : (
                        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded border border-emerald-100 dark:border-emerald-900/30">
                            Roster Full
                        </span>
                    )}
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-neutral-900/50 border-t border-slate-100 dark:border-neutral-700 mt-auto">
                <Link to={`/teams/${team.id}`} className="block w-full text-center text-sm font-medium text-slate-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    View Team Details
                </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
