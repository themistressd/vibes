import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { Button } from '../components/common/Button';

const MatchContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #00C851 0%, #007E33 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${props => props.theme.common.spacing.lg};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const ProfilePhotos = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${props => props.theme.common.spacing.xl};
  position: relative;
`;

const CircularPhoto = styled.div<{ $image: string; $isUser?: boolean }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  border: 4px solid white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  ${props => props.$isUser && `
    margin-right: -20px;
    z-index: 2;
  `}
  
  ${props => !props.$isUser && `
    margin-left: -20px;
    z-index: 1;
  `}
`;

const MessageSection = styled.div`
  margin-top: ${props => props.theme.common.spacing.xl};
  width: 100%;
  max-width: 400px;
`;

const MessageInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.common.spacing.md};
  border: none;
  border-radius: ${props => props.theme.common.borderRadius.full};
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  margin-bottom: ${props => props.theme.common.spacing.md};
  
  &::placeholder {
    color: #666;
  }
  
  &:focus {
    outline: none;
    background: white;
  }
`;

const EmojiReactions = styled.div`
  display: flex;
  gap: ${props => props.theme.common.spacing.md};
  justify-content: center;
  margin-bottom: ${props => props.theme.common.spacing.lg};
`;

const EmojiButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const BackButton = styled(motion.button)`
  position: absolute;
  top: ${props => props.theme.common.spacing.lg};
  left: ${props => props.theme.common.spacing.lg};
  background: rgba(0, 0, 0, 0.6); /* Enhanced contrast - dark background */
  border: 2px solid rgba(255, 255, 255, 0.8); /* White border for visibility */
  border-radius: 50%;
  width: 48px; /* Larger for better touch target */
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  backdrop-filter: blur(10px);
  z-index: 20; /* Higher z-index for visibility */
  
  /* Enhanced visibility and contrast */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    border-color: rgba(255, 255, 255, 1);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 22px;
    height: 22px;
    stroke-width: 2.5; /* Thicker stroke for better visibility */
  }
`;

const MatchContent = styled(motion.div)`
  color: white;
  z-index: 10;
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
  
  const handleEmojiClick = (emoji: string) => {
    // In a real app, this would send the emoji as a message
    console.log('Sent emoji:', emoji);
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
        <Title>IT'S A MATCH!</Title>
        
        <Subtitle>
          You and {profile.name} liked each other
        </Subtitle>
        
        <ProfilePhotos>
          <CircularPhoto 
            $image="/api/placeholder/120/120" 
            $isUser={true}
          />
          <CircularPhoto 
            $image={profile.images[0]}
            $isUser={false}
          />
        </ProfilePhotos>
        
        <MessageSection>
          <MessageInput 
            type="text" 
            placeholder="Say something nice..."
          />
          
          <EmojiReactions>
            <EmojiButton
              onClick={() => handleEmojiClick('👋')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              👋
            </EmojiButton>
            <EmojiButton
              onClick={() => handleEmojiClick('😊')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              😊
            </EmojiButton>
            <EmojiButton
              onClick={() => handleEmojiClick('❤️')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ❤️
            </EmojiButton>
            <EmojiButton
              onClick={() => handleEmojiClick('😍')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              😍
            </EmojiButton>
          </EmojiReactions>
        </MessageSection>
        
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