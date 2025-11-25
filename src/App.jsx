import { Filter, Search, Shield, UserPlus, X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import FilterSection from './components/FilterSection';
import PlayerCard from './components/PlayerCard';
import ThemeToggle from './components/ThemeToggle';

// --- Placeholder Data ---
const MOCK_PLAYERS = [
  {
    id: 1,
    name: "Marcus Silva",
    positions: ["Midfielder", "Forward"],
    skillLevel: "Competitive",
    gender: "Male",
    age: 28,
    status: "Free Agent",
    availability: "Weeknights",
    bio: "Former college player. High work rate, loves to distribute the ball. Looking for a team that passes well.",
    joined: "2 days ago"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    positions: ["Defender", "Goalkeeper"],
    skillLevel: "Casual",
    gender: "Female",
    age: 32,
    status: "Free Agent",
    availability: "Sundays Only",
    bio: "Just looking to get back into shape and have some fun. reliable keeper if needed!",
    joined: "1 week ago"
  },
  {
    id: 3,
    name: "David Chen",
    positions: ["Forward"],
    skillLevel: "Intermediate",
    gender: "Male",
    age: 25,
    status: "Team Found",
    availability: "Anytime",
    bio: "Fast winger, decent cross. played high school varsity.",
    joined: "3 days ago"
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    positions: ["Midfielder"],
    skillLevel: "Advanced",
    gender: "Female",
    age: 29,
    status: "Free Agent",
    availability: "Tuesday/Thursday",
    bio: "Box-to-box midfielder with good stamina. Prefer co-ed competitive leagues.",
    joined: "5 hours ago"
  },
  {
    id: 5,
    name: "James 'Keep' Wilson",
    positions: ["Goalkeeper"],
    skillLevel: "Advanced",
    gender: "Male",
    age: 35,
    status: "Free Agent",
    availability: "Weekends",
    bio: "15 years experience in net. I shout a lot but I stop shots.",
    joined: "2 weeks ago"
  },
  {
    id: 6,
    name: "Alex & Sam (Package Deal)",
    positions: ["Defender", "Midfielder"],
    skillLevel: "Intermediate",
    gender: "Co-ed Pair",
    age: "26/27",
    status: "Free Agent",
    availability: "Wednesday Nights",
    bio: "Couple looking to play together. We bring snacks!",
    joined: "1 day ago"
  },
  {
    id: 7,
    name: "Jordan Smith",
    positions: ["Any"],
    skillLevel: "Beginner",
    gender: "Non-Binary",
    age: 22,
    status: "Free Agent",
    availability: "Flexible",
    bio: "New to the city, new to soccer. Eager to learn!",
    joined: "4 days ago"
  },
  {
    id: 8,
    name: "Mike Ross",
    positions: ["Defender"],
    skillLevel: "Competitive",
    gender: "Male",
    age: 31,
    status: "Free Agent",
    availability: "Mondays",
    bio: "Solid CB. No nonsense defending.",
    joined: "3 weeks ago"
  },
];

const App = () => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(false);

  // Theme Logic
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  
  // Filter States
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const toggleFilter = (item, currentList, setList) => {
    if (currentList.includes(item)) {
      setList(currentList.filter(i => i !== item));
    } else {
      setList([...currentList, item]);
    }
  };

  // Derived State (Filtering Logic)
  const filteredPlayers = useMemo(() => {
    return MOCK_PLAYERS.filter(player => {
      // Search Text
      const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            player.bio.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Position Filter
      const matchesPosition = selectedPositions.length === 0 || 
                              player.positions.some(pos => selectedPositions.includes(pos)) ||
                              (player.positions.includes("Any") && selectedPositions.length > 0);

      // Skill Filter
      const matchesSkill = selectedSkills.length === 0 || selectedSkills.includes(player.skillLevel);

      return matchesSearch && matchesPosition && matchesSkill;
    });
  }, [searchQuery, selectedPositions, selectedSkills]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-900 font-sans text-slate-900 dark:text-neutral-100 selection:bg-red-100 dark:selection:bg-red-900 transition-colors duration-200">
      
      {/* --- Navbar --- */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-slate-200 dark:border-neutral-800 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-red-600 to-orange-500 p-1.5 rounded-lg rotate-3 shadow-lg shadow-orange-500/20">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                The<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Bench</span>
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-neutral-200">Leagues</a>
              <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-neutral-200">Teams</a>
              <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-neutral-200">About</a>
              <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
              <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all shadow-md shadow-orange-500/20">
                <UserPlus className="w-4 h-4" />
                <span>Post Profile</span>
              </button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
              <button 
                className="p-2 text-slate-500 dark:text-neutral-400"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              >
                <Filter className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-end justify-between">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Free Agent Pool</h1>
                <p className="text-slate-500 dark:text-neutral-400 max-w-2xl">
                    Find the missing piece for your squad. Browse available players, filter by skill level, and connect directly to build your roster for the upcoming season.
                </p>
            </div>
             {/* Mobile-only "Post Profile" */}
            <div className="md:hidden w-full mt-4">
                <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-medium px-4 py-3 rounded-lg shadow-md shadow-orange-500/20">
                    <UserPlus className="w-4 h-4" />
                    Post Your Profile
                </button>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* --- Sidebar Filters --- */}
          <aside className={`
            lg:w-64 flex-shrink-0 
            ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}
          `}>
            <div className="bg-white dark:bg-neutral-800 p-5 rounded-xl border border-slate-200 dark:border-neutral-700 shadow-sm sticky top-24 transition-colors duration-200">
              <div className="flex items-center justify-between lg:hidden mb-4">
                <h2 className="font-bold text-lg dark:text-white">Filters</h2>
                <button onClick={() => setIsMobileFiltersOpen(false)}>
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Search */}
              <div className="relative mb-8">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search name or bio..."
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-neutral-600 rounded-lg leading-5 bg-slate-50 dark:bg-neutral-900 placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:bg-white dark:focus:bg-neutral-800 focus:ring-1 focus:ring-red-500 focus:border-red-500 dark:text-white sm:text-sm transition duration-150 ease-in-out"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <FilterSection 
                title="Position" 
                options={["Forward", "Midfielder", "Defender", "Goalkeeper"]} 
                selected={selectedPositions}
                onChange={(item) => toggleFilter(item, selectedPositions, setSelectedPositions)}
              />

              <FilterSection 
                title="Skill Level" 
                options={["Competitive", "Intermediate", "Casual", "Beginner"]} 
                selected={selectedSkills}
                onChange={(item) => toggleFilter(item, selectedSkills, setSelectedSkills)}
              />

               {/* Stat Summary */}
               <div className="mt-8 pt-6 border-t border-slate-100 dark:border-neutral-700">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-500 dark:text-neutral-400 mb-1">
                    <span>ACTIVE AGENTS</span>
                    <span className="text-red-600 dark:text-red-400 font-bold">{MOCK_PLAYERS.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono text-slate-500 dark:text-neutral-400">
                    <span>TEAMS LOOKING</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">12</span>
                  </div>
               </div>
            </div>
          </aside>

          {/* --- Player Grid --- */}
          <div className="flex-1 w-full">
            
            {/* Active Filters Display (Desktop) */}
            {(selectedPositions.length > 0 || selectedSkills.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {[...selectedPositions, ...selectedSkills].map((filter) => (
                  <span key={filter} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800">
                    {filter}
                    <button 
                       onClick={() => {
                         if(selectedPositions.includes(filter)) toggleFilter(filter, selectedPositions, setSelectedPositions);
                         if(selectedSkills.includes(filter)) toggleFilter(filter, selectedSkills, setSelectedSkills);
                       }}
                       className="ml-1.5 hover:text-red-900 dark:hover:text-red-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button 
                  onClick={() => {setSelectedPositions([]); setSelectedSkills([]);}}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200 underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {filteredPlayers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPlayers.map(player => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-neutral-800 rounded-xl border border-dashed border-slate-300 dark:border-neutral-600 p-12 text-center transition-colors duration-200">
                <div className="mx-auto h-12 w-12 text-slate-400 mb-4">
                   <UserPlus className="h-full w-full" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-white">No players found</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-neutral-400">Try adjusting your search or filters to find who you're looking for.</p>
                <div className="mt-6">
                  <button 
                    onClick={() => {setSelectedPositions([]); setSelectedSkills([]); setSearchQuery("");}}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
            
            {/* Pagination Placeholder */}
            {filteredPlayers.length > 0 && (
                <div className="mt-10 flex justify-center">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm font-medium text-slate-500 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-700">
                            Previous
                        </button>
                        <button className="relative inline-flex items-center px-4 py-2 border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm font-medium text-slate-700 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-700">
                            1
                        </button>
                        <button className="relative inline-flex items-center px-4 py-2 border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm font-medium text-slate-700 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-neutral-700">
                            2
                        </button>
                        <button className="relative inline-flex items-center px-4 py-2 border border-slate-300 dark:border-neutral-600 bg-red-50 dark:bg-red-900/20 text-sm font-medium text-red-600 dark:text-red-400 z-10">
                            3
                        </button>
                        <span className="relative inline-flex items-center px-4 py-2 border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm font-medium text-slate-700 dark:text-neutral-200">
                            ...
                        </span>
                        <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-sm font-medium text-slate-500 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-700">
                            Next
                        </button>
                    </nav>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
