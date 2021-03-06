import { Capex } from "../Components/Capex";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import "../Styles/Drug.css";
import { Navbar } from "../Components/Navbar";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { BsFileEarmarkText } from "react-icons/bs";
import { AuthContext } from "../helpers/AuthContext";
import { LoggedOut } from "../Components/LoggedOut";
import { CapexPurchaseTable } from "../Components/Tables/CapexPurchaseTable";
import { AiOutlineMenu, AiOutlineClose, AiOutlineLeft } from "react-icons/ai";
import { CapexDisposalTable } from "../Components/Tables/CapexDisposalTable";
import { Link } from "react-router-dom";
import { Loading } from "../Components/Loading";
import { useHistory } from "react-router-dom";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export const CapexPage = () => {
  const [returnedCapexs, setReturnedCapexs] = useState([]);
  const [isCapexForm, setIsCapexForm] = useState(false);
  const [returnedActiveDebtors, setReturnedActiveDebtors] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const [showOptions, setShowOptions] = useState(false);
  const [isCapexToggle, setIsCapexToggle] = useState(true);
  const [isFullReport, setIsFullReport] = useState(false);
  const [isNav, setIsNav] = useState(false);
  const [animState, setAnimState] = useState(true);
  const [returnedActiveCreditors, setReturnedActiveCreditors] = useState([]);
  const history = useHistory();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // getting active creditors start-----------------------------------------------------
  const getActiveCreditors = async () => {
    try {
      const activeCreditors = await fetch(
        "https://afarmacco-api.herokuapp.com/api/active-creditors",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedActiveCreditors(activeCreditors);
    } catch (error) {
      console.log(error);
    }
  };
  // getting active creditors end-----------------------------------------------------
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

  // getting capex start-----------------------------------------------------
  const getCapexs = async () => {
    try {
      const capexs = await fetch(
        "https://afarmacco-api.herokuapp.com/api/capexs",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedCapexs(capexs);
    } catch (error) {
      console.log(error);
    }
  };
  // getting Capex-----------------------------------------------------

  // Top 7 List----------------------------------------------------------------------------------
  let miniPurchaseList;
  if (returnedCapexs.name) {
    miniPurchaseList = returnedCapexs.name.map((capex) => {
      const { FAId, PurchaseDate, FACode, AssetTypeDesc, FACost, StatusDesc } =
        capex;
      const newDate = `${new Date(PurchaseDate).toLocaleDateString()}`;
      return (
        <tbody key={FAId}>
          <tr>
            <td>{newDate}</td>
            <td>{FACode}</td>
            <td>{AssetTypeDesc}</td>
            <td>{FACost.toFixed(2)}</td>
            <td>{StatusDesc}</td>
          </tr>
        </tbody>
      );
    });
  }

  let disposedItems;
  if (returnedCapexs.name) {
    disposedItems = returnedCapexs.name.filter(
      (capex) => capex.StatusDesc === "Disposed"
    );
  }

  let miniDisposalList;
  if (disposedItems) {
    miniDisposalList = disposedItems.map((disposed) => {
      const { FAId, PurchaseDate, DisposalDate, FACode, FACost, SaleValue } =
        disposed;
      const newDate = `${new Date(PurchaseDate).toLocaleDateString()}`;
      const newDate2 = `${new Date(DisposalDate).toLocaleDateString()}`;
      return (
        <tbody key={FAId}>
          <tr>
            <td>{newDate}</td>
            <td>{newDate2}</td>
            <td>{FACode}</td>
            <td>{FACost.toFixed(2)}</td>
            <td>{SaleValue.toFixed(2)}</td>
          </tr>
        </tbody>
      );
    });
  }
  // Top 7 List----------------------------------------------------------------------------------

  useEffect(() => {
    getCapexs();
    getActiveCreditors();
    getActiveDebtors();
  }, []);

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  let activeCreditors;
  if (returnedActiveCreditors.name) {
    activeCreditors = returnedActiveCreditors.name.filter(
      (activeCreditor) =>
        activeCreditor.PurchaseType === "Capex Purchase" &&
        activeCreditor.Status === "UNPAID"
    );
  }

  let activeDebtors;
  if (returnedActiveDebtors.name) {
    activeDebtors = returnedActiveDebtors.name.filter(
      (activeDebtor) =>
        activeDebtor.PurchaseType === "Capex Disposal" &&
        activeDebtor.Status === "UNPAID"
    );
  }
  return (
    <div className="drug">
      {/* <Navbar isNav={isNav} setIsNav={setIsNav} /> */}
      {/* <div
        className={`${isCapexForm ? "form-background" : "hide-background"}`}
        onClick={() => {
          setIsCapexForm(false);
          setIsFullReport(false);
          setAnimState(false);
          setTimeout(() => {
            setAnimState(true);
          }, 1000);
        }}
      ></div> */}
      <div
        className={`${isFullReport ? "form-background" : "hide-background"}`}
        onClick={() => {
          setIsFullReport(false);
        }}
      ></div>
      {authState ? (
        <div className="drug-container">
          <div className="drug-head">
            <button className="back-btn" onClick={() => history.goBack()}>
              <AiOutlineLeft /> Go back
            </button>
            <div className="drug-heading">
              <h1>Capex</h1>
              {/* <p>Manage all your drugs transactions here</p> */}
            </div>
            <div
              className="new-btn"
              onClick={() => {
                setIsCapexForm(!isCapexForm);
              }}
            >
              <div className="plus-circle">
                <HiOutlinePlus />
              </div>
              <p>New</p>
            </div>
          </div>
          <div className="all-drug">
            <Capex
              isCapexForm={isCapexForm}
              setIsCapexForm={setIsCapexForm}
              getCapexs={getCapexs}
              animState={animState}
              setAnimState={setAnimState}
              getActiveCreditors={getActiveCreditors}
              getActiveDebtors={getActiveDebtors}
            />
            {!isFullReport &&
              (miniPurchaseList &&
              miniDisposalList &&
              miniPurchaseList.length === 0 &&
              miniDisposalList.length === 0 ? (
                <div className="empty-main-report">
                  <h1>There are no Capex reports available yet</h1>
                  <p>
                    Create a new report by tapping the <span>NEW</span>{" "}
                    button...
                  </p>
                </div>
              ) : miniPurchaseList || miniDisposalList ? (
                <div className="mini-list">
                  <div className="mini-list-container animate__animated animate__fadeIn">
                    <div className="all-mini-wrapper all-capex-mini-wrapper">
                      <div className="all-mini-list all-capex-mini-list">
                        <div className="bird-mini-list capex-mini">
                          <div className="mini-table">
                            <p className="title mini-title">
                              {miniPurchaseList && miniPurchaseList.length === 0
                                ? "You do ot have a Capex purchase report yet"
                                : "Your most recent Capex Purchase transactions:"}
                            </p>
                            <table>
                              <tbody>
                                <tr>
                                  <th>Purchase Date</th>
                                  <th>Asset Code</th>
                                  <th>Asset Class</th>
                                  <th>Cost</th>
                                  <th>Status</th>
                                </tr>
                              </tbody>

                              {returnedCapexs.name &&
                                miniPurchaseList.slice(0, 5)}
                            </table>
                          </div>
                          <button
                            className="view-report"
                            onClick={() => {
                              setIsFullReport(!isFullReport);
                              setIsCapexToggle(true);
                            }}
                          >
                            View full report
                          </button>
                        </div>
                        <div className="other-mini-list capex-mini">
                          <div className="mini-table">
                            <p className="title mini-title">
                              {miniDisposalList && miniDisposalList.length === 0
                                ? "You do not have a Disposal report yet"
                                : "Your most recent Disposal:"}
                            </p>
                            <table>
                              <tbody>
                                <tr>
                                  <th>Purchase Date</th>
                                  <th>Disposal Date</th>
                                  <th>Asset Code</th>
                                  <th>Cost</th>
                                  <th>Sale Value</th>
                                </tr>
                              </tbody>

                              {returnedCapexs.name &&
                                miniDisposalList.slice(0, 5)}
                            </table>
                          </div>
                          <button
                            className="view-report"
                            onClick={() => {
                              setIsFullReport(!isFullReport);
                              setIsCapexToggle(false);
                            }}
                          >
                            View full Profit / Loss statement
                          </button>
                        </div>
                      </div>
                      <div className="income-info capex-supplier">
                        <div className="capex-creditors">
                          <p className="title">Active creditors</p>
                          {activeCreditors && activeCreditors.length !== 0 ? (
                            activeCreditors.map((activeCreditor) => {
                              const { CreditorId, SupplierName, Amount } =
                                activeCreditor;
                              return (
                                <Link
                                  to={`/creditor/${CreditorId}`}
                                  key={CreditorId}
                                  className="debtor-list capex-list"
                                >
                                  <p className="d-name">{SupplierName}</p>
                                  <p className="debt-amount capex-debt">
                                    {formatMoney(Amount)}.00
                                  </p>
                                </Link>
                              );
                            })
                          ) : (
                            <p className="title">
                              You do not have any capex creditor yet. When you
                              do, they will appear here...
                            </p>
                          )}
                        </div>
                        <div className="capex-debtors">
                          <p className="title">Active debtors</p>
                          {activeDebtors && activeDebtors.length !== 0 ? (
                            activeDebtors.map((activeDebtor) => {
                              const { DebtorId, CustomerName, Amount } =
                                activeDebtor;
                              return (
                                <Link
                                  to={`/debtor/${DebtorId}`}
                                  className="debtor-list capex-list"
                                  key={DebtorId}
                                >
                                  {/* <div key={CustomerId}> */}
                                  <p className="d-name">{CustomerName}</p>
                                  <p className="debt-amount capex-debt">
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
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Loading />
              ))}

            {isFullReport && (
              <div className="full-report">
                <div className="drug-table-head">
                  <h3>{isCapexToggle ? "Capex purchase" : "Capex disposal"}</h3>
                  <AiOutlineClose
                    className="btn-close"
                    onClick={() => setIsFullReport(false)}
                  />
                </div>
                {isCapexToggle && <CapexPurchaseTable ref={componentRef} />}
                {!isCapexToggle && <CapexDisposalTable ref={componentRef} />}
                <div className="btn-generate-container">
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn-generate"
                    table="table-to-xls"
                    filename={
                      !isCapexToggle
                        ? "Afarmacco-Capex Disposal"
                        : "Afarmacco-Capex Purchase"
                    }
                    sheet={!isCapexToggle ? "CapexDisposal" : "CapexPurchase"}
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
