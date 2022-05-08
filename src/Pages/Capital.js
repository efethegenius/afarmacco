import React, { useState, useEffect, useRef, useContext } from "react";
import "../Styles/Expense.css";
import { AiOutlineMenu, AiOutlineLeft } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
import { AuthContext } from "../helpers/AuthContext";
import { Navbar } from "../Components/Navbar";
import { LoggedOut } from "../Components/LoggedOut";
import "../Styles/opex.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export const Capital = () => {
  const [isNav, setIsNav] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);
  const history = useHistory();
  const [showOptions, setShowOptions] = useState(false);
  const [batch, setBatch] = useState("");
  const [margin, setMargin] = useState("");
  const [returnedDocPurchase, setReturnedDocPurchase] = useState([]);
  const [returnedBirdSales, setReturnedBirdSales] = useState([]);
  const [returnedDocMortality, setReturnedDocMortality] = useState([]);
  //   const [cash, setCash] = useState(0);
  //   const [asset, setAsset] = useState(0);
  //   const [others, setOthers] = useState(0);
  //   const [third1, setThird1] = useState(0);
  //   const [third2, setThird2] = useState(0);
  //   const [third3, setThird3] = useState(0);
  //   const [longTerm, setLongTerm] = useState(0);
  //   const [shortTerm, setShortTerm] = useState(0);
  const [capital, setCapital] = useState({
    cash: 0,
    asset: 0,
    others: 0,
    third1: 0,
    third2: 0,
    third3: 0,
    longTerm: 0,
    shortTerm: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "cash" ||
      name === "asset" ||
      "others" ||
      "third1" ||
      "thrid2" ||
      "third3" ||
      "longTerm" ||
      "shortTerm"
    ) {
      setCapital((prevState) => ({
        ...prevState,
        [name]: parseInt(value),
      }));
      return;
    }
    setCapital((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="drug">
      {/* <Navbar isNav={isNav} setIsNav={setIsNav} /> */}
      {authState ? (
        <div className="drug-container">
          <div className="drug-head">
            <button className="back-btn" onClick={() => history.goBack()}>
              <AiOutlineLeft /> Go back
            </button>
            <div className="drug-heading">
              <h1>Capital</h1>
            </div>
            <p> </p>
          </div>
          <div className="pricing-container">
            <table className="pricing-table">
              <tbody>
                <tr>
                  <td>Cash</td>
                  <td>
                    <input
                      type="number"
                      id="batch"
                      name="cash"
                      onChange={handleChange}
                    />
                  </td>
                  <td></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Assets</td>
                  <td>
                    <input
                      type="number"
                      id="margin"
                      name="asset"
                      onChange={handleChange}
                    />
                  </td>
                  <td></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Others</td>
                  <td>
                    <input
                      type="number"
                      id="margin"
                      name="others"
                      onChange={handleChange}
                    />
                  </td>
                  <td></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td>{capital.cash + capital.asset + capital.others}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th>Third Party Investment:</th>
                  <th></th>
                  <th></th>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>3rd Party No.1</td>
                  <td>
                    <input
                      type="number"
                      id="margin"
                      name="third1"
                      onChange={handleChange}
                    />
                  </td>
                  <td></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>3rd Party No.2</td>
                  <td>
                    <input
                      type="number"
                      id="margin"
                      name="third2"
                      onChange={handleChange}
                    />
                  </td>
                  <td></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>3rd Party No.3</td>
                  <td>
                    <input
                      type="number"
                      id="margin"
                      name="third3"
                      onChange={handleChange}
                    />
                  </td>
                  <td></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td>{capital.third1 + capital.third2 + capital.third3}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th>Total Equity:</th>
                  <th></th>
                  <th>
                    {capital.cash +
                      capital.asset +
                      capital.others +
                      (capital.third1 + capital.third2 + capital.third3)}
                  </th>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Long Term Loans: ≥ 5years</td>
                  <td>
                    <input
                      type="number"
                      id="margin"
                      name="longTerm"
                      onChange={handleChange}
                    />
                  </td>
                  <td></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Short/Medium Term Loans: ≥2years≤5years</td>
                  <td>
                    <input
                      type="number"
                      id="margin"
                      name="shortTerm"
                      onChange={handleChange}
                    />
                  </td>
                  <td></td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td>{capital.longTerm + capital.shortTerm}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>TOTAL CAPITAL</td>
                  <td></td>
                  <td>
                    {capital.cash +
                      capital.asset +
                      capital.others +
                      (capital.third1 + capital.third2 + capital.third3) +
                      (capital.longTerm + capital.shortTerm)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <LoggedOut />
      )}
    </div>
  );
};
