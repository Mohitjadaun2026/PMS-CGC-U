import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import { ExperienceProvider } from './context'; 

// 1. IMPORT AOS STYLES GLOBALLY HERE
import 'aos/dist/aos.css'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExperienceProvider> {/* ✅ Wrap App with context provider */}
      <App />
    </ExperienceProvider>
  </StrictMode>,
);
