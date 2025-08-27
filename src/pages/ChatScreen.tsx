import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../stores/appStore';
import { Button } from '../components/common/Button';

const ChatContainer = styled.div`
  min-height: calc(100vh - 130px);
  background: ${props => props.theme.current.colors.background};
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.common.spacing.md};
`;

const MessagesList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.common.spacing.sm};
  overflow-y: auto;
`;

const MessageBubble = styled.div<{ $isOwn: boolean }>`
  max-width: 80%;
  align-self: ${props => (props.$isOwn ? 'flex-end' : 'flex-start')};
  background: ${props =>
    props.$isOwn
      ? props.theme.current.gradients.main
      : props.theme.current.colors.surface};
  color: ${props => props.theme.current.colors.text};
  padding: ${props =>
    `${props.theme.common.spacing.sm} ${props.theme.common.spacing.md}`};
  border-radius: ${props => props.theme.common.borderRadius.large};
`;

const InputContainer = styled.form`
  display: flex;
  gap: ${props => props.theme.common.spacing.sm};
  margin-top: ${props => props.theme.common.spacing.md};
`;

const MessageInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.common.spacing.sm};
  border: 1px solid ${props => props.theme.current.colors.primary}30;
  border-radius: ${props => props.theme.common.borderRadius.large};
  background: ${props => props.theme.current.colors.surface};
  color: ${props => props.theme.current.colors.text};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.current.colors.primary};
  }
`;

export const ChatScreen: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const { matches, currentUser, sendMessage } = useAppStore();
  const match = matches.find(m => m.id === matchId);
  const [content, setContent] = useState('');

  if (!match) {
    return <ChatContainer>Match not found</ChatContainer>;
  }

  const handleSend = () => {
    const trimmed = content.trim();
    if (!trimmed) return;
    sendMessage(match.id, {
      senderId: currentUser.id,
      content: trimmed,
      type: 'text',
    });
    setContent('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <ChatContainer>
      <MessagesList>
        {match.conversation.map(message => (
          <MessageBubble
            key={message.id}
            $isOwn={message.senderId === currentUser.id}
          >
            {message.content}
          </MessageBubble>
        ))}
      </MessagesList>
      <InputContainer onSubmit={handleSubmit}>
        <MessageInput
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Type a message"
        />
        <Button type="submit" variant="primary">
          Send
        </Button>
      </InputContainer>
    </ChatContainer>
  );
};

