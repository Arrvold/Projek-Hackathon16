'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Shop: React.FC = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'shop' | 'inventory'>('shop');
  const [isLoading, setIsLoading] = useState(false);

  // Mock shop data - will be replaced with real data from backend
  const shopItems = [
    {
      id: 1,
      name: 'Golden Armor',
      description: 'Legendary armor with golden shine',
      rarity: 'Legendary',
      image_url: '/assets/bar100.png',
      price: 1000,
      is_limited: true
    },
    {
      id: 2,
      name: 'Silver Sword',
      description: 'Sharp and durable silver sword',
      rarity: 'Rare',
      image_url: '/assets/bar75.png',
      price: 500,
      is_limited: false
    },
    {
      id: 3,
      name: 'Bronze Shield',
      description: 'Reliable bronze shield',
      rarity: 'Common',
      image_url: '/assets/bar50.png',
      price: 200,
      is_limited: false
    }
  ];

  const inventoryItems = userProfile?.skins || [];

  const handleBuyItem = async (itemId: number) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      // TODO: Implement buy item with backend
      console.log('Buying item:', itemId);
      // await icGameService.buySkin(itemId);
    } catch (error) {
      console.error('Error buying item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivateItem = async (inventoryId: number) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      // TODO: Implement activate item with backend
      console.log('Activating item:', inventoryId);
      // await icGameService.activateSkin(inventoryId);
    } catch (error) {
      console.error('Error activating item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'common': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-minecraft">
          Shop & Inventory
        </h3>
        <p className="text-gray-600 font-minecraft">
          Buy new items and manage your collection
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-md">
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'shop'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Shop
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'inventory'
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Inventory ({inventoryItems.length})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'shop' && (
          <div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Available Items</h4>
              <p className="text-sm text-gray-600">Your coins: {userProfile?.coin || 0}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 border-2 border-transparent hover:border-gray-200">
                  <div className="text-center">
                    <img 
                      src={item.image_url} 
                      alt={item.name}
                      className="w-24 h-24 mx-auto mb-4 object-contain"
                    />
                    
                    <h5 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h5>
                    
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${getRarityColor(item.rarity)}`}>
                      {item.rarity}
                    </span>
                    
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <img src="/assets/koin.png" alt="Coins" className="w-6 h-12"/>
                      <span className="font-semibold text-gray-900">{item.price}</span>
                    </div>
                    
                    {item.is_limited && (
                      <p className="text-xs text-orange-600 mb-4">Limited Edition!</p>
                    )}
                    
                    <button
                      onClick={() => handleBuyItem(item.id)}
                      disabled={isLoading || (userProfile?.coin || 0) < item.price}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        (userProfile?.coin || 0) >= item.price
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isLoading ? 'Buying...' : 'Buy Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div>
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Your Items</h4>
              <p className="text-sm text-gray-600">Total items: {inventoryItems.length}</p>
            </div>
            
            {inventoryItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h5 className="text-lg font-medium text-gray-900 mb-2">No items yet</h5>
                <p className="text-gray-600">Visit the shop to buy your first item!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inventoryItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-6 border-2 border-transparent hover:border-gray-200">
                    <div className="text-center">
                      <img 
                        src="/assets/bar100.png" // Placeholder image
                        alt="Inventory Item"
                        className="w-24 h-24 mx-auto mb-4 object-contain"
                      />
                      
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">Item #{item.id}</h5>
                      
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <button
                          onClick={() => handleActivateItem(item.id)}
                          disabled={isLoading || item.is_active}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                            item.is_active
                              ? 'bg-green-100 text-green-800 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {item.is_active ? 'Active' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
