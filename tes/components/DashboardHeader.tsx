'use client'

interface DashboardHeaderProps {
  username: string
  stamina: number
  coins: number
  userRole: string
  onRoleChange: () => void
}

export default function DashboardHeader({ username, stamina, coins, userRole, onRoleChange }: DashboardHeaderProps) {
  const getRoleName = (roleId: string) => {
    const roleNames: { [key: string]: string } = {
      'codes': 'Codes',
      'sports': 'Sports',
      'arts': 'Arts',
      'traveler': 'Traveler',
      'literature': 'Literature'
    }
    return roleNames[roleId] || roleId
  }

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Nama User - Pojok Kiri */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 font-minecraft">
              {username}
            </h1>
          </div>
          
          {/* Stamina, Coins, dan Ganti Role - Sebelah Kanan */}
          <div className="flex items-center space-x-6">
            {/* Stamina */}
            <div className="flex items-center space-x-2">
              <img 
                src="/assets/Stammina.png" 
                alt="Stamina" 
                className="w-6 h-6"
              />
              <span className="text-gray-900 font-minecraft font-medium">
                {stamina}/100
              </span>
            </div>
            
            {/* Coins */}
            <div className="flex items-center space-x-2">
              <img 
                src="/assets/koin.png" 
                alt="Coins" 
                className="w-6 h-6"
              />
              <span className="text-gray-900 font-minecraft font-medium">
                {coins}
              </span>
            </div>
            
            {/* Tombol Ganti Role */}
            <button 
              onClick={onRoleChange}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors font-minecraft"
            >
              Ganti Role
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
