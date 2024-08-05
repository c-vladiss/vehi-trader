import React, { useState } from "react";
import CarCard1 from "./CarCard1";

const CarList = ({ cars, user, setUser }) => {
  console.log("user din carlist", user);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;
  const totalPages = Math.ceil(cars.length / carsPerPage);
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 3;
    const halfMaxButtons = Math.floor(maxButtons / 2);
    let startPage = currentPage - halfMaxButtons;
    let endPage = currentPage + halfMaxButtons;

    if (startPage <= 0) {
      startPage = 1;
      endPage = Math.min(totalPages, maxButtons);
    } else if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-4 py-2 mx-1 rounded ${
            i === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl bg-gradient-to-t from-gray-300 to-gray-100 min-h-screen px-5 py-6">
        {currentCars.map((car) => (
          <div key={car._id} className="my-5 mb-6 mx-0 w-full">
            <CarCard1 car={car} user={user} setUser={setUser} />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center py-4 w-full max-w-4xl">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-l-md hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="flex">{renderPaginationButtons()}</div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CarList;
