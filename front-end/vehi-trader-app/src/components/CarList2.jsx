import CarCard2 from "./CarCard2";

const CarList2 = ({ cars }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cars.map((car) => (
          <CarCard2 {...car} key={car._id} />
        ))}
      </div>
    </div>
  );
};

export default CarList2;
