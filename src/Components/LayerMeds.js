import React, { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export const LayerMeds = ({ setIsLayerMed }) => {
  const [isPeriod, setIsPeriod] = useState("Day");
  const [startDate, setStartDate] = useState(0);

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    const newDate = new Date(result).toLocaleDateString();
    return newDate;
  }
  return (
    <div className="meds animate__animated animate__zoomIn">
      <p className="btn-close med-close" onClick={() => setIsLayerMed(false)}>
        X
      </p>
      <p className="meds-title">Layer Medications</p>
      <button
        onClick={() => setIsPeriod("Day")}
        className={isPeriod === "Day" ? "period med-active" : "period"}
      >
        Daily
      </button>
      <button
        onClick={() => setIsPeriod("Week")}
        className={isPeriod === "Week" ? "period med-active" : "period"}
      >
        Weekly
      </button>
      <button
        onClick={() => setIsPeriod("POL")}
        className={isPeriod === "POL" ? "period med-active" : "period"}
      >
        POL Vaccination
      </button>

      <div className="med-date">
        <p>Start date:</p>
        <input
          type="date"
          name="start-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <p>
          {`${
            startDate
              ? "Expected end date: " + addDays(startDate, 41)
              : "Expected end date would be displayed here when you pick a start date"
          }`}
        </p>
      </div>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button btn-generate"
        table="table-to-xls"
        filename={`Layer Meds from ${startDate}`}
        sheet={`Layer Meds from ${startDate}`}
        buttonText="Download as Excel"
      />
      {isPeriod === "Day" && (
        <table className="meds-table" id="table-to-xls">
          <tr>
            <th>Day</th>
            <th>Multivitamin</th>
            <th>Antibiotics</th>
            <th>Anticoccidiosis</th>
            <th>Antiviral</th>
            <th>Vaccine</th>
            <th>Deworm</th>
            <th>Coryza</th>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 0) : "1"}</td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 1) : "2"}</td>
            <td>✔</td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 2) : "3"}</td>
            <td>✔</td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 3) : "4"}</td>
            <td>✔</td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 4) : "5"}</td>
            <td>✔</td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 5) : "6"}</td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 6) : "7"}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>✔ (Lasota)</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 7) : "8"}</td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 8) : "9"}</td>
            <td></td>
            <td></td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 9) : "10"}</td>
            <td></td>
            <td></td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 10) : "11"}</td>
            <td></td>
            <td></td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 11) : "12"}</td>
            <td></td>
            <td></td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 12) : "13"}</td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 13) : "14"}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>✔ (Gumboro)</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 14) : "15"}</td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 15) : "16"}</td>
            <td>✔</td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 16) : "17"}</td>
            <td>✔</td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 17) : "18"}</td>
            <td>✔</td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 18) : "19"}</td>
            <td>✔</td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 19) : "20"}</td>
            <td>✔</td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 20) : "21"}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>✔ (Gumboro)</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 27) : "28"}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>✔ (Lasota)</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 36) : "37"}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 43) : "44"}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>✔</td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 57) : "58"}</td>
            <td></td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      )}
      {isPeriod === "Week" && (
        <table className="meds-table" id="table-to-xls">
          <tr>
            <th>Week</th>
            <th>Multivitamin</th>
            <th>Antibiotics</th>
            <th>Anticoccidiosis</th>
            <th>Antiviral</th>
            <th>Vaccine</th>
            <th>Deworm</th>
            <th>Coryza</th>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 63) : "9"}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>✔</td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 84) : "12"}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>✔ (Lasota)</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 91) : "13"}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>✔</td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 98) : "14"}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>✔</td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 105) : "15"}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>✔ (Lasota)</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 119) : "17"}</td>
            <td></td>
            <td>✔</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>{startDate ? addDays(startDate, 126) : "18"}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>✔</td>
            <td></td>
          </tr>
        </table>
      )}
      {isPeriod === "POL" && (
        <>
          <p className="med-dir">
            <span>Multivitamin:</span> Applied for 2/3 Days on each occasion
          </p>
          <p className="med-dir">
            <span>Antibiotics/Antiviral: </span> Applied for 3 Days preventive
            regimen monthly
          </p>
          <p className="med-dir">
            <span>Vaccination:</span> Every 5 week cycle
          </p>
          <p className="med-dir">
            <span>Deworm:</span> Every 7 week cycle
          </p>

          <p className="med-note">
            Medications should be administered for up to 2 years
          </p>
          <table className="meds-table" id="table-to-xls">
            <tr>
              <th>Week</th>
              <th>Multivitamin</th>
              <th>Antibiotics / Antiviral</th>
              <th>Vaccination</th>
              <th>Deworm</th>
            </tr>
            <tr>
              <td>{startDate ? addDays(startDate, 133) : "19"}</td>
              <td>✔</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{startDate ? addDays(startDate, 140) : "20"}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>✔</td>
            </tr>
            <tr>
              <td>{startDate ? addDays(startDate, 147) : "21"}</td>
              <td>✔</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{startDate ? addDays(startDate, 154) : "22"}</td>
              <td></td>
              <td>✔</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{startDate ? addDays(startDate, 161) : "23"}</td>
              <td>✔</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{startDate ? addDays(startDate, 168) : "24"}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{startDate ? addDays(startDate, 175) : "25"}</td>
              <td>✔</td>
              <td></td>
              <td>✔ (lasota)</td>
              <td></td>
            </tr>
            <tr>
              <td>{startDate ? addDays(startDate, 182) : "26"}</td>
              <td></td>
              <td>✔</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{startDate ? addDays(startDate, 189) : "27"}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>✔</td>
            </tr>
            <tr>
              <td>{startDate ? addDays(startDate, 196) : "28"}</td>
              <td>✔</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{startDate ? addDays(startDate, 203) : "29"}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{startDate ? addDays(startDate, 210) : "30"}</td>
              <td></td>
              <td></td>
              <td>✔ (lasota)</td>
              <td></td>
            </tr>
            <tr>
              <td>{startDate ? addDays(startDate, 217) : "31"}</td>
              <td>✔</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </>
      )}
    </div>
  );
};
