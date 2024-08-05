import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CarCard2 = (car) => {
  const navigate = useNavigate();
  const [ad, setAd] = useState("");
  const [user, setUser] = useState("");

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
    axios.get(`http://localhost:8080/users/${car.userId}`).then((response) => {
      setUser(response.data);
    });
  }, [car.AdId]);

  const handleClick = () => {
    navigate(`/cars/car${car._id}`);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden"
      onClick={handleClick}
    >
      <img
        src={`../src/car_photos/${car.photos[0]}`}
        alt="carimg"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        {ad.title ? (
          <h2 className="text-xl font-semibold text-blue-500">{ad.title}</h2>
        ) : (
          <h2 className="text-xl font-semibold text-blue-500">
            {car.make} {car.model} {car.version}
          </h2>
        )}
        <div className="text-sm text-gray-600 mb-4">
          <span>{car.year}</span> • <span>{car.kilometers} km</span> •{" "}
          <span>{car.fuelType}</span> • <span>{car.horsePower} CP</span> •{" "}
          <span>{car.engineSize} cm3</span>
        </div>
        <div className="text-2xl font-bold text-orange-600">
          {car.price.toFixed(0)}{" "}
          <span className="text-m text-orange-400">EUR</span>
        </div>
        <div className="text-m font-semibold text-blue-400">{user.city}</div>
      </div>
    </div>
  );
};

export default CarCard2;
