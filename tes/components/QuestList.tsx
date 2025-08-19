'use client'

import { useState } from 'react'

interface QuestListProps {
  userRole: string
}

interface Quest {
  id: string
  title: string
  description: string
  image: string
  coins: number
  exp: number
  staminaCost: number
  isActive?: boolean
  isCompleted?: boolean
}

export default function QuestList({ userRole }: QuestListProps) {
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)
  const [showQuestModal, setShowQuestModal] = useState(false)
  const [activeQuests, setActiveQuests] = useState<string[]>([])

  // Quest data berdasarkan role
  const questData: { [key: string]: Quest[] } = {
    codes: [
      {
        id: 'code-1',
        title: 'Belajar JavaScript Dasar',
        description: 'Pelajari dasar-dasar JavaScript termasuk variabel, fungsi, dan kontrol alur. Upload screenshot dari code editor Anda yang menunjukkan progress belajar.',
        image: '/assets/quest-code-1.jpg',
        coins: 50,
        exp: 100,
        staminaCost: 20
      },
      {
        id: 'code-2',
        title: 'Buat Website Sederhana',
        description: 'Buat website sederhana menggunakan HTML, CSS, dan JavaScript. Upload screenshot dari hasil website yang Anda buat.',
        image: '/assets/quest-code-2.jpg',
        coins: 75,
        exp: 150,
        staminaCost: 30
      },
      {
        id: 'code-3',
        title: 'Debugging Challenge',
        description: 'Selesaikan 5 masalah debugging dalam kode. Upload screenshot dari proses debugging yang Anda lakukan.',
        image: '/assets/quest-code-3.jpg',
        coins: 100,
        exp: 200,
        staminaCost: 25
      }
    ],
    sports: [
      {
        id: 'sport-1',
        title: 'Jalan Kaki 10.000 Langkah',
        description: 'Lakukan jalan kaki sebanyak 10.000 langkah dalam satu hari. Upload foto dari aplikasi fitness tracker atau bukti aktivitas.',
        image: '/assets/quest-sport-1.jpg',
        coins: 50,
        exp: 100,
        staminaCost: 15
      },
      {
        id: 'sport-2',
        title: 'Push-up Challenge',
        description: 'Lakukan 50 push-up dalam satu sesi. Upload foto atau video dari aktivitas push-up Anda.',
        image: '/assets/quest-sport-2.jpg',
        coins: 75,
        exp: 150,
        staminaCost: 25
      },
      {
        id: 'sport-3',
        title: 'Lari 5KM',
        description: 'Selesaikan lari sejauh 5 kilometer. Upload screenshot dari aplikasi running atau bukti aktivitas.',
        image: '/assets/quest-sport-3.jpg',
        coins: 100,
        exp: 200,
        staminaCost: 40
      }
    ],
    arts: [
      {
        id: 'art-1',
        title: 'Sketsa Harian',
        description: 'Buat sketsa gambar setiap hari selama 7 hari. Upload foto dari hasil sketsa Anda.',
        image: '/assets/quest-art-1.jpg',
        coins: 50,
        exp: 100,
        staminaCost: 20
      },
      {
        id: 'art-2',
        title: 'Digital Art Creation',
        description: 'Buat karya seni digital menggunakan tools seperti Photoshop, Procreate, atau Canva. Upload hasil karya Anda.',
        image: '/assets/quest-art-2.jpg',
        coins: 75,
        exp: 150,
        staminaCost: 30
      },
      {
        id: 'art-3',
        title: 'Photography Challenge',
        description: 'Ambil 10 foto dengan tema "Keindahan Alam". Upload foto-foto terbaik Anda.',
        image: '/assets/quest-art-3.jpg',
        coins: 100,
        exp: 200,
        staminaCost: 25
      }
    ],
    traveler: [
      {
        id: 'travel-1',
        title: 'Jelajahi Tempat Baru',
        description: 'Kunjungi tempat baru yang belum pernah Anda kunjungi sebelumnya. Upload foto dari tempat tersebut.',
        image: '/assets/quest-travel-1.jpg',
        coins: 50,
        exp: 100,
        staminaCost: 25
      },
      {
        id: 'travel-2',
        title: 'Coba Makanan Lokal',
        description: 'Coba makanan khas daerah yang belum pernah Anda coba. Upload foto dari makanan tersebut.',
        image: '/assets/quest-travel-2.jpg',
        coins: 75,
        exp: 150,
        staminaCost: 20
      },
      {
        id: 'travel-3',
        title: 'Cultural Experience',
        description: 'Ikuti kegiatan budaya lokal atau festival. Upload foto dari pengalaman budaya Anda.',
        image: '/assets/quest-travel-3.jpg',
        coins: 100,
        exp: 200,
        staminaCost: 30
      }
    ],
    literature: [
      {
        id: 'lit-1',
        title: 'Baca Buku Baru',
        description: 'Baca buku baru yang belum pernah Anda baca sebelumnya. Upload foto dari buku dan progress membaca.',
        image: '/assets/quest-lit-1.jpg',
        coins: 50,
        exp: 100,
        staminaCost: 15
      },
      {
        id: 'lit-2',
        title: 'Tulis Cerita Pendek',
        description: 'Tulis cerita pendek dengan minimal 1000 kata. Upload file atau screenshot dari cerita Anda.',
        image: '/assets/quest-lit-2.jpg',
        coins: 75,
        exp: 150,
        staminaCost: 30
      },
      {
        id: 'lit-3',
        title: 'Review Buku',
        description: 'Tulis review buku yang baru saja Anda baca. Upload review dalam format teks atau video.',
        image: '/assets/quest-lit-3.jpg',
        coins: 100,
        exp: 200,
        staminaCost: 25
      }
    ]
  }

  const quests = questData[userRole] || []

  const handleQuestClick = (quest: Quest) => {
    setSelectedQuest(quest)
    setShowQuestModal(true)
  }

  const handleTakeQuest = (quest: Quest) => {
    setActiveQuests(prev => [...prev, quest.id])
    setShowQuestModal(false)
  }

  const handleCompleteQuest = (questId: string) => {
    setActiveQuests(prev => prev.filter(id => id !== questId))
    // Di sini bisa ditambahkan logic untuk menambah coins dan exp
  }

  const closeQuestModal = () => {
    setShowQuestModal(false)
    setSelectedQuest(null)
  }

  // Urutkan quest: active quest di atas, kemudian quest lainnya
  const sortedQuests = [...quests].sort((a, b) => {
    const aActive = activeQuests.includes(a.id)
    const bActive = activeQuests.includes(b.id)
    if (aActive && !bActive) return -1
    if (!aActive && bActive) return 1
    return 0
  })

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-minecraft">
        Daftar Quest - {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
      </h2>
      
      <div className="space-y-4">
        {sortedQuests.map((quest) => {
          const isActive = activeQuests.includes(quest.id)
          
          return (
            <div 
              key={quest.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                isActive 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => handleQuestClick(quest)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className={`font-semibold mb-2 font-minecraft ${
                    isActive ? 'text-orange-700' : 'text-gray-900'
                  }`}>
                    {quest.title}
                    {isActive && (
                      <span className="ml-2 text-sm bg-orange-500 text-white px-2 py-1 rounded-full">
                        Active
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 font-minecraft">
                    {quest.description.substring(0, 100)}...
                  </p>
                                     <div className="flex items-center space-x-4 text-sm text-gray-500 font-minecraft">
                     <div className="flex items-center space-x-1">
                       <img 
                         src="/assets/koin.png" 
                         alt="Coins" 
                         className="w-4 h-4"
                       />
                       <span>{quest.coins}</span>
                     </div>
                     <div className="flex items-center space-x-1">
                       <span>⭐</span>
                       <span>{quest.exp} EXP</span>
                     </div>
                     <div className="flex items-center space-x-1">
                       <img 
                         src="/assets/Stammina.png" 
                         alt="Stamina" 
                         className="w-4 h-4"
                       />
                       <span>{quest.staminaCost}</span>
                     </div>
                   </div>
                </div>
                
                {isActive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCompleteQuest(quest.id)
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-minecraft"
                  >
                    Selesai
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Quest Detail Modal */}
      {showQuestModal && selectedQuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeQuestModal}></div>
          
          <div className="relative bg-white rounded-2xl shadow-2xl mx-4 w-full max-w-2xl p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-minecraft">
                {selectedQuest.title}
              </h3>
              
              <div className="mb-4">
                <img 
                  src={selectedQuest.image} 
                  alt={selectedQuest.title}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Quest+Image'
                  }}
                />
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed font-minecraft">
                {selectedQuest.description}
              </p>
              
                             <div className="grid grid-cols-3 gap-4 mb-6">
                 <div className="text-center p-3 bg-yellow-100 rounded-lg">
                   <div className="mb-1">
                     <img 
                       src="/assets/koin.png" 
                       alt="Coins" 
                       className="w-8 h-8 mx-auto"
                     />
                   </div>
                   <div className="font-semibold text-gray-900 font-minecraft">{selectedQuest.coins}</div>
                   <div className="text-sm text-gray-600 font-minecraft">Coins</div>
                 </div>
                 <div className="text-center p-3 bg-blue-100 rounded-lg">
                   <div className="text-2xl mb-1">⭐</div>
                   <div className="font-semibold text-gray-900 font-minecraft">{selectedQuest.exp}</div>
                   <div className="text-sm text-gray-600 font-minecraft">EXP</div>
                 </div>
                 <div className="text-center p-3 bg-red-100 rounded-lg">
                   <div className="mb-1">
                     <img 
                       src="/assets/Stammina.png" 
                       alt="Stamina" 
                       className="w-8 h-8 mx-auto"
                     />
                   </div>
                   <div className="font-semibold text-gray-900 font-minecraft">{selectedQuest.staminaCost}</div>
                   <div className="text-sm text-gray-600 font-minecraft">Stamina</div>
                 </div>
               </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={closeQuestModal}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors font-minecraft"
              >
                Batal
              </button>
              
              {!activeQuests.includes(selectedQuest.id) && (
                <button
                  onClick={() => handleTakeQuest(selectedQuest)}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors font-minecraft"
                >
                  Ambil Quest
                </button>
              )}
            </div>

            <button
              onClick={closeQuestModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
