import React from 'react'

const NewsCard = ({ title, image, date, author }) => (
  <div className="card-gradient rounded-lg overflow-hidden">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-300">{date} • {author}</p>
    </div>
  </div>
)

const NewsSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <NewsCard
        title="Nuevas colaboraciones en Exodus"
        image="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        date="15 Mar 2024"
        author="John Doe"
      />
      <NewsCard
        title="Nuevos emprendimientos en Tik Tok"
        image="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        date="14 Mar 2024"
        author="Jane Smith"
      />
    </section>
  )
}

export default NewsSection