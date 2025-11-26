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
  
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Alex Morgan",
    email: "alex@example.com",
    role: "Captain", // Upgraded to Captain
    teamId: 6, // Assigned to "United FC" (matches ID 6 in INITIAL_TEAMS)
    teamName: "United FC",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    messages: [
      {
        id: 101,
        from: "Coach Mike",
        subject: "League Registration",
        content: "Hey Alex, just a reminder that league registration closes this Friday. Make sure we have enough players on the roster.",
        date: "2 hours ago",
        read: false
      },
      {
        id: 102,
        from: "Sarah Jenkins",
        subject: "Joining the team",
        content: "Hi! I saw your team is looking for a midfielder. I played D1 in college and just moved to the area. Are you still holding tryouts?",
        date: "1 day ago",
        read: true
      }
    ]
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
  };

  const addTeam = (teamData) => {
    const newTeam = {
      id: teams.length + 1,
      ...teamData,
      members: 1,
      color: "bg-slate-800"
    };
    setTeams([newTeam, ...teams]);
  };

  const updateTeam = (teamId, updatedData) => {
    setTeams(teams.map(team => 
      team.id === teamId ? { ...team, ...updatedData } : team
    ));
  };

  const sendMessage = (toName, content) => {
    console.log(`Message sent to ${toName}: ${content}`);
    alert(`Message sent to ${toName}!`);
  };

  const markMessageAsRead = (messageId) => {
    if (!currentUser) return;
    const updatedMessages = currentUser.messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    setCurrentUser({ ...currentUser, messages: updatedMessages });
  };

  const replyToMessage = (messageId, content) => {
    console.log(`Replying to message ${messageId}: ${content}`);
    alert("Reply sent!");
  };

  const value = {
    players,
    teams,
    currentUser,
    login,
    logout,
    addPlayer,
    addTeam,
    updateTeam,
    sendMessage,
    markMessageAsRead,
    replyToMessage
  };

  return (
    <MockDataContext.Provider value={value}>
      {children}
    </MockDataContext.Provider>
  );
};
