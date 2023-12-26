import { useEffect, useState } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axiosClient from '../configs/axios';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const loginUser = async (credentials) => {
    const response = await axiosClient.post('/auth/login',credentials);
    return response.data;
};



const logOut = async () => {
    const response = await axiosClient.post('/auth/logout');
    return response.data;
}




const useAuth = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
  
    const loginMutation = useMutation({
      mutationFn: loginUser,
      onSuccess: () => {
        queryClient.invalidateQueries(['verifyAuth']);
        toast.success('Successfully logged in.');
        navigate('/chat');
      },
      onError: () => {
        navigate('/login');
        toast.warn("Couldn't login properly, please try again.");
      }
    });
  
    const logOutMutation = useMutation({
      mutationFn: logOut,
      onSuccess: () => {
        queryClient.invalidateQueries(['verifyAuth']);
        toast.info('Logged out.');
        navigate('/login');
      },
      onError: (error) => {
        console.error(error);
        toast.error("Logout failed.");
      }
    });
  
    return {
      login: loginMutation.mutateAsync,
      logOut: logOutMutation.mutate,
    };
  };
  
  export default useAuth;





    // const loginMutation = useMutation({
    //     mutationFn: loginUser,
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(['verifyAuth']);
    //         toast.success('Successfully logged in.');
    //         navigate('/chat'); 
    //     },
    //     onError: () => {
    //         navigate('/login');
    //         toast.warn("Couldn't login properly, please try again.");
    //     }
    // });