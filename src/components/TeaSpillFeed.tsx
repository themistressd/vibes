import React from 'react';
import styled from 'styled-components';
import { mockTeaPosts } from '../data/socialData';

const FeedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.common.spacing.md};
`;

const PostCard = styled.div`
  background: ${props => props.theme.current.colors.surface};
  padding: ${props => props.theme.common.spacing.md};
  border-radius: ${props => props.theme.common.borderRadius.medium};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.common.spacing.xs};
`;

const Author = styled.span`
  font-weight: ${props => props.theme.common.typography.fontWeight.semibold};
`;

const Content = styled.p`
  margin: 0;
  font-size: ${props => props.theme.common.typography.fontSize.sm};
`;

const Meta = styled.span`
  font-size: ${props => props.theme.common.typography.fontSize.xs};
  color: ${props => props.theme.current.colors.textSecondary};
`;

export const TeaSpillFeed: React.FC = () => (
  <FeedContainer>
    {mockTeaPosts.map(post => (
      <PostCard key={post.id}>
        <Author>{post.author}</Author>
        <Content>{post.content}</Content>
        <Meta>{post.likes} likes</Meta>
      </PostCard>
    ))}
  </FeedContainer>
);

