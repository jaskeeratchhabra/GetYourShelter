import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-500">
      <style>
        {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          .animate-fade-in {
            animation: fadeIn 1s ease-in-out;
          }
        `}
      </style>
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl text-white font-bold mb-4">Welcome to pgDekho</h1>
        <p className="flex justify-around text-lg text-white mb-8">Sign up/ login to proceed</p>
        <Link to="/login" className="px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-blue-600">Login/signup</Link>
        {/* <Link to="/adminLogin" className="mx-4 px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-blue-600">Admin Login</Link> */}
      </div>
    </div>
  );
};

export default WelcomeScreen;
