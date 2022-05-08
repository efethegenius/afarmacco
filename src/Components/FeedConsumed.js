import React, { useState, useEffect, useContext } from "react";
import { FetchFeeds, FetchBirds } from "../FetchOptions/FetchOptions";
import { AuthContext } from "../helpers/AuthContext";

export const FeedConsumed = ({
  isFeedConsumedForm,
  setIsFeedConsumedForm,
  getAllFeedConsumed,
  animState,
  setAnimState,
}) => {
  const [returnedData, setReturnedData] = useState();
  const { returnedBirds } = FetchBirds();
  const [fieldErr, setFieldErr] = useState(false);
  const { returnedFeeds } = FetchFeeds();
  const { upd, setUpd, setOpexTxn, opexTxn } = useContext(AuthContext);

  const [consumed, setConsumed] = useState({
    ConsumptionDate: 0,
    LotNo: 0,
    FeedType: "",
    BirdType: "",
    Batch: 0,
    SizeQtyUsed: 0,
    BagQtyUsed: 0,
    Updtype: 1,
    RecId: 0,
  });

  const newConsumed = async () => {
    if (
      !consumed.Batch ||
      !consumed.BirdType ||
      !consumed.ConsumptionDate ||
      !consumed.FeedType ||
      !consumed.LotNo ||
      !consumed.BagQtyUsed
    ) {
      setFieldErr(true);
      setTimeout(function () {
        setFieldErr(false);
      }, 4000);
      return;
    }
    const newData = await fetch("/create/feed_consumed", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        ...consumed,
      }),
    }).then((res) => res.json());
    setReturnedData(newData[0]);
    setIsFeedConsumedForm(false);
    setAnimState(false);
    setTimeout(() => {
      setAnimState(true);
    }, 1000);
    setOpexTxn(true);
    setTimeout(() => {
      setOpexTxn(false);
    }, 4000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (
      name === "LotNo" ||
      name === "Batch" ||
      name === "SizeQtyUsed" ||
      name === "BagQtyUsed" ||
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

  const handleSubmit = () => {
    newConsumed();
    setTimeout(() => {
      getAllFeedConsumed();
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
  let feedTypes;
  if (returnedFeeds.name) {
    feedTypes = returnedFeeds.name.map((feed) => {
      return <option key={feed.FeedTypeId}>{feed.FeedName}</option>;
    });
  }

  return (
    <div
      className={`${
        isFeedConsumedForm && animState
          ? "feed-consumption show-feed-consumption animate__animated animate__fadeInDown"
          : !isFeedConsumedForm && animState
          ? "hide-feed-consumption"
          : "feed-consumption animate__animated animate__fadeOutUp"
      }`}
    >
      <section className="form-feed-consumption">
        <h2 className="form-head">Feed Consumption</h2>
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
            <label htmlFor="FeedType">Feed</label>
            <select name="FeedType" id="FeedType" onChange={handleChange}>
              <option></option>
              {feedTypes}
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
        <div className="input">
          <label htmlFor="SizeQtyUsed">size (Quantity used in kg)</label>
          <input
            type="number"
            name="SizeQtyUsed"
            id="SizeQtyUsed"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label htmlFor="BagQtyUsed">Bag (Quantity Used)</label>
          <input
            type="number"
            name="BagQtyUsed"
            id="BagQtyUsed"
            onChange={handleChange}
          />
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
        <div className="new-order-wrapper">
          <button
            className="btn-order"
            type="submit"
            onClick={() => {
              handleSubmit();

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
              setIsFeedConsumedForm(false);
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
