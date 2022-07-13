import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { useHistory } from "react-router-dom";
import "../Styles/Debtor.css";
import { AiOutlineLeft } from "react-icons/ai";
import { Loading } from "../Components/Loading";

export const FarmHand = () => {
  const [returnedFarmHands, setReturnedFarmHands] = useState([]);
  const [returnedData, setReturnedData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [officePhone, setOfficePhone] = useState("");
  const [nok, setNok] = useState("");
  const [guarantor, setGuarantor] = useState("");
  const [guarantorMobile, setGuarantorMobile] = useState("");
  const [guarantorOffice, setGuarantorOffice] = useState("");
  const [guarantorAddress, setGuarantorAddress] = useState("");
  const [states, setStates] = useState("");
  const { id } = useParams();
  const history = useHistory();
  const [isConfirm, setIsConfirm] = useState(false);

  //getting the data from the database from the db-----------------------------------------
  const getFarmHands = async () => {
    try {
      const farmHands = await fetch(
        "https://afarmacco-api.herokuapp.com/api/all-farm-hands",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedFarmHands(farmHands);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFarmHands();
  }, []);
  //getting the data from the database from the db end-----------------------------------------

  useEffect(() => {
    if (returnedFarmHands.name) {
      const farmHands = returnedFarmHands.name.find(
        (farmHand) => farmHand.FarmerId === parseInt(id)
      );
      setFirstName(farmHands.FirstName);
      setLastName(farmHands.LastName);
      setDob(farmHands.DOB);
      setAddress(farmHands.Address);
      setMobilePhone(farmHands.MobilePhone);
      setOfficePhone(farmHands.OfficePhone);
      setNok(farmHands.NOK);
      setGuarantor(farmHands.Guarantor);
      setGuarantorMobile(farmHands.GuarantorMobile);
      setGuarantorOffice(farmHands.guarantorOffice);
      setGuarantorAddress(farmHands.GuarantorAddress);
      setStates(farmHands.States);
    }
  }, [id, returnedFarmHands.name]);

  return (
    <div className="income">
      {/* <Navbar /> */}
      <div className="expense-container">
        <div className="expense-head">
          <button className="back-btn" onClick={() => history.goBack()}>
            <AiOutlineLeft /> Go back
          </button>
          <div className="expense-heading">
            <h1>FARM HAND</h1>
          </div>
          <div>
            <p></p>
          </div>
        </div>
        {returnedFarmHands.name ? (
          <div className="farm-hand-details-container">
            <div className="farm-hand-head">
              <h2>Personal Information</h2>
            </div>

            <div className="farm-hand-details">
              <div className="farm-hand-name">
                <h3>
                  {firstName} {lastName}
                </h3>
              </div>
              <div className="hand-detail">
                <div className="detail-1">
                  <h5>Date Of Birth </h5>
                  <p>{dob}</p>
                </div>
                <div className="detail-2">
                  <h5>Mobile </h5>
                  <p>{mobilePhone}</p>
                </div>
              </div>
              <div className="hand-detail">
                <div>
                  <h5>Office </h5>
                  <p>{officePhone}</p>
                </div>
                <div>
                  <h5>Next Of Kin </h5>
                  <p>{nok}</p>
                </div>
              </div>
              <div className="hand-detail">
                <div>
                  <h5>State </h5>
                  <p>{states}</p>
                </div>
                <div>
                  <h5>Address </h5>
                  <p>{address}</p>
                </div>
              </div>
            </div>
            <div className="farm-hand-head guarantor-head">
              <h2>Guarantor Information</h2>
            </div>

            <div className="farm-hand-details">
              <div className="hand-detail">
                <div>
                  <h5>Guarantor Name </h5>
                  <p>{guarantor}</p>
                </div>
                <div>
                  <h5>Mobile </h5>
                  <p>{guarantorMobile}</p>
                </div>
              </div>
              <div className="hand-detail">
                <div>
                  <h5>Office line </h5>
                  <p>{guarantorOffice}</p>
                </div>
                <div>
                  <h5>Address </h5>
                  <p>{guarantorAddress}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
