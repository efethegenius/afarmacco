import React, { useState, useEffect, useRef, useContext } from "react";
import "../Styles/Drug.css";
import "../Styles/Meds.css";
import { Navbar } from "../Components/Navbar";
import { HiOutlinePlus } from "react-icons/hi";
import { AuthContext } from "../helpers/AuthContext";
import { LoggedOut } from "../Components/LoggedOut";
import { AiOutlineMenu } from "react-icons/ai";
import { BroilerMeds } from "../Components/BroilerMeds";
import { NoilerMeds } from "../Components/NoilerMeds";
import { CockerelMeds } from "../Components/CockerelMeds";
import { LayerMeds } from "../Components/LayerMeds";

export const Health = () => {
  const [isNav, setIsNav] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);
  const [isBroilerMed, setIsBroilerMed] = useState(false);
  const [isNoilerMed, setIsNoilerMed] = useState(false);
  const [isCockerelMed, setIsCockerelMed] = useState(false);
  const [isLayerMed, setIsLayerMed] = useState(false);

  return (
    <div className="drug">
      <Navbar isNav={isNav} setIsNav={setIsNav} />
      {isBroilerMed && <BroilerMeds setIsBroilerMed={setIsBroilerMed} />}
      {isNoilerMed && <NoilerMeds setIsNoilerMed={setIsNoilerMed} />}
      {isCockerelMed && <CockerelMeds setIsCockerelMed={setIsCockerelMed} />}
      {isLayerMed && <LayerMeds setIsLayerMed={setIsLayerMed} />}
      <div
        className={`${
          isBroilerMed || isLayerMed || isNoilerMed || isCockerelMed
            ? "form-background"
            : "hide-background"
        }`}
        onClick={() => {
          setIsBroilerMed(false);
          setIsNoilerMed(false);
          setIsCockerelMed(false);
          setIsLayerMed(false);
        }}
      ></div>
      {authState ? (
        <div className="drug-container">
          <div className="drug-head">
            <AiOutlineMenu className="ham" onClick={() => setIsNav(!isNav)} />
            <div className="drug-heading">
              <h1>Medication & Vaccination</h1>
            </div>
            <p> </p>
          </div>
          <div className="all-meds">
            <div
              className="med-container broiler-med-container animate__animated animate__fadeInLeft"
              onClick={() => setIsBroilerMed(!isBroilerMed)}
            >
              <h2>Broiler Meds</h2>
            </div>
            <div
              onClick={() => setIsNoilerMed(!isNoilerMed)}
              className="med-container noiler-med-container animate__animated animate__fadeInRight"
            >
              <h2>Noiler Meds</h2>
            </div>
            <div
              onClick={() => setIsCockerelMed(!isCockerelMed)}
              className="med-container cockerel-med-container animate__animated animate__fadeInLeft"
            >
              <h2>Cockerel Meds</h2>
            </div>
            <div
              onClick={() => setIsLayerMed(!isLayerMed)}
              className="med-container layer-med-container animate__animated animate__fadeInRight"
            >
              <h2>Layer Meds</h2>
            </div>
          </div>
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
