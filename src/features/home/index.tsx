import React from 'react';
import { useAppShell } from '../../app-shell/AppShell';

const HomePage: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, setTopbar } = useAppShell();

  React.useEffect(() => {
    setTopbar?.(<div style={{ padding: 8 }}>Topbar actions (example)</div>);
    return () => setTopbar?.(undefined);
  }, [setTopbar]);

  return (
    <div>
      <p>Main content (empty)</p>
      <button onClick={() => setSidebarOpen(!sidebarOpen)}>Toggle sidebar</button>
    </div>
  );
};

export default HomePage;
