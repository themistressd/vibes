import React, { useState } from 'react';
import styled from 'styled-components';
import type { TeaSpillPost as TeaSpillPostType } from '../../data/socialData';
import { TeaSpillComments } from './TeaSpillComments';
import { submitReport } from './moderationUtils';

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

const Reactions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.common.spacing.xs};
  align-items: center;
`;

const ReactionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.current.colors.primary};
`;

const ReportButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.current.colors.textSecondary};
  align-self: flex-start;
`;

interface TeaSpillPostProps {
  post: TeaSpillPostType;
}

const defaultReactions = ['👍', '😂', '🔥', '❤️'];

export const TeaSpillPost: React.FC<TeaSpillPostProps> = ({ post }) => {
  const [reactions, setReactions] = useState<Record<string, number>>({
    '👍': post.likes,
    ...(post.reactions || {}),
  });

  const addReaction = (key: string) => {
    setReactions(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
  };

  const addGifReaction = () => {
    const url = prompt('GIF URL');
    if (url) addReaction(url);
  };

  return (
    <PostCard>
      <Header>
        <Avatar>{post.author.charAt(0)}</Avatar>
        <Author>{post.author}</Author>
      </Header>
      <Content>{post.content}</Content>
      <Reactions>
        {defaultReactions.map(r => (
          <ReactionButton key={r} onClick={() => addReaction(r)}>
            {r} {reactions[r] || 0}
          </ReactionButton>
        ))}
        <ReactionButton onClick={addGifReaction}>GIF</ReactionButton>
        {Object.entries(reactions).map(([key, count]) => (
          !defaultReactions.includes(key) && (
            <ReactionButton key={key} onClick={() => addReaction(key)}>
              <img src={key} alt="gif" width={20} height={20} /> {count}
            </ReactionButton>
          )
        ))}
      </Reactions>
      <ReportButton onClick={() => submitReport(post)}>Report</ReportButton>
      <Meta>{post.timestamp.toLocaleString()}</Meta>
      <TeaSpillComments comments={post.comments} />
    </PostCard>
  );
};

