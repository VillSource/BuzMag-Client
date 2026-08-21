import React from "react";
import { useAppShell } from "../../app-shell/AppShell";

const HomePage: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, menuOpen, setMenuOpen, setTopbar } = useAppShell();

  React.useEffect(() => {
    setTopbar?.(<div style={{ padding: 8 }}>Topbar actions (example)</div>);
    return () => setTopbar?.(undefined);
  }, [setTopbar]);

  return (
    <>
      <div>
        <p>Main content (empty)</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          Toggle sidebar
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          Toggle menu
        </button>
      </div>
      {Array.from({ length: 1000 }).map((_, index) => (
        <span key={index}>Item {index + 1}</span>
      ))}
    </>
  );
};

export default HomePage;
