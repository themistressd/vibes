import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Star, RotateCcw, Zap } from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { SwipeCard } from '../components/cards/SwipeCard';
import { ProfileModal } from '../components/modals/ProfileModal';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

// Import custom 3D metallic button icons
import rewindIcon from '../assets/icons/rewind-icon.png';
import passIcon from '../assets/icons/pass-icon.png';
import superlikeIcon from '../assets/icons/superlike-icon.png';
import likeIcon from '../assets/icons/like-icon.png';
import boostIcon from '../assets/icons/boost-icon.png';

const HomeContainer = styled.div`
  padding: ${props => props.theme.common.spacing.lg};
  min-height: calc(100vh - 120px); /* Updated for compressed top bar (50px) and bottom nav (70px) = 120px total */
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
  height: 67vh; /* Further increased to use extra space from more compressed header */
  min-height: 510px; /* Increased for larger cards */
  max-height: 620px; /* Increased for more content */
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
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1); /* Professional depth shadows */
  transition: all 0.2s ease;
  position: relative;
  
  /* Size hierarchy: Pass & Like = LARGER (80px), others = smaller (60px) */
  ${props => (props.$variant === 'pass' || props.$variant === 'like') ? `
    width: 80px;
    height: 80px;
  ` : `
    width: 60px;
    height: 60px;
  `}
  
  /* ALL buttons have grey circular backgrounds */
  background: linear-gradient(135deg, #6B7280, #9CA3AF); /* Professional grey gradient */
  
  /* Custom icon styling */
  img {
    ${props => (props.$variant === 'pass' || props.$variant === 'like') ? `
      width: 36px;
      height: 36px;
    ` : `
      width: 28px;
      height: 28px;
    `}
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    pointer-events: none;
  }
  
  /* Fallback for SVG icons if PNG fails to load */
  svg { 
    color: white;
    ${props => (props.$variant === 'pass' || props.$variant === 'like') ? `
      width: 32px;
      height: 32px;
    ` : `
      width: 24px;
      height: 24px;
    `}
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
  }
  
  &:hover { 
    background: linear-gradient(135deg, #4B5563, #6B7280); /* Darker grey on hover */
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15); /* Enhanced shadow on hover */
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0) scale(0.95);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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
          <img src={rewindIcon} alt="Rewind" onError={(e) => {
            e.currentTarget.style.display = 'none';
            const svg = e.currentTarget.nextElementSibling as HTMLElement;
            if (svg) svg.style.display = 'block';
          }} />
          <RotateCcw size={24} style={{display: 'none'}} />
        </ActionButton>
        
        <ActionButton
          $variant="pass"
          onClick={() => handleManualAction('pass')}
        >
          <img src={passIcon} alt="Pass" onError={(e) => {
            e.currentTarget.style.display = 'none';
            const svg = e.currentTarget.nextElementSibling as HTMLElement;
            if (svg) svg.style.display = 'block';
          }} />
          <X size={28} style={{display: 'none'}} />
        </ActionButton>
        
        <ActionButton
          $variant="superlike"
          onClick={() => handleManualAction('boots')}
          title="Super Like!"
        >
          <img src={superlikeIcon} alt="Super Like" onError={(e) => {
            e.currentTarget.style.display = 'none';
            const svg = e.currentTarget.nextElementSibling as HTMLElement;
            if (svg) svg.style.display = 'block';
          }} />
          <Star size={24} style={{display: 'none'}} />
        </ActionButton>
        
        <ActionButton
          $variant="like"
          onClick={() => handleManualAction('like')}
        >
          <img src={likeIcon} alt="Like" onError={(e) => {
            e.currentTarget.style.display = 'none';
            const svg = e.currentTarget.nextElementSibling as HTMLElement;
            if (svg) svg.style.display = 'block';
          }} />
          <Heart size={28} style={{display: 'none'}} />
        </ActionButton>
        
        <ActionButton
          $variant="boost"
          onClick={() => handleManualAction('wig')}
          title="Boost!"
        >
          <img src={boostIcon} alt="Boost" onError={(e) => {
            e.currentTarget.style.display = 'none';
            const svg = e.currentTarget.nextElementSibling as HTMLElement;
            if (svg) svg.style.display = 'block';
          }} />
          <Zap size={24} style={{display: 'none'}} />
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