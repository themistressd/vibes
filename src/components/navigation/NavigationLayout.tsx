import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  User, 
  Users,
  Star,
  Flame
} from 'lucide-react';
import { useTheme } from '../../styles/themes/ThemeProvider';

interface NavigationLayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  height: 100vh; /* Fixed height for mobile frame */
  width: 100%;
  background: ${props => props.theme.current.colors.background};
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent scrolling outside mobile frame */
  position: relative; /* Added for absolute positioned bottom nav */
`;

const MainContent = styled.main`
  flex: 1;
  padding-bottom: 70px; /* Space for bottom nav */
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
`;

const BottomNavigation = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: ${props => props.theme.current.colors.surface};
  border-top: 1px solid ${props => props.theme.current.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: space-around;
  backdrop-filter: blur(10px);
  z-index: 100;
`;

const NavButton = styled(motion.button)<{ $isActive: boolean }>`
  background: transparent;
  border: none;
  padding: ${props => props.theme.common.spacing.sm};
  border-radius: ${props => props.theme.common.borderRadius.medium};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 50px;
  min-height: 44px; /* Ensure touch target size */
  
  color: ${props => 
    props.$isActive 
      ? props.theme.current.colors.primary 
      : props.theme.current.colors.textSecondary
  };
  
  ${props => props.$isActive && `
    background: ${props.theme.current.gradients.subtle};
  `}
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  span {
    font-size: ${props => props.theme.common.typography.fontSize.xs};
    font-weight: ${props => 
      props.$isActive 
        ? props.theme.common.typography.fontWeight.semibold 
        : props.theme.common.typography.fontWeight.normal
    };
  }
`;

const TopBar = styled.header`
  height: 50px; /* Further compressed to 50px for maximum content space - total 58% reduction */
  background: ${props => props.theme.current.colors.surface};
  border-bottom: 1px solid ${props => props.theme.current.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px ${props => props.theme.common.spacing.sm}; /* Minimal padding for maximum space efficiency */
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
`;

const Logo = styled.h1`
  font-family: ${props => props.theme.common.typography.fontFamily.heading};
  font-size: ${props => props.theme.common.typography.fontSize.md}; /* Further reduced for compact header */
  font-weight: ${props => props.theme.common.typography.fontWeight.bold};
  background: ${props => props.theme.current.gradients.main};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  flex: 1;
`;

const VibeIndicator = styled.div`
  font-size: ${props => props.theme.common.typography.fontSize.xs}; /* Further reduced for compact header */
  display: flex;
  align-items: center;
  gap: 2px; /* Minimal gap for compact design */
  background: ${props => props.theme.current.colors.surface};
  padding: 2px 6px; /* Minimal padding for compact design */
  border-radius: ${props => props.theme.common.borderRadius.full};
  border: 1px solid ${props => props.theme.current.colors.primary}30;
`;

const navigationItems = [
  { path: '/home', icon: Flame, label: 'Discover' },
  { path: '/tea-spill', icon: Star, label: 'Likes' },
  { path: '/messages', icon: MessageCircle, label: 'Messages' },
  { path: '/communities', icon: Users, label: 'Groups' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export const NavigationLayout: React.FC<NavigationLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getVibeTheme } = useTheme();
  const vibeTheme = getVibeTheme();
  
  // Don't show navigation on entry and splash screens
  if (location.pathname === '/entry' || location.pathname === '/splash') {
    return <>{children}</>;
  }
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  return (
    <LayoutContainer>
      <TopBar>
        <Logo>VIBES</Logo>
        <VibeIndicator>
          <span>{vibeTheme.emoji}</span>
          <span style={{ 
            color: vibeTheme.colors.primary,
            fontWeight: 600,
            fontSize: '0.9rem'
          }}>
            {vibeTheme.name}
          </span>
        </VibeIndicator>
      </TopBar>
      
      <MainContent>
        {children}
      </MainContent>
      
      <BottomNavigation>
        {navigationItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path || 
            (path === '/home' && location.pathname === '/') ||
            (path !== '/home' && location.pathname.startsWith(path));
          
          return (
            <NavButton
              key={path}
              $isActive={isActive}
              onClick={() => handleNavigation(path)}
              whileTap={{ scale: 0.9 }}
            >
              <Icon />
              <span>{label}</span>
            </NavButton>
          );
        })}
      </BottomNavigation>
    </LayoutContainer>
  );
};