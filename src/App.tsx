import "./App.css";
import React from 'react';
import AppShell from './app-shell/AppShell';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomePage from './features/home';

function App() {
  return (
    <AppShell header={<Header />} sidebar={<Sidebar />} footer={<Footer />}>
      <HomePage />
    </AppShell>
  );
}

export default App;
