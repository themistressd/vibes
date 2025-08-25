import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useAppStore } from '../stores/appStore';
import { useVibeTheme } from '../styles/themes/ThemeProvider';
import { Button } from '../components/common/Button';

const MessagesContainer = styled.div`
  padding: ${props => props.theme.common.spacing.md};
  min-height: calc(100vh - 130px);
`;

const Header = styled.div`
  margin-bottom: ${props => props.theme.common.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.common.typography.fontSize.xxl};
  font-weight: ${props => props.theme.common.typography.fontWeight.bold};
  color: ${props => props.theme.current.colors.text};
  margin: 0 0 ${props => props.theme.common.spacing.sm} 0;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: ${props => props.theme.common.spacing.lg};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${props => props.theme.common.spacing.sm} ${props => props.theme.common.spacing.md};
  padding-left: 40px;
  border: 2px solid ${props => props.theme.current.colors.primary}30;
  border-radius: ${props => props.theme.common.borderRadius.full};
  background: ${props => props.theme.current.colors.surface};
  color: ${props => props.theme.current.colors.text};
  font-size: ${props => props.theme.common.typography.fontSize.md};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.current.colors.primary};
  }
  
  &::placeholder {
    color: ${props => props.theme.current.colors.textSecondary};
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.current.colors.textSecondary};
  width: 18px;
  height: 18px;
`;

const ConversationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.common.spacing.sm};
`;

const ConversationCard = styled(motion.div)`
  background: ${props => props.theme.current.colors.surface};
  border-radius: ${props => props.theme.common.borderRadius.large};
  padding: ${props => props.theme.common.spacing.md};
  cursor: pointer;
  border: 1px solid ${props => props.theme.current.colors.primary}20;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.current.colors.primary}60;
    background: ${props => props.theme.current.gradients.subtle};
  }
`;

const ConversationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.common.spacing.md};
  margin-bottom: ${props => props.theme.common.spacing.sm};
`;

const Avatar = styled.div<{ $image: string; $vibeColor: string }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  border: 3px solid ${props => props.$vibeColor};
  position: relative;
`;

const OnlineIndicator = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 14px;
  height: 14px;
  background: #4caf50;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.current.colors.surface};
`;

const ConversationInfo = styled.div`
  flex: 1;
  min-width: 0; /* Allows text overflow */
`;

const NameTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.common.spacing.xs};
`;

const Name = styled.h3`
  font-size: ${props => props.theme.common.typography.fontSize.lg};
  font-weight: ${props => props.theme.common.typography.fontWeight.semibold};
  color: ${props => props.theme.current.colors.text};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Timestamp = styled.span`
  font-size: ${props => props.theme.common.typography.fontSize.sm};
  color: ${props => props.theme.current.colors.textSecondary};
  flex-shrink: 0;
`;

const LastMessage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessagePreview = styled.p`
  font-size: ${props => props.theme.common.typography.fontSize.md};
  color: ${props => props.theme.current.colors.textSecondary};
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
`;

const UnreadBadge = styled.div`
  background: ${props => props.theme.current.colors.primary};
  color: ${props => props.theme.current.colors.text};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.common.typography.fontSize.xs};
  font-weight: ${props => props.theme.common.typography.fontWeight.bold};
  margin-left: ${props => props.theme.common.spacing.sm};
  flex-shrink: 0;
`;

const VibeIndicator = styled.div<{ $vibeColor: string; $vibeEmoji: string }>`
  background: ${props => props.$vibeColor}20;
  color: ${props => props.$vibeColor};
  padding: ${props => props.theme.common.spacing.xs} ${props => props.theme.common.spacing.sm};
  border-radius: ${props => props.theme.common.borderRadius.full};
  font-size: ${props => props.theme.common.typography.fontSize.xs};
  font-weight: ${props => props.theme.common.typography.fontWeight.medium};
  align-self: flex-start;
  
  &:before {
    content: '${props => props.$vibeEmoji} ';
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: ${props => props.theme.common.spacing.xxl} ${props => props.theme.common.spacing.lg};
  color: ${props => props.theme.current.colors.textSecondary};
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${props => props.theme.common.spacing.lg};
  opacity: 0.5;
`;

