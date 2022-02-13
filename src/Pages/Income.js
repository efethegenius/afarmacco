import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import "../Styles/Income.css";
import { BirdSales } from "../Components/BirdSales";
import { OtherSales } from "../Components/OtherSales";
import { Navbar } from "../Components/Navbar";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { BsFileEarmarkText } from "react-icons/bs";
import { BirdSalesTable } from "../Components/Tables/BirdSalesTable";
import { OtherSalesTable } from "../Components/Tables/OtherSalesTable";
import { AuthContext } from "../helpers/AuthContext";
import { LoggedOut } from "../Components/LoggedOut";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

export const Income = () => {
  const [returnedBirdSales, setReturnedBirdSales] = useState([]);
  const [returnedOtherSales, setReturnedOtherSales] = useState([]);
  const [returnedActiveDebtors, setReturnedActiveDebtors] = useState([]);
  const [isSaleToggle, setIsSaleToggle] = useState(true);
  const [isBirdForm, setIsBirdForm] = useState(false);
  const [animState, setAnimState] = useState(true);
  const [isOtherForm, setIsOtherForm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isNav, setIsNav] = useState(false);
  const [isFullReport, setIsFullReport] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // getting active debtors start-----------------------------------------------------
  const getActiveDebtors = async () => {
    try {
      const activeDebtors = await fetch("/api/active-debtors", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedActiveDebtors(activeDebtors);
    } catch (error) {
      console.log(error);
    }
  };
  // getting active debtors end-----------------------------------------------------

  // getting bird sales start-----------------------------------------------------
  const getAllBirdSales = async () => {
    try {
      const allBirdSales = await fetch("/api/all-bird-sales", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedBirdSales(allBirdSales);
    } catch (error) {
      console.log(error);
    }
  };
  // getting bird sales end-----------------------------------------------------

  // getting other sales start-----------------------------------------------------
  const getAllOtherSales = async () => {
    try {
      const allOtherSales = await fetch("/api/all-other-sales", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedOtherSales(allOtherSales);
    } catch (error) {
      console.log(error);
    }
  };
  // getting other sales end-----------------------------------------------------

  useEffect(() => {
    getAllBirdSales();
    getAllOtherSales();
    getActiveDebtors();
  }, []);

  // Top 7 List----------------------------------------------------------------------------------
  let miniBirdList;
  if (returnedBirdSales.name) {
    {
      miniBirdList = returnedBirdSales.name.map((birdSale) => {
        const { SalesId, SalesDate, BirdName, Qty, UnitPrice } = birdSale;
        const newDate = `${new Date(SalesDate).toLocaleDateString()}`;
        return (
          <tbody key={SalesId}>
            <tr>
              <td>{newDate}</td>
              <td>{BirdName}</td>
              <td>{Qty}</td>
              <td>{UnitPrice}</td>
            </tr>
          </tbody>
        );
      });
    }
  }
  let miniOtherList;
  if (returnedOtherSales.name) {
    miniOtherList = returnedOtherSales.name.map((otherSale) => {
      const { OtherSalesId, ItemDate, ItemName, Qty, UnitPrice } = otherSale;
      const newDate = `${new Date(ItemDate).toLocaleDateString()}`;
      return (
        <tbody key={OtherSalesId}>
          <tr>
            <td>{newDate}</td>
            <td>{ItemName}</td>
            <td className="qty">{Qty}</td>
            <td>{UnitPrice}</td>
          </tr>
        </tbody>
      );
    });
  }

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  // Top 7 List----------------------------------------------------------------------------------

  // broilers------------------------------------------------------------------
  let broilers;
  if (returnedBirdSales.name) {
    broilers = returnedBirdSales.name.filter(
      (broiler) => broiler.BirdName === "Broiler"
    );
  }
  let sumBroilers;
  if (broilers) {
    sumBroilers = broilers.reduce((a, v) => (a = a + v.Qty), 0);
  }

  // broilers------------------------------------------------------------------
  // noilers------------------------------------------------------------------
  let noilers;
  if (returnedBirdSales.name) {
    noilers = returnedBirdSales.name.filter(
      (noiler) => noiler.BirdName === "Noiler"
    );
  }
  let sumNoilers;
  if (noilers) {
    sumNoilers = noilers.reduce((a, v) => (a = a + v.Qty), 0);
  }
  // noilers------------------------------------------------------------------
  // cockerels------------------------------------------------------------------
  let cockerels;
  if (returnedBirdSales.name) {
    cockerels = returnedBirdSales.name.filter(
      (cockerel) => cockerel.BirdName === "Cockerel"
    );
  }
  let sumCockerels;
  if (cockerels) {
    sumCockerels = cockerels.reduce((a, v) => (a = a + v.Qty), 0);
  }
  // cockerels------------------------------------------------------------------
  // turkeys------------------------------------------------------------------
  let turkeys;
  if (returnedBirdSales.name) {
    turkeys = returnedBirdSales.name.filter(
      (turkey) => turkey.BirdName === "Turkey"
    );
  }
  let sumTurkeys;
  if (turkeys) {
    sumTurkeys = turkeys.reduce((a, v) => (a = a + v.Qty), 0);
  }
  // turkeys------------------------------------------------------------------
  // layers------------------------------------------------------------------
  let layers;
  if (returnedBirdSales.name) {
    layers = returnedBirdSales.name.filter(
      (layer) => layer.BirdName === "Layer"
    );
  }
  let sumLayers;
  if (layers) {
    sumLayers = layers.reduce((a, v) => (a = a + v.Qty), 0);
  }
  // layers------------------------------------------------------------------

  let activeDebtors;
  if (returnedActiveDebtors.name) {
    activeDebtors = returnedActiveDebtors.name.filter(
      (activeDebtor) =>
        (activeDebtor.PurchaseType === "Bird Sale" &&
          activeDebtor.Status === "UNPAID") ||
        (activeDebtor.PurchaseType === "Other Sale" &&
          activeDebtor.Status === "UNPAID")
    );
  }

  let totalDebt;
  if (returnedActiveDebtors.name) {
    totalDebt = activeDebtors.reduce((a, v) => (a = a + v.Amount), 0);
  }

  return (
    <div className="income">
      <Navbar isNav={isNav} setIsNav={setIsNav} />
      {/* {(isBirdForm || isOtherForm || isFullReport) && ( */}
      <div
        className={`${
          isBirdForm || isOtherForm ? "form-background" : "hide-background"
        }`}
        onClick={() => {
          setIsBirdForm(false);
          setIsOtherForm(false);
          setIsFullReport(false);
          setAnimState(false);
          setTimeout(() => {
            setAnimState(true);
          }, 1000);
        }}
      ></div>
      {/* )} */}
      <div
        className={`${isFullReport ? "form-background" : "hide-background"}`}
        onClick={() => {
          setIsFullReport(false);
        }}
      ></div>
      {authState ? (
        <div className="income-container">
          <div className="income-head">
            <AiOutlineMenu className="ham" onClick={() => setIsNav(!isNav)} />
            <div className="income-heading">
              <h1>Income</h1>
              {/* <p>Manage all your income here</p> */}
            </div>
            <div
              className="new-btn"
              onClick={() => setShowOptions(!showOptions)}
            >
              <div className="plus-circle">
                <HiOutlinePlus />
              </div>
              <p>New</p>
              <div
                className={`${
                  showOptions ? "new-options show-new-options" : "new-options"
                }`}
              >
                <button
                  className={`${isBirdForm && "new-active"}`}
                  onClick={() => {
                    setIsBirdForm(!isBirdForm);
                    setIsOtherForm(false);
                  }}
                >
                  Bird Sale
                </button>
                <button
                  className={`${isOtherForm && "new-active"}`}
                  onClick={() => {
                    setIsOtherForm(!isOtherForm);
                    setIsBirdForm(false);
                  }}
                >
                  Other Sale
                </button>
              </div>
            </div>
          </div>
          <div className="all-income">
            <BirdSales
              isBirdForm={isBirdForm}
              setIsBirdForm={setIsBirdForm}
              getAllBirdSales={getAllBirdSales}
              setIsBirdForm={setIsBirdForm}
              getActiveDebtors={getActiveDebtors}
              animState={animState}
              setAnimState={setAnimState}
            />
            <OtherSales
              isOtherForm={isOtherForm}
              setIsOtherForm={setIsOtherForm}
              getAllOtherSales={getAllOtherSales}
              setIsBirdForm={setIsBirdForm}
              getActiveDebtors={getActiveDebtors}
              animState={animState}
              setAnimState={setAnimState}
            />

            {!isFullReport &&
              (miniBirdList &&
              miniOtherList &&
              miniBirdList.length === 0 &&
              miniOtherList.length === 0 ? (
                <div className="empty-main-report">
                  <h1>There are no Income reports available yet</h1>
                  <p>
                    Create a new report by tapping the <span>NEW</span>{" "}
                    button...
                  </p>
                </div>
              ) : miniOtherList || miniBirdList ? (
                <div className="mini-list">
                  <div className="mini-list-container animate__animated animate__fadeIn">
                    <div className="all-mini-wrapper">
                      <div className="all-mini-list">
                        <div className="bird-mini-list">
                          <div className="mini-table">
                            <p className="title mini-title">
                              {miniBirdList && miniBirdList.length === 0
                                ? "You do not have a bird income report"
                                : "Your most recent bird sale income:"}
                            </p>
                            <table>
                              <tbody>
                                <tr>
                                  <th>Date</th>
                                  <th>Bird</th>
                                  <th>Qty</th>
                                  <th>Unit Price</th>
                                </tr>
                              </tbody>
                              {returnedBirdSales.name &&
                                miniBirdList.slice(0, 5)}
                            </table>
                          </div>
                          <button
                            className="view-report"
                            onClick={() => {
                              setIsFullReport(!isFullReport);
                              setIsSaleToggle(true);
                            }}
                          >
                            View full report <BsFileEarmarkText />
                          </button>
                        </div>
                        <div className="other-mini-list">
                          <div className="mini-table">
                            <p className="title mini-title">
                              {miniOtherList && miniOtherList.length === 0
                                ? "You do not have an other income report"
                                : "Your most recent other income:"}
                            </p>
                            <table>
                              <tbody>
                                <tr>
                                  <th>Date</th>
                                  <th>Item</th>
                                  <th>Qty</th>
                                  <th>Unit Price</th>
                                </tr>
                              </tbody>
                              {returnedOtherSales.name &&
                                miniOtherList.slice(0, 5)}
                            </table>
                          </div>
                          <button
                            className="view-report"
                            onClick={() => {
                              setIsFullReport(!isFullReport);
                              setIsSaleToggle(false);
                            }}
                          >
                            View full report <BsFileEarmarkText />
                          </button>
                        </div>
                      </div>
                      <div className="income-info bird-sale-info">
                        <div className="total-bird">
                          <p className="head">Total broilers sold:</p>
                          <p>{formatMoney(sumBroilers)}</p>
                        </div>
                        <div className="total-bird">
                          <p className="head">Total Noilers sold:</p>
                          <p>{formatMoney(sumNoilers)}</p>
                        </div>
                        <div className="total-bird">
                          <p className="head">Total Cockerel sold</p>
                          <p>{formatMoney(sumCockerels)}</p>
                        </div>
                        <div className="total-bird">
                          <p className="head">Total Turkey sold</p>
                          <p>{formatMoney(sumTurkeys)}</p>
                        </div>
                        <div className="total-bird">
                          <p className="head">Total Layers sold</p>
                          <p>{formatMoney(sumLayers)}</p>
                        </div>
                        <div className="total-bird">
                          <p className="head">Total Birds sold</p>
                          <p>
                            {formatMoney(
                              sumLayers +
                                sumBroilers +
                                sumNoilers +
                                sumCockerels +
                                sumTurkeys
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="debtors">
                      <p className="title">Active debtors and Amount</p>
                      <div className="debtor-list-container animate__animated animate__fadeIn">
                        {activeDebtors && activeDebtors.length !== 0 ? (
                          activeDebtors.map((activeDebtor) => {
                            const { CustomerId, CustomerName, Amount } =
                              activeDebtor;
                            return (
                              <Link
                                to={`/debtor/${CustomerId}`}
                                className="debtor-list"
                                key={CustomerId}
                              >
                                {/* <div key={CustomerId}> */}
                                <p className="d-name">{CustomerName}</p>
                                <p className="debt-amount">
                                  ₦ {formatMoney(Amount)}.00
                                </p>
                                {/* </div> */}
                              </Link>
                            );
                          })
                        ) : (
                          <p className="title">
                            You do not have any debtor yet. When you do, they
                            will appear here
                          </p>
                        )}
                      </div>
                      <div className="debtor-list">
                        <p className="title">TOTAL DEBT:</p>
                        <p className="debt-amount">
                          ₦ {formatMoney(totalDebt)}.00
                        </p>
                      </div>
                      {/* <button className="view-all">View All</button> */}
                    </div>
                  </div>
                </div>
              ) : (
                "Loading, please wait..."
              ))}

            {isFullReport && (
              <div className="full-report">
                <div className="income-table-head">
                  <h3>{isSaleToggle ? "Bird sales" : "Other sales"}</h3>
                </div>
                {isSaleToggle && <BirdSalesTable ref={componentRef} />}
                {!isSaleToggle && <OtherSalesTable ref={componentRef} />}

                <button onClick={handlePrint} className="btn-generate">
                  Generate Report <BsFileEarmarkText className="report" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
