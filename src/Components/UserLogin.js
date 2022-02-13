import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { Link, useHistory } from "react-router-dom";

export const UserLogin = () => {
  const [returnedData, setReturnedData] = useState([]);
  const { setAuthState } = useContext(AuthContext);
  const [userLogin, setUserLogin] = useState({
    Email: "",
    SignOnName: "",
    UserPassword: "",
  });

  let history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setUserLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const newLogin = async () => {
    try {
      const newData = await fetch("/get_login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...userLogin,
        }),
      }).then((res) => res.json());

      //storing our accessToken to the local storage if there is no error
      if (newData.error) {
        alert(newData.error);
      } else {
        localStorage.setItem("accessToken", newData);
        setAuthState(true);
        history.push("/");
      }

      console.log(newData);
      setReturnedData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newLogin();
  };

  return (
    <div className="user-validation">
      <div className="validation-header">
        <h2>Sign in to your account</h2>
      </div>
      <div className="user-validation-wrapper">
        {/* <div className="input input-2">
          <label htmlFor="Email">Email</label>
          <input type="email" name="Email" id="Email" onChange={handleChange} />
        </div> */}
        <div className="input input-2">
          <label htmlFor="SignOnName">Username</label>
          <input
            type="text"
            name="SignOnName"
            id="SignOnName"
            onChange={handleChange}
          />
        </div>
        <div className="input input-2">
          <label htmlFor="UserPassword">Password</label>
          <input
            type="password"
            name="UserPassword"
            id="UserPassword"
            onChange={handleChange}
          />
        </div>
        <button
          className="btn-create"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Sign in
        </button>
        <p className="redirect-login">
          Not a member yet? <Link to="/register">sign-up here</Link>
        </p>
      </div>
    </div>
  );
};
