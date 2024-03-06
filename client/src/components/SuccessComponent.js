import React from 'react';

const SuccessComponent = ({ message }) => {
  return (
    <div className="bg-green-200 border border-green-600 text-green-800 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Success!</strong>
      <span className="block sm:inline"> {message}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1 1 0 1 1-1.697 1.117l-3.651-3.864-3.652 3.864a1 1 0 1 1-1.697-1.117l3.934-4.174-3.934-4.173a1 1 0 1 1 1.697-1.117l3.651 3.864 3.652-3.864a1 1 0 1 1 1.697 1.117l-3.933 4.173 3.934 4.174z"/></svg>
      </span>
    </div>
  );
};

export default SuccessComponent;
