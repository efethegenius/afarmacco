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

export const Antibiotics = () => {
  const [returnedExpenses, setReturnedExpenses] = useState([]);
  const [returnedAntibiotics, setReturnedAntibiotics] = useState([]);
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
  const [antibiotics, setAntibiotics] = useState({
    LastUpdated: "",
    Producer: "",
    Brand: "",
    Mediums: "",
    KgPerMl: "",
    Price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Price") {
      setAntibiotics((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setAntibiotics((prevState) => ({
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

    setAntibiotics((prevState) => ({
      ...prevState,
    }));
  };

  const newAntibiotics = async () => {
    const newData = await fetch("/create/antibiotics", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        ...antibiotics,
      }),
    }).then((res) => res.json());
    setReturnedData(newData[0]);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //getting the data from the database from the db-----------------------------------------
  const getAntibiotics = async () => {
    try {
      const antibiotics = await fetch("/api/all-antibiotics", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedAntibiotics(antibiotics);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAntibiotics();
  }, []);
  console.log(returnedAntibiotics);
  //   getting the data from the database from the db end-----------------------------------------

  let allAntibiotics = returnedAntibiotics.name;

  const sortAntibiotics =
    returnedAntibiotics.name && search
      ? returnedAntibiotics.name.filter((sortedAntibiotics) =>
          sortedAntibiotics.Brand.toLowerCase().includes(search.toLowerCase())
        )
      : allAntibiotics;

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
              <h2>Antibiotics</h2>
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
                <label htmlFor="producer">Producer</label>
                <input
                  id="producer"
                  type="text"
                  name="Producer"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="brand">Brand</label>
                <input
                  id="brand"
                  type="text"
                  name="Brand"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="mediums">Medium</label>
                <input
                  id="mediums"
                  type="text"
                  name="Mediums"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="kgperml">KG/ML</label>
                <input
                  id="kgperml"
                  type="text"
                  name="KgPerMl"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  type="number"
                  name="Price"
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
                    newAntibiotics();
                    setIsDocForm(false);
                    setTimeout(() => {
                      getAntibiotics();
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
              <h1>Antibiotics</h1>
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
            {returnedAntibiotics.name ? (
              <div className="all-farm-hands">
                <table>
                  <tbody>
                    <tr>
                      <th>Last Updated</th>
                      <th>Producer</th>
                      <th>Brand</th>
                      <th>Medium</th>
                      <th>KG/ML</th>
                      <th>Price(₦)</th>
                    </tr>
                  </tbody>
                  {returnedAntibiotics.name &&
                    sortAntibiotics.map((antibiotics) => {
                      const {
                        AntibioticsId,
                        LastUpdated,
                        Producer,
                        Brand,
                        Mediums,
                        KgPerMl,
                        Price,
                      } = antibiotics;
                      const newDate = `${new Date(
                        LastUpdated
                      ).toLocaleDateString()}`;
                      return (
                        <tbody key={AntibioticsId}>
                          <tr>
                            <td>{newDate}</td>
                            <td>{Producer}</td>
                            <td>{Brand}</td>
                            <td>{Mediums}</td>
                            <td>{KgPerMl}</td>
                            <td>{Price.toFixed(2)}</td>
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
