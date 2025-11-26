import { Shield } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-slate-200 dark:border-neutral-800 py-12 mt-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-red-600 to-orange-500 p-1.5 rounded-lg rotate-3 shadow-lg shadow-orange-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              The<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Bench</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-sm font-medium text-slate-500 dark:text-neutral-400">
            <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Players</Link>
            <Link to="/teams" className="hover:text-slate-900 dark:hover:text-white transition-colors">Teams</Link>
            <Link to="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</Link>
            <Link to="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</Link>
          </div>

          {/* Copyright & Credit */}
          <div className="text-center md:text-right">
            <p className="text-sm text-slate-500 dark:text-neutral-500">
              &copy; {new Date().getFullYear()} The Bench. All rights reserved.
            </p>
            <p className="text-xs text-slate-400 dark:text-neutral-600 mt-1">
              Created by <a href="https://www.tgdesign.io" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">TG Design & Development</a>
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
