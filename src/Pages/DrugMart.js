import React, { useState, useEffect, useRef, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import "../Styles/FarmHands.css";
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

export const DrugMart = () => {
  const [isExpenseForm, setIsExpenseForm] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);
  const [isNav, setIsNav] = useState(false);
  const [isFullReport, setIsFullReport] = useState(false);
  const history = useHistory();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
              <h1>Drug Mart</h1>
            </div>
            <div>
              <p> </p>
            </div>
          </div>
          <div className="trade-container">
            <Link to="/multivitamins" className="trade-item drug-item">
              Multivitamins
            </Link>
            <Link to="/antibiotics" className="trade-item drug-item">
              Antibiotics
            </Link>
            <Link to="/anticoccidiosis" className="trade-item drug-item">
              Anticoccidiosis
            </Link>
            <Link to="/antiviral" className="trade-item drug-item">
              Antiviral
            </Link>
            <Link to="/vaccines" className="trade-item drug-item">
              Vaccines
            </Link>
            <Link to="/deworm" className="trade-item drug-item">
              Deworm
            </Link>
            <Link to="/coryza" className="trade-item drug-item">
              Coryza
            </Link>
          </div>
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
