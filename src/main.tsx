import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { LanguageProvider } from './context/LanguageContext.tsx'
import { BackgroundEffect } from './components/BackgroundEffect.tsx'
import { LoadingScreen } from './components/LoadingScreen.tsx'
import { AnimatePresence } from 'framer-motion'

import { ThemeProvider } from './context/ThemeContext.tsx'

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <LanguageProvider>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
              ) : (
                <div key="content">
                  <BackgroundEffect />
                  <App />
                </div>
              )}
            </AnimatePresence>
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />)
