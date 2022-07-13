import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import "../Styles/FarmHands.css";
import { Expense } from "../Components/Expense";
import { BsFileEarmarkText } from "react-icons/bs";
import { Navbar } from "../Components/Navbar";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineQuestionCircle,
  AiOutlineLeft,
} from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { LoggedOut } from "../Components/LoggedOut";
import { Link } from "react-router-dom";
import { ExpenseTable } from "../Components/Tables/ExpenseTable";
import { Loading } from "../Components/Loading";
import { FetchStates } from "../FetchOptions/FetchOptions";

export const FarmHands = () => {
  const [returnedData, setReturnedData] = useState([]);
  const [returnedExpenses, setReturnedExpenses] = useState([]);
  const [returnedFarmHands, setReturnedFarmHands] = useState([]);
  const [returnedDeprDate, setReturnedDeprDate] = useState([]);
  const [returnedActiveCreditors, setReturnedActiveCreditors] = useState([]);
  const [isExpenseForm, setIsExpenseForm] = useState(false);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const { authState, setAuthState, upd, setUpd, setOpexTxn, opexTxn } =
    useContext(AuthContext);
  const [isNav, setIsNav] = useState(false);
  const [isFullReport, setIsFullReport] = useState(false);
  const [isDateFilter, setIsDateFilter] = useState(false);
  const [animState, setAnimState] = useState(true);
  const history = useHistory();
  const { returnedStates } = FetchStates();
  const [isDeprMsg, setIsDeprMsg] = useState(false);
  const [search, setSearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [isDocForm, setIsDocForm] = useState(false);
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

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // const handleReset = () => {
  //   Array.from(document.querySelectorAll("input")).forEach(
  //     (input) => (input.value = "")
  //   );
  //   Array.from(document.querySelectorAll("select")).forEach(
  //     (select) => (select.value = "")
  //   );

  //   setFarmHand((prevState) => ({
  //     ...prevState,
  //   }));
  // };

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
  console.log(returnedFarmHands);
  //getting the data from the database from the db end-----------------------------------------

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "UpdType" || name === "RecId") {
  //     setFarmHand((prevState) => ({
  //       ...prevState,
  //       [name]: parseInt(value),
  //     }));
  //     return;
  //   }
  //   setFarmHand((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const newFarmHand = async () => {
  //   const newData = await fetch("https://afarmacco-api.herokuapp.com/create/farm-hand", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //       Accept: "application/json",
  //       accessToken: localStorage.getItem("accessToken"),
  //     },
  //     body: JSON.stringify({
  //       ...farmHand,
  //     }),
  //   }).then((res) => res.json());
  //   setReturnedData(newData[0]);
  // };

  // const handleSubmit = () => {
  //   newFarmHand();
  // };

  useEffect(() => {
    if (upd) {
      setFarmHand((prevState) => ({
        ...prevState,
        UpdType: 1,
      }));
    }
  }, []);

  let allFarmHands = returnedFarmHands.name;

  const sortFarmHands =
    returnedFarmHands.name && search
      ? returnedFarmHands.name.filter((sortedFarmHands) =>
          sortedFarmHands.FirstName.toLowerCase().includes(search.toLowerCase())
        )
      : returnedFarmHands.name && stateSearch
      ? returnedFarmHands.name.filter(
          (sortedFarmHands) => sortedFarmHands.States === stateSearch
        )
      : allFarmHands;

  // const formatMoney = (n) => {
  //   return (Math.round(n * 100) / 100).toLocaleString();
  // };

  let allStates;
  if (returnedStates.name) {
    allStates = returnedStates.name.map((state) => {
      return <option key={state.StateId}>{state.States}</option>;
    });
  }

  return (
    <div className="expenses">
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
              <h1>FARM HANDS</h1>
            </div>
            <p> </p>
          </div>
          <div className="farm-hands-container">
            <div className="search-container">
              <input
                name="search"
                id="search"
                className="search"
                value={search}
                placeholder="Search by name"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="search-state">
                <p>Filter by State: </p>
                <select
                  name="stateSearch"
                  id="search"
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                >
                  <option></option>
                  {allStates}
                </select>
              </div>
            </div>
            {returnedFarmHands.name ? (
              <div className="full-farm-hands">
                {returnedFarmHands.name && sortFarmHands.length >= 1 ? (
                  sortFarmHands.map((farmHand) => {
                    const {
                      FarmerId,
                      FirstName,
                      LastName,
                      States,
                      MobilePhone,
                    } = farmHand;
                    return (
                      <Link
                        to={`/farm-hand/${FarmerId}`}
                        key={FarmerId}
                        className="farm-hand"
                      >
                        <h3>
                          {FirstName} {LastName}
                        </h3>
                        <p>{States}</p>
                        <p>{MobilePhone}</p>
                      </Link>
                    );
                  })
                ) : (
                  <h1>
                    There are no farm hands available in {stateSearch} yet...
                  </h1>
                )}
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
