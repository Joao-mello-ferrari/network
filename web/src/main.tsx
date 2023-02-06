import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './contexts/authContext'
import { RouterProviderComponent } from './routes'
import { ToastContainer } from 'react-toastify';

import './index.module.scss';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ToastContainer 
        theme="dark" 
        autoClose={3000}
        toastStyle={{
          background: "var(--theme-secondary)", 
          color: "var(--text)"
        }}
      />
      <RouterProviderComponent />
    </AuthContextProvider>
  </React.StrictMode>,
)
