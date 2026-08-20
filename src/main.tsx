import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  </StrictMode>,
)
