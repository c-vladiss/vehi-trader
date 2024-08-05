import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ onHandleSearch, onChangeQueryParams }) => {
  const [selectedMakes, setSelectedMakes] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState([]);
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minKilometers, setMinKilometers] = useState("");
  const [maxKilometers, setMaxKilometers] = useState("");
  const [moreFiltersVisible, setMoreFiltersVisible] = useState(false);
  const [minEngineSize, setMinEngineSize] = useState("");
  const [maxEngineSize, setMaxEngineSize] = useState("");
  const [minHorsepower, setMinHorsepower] = useState("");
  const [maxHorsepower, setMaxHorsepower] = useState("");
  const [options, setOptions] = useState("");
  const [showMakes, setShowMakes] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const [showFuelTypes, setShowFuelTypes] = useState(false);
  const [showBodyTypes, setShowBodyTypes] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [showConditions, setShowConditions] = useState(false);
  const [carCollection, setCarCollection] = useState([]);

  // Fetch car data from DB (simulate with useEffect here)
  useEffect(() => {
    axios.get("http://localhost:8080/carcollections").then((res) => {
      setCarCollection(res.data.carcollections);
    });
  }, []);

  const handleMakeChange = (make) => {
    setSelectedMakes((prev) =>
      prev.includes(make) ? prev.filter((m) => m !== make) : [...prev, make]
    );
    setSelectedModels([]);
  };

  const handleModelChange = (model) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  const handleFuelTypeChange = (fuelType) => {
    setSelectedFuelTypes((prev) =>
      prev.includes(fuelType)
        ? prev.filter((f) => f !== fuelType)
        : [...prev, fuelType]
    );
  };

  const handleBodyTypeChange = (bodyType) => {
    setSelectedBodyTypes((prev) =>
      prev.includes(bodyType)
        ? prev.filter((b) => b !== bodyType)
        : [...prev, bodyType]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (selectedMakes.length > 0) {
      selectedMakes.forEach((make) => queryParams.append("makes", make));
    }
    if (selectedModels.length > 0) {
      selectedModels.forEach((model) => queryParams.append("models", model));
    }
    if (selectedFuelTypes.length > 0) {
      selectedFuelTypes.forEach((fuelType) =>
        queryParams.append("fuelTypes", fuelType)
      );
    }
    if (minYear !== "") {
      queryParams.append("minYear", parseInt(minYear));
    }
    if (maxYear !== "") {
      queryParams.append("maxYear", parseInt(maxYear));
    }
    if (minPrice !== "") {
      queryParams.append("minPrice", parseFloat(minPrice));
    }
    if (maxPrice !== "") {
      queryParams.append("maxPrice", parseFloat(maxPrice));
    }
    if (minKilometers !== "") {
      queryParams.append("minKilometers", parseFloat(minKilometers));
    }
    if (maxKilometers !== "") {
      queryParams.append("maxKilometers", parseFloat(maxKilometers));
    }

    onChangeQueryParams(queryParams);
    onHandleSearch();
  };

  const handleReset = () => {
    setSelectedMakes([]);
    setSelectedModels([]);
    setSelectedFuelTypes([]);
    setSelectedBodyTypes([]);
    setMinYear("");
    setMaxYear("");
    setMinPrice("");
    setMaxPrice("");
    setMinKilometers("");
    setMaxKilometers("");
  };

  const toggleMoreFilters = () => {
    setMoreFiltersVisible(!moreFiltersVisible);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-sm">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="relative">
          <button
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-left"
            onClick={() => setShowMakes(!showMakes)}
          >
            Marca
          </button>
          {showMakes && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
              {carCollection.map((car) => (
                <label key={car.make} className="block px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedMakes.includes(car.make)}
                    onChange={() => handleMakeChange(car.make)}
                  />
                  <span className="ml-2">{car.make}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <button
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-left"
            onClick={() => setShowModels(!showModels)}
            disabled={selectedMakes.length === 0}
          >
            Model
          </button>
          {showModels && selectedMakes.length == 1 && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
              {selectedMakes.flatMap((make) =>
                carCollection
                  .find((car) => car.make === make)
                  .models.map((model) => (
                    <label key={model} className="block px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedModels.includes(model)}
                        onChange={() => handleModelChange(model)}
                      />
                      <span className="ml-2">{model}</span>
                    </label>
                  ))
              )}
            </div>
          )}
        </div>
        <div className="relative">
          <button
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-left"
            onClick={() => setShowFuelTypes(!showFuelTypes)}
          >
            Combustibil
          </button>
          {showFuelTypes && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              {[
                "Benzina",
                "Diesel",
                "Electric",
                "Hibrid",
                "Hibrid Plug-in",
              ].map((fuelType) => (
                <label key={fuelType} className="block px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedFuelTypes.includes(fuelType)}
                    onChange={() => handleFuelTypeChange(fuelType)}
                  />
                  <span className="ml-2">{fuelType}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 mb-4">
        <div className="relative col-span-1">
          <button
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-left"
            onClick={() => setShowBodyTypes(!showBodyTypes)}
          >
            Tip Caroserie
          </button>
          {showBodyTypes && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              {["Sedan", "SUV", "Hatchback", "Convertible"].map((bodyType) => (
                <label key={bodyType} className="block px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedBodyTypes.includes(bodyType)}
                    onChange={() => handleBodyTypeChange(bodyType)}
                  />
                  <span className="ml-2">{bodyType}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        <input
          type="text"
          placeholder="Preț de la"
          className="col-span-1 w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Preț până la"
          className="col-span-1 w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Anul de la"
          className="col-span-1 w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={minYear}
          onChange={(e) => setMinYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Anul până la"
          className="col-span-1 w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={maxYear}
          onChange={(e) => setMaxYear(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-6 gap-4 items-center">
        <input
          type="text"
          placeholder="Km de la"
          className="col-span-1 w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={minKilometers}
          onChange={(e) => setMinKilometers(e.target.value)}
        />
        <input
          type="text"
          placeholder="Km până la"
          className="col-span-1 w-full bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={maxKilometers}
          onChange={(e) => setMaxKilometers(e.target.value)}
        />
        <div className="relative col-span-1">
          <button
            className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-left"
            onClick={() => setShowLocations(!showLocations)}
          >
            Localizare
          </button>
          {showLocations && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              {/* Add location options here */}
            </div>
          )}
        </div>
        <div className="relative col-span-1">
          {showConditions && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              {/* Add condition options here */}
            </div>
          )}
        </div>
        <div className="flex col-span-2 items-center space-x-4"></div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <button
          onClick={toggleMoreFilters}
          className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
        >
          Arată mai multe filtre
        </button>
        <button
          onClick={handleReset}
          className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
        >
          Resetează filtrele
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Caută
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
