import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const SupabaseDataContext = createContext();

export const useSupabaseData = () => useContext(SupabaseDataContext);

export const SupabaseDataProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch Players (Profiles)
      const { data: playersData, error: playersError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'Player');
      
      if (playersData) setPlayers(playersData);

      // Fetch Teams
      const { data: teamsData, error: teamsError } = await supabase
        .from('teams')
        .select('*');
      
      if (teamsData) setTeams(teamsData);

      // Check Auth Session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await fetchUserProfile(session.user.id);
      }

      setLoading(false);
    };

    fetchData();

    // Listen for Auth Changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchUserProfile(session.user.id);
      } else {
        setCurrentUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*, messages(*)')
      .eq('id', userId)
      .single();
    
    if (data) setCurrentUser(data);
  };

  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const addPlayer = async (playerData) => {
    // In Supabase, "adding a player" is usually updating the user's profile
    if (!currentUser) return;

    const { error } = await supabase
      .from('profiles')
      .update({ ...playerData, role: 'Player', status: 'Free Agent' })
      .eq('id', currentUser.id);

    if (!error) {
      await fetchUserProfile(currentUser.id);
      // Refresh players list
      const { data } = await supabase.from('profiles').select('*').eq('role', 'Player');
      if (data) setPlayers(data);
    }
  };

  const addTeam = async (teamData) => {
    if (!currentUser) return;

    const { data, error } = await supabase
      .from('teams')
      .insert([{ ...teamData, captain_id: currentUser.id }])
      .select()
      .single();

    if (data) {
      setTeams([...teams, data]);
      // Update user to be captain
      await supabase.from('profiles').update({ role: 'Captain', team_id: data.id }).eq('id', currentUser.id);
      await fetchUserProfile(currentUser.id);
    }
  };

  const sendMessage = async (toName, content) => {
    // This is a simplified logic. Ideally we'd send to a user ID.
    // For now, we'll assume we find the user by name (not unique, but matches mock)
    // In production, use IDs.
    console.log("Sending message via Supabase (Mock implementation for now as we need recipient ID)");
    alert("Message sent!");
  };

  const value = {
    players,
    teams,
    currentUser,
    login,
    logout,
    addPlayer,
    addTeam,
    sendMessage,
    loading
  };

  return (
    <SupabaseDataContext.Provider value={value}>
      {children}
    </SupabaseDataContext.Provider>
  );
};
