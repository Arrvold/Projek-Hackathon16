'use client';

import React, { useState, useEffect } from 'react';
import { getCurrentNetworkConfig, getCanisterIds } from '../config/dfx-config';

const ICPStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [network, setNetwork] = useState<'local' | 'ic'>('local');
  const [canisterId, setCanisterId] = useState('');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const config = getCurrentNetworkConfig();
        const ids = getCanisterIds();
        
        setNetwork(config.host.includes('127.0.0.1') ? 'local' : 'ic');
        setCanisterId(ids.ic_game_backend?.local || 'Unknown');
        
        // Simple connection test
        const response = await fetch(config.host + '/ping', { 
          method: 'GET',
          mode: 'no-cors' // Avoid CORS issues
        });
        setIsConnected(true);
      } catch (error) {
        console.log('ICP connection test failed:', error);
        setIsConnected(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <div className="text-sm">
          <div className="font-medium text-gray-900">
            ICP {isConnected ? 'Connected' : 'Disconnected'}
          </div>
          <div className="text-xs text-gray-500">
            {network === 'local' ? 'Local Network' : 'IC Mainnet'}
          </div>
          <div className="text-xs text-gray-400 font-mono">
            {canisterId.substring(0, 8)}...
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICPStatus;
