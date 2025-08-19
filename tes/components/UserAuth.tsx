'use client';

import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserAuth: React.FC = () => {
  const { 
    isAuthenticated, 
    isLoading, 
    userProfile, 
    principal, 
    login, 
    logout 
  } = useAuth();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span className="text-sm text-gray-600">Loading...</span>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        <div className="text-sm">
          <div className="font-medium text-gray-900">
            {userProfile?.username || 'User'}
          </div>
          <div className="text-gray-500 text-xs">
            {principal ? `${principal.substring(0, 8)}...${principal.substring(principal.length - 4)}` : 'Unknown'}
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
      Login with Internet Identity
    </button>
  );
};

export default UserAuth;
