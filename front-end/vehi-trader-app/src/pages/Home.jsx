import MiniSearchBar from "../components/MiniSearchBar";
import CarList2 from "../components/CarList2";
import React, { useState, useEffect } from "react";
import axios from "axios";
const SERVERURL = "http://localhost:8080";
const Home = () => {
  const [cars, setCars] = useState([]);

  const getCars = () => {
    axios
      .get(`${SERVERURL}/cars`)
      .then((res) => res.data)
      .then((data) => setCars(data.cars));
  };
  useEffect(() => {
    getCars();
  }, []);
  return (
    <div className="h-full min-h-full ">
      <div className="bg-white">
        <div className="mt-5 mb-5 shadow-lg pb-10 h-full bg-gradient-to-t from-gray-300  via-white to-gray-100">
          <h2 className=" pt-5 my-5 bg-gradient-to-r from-purple-500 via-beige-500 to-orange-600 text-transparent bg-clip-text font-extrabold text-xl hover:cursor-pointer text-center">
            Welcome to Vehi Trader Find the best deals on vehicles
          </h2>
          <MiniSearchBar nrAnunturi={cars.length} />
          <CarList2 cars={cars.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
};

export default Home;
