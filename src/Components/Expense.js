import React, { useState, useEffect, useContext } from "react";
import {
  FetchExpenseHeads,
  FetchExpenseTypes,
  FetchMethods,
  FetchBanks,
} from "../FetchOptions/FetchOptions";
import { AuthContext } from "../helpers/AuthContext";

export const Expense = ({
  isExpenseForm,
  getAllExpenses,
  setIsExpenseForm,
  animState,
  setAnimState,
  getActiveCreditors,
  getDeprDate,
}) => {
  const [returnedData, setReturnedData] = useState();
  const [returnedDepr, setReturnedDepr] = useState();
  const { returnedExpenseHeads } = FetchExpenseHeads();
  const { returnedMethods } = FetchMethods();
  const { returnedExpenseTypes } = FetchExpenseTypes();
  const { returnedBanks } = FetchBanks();
  const [others, setOthers] = useState("");
  const { upd, setUpd, setExpenseTxn, expenseTxn, deprTxn, setDeprTxn } =
    useContext(AuthContext);

  const [expense, setExpense] = useState({
    ExpenseDate: 0,
    InvoiceNo: 0,
    ExpenseType: "",
    ExpenseHead: "",
    Amount: 0,
    PmtMethod: "",
    Creditor: "",
    BankName: "",
    UpdType: 1,
    RecId: 0,
  });

  const newExpense = async () => {
    const newData = await fetch("/create/expense", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        ...expense,
      }),
    }).then((res) => res.json());
    console.log(newData);
    setReturnedData(newData[0]);
    setExpenseTxn(true);
    setTimeout(() => {
      setExpenseTxn(false);
    }, 4000);
  };

  const newDepr = async () => {
    const newData = await fetch("/create/depr", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        ...expense,
      }),
    }).then((res) => res.json());
    setReturnedDepr(newData[0]);
    console.log(newData);
    setDeprTxn(true);
    setTimeout(() => {
      setDeprTxn(false);
    }, 4000);
  };

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    Array.from(document.querySelectorAll("select")).forEach(
      (select) => (select.value = "")
    );

    setExpense((prevState) => ({
      ...prevState,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (
      name === "InvoiceNo" ||
      name === "Amount" ||
      name === "UpdType" ||
      name === "RecId"
    ) {
      setExpense((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    newExpense();
    setTimeout(() => {
      getActiveCreditors();
      getAllExpenses();
    }, 1500);
  };

  const handleDepr = () => {
    newDepr();
    setTimeout(() => {
      getAllExpenses();
      getDeprDate();
    }, 1500);
  };

  useEffect(() => {
    if (upd) {
      //changing the value of the action when the button is clicked
      setExpense((prevState) => ({
        ...prevState,
        UpdType: 1,
      }));
    }
  }, []);

  let expenseTypes;
  if (returnedExpenseTypes.name) {
    expenseTypes = returnedExpenseTypes.name.map((expenseType) => {
      return (
        <option key={expenseType.ExpenseTypeId}>
          {expenseType.ExpenseName}
        </option>
      );
    });
  }

  let expenseHeads;
  if (returnedExpenseHeads.name) {
    expenseHeads = returnedExpenseHeads.name.map((expenseHead) => {
      return (
        <option key={expenseHead.ExpenseHeadId}>{expenseHead.HeadName}</option>
      );
    });
  }

  let methods;
  if (returnedMethods.name) {
    methods = returnedMethods.name.map((method) => {
      return <option key={method.PmtMethodId}>{method.PmtType}</option>;
    });
  }

  let bankNames;
  if (returnedBanks.name) {
    bankNames = returnedBanks.name.map((bank) => {
      return <option key={bank.BankId}>{bank.BankName}</option>;
    });
  }

  return (
    <div
      className={`${
        isExpenseForm && animState
          ? "expense animate__animated animate__fadeInDown"
          : !isExpenseForm && animState
          ? "hide-expense"
          : "expense animate__animated animate__fadeOutUp"
      }`}
    >
      <section className="form-expense">
        <h2 className="form-head">Expense</h2>
        <div className="input">
          <label htmlFor="ExpenseDate">Date</label>
          <input
            type="date"
            name="ExpenseDate"
            id="ExpenseDate"
            onChange={handleChange}
          />
        </div>
        <div className="expense-type-container">
          <div className="input">
            <label htmlFor="ExpenseType">Expense Type</label>
            <select name="ExpenseType" id="ExpenseType" onChange={handleChange}>
              <option></option>
              {expenseTypes}
            </select>
          </div>

          <div className="input">
            <label htmlFor="ExpenseHead">Expense</label>
            <select name="ExpenseHead" id="ExpenseHead" onChange={handleChange}>
              <option></option>
              {expenseHeads}
            </select>
          </div>
        </div>
        {expense.ExpenseHead !== "Depreciation" && (
          <>
            <div className="input">
              <label htmlFor="InvoiceNo">Invoice No</label>
              <input
                type="number"
                name="InvoiceNo"
                id="InvoiceNo"
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="Amount">Amount</label>
              <input
                type="number"
                name="Amount"
                id="Amount"
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="PmtMethod">Payment Method</label>
              <select name="PmtMethod" id="PmtMethod" onChange={handleChange}>
                <option></option>
                {methods}
              </select>
            </div>
            {expense.PmtMethod === "Credit" && (
              <div className="input">
                <label htmlFor="Creditor">Creditor Name</label>
                <input
                  type="text"
                  name="Creditor"
                  id="Creditor"
                  onChange={handleChange}
                />
              </div>
            )}

            {expense.PmtMethod === "Bank" && (
              <div className="input">
                <label htmlFor="BankName">Bank</label>
                <select name="BankName" id="BankName" onChange={handleChange}>
                  <option></option>
                  {bankNames}
                </select>
              </div>
            )}
            {expense.PmtMethod === "Other" && (
              <div className="input">
                <label htmlFor="Other">Specify other method</label>
                <input
                  name="Other"
                  id="Other"
                  onChange={(e) => setOthers(e.target.value)}
                />
              </div>
            )}
            <div className="input upd-type">
              <label htmlFor="UpdType">Upd Type</label>
              <input
                type="number"
                name="UpdType"
                id="UpdType"
                onChange={handleChange}
              />
            </div>
            <div className="input rec-id">
              <label htmlFor="RecId">RecId</label>
              <input
                type="number"
                name="RecId"
                id="RecId"
                onChange={handleChange}
              />
            </div>
          </>
        )}
      </section>
      <div className="new-order-wrapper">
        <button
          className="btn-order"
          type="submit"
          onClick={(e) => {
            setIsExpenseForm(false);
            // {
            //   expense.ExpenseHead === "Depreciation"
            //     ? handleDepr()
            //     : handleSubmit;
            // }
            if (expense.ExpenseHead === "Depreciation") {
              handleDepr();
              return;
            }
            handleSubmit();
            setTimeout(() => {
              handleReset();
            }, 1000);
          }}
        >
          Create
        </button>
        <button
          className="btn-discard"
          onClick={() => {
            setAnimState(false);
            setTimeout(() => {
              setAnimState(true);
            }, 1000);
            setIsExpenseForm(false);
            handleReset();
          }}
        >
          Discard
        </button>
      </div>
    </div>
  );
};
