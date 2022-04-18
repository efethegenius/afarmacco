import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import "../Styles/Expense.css";
import { Navbar } from "../Components/Navbar";
import { AuthContext } from "../helpers/AuthContext";
import { AiOutlineMenu, AiOutlineLeft } from "react-icons/ai";
import { LoggedOut } from "../Components/LoggedOut";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Loading } from "../Components/Loading";

export const NewFarmHand = () => {
  const [returnedActiveDebtors, setReturnedActiveDebtors] = useState([]);
  const [returnedData, setReturnedData] = useState();
  const { authState, setAuthState, upd } = useContext(AuthContext);
  const [isNav, setIsNav] = useState(false);
  const [isFullReport, setIsFullReport] = useState(false);
  const history = useHistory();
  const componentRef = useRef();

  const [farmHand, setFarmHand] = useState({
    FirstName: "",
    LastName: "",
    DOB: 0,
    Address: "",
    MobilePhone: "",
    OfficePhone: "",
    NOK: "",
    Guarantor: "",
    GuarantorMobile: "",
    GuarantorOffice: "",
    GuarantorAddress: "",
    State: "",
    UpdType: 1,
    RecId: 0,
  });

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

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  const newFarmHand = async () => {
    const newData = await fetch("/create/farm-hand", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        ...farmHand,
      }),
    }).then((res) => res.json());
    setReturnedData(newData[0]);
  };

  const handleSubmit = () => {
    newFarmHand();
  };

  useEffect(() => {
    if (upd) {
      setFarmHand((prevState) => ({
        ...prevState,
        UpdType: 1,
      }));
    }
  }, []);

  return (
    <div className="expenses">
      {/* <Navbar isNav={isNav} setIsNav={setIsNav} /> */}
      <div
        className={`${isFullReport ? "form-background" : "hide-background"}`}
        onClick={() => {
          setIsFullReport(false);
        }}
      ></div>

      {authState ? (
        <div className="expense-container">
          <div className="expense-head">
            <button className="back-btn" onClick={() => history.goBack()}>
              <AiOutlineLeft /> Go back
            </button>
            <div className="expense-heading">
              <h1>New Farm Hand</h1>
            </div>
            <p> </p>
          </div>
          <div className="new-hands-container">
            <p>New farm hand</p>
            <input
              type="text"
              name="FirstName"
              id="FirstName"
              onChange={handleChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="LastName"
              id="LastName"
              onChange={handleChange}
              placeholder="Last Name"
            />
            <input
              type="date"
              name="DOB"
              id="DOB"
              onChange={handleChange}
              placeholder="DOB"
            />
            <input
              type="text"
              name="Address"
              id="Address"
              onChange={handleChange}
              placeholder="Address"
            />
            <input
              type="text"
              name="MobilePhone"
              id="MobilePhone"
              onChange={handleChange}
              placeholder="Mobile Phone"
            />
            <input
              type="text"
              name="OfficePhone"
              id="OfficePhone"
              onChange={handleChange}
              placeholder="Office Phone"
            />
            <input
              type="text"
              name="NOK"
              id="NOK"
              onChange={handleChange}
              placeholder="Next of kin"
            />
            <input
              type="text"
              name="Guarantor"
              id="Guarantor"
              onChange={handleChange}
              placeholder="Guarantor"
            />
            <input
              type="text"
              name="GuarantorMobile"
              id="GuarantorMoble"
              onChange={handleChange}
              placeholder="Guarantor Mobile"
            />
            <input
              type="text"
              name="GuarantorOffice"
              id="GuarantorOffice"
              onChange={handleChange}
              placeholder="Guarantor Office"
            />
            <input
              type="text"
              name="GuarantorAddress"
              id="GuarantorAddress"
              onChange={handleChange}
              placeholder="Guarantor Address"
            />
            <input
              type="text"
              name="State"
              id="State"
              onChange={handleChange}
              placeholder="State"
            />
            <input
              type="number"
              name="UpdType"
              id="UpdType"
              onChange={handleChange}
              placeholder="Upd"
            />
            <input
              type="number"
              name="RecId"
              id="RecId"
              onChange={handleChange}
              placeholder="Rec"
            />

            <button
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
