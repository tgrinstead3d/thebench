import { CheckCircle, ChevronDown, ChevronUp, Clock, Mail, Send, Settings, Shield, User } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';

const UserDashboardPage = () => {
  const { currentUser, teams, markMessageAsRead, replyToMessage } = useMockData();
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Please log in to view your dashboard.</h2>
        <Link to="/login" className="text-red-600 hover:text-red-500 mt-4 inline-block cursor-pointer">Log In</Link>
      </div>
    );
  }

  const myTeam = currentUser.teamId ? teams.find(t => t.id === currentUser.teamId) : null;

  const toggleMessage = (msg) => {
    if (expandedMessageId === msg.id) {
      setExpandedMessageId(null);
    } else {
      setExpandedMessageId(msg.id);
      if (!msg.read) {
        markMessageAsRead(msg.id);
      }
    }
    setReplyContent('');
  };

  const handleReply = (e, msgId) => {
    e.preventDefault();
    replyToMessage(msgId, replyContent);
    setReplyContent('');
    setExpandedMessageId(null);
  };

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
                
                <div className="space-y-2">
                  <Link to={`/teams/${myTeam.id}`} className="block w-full text-center py-2 px-4 border border-slate-200 dark:border-neutral-700 rounded-lg text-sm font-medium text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer">
                    View Team Page
                  </Link>
                  
                  {currentUser.role === 'Captain' && (
                    <Link to="/team-admin" className="block w-full text-center py-2 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center gap-2">
                      <Settings className="w-4 h-4" />
                      Manage Team
                    </Link>
                  )}
                </div>
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
                  <div key={msg.id} className={`transition-colors ${!msg.read ? 'bg-slate-50/50 dark:bg-neutral-700/20' : ''}`}>
                    <div 
                      onClick={() => toggleMessage(msg)}
                      className="p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-neutral-700/50 flex justify-between items-start"
                    >
                      <div className="flex-grow pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={`text-sm font-medium ${!msg.read ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-700 dark:text-neutral-300'}`}>
                            {msg.from}
                          </h4>
                          {!msg.read && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                        </div>
                        <p className="text-sm font-medium text-slate-800 dark:text-neutral-200 mb-1">{msg.subject}</p>
                        <p className="text-xs text-slate-500 dark:text-neutral-400 line-clamp-1">
                          {msg.content}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-slate-400 flex items-center gap-1 whitespace-nowrap">
                          <Clock className="w-3 h-3" />
                          {msg.date}
                        </span>
                        {expandedMessageId === msg.id ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {expandedMessageId === msg.id && (
                      <div className="px-4 pb-4 pt-0 pl-4 ml-4 border-l-2 border-slate-200 dark:border-neutral-700">
                        <div className="bg-slate-50 dark:bg-neutral-900/50 rounded-lg p-4 mb-4 text-sm text-slate-700 dark:text-neutral-300">
                          {msg.content}
                        </div>
                        
                        <form onSubmit={(e) => handleReply(e, msg.id)} className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Write a reply..."
                            className="flex-grow px-3 py-2 text-sm border border-slate-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <button 
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors cursor-pointer"
                            disabled={!replyContent.trim()}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    )}
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
