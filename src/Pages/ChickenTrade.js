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

export const ChickenTrade = () => {
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
              <h1>Chicken Trade & Exchange</h1>
            </div>
            <div>
              <p> </p>
            </div>
          </div>
          <div className="trade-container">
            <Link to="/doc-sales" className="trade-item baby-opt">
              Day-Old Chicks Sales
            </Link>
            <Link to="/farmgate" className="trade-item doc-opt">
              Farmgate Sales: Live Chicken
            </Link>
            <Link to="/farmgate-eggs" className="trade-item egg-opt">
              Farmgate Sales: Eggs
            </Link>
            <Link to="/supply-pipeline" className="trade-item pol-opt">
              Live Chicken Supply Pipeline
            </Link>
            <Link to="/feed-mart" className="trade-item feed-opt">
              Feed Mart
            </Link>
            <Link to="/drug-mart" className="trade-item drug-opt">
              Drug Mart
            </Link>
          </div>
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
