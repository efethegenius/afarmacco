import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import "../Styles/Income.css";
import { FrozenChickenSales } from "../Components/FrozenChickenSales";
import { OtherSales } from "../Components/OtherSales";
import { Navbar } from "../Components/Navbar";
import { HiOutlinePlus } from "react-icons/hi";
import { BsFileEarmarkText } from "react-icons/bs";
import { FrozenChickenTable } from "../Components/Tables/FrozenChickenTable";
import { OtherSalesTable } from "../Components/Tables/OtherSalesTable";
import { AuthContext } from "../helpers/AuthContext";
import { LoggedOut } from "../Components/LoggedOut";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose, AiOutlineLeft } from "react-icons/ai";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useHistory } from "react-router-dom";
import { Loading } from "../Components/Loading";

export const FrozenChickenPage = () => {
  const [returnedFrozenChickenSales, setReturnedFrozenChickenSales] = useState(
    []
  );
  const [returnedOtherSales, setReturnedOtherSales] = useState([]);
  const [returnedActiveDebtors, setReturnedActiveDebtors] = useState([]);
  const [isSaleToggle, setIsSaleToggle] = useState(true);
  const [isBirdForm, setIsBirdForm] = useState(false);
  const [animState, setAnimState] = useState(true);
  const [isOtherForm, setIsOtherForm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isNav, setIsNav] = useState(false);
  const [isFullReport, setIsFullReport] = useState(false);
  const history = useHistory();
  const { authState, setAuthState } = useContext(AuthContext);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // getting active debtors start-----------------------------------------------------
  const getActiveDebtors = async () => {
    try {
      const activeDebtors = await fetch(
        "https://afarmacco-api.herokuapp.com/api/active-debtors",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedActiveDebtors(activeDebtors);
    } catch (error) {
      console.log(error);
    }
  };
  // getting active debtors end-----------------------------------------------------

  // getting frozen chicken sales start-----------------------------------------------------
  const getAllFrozenChickenSales = async () => {
    try {
      const allFrozenChickenSales = await fetch(
        "/api/all-frozen-chicken-sales",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedFrozenChickenSales(allFrozenChickenSales);
    } catch (error) {
      console.log(error);
    }
  };
  // getting frozen chicken sales end-----------------------------------------------------

  // getting other sales start-----------------------------------------------------
  const getAllOtherSales = async () => {
    try {
      const allOtherSales = await fetch(
        "https://afarmacco-api.herokuapp.com/api/all-other-sales",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedOtherSales(allOtherSales);
    } catch (error) {
      console.log(error);
    }
  };
  // getting other sales end-----------------------------------------------------

  useEffect(() => {
    getAllFrozenChickenSales();
    getAllOtherSales();
    getActiveDebtors();
  }, []);
  // Top 7 List----------------------------------------------------------------------------------
  let miniFrozenChickenList;
  if (returnedFrozenChickenSales.name) {
    {
      miniFrozenChickenList = returnedFrozenChickenSales.name.map(
        (frozenChickenSale) => {
          const { SalesId, TxnDate, Qty, UnitPrice } = frozenChickenSale;
          const newDate = `${new Date(TxnDate).toLocaleDateString()}`;
          return (
            <tbody key={SalesId}>
              <tr>
                <td>{newDate}</td>
                <td>{Qty}</td>
                <td>{UnitPrice.toFixed(2)}</td>
              </tr>
            </tbody>
          );
        }
      );
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
            <td>{UnitPrice.toFixed(2)}</td>
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

  let activeDebtors;
  if (returnedActiveDebtors.name) {
    activeDebtors = returnedActiveDebtors.name.filter(
      (activeDebtor) =>
        activeDebtor.PurchaseType === "Frozen Chicken Sale" &&
        activeDebtor.Status === "UNPAID"
    );
  }

  let totalDebt;
  if (returnedActiveDebtors.name) {
    totalDebt = activeDebtors.reduce((a, v) => (a = a + v.Amount), 0);
  }

  return (
    <div className="income">
      {/* <Navbar isNav={isNav} setIsNav={setIsNav} /> */}
      {/* {(isBirdForm || isOtherForm || isFullReport) && ( */}
      {/* <div
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
      ></div> */}
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
            <button className="back-btn" onClick={() => history.goBack()}>
              <AiOutlineLeft /> Go back
            </button>
            <div className="income-heading">
              <h1>Frozen Chicken Sales</h1>
            </div>
            <div className="new-btn" onClick={() => setIsBirdForm(!isBirdForm)}>
              <div className="plus-circle">
                <HiOutlinePlus />
              </div>
              <p>New</p>
            </div>
          </div>
          <div className="all-income">
            <FrozenChickenSales
              isBirdForm={isBirdForm}
              setIsBirdForm={setIsBirdForm}
              getAllFrozenChickenSales={getAllFrozenChickenSales}
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
              (miniFrozenChickenList &&
              miniOtherList &&
              miniFrozenChickenList.length === 0 &&
              miniOtherList.length === 0 ? (
                <div className="empty-main-report">
                  <h1>There are no Income reports available yet</h1>
                  <p>
                    Create a new report by tapping the <span>NEW</span>{" "}
                    button...
                  </p>
                </div>
              ) : miniOtherList || miniFrozenChickenList ? (
                <div className="mini-list">
                  <div className="mini-list-container animate__animated animate__fadeIn">
                    <div className="all-mini-wrapper">
                      <div className="all-mini-list">
                        <div className="bird-mini-list">
                          <div className="mini-table">
                            <p className="title mini-title">
                              {miniFrozenChickenList &&
                              miniFrozenChickenList.length === 0
                                ? "You do not have a frozen chicken report"
                                : "Your most recent frozen chicken income:"}
                            </p>
                            <table>
                              <tbody>
                                <tr>
                                  <th>Date</th>
                                  <th>Qty</th>
                                  <th>Unit Price</th>
                                </tr>
                              </tbody>
                              {returnedFrozenChickenSales.name &&
                                miniFrozenChickenList.slice(0, 5)}
                            </table>
                          </div>
                          <button
                            className="view-report"
                            onClick={() => {
                              setIsFullReport(!isFullReport);
                              setIsSaleToggle(true);
                            }}
                          >
                            View full report
                          </button>
                        </div>
                        {/* <div className="other-mini-list">
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
                            View full report
                          </button>
                        </div> */}
                      </div>
                      <div className="income-info bird-sale-info">
                        {/* <div className="total-bird">
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
                        </div> */}
                        <p></p>
                      </div>
                    </div>
                    <div className="debtors">
                      <p className="title">Frozen chicken Debtors and Amount</p>
                      <div className="debtor-list-container animate__animated animate__fadeIn">
                        {activeDebtors && activeDebtors.length !== 0 ? (
                          activeDebtors.map((activeDebtor) => {
                            const { DebtorId, CustomerName, Amount } =
                              activeDebtor;
                            return (
                              <Link
                                to={`/debtor/${DebtorId}`}
                                className="debtor-list"
                                key={DebtorId}
                              >
                                {/* <div key={CustomerId}> */}
                                <p className="d-name">{CustomerName}</p>
                                <p className="debt-amount">
                                  {formatMoney(Amount)}.00
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
                          {formatMoney(totalDebt)}.00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Loading />
              ))}

            {isFullReport && (
              <div className="full-report">
                <div className="income-table-head">
                  <h3>
                    {isSaleToggle ? "Frozen Chicken Sales" : "Other sales"}
                  </h3>
                  <AiOutlineClose
                    className="btn-close"
                    onClick={() => setIsFullReport(false)}
                  />
                </div>
                {isSaleToggle && <FrozenChickenTable ref={componentRef} />}
                {!isSaleToggle && <OtherSalesTable ref={componentRef} />}

                <div className="btn-generate-container">
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn-generate"
                    table="table-to-xls"
                    filename={
                      !isSaleToggle
                        ? "Afarmacco-Other Sale"
                        : "Afarmacco-Frozen Chicken Sale"
                    }
                    sheet={!isSaleToggle ? "Other Sale" : "Frozen Chicken Sale"}
                    buttonText="Download as Excel"
                  />
                  <button onClick={handlePrint} className="btn-generate">
                    Generate Report <BsFileEarmarkText className="report" />
                  </button>
                </div>
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
