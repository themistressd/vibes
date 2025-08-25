import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Star, RotateCcw, Zap } from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { useTheme } from '../styles/themes/ThemeProvider';
import { SwipeCard } from '../components/cards/SwipeCard';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const HomeContainer = styled.div`
  padding: ${props => props.theme.common.spacing.lg};
  min-height: calc(100vh - 130px); /* Account for top bar and bottom nav */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 375px; /* Fixed mobile width */
  margin: 0 auto;
`;

const SwipeArea = styled.div`
  position: relative;
  width: 100%;
  max-width: 340px; /* Fixed mobile width with padding */
  height: 60vh; /* Better mobile proportion */
  min-height: 450px;
  max-height: 550px; /* Fit mobile screen better */
  margin-bottom: ${props => props.theme.common.spacing.lg};
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.common.spacing.md};
  margin-bottom: ${props => props.theme.common.spacing.lg};
  width: 100%;
  max-width: 340px;
`;

const ActionButton = styled(motion.button)<{ $variant: 'rewind' | 'pass' | 'superlike' | 'like' | 'boost' }>`
  width: 56px; /* Optimized for mobile */
  height: 56px; /* Ensure 44px+ touch target */
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  
  ${props => {
    switch (props.$variant) {
      case 'rewind':
        return `
          svg { color: #FF9800; }
        `;
      case 'pass':
        return `
          svg { color: #FD5068; }
        `;
      case 'superlike':
        return `
          svg { color: #2196F3; }
        `;
      case 'like':
        return `
          svg { color: #4CAF50; }
        `;
      case 'boost':
        return `
          svg { color: #9C27B0; }
        `;
      default:
        return '';
    }
  }}
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  color: ${props => props.theme.current.colors.textSecondary};
  padding: ${props => props.theme.common.spacing.xl};
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${props => props.theme.common.spacing.lg};
  opacity: 0.5;
`;

const EmptyStateText = styled.h3`
  font-size: ${props => props.theme.common.typography.fontSize.lg};
  margin-bottom: ${props => props.theme.common.spacing.md};
`;

const EmptyStateSubtext = styled.p`
  font-size: ${props => props.theme.common.typography.fontSize.md};
  margin-bottom: ${props => props.theme.common.spacing.lg};
  opacity: 0.8;
`;

const VibeSwitch = styled.div`
  display: flex;
  gap: ${props => props.theme.common.spacing.xs};
  margin-bottom: ${props => props.theme.common.spacing.lg};
  overflow-x: auto;
  padding: ${props => props.theme.common.spacing.sm} 0;
  justify-content: flex-start; /* Mobile-optimized horizontal scroll */
  width: 100%;
  max-width: 340px;
`;

const VibeBadge = styled(motion.button)<{ $isActive: boolean; $colors: { primary: string; secondary: string } }>`
  background: ${props => 
    props.$isActive 
      ? `linear-gradient(135deg, ${props.$colors.primary}, ${props.$colors.secondary})`
      : 'transparent'
  };
  border: 2px solid ${props => props.$colors.primary};
  color: ${props => props.$isActive ? 'white' : props.$colors.primary};
  padding: ${props => props.theme.common.spacing.xs} ${props => props.theme.common.spacing.md};
  border-radius: ${props => props.theme.common.borderRadius.full};
  cursor: pointer;
  white-space: nowrap;
  font-size: ${props => props.theme.common.typography.fontSize.sm};
  font-weight: ${props => props.theme.common.typography.fontWeight.medium};
  min-height: 44px; /* Ensure touch target */
  display: flex;
  align-items: center;
  
  &:hover {
    background: ${props => `linear-gradient(135deg, ${props.$colors.primary}30, ${props.$colors.secondary}30)`};
  }
`;

const MatchNotification = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${props => props.theme.current.gradients.main};
  color: ${props => props.theme.current.colors.text};
  padding: ${props => props.theme.common.spacing.lg};
  border-radius: ${props => props.theme.common.borderRadius.large};
  box-shadow: ${props => props.theme.common.shadows.large};
  text-align: center;
  z-index: 1000;
  min-width: 250px;
`;

const SuperLikeAnimation = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 6rem;
  z-index: 1000;
  pointer-events: none;
`;

export const HomeScreen: React.FC = () => {
  const { 
    profiles, 
    currentProfileIndex, 
    currentVibe, 
    setCurrentVibe, 
    swipeProfile,
    resetSwipeStack 
  } = useAppStore();
  
  const { getVibeTheme, theme } = useTheme();
  const navigate = useNavigate();
  
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<typeof profiles[0] | null>(null);
  const [superLikeAnimation, setSuperLikeAnimation] = useState<string | null>(null);
  
  // Filter profiles by current vibe
  const vibeProfiles = profiles.filter(p => p.vibe === currentVibe);
  const currentProfile = vibeProfiles[currentProfileIndex % vibeProfiles.length];
  const nextProfile_card = vibeProfiles[(currentProfileIndex + 1) % vibeProfiles.length];
  
  useEffect(() => {
    // Reset to start when vibe changes
    resetSwipeStack();
  }, [currentVibe, resetSwipeStack]);

  const handleSwipe = (direction: 'left' | 'right' | 'boots' | 'wig') => {
    if (!currentProfile) return;
    
    // Show super like animation
    if (direction === 'boots' || direction === 'wig') {
      setSuperLikeAnimation(direction === 'boots' ? '👠' : '💇‍♀️');
      setTimeout(() => setSuperLikeAnimation(null), 1500);
    }
    
    // Simulate match for likes and super likes (30% chance)
    if ((direction === 'right' || direction === 'boots' || direction === 'wig') && Math.random() > 0.7) {
      setMatchedProfile(currentProfile);
      setShowMatch(true);
      
      setTimeout(() => {
        setShowMatch(false);
        setMatchedProfile(null);
      }, 3000);
    }
    
    swipeProfile({
      type: direction === 'left' ? 'pass' : direction === 'right' ? 'like' : direction,
      profileId: currentProfile.id,
      timestamp: new Date(),
    });
  };

  const handleManualAction = (action: 'rewind' | 'pass' | 'like' | 'boots' | 'wig') => {
    if (action === 'rewind') {
      // For now, just show a message - rewind could be implemented with state management
      console.log('Rewind action - would undo last swipe');
      return;
    }
    
    const directionMap = {
      pass: 'left' as const,
      like: 'right' as const,
      boots: 'boots' as const,
      wig: 'wig' as const,
    };
    handleSwipe(directionMap[action]);
  };

  const handleVibeChange = (vibeKey: string) => {
    setCurrentVibe(vibeKey as any);
  };

  const handleViewMatch = () => {
    if (matchedProfile) {
      navigate(`/match/${matchedProfile.id}`);
    }
  };

  if (vibeProfiles.length === 0) {
    return (
      <HomeContainer>
        <EmptyState
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <EmptyStateIcon>🔍</EmptyStateIcon>
          <EmptyStateText>No profiles found for {getVibeTheme().name} vibe</EmptyStateText>
          <EmptyStateSubtext>Try switching to a different vibe to discover new queens!</EmptyStateSubtext>
          
          <VibeSwitch>
            {Object.entries(theme.vibes).map(([vibeKey, vibeTheme]) => (
              <VibeBadge
                key={vibeKey}
                $isActive={currentVibe === vibeKey}
                $colors={{ primary: vibeTheme.colors.primary, secondary: vibeTheme.colors.secondary }}
                onClick={() => handleVibeChange(vibeKey)}
              >
                {vibeTheme.emoji} {vibeTheme.name}
              </VibeBadge>
            ))}
          </VibeSwitch>
        </EmptyState>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      {/* Vibe Switcher */}
      <VibeSwitch>
        {Object.entries(theme.vibes).map(([vibeKey, vibeTheme]) => (
          <VibeBadge
            key={vibeKey}
            $isActive={currentVibe === vibeKey}
            $colors={{ primary: vibeTheme.colors.primary, secondary: vibeTheme.colors.secondary }}
            onClick={() => handleVibeChange(vibeKey)}
            whileTap={{ scale: 0.95 }}
          >
            {vibeTheme.emoji} {vibeTheme.name}
          </VibeBadge>
        ))}
      </VibeSwitch>

      {/* Swipe Area */}
      <SwipeArea>
        <AnimatePresence mode="popLayout">
          {nextProfile_card && (
            <SwipeCard
              key={`${nextProfile_card.id}_back`}
              profile={nextProfile_card}
              onSwipe={() => {}}
              isTop={false}
            />
          )}
          
          {currentProfile && (
            <SwipeCard
              key={`${currentProfile.id}_top`}
              profile={currentProfile}
              onSwipe={handleSwipe}
              isTop={true}
            />
          )}
        </AnimatePresence>
      </SwipeArea>

      {/* Action Buttons */}
      <ActionButtons>
        <ActionButton
          $variant="rewind"
          onClick={() => handleManualAction('rewind')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <RotateCcw size={22} />
        </ActionButton>
        
        <ActionButton
          $variant="pass"
          onClick={() => handleManualAction('pass')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={26} />
        </ActionButton>
        
        <ActionButton
          $variant="superlike"
          onClick={() => handleManualAction('boots')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Super Like!"
        >
          <Star size={24} />
        </ActionButton>
        
        <ActionButton
          $variant="like"
          onClick={() => handleManualAction('like')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart size={24} />
        </ActionButton>
        
        <ActionButton
          $variant="boost"
          onClick={() => handleManualAction('wig')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Boost!"
        >
          <Zap size={24} />
        </ActionButton>
      </ActionButtons>

      {/* Super Like Animation */}
      <AnimatePresence>
        {superLikeAnimation && (
          <SuperLikeAnimation
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {superLikeAnimation}
          </SuperLikeAnimation>
        )}
      </AnimatePresence>

      {/* Match Notification */}
      <AnimatePresence>
        {showMatch && matchedProfile && (
          <MatchNotification
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.5rem' }}>
              🎉 IT'S A MATCH! 🎉
            </h3>
            <p style={{ margin: '0 0 16px 0' }}>
              You matched with <strong>{matchedProfile.name}</strong>!
            </p>
            <Button onClick={handleViewMatch} size="sm">
              Start Chatting
            </Button>
          </MatchNotification>
        )}
      </AnimatePresence>
    </HomeContainer>
  );
};