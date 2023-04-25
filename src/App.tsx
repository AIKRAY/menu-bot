import './App.css';

import { fetchQuery } from 'core/fetchQuery';
import { useEffect } from 'react';

import { InitialDataProvider } from './providers/initial-data-provider';
import { Router } from './routes/Router';

export const App = () => {
  useEffect(() => {
    const getAppStatus = async () => {
      const response = await fetchQuery<{ status: string }>({
        path: `/app/health-check`,
      });

      console.log(response.status);
    };

    getAppStatus();
  }, []);

  return (
    <div className="App">
      <InitialDataProvider>
        <Router />
      </InitialDataProvider>
    </div>
  );
}
