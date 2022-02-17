import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import { FeedConsumed } from "../Components/FeedConsumed";
import { FeedPurchase } from "../Components/FeedPurchase";
import { Navbar } from "../Components/Navbar";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { BsFileEarmarkText } from "react-icons/bs";
import { AuthContext } from "../helpers/AuthContext";
import "../Styles/Feed.css";
import { FeedPurchaseTable } from "../Components/Tables/FeedPurchaseTable";
import { FeedConsumedTable } from "../Components/Tables/FeedConsumedTable";
import { LoggedOut } from "../Components/LoggedOut";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

export const FeedPage = () => {
  const [returnedFeedPurchase, setReturnedFeedPurchase] = useState([]);
  const [returnedFeedConsumed, setReturnedFeedConsumed] = useState([]);
  const [returnedActiveCreditors, setReturnedActiveCreditors] = useState([]);
  const [isFeedToggle, setIsFeedToggle] = useState(true);
  const [isFeedPurchaseForm, setIsFeedPurchaseForm] = useState(false);
  const [isFeedConsumedForm, setIsFeedConsumedForm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isFullReport, setIsFullReport] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);
  const [isNav, setIsNav] = useState(false);

  const [animState, setAnimState] = useState(true);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // getting active creditors start-----------------------------------------------------
  const getActiveCreditors = async () => {
    try {
      const activeCreditors = await fetch("/api/active-creditors", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedActiveCreditors(activeCreditors);
    } catch (error) {
      console.log(error);
    }
  };
  // getting active creditors end-----------------------------------------------------
  // getting feed purchase start-----------------------------------------------------
  const getAllFeedPurchase = async () => {
    try {
      const allFeedPurchase = await fetch("/api/all-feed-purchase", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedFeedPurchase(allFeedPurchase);
    } catch (error) {
      console.log(error);
    }
  };
  // getting feed purchase end-----------------------------------------------------

  // getting feed consumed start-----------------------------------------------------
  const getAllFeedConsumed = async () => {
    try {
      const allFeedConsumed = await fetch("/api/all-feed-consumed", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedFeedConsumed(allFeedConsumed);
    } catch (error) {
      console.log(error);
    }
  };
  // getting feed consumed end-----------------------------------------------------

  useEffect(() => {
    getAllFeedPurchase();
    getAllFeedConsumed();
    getActiveCreditors();
  }, []);

  // Top 7 List----------------------------------------------------------------------------------
  let miniPurchaseList;
  if (returnedFeedPurchase.name) {
    miniPurchaseList = returnedFeedPurchase.name.map((purchase) => {
      const { FeedPurchaseId, PurchaseDate, FeedName, Qty, UnitPrice } =
        purchase;
      const newDate = `${new Date(PurchaseDate).toLocaleDateString()}`;
      return (
        <tbody key={FeedPurchaseId}>
          <tr>
            <td>{newDate}</td>
            <td>{FeedName}</td>
            <td>{Qty}</td>
            <td>{UnitPrice}</td>
          </tr>
        </tbody>

        // <div key={FeedPurchaseId} className="mini-list-wrapper">
        //   <p>{newDate}</p>
        //   <p>{Qty === 1 ? Qty + " " + FeedName : Qty + " " + FeedName + "s"}</p>
        //   <p>₦ {UnitPrice} each</p>
        // </div>
      );
    });
  }
  let miniConsumptionList;
  if (returnedFeedConsumed.name) {
    miniConsumptionList = returnedFeedConsumed.name.map((consumed) => {
      const {
        FeedConsumptionId,
        ConsumptionDate,
        FeedName,
        BagQtyUsed,
        UnitPrice,
      } = consumed;
      const newDate = `${new Date(ConsumptionDate).toLocaleDateString()}`;
      return (
        <tbody key={FeedConsumptionId}>
          <tr>
            <td>{newDate}</td>
            <td>{FeedName}</td>
            <td>{BagQtyUsed}</td>
            <td>{UnitPrice}</td>
          </tr>
        </tbody>

        // <div key={FeedConsumptionId} className="mini-list-wrapper">
        //   <p>{newDate}</p>
        //   <p>{FeedName}</p>
        //   <p>{BagQtyUsed}</p>
        //   <p>{UnitPrice}</p>
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
      (activeCreditor) => activeCreditor.PurchaseType === "Feed Purchase"
    );
  }

  let totalCredit;
  if (returnedActiveCreditors.name) {
    totalCredit = activeCreditors.reduce((a, v) => (a = a + v.Amount), 0);
  }

  let totalAmount;
  if (returnedFeedPurchase.name) {
    totalAmount = returnedFeedPurchase.name.reduce(
      (a, v) => (a = a + v.Amount),
      0
    );
  }
  let totalQty;
  if (returnedFeedPurchase.name) {
    totalQty = returnedFeedPurchase.name.reduce((a, v) => (a = a + v.Qty), 0);
  }

  let totalSatchet;
  if (returnedFeedConsumed.name) {
    totalSatchet = returnedFeedConsumed.name.reduce(
      (a, v) => (a = a + v.BagQtyUsed),
      0
    );
  }

  return (
    <div className="feed">
      <Navbar isNav={isNav} setIsNav={setIsNav} />
      {/* {(isFeedConsumedForm || isFeedPurchaseForm || isFullReport) && ( */}
      <div
        className={`${
          isFeedConsumedForm || isFeedPurchaseForm
            ? "form-background"
            : "hide-background"
        }`}
        onClick={() => {
          setIsFeedConsumedForm(false);
          setIsFeedPurchaseForm(false);
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
        <div className="feed-container">
          <div className="feed-head">
            <AiOutlineMenu className="ham" onClick={() => setIsNav(!isNav)} />
            <div className="feed-heading">
              <h1>Feeds</h1>
              {/* <p>Manage all your feeds transactions here</p> */}
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
                  className={`${isFeedPurchaseForm && "new-active"}`}
                  onClick={() => {
                    setIsFeedPurchaseForm(!isFeedPurchaseForm);
                    setIsFeedConsumedForm(false);
                  }}
                >
                  Purchase
                </button>
                <button
                  className={`${isFeedConsumedForm && "new-active"}`}
                  onClick={() => {
                    setIsFeedConsumedForm(!isFeedConsumedForm);
                    setIsFeedPurchaseForm(false);
                  }}
                >
                  Consumption
                </button>
              </div>
            </div>
          </div>
          <div className="all-feed">
            <FeedConsumed
              isFeedConsumedForm={isFeedConsumedForm}
              setIsFeedConsumedForm={setIsFeedConsumedForm}
              getAllFeedConsumed={getAllFeedConsumed}
              animState={animState}
              setAnimState={setAnimState}
            />
            <FeedPurchase
              getActiveCreditors={getActiveCreditors}
              isFeedPurchaseForm={isFeedPurchaseForm}
              setIsFeedPurchaseForm={setIsFeedPurchaseForm}
              getAllFeedPurchase={getAllFeedPurchase}
              animState={animState}
              setAnimState={setAnimState}
            />

            {!isFullReport &&
              (miniPurchaseList &&
              miniConsumptionList &&
              miniPurchaseList.length === 0 &&
              miniConsumptionList.length === 0 ? (
                <div className="empty-main-report">
                  <h1>There are no Feed reports available yet</h1>
                  <p>
                    Create a new report by tapping the <span>NEW</span>{" "}
                    button...
                  </p>
                </div>
              ) : miniPurchaseList || miniConsumptionList ? (
                <div className="mini-list">
                  <div className="mini-list-container animate__animated animate__fadeIn">
                    <div className="all-mini-wrapper">
                      <div className="all-mini-list">
                        <div className="bird-mini-list">
                          <div className="mini-table">
                            <p className="title mini-title">
                              {miniPurchaseList && miniPurchaseList.length === 0
                                ? "You do ot have a Feed purchase report yet"
                                : "Your most recent Feed Purchase transactions:"}
                            </p>
                            <table>
                              <tbody>
                                <tr>
                                  <th>Date</th>
                                  <th>Feed</th>
                                  <th>Qty</th>
                                  <th>Unit Price</th>
                                </tr>
                              </tbody>
                              {returnedFeedPurchase.name &&
                                miniPurchaseList.slice(0, 5)}
                            </table>
                          </div>
                          <button
                            className="view-report"
                            onClick={() => {
                              setIsFullReport(!isFullReport);
                              setIsFeedToggle(true);
                            }}
                          >
                            View full report <BsFileEarmarkText />
                          </button>
                        </div>
                        <div className="other-mini-list">
                          <div className="mini-table">
                            <p className="title mini-title">
                              {miniConsumptionList &&
                              miniConsumptionList.length === 0
                                ? "You do not have a Feed consumption report yet"
                                : "Your most recent Feed consumption:"}
                            </p>
                            <table>
                              <tbody>
                                <tr>
                                  <th>Date</th>
                                  <th>Feed</th>
                                  <th>Bag (Qty used)</th>
                                  <th>Unit Price</th>
                                </tr>
                              </tbody>
                              {returnedFeedConsumed.name &&
                                miniConsumptionList.slice(0, 5)}
                            </table>
                          </div>
                          <button
                            className="view-report"
                            onClick={() => {
                              setIsFullReport(!isFullReport);
                              setIsFeedToggle(false);
                            }}
                          >
                            View full report <BsFileEarmarkText />
                          </button>
                        </div>
                      </div>
                      <div className="income-info extra-info">
                        <div className="grid-1-extra">
                          <div className="extra">
                            <p className="head">Total feed Purchased</p>
                            <p>{formatMoney(totalQty)}</p>
                          </div>
                          <div className="extra">
                            <p className="head">Total amount spent </p>
                            <p>{formatMoney(totalAmount)}</p>
                          </div>
                        </div>
                        <div className="extra">
                          <p className="head">Total satchet Qty used</p>
                          <p>{formatMoney(totalSatchet)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="suppliers">
                      <p className="title">Active creditors and Amount</p>
                      <div className="debtor-list-container">
                        {activeCreditors && activeCreditors.length !== 0 ? (
                          activeCreditors.map((activeCreditor) => {
                            const { CreditorId, SupplierName, Amount } =
                              activeCreditor;
                            return (
                              <Link
                                to={`/creditor/${CreditorId}`}
                                key={CreditorId}
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
                      {/* <button className="view-all">View All</button> */}
                    </div>
                  </div>
                </div>
              ) : (
                "loading, please wait"
              ))}

            {isFullReport && (
              <div className="full-report">
                <div className="feed-table-head">
                  <h3>{isFeedToggle ? "Feed purchase" : "Feed consumption"}</h3>
                </div>
                {isFeedToggle && <FeedPurchaseTable ref={componentRef} />}
                {!isFeedToggle && <FeedConsumedTable ref={componentRef} />}

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
