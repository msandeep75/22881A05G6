import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Header from './components/Header';
import ShortenerPage from './pages/ShortenerPage';
import StatisticsPage from './pages/StatisticsPage';
import RedirectPage from './pages/RedirectPage';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Header />
      <Box component="main">
        <Routes>
          <Route path="/" element={<ShortenerPage />} />
          <Route path="/stats" element={<StatisticsPage />} />
          <Route path="/:shortcode" element={<RedirectPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;