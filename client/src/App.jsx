import { useContext } from 'react'
import { Context } from '@/context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/components/Dashboard/Dashboard'
import Stats from '@/components/Transaction/Stats'
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
        path="/dashboard" 
        element={user ? <Dashboard /> : <Navigate to="/Auth" />}
      />
      <Route 
        path="/stats" 
        element={user ? <Stats /> : <Navigate to="/Auth" />}
      />
    </Routes>
  )
}

export default App
