import './App.css';

import { InitialDataProvider } from './providers/initial-data-provider';
import { Router } from './routes/Router';

export const App = () => (
  <div className="App">
    <InitialDataProvider>
      <Router />
    </InitialDataProvider>
  </div>
);
