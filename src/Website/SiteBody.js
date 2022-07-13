import React, { useState, useEffect } from "react";
import { services } from "./data";
import woman from "./Photos/woman-chicken.png";
import phone from "./Photos/phone.png";
import laptop from "./Photos/laptop.png";
import { Slide } from "react-awesome-reveal";
import { Link as Links } from "react-router-dom";
import { TestimonialsPage } from "./TestimonialsPage";
import { BsMouse, BsArrowRight } from "react-icons/bs";
import Fade from "react-reveal/Fade";
import { FetchStates } from "../FetchOptions/FetchOptions";

import banner from "./banner.png";

export const SiteBody = () => {
  const [returnedData, setReturnedData] = useState([]);
  const [myServices, setMyServices] = useState(services);
  const [isFaq1, setIsFaq1] = useState(false);
  const [isFaq2, setIsFaq2] = useState(false);
  const [isFaq3, setIsFaq3] = useState(false);
  const [isFaq4, setIsFaq4] = useState(false);
  const [isFaq5, setIsFaq5] = useState(false);
  const [isDocForm, setIsDocForm] = useState(false);
  const [returnedFarmHands, setReturnedFarmHands] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);

  const { returnedStates } = FetchStates();

  const [farmHand, setFarmHand] = useState({
    FirstName: "",
    LastName: "",
    DOB: "",
    Address: "",
    NOK: "",
    MobilePhone: "",
    OfficePhone: "",
    Guarantor: "",
    GuarantorMobile: "",
    GuarantorOffice: "",
    GuarantorAddress: "",
    State: "",
    UpdType: 1,
    RecId: 0,
  });

  const newFarmHand = async () => {
    const newData = await fetch(
      "https://afarmacco-api.herokuapp.com/create/farm-hand",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          // accessToken: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          ...farmHand,
        }),
      }
    ).then((res) => res.json());
    setReturnedData(newData[0]);
    setIsConfirm(true);
  };

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    Array.from(document.querySelectorAll("select")).forEach(
      (select) => (select.value = "")
    );
  };

  let allStates;
  if (returnedStates.name) {
    allStates = returnedStates.name.map((state) => {
      return <option key={state.StateId}>{state.States}</option>;
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "UpdType" || name === "RecId") {
      setFarmHand((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setFarmHand((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="site-body-container">
      <div
        className={`${isConfirm ? "form-background" : "hide-background"}`}
        onClick={() => {
          setIsConfirm(false);
        }}
      >
        <div className="pay-confirm">
          <h4>
            Well Done! Your details have been stored on our database, you would
            be contacted if a farmer needs your services!
          </h4>
          <div className="btn-farm-confirm">
            <button className="btn-order" onClick={() => setIsConfirm(false)}>
              Got it
            </button>
            {/* <button className="btn-discard">Discard</button> */}
          </div>
        </div>
      </div>
      {isDocForm && (
        <div className="job-back" onClick={() => setIsDocForm(false)}></div>
      )}
      <div className={isDocForm ? "job-apply show-job-apply" : "job-apply"}>
        {/* <div className={isDocForm ? "doc-form show-doc-form" : "doc-form"}> */}
        <h2>Farm Hand</h2>
        <h4 className="farm-top">Personal Information</h4>
        <div className="trade-input">
          <label htmlFor="FirstNames">First Name</label>
          <input
            id="FirstNames"
            type="text"
            name="FirstName"
            onChange={handleChange}
          />
        </div>
        <div className="trade-input">
          <label htmlFor="LastNames">Last Name</label>
          <input
            id="LastNames"
            type="text"
            name="LastName"
            onChange={handleChange}
          />
        </div>
        <div className="trade-input">
          <label htmlFor="DOB">Date Of Birth</label>
          <input id="DOB" type="date" name="DOB" onChange={handleChange} />
        </div>
        <div className="trade-input">
          <label htmlFor="Address">Address</label>
          <input
            id="Address"
            type="text"
            name="Address"
            onChange={handleChange}
          />
        </div>
        <div className="trade-input">
          <label htmlFor="State">State</label>
          <select name="State" id="State" onChange={handleChange}>
            <option></option>
            {allStates}
          </select>
        </div>
        <div className="trade-input">
          <label htmlFor="NOK">Next Of Kin</label>
          <input id="NOK" type="text" name="NOK" onChange={handleChange} />
        </div>
        <div className="trade-input">
          <label htmlFor="MobilePhone">Mobile Phone</label>
          <input
            id="MobilePhone"
            type="text"
            name="MobilePhone"
            onChange={handleChange}
          />
        </div>
        <div className="trade-input">
          <label htmlFor="OfficePhone">Office Phone</label>
          <input
            id="OfficePhone"
            type="text"
            name="OfficePhone"
            onChange={handleChange}
          />
        </div>
        <h4 className="farm-top">Guarantor Information</h4>
        <div className="trade-input">
          <label htmlFor="Guarantor">Guarantor Name</label>
          <input
            id="Guarantor"
            type="text"
            name="Guarantor"
            onChange={handleChange}
          />
        </div>
        <div className="trade-input">
          <label htmlFor="GuarantorMobile">Guarantor Mobile No</label>
          <input
            id="GuarantorMobile"
            type="text"
            name="GuarantorMobile"
            onChange={handleChange}
          />
        </div>
        <div className="trade-input">
          <label htmlFor="GuarantorOffice">Guarantor Office No</label>
          <input
            id="GuarantorOffice"
            type="text"
            name="GuarantorOffice"
            onChange={handleChange}
          />
        </div>
        <div className="trade-input">
          <label htmlFor="GuarantorAddress">Guarantor Address</label>
          <input
            id="GuarantorAddress"
            type="text"
            name="GuarantorAddress"
            onChange={handleChange}
          />
        </div>
        <div className="trade-input upd-type">
          <label htmlFor="UpdType">Upd Type</label>
          <input
            type="number"
            name="UpdType"
            id="UpdType"
            onChange={handleChange}
          />
        </div>
        <div className="trade-input rec-id">
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
            onClick={() => {
              setIsDocForm(false);
              handleReset();
            }}
            className="btn-discard"
          >
            Discard
          </button>
          <button
            onClick={() => {
              newFarmHand();
              setIsDocForm(false);
              setTimeout(() => {
                handleReset();
              }, 1000);
            }}
            className="btn-order"
          >
            Submit
          </button>
        </div>
        {/* </div> */}
      </div>
      <div className="started-2">
        <div className="ft-head">
          <h4>
            The poultry industry is a critical segment of the livestock sector
            due to economic and health benefits. Through the various modules
            within this portal, we provide functional management tools in the
            vital areas of need to the farmer.
          </h4>
          <h4 className="ft-head-2">
            afarmaccco enables the farmer to maintain their day to day
            operational records and provides industry insights. The service
            helps to:
          </h4>
        </div>

        <Fade>
          <div className="started-2-details">
            <div className="features-gd-1">
              <div className="ft-col-1 ft-1">
                <h4>Record Transactions & Prepare Accounts</h4>
              </div>
              <div className="ft-det">
                <h4>
                  Keep basic records of financial transactions and focus on your
                  profitability or otherwise.
                </h4>
                <ul>
                  <li>Purchases: DOC, POL, Feeds, Assets, etc</li>
                  <li>
                    Sales: Mature chickes, POL, Dressed birds, Egg, Manure,
                    Assets disposals, etc
                  </li>
                  <li>Income statemenr and assets/liabilities</li>
                  <li>Pricing template for farm produce</li>
                </ul>
              </div>
            </div>
            <div className="features-gd-1">
              <div className="ft-col-1 ft-2">
                <h4>Produce Marketing & Sales</h4>
              </div>
              <div className="ft-det">
                <h4>Access market intelligence to drive sales of your birds</h4>
                <ul>
                  <li>Directory of Farmers'</li>
                  <li>Directory of off-takers</li>
                  <li>Produce maturity pipeline</li>
                  <li>Market/pricing updates</li>
                </ul>
              </div>
            </div>
            <div className="features-gd-1">
              <div className="ft-col-1 ft-3">
                <h4>Health Management & Production</h4>
              </div>
              <div className="ft-det">
                <h4>
                  Monitor and apply medications/vaccinations to secure your
                  birds against diseases with valid extension services.
                </h4>
                <ul>
                  <li>Calender for drug administration to birds</li>
                  <li>Reminder alerts to farmer</li>
                  <li>Extension services support to farmer</li>
                </ul>
              </div>
            </div>
            <div className="features-gd-1">
              <div className="ft-col-1 ft-4">
                <h4>Farm Hands Pool</h4>
              </div>
              <div className="ft-det">
                <h4>Sourcing and placement of farm hands</h4>
                <ul>
                  <li>Data base of available farm hands and their locations</li>
                  <li>Match farmer to labour</li>
                </ul>
              </div>
            </div>
          </div>
        </Fade>
      </div>
      <div className="footer-btn-container">
        <Links to="/register" className="f-btn-signup">
          Sign-Up
        </Links>
        <Links to="login" className="f-btn-login">
          Login
        </Links>
      </div>
      <button className="btn-apply" onClick={() => setIsDocForm(true)}>
        Need a job as a FARM HAND? Click here to apply
      </button>
      <img src={banner} alt="banner" className="banner" />
      <p className="copyright">© 2022 afarmacco&reg;</p>
    </div>
  );
};
