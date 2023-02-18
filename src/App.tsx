import './App.css';

import axios from 'axios';
import { API_URL } from 'core/constants';
import { useEffect, useState } from 'react';

import logo from './logo.svg';

export const App = () => {
  const [appStatus, setAppStatus] = useState('');

  useEffect(() => {
    const getAppStatus = async () => {
      const response = await axios.get<string>(`${API_URL}/app/health-check`);

      console.log(response);
      setAppStatus(response.data);
    };

    getAppStatus();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>App Status: {appStatus}</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};
