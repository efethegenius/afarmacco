import React from "react";
import { TailSpin } from "react-loader-spinner";
import Logo from "../Photos/Logo.png";

export const Loading = () => {
  return (
    <div className="loading-container">
      {/* <h1 className="pulsate">Afarmacco</h1> */}
      <img src={Logo} alt="Logo" className="pulsate" />
      <TailSpin color="#FFF" height={50} width={50} />
    </div>
  );
};
