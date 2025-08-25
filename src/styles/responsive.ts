import { css } from 'styled-components';

// Media query helpers
export const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1024px',
};

export const media = {
  mobile: (styles: ReturnType<typeof css>) => css`
    @media (max-width: ${breakpoints.mobile}) {
      ${styles}
    }
  `,
  tablet: (styles: ReturnType<typeof css>) => css`
    @media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet}) {
      ${styles}
    }
  `,
  desktop: (styles: ReturnType<typeof css>) => css`
    @media (min-width: ${breakpoints.desktop}) {
      ${styles}
    }
  `,
  aboveTablet: (styles: ReturnType<typeof css>) => css`
    @media (min-width: ${breakpoints.mobile}) {
      ${styles}
    }
  `,
};

// Responsive spacing utilities
export const responsiveSpacing = {
  container: css`
    padding: 16px;
    
    ${media.tablet(css`
      padding: 24px;
    `)}
    
    ${media.desktop(css`
      padding: 32px;
      max-width: 1200px;
      margin: 0 auto;
    `)}
  `,
  
  section: css`
    margin-bottom: 24px;
    
    ${media.desktop(css`
      margin-bottom: 32px;
    `)}
  `,
};

// Responsive layout utilities
export const responsiveLayout = {
  centerContent: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `,
  
  flexGrid: css`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    
    ${media.desktop(css`
      gap: 24px;
    `)}
  `,
};