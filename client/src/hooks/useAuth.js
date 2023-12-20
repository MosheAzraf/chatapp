import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axiosClient from '../configs/axios';
import {toast} from 'react-toastify';

const loginUser = async (credentials) => {
    const response = await axiosClient.post('/auth/login',credentials);
    return response.data;
};

const verifyAuth = async () => {
    const response = await axiosClient.post('/auth/verifyauth')
    return response.data;
}

const useAuth = () => {
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            queryClient.invalidateQueries('user');
            toast.success('successfuly logged in.');
        },
        onError: (error) => {
            if(error?.response?.status === 400) {
                console.log('invalid credentials.')
                toast.warning('invalid credentials.')
            }else if(error.response.status === 500) {
                if(process.env.NODE_ENV === 'development'){
                    console.log(error.message);
                }
                console.log('something went bad.');
                toast.warning('something went wrong.');
            }
        }
    });

    const { isSuccess } = useQuery({
        queryKey: ['verifyAuth'],
        queryFn: verifyAuth,
        retry:false,
    });

    return { 
        login: loginMutation.mutateAsync, 
        isSuccess
        
    };
};

export default useAuth;
