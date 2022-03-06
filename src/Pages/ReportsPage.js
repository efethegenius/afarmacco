import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import "../Styles/Reports.css";
import { Expense } from "../Components/Expense";
import { BsFileEarmarkText } from "react-icons/bs";
import { Navbar } from "../Components/Navbar";
import { HiOutlinePlus } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { AuthContext } from "../helpers/AuthContext";
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
import { ReportsTable } from "../Components/Tables/ReportsTable";
import { Pie, Doughnut } from "react-chartjs-2";

export const ReportsPage = () => {
  const [returnedReports, setReturnedReports] = useState([]);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);
  const [isNav, setIsNav] = useState(false);
  const [isDateFilter, setIsDateFilter] = useState(false);
  const [animState, setAnimState] = useState(true);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const getReports = async () => {
    try {
      const reports = await fetch("api/reports", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedReports(reports);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  let income;
  if (returnedReports.name) {
    income = returnedReports.name.filter(
      (report) => report.ReportType === "Income"
    );
  }
  let expense;
  if (returnedReports.name) {
    expense = returnedReports.name.filter(
      (report) => report.ReportType === "Expense"
    );
  }

  let totalIncome;
  if (returnedReports.name) {
    totalIncome = income.reduce((a, v) => (a = a + v.Amount), 0);
  }
  let totalExpense;
  if (returnedReports.name) {
    totalExpense = expense.reduce((a, v) => (a = a + v.Amount), 0);
  }

  const data = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];

  const state = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#2070e7", "#B21F00"],
        hoverBackgroundColor: ["#6fa1ff", "#501800"],
        data: [totalIncome, totalExpense],
      },
    ],
  };

  const formatMoney = (n) => {
    return (Math.round(n * 100) / 100).toLocaleString();
  };

  return (
    <div className="main-report">
      <Navbar isNav={isNav} setIsNav={setIsNav} />
      {authState ? (
        <div className="reports-container">
          <div className="expense-head">
            <AiOutlineMenu className="ham" onClick={() => setIsNav(!isNav)} />
            <div className="expense-heading">
              <h1>Reports</h1>
            </div>
            <div>
              <p></p>
            </div>
          </div>
          <div className="all-reports">
            <div className="chart-container">
              <Doughnut
                data={state}
                options={{
                  title: {
                    display: true,
                    text: "Income/Expense Chart",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "top",
                  },
                }}
              />
              <div className="pl-info">
                <h5>{`Total Income: ${formatMoney(totalIncome)}`}</h5>
                <h5>
                  {`Total Expenses:
                  ${formatMoney(totalExpense)}`}
                </h5>
                <h5>{`Gross Profit: ${formatMoney(
                  totalIncome + totalExpense
                )}`}</h5>
              </div>
            </div>
            <ReportsTable ref={componentRef} />
            <div className="btn-generate-container">
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn-generate"
                table="table-to-xls"
                filename="Afarmacco-Reports"
                sheet="Reports"
                buttonText="Download as Excel"
              />
              <button onClick={handlePrint} className="btn-generate">
                Generate Report <BsFileEarmarkText className="report" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
