import React from "react";
import { TailSpin } from "react-loader-spinner";

export const Loading = () => {
  return (
    <div className="loading-container">
      <h1 className="pulsate">Afarmacco</h1>
      <TailSpin color="#FFF" height={50} width={50} />
    </div>
  );
};
