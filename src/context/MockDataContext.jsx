import React, { createContext, useContext, useEffect, useState } from 'react';

const MockDataContext = createContext();

export const useMockData = () => useContext(MockDataContext);

// Initial Data
const INITIAL_PLAYERS = [
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
    teamName: "Blue Thunder",
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

const INITIAL_TEAMS = [
  {
    id: 1,
    name: "Red Dragons FC",
    league: "Sunday Co-ed",
    skillLevel: "Competitive",
    location: "Downtown Sports Park",
    lookingFor: ["Goalkeeper", "Striker"],
    members: 12,
    color: "bg-red-600",
    description: "We are a competitive team that plays hard but fair. We usually grab drinks after the game.",
    captain: "John Doe"
  },
  {
    id: 2,
    name: "Blue Thunder",
    league: "Tuesday Men's",
    skillLevel: "Intermediate",
    location: "Northside Fields",
    lookingFor: ["Defender"],
    members: 14,
    color: "bg-blue-600",
    description: "Intermediate level team, been playing together for 3 years.",
    captain: "Mike Smith"
  },
  {
    id: 3,
    name: "Goal Diggers",
    league: "Thursday Women's",
    skillLevel: "Casual",
    location: "West End Arena",
    lookingFor: ["Any"],
    members: 9,
    color: "bg-yellow-500",
    description: "Just for fun! Beginners welcome.",
    captain: "Sarah Jones"
  },
  {
    id: 4,
    name: "Pitch Perfect",
    league: "Wednesday Co-ed",
    skillLevel: "Advanced",
    location: "City Stadium",
    lookingFor: [],
    members: 16,
    color: "bg-emerald-600",
    description: "High level play. Tryouts required.",
    captain: "Chris Evans"
  },
  {
    id: 5,
    name: "Net Six & Chill",
    league: "Friday Beer League",
    skillLevel: "Beginner",
    location: "Community Center",
    lookingFor: ["Midfielder"],
    members: 11,
    color: "bg-purple-600",
    description: "We are here for the beer mostly.",
    captain: "Pat Taylor"
  },
  {
    id: 6,
    name: "United FC",
    league: "Saturday Premier",
    skillLevel: "Competitive",
    location: "Regional Complex",
    lookingFor: ["Defender", "Winger"],
    members: 13,
    color: "bg-slate-800",
    description: "Serious team looking to win the league.",
    captain: "Alex Morgan"
  }
];

export const MockDataProvider = ({ children }) => {
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [teams, setTeams] = useState(INITIAL_TEAMS);
  const [currentUser, setCurrentUser] = useState(null);

  // Mock Login
  const login = (email, password) => {
    // Simulate API call
    setCurrentUser({
      id: 101,
      name: "Alex Morgan",
      email: email,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      role: "Player",
      teamId: null, // or a team ID if they are on one
      messages: [
        {
            id: 1,
            from: "Red Dragons FC",
            content: "Hey Alex, saw your profile. We need a striker for Sunday league. Interested?",
            date: "2 hours ago",
            read: false
        },
        {
            id: 2,
            from: "System",
            content: "Welcome to The Bench! Complete your profile to get noticed.",
            date: "1 day ago",
            read: true
        }
      ]
    });
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addPlayer = (playerData) => {
    const newPlayer = {
      id: players.length + 1,
      ...playerData,
      status: "Free Agent",
      joined: "Just now"
    };
    setPlayers([newPlayer, ...players]);
    // Update current user to reflect they have a profile
    setCurrentUser({ ...currentUser, ...playerData, hasProfile: true });
  };

  const addTeam = (teamData) => {
    const newTeam = {
      id: teams.length + 1,
      ...teamData,
      members: 1,
      color: "bg-slate-800" // Default color
    };
    setTeams([newTeam, ...teams]);
    setCurrentUser({ ...currentUser, teamId: newTeam.id, role: "Captain" });
  };

  const sendMessage = (to, content) => {
    // In a real app, this would send to the API
    console.log(`Sending message to ${to}: ${content}`);
    alert(`Message sent to ${to}!`);
  };

  const value = {
    players,
    teams,
    currentUser,
    login,
    logout,
    addPlayer,
    addTeam,
    sendMessage
  };

  return (
    <MockDataContext.Provider value={value}>
      {children}
    </MockDataContext.Provider>
  );
};
