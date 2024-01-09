import { useMutation } from '@tanstack/react-query';
import axiosClient from '../configs/axios';

import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

import { useDispatch } from 'react-redux';
import { setLoggedIn, setLoggedOut, setLoading } from '../redux/features/authSlice';
import {setUser, clearUser} from '../redux/features/userSlice';


const loginUser = async (credentials) => {
    const response = await axiosClient.post('/auth/login',credentials);
    return response.data;
};

const logoutUser = async () => {
    const response = await axiosClient.post('/auth/logout');
    return response.data;
}

const verifyAuth = async () => {
  const response = await axiosClient.get('/users/getMe');
  return response.data
};


const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const loginMutation = useMutation({
      mutationFn: loginUser,
      onSuccess: () => {
        dispatch(setLoggedIn());
        toast.success('Successfully logged in.');
        navigate('/chat');
      },
      onError: () => {
        navigate('/login');
        toast.error("Couldn't login properly, please try again.");
      }
    });
    
  
    const logOutMutation = useMutation({
      mutationFn: logoutUser,
      onSuccess: () => {
        dispatch(setLoggedOut());
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
        dispatch(setUser({
          fullName: `${data.firstName} ${data.lastName}`,
          userName: data.userName
        }))
      },
      onError: () => {
        dispatch(setLoggedOut());
        dispatch(clearUser());
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

