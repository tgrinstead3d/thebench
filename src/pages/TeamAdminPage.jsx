import { MessageSquare, Settings, Shield, Users } from 'lucide-react';
import React from 'react';
import { useMockData } from '../context/MockDataContext';

const TeamAdminPage = () => {
  const { currentUser, teams } = useMockData();
  
  // Mock finding the user's team
  const myTeam = teams[0]; // Just grab the first one for demo

  if (!currentUser) {
    return <div className="p-8 text-center">Please log in to manage your team.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Team Dashboard</h1>
          <p className="text-slate-500 dark:text-neutral-400">
            Manage your roster, schedule, and team settings for <span className="font-semibold text-slate-900 dark:text-white">{myTeam.name}</span>.
          </p>
        </div>
        <button className="bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-neutral-200 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-neutral-700 transition-colors">
          View Public Page
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Roster Management */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-neutral-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-red-500" />
                Active Roster
              </h3>
              <button className="text-sm text-red-600 dark:text-red-400 font-medium hover:underline">
                Add Player
              </button>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-neutral-700">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-neutral-700 flex items-center justify-center text-slate-500 dark:text-neutral-400 font-bold">
                      P{i}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Player Name {i}</p>
                      <p className="text-xs text-slate-500 dark:text-neutral-400">Midfielder • Active</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-red-500">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-neutral-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-orange-500" />
                Recent Applications
              </h3>
            </div>
            <div className="p-8 text-center text-slate-500 dark:text-neutral-400">
              No pending applications at the moment.
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              Team Status
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase mb-1">Looking For</label>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs rounded border border-red-200 dark:border-red-800">Goalkeeper</span>
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs rounded border border-red-200 dark:border-red-800">Striker</span>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase mb-1">Next Match</label>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Sunday, Nov 24 @ 2:00 PM</p>
                <p className="text-xs text-slate-500 dark:text-neutral-400">vs. The Net Busters</p>
              </div>
            </div>

            <button className="w-full mt-6 bg-slate-100 dark:bg-neutral-700 hover:bg-slate-200 dark:hover:bg-neutral-600 text-slate-700 dark:text-neutral-200 font-medium py-2 rounded-lg transition-colors text-sm">
              Edit Team Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamAdminPage;
