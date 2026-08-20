import React from 'react';
import { Link } from '@tanstack/react-router'

const Sidebar: React.FC = () => {
  return (
    <nav style={{ padding: 12, backgroundColor: '#cfe8ff', height: '100%' }}>
      <div style={{ marginBottom: 8 }}>
        <Link to="/">Home</Link>
      </div>
      <div>
        <div>Ping examples:</div>
        <ul style={{ margin: 0, paddingLeft: 16 }}>
          <li><Link to="/ping/Alice">Ping Alice</Link></li>
          <li><Link to="/ping/Bob">Ping Bob</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
