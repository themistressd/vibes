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
    /* Fixed mobile font size - no responsive scaling */
    font-size: 16px;
  }
  
  body {
    font-family: ${props => props.theme.common.typography.fontFamily.primary};
    background: #1a1a1a; /* Dark background for desktop frame demo */
    color: ${props => props.theme.current.colors.text};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
  }
  
  /* Use app background on mobile */
  @media (max-width: 430px) {
    body {
      background: ${props => props.theme.current.colors.background};
    }
  }
  
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    /* Remove default centering for mobile frame */
    width: 100%;
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
    /* Ensure minimum 44px touch target size */
    min-height: 44px;
    min-width: 44px;
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
  
  /* Responsive layout utilities */
  .container {
    width: 100%;
    margin: 0 auto;
    padding: 0 16px;
    box-sizing: border-box;
  }
  
  /* Only constrain width on desktop */
  @media (min-width: 1024px) {
    .container {
      max-width: 375px;
    }
  }
  
  /* Responsive grid */
  .responsive-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  /* More columns on larger screens */
  @media (max-width: 768px) {
    .responsive-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .responsive-grid {
      grid-template-columns: repeat(2, 1fr); /* Back to 2 columns in desktop frame */
    }
  }
`;