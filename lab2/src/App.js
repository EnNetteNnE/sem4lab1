import React, { useState } from 'react';
import Login from './Login';
import CiphersList from './List';
import CipherDetail from './Detail';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedName, setSelectedName] = useState(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSelectCipher = (name) => {
    setSelectedName(name);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedName(null);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} setIsAuthenticated={setIsAuthenticated} />
      ) : selectedName === null ? (
        <CiphersList onSelect={handleSelectCipher} onLogout={handleLogout} />
      ) : (
        <CipherDetail name={selectedName} onBack={() => setSelectedName(null)} />
      )}
    </div>
  );
};

export default App;
