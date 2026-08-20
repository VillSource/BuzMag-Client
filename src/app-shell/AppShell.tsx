import { createContext, useContext, useState, type ReactNode, type FC } from 'react';

type AppShellContextType = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  topbar?: ReactNode;
  setTopbar?: (node?: ReactNode) => void;
};

const AppShellContext = createContext<AppShellContextType | undefined>(undefined);

export const useAppShell = () => {
  const ctx = useContext(AppShellContext);
  if (!ctx) throw new Error('useAppShell must be used within AppShell');
  return ctx;
};

type AppShellProps = {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
};

export const AppShell: FC<AppShellProps> = ({ header, sidebar, footer, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [topbar, setTopbar] = useState<ReactNode | undefined>(undefined);

  return (
    <AppShellContext.Provider value={{ sidebarOpen, setSidebarOpen, topbar, setTopbar }}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div>{header}</div>

        <div style={{ display: 'flex', flex: 1 }}>
          <aside style={{ width: sidebarOpen ? 220 : 64, borderRight: '1px solid #ddd' }}>{sidebar}</aside>

          <main style={{ flex: 1, padding: 16 }}>
            {/* optional per-page topbar injected via useAppShell().setTopbar */}
            {topbar && <div>{topbar}</div>}

            <div>{children}</div>
          </main>
        </div>

        <div>{footer}</div>
      </div>
    </AppShellContext.Provider>
  );
};

export default AppShell;
