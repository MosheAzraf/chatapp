import React, { useState, useEffect } from 'react';
import useUserSearch from '../hooks/useUserSearch';

const SearchModal = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: users, isLoading, isError } = useUserSearch(searchTerm);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Log the users data to the console whenever it changes
    useEffect(() => {
        if (users) {
            console.log("Search Results:", users);
        }
    }, [users]);

    return (
        <div>
            <h2>Search Users</h2>
            <input type="text" onChange={handleSearchChange} />
            {isLoading && <p>Loading...</p>}
            {isError && <p>Something went wrong...</p>}
        </div>
    );
}

export default SearchModal;
