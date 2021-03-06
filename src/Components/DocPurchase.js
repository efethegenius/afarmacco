import react, { useState, useContext, useEffect } from "react";
import {
  FetchExpenseTypes,
  FetchBanks,
  FetchBirds,
  FetchMethods,
} from "../FetchOptions/FetchOptions";
import { AuthContext } from "../helpers/AuthContext";

export const DocPurchase = ({
  isDocPurchaseForm,
  getAllDocPurchase,
  getActiveCreditors,
  setIsDocPurchaseForm,
  animState,
  setAnimState,
}) => {
  const [fieldErr, setFieldErr] = useState(false);
  const [pmtErr, setPmtErr] = useState(false);
  const [returnedData, setReturnedData] = useState();
  const { returnedBanks } = FetchBanks();
  const { returnedMethods } = FetchMethods();
  const { returnedExpenseTypes } = FetchExpenseTypes();
  const { returnedBirds } = FetchBirds();
  const { upd, setUpd, setOpexTxn, opexTxn } = useContext(AuthContext);
  const [others, setOthers] = useState("");

  const [purchase, setPurchase] = useState({
    PurchaseDate: 0,
    InvoiceNo: 0,
    BirdType: "",
    Batch: 0,
    ExpenseType: "",
    Qty: 0,
    UnitPrice: 0,
    PmtMethod: "",
    Creditor: "",
    BankName: "",
    Updtype: 1,
    RecId: 0,
  });

  //  working test for mapping through a returned array (step 1)
  // our useState array that would accept the returned array:
  // const [testData, setTestData] = useState([]);

  //Importing the dropdowns---------------------------------------
  let birdTypes;
  if (returnedBirds.name) {
    birdTypes = returnedBirds.name.map((bird) => {
      return <option key={bird.BirdTypeId}>{bird.BirdName}</option>;
    });
  }
  let bankNames;
  if (returnedBanks.name) {
    bankNames = returnedBanks.name.map((bank) => {
      return <option key={bank.BankId}>{bank.BankName}</option>;
    });
  }
  let methods;
  if (returnedMethods.name) {
    methods = returnedMethods.name.map((method) => {
      return <option key={method.PmtMethodId}>{method.PmtType}</option>;
    });
  }
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

  //Importing the dropdowns---------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (
      name === "InvoiceNo" ||
      name === "Batch" ||
      name === "Qty" ||
      name === "UnitPrice" ||
      name === "UpdType" ||
      name === "RecId"
    ) {
      setPurchase((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setPurchase((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    Array.from(document.querySelectorAll("select")).forEach(
      (select) => (select.value = "")
    );

    setPurchase((prevState) => ({
      ...prevState,
    }));
  };

  // const getData = async () => {
  //   try {
  //     console.log(purchase);
  //     const newData = get_doc_purchase", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: purchase.InvoiceNo,
  //       }),
  //     }).then((res) => res.json());
  //     console.log(newData);
  //     setReturnedData(newData[0]);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //  working test for mapping through a returned array (step 2)
  //setting the returned array to be our testData useState:
  // setTestData(newData);
  // };

  const newPurchase = async () => {
    if (
      !purchase.Batch ||
      !purchase.BirdType ||
      !purchase.PmtMethod ||
      !purchase.PurchaseDate ||
      !purchase.Qty ||
      !purchase.UnitPrice
    ) {
      setFieldErr(true);
      setTimeout(function () {
        setFieldErr(false);
      }, 4000);
      return;
    }

    if (
      !purchase.BankName &&
      !purchase.Creditor &&
      purchase.PmtMethod !== "Cash" &&
      purchase.PmtMethod !== "Other"
    ) {
      setPmtErr(true);
      setTimeout(function () {
        setPmtErr(false);
      }, 4000);
      return;
    }
    const newData = await fetch(
      "https://afarmacco-api.herokuapp.com/create/doc_purchase",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({
          ...purchase,
        }),
      }
    ).then((res) => res.json());
    setReturnedData(newData[0]);
    setAnimState(false);
    setTimeout(() => {
      setAnimState(true);
    }, 1000);
    setIsDocPurchaseForm(false);
    setOpexTxn(true);
    setTimeout(() => {
      setOpexTxn(false);
    }, 4000);
  };

  const handleSubmit = () => {
    newPurchase();
    setTimeout(() => {
      getAllDocPurchase();
      getActiveCreditors();
    }, 1500);
  };

  useEffect(() => {
    if (upd) {
      setPurchase((prevState) => ({
        ...prevState,
        UpdType: 1,
      }));
    }
  }, []);

  return (
    <div
      className={`${
        isDocPurchaseForm && animState
          ? "doc-purchase animate__animated animate__fadeInDown"
          : !isDocPurchaseForm && animState
          ? "hide-doc-purchase"
          : "doc-purchase animate__animated animate__fadeOutUp"
      }`}
    >
      <section className="form-doc-purchase">
        <h2 className="form-head">Day Old Chicks Purchase</h2>
        {fieldErr && (
          <p className="form-err animate__animated animate__shakeX">
            All required fields must be filled
          </p>
        )}
        <div className="input">
          <label htmlFor="PurchaseDate">Date</label>
          <input
            type="date"
            name="PurchaseDate"
            id="PurchaseDate"
            onChange={handleChange}
          />
        </div>
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
          <label htmlFor="ExpenseType">Expense Type</label>
          <select name="ExpenseType" id="ExpenseType" onChange={handleChange}>
            <option></option>
            {expenseTypes}
          </select>
        </div>
        <div className="bird-type-container">
          <div className="input">
            <label htmlFor="BirdType">Bird</label>
            <select name="BirdType" id="BirdType" onChange={handleChange}>
              <option></option>
              {birdTypes}
            </select>
          </div>
          <div className="input">
            <label htmlFor="Batch">Batch</label>
            <input
              type="number"
              name="Batch"
              id="Batch"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="qty-container">
          <div className="input">
            <label htmlFor="Qty">Quantity</label>
            <input type="number" name="Qty" id="Qty" onChange={handleChange} />
          </div>
          <div className="input">
            <label htmlFor="UnitPrice">Unit Price</label>
            <input
              type="number"
              name="UnitPrice"
              id="UnitPrice"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input">
          <label htmlFor="PmtMethod">Payment Method</label>
          <select name="PmtMethod" id="PmtMethod" onChange={handleChange}>
            <option></option>
            {methods}
          </select>
        </div>
        {pmtErr && (
          <p className="form-err animate__animated animate__shakeX">
            Please select a payment method
          </p>
        )}
        {purchase.PmtMethod === "Credit" && (
          <div className="input">
            <label htmlFor="Creditor">Creditor</label>
            <input
              type="text"
              name="Creditor"
              id="Creditor"
              onChange={handleChange}
            />
          </div>
        )}
        {purchase.PmtMethod === "Bank" && (
          <div className="input">
            <label htmlFor="BankName">Bank</label>
            <select name="BankName" id="BankName" onChange={handleChange}>
              <option></option>
              {bankNames}
            </select>
          </div>
        )}
        {purchase.PmtMethod === "Other" && (
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
        <div className="new-order-wrapper">
          <button
            className="btn-order"
            onClick={() => {
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
              setIsDocPurchaseForm(false);
              setAnimState(false);
              setTimeout(() => {
                setAnimState(true);
              }, 1000);
              handleReset();
            }}
          >
            Discard
          </button>
        </div>
      </section>
      <div className="advert">Place Adverts Here</div>
    </div>
  );
};
