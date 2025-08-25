import 'styled-components';
import type { AppTheme, VibeTheme } from './styles/themes/types';

declare module 'styled-components' {
  export interface DefaultTheme {
    current: VibeTheme;
    vibes: AppTheme['vibes'];
    common: AppTheme['common'];
  }
}