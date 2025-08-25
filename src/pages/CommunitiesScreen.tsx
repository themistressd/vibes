import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CommunitiesContainer = styled.div`
  padding: ${props => props.theme.common.spacing.lg};
  min-height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

export const CommunitiesScreen: React.FC = () => {
  return (
    <CommunitiesContainer>
      <ComingSoonContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Icon>👥</Icon>
        <Title>Communities Coming Soon!</Title>
      </ComingSoonContent>
    </CommunitiesContainer>
  );
};