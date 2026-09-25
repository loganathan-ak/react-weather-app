// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
  

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent route renders MainLayout */}
        <Route path="/" element={<MainLayout />}>
          {/* Child routes render inside the <Outlet /> */}
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}