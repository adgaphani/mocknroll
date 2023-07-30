import React from 'react';
import CreateApi from '../components/CreateApi';

const Home = () => {
  const bgstyles = {
    textAlign: 'center',
    height: '100vh',
    backgroundImage: 'radial-gradient(circle at top left, rgb(254, 254, 246), rgb(116, 115, 108)), radial-gradient(circle at bottom right, #4B4B4Bff, #181818ff)',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  };
  return (
    <div styles={bgstyles}>
      <h1>Welcome to mocknroll</h1>
      <CreateApi />
    </div>
  );
};

export default Home;
