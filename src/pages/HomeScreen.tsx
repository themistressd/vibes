import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Star, RotateCcw, Zap } from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { SwipeCard } from '../components/cards/SwipeCard';
import { ProfileModal } from '../components/modals/ProfileModal';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const HomeContainer = styled.div`
  padding: ${props => props.theme.common.spacing.lg};
  min-height: calc(100vh - 130px); /* Updated for 60px top bar and 70px bottom nav = 130px total */
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
  height: 65vh; /* Adjusted for 60px header vs previous 50px */
  min-height: 500px; /* Slightly reduced to maintain proportion */
  max-height: 610px; /* Adjusted for new header height */
  margin-bottom: ${props => props.theme.common.spacing.lg};
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px; /* Perfect 18px spacing between buttons - within Tinder's 15-20px range */
  margin-bottom: ${props => props.theme.common.spacing.lg};
  width: 100%;
  max-width: 340px;
  padding: 0 10px; /* Add padding to prevent edge cutoff */
`;

const ActionButton = styled(motion.button)<{ $variant: 'rewind' | 'pass' | 'superlike' | 'like' | 'boost' }>`
  width: 70px; /* Perfect 70px diameter circles for all buttons - exactly like Tinder */
  height: 70px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15); /* Enhanced Tinder-style professional shadows */
  transition: all 0.2s ease;
  position: relative;
  
  ${props => {
    switch (props.$variant) {
      case 'rewind':
        return `
          background: linear-gradient(135deg, #FF9500, #FFB347); /* Yellow/orange circular background */
          svg { 
            color: white;
            width: 24px;
            height: 24px;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
          }
          &:hover { 
            background: linear-gradient(135deg, #FF8500, #FF9500);
            box-shadow: 0 12px 25px rgba(255, 149, 0, 0.3), 0 6px 12px rgba(255, 149, 0, 0.2);
            transform: translateY(-2px);
          }
          &:active {
            transform: translateY(0) scale(0.95);
          }
        `;
      case 'pass':
        return `
          background: linear-gradient(135deg, #FF4458, #FF6B7D); /* Pink/red circular background */
          svg { 
            color: white;
            width: 28px;
            height: 28px;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
          }
          &:hover { 
            background: linear-gradient(135deg, #E63946, #FF4458);
            box-shadow: 0 12px 25px rgba(255, 68, 88, 0.3), 0 6px 12px rgba(255, 68, 88, 0.2);
            transform: translateY(-2px);
          }
          &:active {
            transform: translateY(0) scale(0.95);
          }
        `;
      case 'superlike':
        return `
          background: linear-gradient(135deg, #00A8FF, #0078D4); /* Blue circular background */
          svg { 
            color: white;
            width: 24px;
            height: 24px;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
          }
          &:hover { 
            background: linear-gradient(135deg, #0090E7, #00A8FF);
            box-shadow: 0 12px 25px rgba(0, 168, 255, 0.3), 0 6px 12px rgba(0, 168, 255, 0.2);
            transform: translateY(-2px);
          }
          &:active {
            transform: translateY(0) scale(0.95);
          }
        `;
      case 'like':
        return `
          background: linear-gradient(135deg, #00C851, #26C6DA); /* Green circular background */
          svg { 
            color: white;
            width: 28px;
            height: 28px;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
          }
          &:hover { 
            background: linear-gradient(135deg, #00A243, #00C851);
            box-shadow: 0 12px 25px rgba(0, 200, 81, 0.3), 0 6px 12px rgba(0, 200, 81, 0.2);
            transform: translateY(-2px);
          }
          &:active {
            transform: translateY(0) scale(0.95);
          }
        `;
      case 'boost':
        return `
          background: linear-gradient(135deg, #AA00FF, #BB33FF); /* Purple circular background */
          svg { 
            color: white;
            width: 24px;
            height: 24px;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
          }
          &:hover { 
            background: linear-gradient(135deg, #9900E6, #AA00FF);
            box-shadow: 0 12px 25px rgba(170, 0, 255, 0.3), 0 6px 12px rgba(170, 0, 255, 0.2);
            transform: translateY(-2px);
          }
          &:active {
            transform: translateY(0) scale(0.95);
          }
        `;
      default:
        return '';
    }
  }}
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
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<typeof profiles[0] | null>(null);
  
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

  const handleProfileTap = (profile: typeof profiles[0]) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
    setSelectedProfile(null);
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
              onTap={() => handleProfileTap(nextProfile_card)}
              isTop={false}
            />
          )}
          
          {currentProfile && (
            <SwipeCard
              key={`${currentProfile.id}_top`}
              profile={currentProfile}
              onSwipe={handleSwipe}
              onTap={() => handleProfileTap(currentProfile)}
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
        >
          <RotateCcw size={24} />
        </ActionButton>
        
        <ActionButton
          $variant="pass"
          onClick={() => handleManualAction('pass')}
        >
          <X size={28} />
        </ActionButton>
        
        <ActionButton
          $variant="superlike"
          onClick={() => handleManualAction('boots')}
          title="Super Like!"
        >
          <Star size={24} />
        </ActionButton>
        
        <ActionButton
          $variant="like"
          onClick={() => handleManualAction('like')}
        >
          <Heart size={28} />
        </ActionButton>
        
        <ActionButton
          $variant="boost"
          onClick={() => handleManualAction('wig')}
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

      {/* Profile Modal */}
      <ProfileModal
        profile={selectedProfile}
        isOpen={showProfileModal}
        onClose={handleCloseProfileModal}
      />
    </HomeContainer>
  );
};