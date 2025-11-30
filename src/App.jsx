import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import TechnologyPage from './pages/TechnologyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          {/* Generic Route for all technologies */}
          <Route path=":category/:technologyId" element={<TechnologyPage />} />
          
          {/* Redirects for legacy routes */}
          <Route path="kafka" element={<Navigate to="/data-engineering/kafka" replace />} />
          <Route path="spark" element={<Navigate to="/data-engineering/spark" replace />} />
          <Route path="sql" element={<Navigate to="/databases/sql" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
