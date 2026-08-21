import React from "react";
import { useAppShell } from "../../app-shell/AppShell";

const HomePage: React.FC = () => {
  const { setTopbar } = useAppShell();

  React.useEffect(() => {
    setTopbar?.(<div style={{ padding: 8 }}>Topbar actions (example)</div>);
    return () => setTopbar?.(undefined);
  }, [setTopbar]);

  return (
    <>
      <div>
        <p>Main content (empty)</p>
      </div>
      {Array.from({ length: 1000 }).map((_, index) => (
        <span key={index}>Item {index + 1}</span>
      ))}
    </>
  );
};

export default HomePage;
