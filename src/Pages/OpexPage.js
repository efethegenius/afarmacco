import React, { useState, useEffect, useRef, useContext } from "react";
import { AiOutlineMenu, AiOutlineLeft } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
import { AuthContext } from "../helpers/AuthContext";
import { Navbar } from "../Components/Navbar";
import { LoggedOut } from "../Components/LoggedOut";
import "../Styles/opex.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export const OpexPage = () => {
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
              <h1>Operating Expenses</h1>
            </div>
            <p> </p>
          </div>
          <div className="all-opex">
            <div className="top-grid">
              <Link
                className="opex-opt doc-opt animate__animated animate__fadeInLeft"
                to="/doc"
              >
                <h2>Day Old Chicks</h2>
              </Link>
              <Link
                className="opex-opt drug-opt animate__animated animate__fadeInRight"
                to="/drug"
              >
                <h2>Drugs</h2>
              </Link>
            </div>
            <div className="bottom-grid">
              <Link
                to="/pol"
                className="opex-opt pol-opt animate__animated animate__fadeInLeft"
              >
                <h2>Layers (Point Of Lay)</h2>
              </Link>
              <Link
                to="/feed"
                className="opex-opt feed-opt animate__animated animate__fadeInRight"
              >
                <h2>Feeds</h2>
              </Link>
              <Link
                to="/expenses"
                className="opex-opt ex-opt animate__animated animate__fadeInRight"
              >
                <h2>Expenses</h2>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
