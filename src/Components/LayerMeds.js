import React, { useState } from "react";
import { BsCheckLg } from "react-icons/bs";

export const LayerMeds = ({ setIsLayerMed }) => {
  const [isPeriod, setIsPeriod] = useState("Day");
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
      {isPeriod === "Day" && (
        <table className="meds-table">
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
            <td>1</td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>3</td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>4</td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>5</td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>6</td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>7</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" /> (Lasota)
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>8</td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>9</td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>10</td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>11</td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>12</td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>13</td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>14</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" /> (Gumboro)
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>15</td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>16</td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>17</td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>18</td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>19</td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>20</td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>21</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" /> (Gumboro)
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>28</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" /> (Lasota)
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>37</td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>44</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>58</td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      )}
      {isPeriod === "Week" && (
        <table className="meds-table">
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
            <td>9</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
          </tr>
          <tr>
            <td>12</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" /> (Lasota)
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>13</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
          </tr>
          <tr>
            <td>14</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
          </tr>
          <tr>
            <td>15</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" /> (Lasota)
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>17</td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>18</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
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
          <table className="meds-table">
            <tr>
              <th>Week</th>
              <th>Multivitamin</th>
              <th>Antibiotics / Antiviral</th>
              <th>Vaccination</th>
              <th>Deworm</th>
            </tr>
            <tr>
              <td>19</td>
              <td>
                <BsCheckLg className="check" />
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>20</td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <BsCheckLg className="check" />
              </td>
            </tr>
            <tr>
              <td>21</td>
              <td>
                <BsCheckLg className="check" />
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>22</td>
              <td></td>
              <td>
                <BsCheckLg className="check" />
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>23</td>
              <td>
                <BsCheckLg className="check" />
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>24</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>25</td>
              <td>
                <BsCheckLg className="check" />
              </td>
              <td></td>
              <td>
                <BsCheckLg className="check" />
                (lasota)
              </td>
              <td></td>
            </tr>
            <tr>
              <td>26</td>
              <td></td>
              <td>
                <BsCheckLg className="check" />
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>27</td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <BsCheckLg className="check" />
              </td>
            </tr>
            <tr>
              <td>28</td>
              <td>
                <BsCheckLg className="check" />
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>29</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>30</td>
              <td></td>
              <td></td>
              <td>
                <BsCheckLg className="check" />
                (lasota)
              </td>
              <td></td>
            </tr>
            <tr>
              <td>31</td>
              <td>
                <BsCheckLg className="check" />
              </td>
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
