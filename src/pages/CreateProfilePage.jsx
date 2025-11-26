import { AlignLeft, Check, Clock, Trophy, User } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../context/MockDataContext';

const CreateProfilePage = () => {
  const { addPlayer, currentUser } = useMockData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    positions: [],
    skillLevel: 'Intermediate',
    gender: 'Male',
    age: '',
    availability: '',
    bio: ''
  });

  const handlePositionChange = (pos) => {
    if (formData.positions.includes(pos)) {
      setFormData({ ...formData, positions: formData.positions.filter(p => p !== pos) });
    } else {
      setFormData({ ...formData, positions: [...formData.positions, pos] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlayer(formData);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Create Player Profile</h1>
        <p className="text-slate-500 dark:text-neutral-400">
          Tell us about your play style and what you're looking for.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-800 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm p-6 md:p-8 space-y-8">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-5 h-5 text-red-500" />
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-1">Display Name</label>
              <input
                type="text"
                required
                className="block w-full px-3 py-2 border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-1">Age</label>
              <input
                type="number"
                required
                className="block w-full px-3 py-2 border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-1">Gender</label>
            <select
              className="block w-full px-3 py-2 border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Co-ed Pair</option>
              <option>Non-Binary</option>
            </select>
          </div>
        </div>

        {/* Soccer Details */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-red-500" />
            Soccer Details
          </h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-2">Positions (Select all that apply)</label>
            <div className="flex flex-wrap gap-2">
              {['Forward', 'Midfielder', 'Defender', 'Goalkeeper'].map(pos => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => handlePositionChange(pos)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    formData.positions.includes(pos)
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800'
                      : 'bg-white dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 border-slate-200 dark:border-neutral-700 hover:border-slate-300 dark:hover:border-neutral-600'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
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

        {/* Availability & Bio */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-neutral-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <AlignLeft className="w-5 h-5 text-red-500" />
            More Info
          </h3>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-1">Availability</label>
            <input
              type="text"
              placeholder="e.g. Weeknights after 6pm, Sundays"
              required
              className="block w-full px-3 py-2 border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={formData.availability}
              onChange={(e) => setFormData({...formData, availability: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-1">Bio</label>
            <textarea
              rows={4}
              placeholder="Tell captains about your experience and play style..."
              className="block w-full px-3 py-2 border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
          >
            <Check className="w-5 h-5 mr-2" />
            Publish Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfilePage;
