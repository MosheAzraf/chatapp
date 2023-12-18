import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthGuard = () => {
  const navigate = useNavigate();
  
  
  

  return <Outlet/>

}

export default AuthGuard