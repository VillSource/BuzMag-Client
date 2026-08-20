import "./App.css";
import React from 'react';
import { RouterProvider } from '@tanstack/react-router'
import router from '@/routes/router'

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
}

export default App;
