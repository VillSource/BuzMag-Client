import "./App.css";
import React from 'react';
import { RouterProvider } from '@tanstack/react-router'
import router from '@/router'
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <React.Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </React.Suspense>
    </TooltipProvider>
  );
}

export default App;
