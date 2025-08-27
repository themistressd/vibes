import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../styles/themes/ThemeProvider';
import type { VibeType } from '../styles/themes/types';
import { useAppStore } from '../stores/appStore';
import { mockProfiles, mockConversations } from '../data/mockData';

const SplashContainer = styled.div`
  height: 100vh;
  max-height: 812px; /* Mobile frame height limit */
  width: 100%;
  max-width: 375px; /* Mobile frame width limit */
  background: linear-gradient(135deg, #1a0a1a 0%, #2d1b2e 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Changed from center to start */
  padding: 20px 16px 32px; /* Reduced padding for mobile frame */
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`;

const BackgroundElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

const FloatingEmoji = styled(motion.div)`
  position: absolute;
  font-size: 2rem;
  opacity: 0.1;
  pointer-events: none;
`;

const ContentContainer = styled(motion.div)`
  z-index: 10;
  text-align: center;
  max-width: 320px; /* Reduced mobile width for better fit */
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px; /* Fixed gap instead of margins */
`;

const Logo = styled(motion.h1)`
  font-family: ${props => props.theme.common.typography.fontFamily.heading};
  font-size: 2.8rem; /* Reduced from 3.5rem for better fit */
  font-weight: ${props => props.theme.common.typography.fontWeight.bold};
  margin: 0; /* Remove all margins */
  background: linear-gradient(45deg, #FF4500, #00D4AA, #FF1493, #FFD700, #40E0D0);
  background-size: 300% 300%;
  animation: rainbow 3s ease-in-out infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @keyframes rainbow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Tagline = styled(motion.p)`
  font-size: ${props => props.theme.common.typography.fontSize.md}; /* Reduced from lg */
  color: #FFFFFF;
  margin: 0; /* Remove margins */
  opacity: 0.9;
`;

const VibeSelector = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Fixed 2 columns for mobile */
  gap: 12px; /* Reduced gap */
  margin: 0; /* Remove margins */
  width: 100%;
  max-width: 300px; /* Reduced width */
  margin-left: auto;
  margin-right: auto;
`;

const VibeCard = styled(motion.div)<{ $colors: { primary: string; secondary: string } }>`
  background: ${props => `linear-gradient(135deg, ${props.$colors.primary}20, ${props.$colors.secondary}20)`};
  border: 2px solid ${props => props.$colors.primary}40;
  border-radius: ${props => props.theme.common.borderRadius.large};
  padding: 12px; /* Reduced padding */
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.$colors.primary};
    background: ${props => `linear-gradient(135deg, ${props.$colors.primary}30, ${props.$colors.secondary}30)`};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${props => props.$colors.primary}30;
  }
  
  .emoji {
    font-size: 1.8rem; /* Reduced from 2rem */
    margin-bottom: 6px; /* Reduced margin */
  }
  
  .name {
    font-size: ${props => props.theme.common.typography.fontSize.sm}; /* Reduced from md */
    font-weight: ${props => props.theme.common.typography.fontWeight.semibold};
    color: ${props => props.$colors.primary};
    margin-bottom: 4px; /* Reduced margin */
  }
  
  .description {
    font-size: ${props => props.theme.common.typography.fontSize.xs}; /* Reduced from sm */
    color: #FFFFFF;
    opacity: 0.8;
  }
`;

const FloatingBackground: React.FC = () => {
  const emojis = ['🔥', '💎', '🌶️', '🎨', '🏙️', '😌', '💅', '✨', '👑', '🦄'];
  
  return (
    <BackgroundElements>
      {emojis.map((emoji, index) => (
        <FloatingEmoji
          key={index}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {emoji}
        </FloatingEmoji>
      ))}
    </BackgroundElements>
  );
};

export const SplashScreen: React.FC = () => {
  const [selectedVibe, setSelectedVibe] = useState<VibeType>('spicy');
  const { setVibe, theme } = useTheme();
  const navigate = useNavigate();
  const { setCurrentVibe } = useAppStore();
  
  // Initialize app data
  React.useEffect(() => {
    const initializeApp = () => {
      // Load profiles into the store
      useAppStore.setState({ profiles: mockProfiles });
      
      // Add some existing matches for demo
      const existingMatches = [
        mockProfiles.find(p => p.id === 'spicy_1'),
        mockProfiles.find(p => p.id === 'chill_2'),
        mockProfiles.find(p => p.id === 'urban_1'),
      ].filter(Boolean);
      
      existingMatches.forEach(profile => {
        if (profile) {
          const matchId = `match_${profile.id}`;
          const conversations = mockConversations[profile.id] || [];
          
          useAppStore.setState(state => ({
            matches: [...state.matches, {
              id: matchId,
              profile,
              matchedAt: new Date(Date.now() - Math.random() * 86400000),
              conversation: conversations,
            }]
          }));
        }
      });
    };
    
    initializeApp();
  }, []);
  
  const vibeDescriptions = {
    spicy: 'For the fierce and fiery queens',
    chill: 'Zen vibes and peaceful glamour',
    urban: 'Street smart with runway dreams',
    artsy: 'Creative souls and artistic hearts',
    dluxe: 'Luxury lifestyle and high-class sass',
  };

  const handleVibeSelect = (vibe: VibeType) => {
    setSelectedVibe(vibe);
    setVibe(vibe);
    setCurrentVibe(vibe);
    navigate('/home');
  };
  
  return (
    <SplashContainer>
      <FloatingBackground />
      
      <ContentContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Logo
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
        >
          VIBES
        </Logo>
        
        <Tagline
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          The Ultimate Trash Pop Fantasy Dating App 🦄💅✨
        </Tagline>
        
        <VibeSelector
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {Object.entries(theme.vibes).map(([vibeKey, vibeTheme]) => (
            <VibeCard
              key={vibeKey}
              $colors={{ primary: vibeTheme.colors.primary, secondary: vibeTheme.colors.secondary }}
              onClick={() => handleVibeSelect(vibeKey as VibeType)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                borderColor: selectedVibe === vibeKey ? vibeTheme.colors.primary : undefined,
                background: selectedVibe === vibeKey
                  ? `linear-gradient(135deg, ${vibeTheme.colors.primary}40, ${vibeTheme.colors.secondary}40)`
                  : undefined,
              }}
            >
              <div className="emoji">{vibeTheme.emoji}</div>
              <div className="name">{vibeTheme.name}</div>
              <div className="description">
                {vibeDescriptions[vibeKey as VibeType]}
              </div>
            </VibeCard>
          ))}
        </VibeSelector>
      </ContentContainer>
    </SplashContainer>
  );
};