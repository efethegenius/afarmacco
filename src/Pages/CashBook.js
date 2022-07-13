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

export const CashBook = () => {
  const [returnedExpenses, setReturnedExpenses] = useState([]);
  const [returnedCashBook, setReturnedCashBook] = useState([]);
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
  const [cashBook, setCashBook] = useState({
    TxnDate: "",
    TxnRef: "",
    TxnDesc: "",
    TxnType: "",
    Cash: 0,
    Bank1: 0,
    Bank2: 0,
    Bank3: 0,
    Debtor: "",
    Creditor: "",
    AccountType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "Cash" ||
      name === "Bank1" ||
      name === "Bank2" ||
      name === "Bank3"
    ) {
      setCashBook((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setCashBook((prevState) => ({
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

    setCashBook((prevState) => ({
      ...prevState,
    }));
  };

  const newCashBook = async () => {
    const newData = await fetch(
      "https://afarmacco-api.herokuapp.com/create/cash-book",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          ...cashBook,
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
  const getCashBook = async () => {
    try {
      const cashBook = await fetch(
        "https://afarmacco-api.herokuapp.com/api/all-cash-book",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedCashBook(cashBook);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCashBook();
  }, []);
  //   getting the data from the database from the db end-----------------------------------------

  let allCashBook = returnedCashBook.name;

  const sortCashBook =
    returnedCashBook.name && search
      ? returnedCashBook.filter((sortedCashBook) =>
          sortedCashBook.TxnRef.toLowerCase().includes(search.toLowerCase())
        )
      : allCashBook;

  console.log(returnedCashBook);

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
              <h2>Cash Book</h2>
              <div className="trade-input">
                <label htmlFor="lastupdated">Date</label>
                <input
                  id="lastupdated"
                  type="date"
                  name="TxnDate"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="producer">Ref</label>
                <input
                  id="farm"
                  type="text"
                  name="TxnRef"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="blc">Description</label>
                <select
                  id="blc"
                  type="text"
                  name="TxnDesc"
                  onChange={handleChange}
                >
                  <option></option>
                  <option>Sale</option>
                  <option>Other Income</option>
                  <option>Purchase DOC</option>
                  <option>Purchase Feed</option>
                  <option>Purchase Drug</option>
                  <option>Creditor</option>
                  <option>Debtor</option>
                </select>
              </div>
              {cashBook.TxnDesc === "Debtor" && (
                <div className="trade-input">
                  <label htmlFor="blc">Debtor Name</label>
                  <input
                    id="blc"
                    type="text"
                    name="Debtor"
                    onChange={handleChange}
                  />
                </div>
              )}
              {cashBook.TxnDesc === "Creditor" && (
                <div className="trade-input">
                  <label htmlFor="blc">Creditor Name</label>
                  <input
                    id="blc"
                    type="text"
                    name="Creditor"
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="trade-input">
                <label htmlFor="bfc">Transaction Type</label>
                <select
                  id="bfc"
                  type="text"
                  name="TxnType"
                  onChange={handleChange}
                >
                  <option></option>
                  <option>Debit Balance B/F</option>
                  <option>Credit Balance B/F</option>
                  <option>Receipt</option>
                  <option>Payment</option>
                </select>
              </div>
              <div className="trade-input">
                <label htmlFor="nlc">Account Type</label>
                <select
                  id="nlc"
                  type="text"
                  name="AccountType"
                  onChange={handleChange}
                >
                  <option></option>
                  <option>Cash</option>
                  <option>Bank1</option>
                  <option>Bank2</option>
                  <option>Bank3</option>
                </select>
              </div>
              <div className="trade-input">
                <label htmlFor="bfc">Cash</label>
                <input
                  id="bfc"
                  type="text"
                  name="Cash"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="bfc">Bank 1</label>
                <input
                  id="bfc"
                  type="text"
                  name="Bank1"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="bfc">Bank 2</label>
                <input
                  id="bfc"
                  type="text"
                  name="Bank2"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="bfc">Bank 3</label>
                <input
                  id="bfc"
                  type="text"
                  name="Bank3"
                  onChange={handleChange}
                />
              </div>
              {/* <div className="trade-input">
                <label htmlFor="nfc">Noiler FC/Kg</label>
                <input
                  id="nfc"
                  type="text"
                  name="Nfc"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="Clc">Cockerel LC/Kg</label>
                <input
                  id="clc"
                  type="text"
                  name="Clc"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="Cfc">Cockerel FC/Kg</label>
                <input
                  id="cfc"
                  type="text"
                  name="Cfc"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="Llc">Layer LC/Kg</label>
                <input
                  id="llc"
                  type="text"
                  name="Llc"
                  onChange={handleChange}
                />
              </div>
              <div className="trade-input">
                <label htmlFor="Lfc">Layer FC/Kg</label>
                <input
                  id="lfc"
                  type="text"
                  name="Lfc"
                  onChange={handleChange}
                />
              </div> */}
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
                    newCashBook();
                    setIsDocForm(false);
                    setTimeout(() => {
                      getCashBook();
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
              <h1>Cash Book</h1>
            </div>
            <div className="new-btn" onClick={() => setIsDocForm(!isDocForm)}>
              <div className="plus-circle">
                <HiOutlinePlus />
              </div>
              <p>New</p>
            </div>
          </div>
          <div className="farm-hands-container">
            {/* <input
              name="search"
              id="search"
              className="search"
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            /> */}
            {returnedCashBook.name ? (
              <div className="all-farm-hands">
                <table>
                  <tbody>
                    {/* <th id="total" className="total" colSpan="2"></th>
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
                    <tr></tr> */}
                    <tr>
                      <th>Date</th>
                      <th>Ref</th>
                      <th>Description</th>
                      <th>TransactionType</th>
                      <th>Account Type</th>
                      <th>Cash</th>
                      <th>Bank 1</th>
                      <th>Bank 2</th>
                      <th>Bank 3</th>
                    </tr>
                  </tbody>
                  {returnedCashBook.name &&
                    sortCashBook.map((cashBook) => {
                      const {
                        CashBookId,
                        TxnDate,
                        TxnRef,
                        TxnDesc,
                        TxnType,
                        Cash,
                        Bank1,
                        Bank2,
                        Bank3,
                        AccountType,
                      } = cashBook;
                      const newDate = `${new Date(
                        TxnDate
                      ).toLocaleDateString()}`;
                      return (
                        <tbody key={CashBookId}>
                          <tr>
                            <td>{newDate}</td>
                            <td>{TxnRef}</td>
                            <td>{TxnDesc}</td>
                            <td>{TxnType}</td>
                            <td>{AccountType}</td>
                            <td>{Cash}</td>
                            <td>{Bank1}</td>
                            <td>{Bank2}</td>
                            <td>{Bank3}</td>
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
