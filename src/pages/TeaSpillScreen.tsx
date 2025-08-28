import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { useAppStore } from '../stores/appStore';
import type { VibeType } from '../styles/themes/types';
import { Button } from '../components/common/Button';
import BingoRewardModal from '../components/modals/BingoRewardModal';
import { TeaSpillFeed } from '../components/teaSpill/TeaSpillFeed';

const TeaSpillContainer = styled.div`
  padding: ${props => props.theme.common.spacing.lg};
  min-height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${props => props.theme.common.spacing.lg};
`;

const Title = styled.h2`
  font-size: ${props => props.theme.common.typography.fontSize.xl};
  color: ${props => props.theme.current.colors.text};
  margin: 0;
`;

const VibeList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.common.spacing.sm};
`;

const VibeRow = styled(motion.div)<{ $completed: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.common.spacing.sm} ${props => props.theme.common.spacing.md};
  border-radius: ${props => props.theme.common.borderRadius.medium};
  background: ${props => props.theme.current.colors.surface};
  ${props =>
    props.$completed &&
    css`
      background: ${props.theme.current.colors.primary}20;
      border: 1px solid ${props.theme.current.colors.primary};
    `}
`;

const VibeName = styled.span`
  text-transform: capitalize;
  font-weight: ${props => props.theme.common.typography.fontWeight.semibold};
`;

const Counts = styled.span`
  display: flex;
  gap: ${props => props.theme.common.spacing.sm};
  font-size: ${props => props.theme.common.typography.fontSize.sm};
`;

export const TeaSpillScreen: React.FC = () => {
  const {
    likesGivenByVibe,
    likesReceivedByVibe,
    resetLikes,
    hasBingo,
    bingoBadgeUnlocked,
  } = useAppStore();
  const vibes: VibeType[] = ['spicy', 'chill', 'urban', 'artsy', 'dluxe'];
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (hasBingo() && !bingoBadgeUnlocked) {
      setShowModal(true);
    }
  }, [likesGivenByVibe, hasBingo, bingoBadgeUnlocked]);

  return (
    <TeaSpillContainer>
      <TeaSpillFeed />
      <Title>Tea Spill</Title>
      <VibeList>
        {vibes.map((vibe) => {
          const given = likesGivenByVibe[vibe];
          const received = likesReceivedByVibe[vibe];
          const total = given + received;
          const completed = given > 0 && received > 0;

          return (
            <VibeRow
              key={vibe}
              $completed={completed}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <VibeName>{vibe}</VibeName>
              <Counts>
                <span>Given {given}</span>
                <span>Received {received}</span>
                <span>Total {total}</span>
              </Counts>
            </VibeRow>
          );
        })}
      </VibeList>
      <Button variant="secondary" onClick={resetLikes}>
        Reset Likes
      </Button>
      <BingoRewardModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </TeaSpillContainer>
  );
};

