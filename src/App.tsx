import { tanstackQueryClient } from '@business/shared/configs/tanstackQueryConfig';
import { routeConfig } from '@presentation/shared/configs/rootConfig';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes, useRoutes } from 'react-router-dom';

function AppRoutes() {
  return useRoutes(routeConfig); 
}

function App() {
  return (
    <QueryClientProvider client={tanstackQueryClient}>
      <Router>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
