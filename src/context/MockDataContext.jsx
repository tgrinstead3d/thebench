import React, { createContext, useContext, useState } from 'react';

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
    joined: "2 days ago",
    facebookUsername: "marcus.silva.demo"
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
    joined: "1 week ago",
    facebookUsername: "sarah.jenkins.demo"
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
    joined: "3 days ago",
    facebookUsername: "david.chen.demo"
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
    joined: "5 hours ago",
    facebookUsername: "elena.rodriguez.demo"
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
    joined: "2 weeks ago",
    facebookUsername: "james.wilson.demo"
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
    joined: "1 day ago",
    facebookUsername: "alex.sam.demo"
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
    joined: "4 days ago",
    facebookUsername: "jordan.smith.demo"
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
    joined: "3 weeks ago",
    facebookUsername: "mike.ross.demo"
  },
];

export const MockDataProvider = ({ children }) => {
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Alex Morgan",
    email: "alex@example.com",
    role: "Player",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    facebookUsername: "alex.morgan.demo"
  });

  const login = (email, password) => {
    // Mock login - just sets the user
    if (email && password) {
      setCurrentUser({
        ...currentUser,
        email: email
      });
    }
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
    
    // If the user created a profile, update current user context too
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        ...newPlayer,
        role: "Player"
      });
    }
  };

  const value = {
    players,
    currentUser,
    login,
    logout,
    addPlayer
  };

  return (
    <MockDataContext.Provider value={value}>
      {children}
    </MockDataContext.Provider>
  );
};
