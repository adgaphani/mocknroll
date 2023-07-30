import React from 'react';
import Home from './pages/Home';
import './App.css';

function App() {
  const bgstyles = {
    textAlign: 'center',
    height: '100vh',
    backgroundImage: 'radial-gradient(circle at top left, rgb(254, 254, 246), rgb(116, 115, 108)), radial-gradient(circle at bottom right, #4B4B4Bff, #181818ff)',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  };
  
  return (
    <div className="App" styles={bgstyles}>
      <Home />
    </div>
  );
}

export default App;
