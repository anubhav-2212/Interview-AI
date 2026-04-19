import React from 'react'
import './style.scss'
import { RouterProvider } from 'react-router'
import router from './app.routes'
import { AuthProvider } from './features/auth/auth.context.jsx'

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App