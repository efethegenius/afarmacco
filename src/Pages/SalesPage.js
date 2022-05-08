import React, { useState, useEffect, useRef, useContext } from "react";
import { AiOutlineMenu, AiOutlineLeft } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
import { AuthContext } from "../helpers/AuthContext";
import { Navbar } from "../Components/Navbar";
import { LoggedOut } from "../Components/LoggedOut";
import "../Styles/opex.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export const SalesPage = () => {
  const [isNav, setIsNav] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);
  const history = useHistory();
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="drug">
      {/* <Navbar isNav={isNav} setIsNav={setIsNav} /> */}
      {authState ? (
        <div className="drug-container">
          <div className="drug-head">
            <button className="back-btn" onClick={() => history.goBack()}>
              <AiOutlineLeft /> Go back
            </button>
            <div className="drug-heading">
              <h1>Sales</h1>
            </div>
            <p> </p>
          </div>
          <div className="all-opex">
            <div className="top-grid">
              <Link
                className="opex-opt doc-opt animate__animated animate__fadeInLeft"
                to="/income"
              >
                <h2>Live Bird Sales</h2>
              </Link>
              <Link
                className="opex-opt egg-opt animate__animated animate__fadeInRight"
                to="/egg-sale"
              >
                <h2>Egg Sales</h2>
              </Link>
            </div>
            <Link
              className="opex-opt frozen-opt animate__animated animate__fadeInRight"
              to="/frozen-chickens"
            >
              <h2>Frozen Chicken</h2>
            </Link>
          </div>
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
