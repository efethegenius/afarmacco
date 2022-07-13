import React, { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
export const NoilerMeds = ({ setIsNoilerMed }) => {
  const [startDate, setStartDate] = useState(0);

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    const newDate = new Date(result).toLocaleDateString();
    return newDate;
  }
  return (
    <div className="meds animate__animated animate__zoomIn">
      <p className="btn-close med-close" onClick={() => setIsNoilerMed(false)}>
        X
      </p>
      <p className="meds-title">Noiler Medications</p>

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
        filename={`Noiler Meds from ${startDate}`}
        sheet={`Noiler Meds from ${startDate}`}
        buttonText="Download as Excel"
      />
      <table className="meds-table" id="table-to-xls">
        <tr>
          <th>Day</th>
          <th>Multivitamin</th>
          <th>Antibiotics</th>
          <th>Anticoccidiosis</th>
          <th>Antiviral</th>
          <th>Gumboro</th>
          <th>Lasota</th>
          <th>Deworm</th>
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
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 5) : "6"}</td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 6) : "7"}</td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 7) : "8"}</td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 8) : "9"}</td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 9) : "10"}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 10) : "11"}</td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 11) : "12"}</td>
          <td>✔</td>
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
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 13) : "14"}</td>
          <td>✔</td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 14) : "15"}</td>
          <td>✔</td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 15) : "16"}</td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 16) : "17"}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 17) : "18"}</td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 27) : "28"}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 29) : "30"}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 30) : "31"}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 31) : "32"}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 32) : "33"}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 33) : "34"}</td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 34) : "35"}</td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 35) : "36"}</td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
          <td></td>
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
          <td>{startDate ? addDays(startDate, 37) : "38"}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 38) : "39"}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 39) : "40"}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>✔</td>
        </tr>
        <tr>
          <td>{startDate ? addDays(startDate, 40) : "41"}</td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  );
};
