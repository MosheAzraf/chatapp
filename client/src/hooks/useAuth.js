import { useMutation } from '@tanstack/react-query';
import axiosClient from '../configs/axios';

import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

import { useDispatch } from 'react-redux';
import { setLoggedIn, setLoggedOut, setLoading } from '../redux/features/authSlice';

const loginUser = async (credentials) => {
    const response = await axiosClient.post('/auth/login',credentials);
    return response.data;
};

const logOut = async () => {
    const response = await axiosClient.post('/auth/logout');
    return response.data;
}

const verifyAuth = async () => {
  const response = await axiosClient.get('/user/getMe');
  return response.data
};


const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const loginMutation = useMutation({
      mutationFn: loginUser,
      onSuccess: () => {
        dispatch(setLoggedIn());
        // sessionStorage.setItem('isLoggedIn', 'true');
        toast.success('Successfully logged in.');
        navigate('/chat');
      },
      onError: () => {
        navigate('/login');
        toast.error("Couldn't login properly, please try again.");
      }
    });
    
  
    const logOutMutation = useMutation({
      mutationFn: logOut,
      onSuccess: () => {
        dispatch(setLoggedOut());
        // sessionStorage.removeItem('isLoggedIn');
        toast.info('Logged out.');
        navigate('/login');
      },
      onError: (error) => {
        console.error(error);
      }
    });

    const verifyAuthMutation = useMutation({
      mutationFn: verifyAuth,
      onMutate: () => {
        dispatch(setLoading(true));
      },
      onSuccess: (data) => {
        dispatch(setLoggedIn(data));
      },
      onError: () => {
        dispatch(setLoggedOut());
      },
      onSettled: () => {
        dispatch(setLoading(false));
      }
    });
    
    

    return {
      login: loginMutation.mutateAsync,
      logOut: logOutMutation.mutateAsync,
      verifyAuth: verifyAuthMutation.mutateAsync,
    };
  };
  
  export default useAuth;

