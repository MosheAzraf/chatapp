import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthGuard = ({isAuth}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!isAuth){
      navigate('/login');
    }
  },[isAuth])

  return <Outlet/>

}

export default AuthGuard