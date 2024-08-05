import React, { useState, useEffect } from "react";
import axios from "axios";
const ProfileInfo = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phone || "",
        address: user.address || "",
        city: user.city || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    user = { ...user, ...formData };
    axios
      .put(`http://localhost:8080/users/${user._id}`, formData)
      .then((res) => {
        console.log("User updated:", res.data);
      })
      .catch((err) => {
        console.log("Error updating user:", err);
      });
  };
  return (
    <div className="max-w-3xl mx-auto p-8 my-10 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block  text-gray-700 font-medium mb-2"
              htmlFor="firstName"
            >
              First name
            </label>
            <input
              className="w-full bg-gray-100 p-3 border border-gray-300 rounded-md"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="lastName"
            >
              Last name
            </label>
            <input
              className="w-full bg-gray-100 p-3 border border-gray-300 rounded-md"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full bg-gray-100 p-3 border border-gray-300 rounded-md"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="phoneNumber"
            >
              Phone number
            </label>
            <input
              className="w-full p-3 border bg-gray-100 border-gray-300 rounded-md"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className="w-full p-3 border bg-gray-100 border-gray-300 rounded-md"
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="w-full p-3 border bg-gray-100 border-gray-300 rounded-md"
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;
