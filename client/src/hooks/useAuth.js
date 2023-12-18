import { useMutation, useQueryClient } from 'react-query';
import axiosClient from '../configs/axios';
import {useNavigate} from 'react-router-dom';


const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const loginMutation = useMutation(
    async (credentials) => {
      try {
        const resp = await axiosClient.post('/auth/login', credentials);
        return resp.data;
      } catch (error) {
        if(error?.response?.status === 400) {
          throw error?.response?.data?.message;
        }
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('authentication');
        navigate('/chat');
      },
    }
  );
  
  const registerMutation = useMutation(
    async ({firstName,lastName,userName,password}) => {
      const data = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        password: password
      }
      try {
        const resp = await axiosClient.post('/auth/register', data);
        return resp.data;
      } catch (error) {
        if(error?.response?.status === 400) {
          throw error?.response?.data?.message;
        }
        throw error;
      }
    },
    {
      onSuccess: () => {
        console.log('successfuly registered.')
        queryClient.invalidateQueries('authentication');
      },
    }
  );

  const logoutMutation = useMutation(
    async () => {
      await axiosClient.post('/auth/logout');
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('authentication');
      },
    }
  );
  
  const verifyAuth = async () => {
    try {
      const resp = await axiosClient.post('/auth/verifyauth')
      if(resp.status === 200) {
        console.log('authenticated.');
        return true;
      }
    } catch(error) {
      console.error(error);
      return false;
    }
  }

  return {
    register: registerMutation,
    login: loginMutation,
    logout: logoutMutation,
    verifyAuth
  }
}

export default useAuth
