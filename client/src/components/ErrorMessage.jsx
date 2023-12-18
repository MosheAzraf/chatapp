import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className='max-w-[200px]'>
      <p className='text-red-500'>{message}</p>
    </div>
  );
};

export default ErrorMessage;
