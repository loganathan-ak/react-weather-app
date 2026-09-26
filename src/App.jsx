// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import GlobalWeatherStatus from './pages/GlobalWeatherStatus';
  

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent route renders MainLayout */}
        <Route path="/" element={<MainLayout />}>
          {/* Child routes render inside the <Outlet /> */}
          <Route index element={<Home />} />
          <Route path="/global-weather" element={<GlobalWeatherStatus />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}