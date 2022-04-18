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

export const SupplyPipeline = () => {
  const [returnedExpenses, setReturnedExpenses] = useState([]);
  const [returnedSupplyPipeline, setReturnedSupplyPipeline] = useState([]);
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
  const [search, setSearch] = useState("");
  const [supplyPipeline, setSupplyPipeline] = useState({
    LastUpdated: "",
    Farm: "",
    BroilerEmd: "",
    NoilerEmd: "",
    CockerelEmd: "",
    LayerEmd: "",
    PolEmd: "",
    BroilerEq: 0,
    NoilerEq: 0,
    CockerelEq: 0,
    LayerEq: 0,
    PolEq: 0,
    BroilerEw: 0,
    NoilerEw: 0,
    CockerelEw: 0,
    LayerEw: 0,
    PolEw: 0,
    Name: "",
    Phone: "",
    Address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "BroilerEq" ||
      name === "NoilerEq" ||
      name === "CockerelEq" ||
      name === "LayerEq" ||
      name === "PolEq" ||
      name === "BroilerEw" ||
      name === "NoilerEw" ||
      name === "CockerelEw" ||
      name === "LayerEw" ||
      name === "PolEw"
    ) {
      setSupplyPipeline((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setSupplyPipeline((prevState) => ({
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

    setSupplyPipeline((prevState) => ({
      ...prevState,
    }));
  };

  const newDocSale = async () => {
    const newData = await fetch("/create/supply_pipeline", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        accessToken: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        ...supplyPipeline,
      }),
    }).then((res) => res.json());
    setReturnedData(newData[0]);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //getting the data from the database from the db-----------------------------------------
  const getSupplyPipeline = async () => {
    try {
      const supplyPipeline = await fetch("/api/all-supply-pipeline", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          accessToken: localStorage.getItem("accessToken"),
        },
      }).then((res) => res.json());
      setReturnedSupplyPipeline(supplyPipeline);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSupplyPipeline();
  }, []);
  console.log(returnedSupplyPipeline);
  //   getting the data from the database from the db end-----------------------------------------

  let allSupplyPipeline = returnedSupplyPipeline.name;

  const sortSupplyPipeline =
    returnedSupplyPipeline.name && search
      ? returnedSupplyPipeline.name.filter((sortedSupplyPipeline) =>
          sortedSupplyPipeline.Farm.toLowerCase().includes(search.toLowerCase())
        )
      : allSupplyPipeline;

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
          <div className={isDocForm ? "doc-form show-doc-form" : "doc-form"}>
            <h2>Supply Pipeline</h2>
            <div className="trade-input">
              <label htmlFor="lastupdated">Last Updated:</label>
              <input
                id="lastupdated"
                type="date"
                name="LastUpdated"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="farm">Farm:</label>
              <input
                id="farm"
                type="text"
                name="Farm"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="broileremd">
                Broiler Expected Maturity Date:
              </label>
              <input
                id="broileremd"
                type="date"
                name="BroilerEmd"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="noileremd">Noiler Expected Maturity Date:</label>
              <input
                id="noileremd"
                type="date"
                name="NoilerEmd"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="cockerelemd">
                Cockerel Expected Maturity Date:
              </label>
              <input
                id="cockerelemd"
                type="date"
                name="CockerelEmd"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="layeremd">Layer Expected Maturity Date:</label>
              <input
                id="layeremd"
                type="date"
                name="LayerEmd"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="polemd">Pol Expected Maturity Date:</label>
              <input
                id="polemd"
                type="date"
                name="PolEmd"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="broilereq">Broiler Expected Quantity:</label>
              <input
                id="broilereq"
                type="number"
                name="BroilerEq"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="noilereq">Noiler Expected Quantity:</label>
              <input
                id="noilereq"
                type="number"
                name="NoilerEq"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="cockereleq">Cockerel Expected Quantity:</label>
              <input
                id="cockereleq"
                type="number"
                name="CockerelEq"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="layereq">Layer Expected Quantity:</label>
              <input
                id="layereq"
                type="number"
                name="LayerEq"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="poleq">Pol Expected Quantity:</label>
              <input
                id="poleq"
                type="number"
                name="PolEq"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="broilerew">
                Broiler Expected Weight(Kg/Bird):
              </label>
              <input
                id="broilerew"
                type="number"
                name="BroilerEw"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="noilerew">Noiler Expected Weight(Kg/Bird):</label>
              <input
                id="noilerew"
                type="number"
                name="NoilerEw"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="cockerelew">
                Cockerel Expected Weight(Kg/Bird):
              </label>
              <input
                id="cockerelew"
                type="number"
                name="CockerelEw"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="layerew">Layer Expected Weight(Kg/Bird):</label>
              <input
                id="layerew"
                type="number"
                name="LayerEw"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="polew">Pol Expected Weight(Kg/Bird):</label>
              <input
                id="polew"
                type="number"
                name="PolEw"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="Name"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="number"
                name="Phone"
                onChange={handleChange}
              />
            </div>
            <div className="trade-input">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                type="text"
                name="Address"
                onChange={handleChange}
              />
            </div>

            <div className="new-order-wrapper">
              <button
                onClick={() => {
                  setIsDocForm(false);
                  handleReset();
                }}
                className="btn-discard"
              >
                Discard
              </button>
              <button
                onClick={() => {
                  newDocSale();
                  setIsDocForm(false);
                  setTimeout(() => {
                    getSupplyPipeline();
                  }, 1500);
                  setTimeout(() => {
                    handleReset();
                  }, 1000);
                }}
                className="btn-order"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="expense-head">
            <button className="back-btn" onClick={() => history.goBack()}>
              <AiOutlineLeft /> Go back
            </button>
            <div className="expense-heading">
              <h1>Live Chicken Supply Pipeline</h1>
            </div>
            <div className="new-btn" onClick={() => setIsDocForm(!isDocForm)}>
              <div className="plus-circle">
                <HiOutlinePlus />
              </div>
              <p>New</p>
            </div>
          </div>
          <div className="farm-hands-container">
            <input
              name="search"
              id="search"
              className="search"
              value={search}
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            {returnedSupplyPipeline.name ? (
              <div className="all-farm-hands">
                <table>
                  <tbody>
                    <th id="total" className="total" colSpan="2"></th>
                    <th className="total total-head" colSpan="5">
                      Expected maturity date
                    </th>
                    <th className="total total-head" colSpan="5">
                      Expected Quantity
                    </th>
                    <th className="total total-head" colSpan="5">
                      Expected Weight (Kg/Bird)
                    </th>
                    <th className="total total-head" colSpan="5">
                      Contact Information
                    </th>
                    <tr>
                      <th>Last Updated</th>
                      <th>Farm</th>
                      <th>Broiler</th>
                      <th>Noiler</th>
                      <th>Cockerel</th>
                      <th>Layer</th>
                      <th>Pol</th>
                      <th>Broiler</th>
                      <th>Noiler</th>
                      <th>Cockerel</th>
                      <th>Layer</th>
                      <th>Pol</th>
                      <th>Broiler</th>
                      <th>Noiler</th>
                      <th>Cockerel</th>
                      <th>Layer</th>
                      <th>Pol</th>
                      <th>Name</th>
                      <th>Telephone</th>
                      <th>Address</th>
                    </tr>
                  </tbody>
                  {returnedSupplyPipeline.name &&
                    sortSupplyPipeline.map((supply) => {
                      const {
                        SupplyId,
                        LastUpdated,
                        Farm,
                        BroilerEmd,
                        NoilerEmd,
                        CockerelEmd,
                        LayerEmd,
                        PolEmd,
                        BroilerEq,
                        NoilerEq,
                        CockerelEq,
                        LayerEq,
                        PolEq,
                        BroilerEw,
                        NoilerEw,
                        CockerelEw,
                        LayerEw,
                        PolEw,
                        Name,
                        Phone,
                        Address,
                      } = supply;
                      const newDate = `${new Date(
                        LastUpdated
                      ).toLocaleDateString()}`;
                      const newBroilerDate = `${new Date(
                        BroilerEmd
                      ).toLocaleDateString()}`;
                      const newNoilerDate = `${new Date(
                        NoilerEmd
                      ).toLocaleDateString()}`;
                      const newCockerelDate = `${new Date(
                        CockerelEmd
                      ).toLocaleDateString()}`;
                      const newLayerDate = `${new Date(
                        LayerEmd
                      ).toLocaleDateString()}`;
                      const newPolDate = `${new Date(
                        PolEmd
                      ).toLocaleDateString()}`;
                      return (
                        <tbody key={SupplyId}>
                          <tr>
                            <td>{newDate}</td>
                            <td>{Farm}</td>
                            <td>{newBroilerDate}</td>
                            <td>{newNoilerDate}</td>
                            <td>{newCockerelDate}</td>
                            <td>{newLayerDate}</td>
                            <td>{newPolDate}</td>
                            <td>{BroilerEq.toFixed(2)}</td>
                            <td>{NoilerEq.toFixed(2)}</td>
                            <td>{CockerelEq.toFixed(2)}</td>
                            <td>{LayerEq.toFixed(2)}</td>
                            <td>{PolEq ? PolEq.toFixed(2) : PolEq}</td>
                            <td>{BroilerEw.toFixed(2)}</td>
                            <td>{NoilerEw.toFixed(2)}</td>
                            <td>{CockerelEw.toFixed(2)}</td>
                            <td>{LayerEw.toFixed(2)}</td>
                            <td>{PolEw ? PolEw.toFixed(2) : PolEw}</td>
                            <td>{Name}</td>
                            <td>{Phone}</td>
                            <td>{Address}</td>
                          </tr>
                        </tbody>
                      );
                    })}
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
