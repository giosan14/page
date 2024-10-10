import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, ShoppingCart, Users, Megaphone } from 'lucide-react'

const SliderCard = ({ icon: Icon, title, buttonText }) => (
  <div className="bg-purple-light rounded-lg p-6 flex flex-col items-center text-center">
    <Icon size={48} className="mb-4" />
    <h3 className="font-bold text-lg mb-4">{title}</h3>
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
      {buttonText}
    </button>
  </div>
)

const WelcomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    {
      icon: ShoppingCart,
      title: '¡NUEVA FORMA DE VENDER TUS PRODUCTOS!',
      buttonText: '¡Saber más!',
    },
    {
      icon: Users,
      title: '¿Quiénes somos?',
      buttonText: 'Descubre Exodus',
    },
    {
      icon: Megaphone,
      title: 'ENCUENTRA TU INFLUENCER PARA TU NEGOCIO',
      buttonText: 'Ver más',
    },
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <SliderCard {...slide} />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-purple-dark p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-purple-dark p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default WelcomeSlider