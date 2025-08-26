import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Music, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Profile } from '../../stores/appStore';
import { useVibeTheme } from '../../styles/themes/ThemeProvider';

interface ProfileModalProps {
  profile: Profile | null;
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.current.colors.background};
  width: 100%;
  max-width: 375px; /* Mobile width */
  max-height: 95vh;
  border-radius: ${props => props.theme.common.borderRadius.large} ${props => props.theme.common.borderRadius.large} 0 0;
  overflow: hidden;
  position: relative;
  margin: auto 0 0 0; /* Push to bottom for mobile feel */
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8); /* Increased opacity for better contrast */
  color: white;
  border: none;
  width: 48px; /* Increased from 40px for better touch target */
  height: 48px; /* Increased from 40px for better touch target */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); /* Added shadow for better visibility */
`;

const PhotoGallery = styled.div`
  position: relative;
  height: 60vh;
  max-height: 500px;
  overflow: hidden;
`;

const PhotoImage = styled.div<{ $image: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
`;

const PhotoNavigation = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
`;

const PhotoDot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const NavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8); /* Increased opacity for better contrast */
  color: white;
  border: none;
  width: 48px; /* Increased from 40px for better touch target */
  height: 48px; /* Increased from 40px for better touch target */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);
  z-index: 5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); /* Added shadow for better visibility */
  
  &.prev {
    left: 20px;
  }
  
  &.next {
    right: 20px;
  }
`;

const ProfileDetails = styled.div`
  padding: 20px;
  max-height: 35vh;
  overflow-y: auto;
`;

const ProfileHeader = styled.div`
  margin-bottom: 20px;
`;

const NameAge = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
`;

const Name = styled.h1`
  font-size: 1.8rem;
  font-weight: ${props => props.theme.common.typography.fontWeight.bold};
  margin: 0;
  color: ${props => props.theme.current.colors.text};
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Age = styled.span`
  font-size: 1.8rem;
  color: ${props => props.theme.current.colors.textSecondary};
`;

const VerificationBadge = styled.span`
  color: #2196F3;
  font-size: 1.2rem;
`;

const Distance = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${props => props.theme.current.colors.textSecondary};
  font-size: ${props => props.theme.common.typography.fontSize.md};
  margin-bottom: 16px;
`;

const VibeIndicator = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${props => props.theme.current.gradients.main};
  color: white;
  padding: 8px 12px;
  border-radius: ${props => props.theme.common.borderRadius.full};
  font-size: ${props => props.theme.common.typography.fontSize.sm};
  font-weight: ${props => props.theme.common.typography.fontWeight.semibold};
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.common.typography.fontSize.lg};
  font-weight: ${props => props.theme.common.typography.fontWeight.semibold};
  color: ${props => props.theme.current.colors.text};
  margin: 0 0 12px 0;
`;

const Bio = styled.p`
  font-size: ${props => props.theme.common.typography.fontSize.md};
  line-height: 1.5;
  color: ${props => props.theme.current.colors.text};
  margin: 0;
`;

const Interests = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const InterestTag = styled.span`
  background: ${props => props.theme.current.colors.surface};
  color: ${props => props.theme.current.colors.text};
  padding: 8px 12px;
  border-radius: ${props => props.theme.common.borderRadius.full};
  font-size: ${props => props.theme.common.typography.fontSize.sm};
  border: 1px solid ${props => props.theme.current.colors.primary}30;
`;

const SpotifySection = styled.div`
  background: ${props => props.theme.current.colors.surface};
  padding: 16px;
  border-radius: ${props => props.theme.common.borderRadius.medium};
  margin-bottom: 20px;
`;

const SpotifyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const SpotifyTitle = styled.span`
  font-weight: ${props => props.theme.common.typography.fontWeight.semibold};
  color: #1DB954;
`;

const Catchphrase = styled.div`
  font-style: italic;
  color: ${props => props.theme.current.colors.primary};
  font-size: ${props => props.theme.common.typography.fontSize.lg};
  text-align: center;
  padding: 16px;
  background: ${props => props.theme.current.gradients.subtle};
  border-radius: ${props => props.theme.common.borderRadius.medium};
  margin-bottom: 20px;
`;

export const ProfileModal: React.FC<ProfileModalProps> = ({ profile, isOpen, onClose }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const vibeTheme = useVibeTheme(profile?.vibe);

  if (!profile) return null;

  const handlePhotoNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'next' && currentPhotoIndex < profile.images.length - 1) {
      setCurrentPhotoIndex(prev => prev + 1);
    } else if (direction === 'prev' && currentPhotoIndex > 0) {
      setCurrentPhotoIndex(prev => prev - 1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={28} /> {/* Increased from 20 to 28 for better mobile visibility */}
            </CloseButton>

            <PhotoGallery>
              <PhotoImage $image={profile.images[currentPhotoIndex]} />
              
              {profile.images.length > 1 && (
                <>
                  {currentPhotoIndex > 0 && (
                    <NavButton
                      className="prev"
                      onClick={() => handlePhotoNavigation('prev')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft size={28} /> {/* Increased from 20 to 28 for better mobile visibility */}
                    </NavButton>
                  )}
                  
                  {currentPhotoIndex < profile.images.length - 1 && (
                    <NavButton
                      className="next"
                      onClick={() => handlePhotoNavigation('next')}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight size={28} /> {/* Increased from 20 to 28 for better mobile visibility */}
                    </NavButton>
                  )}

                  <PhotoNavigation>
                    {profile.images.map((_, index) => (
                      <PhotoDot
                        key={index}
                        $active={index === currentPhotoIndex}
                        onClick={() => setCurrentPhotoIndex(index)}
                      />
                    ))}
                  </PhotoNavigation>
                </>
              )}
            </PhotoGallery>

            <ProfileDetails>
              <ProfileHeader>
                <NameAge>
                  <Name>
                    {profile.name}
                    <VerificationBadge>✓</VerificationBadge>
                  </Name>
                  <Age>{profile.age}</Age>
                </NameAge>
                
                {profile.distance && (
                  <Distance>
                    <MapPin size={16} />
                    <span>{profile.distance} miles away</span>
                  </Distance>
                )}
                
                <VibeIndicator>
                  <span>{vibeTheme?.emoji}</span>
                  <span>{vibeTheme?.name}</span>
                </VibeIndicator>
              </ProfileHeader>

              {profile.personality.catchphrase && (
                <Catchphrase>
                  "{profile.personality.catchphrase}"
                </Catchphrase>
              )}

              <Section>
                <SectionTitle>About</SectionTitle>
                <Bio>{profile.bio}</Bio>
              </Section>

              <Section>
                <SectionTitle>Interests</SectionTitle>
                <Interests>
                  {profile.personality.interests.map((interest, index) => (
                    <InterestTag key={index}>{interest}</InterestTag>
                  ))}
                </Interests>
              </Section>

              <SpotifySection>
                <SpotifyHeader>
                  <Music size={20} color="#1DB954" />
                  <SpotifyTitle>Music Taste</SpotifyTitle>
                </SpotifyHeader>
                <Bio>Loves {profile.personality.style} vibes and can't stop listening to artists that match their {profile.vibe} energy!</Bio>
              </SpotifySection>
            </ProfileDetails>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};