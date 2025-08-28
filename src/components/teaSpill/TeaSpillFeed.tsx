import React, { useState } from 'react';
import styled from 'styled-components';
import {
  mockTeaPosts,
  TeaSpillPost as TeaSpillPostType,
} from '../../data/socialData';
import { TeaSpillPost } from './TeaSpillPost';
import { TeaSpillComposer } from './TeaSpillComposer';
import { TeaSpillModeration } from './TeaSpillModeration';

const FeedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.common.spacing.md};
`;

export const TeaSpillFeed: React.FC = () => {
  const [posts, setPosts] = useState<TeaSpillPostType[]>(mockTeaPosts);
  const [filter, setFilter] = useState('');

  const handlePost = (content: string, author: string) => {
    const newPost: TeaSpillPostType = {
      id: `tea_${Date.now()}`,
      author,
      vibe: 'chill',
      content,
      timestamp: new Date(),
      likes: 0,
      comments: [],
      isHot: false,
    };
    setPosts([newPost, ...posts]);
  };

  const filtered = posts.filter(p =>
    p.content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <FeedContainer>
      <TeaSpillComposer onPost={handlePost} />
      <TeaSpillModeration
        filterText={filter}
        onFilterChange={setFilter}
        onReport={() => alert('Reported')}
      />
      {filtered.map(post => (
        <TeaSpillPost key={post.id} post={post} />
      ))}
    </FeedContainer>
  );
};

