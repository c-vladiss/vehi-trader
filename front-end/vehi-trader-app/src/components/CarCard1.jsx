import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CarCard1 = ({ car, user, setUser }) => {
  const navigate = useNavigate();
  const [ad, setAd] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCars, setFavoriteCars] = useState(
    new Set(user?.favoriteCars || [])
  );

  useEffect(() => {
    if (!car.AdId) return;
    axios
      .get(`http://localhost:8080/ads/${car.AdId}`)
      .then((response) => {
        setAd(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ad data:", error);
      });
    console.log("user din carcard1", user);
  }, [car.AdId]);

  useEffect(() => {
    setIsFavorite(favoriteCars.has(car._id));
  }, [favoriteCars, car._id]);

  const handleClick = () => {
    navigate(`/cars/car${car._id}`);
  };

  const handleFavoriteClick = async (event) => {
    event.stopPropagation();
    const newFavoriteCars = new Set(favoriteCars);
    if (isFavorite) {
      newFavoriteCars.delete(car._id);
    } else {
      newFavoriteCars.add(car._id);
    }
    setFavoriteCars(newFavoriteCars);
    setIsFavorite(!isFavorite);

    try {
      await axios
        .put(`http://localhost:8080/users/${user._id}`, {
          favoriteCars: Array.from(newFavoriteCars),
        })
        .then((response) => {
          setUser(response.data);
        });
    } catch (error) {
      console.error("Error updating favorite cars:", error);
    }
  };

  return (
    <div
      className="bg-gray-50 rounded-lg shadow-xl overflow-hidden max-w-4xl mb-4 mt-4 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex">
        <div className="w-1/2 relative">
          <img
            src={`../src/car_photos/${car.photos[0]}`}
            alt="imagine masina"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/2 p-4">
          {ad.title ? (
            <h2 className="text-xl font-semibold text-blue-500">{ad.title}</h2>
          ) : (
            <h2 className="text-xl font-semibold text-blue-500">
              {car.make} {car.model} {car.version}
            </h2>
          )}
          <div className="max-w-5 block space-between">
            <svg
              onClick={handleFavoriteClick}
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
              fill={isFavorite ? "red" : "none"}
              stroke={isFavorite ? "red" : "currentColor"}
            >
              <path
                d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z"
                fillRule="nonzero"
              />
            </svg>
          </div>
          <p className="text-gray-600 text-sm">
            {car.engineSize} cm³ • {car.horsePower} CP
          </p>
          <div className="mt-4 flex space-x-4 text-sm text-gray-700">
            <span>{car.kilometers} Km</span>
            <span>• {car.fuelType}</span>
            <span>• {car.year}</span>
            <span>• {car.transmission}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-beige2 rounded-md ">
            <p className="text-2xl font-bold text-orange-600">
              {car.price.toFixed(0)} Euro
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard1;
