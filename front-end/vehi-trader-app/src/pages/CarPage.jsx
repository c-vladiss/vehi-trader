import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import ImageGallery from "../components/ImageGallery";
import CarDetails from "../components/CarDetails";
import CarList2 from "../components/CarList2";

const CarPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [user, setUser] = useState(null);
  const [ad, setAd] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [closestCars, setClosestCars] = useState([]);
  const [priceStats, setPriceStats] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        setLoading(true);
        const carIdTrimmed = carId.slice(3);

        // Fetch the specific car data
        const carResponse = await axios.get(
          `http://localhost:8080/cars/${carIdTrimmed}`
        );
        const carData = carResponse.data;
        setCar(carData);

        // Fetch the user data if userId is available
        if (carData.userId) {
          const userResponse = await axios.get(
            `http://localhost:8080/users/${carData.userId}`
          );
          setUser(userResponse.data);
        }

        // Fetch the ad data if AdId is available
        if (carData.AdId) {
          const adResponse = await axios.get(
            `http://localhost:8080/ads/${carData.AdId}`
          );
          setAd(adResponse.data);
        }

        // Fetch all cars
        const carsResponse = await axios.get("http://localhost:8080/cars");
        setCars(carsResponse.data.cars);

        // Fetch the closest cars' ids from the clustering API
        const closestCarsIdsResponse = await axios.get(
          `http://127.0.0.1:5000/closest_cars/${carIdTrimmed}`
        );
        const closestCarsIds = closestCarsIdsResponse.data;

        // Fetch details of the closest cars using their ids
        const closestCarsPromises = closestCarsIds.map(async (id) => {
          const response = await axios.get(`http://localhost:8080/cars/${id}`);
          return response.data;
        });

        const closestCarsData = await Promise.all(closestCarsPromises);
        setClosestCars(closestCarsData);

        const price_stats = await axios.get(
          `http://127.0.0.1:5000/price_prediction/${carIdTrimmed}`
        );
        setPriceStats(price_stats.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load car data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [carId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 h-full">
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cars">Autoturisme</Link>
          </li>
          <li>{ad?.title}</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <ImageGallery images={car?.photos} />
        </div>

        <div>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            {ad?.title ? (
              <h1 className="text-3xl font-bold mb-2">{ad.title}</h1>
            ) : (
              <h1 className="text-3xl font-bold mb-2">
                {car?.make} {car?.model} {car?.version}
              </h1>
            )}
            <h1 className="text-xl font-semibold text-blue-500 mb-4">
              Intervalul de pret: {priceStats?.min_mean_price.toFixed(0)} -{" "}
              {priceStats?.max_mean_price.toFixed(0)} EUR
            </h1>
            <p className="text-gray-600 mb-4">
              {car?.year} • {car?.kilometers} km • {car?.fuelType}
            </p>
            <p className="text-4xl font-bold text-orange-600 mb-6">
              {car?.price} <span className="text-xl text-orange-500">EUR</span>
            </p>

            {user ? (
              <div className="space-y-4">
                <div>
                  <p className="bold text-black text-xl">Date de contact:</p>
                  <p className="font-semibold">
                    {user.lastName} {user.firstName}
                  </p>
                </div>
                <p className="font-semibold">Telefon: {user.phone}</p>
                <p className="font-semibold">Email: {user.email}</p>
                <p className="font-semibold">Locatie: {user.city}</p>
              </div>
            ) : (
              <h3>Detalii de contact indisponibile</h3>
            )}
          </div>
        </div>
      </div>
      <div>
        <CarDetails details={car} ad={ad} />
      </div>
      <div>
        <CarList2 cars={closestCars.slice(1)} />
      </div>
    </div>
  );
};

export default CarPage;
