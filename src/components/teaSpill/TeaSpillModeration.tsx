import React from 'react';
import styled from 'styled-components';

const ModerationBar = styled.div`
  display: flex;
  gap: ${props => props.theme.common.spacing.sm};
  align-items: center;
`;

const FilterInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.common.spacing.xs};
  border-radius: ${props => props.theme.common.borderRadius.small};
  border: 1px solid ${props => props.theme.current.colors.primary};
`;

interface TeaSpillModerationProps {
  filterText: string;
  onFilterChange: (value: string) => void;
  onReport?: () => void;
}

export const TeaSpillModeration: React.FC<TeaSpillModerationProps> = ({
  filterText,
  onFilterChange,
  onReport,
}) => (
  <ModerationBar>
    <FilterInput
      placeholder="Filter posts"
      value={filterText}
      onChange={e => onFilterChange(e.target.value)}
    />
    <button type="button" onClick={onReport}>
      Report
    </button>
  </ModerationBar>
);

