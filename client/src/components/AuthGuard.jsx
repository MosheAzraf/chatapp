import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthGuard = ({isAuth}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!isAuth){
      navigate('/login');
    }
    navigate('/chat');
  },[isAuth])

  return <Outlet/>

}

export default AuthGuard