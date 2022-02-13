import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export const UserValidation = () => {
  const [returnedData, setReturnedData] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userValidation, setUserValidation] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    SignOnName: "",
    UserPassword: "",
    // Action: 2,
  });

  let history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (name === "Action") {
      setUserValidation((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setUserValidation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const newUser = async () => {
    const newData = await fetch("/create/validation", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...userValidation,
      }),
    }).then((res) => res.json());
    console.log(newData);
    setReturnedData(newData[0]);
    history.push("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newUser();
  };

  // const handleRegister = () => {
  //   //changing the value of the action when the button is clicked
  //   setUserValidation((prevState) => ({
  //     ...prevState,
  //     Action: 1,
  //   }));
  //   setRegister(true);
  // };

  return (
    <div className="user-validation">
      <div className="validation-header">
        {/* <h2>Create an account</h2> */}
        <h2>Let's get you set up</h2>
      </div>
      <div className="user-validation-wrapper">
        <div className="double-input">
          <div className="input input-2">
            <label htmlFor="FirstName">First Name</label>
            <input
              type="text"
              name="FirstName"
              id="FirstName"
              onChange={handleChange}
            />
          </div>
          <div className="input input-2">
            <label htmlFor="LastName">Last Name</label>
            <input
              type="text"
              name="LastName"
              id="LastName"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input input-2">
          <label htmlFor="Email">Email</label>
          <input type="email" name="Email" id="Email" onChange={handleChange} />
        </div>
        <div className="input input-2">
          <label htmlFor="SignOnName">Username</label>
          <input
            type="text"
            name="SignOnName"
            id="SignOnName"
            onChange={handleChange}
          />
        </div>
        <div className="double-input">
          <div className="input input-2">
            <label htmlFor="UserPassword">Password</label>
            <input
              type="Password"
              name="UserPassword"
              id="UserPassword"
              onChange={handleChange}
            />
          </div>
          <div className="input input-2">
            <label htmlFor="ConfirmPassord">Confirm Password</label>
            <input
              type="Password"
              name="ConfirmPassword"
              id="ConfirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="btn-create"
        >
          Create Account
        </button>
        <p className="redirect-login">
          Already have an account? <Link to="/login">login here</Link>
        </p>
      </div>
    </div>
  );
};
