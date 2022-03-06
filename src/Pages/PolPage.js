import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import "../Styles/Expense.css";
import { PolEgg } from "../Components/PolEgg";
import { PolLayer } from "../Components/PolLayer";
import { BsFileEarmarkText } from "react-icons/bs";
import { Navbar } from "../Components/Navbar";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { AuthContext } from "../helpers/AuthContext";
import { PolEggTable } from "../Components/Tables/PolEggTable";
import { PolLayerTable } from "../Components/Tables/PolLayerTable";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { LoggedOut } from "../Components/LoggedOut";
import { Link } from "react-router-dom";
import { ExpenseTable } from "../Components/Tables/ExpenseTable";
import { Loading } from "../Components/Loading";
import { PolLayerSaleTable } from "../Components/Tables/PolLayerSaleTable";
import { PolLayerMortalityTable } from "../Components/Tables/PolLayerMortalityTable";

export const PolPage = () => {
  const [returnedPolEggs, setReturnedPolEggs] = useState([]);
  const [returnedPolLayers, setReturnedPolLayers] = useState([]);
  const [returnedActiveDebtors, setReturnedActiveDebtors] = useState([]);
  const [isPolEggForm, setIsPolEggForm] = useState(false);
  const [isPolLayerForm, setIsPolLayerForm] = useState(false);
  const [toDate, setToDate] = useState("");
  const [isPolToggle, setIsPolToggle] = useState("");
  const [fromDate, setFromDate] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);
  const [isNav, setIsNav] = useState(false);
  const [isFullReport, setIsFullReport] = useState(false);
  const [isDateFilter, setIsDateFilter] = useState(false);
  const [animState, setAnimState] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // getting active creditors start-----------------------------------------------------
  const getActiveDebtors = async () => {
    try {
      const activeDebtors = await fetch("api/active-debtors", {
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
  // getting active creditors end-----------------------------------------------------

  //getting the data from the database from the db-----------------------------------------
  const getAllPolEggs = async () => {
    try {
      const allPolEggs = await fetch("api/all-pol-eggs", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedPolEggs(allPolEggs);
    } catch (error) {
      console.log(error);
    }
  };
  //getting the data from the database from the db end-----------------------------------------
  //getting the data from the database from the db-----------------------------------------
  const getAllPolLayers = async () => {
    try {
      const allPolLayers = await fetch("api/all-pol-layers", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedPolLayers(allPolLayers);
    } catch (error) {
      console.log(error);
    }
  };
  //getting the data from the database from the db end-----------------------------------------
  useEffect(() => {
    getAllPolEggs();
    getActiveDebtors();
    getAllPolLayers();
  }, []);

  let allPolEggs = returnedPolEggs.name;

  const sortPolEgg =
    returnedPolEggs.name && fromDate && toDate
      ? returnedPolEggs.name.filter(
          (sortedPolEgg) =>
            sortedPolEgg.ExpenseDate >= fromDate &&
            sortedPolEgg.ExpenseDate <= toDate
        )
      : allPolEggs;

  let activeDebtors;
  if (returnedActiveDebtors.name) {
    activeDebtors = returnedActiveDebtors.name.filter(
      (activeDebtor) =>
        activeDebtor.PurchaseType === "Egg Sale" &&
        activeDebtor.Status === "UNPAID"
    );
  }

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  let totalDebt;
  if (returnedActiveDebtors.name) {
    totalDebt = activeDebtors.reduce((a, v) => (a = a + v.Amount), 0);
  }

  let miniPolEggList;
  if (returnedPolEggs.name) {
    {
      miniPolEggList = returnedPolEggs.name.map((polEgg) => {
        const { PolEggId, TxnDate, InvoiceNo, CrateQty, Amount } = polEgg;
        const newDate = `${new Date(TxnDate).toLocaleDateString()}`;
        return (
          <tbody key={PolEggId}>
            <tr>
              <td>{newDate}</td>
              <td>{InvoiceNo}</td>
              <td>{CrateQty}</td>
              <td>{Amount}</td>
            </tr>
          </tbody>
        );
      });
    }
  }
  let miniPolLayerList;
  if (returnedPolLayers.name) {
    {
      miniPolLayerList = returnedPolLayers.name.map((polLayer) => {
        const { PolConvertId, TxnDate, InvoiceNo, Qty, UnitPrice } = polLayer;
        const newDate = `${new Date(TxnDate).toLocaleDateString()}`;
        return (
          <tbody key={PolConvertId}>
            <tr>
              <td>{newDate}</td>
              <td>{InvoiceNo}</td>
              <td>{Qty}</td>
              <td>{UnitPrice}</td>
            </tr>
          </tbody>
        );
      });
    }
  }

  let totalQty;
  if (returnedPolEggs.name) {
    totalQty = sortPolEgg.reduce((a, v) => (a = a + v.CrateQty), 0);
  }

  let totalAmount;
  if (returnedPolEggs.name) {
    totalAmount = sortPolEgg.reduce((a, v) => (a = a + v.Amount), 0);
  }

  return (
    <div className="doc">
      <Navbar isNav={isNav} setIsNav={setIsNav} />

      {/* <div
        className={`${
          isPolEggForm || isPolLayerForm ? "form-background" : "hide-background"
        }`}
        onClick={() => {
          setAnimState(false);
          setTimeout(() => {
            setAnimState(true);
          }, 1000);
          setIsPolEggForm(false);
          setIsPolLayerForm(false);
          setIsFullReport(false);
        }}
      ></div> */}

      <div
        className={`${isFullReport ? "form-background" : "hide-background"}`}
        onClick={() => {
          setIsFullReport(false);
        }}
      ></div>

      {authState ? (
        <div className="doc-container">
          <div className="doc-head">
            <AiOutlineMenu className="ham" onClick={() => setIsNav(!isNav)} />
            <div className="doc-heading">
              <h1>Point Of Lay</h1>
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
                  className={`${isPolEggForm && "new-active"}`}
                  onClick={() => {
                    setIsPolEggForm(!isPolEggForm);
                    setIsPolLayerForm(false);
                  }}
                >
                  Egg Sale
                </button>
                <button
                  className={`${isPolLayerForm && "new-active"}`}
                  onClick={() => {
                    setIsPolLayerForm(!isPolLayerForm);
                    setIsPolEggForm(false);
                  }}
                >
                  POL Layer
                </button>
              </div>
            </div>
          </div>
          {/* <div className="full-expense"> */}
          <div className="all-doc">
            <PolEgg
              isPolEggForm={isPolEggForm}
              setIsPolEggForm={setIsPolEggForm}
              getAllPolEggs={getAllPolEggs}
              animState={animState}
              setAnimState={setAnimState}
              getActiveDebtors={getActiveDebtors}
            />
            <PolLayer
              isPolLayerForm={isPolLayerForm}
              setIsPolLayerForm={setIsPolLayerForm}
              getAllPolLayers={getAllPolLayers}
              animState={animState}
              setAnimState={setAnimState}
              getActiveDebtors={getActiveDebtors}
            />

            {/* Start of new-------------------------------------------------------------------------------------- */}
            {!isFullReport &&
              (miniPolEggList &&
              miniPolLayerList &&
              miniPolEggList.length === 0 &&
              miniPolLayerList.length === 0 ? (
                <div className="empty-main-report">
                  <h1>There are no Point Of Lay reports available yet</h1>
                  <p>
                    Create a new report by tapping the <span>NEW</span>{" "}
                    button...
                  </p>
                </div>
              ) : miniPolEggList || miniPolLayerList ? (
                <div className="mini-list">
                  <div className="mini-list-container animate__animated animate__fadeIn">
                    <div className="all-mini-wrapper">
                      <div className="all-mini-list">
                        <div className="bird-mini-list">
                          <div className="mini-table">
                            <p className="title mini-title">
                              {miniPolEggList && miniPolEggList.length === 0
                                ? "You do not have an Egg report yet"
                                : "Your most recent Egg reports:"}
                            </p>
                            <table>
                              <tbody>
                                <tr>
                                  <th>Date</th>
                                  <th>Invoice</th>
                                  <th>Crate Qty</th>
                                  <th>Amount</th>
                                </tr>
                              </tbody>
                              {returnedPolEggs.name &&
                                miniPolEggList.slice(0, 5)}
                            </table>
                          </div>
                          <button
                            className="view-report"
                            onClick={() => {
                              setIsFullReport(!isFullReport);
                              setIsPolToggle("Egg Sale");
                            }}
                          >
                            View full report
                          </button>
                        </div>
                        <div className="other-mini-list">
                          <div className="mini-table">
                            <p className="title mini-title">
                              {miniPolLayerList && miniPolLayerList.length === 0
                                ? "You do not have a Layer report yet"
                                : "Your most recent Layer report:"}
                            </p>
                            <table>
                              <tbody>
                                <tr>
                                  <th>Date</th>
                                  <th>Invoice</th>
                                  <th>Qty</th>
                                  <th>Unit Price</th>
                                </tr>
                              </tbody>

                              {returnedPolLayers.name &&
                                miniPolLayerList.slice(0, 5)}
                            </table>
                          </div>
                          <button
                            className="view-report"
                            onClick={() => {
                              setIsFullReport(!isFullReport);
                              setIsPolToggle("Layer Purchase");
                            }}
                          >
                            View POL purchase report
                          </button>
                        </div>
                      </div>
                      <div className="income-info extra-info">
                        <div className="grid-1-extra">
                          <div className="extra">
                            <p className="head">Crates of eggs sold</p>
                            <p>{formatMoney(totalQty)}</p>
                          </div>
                          <div className="extra">
                            <p className="head">Total egg income </p>
                            <p>{formatMoney(totalAmount)}</p>
                          </div>
                        </div>
                        <div className="extra">
                          <button
                            className="view-report extra-pol-btn"
                            onClick={() => {
                              setIsFullReport(!isFullReport);
                              setIsPolToggle("Pol Sale");
                            }}
                          >
                            View POL sale report
                          </button>
                          <button
                            className="view-report extra-pol-btn"
                            onClick={() => {
                              setIsFullReport(!isFullReport);
                              setIsPolToggle("Pol Mortality");
                            }}
                          >
                            View POL mortality report
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="debtors">
                      <p className="title">Active Debtors and Amount</p>
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
                                <p className="d-name">{CustomerName}</p>
                                <p className="debt-amount">
                                  {formatMoney(Amount)}.00
                                </p>
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
            {/* End of new-------------------------------------------------------------------------------------- */}

            {isFullReport && (
              <div className="full-report">
                <div className="doc-table-head">
                  <h3>
                    {isPolToggle === "Egg Sale"
                      ? "Eggs Sale"
                      : isPolToggle === "Layer Purchase"
                      ? "Pol Layers Purchase"
                      : isPolToggle === "Pol Sale"
                      ? "Pol Sales"
                      : isPolToggle === "Pol Mortality"
                      ? "Pol Mortality"
                      : ""}
                  </h3>
                  <AiOutlineClose
                    className="btn-close"
                    onClick={() => setIsFullReport(false)}
                  />
                </div>
                {isPolToggle === "Egg Sale" && (
                  <PolEggTable ref={componentRef} />
                )}
                {isPolToggle === "Layer Purchase" && (
                  <PolLayerTable ref={componentRef} />
                )}

                {isPolToggle === "Pol Sale" && (
                  <PolLayerSaleTable ref={componentRef} />
                )}

                {isPolToggle === "Pol Mortality" && (
                  <PolLayerMortalityTable ref={componentRef} />
                )}

                <div className="btn-generate-container">
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn-generate"
                    table="table-to-xls"
                    filename={
                      !isPolToggle ? "Afarmacco-POL Layers" : "Afarmacco-Eggs"
                    }
                    sheet={!isPolToggle ? "Pol Layers" : "Pol Eggs"}
                    buttonText="Download as Excel"
                  />
                  <button onClick={handlePrint} className="btn-generate">
                    Generate Report <BsFileEarmarkText className="report" />
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* </div> */}
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
