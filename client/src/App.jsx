import { useContext } from 'react'
import { Context } from '@/context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import WishList from '@/components/Dashboard/WishList'
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
        element={user ? <WishList /> : <Navigate to="/Auth" />}
      />
      <Route 
        path="/WishList" 
        element={user ? <WishList /> : <Navigate to="/Auth" />}
      />
    </Routes>
  )
}

export default App
