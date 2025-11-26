import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { MockDataProvider } from './context/MockDataContext';
// import { SupabaseDataProvider } from './context/SupabaseDataContext'; // Uncomment to use Supabase
import AboutPage from './pages/AboutPage';
import CreateProfilePage from './pages/CreateProfilePage';
import LoginPage from './pages/LoginPage';
import PlayersPage from './pages/PlayersPage';
import RegisterTeamPage from './pages/RegisterTeamPage';
import SignupPage from './pages/SignupPage';
import TeamAdminPage from './pages/TeamAdminPage';
import TeamDetailsPage from './pages/TeamDetailsPage';
import TeamsPage from './pages/TeamsPage';
import UserDashboardPage from './pages/UserDashboardPage';

const App = () => {
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

  return (
    <MockDataProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 dark:bg-neutral-900 font-sans text-slate-900 dark:text-neutral-100 selection:bg-red-100 dark:selection:bg-red-900 transition-colors duration-200 flex flex-col">
          
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />

          {/* --- Main Content --- */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
            <Routes>
              <Route path="/" element={<PlayersPage />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/teams/:teamId" element={<TeamDetailsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <UserDashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/create-profile" 
                element={
                  <ProtectedRoute>
                    <CreateProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/register-team" 
                element={
                  <ProtectedRoute>
                    <RegisterTeamPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/team-admin" 
                element={
                  <ProtectedRoute>
                    <TeamAdminPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </MockDataProvider>
  );
};

export default App;
