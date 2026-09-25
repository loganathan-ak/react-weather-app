import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import Footer from './Footer.jsx';
import Header from './Header.jsx';

export default function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
