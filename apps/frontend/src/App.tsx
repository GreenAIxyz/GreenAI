import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import MemeGenerator from './pages/MemeGenerator';
import EnvironmentalActions from './pages/EnvironmentalActions';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="meme-generator" element={<MemeGenerator />} />
        <Route path="environmental-actions" element={<EnvironmentalActions />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App; 