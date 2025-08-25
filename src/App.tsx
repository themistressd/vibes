import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './styles/themes/ThemeProvider';
import { NavigationLayout } from './components/navigation/NavigationLayout';
import { MobileFrame } from './components/layout/MobileFrame';
import { AppRouter } from './router';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <GlobalStyle />
        <MobileFrame>
          <NavigationLayout>
            <AppRouter />
          </NavigationLayout>
        </MobileFrame>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
