import React from "react";
import { TailSpin } from "react-loader-spinner";

export const Loading = () => {
  return (
    <div className="loading-container">
      <p>Loading...</p>
      <TailSpin color="#FFF" height={50} width={50} />
    </div>
  );
};
