import SignupForm from "../components/SignUpForm";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = (onSignUpConfirmation) => {
  const navigate = useNavigate();
  const signup = async (user) => {
    navigate("/");
    axios.post("http://localhost:3001/users", user).then((response) => {
      onSignUpConfirmation(response.data);
    });
  };
  return (
    <div>
      <SignupForm onSignup={signup} />
    </div>
  );
};

export default Signup;
