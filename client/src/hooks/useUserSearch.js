import { useQuery } from "@tanstack/react-query";
import axiosClient from "../configs/axios";

const findUsersFetch = async (searchTerm) => {
    const response = await axiosClient.get(`/users/findUsers/?search=${searchTerm}`);
    return response.data.results; 
};

const useUserSearch = (searchTerm) => {
    return useQuery({
        queryKey: ['searchUsers', searchTerm],
        queryFn: () => findUsersFetch(searchTerm),
        enabled: searchTerm.length > 0, // Only run query if searchTerm is not empty
    });
};


export default useUserSearch;
