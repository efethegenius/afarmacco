import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import "../Styles/Doc.css";
import { DocMortality } from "../Components/DocMortality";
import { DocPurchase } from "../Components/DocPurchase";
import { Navbar } from "../Components/Navbar";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { BsFileEarmarkText } from "react-icons/bs";
import { DocPurchaseTable } from "../Components/Tables/DocPurchaseTable";
import { DocMortalityTable } from "../Components/Tables/DocMortalityTable";
import { AuthContext } from "../helpers/AuthContext";
import { Link } from "react-router-dom";
import { LoggedOut } from "../Components/LoggedOut";
import { AiOutlineMenu } from "react-icons/ai";

export const DocPage = () => {
  const [returnedDocPurchase, setReturnedDocPurchase] = useState([]);
  const [returnedDocMortality, setReturnedDocMortality] = useState([]);
  const [returnedActiveCreditors, setReturnedActiveCreditors] = useState([]);
  const [isDocToggle, setIsDocToggle] = useState(true);
  const [isFullReport, setIsFullReport] = useState(false);
  const [isDocPurchaseForm, setIsDocPurchaseForm] = useState(false);
  const [isMortalityForm, setIsMortalityForm] = useState(false);
  const [animState, setAnimState] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [isNav, setIsNav] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);

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

  console.log(returnedActiveCreditors.name);

  // getting doc purchase start-----------------------------------------------------
  const getAllDocPurchase = async () => {
    try {
      const allDocPurchase = await fetch(
        "https://afarmacco-api.herokuapp.com/api/all-doc-purchase",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedDocPurchase(allDocPurchase);
    } catch (error) {
      console.log(error);
    }
  };
  // getting doc purchase end-----------------------------------------------------

  // getting doc mortality start-----------------------------------------------------
  const getAllDocMortality = async () => {
    try {
      const allDocMortality = await fetch(
        "https://afarmacco-api.herokuapp.com/api/all-doc-mortality",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedDocMortality(allDocMortality);
    } catch (error) {
      console.log(error);
    }
  };
  // getting doc mortality end-----------------------------------------------------

  useEffect(() => {
    getAllDocPurchase();
    getActiveCreditors();
    getAllDocMortality();
  }, []);

  // sorting by date--------------------------------------------------------------------

  // Top 7 List----------------------------------------------------------------------------------
  let miniPurchaseList;
  if (returnedDocPurchase.name) {
    miniPurchaseList = returnedDocPurchase.name.map((purchase) => {
      const { DOCPurchaseId, PurchaseDate, BirdName, Qty, UnitPrice } =
        purchase;
      const newDate = `${new Date(PurchaseDate).toLocaleDateString()}`;
      return (
        <tbody key={DOCPurchaseId}>
          <tr>
            <td>{newDate}</td>
            <td>{BirdName}</td>
            <td>{Qty}</td>
            <td>{UnitPrice}</td>
          </tr>
        </tbody>

        // <div key={DOCPurchaseId} className="mini-list-wrapper">
        //   <p>{newDate}</p>
        //   <p>{Qty === 1 ? Qty + " " + BirdName : Qty + " " + BirdName + "s"}</p>
        //   <p>₦ {UnitPrice} each</p>
        // </div>
      );
    });
  }
  let miniMortalityList;
  if (returnedDocMortality.name) {
    miniMortalityList = returnedDocMortality.name.map((mortality) => {
      const { MortalityId, MortalityDate, BirdName, Qty } = mortality;
      const newDate = `${new Date(MortalityDate).toLocaleDateString()}`;
      return (
        <tbody key={MortalityId}>
          <tr>
            <td>{newDate}</td>
            <td>{BirdName}</td>
            <td>{Qty}</td>
          </tr>
        </tbody>

        // <div key={MortalityId} className="mini-list-wrapper">
        //   <p>{newDate}</p>
        //   <p>
        //     {Qty === 1
        //       ? Qty + " " + BirdName + " died"
        //       : Qty + " " + BirdName + "s" + " died"}
        //   </p>
        // </div>
      );
    });
  }
  // Top 7 List----------------------------------------------------------------------------------

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  let activeCreditors;
  if (returnedActiveCreditors.name) {
    activeCreditors = returnedActiveCreditors.name.filter(
      (activeCreditor) => activeCreditor.PurchaseType === "DOC Purchase"
    );
  }

  let totalCredit;
  if (returnedActiveCreditors.name) {
    totalCredit = activeCreditors.reduce((a, v) => (a = a + v.Amount), 0);
  }

  // calculating totals-----------------------------------------------------------------
  let totalAmount;
  if (returnedDocPurchase.name) {
    totalAmount = returnedDocPurchase.name.reduce(
      (a, v) => (a = a + v.Amount),
      0
    );
  }
  let totalQty;
  if (returnedDocPurchase.name) {
    totalQty = returnedDocPurchase.name.reduce((a, v) => (a = a + v.Qty), 0);
  }

  let totalMortalityQty;
  if (returnedDocMortality.name) {
    totalMortalityQty = returnedDocMortality.name.reduce(
      (a, v) => (a = a + v.Qty),
      0
    );
  }
  // calculating totals-----------------------------------------------------------------

  return (
    <div className="doc">
      <Navbar isNav={isNav} setIsNav={setIsNav} />
      <div
        className={`${
          isMortalityForm || isDocPurchaseForm
            ? "form-background"
            : "hide-background"
        }`}
        onClick={() => {
          setIsDocPurchaseForm(false);
          setIsMortalityForm(false);
          setIsFullReport(false);
          setAnimState(false);
          setTimeout(() => {
            setAnimState(true);
          }, 1000);
        }}
      ></div>
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
              <h1>Day Old Chicks</h1>
              {/* <p>Manage all your DOC transactions here</p> */}
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
                  className={`${isDocPurchaseForm && "new-active"}`}
                  onClick={() => {
                    setIsDocPurchaseForm(!isDocPurchaseForm);
                    setIsMortalityForm(false);
                  }}
                >
                  Purchase
                </button>
                <button
                  className={`${isMortalityForm && "new-active"}`}
                  onClick={() => {
                    setIsMortalityForm(!isMortalityForm);
                    setIsDocPurchaseForm(false);
                  }}
                >
                  Mortality
                </button>
              </div>
            </div>
          </div>
          <div className="all-doc">
            <DocMortality
              isMortalityForm={isMortalityForm}
              setIsMortalityForm={setIsMortalityForm}
              getAllDocMortality={getAllDocMortality}
              animState={animState}
              setAnimState={setAnimState}
            />
            <DocPurchase
              isDocPurchaseForm={isDocPurchaseForm}
              setIsDocPurchaseForm={setIsDocPurchaseForm}
              getAllDocPurchase={getAllDocPurchase}
              getActiveCreditors={getActiveCreditors}
              animState={animState}
              setAnimState={setAnimState}
            />

            {!isFullReport &&
              (miniPurchaseList &&
              miniMortalityList &&
              miniPurchaseList.length === 0 &&
              miniMortalityList.length === 0 ? (
                <div className="empty-main-report">
                  <h1>There are no Day Old Chicks reports available yet</h1>
                  <p>
                    Create a new report by tapping the <span>NEW</span>{" "}
                    button...
                  </p>
                </div>
              ) : miniPurchaseList || miniMortalityList ? (
                <div className="mini-list">
                  <div className="mini-list-container animate__animated animate__fadeIn">
                    <div className="all-mini-wrapper">
                      <div className="all-mini-list">
                        <div className="bird-mini-list">
                          <div className="mini-table">
                            <p className="title mini-title">
                              {miniPurchaseList && miniPurchaseList.length === 0
                                ? "You do ot have a DOC purchase report yet"
                                : "Your most recent DOC Purchase transactions:"}
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

                              {returnedDocPurchase.name &&
                                miniPurchaseList.slice(0, 5)}
                            </table>
                          </div>
                          <button
                            className="view-report"
                            onClick={() => {
                              setIsFullReport(!isFullReport);
                              setIsDocToggle(true);
                            }}
                          >
                            View full report <BsFileEarmarkText />
                          </button>
                        </div>
                        <div className="other-mini-list">
                          <div className="mini-table">
                            <p className="title mini-title">
                              {miniMortalityList &&
                              miniMortalityList.length === 0
                                ? "You do not have a DOC mortality report yet"
                                : "Your most recent Doc Mortality:"}
                            </p>
                            <table>
                              <tbody>
                                <tr>
                                  <th>Date</th>
                                  <th>BirdName</th>
                                  <th>Qty</th>
                                </tr>
                              </tbody>

                              {returnedDocMortality.name &&
                                miniMortalityList.slice(0, 5)}
                            </table>
                          </div>
                          <button
                            className="view-report"
                            onClick={() => {
                              setIsFullReport(!isFullReport);
                              setIsDocToggle(false);
                            }}
                          >
                            View full report <BsFileEarmarkText />
                          </button>
                        </div>
                      </div>
                      <div className="income-info extra-info">
                        <div className="grid-1-extra">
                          <div className="extra">
                            <p className="head">Total birds Purchased</p>
                            <p>{formatMoney(totalQty)}</p>
                          </div>
                          <div className="extra">
                            <p className="head">Total amount spent </p>
                            <p>{formatMoney(totalAmount)}</p>
                          </div>
                        </div>
                        <div className="extra">
                          <p className="head">Total bird mortality</p>
                          <p>{formatMoney(totalMortalityQty)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="suppliers">
                      <p className="title">Active creditors and Amount</p>
                      <div className="debtor-list-container">
                        {activeCreditors && activeCreditors.length !== 0 ? (
                          activeCreditors.map((activeCreditor) => {
                            const { SupplierId, SupplierName, Amount } =
                              activeCreditor;
                            return (
                              <Link
                                to={`/creditor/${SupplierId}`}
                                key={SupplierId}
                                className="debtor-list"
                              >
                                <p className="d-name">{SupplierName}</p>
                                <p className="debt-amount">
                                  ₦ {formatMoney(Amount)}.00
                                </p>
                              </Link>
                            );
                          })
                        ) : (
                          <p className="title">
                            You do not have any FEED creditor yet. When you do,
                            they will appear here...
                          </p>
                        )}
                      </div>
                      <div className="debtor-list">
                        <p className="title">TOTAL CREDIT:</p>
                        <p className="debt-amount">
                          ₦ {formatMoney(totalCredit)}.00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                "loading, please wait"
              ))}

            {isFullReport && (
              <div className="full-report">
                <div className="doc-table-head">
                  <h3>{isDocToggle ? "DOC purchase" : "DOC mortality"}</h3>
                </div>
                {isDocToggle && <DocPurchaseTable ref={componentRef} />}
                {!isDocToggle && <DocMortalityTable ref={componentRef} />}

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
