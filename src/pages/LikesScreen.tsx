import React from 'react';
import styled from 'styled-components';
import { useAppStore } from '../stores/appStore';
import { useTheme } from '../styles/themes/ThemeProvider';
import type { VibeType } from '../styles/themes/types';

const ScreenContainer = styled.div`
  padding: ${props => props.theme.common.spacing.lg};
  min-height: calc(100vh - 130px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.common.spacing.lg};
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${props => props.theme.common.spacing.md};
  width: 100%;
  max-width: 400px;
`;

const Cell = styled.div<{ $completed: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.common.spacing.md};
  border-radius: ${props => props.theme.common.borderRadius.medium};
  background: ${props => props.theme.current.colors.surface};
  border: 2px solid
    ${props =>
      props.$completed
        ? props.theme.current.colors.success
        : props.theme.current.colors.primary}40;

  .emoji {
    font-size: 2rem;
  }

  .count {
    margin-top: ${props => props.theme.common.spacing.xs};
    font-size: ${props => props.theme.common.typography.fontSize.md};
    color: ${props => props.theme.current.colors.text};
  }

  .check {
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 1rem;
  }
`;

const ProgressText = styled.p`
  color: ${props => props.theme.current.colors.text};
  font-size: ${props => props.theme.common.typography.fontSize.md};
`;

export const LikesScreen: React.FC = () => {
  const { likesByVibe } = useAppStore();
  const { theme } = useTheme();
  const vibes: VibeType[] = ['spicy', 'chill', 'urban', 'artsy', 'dluxe'];

  const completed = vibes.filter(v => (likesByVibe[v] || 0) > 0).length;
  const remaining = vibes.length - completed;

  return (
    <ScreenContainer>
      <Board>
        {vibes.map(vibe => {
          const vibeTheme = theme.vibes[vibe];
          const count = likesByVibe[vibe] || 0;
          const isCompleted = count > 0;
          return (
            <Cell key={vibe} $completed={isCompleted}>
              <span className="emoji">{vibeTheme.emoji}</span>
              <span className="count">{count}</span>
              {isCompleted && <span className="check">✅</span>}
            </Cell>
          );
        })}
      </Board>
      <ProgressText>
        {remaining > 0
          ? `Faltan ${remaining} vibes para completar el Bingo`
          : '¡Bingo completado!'}
      </ProgressText>
    </ScreenContainer>
  );
};

