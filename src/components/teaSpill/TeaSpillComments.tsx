import React, { useState } from 'react';
import styled from 'styled-components';
import type { TeaComment } from '../../data/socialData';

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.common.spacing.xs};
  margin-top: ${props => props.theme.common.spacing.sm};
`;

const CommentItem = styled.div`
  background: ${props => props.theme.current.colors.surface};
  padding: ${props => props.theme.common.spacing.xs};
  border-radius: ${props => props.theme.common.borderRadius.small};
`;

const CommentAuthor = styled.span`
  font-weight: ${props => props.theme.common.typography.fontWeight.semibold};
`;

const CommentContent = styled.p`
  margin: 0;
`;

const CommentMeta = styled.span`
  font-size: ${props => props.theme.common.typography.fontSize.xs};
  color: ${props => props.theme.current.colors.textSecondary};
`;

const CommentForm = styled.form`
  display: flex;
  gap: ${props => props.theme.common.spacing.xs};
  margin-top: ${props => props.theme.common.spacing.xs};
`;

const CommentInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.common.spacing.xs};
  border-radius: ${props => props.theme.common.borderRadius.small};
  border: 1px solid ${props => props.theme.current.colors.primary};
`;

interface TeaSpillCommentsProps {
  comments: TeaComment[];
}

export const TeaSpillComments: React.FC<TeaSpillCommentsProps> = ({ comments }) => {
  const [localComments, setLocalComments] = useState<TeaComment[]>(comments);
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const newComment: TeaComment = {
      id: `comment_${Date.now()}`,
      author: 'You',
      content: text,
      timestamp: new Date(),
      likes: 0,
    };
    setLocalComments([...localComments, newComment]);
    setText('');
  };

  return (
    <CommentsContainer>
      {localComments.map(c => (
        <CommentItem key={c.id}>
          <CommentAuthor>{c.author}</CommentAuthor>
          <CommentContent>{c.content}</CommentContent>
          <CommentMeta>{c.timestamp.toLocaleString()}</CommentMeta>
        </CommentItem>
      ))}
      <CommentForm onSubmit={handleSubmit}>
        <CommentInput
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Post</button>
      </CommentForm>
    </CommentsContainer>
  );
};

