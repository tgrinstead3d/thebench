import { Heart, Shield, Trophy, Users } from 'lucide-react';
import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          We Connect Players with Teams
        </h1>
        <p className="text-xl text-slate-500 dark:text-neutral-400 max-w-2xl mx-auto">
          The Bench is the premier platform for amateur soccer players to find teams. Create a profile, get seen, and get on the field.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm text-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-400">
                <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Get Discovered</h3>
            <p className="text-slate-500 dark:text-neutral-400">
                Create a detailed profile highlighting your skills, experience, and availability for captains to see.
            </p>
        </div>
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 dark:text-orange-400">
                <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Find Your Level</h3>
            <p className="text-slate-500 dark:text-neutral-400">
                Whether you're a former pro or just starting out, show your level to find the perfect competitive fit.
            </p>
        </div>
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm text-center">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400">
                <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Connect Directly</h3>
            <p className="text-slate-500 dark:text-neutral-400">
                Link your Facebook account so interested teams can message you directly to arrange a tryout.
            </p>
        </div>
      </div>

      <div className="bg-slate-900 dark:bg-black rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-500 via-orange-500 to-transparent"></div>
        <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                Join the growing community of players using The Bench to find their next team.
            </p>
            <div className="flex justify-center">
                <button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-orange-500/20 transition-all cursor-pointer">
                    Create Player Profile
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
