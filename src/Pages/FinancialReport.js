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

export const FinancialReport = () => {
  const [returnedExpenses, setReturnedExpenses] = useState([]);
  const [returnedBirdSales, setReturnedBirdSales] = useState([]);
  const [returnedFrozenChickenSales, setReturnedFrozenChickenSales] = useState(
    []
  );
  const [returnedPolEggs, setReturnedPolEggs] = useState([]);
  const [returnedOtherSales, setReturnedOtherSales] = useState([]);
  const [returnedCapexs, setReturnedCapexs] = useState([]);
  const [returnedOperatingExpense, setReturnedOperatingExpense] = useState([]);
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

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //getting the data from the database from the db-----------------------------------------
  const getAllBirdSales = async () => {
    try {
      const allBirdSales = await fetch(
        "https://afarmacco-api.herokuapp.com/api/all-bird-sales",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedBirdSales(allBirdSales);
    } catch (error) {
      console.log(error);
    }
  };

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

  const getAllPolEggs = async () => {
    try {
      const allPolEggs = await fetch(
        "https://afarmacco-api.herokuapp.com/api/all-pol-eggs",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedPolEggs(allPolEggs);
    } catch (error) {
      console.log(error);
    }
  };

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
  const getOperatingExpense = async () => {
    try {
      const allOperatingExpense = await fetch(
        "https://afarmacco-api.herokuapp.com/api/all-operating-expense",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((res) => res.json());
      setReturnedOperatingExpense(allOperatingExpense);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getAllBirdSales();
    getAllFrozenChickenSales();
    getAllPolEggs();
    getAllOtherSales();
    getOperatingExpense();
    getCapexs();
  }, []);
  //   getting the data from the database from the db end-----------------------------------------

  let fACost;
  if (returnedCapexs.name) {
    fACost = returnedCapexs.name.reduce((a, v) => (a = a + v.FACost), 0);
  }
  let accumDepr;
  if (returnedCapexs.name) {
    accumDepr = returnedCapexs.name.reduce((a, v) => (a = a + v.AccumDepr), 0);
  }

  let netBookValue;
  if (returnedCapexs.name) {
    netBookValue = fACost - accumDepr;
  }

  let saleValue;
  if (returnedCapexs.name) {
    saleValue = returnedCapexs.name.reduce((a, v) => (a = a + v.SaleValue), 0);
  }

  let production;
  if (returnedOperatingExpense.name) {
    production = returnedOperatingExpense.name.filter(
      (opex) => opex.ExpenseName === "Production"
    );
  }
  let admin;
  if (returnedOperatingExpense.name) {
    admin = returnedOperatingExpense.name.filter(
      (opex) => opex.ExpenseName === "Admin"
    );
  }
  let marketing;
  if (returnedOperatingExpense.name) {
    marketing = returnedOperatingExpense.name.filter(
      (opex) => opex.ExpenseName === "Marketing(Advertising and Promotions)"
    );
  }
  let distribution;
  if (returnedOperatingExpense.name) {
    distribution = returnedOperatingExpense.name.filter(
      (opex) => opex.ExpenseName === "Sales and Distribtions"
    );
  }

  let totalProduction;
  if (returnedOperatingExpense.name) {
    totalProduction = production.reduce((a, v) => (a = a + v.Amount), 0);
  }
  let totalAdmin;
  if (returnedOperatingExpense.name) {
    totalAdmin = admin.reduce((a, v) => (a = a + v.Amount), 0);
  }
  let totalMarketing;
  if (returnedOperatingExpense.name) {
    totalMarketing = marketing.reduce((a, v) => (a = a + v.Amount), 0);
  }
  let totalDistribution;
  if (returnedOperatingExpense.name) {
    totalDistribution = distribution.reduce((a, v) => (a = a + v.Amount), 0);
  }

  let totalBirdSales;
  if (returnedBirdSales.name) {
    totalBirdSales = returnedBirdSales.name.reduce(
      (a, v) => (a = a + v.Amount),
      0
    );
  }
  let totalEggSales;
  if (returnedPolEggs.name) {
    totalEggSales = returnedPolEggs.name.reduce(
      (a, v) => (a = a + v.Amount),
      0
    );
  }
  let totalFrozenChickenSales;
  if (returnedFrozenChickenSales.name) {
    totalFrozenChickenSales = returnedFrozenChickenSales.name.reduce(
      (a, v) => (a = a + v.Amount),
      0
    );
  }

  let totalOtherSales;
  if (returnedOtherSales.name) {
    totalOtherSales = returnedOtherSales.name.reduce(
      (a, v) => (a = a + v.Amount),
      0
    );
  }

  let totalSales;
  if (returnedBirdSales.name) {
    totalSales = totalBirdSales + totalEggSales + totalFrozenChickenSales;
  }

  let grossIncome;
  if (returnedBirdSales.name) {
    grossIncome = totalSales + totalOtherSales;
  }
  let grossProfit;
  if (returnedBirdSales.name) {
    grossProfit = grossIncome - totalProduction;
  }
  let netProfitOp;
  if (returnedBirdSales.name) {
    netProfitOp =
      grossProfit - (totalAdmin - totalMarketing - totalDistribution);
  }
  //   let allDocSales = returnedDocSales.name;

  //   const sortDocSales =
  //     returnedDocSales.name && search
  //       ? returnedDocSales.name.filter((sortedDocSales) =>
  //           sortedDocSales.Hatchery.toLowerCase().includes(search.toLowerCase())
  //         )
  //       : allDocSales;

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
          <div className="expense-head">
            <button className="back-btn" onClick={() => history.goBack()}>
              <AiOutlineLeft /> Go back
            </button>
            <div className="expense-heading">
              <h1>Financial Report</h1>
            </div>
            <div>
              <p> </p>
            </div>
          </div>
          <div className="farm-hands-container">
            {returnedBirdSales.name ? (
              <div className="all-farm-hands">
                <table className="pricing-table">
                  <tbody>
                    <tr>
                      <th>Turnover</th>
                      <th>₦</th>
                      <th>₦</th>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td>Sales</td>
                      <td></td>
                      <td>{totalSales}</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td>Other Income(Excluding Assets Disposal)</td>
                      <td></td>
                      <td>{totalOtherSales}</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th>Gross Income</th>
                      <th></th>
                      <th>{grossIncome}</th>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td>Operating Expenses(Production)</td>
                      <td></td>
                      <td>{totalProduction}</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th>Gross Profit</th>
                      <th></th>
                      <th>{grossProfit}</th>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td>Operating Expenses (Admin)</td>
                      <td>{totalAdmin}</td>
                      <td></td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td>Operating Expenses (Marketing A&P)</td>
                      <td>{totalMarketing}</td>
                      <td></td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td>Operating Expenses (Selling & Distribution)</td>
                      <td>{totalDistribution}</td>
                      <td></td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th>Net Profit from operations</th>
                      <th></th>
                      <th>{netProfitOp}</th>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <td>Profit from non-operation activities</td>
                      <td></td>
                      <td>{(saleValue - netBookValue).toFixed(2)}</td>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr>
                      <th>Net Profit</th>
                      <th></th>
                      <th>
                        {(netProfitOp + (saleValue - netBookValue)).toFixed(2)}
                      </th>
                    </tr>
                  </tbody>
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
