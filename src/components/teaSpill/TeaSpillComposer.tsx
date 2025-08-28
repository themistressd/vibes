import React, { useState } from 'react';
import styled from 'styled-components';

const ComposerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.common.spacing.sm};
`;

const TextArea = styled.textarea`
  width: 100%;
  resize: vertical;
  padding: ${props => props.theme.common.spacing.sm};
  border-radius: ${props => props.theme.common.borderRadius.small};
  border: 1px solid ${props => props.theme.current.colors.primary};
  font-family: inherit;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface TeaSpillComposerProps {
  onPost: (content: string, author: string) => void;
}

export const TeaSpillComposer: React.FC<TeaSpillComposerProps> = ({ onPost }) => {
  const [content, setContent] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onPost(content, anonymous ? 'Anon' : 'You');
    setContent('');
    setAnonymous(false);
  };

  return (
    <ComposerForm onSubmit={handleSubmit}>
      <TextArea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="What's the tea?"
      />
      <Controls>
        <label>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={e => setAnonymous(e.target.checked)}
          />
          Post anonymously
        </label>
        <button type="submit">Spill</button>
      </Controls>
    </ComposerForm>
  );
};

