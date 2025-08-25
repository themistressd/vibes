import React from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { MapPin, Heart, X } from 'lucide-react';
import type { Profile } from '../../stores/appStore';
import { useVibeTheme } from '../../styles/themes/ThemeProvider';

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right' | 'boots' | 'wig') => void;
  isTop?: boolean;
}

const CardContainer = styled(motion.div)<{ $isTop: boolean }>`
  width: 100%;
  max-width: 350px;
  height: 600px;
  position: absolute;
  cursor: grab;
  transform-origin: center;
  z-index: ${props => props.$isTop ? 10 : 1};
  
  &:active {
    cursor: grabbing;
  }
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${props => props.theme.common.borderRadius.large};
  overflow: hidden;
  box-shadow: ${props => props.theme.common.shadows.large};
  position: relative;
  background: ${props => props.theme.current.colors.surface};
`;

const ProfileImage = styled.div<{ $image: string }>`
  width: 100%;
  height: 70%;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const VibeIndicator = styled.div`
  position: absolute;
  top: ${props => props.theme.common.spacing.md};
  right: ${props => props.theme.common.spacing.md};
  background: ${props => props.theme.current.gradients.main};
  color: ${props => props.theme.current.colors.text};
  padding: ${props => props.theme.common.spacing.xs} ${props => props.theme.common.spacing.sm};
  border-radius: ${props => props.theme.common.borderRadius.full};
  font-size: ${props => props.theme.common.typography.fontSize.sm};
  font-weight: ${props => props.theme.common.typography.fontWeight.semibold};
  backdrop-filter: blur(10px);
`;

const ProfileInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: ${props => props.theme.common.spacing.lg} ${props => props.theme.common.spacing.md} ${props => props.theme.common.spacing.md};
  color: white;
`;

const NameAge = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.common.spacing.sm};
  margin-bottom: ${props => props.theme.common.spacing.xs};
`;

const Name = styled.h2`
  font-size: ${props => props.theme.common.typography.fontSize.xl};
  font-weight: ${props => props.theme.common.typography.fontWeight.bold};
  margin: 0;
`;

const Age = styled.span`
  font-size: ${props => props.theme.common.typography.fontSize.lg};
  opacity: 0.9;
`;

const Distance = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.common.spacing.xs};
  font-size: ${props => props.theme.common.typography.fontSize.sm};
  opacity: 0.8;
  margin-bottom: ${props => props.theme.common.spacing.sm};
`;

const Bio = styled.p`
  font-size: ${props => props.theme.common.typography.fontSize.md};
  line-height: 1.4;
  margin: 0;
  opacity: 0.9;
`;

const DetailSection = styled.div`
  padding: ${props => props.theme.common.spacing.md};
  height: 30%;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.common.spacing.sm};
`;

const Catchphrase = styled.div`
  font-style: italic;
  color: ${props => props.theme.current.colors.primary};
  font-size: ${props => props.theme.common.typography.fontSize.sm};
  text-align: center;
  padding: ${props => props.theme.common.spacing.xs};
  background: ${props => props.theme.current.gradients.subtle};
  border-radius: ${props => props.theme.common.borderRadius.medium};
`;

const Interests = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.common.spacing.xs};
`;

const InterestTag = styled.span`
  background: ${props => props.theme.current.colors.surface};
  color: ${props => props.theme.current.colors.textSecondary};
  padding: ${props => props.theme.common.spacing.xs} ${props => props.theme.common.spacing.sm};
  border-radius: ${props => props.theme.common.borderRadius.full};
  font-size: ${props => props.theme.common.typography.fontSize.xs};
  border: 1px solid ${props => props.theme.current.colors.primary}30;
`;

const SwipeIndicator = styled(motion.div)<{ $direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.$direction === 'left' ? 'left: 20px;' : 'right: 20px;'}
  transform: translateY(-50%) rotate(${props => props.$direction === 'left' ? '-' : ''}30deg);
  width: 100px;
  height: 100px;
  border: 3px solid ${props => props.$direction === 'left' ? '#f44336' : '#4caf50'};
  border-radius: ${props => props.theme.common.borderRadius.large};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$direction === 'left' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)'};
  color: ${props => props.$direction === 'left' ? '#f44336' : '#4caf50'};
  font-size: 2rem;
  pointer-events: none;
  opacity: 0;
`;

const SWIPE_THRESHOLD = 100;
const SUPER_SWIPE_THRESHOLD = 200;

export const SwipeCard: React.FC<SwipeCardProps> = ({ 
  profile, 
  onSwipe, 
  isTop = false 
}) => {
  const vibeTheme = useVibeTheme(profile.vibe);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 0.5, 1, 0.5, 0]);
  
  const leftIndicatorOpacity = useTransform(
    x,
    [-SUPER_SWIPE_THRESHOLD, -SWIPE_THRESHOLD, 0],
    [1, 0.7, 0]
  );
  
  const rightIndicatorOpacity = useTransform(
    x,
    [0, SWIPE_THRESHOLD, SUPER_SWIPE_THRESHOLD],
    [0, 0.7, 1]
  );

  const handleDragStart = () => {
    // Could be used for UI feedback if needed
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const xOffset = info.offset.x;
    const yOffset = info.offset.y;
    
    // Check for super swipes first (vertical)
    if (Math.abs(yOffset) > Math.abs(xOffset)) {
      if (yOffset < -SWIPE_THRESHOLD) {
        // Swipe up - "Boots The House Down!"
        onSwipe('boots');
        return;
      } else if (yOffset > SWIPE_THRESHOLD) {
        // Swipe down - "Wig Snatch"
        onSwipe('wig');
        return;
      }
    }
    
    // Regular horizontal swipes
    if (Math.abs(xOffset) > SWIPE_THRESHOLD) {
      onSwipe(xOffset > 0 ? 'right' : 'left');
    }
  };

  if (!isTop) {
    return (
      <CardContainer $isTop={false}>
        <CardContent>
          <ProfileImage $image={profile.images[0]}>
            <VibeIndicator>
              {vibeTheme.emoji} {vibeTheme.name}
            </VibeIndicator>
          </ProfileImage>
        </CardContent>
      </CardContainer>
    );
  }

  return (
    <CardContainer
      $isTop={isTop}
      style={{ x, y, rotate, opacity }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
      animate={{ scale: 1, x: 0, y: 0, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <CardContent>
        <ProfileImage $image={profile.images[0]}>
          <VibeIndicator>
            {vibeTheme.emoji} {vibeTheme.name}
          </VibeIndicator>
          
          <ProfileInfo>
            <NameAge>
              <Name>{profile.name}</Name>
              <Age>{profile.age}</Age>
            </NameAge>
            
            {profile.distance && (
              <Distance>
                <MapPin size={14} />
                <span>{profile.distance} miles away</span>
              </Distance>
            )}
            
            <Bio>{profile.bio}</Bio>
          </ProfileInfo>
        </ProfileImage>
        
        <DetailSection>
          <Catchphrase>
            "{profile.personality.catchphrase}"
          </Catchphrase>
          
          <Interests>
            {profile.personality.interests.map((interest, index) => (
              <InterestTag key={index}>{interest}</InterestTag>
            ))}
          </Interests>
        </DetailSection>
      </CardContent>
      
      <SwipeIndicator
        $direction="left"
        style={{ opacity: leftIndicatorOpacity }}
      >
        <X size={40} />
      </SwipeIndicator>
      
      <SwipeIndicator
        $direction="right"
        style={{ opacity: rightIndicatorOpacity }}
      >
        <Heart size={40} />
      </SwipeIndicator>
    </CardContainer>
  );
};