const EmptyStateText = styled.h3`
  font-size: ${props => props.theme.common.typography.fontSize.lg};
  margin-bottom: ${props => props.theme.common.spacing.md};
`;

const EmptyStateSubtext = styled.p`
  font-size: ${props => props.theme.common.typography.fontSize.md};
  margin-bottom: ${props => props.theme.common.spacing.lg};
  opacity: 0.8;
`;

const formatTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 60) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days < 7) {
    return `${days}d`;
  } else {
    return date.toLocaleDateString();
  }
};

export const MessagesScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { matches } = useAppStore();
  const navigate = useNavigate();
  
  // Filter matches based on search query
  const filteredMatches = matches.filter(match => 
    match.profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (match.conversation.length > 0 && 
     match.conversation[match.conversation.length - 1].content
       .toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Sort matches by most recent activity
  const sortedMatches = filteredMatches.sort((a, b) => {
    const aLastMessage = a.conversation.length > 0 
      ? a.conversation[a.conversation.length - 1].timestamp
      : a.matchedAt;
    const bLastMessage = b.conversation.length > 0
      ? b.conversation[b.conversation.length - 1].timestamp
      : b.matchedAt;
    
    return bLastMessage.getTime() - aLastMessage.getTime();
  });

  const handleConversationClick = (matchId: string) => {
    navigate(`/chat/${matchId}`);
  };

  const handleStartSwiping = () => {
    navigate('/home');
  };

  if (matches.length === 0) {
    return (
      <MessagesContainer>
        <Header>
          <Title>Messages</Title>
        </Header>
        
        <EmptyState
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <EmptyStateIcon>💬</EmptyStateIcon>
          <EmptyStateText>No matches yet</EmptyStateText>
          <EmptyStateSubtext>
            Start swiping to find your perfect drag match and begin conversations!
          </EmptyStateSubtext>
          <Button onClick={handleStartSwiping}>
            Start Swiping
          </Button>
        </EmptyState>
      </MessagesContainer>
    );
  }

  return (
    <MessagesContainer>
      <Header>
        <Title>Messages</Title>
      </Header>
      
      <SearchContainer>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      
      <ConversationsList>
        {sortedMatches.map((match, index) => {
          const vibeTheme = useVibeTheme(match.profile.vibe);
          const lastMessage = match.conversation.length > 0 
            ? match.conversation[match.conversation.length - 1]
            : null;
          const unreadCount = match.conversation.filter(msg => 
            msg.senderId !== 'themistressd' && 
            new Date().getTime() - msg.timestamp.getTime() < 3600000 // Last hour
          ).length;
          
          return (
            <ConversationCard
              key={match.id}
              onClick={() => handleConversationClick(match.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ConversationHeader>
                <Avatar 
                  $image={match.profile.images[0]} 
                  $vibeColor={vibeTheme.colors.primary}
                >
                  <OnlineIndicator />
                </Avatar>
                
                <ConversationInfo>
                  <NameTime>
                    <Name>{match.profile.name}</Name>
                    <Timestamp>
                      {lastMessage 
                        ? formatTime(lastMessage.timestamp)
                        : formatTime(match.matchedAt)
                      }
                    </Timestamp>
                  </NameTime>
                  
                  <LastMessage>
                    <MessagePreview>
                      {lastMessage 
                        ? lastMessage.content
                        : "You matched! Start the conversation..."
                      }
                    </MessagePreview>
                    
                    {unreadCount > 0 && (
                      <UnreadBadge>{unreadCount}</UnreadBadge>
                    )}
                  </LastMessage>
                </ConversationInfo>
              </ConversationHeader>
              
              <VibeIndicator 
                $vibeColor={vibeTheme.colors.primary}
                $vibeEmoji={vibeTheme.emoji}
              >
                {vibeTheme.name}
              </VibeIndicator>
            </ConversationCard>
          );
        })}
      </ConversationsList>
      
      {filteredMatches.length === 0 && searchQuery && (
        <EmptyState
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <EmptyStateIcon>🔍</EmptyStateIcon>
          <EmptyStateText>No matches found</EmptyStateText>
          <EmptyStateSubtext>
            Try adjusting your search terms or clear the search to see all conversations.
          </EmptyStateSubtext>
        </EmptyState>
      )}
    </MessagesContainer>
  );
};