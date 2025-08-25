import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Star, RotateCcw, Zap } from 'lucide-react';
import { useAppStore } from '../stores/appStore';
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
  width: ${props => props.$variant === 'like' || props.$variant === 'pass' ? '70px' : '56px'}; /* Larger for main actions */
  height: ${props => props.$variant === 'like' || props.$variant === 'pass' ? '70px' : '56px'}; /* Larger for main actions */
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
  
  /* Enhanced styling for main actions */
  ${props => (props.$variant === 'like' || props.$variant === 'pass') && `
    border: 2px solid rgba(255, 255, 255, 0.2);
    transform: scale(1);
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }
  `}
  
  ${props => {
    switch (props.$variant) {
      case 'rewind':
        return `
          svg { color: #FF9800; }
        `;
      case 'pass':
        return `
          svg { color: #FD5068; font-size: 28px; }
          background: linear-gradient(135deg, rgba(253, 80, 104, 0.2), rgba(253, 80, 104, 0.3));
          border-color: #FD5068;
        `;
      case 'superlike':
        return `
          svg { color: #2196F3; }
        `;
      case 'like':
        return `
          svg { color: #4CAF50; font-size: 28px; }
          background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.3));
          border-color: #4CAF50;
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
    swipeProfile 
  } = useAppStore();
  const navigate = useNavigate();
  
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<typeof profiles[0] | null>(null);
  const [superLikeAnimation, setSuperLikeAnimation] = useState<string | null>(null);
  
  // Show all profiles in mixed vibes approach (no filtering by vibe)
  const allProfiles = profiles; // Use all profiles instead of filtering
  const currentProfile = allProfiles[currentProfileIndex % allProfiles.length];
  const nextProfile_card = allProfiles[(currentProfileIndex + 1) % allProfiles.length];
  
  // Remove vibe change effect since we're not filtering by vibe anymore
  // useEffect(() => {
  //   // Reset to start when vibe changes
  //   resetSwipeStack();
  // }, [currentVibe, resetSwipeStack]);

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

  const handleViewMatch = () => {
    if (matchedProfile) {
      navigate(`/match/${matchedProfile.id}`);
    }
  };

  if (allProfiles.length === 0) {
    return (
      <HomeContainer>
        <EmptyState
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <EmptyStateIcon>🔍</EmptyStateIcon>
          <EmptyStateText>No profiles available</EmptyStateText>
          <EmptyStateSubtext>Check back later for new people to meet!</EmptyStateSubtext>
        </EmptyState>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      {/* Swipe Area - removed vibe switcher for mixed vibes approach */}
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