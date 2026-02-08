import { useContext } from 'react'
import { Context } from '@/context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/components/Dashboard/Dashboard'
import Auth from '@/components/Auth/Login';

function App() {
  const { user } = useContext(Context);

  return (
    <Routes>
      <Route 
        path="/Auth" 
        element={user ? <Navigate to="/" /> : <Auth />}
      />
      <Route 
        path="/" 
        element={user ? <Dashboard /> : <Navigate to="/Auth" />}
      />
      <Route 
        path="/Dashboard" 
        element={user ? <Dashboard /> : <Navigate to="/Auth" />}
      />
    </Routes>
  )
}

export default App
