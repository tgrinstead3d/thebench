import { CheckCircle, Clock, Mail, Shield, User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';

const UserDashboardPage = () => {
  const { currentUser, teams } = useMockData();

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Please log in to view your dashboard.</h2>
        <Link to="/login" className="text-red-600 hover:text-red-500 mt-4 inline-block">Log In</Link>
      </div>
    );
  }

  const myTeam = currentUser.teamId ? teams.find(t => t.id === currentUser.teamId) : null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Dashboard</h1>
        <p className="text-slate-500 dark:text-neutral-400">
          Welcome back, {currentUser.name}. Here's what's happening.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile & Team Status */}
        <div className="space-y-8">
          
          {/* Profile Card */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm p-6">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 dark:border-neutral-700"
              />
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{currentUser.name}</h3>
                <p className="text-sm text-slate-500 dark:text-neutral-400">{currentUser.role}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-neutral-400">Profile Status</span>
                <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-neutral-400">Member Since</span>
                <span className="text-slate-900 dark:text-white">Nov 2023</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-neutral-700">
              <Link to="/create-profile" className="block w-full text-center py-2 px-4 border border-slate-200 dark:border-neutral-700 rounded-lg text-sm font-medium text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer">
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Team Status */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" />
              My Team
            </h3>

            {myTeam ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${myTeam.color} flex items-center justify-center text-white font-bold`}>
                    {myTeam.name.substring(0, 1)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{myTeam.name}</p>
                    <p className="text-xs text-slate-500 dark:text-neutral-400">{myTeam.league}</p>
                  </div>
                </div>
                <Link to={`/teams/${myTeam.id}`} className="text-sm text-red-600 dark:text-red-400 hover:underline cursor-pointer">
                  View Team Page
                </Link>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-slate-500 dark:text-neutral-400 mb-4">You are not currently on a team.</p>
                <Link to="/teams" className="block w-full py-2 px-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors cursor-pointer">
                  Find a Team
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Inbox */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-neutral-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-500" />
                Inbox
              </h3>
              <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs font-bold px-2 py-1 rounded-full">
                {currentUser.messages?.filter(m => !m.read).length || 0} New
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-neutral-700">
              {currentUser.messages && currentUser.messages.length > 0 ? (
                currentUser.messages.map((msg) => (
                  <div key={msg.id} className={`p-4 hover:bg-slate-50 dark:hover:bg-neutral-700/50 transition-colors cursor-pointer ${!msg.read ? 'bg-slate-50/50 dark:bg-neutral-700/20' : ''}`}>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`text-sm font-medium ${!msg.read ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-700 dark:text-neutral-300'}`}>
                        {msg.from}
                      </h4>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {msg.date}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-neutral-400 line-clamp-2">
                      {msg.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500 dark:text-neutral-400">
                  No messages yet.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboardPage;
