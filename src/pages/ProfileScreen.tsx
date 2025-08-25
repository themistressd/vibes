import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Edit, Camera, Settings as SettingsIcon } from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { useTheme } from '../styles/themes/ThemeProvider';
import { Button } from '../components/common/Button';

const ProfileContainer = styled.div`
  padding: ${props => props.theme.common.spacing.md};
  min-height: calc(100vh - 130px);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.common.spacing.xl};
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${props => props.theme.current.gradients.main};
  margin: 0 auto ${props => props.theme.common.spacing.md};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  position: relative;
`;

const EditAvatarButton = styled(motion.button)`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.theme.current.colors.primary};
  border: 2px solid ${props => props.theme.current.colors.background};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Name = styled.h1`
  font-size: ${props => props.theme.common.typography.fontSize.xxl};
  font-weight: ${props => props.theme.common.typography.fontWeight.bold};
  color: ${props => props.theme.current.colors.text};
  margin: 0 0 ${props => props.theme.common.spacing.sm} 0;
`;

const Bio = styled.p`
  font-size: ${props => props.theme.common.typography.fontSize.md};
  color: ${props => props.theme.current.colors.textSecondary};
  margin: 0;
  max-width: 300px;
  margin: 0 auto;
`;

const VibesSection = styled.div`
  background: ${props => props.theme.current.colors.surface};
  border-radius: ${props => props.theme.common.borderRadius.large};
  padding: ${props => props.theme.common.spacing.lg};
  margin-bottom: ${props => props.theme.common.spacing.lg};
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.common.typography.fontSize.lg};
  font-weight: ${props => props.theme.common.typography.fontWeight.semibold};
  color: ${props => props.theme.current.colors.text};
  margin: 0 0 ${props => props.theme.common.spacing.md} 0;
`;

const VibesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.common.spacing.sm};
`;

const VibeBadge = styled.div<{ $colors: { primary: string; secondary: string } }>`
  background: ${props => `linear-gradient(135deg, ${props.$colors.primary}, ${props.$colors.secondary})`};
  color: white;
  padding: ${props => props.theme.common.spacing.sm} ${props => props.theme.common.spacing.md};
  border-radius: ${props => props.theme.common.borderRadius.full};
  font-size: ${props => props.theme.common.typography.fontSize.sm};
  font-weight: ${props => props.theme.common.typography.fontWeight.medium};
`;

const StatsSection = styled.div`
  background: ${props => props.theme.current.colors.surface};
  border-radius: ${props => props.theme.common.borderRadius.large};
  padding: ${props => props.theme.common.spacing.lg};
  margin-bottom: ${props => props.theme.common.spacing.lg};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.common.spacing.md};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.common.typography.fontSize.xl};
  font-weight: ${props => props.theme.common.typography.fontWeight.bold};
  color: ${props => props.theme.current.colors.primary};
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.common.typography.fontSize.sm};
  color: ${props => props.theme.current.colors.textSecondary};
  margin-top: ${props => props.theme.common.spacing.xs};
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.common.spacing.md};
`;

export const ProfileScreen: React.FC = () => {
  const { currentUser, matches } = useAppStore();
  const { theme } = useTheme();
  
  const totalMatches = matches.length;
  const totalConversations = matches.filter(m => m.conversation.length > 0).length;
  const totalMessages = matches.reduce((sum, match) => sum + match.conversation.length, 0);
  
  return (
    <ProfileContainer>
      <Header>
        <Avatar>
          👑
          <EditAvatarButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Camera size={18} />
          </EditAvatarButton>
        </Avatar>
        <Name>{currentUser.name}</Name>
        <Bio>{currentUser.bio}</Bio>
      </Header>
      
      <VibesSection>
        <SectionTitle>My Vibes</SectionTitle>
        <VibesList>
          {currentUser.vibes.map((vibeKey) => {
            const vibeTheme = theme.vibes[vibeKey];
            return (
              <VibeBadge
                key={vibeKey}
                $colors={{ 
                  primary: vibeTheme.colors.primary, 
                  secondary: vibeTheme.colors.secondary 
                }}
              >
                {vibeTheme.emoji} {vibeTheme.name}
              </VibeBadge>
            );
          })}
        </VibesList>
      </VibesSection>
      
      <StatsSection>
        <SectionTitle>Stats</SectionTitle>
        <StatsGrid>
          <StatItem>
            <StatValue>{totalMatches}</StatValue>
            <StatLabel>Matches</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{totalConversations}</StatValue>
            <StatLabel>Chats</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{totalMessages}</StatValue>
            <StatLabel>Messages</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsSection>
      
      <ActionButtons>
        <Button variant="outline" fullWidth>
          <Edit size={18} style={{ marginRight: '8px' }} />
          Edit Profile
        </Button>
        
        <Button variant="ghost" fullWidth>
          <SettingsIcon size={18} style={{ marginRight: '8px' }} />
          Settings
        </Button>
      </ActionButtons>
    </ProfileContainer>
  );
};