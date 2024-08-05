import React, { useState } from "react";

const ImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (!images || images.length === 0) {
    return <p>No images to display.</p>;
  }

  return (
    <div className="mb-6">
      <div className="relative">
        <img
          src={`../src/car_photos/${images[currentImageIndex]}`}
          alt={`Imagine ${currentImageIndex + 1}`}
          className="w-full h-96 object-cover rounded-lg"
        />
        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
              onClick={prevImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
              onClick={nextImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
        <span className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-50 text-white text-sm px-2 py-1 rounded-md">
          {currentImageIndex + 1}/{images.length}
        </span>
      </div>
      {images.length > 1 && (
        <div className="flex space-x-2 mt-2">
          {images.map((img, index) => (
            <img
              key={index}
              src={`../src/car_photos/${img}`}
              alt={`Imagine ${index + 1}`}
              className="w-24 h-16 object-cover rounded-md cursor-pointer"
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
