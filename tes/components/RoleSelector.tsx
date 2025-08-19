'use client';

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const RoleSelector: React.FC = () => {
  const { userProfile } = useAuth();
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { id: 1, name: 'Codes', badge: '/assets/badge_code.png', color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600', description: 'Master of Technology - Ahli teknologi yang dapat memecahkan masalah kompleks dengan logika dan algoritma.' },
    { id: 2, name: 'Sports', badge: '/assets/badge_sports.png', color: 'bg-green-500', hoverColor: 'hover:bg-green-600', description: 'Champion of Physical Excellence - Atlet sejati yang menguasai kekuatan fisik dan ketahanan mental.' },
    { id: 3, name: 'Arts', badge: '/assets/badge_art.png', color: 'bg-purple-500', hoverColor: 'hover:bg-purple-600', description: 'Creator of Beauty - Seniman yang memiliki kreativitas tak terbatas dan kemampuan ekspresi visual.' },
    { id: 4, name: 'Traveler', badge: '/assets/badge_explorer.png', color: 'bg-orange-500', hoverColor: 'hover:bg-orange-600', description: 'Explorer of New Horizons - Petualang yang selalu mencari pengalaman baru dan perspektif berbeda.' },
    { id: 5, name: 'Literature', badge: '/assets/badge_literature.png', color: 'bg-red-500', hoverColor: 'hover:bg-red-600', description: 'Master of Words - Ahli komunikasi yang dapat menyampaikan ide-ide kompleks dengan cara yang mudah dipahami.' }
  ];

  const handleRoleSelect = async (roleId: number) => {
    if (isLoading) return;
    
    setSelectedRole(roleId);
    setIsLoading(true);
    
    try {
      // TODO: Implement role selection with backend
      console.log('Role selected:', roleId);
      // await icGameService.chooseRole(roleId);
    } catch (error) {
      console.error('Error selecting role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActiveRole = () => {
    return userProfile?.roles?.find(r => r.is_active);
  };

  const activeRole = getActiveRole();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-minecraft">
          Role Management
        </h3>
        <p className="text-gray-600 font-minecraft">
          Choose your path and unlock your potential
        </p>
      </div>

      {activeRole && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <img 
              src={`/assets/badge_${activeRole.name?.toLowerCase()}.png`} 
              alt="Active Role" 
              className="w-12 h-12"
            />
            <div>
              <h4 className="font-semibold text-blue-900">Active Role: {activeRole.name}</h4>
              <p className="text-sm text-blue-700">Level {activeRole.level} • {activeRole.exp} XP</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => {
          const isActive = activeRole?.id === role.id;
          const isSelected = selectedRole === role.id;
          
          return (
            <div
              key={role.id}
              className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
                isActive ? 'ring-4 ring-green-500 ring-offset-4' : 
                isSelected ? 'ring-4 ring-blue-500 ring-offset-4' : ''
              }`}
              onClick={() => handleRoleSelect(role.id)}
            >
              <div className="bg-white rounded-xl shadow-md p-6 border-2 border-transparent hover:border-gray-200">
                <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 group-hover:scale-110">
                  <img 
                    src={role.badge} 
                    alt={`${role.name} Badge`}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                
                <h3 className={`text-lg font-semibold text-center transition-colors mb-3 font-minecraft ${
                  isActive ? 'text-green-600' : 
                  isSelected ? 'text-blue-600' : 'text-gray-900 group-hover:text-gray-700'
                }`}>
                  {role.name}
                  {isActive && <span className="ml-2 text-sm text-green-500">(Active)</span>}
                </h3>
                
                <p className="text-sm text-gray-600 text-center leading-relaxed font-minecraft">
                  {role.description}
                </p>

                {isLoading && isSelected && (
                  <div className="mt-4 text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-sm text-blue-600 mt-2">Selecting...</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center text-sm text-gray-500 font-minecraft">
        <p>Select a role to customize your gameplay experience</p>
        <p>Each role has unique abilities and quests</p>
      </div>
    </div>
  );
};

export default RoleSelector;
