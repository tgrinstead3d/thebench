import { AlignLeft, Camera, Check, Clock, Trophy, Upload, User } from 'lucide-react';
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
    bio: '',
    facebookUsername: currentUser?.facebookUsername || '',
    avatar: currentUser?.avatar || null
  });

  const [previewUrl, setPreviewUrl] = useState(currentUser?.avatar || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePositionChange = (pos) => {
    if (formData.positions.includes(pos)) {
      setFormData({ ...formData, positions: formData.positions.filter(p => p !== pos) });
    } else {
      setFormData({ ...formData, positions: [...formData.positions, pos] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would upload the image to storage here
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
        
        {/* Profile Image */}
        <div className="flex flex-col items-center justify-center pb-6 border-b border-slate-100 dark:border-neutral-700">
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-100 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-900 flex items-center justify-center">
              {previewUrl ? (
                <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-slate-300 dark:text-neutral-600" />
              )}
            </div>
            <label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer">
              <Camera className="w-8 h-8" />
            </label>
            <input 
              id="avatar-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange}
            />
          </div>
          <p className="mt-4 text-sm text-slate-500 dark:text-neutral-400">Upload a profile photo</p>
        </div>

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

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-neutral-300 mb-1">Facebook Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 dark:text-neutral-500 text-sm">
                m.me/
              </span>
              <input
                type="text"
                placeholder="username"
                className="block w-full pl-16 pr-3 py-2 border border-slate-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={formData.facebookUsername}
                onChange={(e) => setFormData({...formData, facebookUsername: e.target.value})}
              />
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">This allows teams to message you directly on Facebook.</p>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all cursor-pointer"
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
