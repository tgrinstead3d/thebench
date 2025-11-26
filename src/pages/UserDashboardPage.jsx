import { CheckCircle, Settings, Shield } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';

const UserDashboardPage = () => {
  const { currentUser } = useMockData();

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Please log in to view your dashboard.</h2>
        <Link to="/login" className="text-red-600 hover:text-red-500 mt-4 inline-block cursor-pointer">Log In</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Dashboard</h1>
        <p className="text-slate-500 dark:text-neutral-400">
          Welcome back, {currentUser.name}. Manage your profile and status.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        
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
            {currentUser.facebookUsername && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-neutral-400">Facebook</span>
                <span className="text-slate-900 dark:text-white font-mono text-xs bg-slate-100 dark:bg-neutral-700 px-2 py-1 rounded">
                  {currentUser.facebookUsername}
                </span>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-neutral-700">
            <Link to="/create-profile" className="block w-full text-center py-2 px-4 border border-slate-200 dark:border-neutral-700 rounded-lg text-sm font-medium text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer">
              Edit Profile
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboardPage;
