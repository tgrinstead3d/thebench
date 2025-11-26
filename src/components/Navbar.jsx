import { LogOut, Menu, Shield, User, UserPlus, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';
import ThemeToggle from './ThemeToggle';

const NavItem = ({ to, children }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => 
      `text-sm font-medium transition-colors cursor-pointer ${isActive ? 'text-red-600 dark:text-red-400 font-bold' : 'text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-neutral-200'}`
    }
  >
    {children}
  </NavLink>
);

const Navbar = ({ isDark, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { currentUser, logout } = useMockData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-slate-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="bg-gradient-to-br from-red-600 to-orange-500 p-1.5 rounded-lg rotate-3 shadow-lg shadow-orange-500/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              The<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Bench</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <NavItem to="/">Players</NavItem>
            <NavItem to="/teams">Teams</NavItem>
            <NavItem to="/about">About</NavItem>
            <div className="h-4 w-px bg-slate-200 dark:bg-neutral-700"></div>
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            
            {currentUser ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 focus:outline-none cursor-pointer"
                >
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-8 h-8 rounded-full border border-slate-200 dark:border-neutral-700"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-neutral-200">{currentUser.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-slate-100 dark:border-neutral-700 py-1">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-700 cursor-pointer"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/create-profile" 
                      className="block px-4 py-2 text-sm text-slate-700 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-700 cursor-pointer"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Edit Profile
                    </Link>
                    {currentUser.role === 'Captain' && (
                      <Link 
                        to="/team-admin" 
                        className="block px-4 py-2 text-sm text-slate-700 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-700 cursor-pointer"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Team Admin
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-50 dark:hover:bg-neutral-700 cursor-pointer"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white cursor-pointer">
                  Log in
                </Link>
                <Link to="/signup" className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all shadow-md shadow-orange-500/20 cursor-pointer">
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Nav Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-500 dark:text-neutral-400 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-800 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Players
            </Link>
            <Link 
              to="/teams" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-800 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Teams
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-800 cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            
            <div className="border-t border-slate-100 dark:border-neutral-800 my-2 pt-2">
              {currentUser ? (
                <>
                  <div className="px-3 py-2 flex items-center gap-3">
                    <img src={currentUser.avatar} alt="" className="w-8 h-8 rounded-full" />
                    <span className="font-medium text-slate-900 dark:text-white">{currentUser.name}</span>
                  </div>
                  <Link 
                    to="/dashboard" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-800 cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-slate-50 dark:hover:bg-neutral-800 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-800 cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-slate-50 dark:hover:bg-neutral-800 cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
