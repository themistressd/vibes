import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    height: 100%;
    overflow-x: hidden;
  }
  
  body {
    font-family: ${props => props.theme.common.typography.fontFamily.primary};
    background: ${props => props.theme.current.colors.background};
    color: ${props => props.theme.current.colors.text};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  * {
    scrollbar-width: thin;
    scrollbar-color: ${props => props.theme.current.colors.primary}60 transparent;
  }
  
  *::-webkit-scrollbar {
    width: 6px;
  }
  
  *::-webkit-scrollbar-track {
    background: transparent;
  }
  
  *::-webkit-scrollbar-thumb {
    background: ${props => props.theme.current.colors.primary}60;
    border-radius: 3px;
  }
  
  *::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.current.colors.primary}80;
  }
  
  button {
    font-family: inherit;
  }
  
  input, textarea {
    font-family: inherit;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  /* Make sure touch interactions feel responsive */
  button, [role="button"], input[type="submit"], input[type="button"] {
    touch-action: manipulation;
  }
  
  /* Improve focus visibility */
  *:focus-visible {
    outline: 2px solid ${props => props.theme.current.colors.primary};
    outline-offset: 2px;
  }
  
  /* Hide default focus outline for mouse users */
  *:focus:not(:focus-visible) {
    outline: none;
  }
  
  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
  
  /* Responsive text scaling */
  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }
  
  @media (min-width: 769px) {
    html {
      font-size: 16px;
    }
  }
`;