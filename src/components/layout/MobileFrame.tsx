import React from 'react';
import styled from 'styled-components';

interface MobileFrameProps {
  children: React.ReactNode;
}

const FrameContainer = styled.div`
  /* Center frame on larger screens */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #1a1a1a; /* Dark background for demo */
  padding: 20px;
  
  @media (max-width: 430px) {
    padding: 0;
  }
`;

const PhoneFrame = styled.div`
  /* iPhone-like dimensions */
  width: 375px;
  height: 812px;
  max-width: 100vw;
  max-height: 100vh;
  
  /* Mobile device styling */
  background: #000;
  border-radius: 35px;
  padding: 8px;
  box-shadow: 
    0 0 0 2px #333,
    0 0 0 4px #666,
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 40px 100px rgba(0, 0, 0, 0.2);
  
  /* Remove frame styling on actual mobile devices */
  @media (max-width: 430px) {
    border-radius: 0;
    padding: 0;
    box-shadow: none;
    background: transparent;
    width: 100vw;
    height: 100vh;
  }
`;

const ScreenContent = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 27px;
  overflow: hidden;
  position: relative;
  
  /* Remove border radius on actual mobile devices */
  @media (max-width: 430px) {
    border-radius: 0;
  }
`;

const NotchContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  
  /* Hide notch on actual mobile devices */
  @media (max-width: 430px) {
    display: none;
  }
`;

const Notch = styled.div`
  width: 140px;
  height: 30px;
  background: #000;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-top: -2px;
`;

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <FrameContainer>
      <PhoneFrame>
        <ScreenContent>
          <NotchContainer>
            <Notch />
          </NotchContainer>
          {children}
        </ScreenContent>
      </PhoneFrame>
    </FrameContainer>
  );
};