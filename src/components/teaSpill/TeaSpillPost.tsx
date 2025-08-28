import React, { useState } from 'react';
import styled from 'styled-components';
import type { TeaSpillPost as TeaSpillPostType } from '../../data/socialData';
import { TeaSpillComments } from './TeaSpillComments';

const PostCard = styled.div`
  background: ${props => props.theme.current.colors.surface};
  padding: ${props => props.theme.common.spacing.md};
  border-radius: ${props => props.theme.common.borderRadius.medium};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.common.spacing.sm};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.common.spacing.sm};
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.current.colors.primary};
  color: ${props => props.theme.current.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${props => props.theme.common.typography.fontWeight.bold};
`;

const Author = styled.span`
  font-weight: ${props => props.theme.common.typography.fontWeight.semibold};
`;

const Content = styled.p`
  margin: 0;
`;

const Meta = styled.span`
  font-size: ${props => props.theme.common.typography.fontSize.xs};
  color: ${props => props.theme.current.colors.textSecondary};
`;

const ReactionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.current.colors.primary};
  align-self: flex-start;
`;

interface TeaSpillPostProps {
  post: TeaSpillPostType;
}

export const TeaSpillPost: React.FC<TeaSpillPostProps> = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);

  return (
    <PostCard>
      <Header>
        <Avatar>{post.author.charAt(0)}</Avatar>
        <Author>{post.author}</Author>
      </Header>
      <Content>{post.content}</Content>
      <ReactionButton onClick={() => setLikes(l => l + 1)}>
        👍 {likes}
      </ReactionButton>
      <Meta>{post.timestamp.toLocaleString()}</Meta>
      <TeaSpillComments comments={post.comments} />
    </PostCard>
  );
};

