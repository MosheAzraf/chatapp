import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthGuard = () => {
  const { isLoggedIn, loading } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/login');
    }
  }, [loading, isLoggedIn, navigate]);

  if (loading) {
    return <div>Loading...</div>; 
  }
  
  return <Outlet />;
};



export default AuthGuard;
