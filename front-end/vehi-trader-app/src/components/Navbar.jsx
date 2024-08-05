import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Navbar = ({ user, isLoggedIn, logout, login }) => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openLoginDialog = () => {
    setIsDialogOpen(true);
  };

  const closeLoginDialog = () => {
    setIsDialogOpen(false);
  };

  const navigateSellCar = () => {
    if (!isLoggedIn) {
      navigate("/signup");
    } else {
      navigate("/anunt-nou");
    }
  };

  const navigateHome = () => {
    navigate("/");
  };

  const navigateSignUp = () => {
    navigate("/signup");
  };

  const navigateProfile = () => {
    if (user && user._id) {
      navigate("/profiles/" + user._id);
    }
  };

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-4 py-2">
      <div className="justify-items-center inline-flex">
        <div
          className=" flex items-center hover:bg-gradient-to-r from-purple-500 via-beige to-orange-600 rounded-md transition-colors duration-500 text-center justify-center w-fit pl-7 mr-5"
          style={{
            hover: "rounded-sm shadow-md transition-colors duration-500",
          }}
        >
          <h1
            onClick={navigateHome}
            className="bg-gradient-to-r from-purple-500 via-beige to-orange-600 inline-block text-transparent bg-clip-text font-extrabold text-3xl mr-10 hover:cursor-pointer hover:text-white transition duration-500"
          >
            VEHI-TRADER
          </h1>
        </div>
        <span> </span>
        <div className="flex items-center space-x-4">
          <a
            href="/cars"
            className="bg-gradient-to-r from-purple-500 via-beige-500 to-orange-600 inline-block text-transparent bg-clip-text font-extrabold text-l hover:cursor-pointer"
          >
            AUTOTURISME
          </a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ fill: "rgba(245, 100, 70, 1)" }}
          >
            <path d="M23.5 7c.276 0 .5.224.5.5v.511c0 .793-.926.989-1.616.989l-1.086-2h2.202zm-1.441 3.506c.639 1.186.946 2.252.946 3.666 0 1.37-.397 2.533-1.005 3.981v1.847c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1h-13v1c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1.847c-.608-1.448-1.005-2.611-1.005-3.981 0-1.414.307-2.48.946-3.666.829-1.537 1.851-3.453 2.93-5.252.828-1.382 1.262-1.707 2.278-1.889 1.532-.275 2.918-.365 4.851-.365s3.319.09 4.851.365c1.016.182 1.45.507 2.278 1.889 1.079 1.799 2.101 3.715 2.93 5.252zm-16.059 2.994c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm10 1c0-.276-.224-.5-.5-.5h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5zm2.941-5.527s-.74-1.826-1.631-3.142c-.202-.298-.515-.502-.869-.566-1.511-.272-2.835-.359-4.441-.359s-2.93.087-4.441.359c-.354.063-.667.267-.869.566-.891 1.315-1.631 3.142-1.631 3.142 1.64.313 4.309.497 6.941.497s5.301-.184 6.941-.497zm2.059 4.527c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-18.298-6.5h-2.202c-.276 0-.5.224-.5.5v.511c0 .793.926.989 1.616.989l1.086-2z" />
          </svg>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <a
              onClick={navigateProfile}
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
            >
              Favorite ({user?.favoriteCars?.length || 0})
            </a>
            <button
              onClick={navigateProfile}
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300 bg-transparent border-none cursor-pointer"
            >
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
              </svg>
            </button>

            <button
              onClick={onLogout}
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300 bg-transparent border-none cursor-pointer"
            >
              Delogare
            </button>
          </>
        ) : (
          <>
            <button
              onClick={openLoginDialog}
              className="bg-gradient-to-r from-purple-500 via-beige-500 to-orange-600 inline-block text-transparent bg-clip-text font-extrabold text-l hover:cursor-pointer"
            >
              Autentifică-te
            </button>
            <a
              onClick={navigateSignUp}
              className="bg-gradient-to-r from-purple-500 via-beige-500 to-orange-600 inline-block text-transparent bg-clip-text font-extrabold text-l mr-10 hover:cursor-pointer"
            >
              Înregistrează-te
            </a>
          </>
        )}
        <button
          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-purple-600 via-beige transition-colors duration-500 focus:outline-none f"
          onClick={navigateSellCar}
        >
          Vinde acum
        </button>
      </div>
      {isDialogOpen && (
        <Login onLogin={login} closeLoginDialog={closeLoginDialog} />
      )}
    </nav>
  );
};

export default Navbar;
