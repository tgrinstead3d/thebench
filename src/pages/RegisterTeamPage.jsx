import { AlignLeft, Check, MapPin, Trophy, Users } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';

const RegisterTeamPage = () => {
  const { addTeam } = useMockData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    league: '',
    skillLevel: 'Intermediate',
    location: '',
    lookingFor: [],
    description: ''
  });

  const handleLookingForChange = (role) => {
    if (formData.lookingFor.includes(role)) {
      setFormData({ ...formData, lookingFor: formData.lookingFor.filter(r => r !== role) });
    } else {
      setFormData({ ...formData, lookingFor: [...formData.lookingFor, role] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTeam(formData);
    navigate('/teams');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Register Your Team</h1>
        <p className="text-slate-500 dark:text-neutral-400">
          Create a team profile to recruit players and manage your roster.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm p-6 md:p-8 space-y-8">
        
        {/* Team Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-red-500" />
            Team Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-1">Team Name</label>
            <input
              type="text"
              required
              className="block w-full px-3 py-2 border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-1">League Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Sunday Co-ed"
                className="block w-full px-3 py-2 border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={formData.league}
                onChange={(e) => setFormData({...formData, league: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-1">Skill Level</label>
              <select
                className="block w-full px-3 py-2 border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={formData.skillLevel}
                onChange={(e) => setFormData({...formData, skillLevel: e.target.value})}
              >
                <option>Beginner</option>
                <option>Casual</option>
                <option>Intermediate</option>
                <option>Competitive</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location & Needs */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" />
            Location & Needs
          </h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-1">Home Field / Location</label>
            <input
              type="text"
              required
              className="block w-full px-3 py-2 border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">Looking For (Select all that apply)</label>
            <div className="flex flex-wrap gap-2">
              {['Forward', 'Midfielder', 'Defender', 'Goalkeeper', 'Any'].map(role => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleLookingForChange(role)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    formData.lookingFor.includes(role)
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800'
                      : 'bg-white dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 border-slate-200 dark:border-neutral-700 hover:border-slate-300 dark:hover:border-neutral-600'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <AlignLeft className="w-5 h-5 text-red-500" />
            About the Team
          </h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-1">Description</label>
            <textarea
              rows={4}
              placeholder="Describe your team culture, schedule, etc..."
              className="block w-full px-3 py-2 border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
          >
            <Check className="w-5 h-5 mr-2" />
            Register Team
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterTeamPage;
