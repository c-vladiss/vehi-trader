import React, { useState } from "react";
const SignUpForm = ({ onSignup }) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();

  const [confirmPassword, setConfirmPassword] = useState();

  const addUser = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      onSignup({
        firstName,
        lastName,
        email,
        password,
        address,
      });
    } else {
      alert("Passwords do not match");
    }
  };
  return (
    <div className=" z-0 bg flex min-h-screen bg-gray-50 justify-center w-full bg-opacity-40  items-center bg-gradient-to-t from-gray-500  via-white to-gray-200 rounded-md transition-colors duration-500">
      <div className="w-3/5 bg-white border-black border-opacity-10 border-10 p-12 shadow-2xl shadow-gray-800 opacity-100 front z-40">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-light mb-8">
            Create your Vehi-trader account
          </h2>
          <form>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className=" bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="inline-flex">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 ml-5"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-white mt-1 block w-full ml-5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Adresa
                </label>
                <input
                  type="address"
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                  className=" bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={addUser}
              className="w-full mt-6 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors duration-500"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
