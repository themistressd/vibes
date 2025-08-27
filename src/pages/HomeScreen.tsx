import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../stores/appStore';
import { SwipeCard } from '../components/cards/SwipeCard';
import { ProfileModal } from '../components/modals/ProfileModal';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

// Import custom metallic icons
import rewindIcon from '../assets/rewind.png';
import passIcon from '../assets/pass.png';
import superlikeIcon from '../assets/superlike.png';
import likeIcon from '../assets/like.png';
import boostIcon from '../assets/boost.png';

const HomeContainer = styled.div`
  padding: 16px 0 0 0; /* Minimal top padding, zero sides for edge-to-edge */
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100vw; /* Full viewport width */
  margin: 0;
  box-sizing: border-box;
  justify-content: flex-start;
  
  @media (max-width: 768px) {
    padding: 12px 0 0 0;
    min-height: calc(100vh - 120px);
    width: 100vw;
  }
`;

const SwipeArea = styled.div`
  position: relative;
  width: 100vw; /* Full viewport width */
  height: 67vh;
  min-height: 510px;
  max-height: 620px;
  margin-bottom: ${props => props.theme.common.spacing.lg};
  padding: 0 16px;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    width: 100vw;
    padding: 0 12px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 18px;
  margin-bottom: ${props => props.theme.common.spacing.lg};
  width: 100vw;
  padding: 0 24px;
  box-sizing: border-box;
  max-width: 100vw;
  overflow: visible;
  
  @media (max-width: 768px) {
    gap: 14px;
    padding: 0 16px;
  }
  @media (min-width: 576px) and (max-width: 768px) {
    gap: 16px;
    padding: 0 20px;
  }
`;

const ActionButton = styled(motion.button)<{ $variant: 'rewind' | 'pass' | 'superlike' | 'like' | 'boost' }>`
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #6B7280;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  position: relative;
  width: ${props => (props.$variant === 'pass' || props.$variant === 'like') ? '76px' : '60px'};
  height: ${props => (props.$variant === 'pass' || props.$variant === 'like') ? '76px' : '60px'};
  min-width: ${props => (props.$variant === 'pass' || props.$variant === 'like') ? '76px' : '60px'};
  min-height: ${props => (props.$variant === 'pass' || props.$variant === 'like') ? '76px' : '60px'};
  max-width: ${props => (props.$variant === 'pass' || props.$variant === 'like') ? '76px' : '60px'};
  max-height: ${props => (props.$variant === 'pass' || props.$variant === 'like') ? '76px' : '60px'};
  border-radius: 50% !important;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  flex-shrink: 0;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  @media (max-width: 768px) {
    &:active {
      transform: translateY(0) scale(0.92);
    }
  }
  img {
    width: ${props => (props.$variant === 'pass' || props.$variant === 'like') ? '38px' : '30px'};
    height: ${props => (props.$variant === 'pass' || props.$variant === 'like') ? '38px' : '30px'};
    object-fit: contain;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
    flex-shrink: 0;
  }
  @media (min-width: 576px) {
    width: ${props => (props.$variant === 'pass' || props.$variant === 'like') ? '80px' : '64px'};
    height: ${props => (props.$variant === 'pass' || props.$variant === 'like') ? '80px' : '64px'};
    min-width: ${props => (props.$variant === 'pass' || props.$variant === 'like') ? '80px' : '64px'};
    min-height: ${props => (props.$variant === 'pass' || props.$variant === 'like') ? '80px' : '64px'};
    max-width: ${props => (props.$variant === 'pass' || props.$variant === 'like') ? '80px' : '64px'};
    max-height: ${props => (props.$variant === 'pass' || props.$variant === 'like') ? '80px' : '64px'};
    img {
      width: ${props => (props.$variant === 'pass' || props.$variant === 'like') ? '40px' : '32px'};
      height: ${props => (props.$variant === 'pass' || props.$variant === 'like') ? '40px' : '32px'};
    }
  }
  &:hover {
    background: #4B5563;
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25), 0 6px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0) scale(0.95);
    background: #374151;
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

// 👇 CAMBIO PRINCIPAL: La notificación ahora es absolute y va dentro de SwipeArea
const MatchNotification = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 24px; /* Offset desde el top de SwipeArea, puedes ajustar este valor */
  transform: translateX(-50%);
  background: ${props => props.theme.current.gradients.main};
  color: ${props => props.theme.current.colors.text};
  padding: ${props => props.theme.common.spacing.lg};
  border-radius: ${props => props.theme.common.borderRadius.large};
  box-shadow: ${props => props.theme.common.shadows.large};
  text-align: center;
  z-index: 100;
  min-width: 280px;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  @media (max-width: 350px) {
    min-width: 260px;
    padding: ${props => props.theme.common.spacing.md};
  }
  @media (max-width: 375px) {
    max-width: calc(100vw - 32px);
  }
`;

