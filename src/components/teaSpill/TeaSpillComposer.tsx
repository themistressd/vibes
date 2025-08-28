import React, { useState } from 'react';
import styled from 'styled-components';
import { offensiveWords } from '../../data/offensiveWords';

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
  /**
   * Handler invoked when a new post is submitted.
   *
   * @param content - Text body of the post.
   * @param author - Display name for the post. Use "Anon" to hide identity.
   */
  onPost: (content: string, author: string) => void;
}

export const TeaSpillComposer: React.FC<TeaSpillComposerProps> = ({ onPost }) => {
  const [content, setContent] = useState('');
  const [anonymous, setAnonymous] = useState(false); // When true, author is reported as "Anon"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    const lower = content.toLowerCase();
    const hasOffensive = offensiveWords.some(word =>
      lower.includes(word.toLowerCase())
    );
    if (hasOffensive) {
      alert('Please remove offensive language before posting.');
      return;
    }
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

