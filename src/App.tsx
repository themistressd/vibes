import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './styles/themes/ThemeProvider';
import { NavigationLayout } from './components/navigation/NavigationLayout';
import { AppRouter } from './router';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <GlobalStyle />
        <NavigationLayout>
          <AppRouter />
        </NavigationLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
