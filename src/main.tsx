import './index.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { tanstackQueryClient } from './business/shared/configs/tanstackQueryConfig/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        
    <App />
    
  </StrictMode>,
);
