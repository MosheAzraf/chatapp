import React, { useState, useEffect } from 'react';
import useUserSearch from '../hooks/useUserSearch';

const SearchModal = ({isOpen, onClose, setChatWith}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: users, isLoading, isError } = useUserSearch(searchTerm);

    const closeModal = () => {
        onClose();
    }


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    //handle selecting of user to chat with..
    const handleSelectedUser = (selectedUserName) => {
        setChatWith(selectedUserName);
        closeModal();
    }

    const handleBackdropClick = (e) => {
        if(e.target.id === "modal-backdrop"){
            closeModal();
        }
    }

    if(!isOpen){
        return null;
    }


    return (
        <div id="modal-backdrop" onClick={handleBackdropClick} className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-lg font-bold">×</button>
                <h2>Search Users</h2>
                <input type="text" onChange={handleSearchChange} className="border border-gray-300 p-2 rounded-md" />
                {isLoading && <p>Loading...</p>}
                {isError && <p>Something went wrong...</p>}
                {/* Render search results or console log */}
                <ul>
                    {
                        users && users.map((user, index) => (
                            <div key={index} className='flex space-x-2'>
                                <p>{user.userName}</p>
                                <button onClick={() => handleSelectedUser(user.userName) }>send message</button>
                            </div>
                            
                            ))
                    }
                </ul>
            
            </div>
        </div>
    );
}

export default SearchModal;
