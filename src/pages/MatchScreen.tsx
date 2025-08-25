import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { Button } from '../components/common/Button';

const MatchContainer = styled.div`
  min-height: calc(100vh - 130px);
  background: ${props => props.theme.current.gradients.main};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${props => props.theme.common.spacing.lg};
  position: relative;
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: ${props => props.theme.common.spacing.lg};
  left: ${props => props.theme.common.spacing.lg};
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  backdrop-filter: blur(10px);
`;

const MatchContent = styled(motion.div)`
  color: white;
  z-index: 10;
`;

const MatchIcon = styled(motion.div)`
  font-size: 6rem;
  margin-bottom: ${props => props.theme.common.spacing.lg};
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: ${props => props.theme.common.spacing.lg};
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.common.spacing.xl};
  opacity: 0.9;
`;

const Actions = styled.div`
  display: flex;
  gap: ${props => props.theme.common.spacing.md};
`;

export const MatchScreen: React.FC = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const navigate = useNavigate();
  const { profiles, matches } = useAppStore();
  
  const profile = profiles.find(p => p.id === profileId);
  const match = matches.find(m => m.profile.id === profileId);
  
  if (!profile) {
    navigate('/home');
    return null;
  }
  
  const handleStartChat = () => {
    if (match) {
      navigate(`/chat/${match.id}`);
    } else {
      navigate('/messages');
    }
  };
  
  const handleKeepSwiping = () => {
    navigate('/home');
  };
  
  const handleGoBack = () => {
    navigate('/home');
  };
  
  return (
    <MatchContainer>
      <BackButton
        onClick={handleGoBack}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft size={20} />
      </BackButton>
      
      <MatchContent
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <MatchIcon
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎉
        </MatchIcon>
        
        <Title>IT'S A MATCH!</Title>
        
        <Subtitle>
          You and <strong>{profile.name}</strong> liked each other
        </Subtitle>
        
        <Actions>
          <Button 
            variant="secondary" 
            onClick={handleKeepSwiping}
          >
            Keep Swiping
          </Button>
          
          <Button onClick={handleStartChat}>
            <MessageCircle size={18} style={{ marginRight: '8px' }} />
            Start Chat
          </Button>
        </Actions>
      </MatchContent>
    </MatchContainer>
  );
};