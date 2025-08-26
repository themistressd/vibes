import { css } from 'styled-components';

// Responsive breakpoints for mobile-first design
export const breakpoints = {
  mobile: '430px',      // Mobile phones in portrait
  mobileLg: '576px',    // Large mobile phones
  tablet: '768px',      // Tablets
  desktop: '1024px',    // Desktop screens
};

// Mobile-first responsive media queries
export const media = {
  mobile: (styles: ReturnType<typeof css>) => css`
    @media (max-width: ${breakpoints.mobile}) {
      ${styles}
    }
  `,
  mobileLg: (styles: ReturnType<typeof css>) => css`
    @media (max-width: ${breakpoints.mobileLg}) {
      ${styles}
    }
  `,
  tablet: (styles: ReturnType<typeof css>) => css`
    @media (max-width: ${breakpoints.tablet}) {
      ${styles}
    }
  `,
  desktop: (styles: ReturnType<typeof css>) => css`
    @media (min-width: ${breakpoints.desktop}) {
      ${styles}
    }
  `,
};

// Responsive spacing and layout utilities
export const responsiveSpacing = {
  container: css`
    padding: 16px;
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    
    ${media.desktop(css`
      max-width: 375px; /* Only constrain on desktop */
    `)}
  `,
  
  section: css`
    margin-bottom: 20px;
  `,
};

// Responsive layout utilities
export const responsiveLayout = {
  centerContent: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    
    ${media.desktop(css`
      max-width: 375px; /* Only constrain on desktop */
    `)}
  `,
  
  flexGrid: css`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    margin: 0 auto;
    
    ${media.desktop(css`
      max-width: 375px; /* Only constrain on desktop */
    `)}
  `,
};