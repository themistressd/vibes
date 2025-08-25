import { css } from 'styled-components';

// Fixed mobile dimensions - no responsive behavior
export const MOBILE_WIDTH = 375;
export const MOBILE_HEIGHT = 812;

// Media query helpers - simplified to mobile-only
export const breakpoints = {
  mobile: '430px', // Only used to hide mobile frame on actual devices
};

// Remove all responsive media queries - mobile-first only
export const media = {
  // Only keep this for hiding mobile frame on actual mobile devices
  actualMobile: (styles: ReturnType<typeof css>) => css`
    @media (max-width: ${breakpoints.mobile}) {
      ${styles}
    }
  `,
};

// Fixed mobile spacing - no responsive variations
export const responsiveSpacing = {
  container: css`
    padding: 16px;
    max-width: ${MOBILE_WIDTH}px;
    margin: 0 auto;
  `,
  
  section: css`
    margin-bottom: 20px;
  `,
};

// Fixed mobile layout utilities
export const responsiveLayout = {
  centerContent: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: ${MOBILE_WIDTH}px;
    margin: 0 auto;
  `,
  
  flexGrid: css`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    max-width: ${MOBILE_WIDTH}px;
    margin: 0 auto;
  `,
};