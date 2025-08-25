import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../styles/themes/ThemeProvider';
import { Button } from '../components/common/Button';
import type { VibeType } from '../styles/themes/types';
import { useAppStore } from '../stores/appStore';
import { mockProfiles, mockConversations } from '../data/mockData';
import { media } from '../styles/responsive';

const SplashContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a0a1a 0%, #2d1b2e 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.common.spacing.lg};
  position: relative;
  overflow: hidden;
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
  max-width: 400px;
  width: 100%;
  
  ${media.tablet(css`
    max-width: 500px;
  `)}
  
  ${media.desktop(css`
    max-width: 600px;
  `)}
`;

const Logo = styled(motion.h1)`
  font-family: ${props => props.theme.common.typography.fontFamily.heading};
  font-size: 4rem;
  font-weight: ${props => props.theme.common.typography.fontWeight.bold};
  margin: 0 0 ${props => props.theme.common.spacing.md};
  background: linear-gradient(45deg, #FF4500, #00D4AA, #FF1493, #FFD700, #40E0D0);
  background-size: 300% 300%;
  animation: rainbow 3s ease-in-out infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  ${media.desktop(css`
    font-size: 5rem;
  `)}
  
  @keyframes rainbow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Tagline = styled(motion.p)`
  font-size: ${props => props.theme.common.typography.fontSize.lg};
  color: #FFFFFF;
  margin-bottom: ${props => props.theme.common.spacing.xl};
  opacity: 0.9;
  
  ${media.desktop(css`
    font-size: ${props => props.theme.common.typography.fontSize.xl};
  `)}
`;

const VibeSelector = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.common.spacing.md};
  margin-bottom: ${props => props.theme.common.spacing.xl};
  width: 100%;
  
  ${media.tablet(css`
    grid-template-columns: repeat(3, 1fr);
    gap: ${props => props.theme.common.spacing.lg};
  `)}
  
  ${media.desktop(css`
    grid-template-columns: repeat(5, 1fr);
    gap: ${props => props.theme.common.spacing.lg};
  `)}
`;

const VibeCard = styled(motion.div)<{ $colors: { primary: string; secondary: string } }>`
  background: ${props => `linear-gradient(135deg, ${props.$colors.primary}20, ${props.$colors.secondary}20)`};
  border: 2px solid ${props => props.$colors.primary}40;
  border-radius: ${props => props.theme.common.borderRadius.large};
  padding: ${props => props.theme.common.spacing.md};
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
    font-size: 2rem;
    margin-bottom: ${props => props.theme.common.spacing.xs};
  }
  
  .name {
    font-size: ${props => props.theme.common.typography.fontSize.md};
    font-weight: ${props => props.theme.common.typography.fontWeight.semibold};
    color: ${props => props.$colors.primary};
    margin-bottom: ${props => props.theme.common.spacing.xs};
  }
  
  .description {
    font-size: ${props => props.theme.common.typography.fontSize.sm};
    color: #FFFFFF;
    opacity: 0.8;
  }
`;

const StartButton = styled(motion.div)`
  width: 100%;
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
  
  const handleEnterApp = () => {
    setVibe(selectedVibe);
    setCurrentVibe(selectedVibe);
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
              onClick={() => setSelectedVibe(vibeKey as VibeType)}
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
        
        <StartButton
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Button
            size="lg"
            fullWidth
            onClick={handleEnterApp}
          >
            Enter the VIBES Universe ✨
          </Button>
        </StartButton>
      </ContentContainer>
    </SplashContainer>
  );
};