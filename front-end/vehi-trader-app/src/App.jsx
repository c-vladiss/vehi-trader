import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Cars from "./pages/Cars";
import CarPage from "./pages/CarPage";
import AddCar from "./pages/AddCar";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authenticate = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    console.log("user din app", user);

    if (storedUser && storedIsLoggedIn === "true") {
      try {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        // Clean up localStorage if there's a parsing error
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
      }
    }
  }, []);

  return (
    <div className="bg-gray-100 block h-full main-container">
      <Router>
        <Navbar
          user={user}
          logout={logout}
          isLoggedIn={isLoggedIn}
          login={authenticate}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cars"
            element={<Cars user={user} setUser={setUser} />}
          />
          <Route path="/anunt-nou" element={<AddCar user={user} />} />
          <Route
            path="/signup"
            element={<Signup onSignupConfirmation={authenticate} />}
          />
          {isLoggedIn && (
            <Route path="/profiles/:id" element={<Profile user={user} />} />
          )}
          <Route path="/cars/:carId" element={<CarPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
