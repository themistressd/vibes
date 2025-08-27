import React from 'react';
import { styled } from 'styled-components';
import { MapPin } from 'lucide-react';
import type { VibeType } from '../../styles/themes/types';
import { useVibeTheme } from '../../styles/themes/ThemeProvider';

interface CurrentUser {
  id: string;
  name: string;
  age: number;
  vibes: VibeType[];
  bio: string;
  images: string[];
  distance?: number;
}

interface MyProfileCardProps {
  currentUser: CurrentUser;
}

const CardContainer = styled.div`
  width: 100%;
  max-width: 340px;
  height: 65vh;
  min-height: 500px;
  max-height: 600px;
  position: relative;
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.theme.common.borderRadius.large};
  overflow: hidden;
  box-shadow: ${(props) => props.theme.common.shadows.large};
  background: ${(props) => props.theme.current.colors.surface};
  position: relative;
`;

const ProfileImage = styled.div<{ $image: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$image});
  background-size: cover;
  background-position: center;
`;

const VibeIndicator = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  color: white;
  padding: 6px 10px;
  border-radius: ${(props) => props.theme.common.borderRadius.full};
  font-size: ${(props) => props.theme.common.typography.fontSize.xs};
  font-weight: ${(props) => props.theme.common.typography.fontWeight.semibold};
  backdrop-filter: blur(10px);
`;

const ProfileInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.85));
  padding: 40px 20px 20px;
  color: white;
`;

const NameAge = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 6px;
`;

const Name = styled.h2`
  font-size: 1.75rem;
  font-weight: ${(props) => props.theme.common.typography.fontWeight.bold};
  margin: 0;
`;

const Age = styled.span`
  font-size: 1.75rem;
  opacity: 0.9;
  font-weight: ${(props) => props.theme.common.typography.fontWeight.normal};
`;

const Distance = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${(props) => props.theme.common.typography.fontSize.sm};
  opacity: 0.85;
  margin-bottom: 8px;
`;

const MinimalBio = styled.div`
  font-size: ${(props) => props.theme.common.typography.fontSize.md};
  line-height: 1.3;
  opacity: 0.9;
  max-height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const MyProfileCard: React.FC<MyProfileCardProps> = ({ currentUser }) => {
  const mainImage = currentUser.images[0] || '/api/placeholder/400/600';
  const mainVibe = currentUser.vibes[0];
  const vibeTheme = useVibeTheme(mainVibe);

  return (
    <CardContainer>
      <CardContent>
        <ProfileImage $image={mainImage}>
          <VibeIndicator style={{ background: vibeTheme.gradients.main }}>
            {mainVibe}
          </VibeIndicator>
        </ProfileImage>
        <ProfileInfo>
          <NameAge>
            <Name>{currentUser.name}</Name>
            <Age>{currentUser.age}</Age>
          </NameAge>
          {typeof currentUser.distance === 'number' && (
            <Distance>
              <MapPin size={16} />
              <span>{currentUser.distance} km away</span>
            </Distance>
          )}
          <MinimalBio>{currentUser.bio}</MinimalBio>
        </ProfileInfo>
      </CardContent>
    </CardContainer>
  );
};

export default MyProfileCard;
