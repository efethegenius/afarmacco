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

export const DocSales = () => {
  const [returnedExpenses, setReturnedExpenses] = useState([]);
  const [returnedDocSales, setReturnedDocSales] = useState([]);
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
  const [docSale, setDocSale] = useState({
    LastUpdated: "",
    Hatchery: "",
    Broiler: 0,
    Noiler: 0,
    Cockerel: 0,
    Layer: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "Broiler" ||
      name === "Noiler" ||
      name === "Cockerel" ||
      name === "Layer"
    ) {
      setDocSale((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setDocSale((prevState) => ({
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

    setDocSale((prevState) => ({
      ...prevState,
    }));
  };

  const newDocSale = async () => {
    const newData = await fetch(
      "https://afarmacco-api.herokuapp.com/create/doc_sales",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          ...docSale,
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
  const getDocSales = async () => {
    try {
      const docSales = await fetch(
        "https://afarmacco-api.herokuapp.com/api/all-doc-sales",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedDocSales(docSales);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDocSales();
  }, []);
  console.log(returnedDocSales);
  //   getting the data from the database from the db end-----------------------------------------

  let allDocSales = returnedDocSales.name;

  const sortDocSales =
    returnedDocSales.name && search
      ? returnedDocSales.name.filter((sortedDocSales) =>
          sortedDocSales.Hatchery.toLowerCase().includes(search.toLowerCase())
        )
      : allDocSales;

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
              <h2>Day Old Chick Sale</h2>
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
                <label htmlFor="hatchery">Hatchery</label>
                <input
                  id="hatchery"
                  type="text"
                  name="Hatchery"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="broiler">Broiler Price</label>
                <input
                  id="broiler"
                  type="number"
                  name="Broiler"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="noiler">Noiler Price</label>
                <input
                  id="noiler"
                  type="number"
                  name="Noiler"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="cockerel">Cockerel Price</label>
                <input
                  id="cockerel"
                  type="number"
                  name="Cockerel"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="layer">Layer Price</label>
                <input
                  id="layer"
                  type="number"
                  name="Layer"
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
                    newDocSale();
                    setIsDocForm(false);
                    setTimeout(() => {
                      getDocSales();
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
              <h1>Day-Old-Chicks Sales</h1>
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
            {returnedDocSales.name ? (
              <div className="all-farm-hands">
                <table>
                  <tbody>
                    <tr>
                      <th>Last Updated</th>
                      <th>Hatchery</th>
                      <th>Broiler (₦)</th>
                      <th>Noiler (₦)</th>
                      <th>Cockerel (₦)</th>
                      <th>Layer (₦)</th>
                    </tr>
                  </tbody>
                  {returnedDocSales.name &&
                    sortDocSales.map((docSale) => {
                      const {
                        SalesId,
                        LastUpdated,
                        Hatchery,
                        Broiler,
                        Noiler,
                        Cockerel,
                        Layer,
                      } = docSale;
                      const newDate = `${new Date(
                        LastUpdated
                      ).toLocaleDateString()}`;
                      return (
                        <tbody key={SalesId}>
                          <tr>
                            <td>{newDate}</td>
                            <td>{Hatchery}</td>
                            <td>{Broiler.toFixed(2)}</td>
                            <td>{Noiler.toFixed(2)}</td>
                            <td>{Cockerel.toFixed(2)}</td>
                            <td>{Layer.toFixed(2)}</td>
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
