import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ServerURL = "http://localhost:3001";

const AddCar = ({ user }) => {
  const navigate = useNavigate();

  // State variables for form fields
  const [ad, setAd] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [kilometers, setKilometers] = useState("");
  const [transmission, setTransmission] = useState("");
  const [dataInmatriculare, setDataInmatriculare] = useState("");
  const [VIN, setVIN] = useState("");
  const [descriere, setDescriere] = useState("");
  const [title, setTitle] = useState("");
  const [putere, setPutere] = useState("");
  const [capacitateCilindrica, setCapacitateCilindrica] = useState("");
  const [generatie, setGeneratie] = useState("");
  const [caroserie, setCaroserie] = useState("");
  const [normaDePoluare, setNormaDePoluare] = useState("");
  const [cutieDeViteze, setCutieDeViteze] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [culoare, setCuloare] = useState("");
  const [pageUser, setPageUser] = useState("");

  useEffect(() => {
    if (user) {
      setPageUser(user);
    }
  }, [user]);
  // State variables for options checkboxes
  const [options, setOptions] = useState({
    heatedSeats: false,
    airConditioning: false,
    electricMirrors: false,
    electricSeats: false,
    navigation: false,
    parkingSensors: false,
    rearCamera: false,
    cruiseControl: false,
    leatherSeats: false,
    sunroof: false,
    abs: false,
    esp: false,
    laneAssist: false,
    blindSpot: false,
    xenonLights: false,
    ledLights: false,
  });

  const estimatePrice = () => {
    axios
      .get("http://127.0.0.1:5000/get_price_estimate", {
        params: {
          _id: "test",
          make: make,
          model: model,
          version: generatie,
          generation: generatie,
          kilometers: kilometers,
          horsePower: putere,
          price: price,
          engineSize: capacitateCilindrica,
          transmission: transmission,
          fuelType: fuelType,
          gearbox: cutieDeViteze,
          year: year,
          bodyType: caroserie,
          emissionStandard: normaDePoluare,
          color: culoare,
          photos: "test",
        },
      })
      .then((response) => {
        setEstimatedPrice(response.data);
        console.log(response.data);
      });
  };
  const [photos, setPhotos] = useState([]);
  const [photoTitles, setPhotoTitles] = useState([]);

  // State variable for car makes and models from API
  const [carCollection, setCarCollection] = useState([]);

  // Fetch car makes and models on component mount
  useEffect(() => {
    axios.get(`http://localhost:8080/carcollections`).then((response) => {
      setCarCollection(response.data.carcollections);
    });
    console.log(user._id);
    console.log(user);
  }, []);

  /*const saveAd = async () => {
    const adData = {
      carId: "test",
      userId: user._id,
      title: title,
      description: descriere,
    };
    const response = await axios.post(`http://localhost:8080/ads`, adData);
    setAd(response.data);
  };*/

  // Function to handle form submission
  const saveCar = async (event) => {
    setPhotos(`${make}.jpg`);
    const carData = {
      userId: user._id,
      adId: "1234", // Ensure adId is populated correctly
      VIN: VIN,
      make: make,
      model: model,
      generation: generatie,
      bodyType: caroserie,
      price: price,
      year: year,
      pollutionStandard: normaDePoluare,
      gearBox: cutieDeViteze,
      fuelType: fuelType,
      kilometers: kilometers,
      transmission: transmission,
      engineSize: capacitateCilindrica,
      horsePower: putere,
      firstRegistration: dataInmatriculare,
      options: options,
      photos: photos,
    };

    // Save car to database
    await axios.post(`http://localhost:8080/cars`, carData);

    // Redirect to user profile page
    navigate(`/profile/${user.id}`);
  };
  const handleSubmit = async () => {
    //await saveAd();
    await saveCar();
  };
  return (
    <div className="container mx-auto p-4 bg-gray-100 mt-10 w-full pb-20">
      <h1 className="text-2xl font-bold mb-4">Informații generale</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-gray-700">VIN (serie șasiu)</label>
          <input
            type="text"
            placeholder="ex: 1FTPW14V88FC22108"
            className="w-full p-2 border rounded bg-white"
            onChange={(event) => setVIN(event.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700">Km*</label>
          <input
            type="text"
            placeholder="ex: 100 000"
            className="w-full p-2 border rounded bg-white"
            onChange={(event) => setKilometers(event.target.value)}
          />
          <span className="text-gray-500 text-sm">km</span>
        </div>
        <div>
          <label className="block text-gray-700">Titlul Anuntului</label>
          <input
            type="text"
            className="w-full p-2 border rounded bg-white"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Data primei înmatriculări
        </h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="ZZ"
            className="w-16 p-2 border rounded bg-white"
            onChange={(event) => setDataInmatriculare(event.target.value)}
          />
          <input
            type="text"
            placeholder="LL"
            className="w-16 p-2 border rounded bg-white"
          />
          <input
            type="text"
            placeholder="AAAA"
            className="w-24 p-2 border rounded bg-white"
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Detalii tehnice</h2>
        <p className="text-gray-700 mb-4">
          Vă rugăm să verificați detaliile vehiculului înainte de a publica
          anunțul. Puteți modifica gradul propriu VIN, marca, modelul, anul doar
          pe parcursul primelor 24 de ore din momentul adăugării anunțului.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1 ">Marcă</label>
            <select
              value={make}
              onChange={(event) => setMake(event.target.value)}
              className="w-full p-2 border rounded bg-white"
            >
              <option value="">Selectați marca</option>
              {carCollection.map((car) => (
                <option key={car._id} value={car.make}>
                  {car.make}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1 ">Model</label>
            <select
              value={model}
              onChange={(event) => setModel(event.target.value)}
              className="w-full p-2 border rounded bg-white"
            >
              <option value="">Selectați modelul</option>
              {/* Populate models based on selected make */}
              {carCollection
                .find((car) => car.make === make)
                ?.models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1 ">Generatie</label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-white"
              onChange={(event) => setGeneratie(event.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 ">Anul Productiei</label>
            <input
              type="text"
              placeholder="ex: 2015"
              className="w-full p-2 border rounded bg-white"
              onChange={(event) => setYear(event.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 ">Tip Caroserie</label>
            <select
              className="w-full p-2 border rounded bg-white"
              onChange={(event) => setCaroserie(event.target.value)}
            >
              <option value="sedan">Sedan</option>
              <option value="hatchback">Hatchback</option>
              <option value="combi">Combi</option>
              <option value="SUV">SUV</option>
              <option value="cabriolet">Cabriolet</option>
              <option value="coupe">Coupe</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1 ">
              Norma de poluare
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-white"
              onChange={(event) => setNormaDePoluare(event.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 ">Cutie de viteze</label>
            <select
              className="w-full p-2 border rounded bg-white"
              onChange={(event) => setCutieDeViteze(event.target.value)}
            >
              <option value="manuala">Manuală</option>
              <option value="automata">Automatică</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1 ">Tip combustibil</label>
            <select
              className="w-full p-2 border rounded bg-white"
              onChange={(event) => setFuelType(event.target.value)}
            >
              <option value="benzina">Benzină</option>
              <option value="motorina">Motorină</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric</option>
              <option value="gaz">Gaz</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1 ">Transmisie</label>
            <select
              className="w-full p-2 border rounded bg-white"
              onChange={(event) => setTransmission(event.target.value)}
            >
              <option value="fata">Fata</option>
              <option value="spate">Spate</option>
              <option value="integrala">Integrală</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1 ">
              Capacitate cilindrica
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-white"
              onChange={(event) => setCapacitateCilindrica(event.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 ">Putere (CP)</label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-white"
              onChange={(event) => setPutere(event.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 ">Culoare</label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-white"
              onChange={(event) => setCuloare(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Descriere</h2>
        <textarea
          className="w-full p-2 border rounded bg-white"
          rows="4"
          onChange={(event) => setDescriere(event.target.value)}
        ></textarea>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Dotări opționale</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(options).map((option) => (
            <div
              key={option}
              className="flex items-center border-gray-400 border-1 px-5 mx-5 py-2 bg-white rounded-lg shadow-md"
            >
              <input
                type="checkbox"
                id={option}
                checked={options[option]}
                onChange={(event) =>
                  setOptions((prevOptions) => ({
                    ...prevOptions,
                    [option]: event.target.checked,
                  }))
                }
                className="mr-2"
              />
              <label htmlFor={option} className="text-blue-500 text-xl ml-5 ">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Preț</h2>
        <input
          type="text"
          className="w-48 p-2 border rounded bg-white"
          onChange={(event) => setPrice(event.target.value)}
        />
        <span className="text-gray-500 text-sm">€</span>
        <button onClick={estimatePrice} className="ml-4">
          Estimează prețul
        </button>
        {estimatedPrice && (
          <div className="mt-4">
            <span className="text-green-500 text-lg font-bold">
              {estimatedPrice.min_mean_price.toFixed(0)} -{" "}
              {estimatedPrice.max_mean_price.toFixed(0)} €
            </span>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Fotografii</h2>
        <input type="file" multiple className="mb-2 border rounded-lg p-2" />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md">
          Încarcă Fotografii
        </button>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Salvează Anunț
        </button>
      </div>
    </div>
  );
};

export default AddCar;
