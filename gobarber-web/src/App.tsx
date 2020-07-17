import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppProvider from './context';

import GlobalStyles from './styles/global';

import Routes from './routes';

const App: React.FC = () => (
  <>
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
      
    <GlobalStyles />
    </Router>
  </>
);

export default App;