const SuperLikeAnimation = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 6rem;
  z-index: 1000;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 350px) {
    font-size: 5rem;
  }
  @media (min-width: 351px) and (max-width: 414px) {
    font-size: 6rem;
  }
  @media (max-width: 375px) {
    top: calc(50% - env(safe-area-inset-top) / 2);
  }
`;

export const HomeScreen: React.FC = () => {
  const {
    profiles,
    currentProfileIndex,
    swipeProfile,
    receiveLike
  } = useAppStore();
  const navigate = useNavigate();
  
  const [showMatch, setShowMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<typeof profiles[0] | null>(null);
  const [superLikeAnimation, setSuperLikeAnimation] = useState<string | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<typeof profiles[0] | null>(null);
  const allProfiles = profiles;
  const hasProfiles = allProfiles.length > 0;
  const currentProfile = hasProfiles
    ? allProfiles[currentProfileIndex % allProfiles.length]
    : null;
  const nextProfile_card = hasProfiles
    ? allProfiles[(currentProfileIndex + 1) % allProfiles.length]
    : null;

  const handleSwipe = (direction: 'left' | 'right' | 'boots' | 'wig') => {
    if (!currentProfile) return;
    if (direction === 'boots' || direction === 'wig') {
      setSuperLikeAnimation(direction === 'boots' ? '👠' : '💇‍♀️');
      setTimeout(() => setSuperLikeAnimation(null), 1500);
    }
    if ((direction === 'right' || direction === 'boots' || direction === 'wig') && Math.random() > 0.7) {
      setMatchedProfile(currentProfile);
      setShowMatch(true);
      receiveLike(currentProfile.vibe);
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
      {/* Swipe Area */}
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

        {/* 👇 Notificación AHORA sobre el card, centrada horizontalmente */}
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
      </SwipeArea>

      {/* Action Buttons */}
      <ActionButtons>
        <ActionButton
          $variant="rewind"
          onClick={() => handleManualAction('rewind')}
        >
          <img src={rewindIcon} alt="Rewind" />
        </ActionButton>
        <ActionButton
          $variant="pass"
          onClick={() => handleManualAction('pass')}
        >
          <img src={passIcon} alt="Pass" />
        </ActionButton>
        <ActionButton
          $variant="superlike"
          onClick={() => handleManualAction('boots')}
          title="Super Like!"
        >
          <img src={superlikeIcon} alt="Super Like" />
        </ActionButton>
        <ActionButton
          $variant="like"
          onClick={() => handleManualAction('like')}
        >
          <img src={likeIcon} alt="Like" />
        </ActionButton>
        <ActionButton
          $variant="boost"
          onClick={() => handleManualAction('wig')}
          title="Boost!"
        >
          <img src={boostIcon} alt="Boost" />
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

      {/* Profile Modal */}
      <ProfileModal
        profile={selectedProfile}
        isOpen={showProfileModal}
        onClose={handleCloseProfileModal}
      />
    </HomeContainer>
  );
};
