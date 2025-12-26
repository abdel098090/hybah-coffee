import { useState } from 'react'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  // Placeholder images - replace with actual restaurant images
  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      alt: 'Restaurant Interior - Main Dining Area',
      title: 'Main Dining Area',
      description: 'Our spacious main dining area with comfortable seating'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      alt: 'Restaurant Interior - Cozy Corner',
      title: 'Cozy Corner',
      description: 'A quiet corner perfect for reading or working'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
      alt: 'Restaurant Interior - Bar Area',
      title: 'Bar Area',
      description: 'Our coffee bar where we prepare your favorite drinks'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      alt: 'Restaurant Interior - Outdoor Seating',
      title: 'Outdoor Seating',
      description: 'Enjoy your meal in our beautiful outdoor space'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      alt: 'Restaurant Interior - Private Booth',
      title: 'Private Booth',
      description: 'Private booths for intimate dining experiences'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
      alt: 'Restaurant Interior - Kitchen View',
      title: 'Kitchen View',
      description: 'Watch our chefs prepare traditional Chadian dishes'
    }
  ]

  const openModal = (image) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <section id="gallery" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-coffee-brown dark:text-coffee-cream">
          Our Restaurant Gallery
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Take a virtual tour of our beautiful restaurant. Click on any image to see it in full size.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => openModal(image)}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                  <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                  <p className="text-sm">{image.description}</p>
                  <p className="text-xs mt-2 text-coffee-cream">Click to enlarge</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for enlarged image */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            onClick={closeModal}
          >
            <div className="relative max-w-4xl w-full">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-4xl hover:text-coffee-cream transition z-10"
                aria-label="Close"
              >
                ×
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="mt-4 text-center text-white">
                <h3 className="text-2xl font-semibold mb-2">{selectedImage.title}</h3>
                <p className="text-gray-300">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery

