import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const AuthGuard = ({  }) => {
  const navigate = useNavigate();

   <Outlet /> 
};

export default AuthGuard;
