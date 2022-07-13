import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import "../Styles/DocSales.css";
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

export const FarmgateEggs = () => {
  const [returnedExpenses, setReturnedExpenses] = useState([]);
  const [returnedFarmgate, setReturnedFarmgate] = useState([]);
  const [returnedData, setReturnedData] = useState();
  const [returnedDeprDate, setReturnedDeprDate] = useState([]);
  const [returnedActiveCreditors, setReturnedActiveCreditors] = useState([]);
  const [isDocForm, setIsDocForm] = useState(false);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);
  const [isNav, setIsNav] = useState(false);
  const [isFullReport, setIsFullReport] = useState(false);
  const [isDateFilter, setIsDateFilter] = useState(false);
  const [animState, setAnimState] = useState(true);
  const history = useHistory();
  const [isDeprMsg, setIsDeprMsg] = useState(false);
  const [search, setSearch] = useState("");
  const [farmgate, setFarmgate] = useState({
    LastUpdated: "",
    Farm: "",
    BCrate: 0,
    NCrate: 0,
    CCrate: 0,
    LCrate: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "Price" ||
      name === "BCrate" ||
      name === "NCrate" ||
      name === "CCrate" ||
      name === "LCrate"
    ) {
      setFarmgate((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setFarmgate((prevState) => ({
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

    setFarmgate((prevState) => ({
      ...prevState,
    }));
  };

  const newFarmgate = async () => {
    const newData = await fetch(
      "https://afarmacco-api.herokuapp.com/create/farmgate-eggs",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          ...farmgate,
        }),
      }
    ).then((res) => res.json());
    setReturnedData(newData[0]);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //getting the data from the database from the db-----------------------------------------
  const getFarmgate = async () => {
    try {
      const farmgate = await fetch(
        "https://afarmacco-api.herokuapp.com/api/all-farmgate-eggs",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedFarmgate(farmgate);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFarmgate();
  }, []);
  //   getting the data from the database from the db end-----------------------------------------

  let allFarmgate = returnedFarmgate.name;

  const sortFarmgate =
    returnedFarmgate.name && search
      ? returnedFarmgate.name.filter((sortedFarmgate) =>
          sortedFarmgate.Farm.toLowerCase().includes(search.toLowerCase())
        )
      : allFarmgate;

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

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
          <div className={isDocForm ? "doc-form show-doc-form" : "doc-form"}>
            <div className="form-wrapper">
              <h2>Farmgate-Eggs Sale</h2>
              <div className="trade-input">
                <label htmlFor="lastupdated">Last Updated</label>
                <input
                  id="lastupdated"
                  type="date"
                  name="LastUpdated"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="producer">Farm</label>
                <input
                  id="farm"
                  type="text"
                  name="Farm"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="blc">Broiler Price / Crate</label>
                <input
                  id="blc"
                  type="text"
                  name="BCrate"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="nlc">Noiler Price / Crate</label>
                <input
                  id="nlc"
                  type="text"
                  name="NCrate"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="Clc">Cockerel Price / Crate</label>
                <input
                  id="clc"
                  type="text"
                  name="CCrate"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="Llc">Layer Price / Crate</label>
                <input
                  id="llc"
                  type="text"
                  name="LCrate"
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
                    newFarmgate();
                    setIsDocForm(false);
                    setTimeout(() => {
                      getFarmgate();
                    }, 1500);
                    setTimeout(() => {
                      handleReset();
                    }, 1000);
                  }}
                  className="btn-order"
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="advert">Place Adverts Here</div>
          </div>
          <div className="expense-head">
            <button className="back-btn" onClick={() => history.goBack()}>
              <AiOutlineLeft /> Go back
            </button>
            <div className="expense-heading">
              <h1>Farmgate:Eggs Sales</h1>
            </div>
            <div className="new-btn" onClick={() => setIsDocForm(!isDocForm)}>
              <div className="plus-circle">
                <HiOutlinePlus />
              </div>
              <p>New</p>
            </div>
          </div>
          <div className="farm-hands-container">
            <input
              name="search"
              id="search"
              className="search"
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            {returnedFarmgate.name ? (
              <div className="all-farm-hands">
                <table>
                  <tbody>
                    <th id="total" className="total" colSpan="2"></th>
                    <th className="total total-head" colSpan="1">
                      Broiler
                    </th>
                    <th className="total total-head" colSpan="1">
                      Noiler
                    </th>
                    <th className="total total-head" colSpan="1">
                      Cockerel
                    </th>
                    <th className="total total-head" colSpan="1">
                      Layer
                    </th>
                    <tr></tr>
                    <tr>
                      <th>Last Updated</th>
                      <th>Farm</th>
                      <th>Price/Crate (₦)</th>
                      <th>Price/Crate (₦)</th>
                      <th>Price/Crate (₦)</th>
                      <th>Price/Crate (₦)</th>
                    </tr>
                  </tbody>
                  {returnedFarmgate.name &&
                    sortFarmgate.map((farmgate) => {
                      const {
                        FarmgateId,
                        LastUpdated,
                        Farm,
                        BCrate,
                        NCrate,
                        CCrate,
                        LCrate,
                      } = farmgate;
                      const newDate = `${new Date(
                        LastUpdated
                      ).toLocaleDateString()}`;
                      return (
                        <tbody key={FarmgateId}>
                          <tr>
                            <td>{newDate}</td>
                            <td>{Farm}</td>
                            <td>{BCrate.toFixed(2)}</td>
                            <td>{NCrate.toFixed(2)}</td>
                            <td>{CCrate.toFixed(2)}</td>
                            <td>{LCrate.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      );
                    })}
                </table>
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
