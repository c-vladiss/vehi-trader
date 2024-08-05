import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin, closeLoginDialog }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(""); // Clear previous error messages

    axios
      .post("http://localhost:8080/users/authenticate", { email, password })
      .then((response) => {
        const user = response.data.user;
        onLogin(user);
        console.log("Logged in as", user);
        closeLoginDialog();
      })
      .catch(() => {
        setError("Invalid email or password");
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 relative">
        <button
          onClick={closeLoginDialog}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2 text-orange-600">
            Salutare!
          </h1>
          <p className="text-orange-600 font-semibold text-center">
            Autentifică-te pe vehi-trader.ro !
          </p>
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-3 rounded-md hover:bg-purple-600 transition-colors duration-500"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
