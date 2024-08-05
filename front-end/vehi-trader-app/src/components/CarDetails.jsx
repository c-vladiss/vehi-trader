import React, { useEffect, useState } from "react";

const CarDetails = (car, ad) => {
  const [details, setDetails] = useState("");
  const [carDetails, setCarDetails] = useState(car.details);

  // useEffect to set the details when the component mounts
  useEffect(() => {
    // Set 'details' with car details from the 'car' prop
    setDetails({
      Marca: carDetails.make,
      Model: carDetails.model,
      An: carDetails.year,
      Kilometraj: carDetails.kilometers,
      "Capacitate cilindrica": carDetails.engineSize,
      Putere: carDetails.horsePower,
      Combustibil: carDetails.fuelType,
      "Cutie de viteze": carDetails.gearBox,
      Caroserie: carDetails.bodyType,
      Culoare: carDetails.color,
      Pret: carDetails.price,
      Transmisie: carDetails.transmission,
      "Cutie de viteze": carDetails.gearbox,
      "Data adaugare": carDetails.createdAt,
      "Capacitate cilindrica": carDetails.engineSize,
      generatie: carDetails.generation,
      "Norma de poluare": carDetails.emissionStandard,
    });
  }, []);
  if (!details) return null;

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Detalii</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="text-gray-600">{key}</span>
            <span
              className={`font-semibold ${
                typeof value === "string" && value.startsWith("http")
                  ? "text-blue-500 underline"
                  : ""
              }`}
            >
              {typeof value === "string" && value.startsWith("http") ? (
                <a href={value}>{value.split("/").pop()}</a>
              ) : (
                value
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 h-full justify-center justify-items-center ">
        Descrierea detaliata anuntului: <p>{ad.description}</p>
      </div>
      <div>
        {" "}
        Anunturi recomandate in conformitate cu specificatiile masinii{" "}
      </div>
    </div>
  );
};

export default CarDetails;
