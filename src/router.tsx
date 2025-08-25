import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SplashScreen } from './pages/SplashScreen';
import { HomeScreen } from './pages/HomeScreen';
import { MatchScreen } from './pages/MatchScreen';
import { MessagesScreen } from './pages/MessagesScreen';
import { ChatScreen } from './pages/ChatScreen';
import { ProfileScreen } from './pages/ProfileScreen';
import { SettingsScreen } from './pages/SettingsScreen';
import { TeaSpillScreen } from './pages/TeaSpillScreen';
import { CommunitiesScreen } from './pages/CommunitiesScreen';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Splash/Login */}
      <Route path="/splash" element={<SplashScreen />} />
      
      {/* Main App Routes */}
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/match/:profileId" element={<MatchScreen />} />
      <Route path="/messages" element={<MessagesScreen />} />
      <Route path="/chat/:matchId" element={<ChatScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="/tea-spill" element={<TeaSpillScreen />} />
      <Route path="/communities" element={<CommunitiesScreen />} />
      
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/splash" replace />} />
      <Route path="*" element={<Navigate to="/splash" replace />} />
    </Routes>
  );
};