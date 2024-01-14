// SearchModal.js
import React, { useState } from 'react';
import useUserSearch from '../hooks/useUserSearch';

const SearchModal = ({ isOpen, onClose, setChatWith }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: users, isLoading, isError } = useUserSearch(searchTerm);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectedUser = (userName) => {
    setChatWith(userName);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button onClick={onClose} className="absolute top-2 right-2 text-lg font-bold">×</button>
        <h2 className="text-xl text-center mb-4">Search Users</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 p-2 rounded-md w-full mb-4"
          placeholder="Type to search..."
        />
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: Could not fetch users.</p>}
        <ul className="max-h-60 overflow-auto">
          {users.map((user, index) => (
            <li key={index} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded-md">
              <p className="flex-1">{user.userName}</p>
              <button
                onClick={() => handleSelectedUser(user.userName)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Send Message
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchModal;
