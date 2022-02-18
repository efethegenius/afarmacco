import React, { useState, useEffect, useRef, useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
import { AuthContext } from "../helpers/AuthContext";
import { Navbar } from "../Components/Navbar";
import { LoggedOut } from "../Components/LoggedOut";
import "../Styles/opex.css";
import { Link } from "react-router-dom";

export const OpexPage = () => {
  const [isNav, setIsNav] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="drug">
      <Navbar isNav={isNav} setIsNav={setIsNav} />
      {authState ? (
        <div className="drug-container">
          <div className="drug-head">
            <AiOutlineMenu className="ham" onClick={() => setIsNav(!isNav)} />
            <div className="drug-heading">
              <h1>Operating Expenses</h1>
            </div>
            <p> </p>
          </div>
          <div className="all-opex">
            <div className="top-grid">
              <Link className="opex-opt doc-opt" to="/doc">
                <h2>Day Old Chicks</h2>
              </Link>
              <Link className="opex-opt drug-opt" to="/drug">
                <h2>Drugs</h2>
              </Link>
            </div>
            <Link to="/feed" className="opex-opt feed-opt">
              <h2>Feeds</h2>
            </Link>
          </div>
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
