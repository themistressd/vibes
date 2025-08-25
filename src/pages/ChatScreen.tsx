import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ChatContainer = styled.div`
  min-height: calc(100vh - 130px);
  background: ${props => props.theme.current.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.common.spacing.lg};
`;

const ComingSoonContent = styled(motion.div)`
  text-align: center;
  color: ${props => props.theme.current.colors.textSecondary};
`;

const Icon = styled.div`
  font-size: 4rem;
  margin-bottom: ${props => props.theme.common.spacing.lg};
`;

const Title = styled.h2`
  font-size: ${props => props.theme.common.typography.fontSize.xl};
  color: ${props => props.theme.current.colors.text};
  margin-bottom: ${props => props.theme.common.spacing.md};
`;

const Description = styled.p`
  font-size: ${props => props.theme.common.typography.fontSize.md};
  margin-bottom: ${props => props.theme.common.spacing.lg};
`;

export const ChatScreen: React.FC = () => {
  return (
    <ChatContainer>
      <ComingSoonContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Icon>💬</Icon>
        <Title>Chat Coming Soon!</Title>
        <Description>
          Individual chat functionality will be implemented next.
          Stay tuned for drag-themed conversations!
        </Description>
      </ComingSoonContent>
    </ChatContainer>
  );
};