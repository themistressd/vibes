import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { MapPin, Heart, X } from 'lucide-react';
import type { Profile } from '../../stores/appStore';
import { useVibeTheme } from '../../styles/themes/ThemeProvider';

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right' | 'boots' | 'wig') => void;
  onTap?: () => void; // Add tap handler for expandable profile
  isTop?: boolean;
}

const CardContainer = styled(motion.div)<{ $isTop: boolean }>`
  width: 100%;
  max-width: 340px; /* Fit within mobile frame with padding */
  height: 65vh; /* Updated to match SwipeArea height */
  min-height: 500px; /* Updated to match SwipeArea */
  max-height: 600px; /* Updated to match SwipeArea */
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
  height: 100%; /* Full card height for Tinder-style */
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer; /* Indicate tappable for expandable profile */
`;

const ImageCarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CarouselDots = styled.div`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  z-index: 20;
`;

const Dot = styled.div<{ $active: boolean; $total: number }>`
  width: ${props => `calc((100vw - 120px) / ${props.$total})`}; /* Dynamic width based on number of images */
  max-width: 60px;
  height: 3px;
  background: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.4)'};
  border-radius: 2px;
  transition: all 0.3s ease;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: ${props => props.theme.common.spacing.md};
  left: ${props => props.theme.common.spacing.md};
  background: #4CAF50;
  color: white;
  padding: ${props => props.theme.common.spacing.xs} ${props => props.theme.common.spacing.sm};
  border-radius: ${props => props.theme.common.borderRadius.full};
  font-size: ${props => props.theme.common.typography.fontSize.xs};
  font-weight: ${props => props.theme.common.typography.fontWeight.semibold};
  display: flex;
  align-items: center;
  gap: 4px;
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
  }
`;

const VibeIndicator = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${props => props.theme.current.gradients.main};
  color: white;
  padding: 6px 10px;
  border-radius: ${props => props.theme.common.borderRadius.full};
  font-size: ${props => props.theme.common.typography.fontSize.xs};
  font-weight: ${props => props.theme.common.typography.fontWeight.semibold};
  backdrop-filter: blur(10px);
  z-index: 15;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ProfileInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.85));
  padding: 40px 20px 20px; /* Increased top padding for better gradient */
  color: white;
  z-index: 10;
`;

const NameAge = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 6px;
`;

const Name = styled.h2`
  font-size: 1.75rem;
  font-weight: ${props => props.theme.common.typography.fontWeight.bold};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const VerificationBadge = styled.span`
  color: #2196F3;
  font-size: 1.2rem;
`;

const Age = styled.span`
  font-size: 1.75rem; /* Match name size for clean look */
  opacity: 0.9;
  font-weight: ${props => props.theme.common.typography.fontWeight.normal};
`;

const Distance = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${props => props.theme.common.typography.fontSize.sm};
  opacity: 0.85;
  margin-bottom: 8px;
`;

const MinimalBio = styled.div`
  font-size: ${props => props.theme.common.typography.fontSize.md};
  line-height: 1.3;
  opacity: 0.9;
  max-height: 40px; /* Limit height for minimal design */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const TouchArea = styled.div<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 80px; /* Below carousel dots */
  bottom: 120px; /* Above profile info */
  width: 50%;
  ${props => props.$side === 'left' ? 'left: 0;' : 'right: 0;'}
  z-index: 5;
  cursor: pointer;
  
  /* Add subtle visual feedback for touch areas (development/debugging) */
  @media (hover: hover) {
    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  }
  
  /* Active state for touch feedback */
  &:active {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SwipeIndicator = styled(motion.div)<{ $direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${props => props.$direction === 'left' ? 'left: 20px;' : 'right: 20px;'}
  transform: translateY(-50%) rotate(${props => props.$direction === 'left' ? '-' : ''}15deg);
  width: 80px;
  height: 80px;
  border: 3px solid ${props => props.$direction === 'left' ? '#FF4458' : '#00C851'};
  border-radius: ${props => props.theme.common.borderRadius.large};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$direction === 'left' ? 'rgba(255, 68, 88, 0.15)' : 'rgba(0, 200, 81, 0.15)'};
  color: ${props => props.$direction === 'left' ? '#FF4458' : '#00C851'};
  backdrop-filter: blur(10px);
  pointer-events: none;
  opacity: 0;
`;

const SWIPE_THRESHOLD = 100;
const SUPER_SWIPE_THRESHOLD = 200;

export const SwipeCard: React.FC<SwipeCardProps> = ({ 
  profile, 
  onSwipe, 
  onTap,
  isTop = false 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'next' && currentImageIndex < profile.images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else if (direction === 'prev' && currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  const handleCardTap = () => {
    // Always trigger expand when card is tapped
    if (onTap) {
      onTap();
    }
  };

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
          <ImageCarouselContainer>
            <ProfileImage $image={profile.images[0]}>
              <VibeIndicator>
                <span>{vibeTheme.emoji}</span>
                <span>{vibeTheme.name}</span>
              </VibeIndicator>
            </ProfileImage>
          </ImageCarouselContainer>
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
        <ImageCarouselContainer>
          <ProfileImage 
            $image={profile.images[currentImageIndex]}
          >
            {/* Image Carousel Dots */}
            {profile.images.length > 1 && (
              <CarouselDots>
                {profile.images.map((_, index) => (
                  <Dot 
                    key={index} 
                    $active={index === currentImageIndex}
                    $total={profile.images.length}
                  />
                ))}
              </CarouselDots>
            )}

            <StatusBadge>
              Active
            </StatusBadge>
            
            <VibeIndicator>
              <span>{vibeTheme.emoji}</span>
              <span>{vibeTheme.name}</span>
            </VibeIndicator>
            
            {/* Touch areas for image navigation */}
            {profile.images.length > 1 && (
              <>
                <TouchArea 
                  $side="left" 
                  data-touch-area
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageNavigation('prev');
                  }}
                />
                <TouchArea 
                  $side="right" 
                  data-touch-area
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageNavigation('next');
                  }}
                />
              </>
            )}
            
            <ProfileInfo onClick={handleCardTap}>
              <NameAge>
                <Name>
                  {profile.name}
                  <VerificationBadge>✓</VerificationBadge>
                </Name>
                <Age>{profile.age}</Age>
              </NameAge>
              
              {profile.distance && (
                <Distance>
                  <MapPin size={14} />
                  <span>{profile.distance} miles away</span>
                </Distance>
              )}
              
              {/* Minimal bio - just a brief excerpt */}
              <MinimalBio>
                {profile.bio.length > 60 
                  ? `${profile.bio.substring(0, 60)}...` 
                  : profile.bio
                }
              </MinimalBio>
            </ProfileInfo>
          </ProfileImage>
        </ImageCarouselContainer>
      </CardContent>
      
      <SwipeIndicator
        $direction="left"
        style={{ opacity: leftIndicatorOpacity }}
      >
        <X size={36} />
      </SwipeIndicator>
      
      <SwipeIndicator
        $direction="right"
        style={{ opacity: rightIndicatorOpacity }}
      >
        <Heart size={36} />
      </SwipeIndicator>
    </CardContainer>
  );
};