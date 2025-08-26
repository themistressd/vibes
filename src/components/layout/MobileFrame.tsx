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
  background: #1a1a1a; /* Dark background for desktop frame demo */
  padding: 20px;
  
  /* Remove frame padding on mobile - full screen */
  @media (max-width: 430px) {
    padding: 0;
    background: transparent;
  }
`;

const PhoneFrame = styled.div`
  /* iPhone-like dimensions on desktop */
  width: 375px;
  height: 812px;
  max-width: 100vw;
  max-height: 100vh;
  
  /* Mobile device styling for desktop frame */
  background: #000;
  border-radius: 35px;
  padding: 8px;
  box-shadow: 
    0 0 0 2px #333,
    0 0 0 4px #666,
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 40px 100px rgba(0, 0, 0, 0.2);
  
  /* Full screen on mobile - remove frame styling */
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
  
  /* Ensure content fits within frame */
  display: flex;
  flex-direction: column;
  
  /* Remove border radius on mobile for full screen */
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
  
  /* Hide notch on mobile devices */
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