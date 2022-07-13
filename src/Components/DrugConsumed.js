import React, { useState, useContext, useEffect } from "react";
import { FetchDrugs, FetchBirds } from "../FetchOptions/FetchOptions";
import { AuthContext } from "../helpers/AuthContext";

export const DrugConsumed = ({
  isDrugConsumedForm,
  setIsDrugConsumedForm,
  getAllDrugConsumed,
  animState,
  setAnimState,
}) => {
  const [returnedData, setReturnedData] = useState();
  const { returnedBirds } = FetchBirds();
  const { returnedDrugs } = FetchDrugs();
  const [fieldErr, setFieldErr] = useState(false);
  const { upd, setUpd, setOpexTxn, opexTxn } = useContext(AuthContext);

  const [consumed, setConsumed] = useState({
    ConsumptionDate: 0,
    LotNo: 0,
    DrugName: "",
    BirdType: "",
    Batch: 0,
    SizeQtyUsed: 0,
    SatchetQtyUsed: 0,
    Unit: "",
    DrugForm: "",
    Updtype: 1,
    RecId: 0,
  });

  const newConsumed = async () => {
    if (
      !consumed.Batch ||
      !consumed.BirdType ||
      !consumed.ConsumptionDate ||
      !consumed.DrugName ||
      !consumed.SatchetQtyUsed
    ) {
      setFieldErr(true);
      setTimeout(function () {
        setFieldErr(false);
      }, 4000);
      return;
    }
    const newData = await fetch(
      "https://afarmacco-api.herokuapp.com/create/drug_consumed",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          ...consumed,
        }),
      }
    ).then((res) => res.json());
    setReturnedData(newData[0]);
    setIsDrugConsumedForm(false);
    setAnimState(false);
    setTimeout(() => {
      setAnimState(true);
    }, 1000);
    setOpexTxn(true);
    setTimeout(() => {
      setOpexTxn(false);
    }, 4000);
  };

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    Array.from(document.querySelectorAll("select")).forEach(
      (select) => (select.value = "")
    );

    setConsumed((prevState) => ({
      ...prevState,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (
      name === "LotNo" ||
      name === "Batch" ||
      name === "SizeQtyUsed" ||
      name === "SatchetQtyUsed" ||
      name === "UpdType" ||
      name === "RecId"
    ) {
      setConsumed((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setConsumed((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    newConsumed();
    setTimeout(() => {
      getAllDrugConsumed();
    }, 1500);
  };

  useEffect(() => {
    if (upd) {
      setConsumed((prevState) => ({
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
  let drugTypes;
  if (returnedDrugs.name) {
    drugTypes = returnedDrugs.name.map((drug) => {
      return <option key={drug.DrugTypeId}>{drug.DrugName}</option>;
    });
  }

  return (
    <div
      className={`${
        isDrugConsumedForm && animState
          ? "drug-consumed animate__animated animate__fadeInDown"
          : !isDrugConsumedForm && animState
          ? "hide-drug-consumed"
          : "drug-consumed animate__animated animate__fadeOutUp"
      }`}
    >
      <section className="form-drug-consumed">
        <h2 className="form-head">Drug Consumption</h2>
        {fieldErr && (
          <p className="form-err animate__animated animate__shakeX">
            All required fields must be filled
          </p>
        )}
        <div className="input">
          <label htmlFor="ConsumptionDate">Date</label>
          <input
            type="date"
            name="ConsumptionDate"
            id="ConsumptionDate"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label htmlFor="LotNo">Lot No</label>
          <input
            type="number"
            name="LotNo"
            id="LotNo"
            onChange={handleChange}
          />
        </div>
        <div className="bird-type-container">
          <div className="input">
            <label htmlFor="DrugName">Drug</label>
            <select name="DrugName" id="DrugName" onChange={handleChange}>
              <option></option>
              {drugTypes}
            </select>
          </div>
          <div className="input">
            <label htmlFor="BirdType">Bird</label>
            <select name="BirdType" id="BirdType" onChange={handleChange}>
              <option></option>
              {birdTypes}
            </select>
          </div>
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
        <div className="double-input">
          <div className="input">
            <label htmlFor="SizeQtyUsed">Size (Quantity used)</label>
            <input
              type="number"
              name="SizeQtyUsed"
              id="SizeQtyUsed"
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <label htmlFor="Unit">Unit</label>
            <select type="text" name="Unit" id="Unit" onChange={handleChange}>
              <option></option>
              <option>Kg</option>
              <option>Grams</option>
              <option>Milligrams</option>
              <option>Litres</option>
              <option>Centilitres</option>
              <option>Millilitres</option>
            </select>
          </div>
        </div>
        <div className="input">
          <label htmlFor="DrugForm">Drug Type (Sachet, Bag, Bottle)</label>
          <select
            type="text"
            name="DrugForm"
            id="DrugForm"
            onChange={handleChange}
          >
            <option></option>
            <option>Satchet</option>
            <option>Bag</option>
            <option>Bottle</option>
          </select>
        </div>
        <div className="input">
          <label htmlFor="SatchetQtyUsed">Quantity Used</label>
          <input
            type="number"
            name="SatchetQtyUsed"
            id="SatchetQtyUsed"
            onChange={handleChange}
          />
        </div>
        <div className="input upd-type">
          <label htmlFor="UpdType">UpdType</label>
          <input
            type="number"
            name="UpdType"
            id="UpdType"
            onChange={handleChange}
          />
        </div>
        <div className="input rec-id">
          <label htmlFor="RecId">RecId</label>
          <input
            type="number"
            name="RecId"
            id="RecId"
            onChange={handleChange}
          />
        </div>
        <div className="new-order-wrapper">
          <button
            className="btn-order"
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
              setTimeout(() => {
                handleReset();
              }, 1000);
            }}
          >
            Create
          </button>
          <button
            className="btn-discard"
            onClick={() => {
              setIsDrugConsumedForm(false);
              setAnimState(false);
              setTimeout(() => {
                setAnimState(true);
              }, 1000);
              handleReset();
            }}
          >
            Discard
          </button>
        </div>
      </section>
      <div className="advert">Place Adverts Here</div>
    </div>
  );
};
