import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';

const EntryContainer = styled.div`
  height: 100vh;
  max-height: 812px; /* Mobile frame height limit */
  width: 100%;
  max-width: 375px; /* Mobile frame width limit */
  background: linear-gradient(135deg, #1a0a1a 0%, #2d1b2e 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`;

const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

const FloatingEmoji = styled(motion.div)`
  position: absolute;
  font-size: 2.5rem;
  opacity: 0.2; /* Slightly more visible */
  pointer-events: none;
`;

const ContentWrapper = styled(motion.div)`
  z-index: 10;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 40px;
`;

const Logo = styled(motion.h1)`
  font-family: ${props => props.theme.common.typography.fontFamily.heading};
  font-size: 4rem;
  font-weight: ${props => props.theme.common.typography.fontWeight.bold};
  margin: 0;
  background: linear-gradient(45deg, #FF4500, #00D4AA, #FF1493, #FFD700, #40E0D0);
  background-size: 300% 300%;
  animation: rainbow 3s ease-in-out infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @keyframes rainbow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  /* Mobile optimization */
  @media (max-height: 700px) {
    font-size: 3.5rem;
  }
`;

const CTAButton = styled(motion.div)`
  width: 100%;
  max-width: 280px;
  margin-top: auto;
  margin-bottom: 60px; /* Space from bottom for mobile frame */
`;

const FloatingBackground: React.FC = () => {
  const emojis = ['💎', '✨', '🔥', '💅', '🦄', '👑', '🌶️', '💖'];
  
  return (
    <AnimatedBackground>
      {emojis.map((emoji, index) => (
        <FloatingEmoji
          key={index}
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        >
          {emoji}
        </FloatingEmoji>
      ))}
    </AnimatedBackground>
  );
};

export const EntryScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleEnterApp = () => {
    navigate('/splash');
  };

  return (
    <EntryContainer>
      <FloatingBackground />
      
      <ContentWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Logo
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 1.2, 
            type: "spring",
            bounce: 0.3
          }}
        >
          VIBES
        </Logo>
        
        <CTAButton
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button
            size="lg"
            fullWidth
            onClick={handleEnterApp}
          >
            TAKE A TASTE OF VIBES
          </Button>
        </CTAButton>
      </ContentWrapper>
    </EntryContainer>
  );
};