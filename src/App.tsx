import { tanstackQueryClient } from '@business/shared/configs/tanstackQueryConfig';
import { routeConfig } from '@presentation/shared/configs/rootConfig';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <QueryClientProvider client={tanstackQueryClient}>
      <Router>
        <Routes>
          {Object.entries(routeConfig).map(([key, route]) => (
            <Route key={key} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
