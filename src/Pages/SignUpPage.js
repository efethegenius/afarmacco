import React from "react";
import "../Styles/signup.css";
import { UserValidation } from "../Components/UserValidation";
import "animate.css";

export const SignUpPage = () => {
  return (
    <section className="register-container">
      <h1 className="register-logo">afarmacco&reg;</h1>
      <div className="signup-form animate__animated animate__fadeInDown">
        <UserValidation />
      </div>
    </section>
  );
};
