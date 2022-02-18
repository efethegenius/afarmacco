import React from "react";
import { Link } from "react-router-dom";
import loggedOut from "../Photos/pale-472.png";

export const LoggedOut = () => {
  return (
    <div className="not-logged-in">
      <h1 className="log-out-logo">Afarmacco</h1>
      <img src={loggedOut} alt="logged out image" />
      <h1>Oops!</h1>
      <h1>You're Not Logged In...</h1>
      <p>
        Have an account? <Link to="/login">Login</Link>
      </p>
      <p>
        Don't have an account yet? <Link to="/register">Sign up here</Link>
      </p>
    </div>
  );
};
