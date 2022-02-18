import React, { useState, useEffect, useContext } from "react";
import { FetchBirds } from "../FetchOptions/FetchOptions";
import { AuthContext } from "../helpers/AuthContext";

export const DocMortality = ({
  isMortalityForm,
  getAllDocMortality,
  animState,
  setAnimState,
  setIsMortalityForm,
}) => {
  const [returnedData, setReturnedData] = useState();
  const { returnedBirds } = FetchBirds();
  const [fieldErr, setFieldErr] = useState(false);
  const { upd, setUpd } = useContext(AuthContext);

  const [mortality, setMortality] = useState({
    MortalityDate: 0,
    BirdType: "",
    Batch: 0,
    Qty: 0,
    Updtype: 1,
    RecId: 0,
  });

  const newMortality = async () => {
    if (
      !mortality.Batch ||
      !mortality.BirdType ||
      !mortality.MortalityDate ||
      !mortality.Qty
    ) {
      setFieldErr(true);
      setTimeout(function () {
        setFieldErr(false);
      }, 4000);
      return;
    }
    const newData = await fetch(
      "https://afarmacco-api.herokuapp.com/create/doc_mortality",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          ...mortality,
        }),
      }
    ).then((res) => res.json());
    setReturnedData(newData[0]);
    setIsMortalityForm(false);
    setAnimState(false);
    setTimeout(() => {
      setAnimState(true);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (
      name === "Batch" ||
      name === "Qty" ||
      name === "UpdType" ||
      name === "RecId"
    ) {
      setMortality((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setMortality((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    newMortality();
    setTimeout(() => {
      getAllDocMortality();
    }, 1500);
  };

  useEffect(() => {
    if (upd) {
      setMortality((prevState) => ({
        ...prevState,
        UpdType: 1,
      }));
    }
  }, []);

  let birdTypes;
  if (returnedBirds.name) {
    birdTypes = returnedBirds.name.map((bird) => {
      return <option key={bird.BirdTypeId}>{bird.BirdName}</option>;
    });
  }

  return (
    <div
      className={`${
        isMortalityForm && animState
          ? "mortality animate__animated animate__fadeInDown"
          : !isMortalityForm && animState
          ? "hide-mortality"
          : "mortality animate__animated animate__fadeOutUp"
      }`}
    >
      <section className="form-mortality">
        <h2 className="form-head">Day Old Chicks Mortality</h2>
        {fieldErr && (
          <p className="form-err animate__animated animate__shakeX">
            All fields must be filled
          </p>
        )}
        <div className="input">
          <label htmlFor="MortalityDate">Date</label>
          <input
            type="date"
            name="MortalityDate"
            id="MortalityDate"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label htmlFor="BirdType">Bird</label>
          <select name="BirdType" id="BirdType" onChange={handleChange}>
            <option></option>
            {birdTypes}
          </select>
        </div>
        <div className="input">
          <label htmlFor="Batch">Batch</label>
          <input
            type="number"
            name="Batch"
            id="Batch"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label htmlFor="Qty">Quantity Died</label>
          <input type="number" name="Qty" id="Qty" onChange={handleChange} />
        </div>
        <div className="input upd-type">
          <label htmlFor="UpdType">Upd Type</label>
          <input
            type="number"
            name="UpdType"
            id="UpdType"
            onChange={handleChange}
          />
        </div>
        <div className="input rec-id">
          <label htmlFor="RecId">Rec Id</label>
          <input
            type="number"
            name="RecId"
            id="RecId"
            onChange={handleChange}
          />
        </div>
      </section>
      <div className="new-order-wrapper">
        <button
          className="btn-order"
          type="submit"
          onClick={() => {
            handleSubmit();
          }}
        >
          Create
        </button>
        <button
          className="btn-discard"
          onClick={() => {
            setIsMortalityForm(false);
            setAnimState(false);
            setTimeout(() => {
              setAnimState(true);
            }, 1000);
          }}
        >
          Discard
        </button>
      </div>
    </div>
  );
};
