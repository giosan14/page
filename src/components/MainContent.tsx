import React from 'react'
import NewsSection from './NewsSection'
import LearningSection from './LearningSection'
import WelcomeSlider from './WelcomeSlider'

const MainContent = () => {
  return (
    <main className="flex-1 p-8 space-y-8 overflow-y-auto">
      <div className="bg-purple-dark p-4 rounded-lg">
        <input
          type="text"
          placeholder="Buscar Noticia"
          className="w-full bg-purple-light text-white placeholder-gray-400 p-2 rounded"
        />
      </div>
      <NewsSection />
      <LearningSection />
      <WelcomeSlider />
    </main>
  )
}

export default MainContent