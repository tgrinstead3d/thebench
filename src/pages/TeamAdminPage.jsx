import { MessageSquare, Plus, Save, Settings, Shield, Users, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';

const TeamAdminPage = () => {
  const { currentUser, teams, updateTeam } = useMockData();
  const [isEditing, setIsEditing] = useState(false);
  
  // Find the user's team
  const myTeam = currentUser?.teamId ? teams.find(t => t.id === currentUser.teamId) : null;

  const [formData, setFormData] = useState({
    name: '',
    league: '',
    description: '',
    lookingFor: []
  });

  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    if (myTeam) {
      setFormData({
        name: myTeam.name,
        league: myTeam.league,
        description: myTeam.description,
        lookingFor: myTeam.lookingFor || []
      });
    }
  }, [myTeam]);

  if (!currentUser) {
    return <div className="p-8 text-center">Please log in to manage your team.</div>;
  }

  if (!myTeam) {
    return <div className="p-8 text-center">You are not assigned to a team.</div>;
  }

  const handleSave = () => {
    updateTeam(myTeam.id, formData);
    setIsEditing(false);
    alert('Team settings saved!');
  };

  const addRole = () => {
    if (newRole && !formData.lookingFor.includes(newRole)) {
      setFormData({ ...formData, lookingFor: [...formData.lookingFor, newRole] });
      setNewRole('');
    }
  };

  const removeRole = (role) => {
    setFormData({ ...formData, lookingFor: formData.lookingFor.filter(r => r !== role) });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Team Dashboard</h1>
          <p className="text-slate-500 dark:text-neutral-400">
            Manage your roster, schedule, and team settings for <span className="font-semibold text-slate-900 dark:text-white">{myTeam.name}</span>.
          </p>
        </div>
        <Link to={`/teams/${myTeam.id}`} className="bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 text-slate-700 dark:text-neutral-200 px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer">
          View Public Page
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Team Settings Form */}
          {isEditing ? (
            <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Edit Team Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-1">Team Name</label>
                <input 
                  type="text" 
                  className="block w-full px-3 py-2 border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-slate-900 dark:text-white"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-1">League</label>
                <input 
                  type="text" 
                  className="block w-full px-3 py-2 border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-slate-900 dark:text-white"
                  value={formData.league}
                  onChange={(e) => setFormData({...formData, league: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-1">Description</label>
                <textarea 
                  rows={3}
                  className="block w-full px-3 py-2 border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-slate-900 dark:text-white"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">Looking For</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.lookingFor.map(role => (
                    <span key={role} className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs rounded border border-red-200 dark:border-red-800">
                      {role}
                      <button onClick={() => removeRole(role)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <select 
                    className="flex-grow px-3 py-2 border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-slate-900 dark:text-white"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                  >
                    <option value="">Select Position...</option>
                    <option value="Goalkeeper">Goalkeeper</option>
                    <option value="Defender">Defender</option>
                    <option value="Midfielder">Midfielder</option>
                    <option value="Forward">Forward</option>
                    <option value="Striker">Striker</option>
                    <option value="Winger">Winger</option>
                  </select>
                  <button onClick={addRole} className="bg-slate-100 dark:bg-neutral-700 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-neutral-600">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm p-6">
               <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-500" />
                    Team Details
                  </h3>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="text-sm text-red-600 dark:text-red-400 font-medium hover:underline cursor-pointer"
                  >
                    Edit Details
                  </button>
               </div>
               <div className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase">Team Name</span>
                    <p className="text-slate-900 dark:text-white font-medium">{myTeam.name}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase">League</span>
                    <p className="text-slate-900 dark:text-white">{myTeam.league}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase">Description</span>
                    <p className="text-slate-600 dark:text-neutral-300">{myTeam.description}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400 uppercase block mb-1">Looking For</span>
                    <div className="flex flex-wrap gap-2">
                      {myTeam.lookingFor && myTeam.lookingFor.length > 0 ? (
                        myTeam.lookingFor.map(role => (
                          <span key={role} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs rounded border border-red-200 dark:border-red-800">
                            {role}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">No open positions</span>
                      )}
                    </div>
                  </div>
               </div>
            </div>
          )}
          
          {/* Roster Management (Mock) */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-neutral-700 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Active Roster
              </h3>
              <button className="text-sm text-red-600 dark:text-red-400 font-medium hover:underline cursor-pointer">
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
                  <button className="text-slate-400 hover:text-red-500 cursor-pointer">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
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
      </div>
    </div>
  );
};

export default TeamAdminPage;
