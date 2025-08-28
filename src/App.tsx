import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './styles/themes/ThemeProvider';
import { NavigationLayout } from './components/navigation/NavigationLayout';
import { MobileFrame } from './components/layout/MobileFrame';
import { AppContainer } from './components/layout/AppContainer';
import { AppRouter } from './router';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <GlobalStyle />
        <AppContainer>
          <MobileFrame>
            <NavigationLayout>
              <AppRouter />
            </NavigationLayout>
          </MobileFrame>
        </AppContainer>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
