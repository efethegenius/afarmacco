import React from "react";
import { UserLogin } from "../Components/UserLogin";

export const LoginPage = () => {
  return (
    <section className="register-container">
      <h1 className="register-logo">afarmacco&reg;</h1>
      <div className="signup-form animate__animated animate__fadeInDown">
        <UserLogin />
      </div>
    </section>
  );
};
