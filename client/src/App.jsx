import { useContext } from 'react'
import { Context } from '@/context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/components/Dashboard/Dashboard'
import Stats from '@/components/Transaction/Stats'
import Auth from '@/components/Auth/Login';
import GroupsList from './components/Group/GroupsList';
import GroupDetail from './components/Group/GroupDetail';
import GroupStats from './components/Group/GroupStats';
import TransactionDetail from './components/Transaction/TransactionDetail'
import Loader from './components/ui/Loader';

function App() {
  const { user, loading } = useContext(Context);

  if(loading){
    return <Loader />;
  }

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
      <Route 
        path="/groups" 
        element={user ? <GroupsList /> : <Navigate to="/Auth" />}
      />
      <Route 
        path="/groups/:id" 
        element={user ? <GroupDetail /> : <Navigate to="/Auth" />}
      />
      <Route 
        path="/groups/:id/stats" 
        element={user ? <GroupStats /> : <Navigate to="/Auth" />} 
      />

      <Route 
        path="/transaction/:id" 
        element={user ? <TransactionDetail /> : <Navigate to="/Auth" />} 
      />
    </Routes>
  )
}

export default App
