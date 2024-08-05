import axios from "axios";
import React, { useEffect, useState } from "react";
import CarList from "../components/CarList";
import SearchBar from "../components/SearchBar";
const SERVERURL = "http://localhost:8080";

const Cars = ({ user, setUser }) => {
  const [cars, setCars] = useState([]);
  const [queryParams, setQueryParams] = useState("");
  const getCars = () => {
    axios
      .get(`${SERVERURL}/cars?${queryParams}`)
      .then((res) => res.data)
      .then((data) => setCars(data.cars.sort((a, b) => a.price - b.price)));
  };
  useEffect(() => {
    getCars();
    console.log("user din cars", user);
  }, []);
  return (
    <div className="Cars min-h-screen bg-gradient-to-t from-gray-300 to-gray-100 flex flex-col items-center">
      <div className="w-full bg-white shadow-md mb-4">
        <SearchBar
          onHandleSearch={getCars}
          onChangeQueryParams={setQueryParams}
        />
      </div>
      <div className="w-full max-w-7xl">
        <CarList cars={cars} user={user} setUser={setUser} />
      </div>
    </div>
  );
};

export default Cars;
