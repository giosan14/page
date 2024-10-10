import React from 'react'

const LearningCard = () => (
  <div className="card-gradient h-32 rounded-lg"></div>
)

const LearningSection = () => {
  return (
    <section className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, index) => (
          <LearningCard key={index} />
        ))}
      </div>
      <div className="bg-black py-2 px-4 rounded">
        <h2 className="text-center font-bold">SCREEN NEWS</h2>
      </div>
    </section>
  )
}

export default LearningSection