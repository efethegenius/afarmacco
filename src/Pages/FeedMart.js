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

export const FeedMart = () => {
  const [returnedExpenses, setReturnedExpenses] = useState([]);
  const [returnedFeedMart, setReturnedFeedMart] = useState([]);
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
  const [feedMart, setFeedMart] = useState({
    LastUpdated: "",
    Brand: "",
    Variant: "",
    Formulation: "",
    Price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Price") {
      setFeedMart((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setFeedMart((prevState) => ({
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

    setFeedMart((prevState) => ({
      ...prevState,
    }));
  };

  const newFeedMart = async () => {
    const newData = await fetch(
      "https://afarmacco-api.herokuapp.com/create/feed_mart",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          ...feedMart,
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
  const getFeedMart = async () => {
    try {
      const feedMart = await fetch(
        "https://afarmacco-api.herokuapp.com/api/all-feed-mart",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedFeedMart(feedMart);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeedMart();
  }, []);
  console.log(returnedFeedMart);
  //   getting the data from the database from the db end-----------------------------------------

  let allFeedMart = returnedFeedMart.name;

  const sortFeedMart =
    returnedFeedMart.name && search
      ? returnedFeedMart.name.filter((sortedFeedMart) =>
          sortedFeedMart.Brand.toLowerCase().includes(search.toLowerCase())
        )
      : allFeedMart;

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
              <h2>Feed Mart</h2>
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
                <label htmlFor="brand">Brand</label>
                <input
                  id="brand"
                  type="text"
                  name="Brand"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="variant">Variant</label>
                <input
                  id="variant"
                  type="text"
                  name="Variant"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="formulation">Formulation</label>
                <input
                  id="formulation"
                  type="text"
                  name="Formulation"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  type="text"
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
                    newFeedMart();
                    setIsDocForm(false);
                    setTimeout(() => {
                      getFeedMart();
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
              <h1>Feed Mart</h1>
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
            {returnedFeedMart.name ? (
              <div className="all-farm-hands">
                <table>
                  <tbody>
                    <tr>
                      <th>Last Updated</th>
                      <th>Brand</th>
                      <th>Variant</th>
                      <th>Formulation</th>
                      <th>Price(₦)</th>
                    </tr>
                  </tbody>
                  {returnedFeedMart.name &&
                    sortFeedMart.map((mart) => {
                      const {
                        MartId,
                        LastUpdated,
                        Brand,
                        Variant,
                        Formulation,
                        Price,
                      } = mart;
                      const newDate = `${new Date(
                        LastUpdated
                      ).toLocaleDateString()}`;
                      return (
                        <tbody key={MartId}>
                          <tr>
                            <td>{newDate}</td>
                            <td>{Brand}</td>
                            <td>{Variant}</td>
                            <td>{Formulation}</td>
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
