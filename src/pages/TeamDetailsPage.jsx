import { ArrowLeft, Mail, MapPin, Shield, Trophy, Users } from 'lucide-react';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';

const TeamDetailsPage = () => {
  const { teamId } = useParams();
  const { teams, sendMessage, currentUser } = useMockData();
  const team = teams.find(t => t.id === parseInt(teamId));

  const handleContact = () => {
    if (!currentUser) {
      alert("Please log in to contact the team captain.");
      return;
    }
    sendMessage(team.name, "I'm interested in joining your team!");
  };

  if (!team) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Team not found</h2>
        <Link to="/teams" className="text-red-600 hover:text-red-500 mt-4 inline-block cursor-pointer">Back to Teams</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/teams" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-neutral-200 mb-6 cursor-pointer">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Teams
      </Link>

      <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm overflow-hidden">
        {/* Header */}
        <div className={`h-32 ${team.color} relative`}>
          <div className="absolute -bottom-10 left-8">
            <div className={`w-24 h-24 rounded-xl ${team.color} border-4 border-white dark:border-neutral-800 flex items-center justify-center text-white text-3xl font-bold shadow-lg`}>
              {team.name.substring(0, 1)}
            </div>
          </div>
        </div>

        <div className="pt-14 px-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{team.name}</h1>
              <div className="flex items-center gap-2 text-slate-500 dark:text-neutral-400">
                <Shield className="w-4 h-4" />
                <span>{team.league}</span>
              </div>
            </div>
            <button 
              onClick={handleContact}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2.5 rounded-lg transition-all shadow-md shadow-red-600/20 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Captain</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center p-4 bg-slate-50 dark:bg-neutral-900/50 rounded-lg border border-slate-100 dark:border-neutral-700">
              <Trophy className="w-8 h-8 text-orange-500 mr-3" />
              <div>
                <p className="text-xs text-slate-500 dark:text-neutral-500 uppercase font-bold">Skill Level</p>
                <p className="font-semibold text-slate-900 dark:text-white">{team.skillLevel}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-slate-50 dark:bg-neutral-900/50 rounded-lg border border-slate-100 dark:border-neutral-700">
              <MapPin className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-xs text-slate-500 dark:text-neutral-500 uppercase font-bold">Location</p>
                <p className="font-semibold text-slate-900 dark:text-white">{team.location}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-slate-50 dark:bg-neutral-900/50 rounded-lg border border-slate-100 dark:border-neutral-700">
              <Users className="w-8 h-8 text-emerald-500 mr-3" />
              <div>
                <p className="text-xs text-slate-500 dark:text-neutral-500 uppercase font-bold">Roster Size</p>
                <p className="font-semibold text-slate-900 dark:text-white">{team.members} Players</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">About the Team</h3>
              <p className="text-slate-600 dark:text-neutral-300 leading-relaxed">
                {team.description || "No description provided."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Looking For</h3>
              <div className="flex flex-wrap gap-2">
                {team.lookingFor.length > 0 ? (
                  team.lookingFor.map(role => (
                    <span key={role} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800">
                      {role}
                    </span>
                  ))
                ) : (
                  <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
                    Roster Full
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsPage;
