import React from 'react';
import Layout from './components/Layout';
import Terminal from './components/Terminal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AudioControls } from './components/AudioControls';
import { ThemeEffects } from './components/ThemeEffects';

function AppContent() {
  const { theme } = useTheme();

  return (
    <div className={`${theme.colors.bg} ${theme.colors.text} ${theme.font} min-h-screen transition-colors duration-500`}>
      <ThemeEffects />
      <AudioControls />
      <Layout>
        <ErrorBoundary>
          <Terminal />
        </ErrorBoundary>
      </Layout>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
