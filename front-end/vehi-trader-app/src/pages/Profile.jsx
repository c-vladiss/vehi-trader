import React, { useState, useEffect } from "react";
import axios from "axios";
import CarList2 from "../components/CarList2";
import ProfileInfo from "../components/ProfileInfo";

const Profile = ({ user }) => {
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [uploadedCars, setUploadedCars] = useState([]);

  useEffect(() => {
    if (user && user.favoriteCars) {
      const fetchFavoriteCars = async () => {
        try {
          const carPromises = user.favoriteCars?.map((carId) =>
            axios.get(`http://localhost:8080/cars/${carId}`)
          );
          const favoriteCarsData = await Promise.all(carPromises);
          const favoriteCars = favoriteCarsData.map(
            (response) => response.data
          );
          setFavoriteCars(favoriteCars);
        } catch (error) {
          console.error("Error fetching favorite cars:", error);
        }
      };
      const fetchUploadedCars = async () => {
        try {
          const carPromises = user.uploadedCars?.map((carId) =>
            axios.get(`http://localhost:8080/cars/${carId}`)
          );
          const uploadedCarsData = await Promise.all(carPromises);
          const uploadedCars = uploadedCarsData.map(
            (response) => response.data
          );
          setUploadedCars(uploadedCars);
        } catch (error) {
          console.error("Error fetching uploaded cars:", error);
        }
      };
      fetchFavoriteCars();
      fetchUploadedCars();
    }
    console.log(user);
    console.log(favoriteCars);
  }, [user]);

  return (
    <div className="profile">
      <ProfileInfo user={user} />
      <h2>Favourite Cars</h2>

      <CarList2 cars={favoriteCars} />

      <h2>Uploaded Cars</h2>

      <CarList2 cars={uploadedCars} />
    </div>
  );
};

export default Profile;
