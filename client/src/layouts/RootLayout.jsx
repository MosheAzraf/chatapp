import  { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import PublicNavbar from '../components/PublicNavbar';

import useAuth from '../hooks/useAuth';

const RootLayout = () => {
  const [isAuth, setIsAuth] = useState(null);
  const {verifyAuth} = useAuth()

  useEffect(() => {
    const checkAuth = async () => {
      //returns true if use is authenticated, false if not.
      const isAuthenticated = await verifyAuth();
      if(!isAuthenticated) {
        setIsAuth(false)
      }
      setIsAuth(isAuthenticated)
    };

    checkAuth();
  },[]);


  return (
    <div className="flex flex-col h-screen">
      {/* navbar */}
      {
        isAuth ? <div>Authenticated</div> : <PublicNavbar/> 
      }

      {/* Content */}
      <div className="flex-grow p-4 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout

