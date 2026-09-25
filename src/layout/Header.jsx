import React, { useState } from 'react';

function Header({ onSearch, onUnitToggle, currentUnit = 'C' }) {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand / Logo */}
        <div className="brand">
          <span>🌤️</span>
          <span>Atmosphere</span>
        </div>
      </div>
    </header>
  );
}

export default Header;