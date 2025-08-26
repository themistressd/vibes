import React from 'react';
import styled from 'styled-components';

interface MobileFrameProps {
  children: React.ReactNode;
}

// Completely frameless container - no phone mockup styling
const FullScreenContainer = styled.div`
  /* Full viewport dimensions - edge to edge */
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  
  /* Ensure content fits full screen */
  display: flex;
  flex-direction: column;
  
  /* Remove any background or padding */
  background: transparent;
  margin: 0;
  padding: 0;
`;

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  // Simply pass through children without any frame styling
  return (
    <FullScreenContainer>
      {children}
    </FullScreenContainer>
  );
};