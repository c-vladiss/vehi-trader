import React from "react";
import { useNavigate } from "react-router-dom";
const MiniSearchBar = ({ nrAnunturi }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/cars");
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-8">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
              />
            </svg>
            <span className="text-orange-600 font-semibold">Autoturisme</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <select className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Marca</option>
          </select>
        </div>
        <div className="col-span-2 md:col-span-1">
          <select className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Model</option>
          </select>
        </div>
        <div>
          <select className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Pret de la </option>
          </select>
        </div>
        <div>
          <select className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Anul de la</option>
          </select>
        </div>
        <div>
          <select className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Tip Caroserie</option>
          </select>
        </div>
        <div>
          <select className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Combustibil</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button className="text-blue-500 font-semibold flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          Cautare detaliata
        </button>
        <button
          onClick={handleClick}
          className="bg-orange-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Cauta {nrAnunturi} anunturi
        </button>
      </div>
    </div>
  );
};

export default MiniSearchBar;
