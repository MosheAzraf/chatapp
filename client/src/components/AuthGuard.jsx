import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const AuthGuard = () => {
  const navigate = useNavigate();
  const {verifyAuth} = useAuth();   
  
  useEffect(() => {
    const checkAuth = async () => {
      // returns true if user is authenticated, false if not.
      const isAuthenticated = await verifyAuth();
      if (!isAuthenticated) {
        navigate('/login');
      }
    };

    checkAuth();
  }, []);
  

  return <Outlet/>

}

export default AuthGuard