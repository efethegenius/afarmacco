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

export const Farmgate = () => {
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
    Blc: 0,
    Bfc: 0,
    Nlc: 0,
    Nfc: 0,
    Clc: 0,
    Cfc: 0,
    Llc: 0,
    Lfc: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "Price" ||
      name === "Blc" ||
      name === "Bfc" ||
      name === "Nlc" ||
      name === "Nfc" ||
      name === "Clc" ||
      name === "Cfc" ||
      name === "Llc" ||
      name === "Lfc"
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
    const newData = await fetch("/create/farmgate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        ...farmgate,
      }),
    }).then((res) => res.json());
    setReturnedData(newData[0]);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //getting the data from the database from the db-----------------------------------------
  const getFarmgate = async () => {
    try {
      const farmgate = await fetch("/api/all-farmgate", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
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
          sortedFarmgate.Brand.toLowerCase().includes(search.toLowerCase())
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
            <h2>Farmgate Sale</h2>
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
              <label htmlFor="blc">Broiler LC/Kg</label>
              <input id="blc" type="text" name="Blc" onChange={handleChange} />
            </div>
            <div className="trade-input">
              <label htmlFor="bfc">Broiler FC/Kg</label>
              <input id="bfc" type="text" name="Bfc" onChange={handleChange} />
            </div>
            <div className="trade-input">
              <label htmlFor="nlc">Noiler LC/Kg</label>
              <input id="nlc" type="text" name="Nlc" onChange={handleChange} />
            </div>
            <div className="trade-input">
              <label htmlFor="nfc">Noiler FC/Kg</label>
              <input id="nfc" type="text" name="Nfc" onChange={handleChange} />
            </div>
            <div className="trade-input">
              <label htmlFor="Clc">Cockerel LC/Kg</label>
              <input id="clc" type="text" name="Clc" onChange={handleChange} />
            </div>
            <div className="trade-input">
              <label htmlFor="Cfc">Cockerel FC/Kg</label>
              <input id="cfc" type="text" name="Cfc" onChange={handleChange} />
            </div>
            <div className="trade-input">
              <label htmlFor="Llc">Layer LC/Kg</label>
              <input id="llc" type="text" name="Llc" onChange={handleChange} />
            </div>
            <div className="trade-input">
              <label htmlFor="Lfc">Layer FC/Kg</label>
              <input id="lfc" type="text" name="Lfc" onChange={handleChange} />
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
          <div className="expense-head">
            <button className="back-btn" onClick={() => history.goBack()}>
              <AiOutlineLeft /> Go back
            </button>
            <div className="expense-heading">
              <h1>Farmgate Sales</h1>
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
                    <th className="total total-head" colSpan="2">
                      Broiler
                    </th>
                    <th className="total total-head" colSpan="2">
                      Noiler
                    </th>
                    <th className="total total-head" colSpan="2">
                      Cockerel
                    </th>
                    <th className="total total-head" colSpan="2">
                      Layer
                    </th>
                    <tr></tr>
                    <tr>
                      <th>Last Updated</th>
                      <th>Farm</th>
                      <th>LC/Kg (₦)</th>
                      <th>FC/Kg (₦)</th>
                      <th>LC/Kg (₦)</th>
                      <th>FC/Kg (₦)</th>
                      <th>LC/Kg (₦)</th>
                      <th>FC/Kg (₦)</th>
                      <th>LC/Kg (₦)</th>
                      <th>FC/Kg (₦)</th>
                    </tr>
                  </tbody>
                  {returnedFarmgate.name &&
                    sortFarmgate.map((farmgate) => {
                      const {
                        FarmgateId,
                        LastUpdated,
                        Farm,
                        Blc,
                        Bfc,
                        Nlc,
                        Nfc,
                        Clc,
                        Cfc,
                        Llc,
                        Lfc,
                      } = farmgate;
                      const newDate = `${new Date(
                        LastUpdated
                      ).toLocaleDateString()}`;
                      return (
                        <tbody key={FarmgateId}>
                          <tr>
                            <td>{newDate}</td>
                            <td>{Farm}</td>
                            <td>{Blc.toFixed(2)}</td>
                            <td>{Bfc.toFixed(2)}</td>
                            <td>{Nlc.toFixed(2)}</td>
                            <td>{Nfc.toFixed(2)}</td>
                            <td>{Clc.toFixed(2)}</td>
                            <td>{Cfc.toFixed(2)}</td>
                            <td>{Llc.toFixed(2)}</td>
                            <td>{Lfc.toFixed(2)}</td>
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
