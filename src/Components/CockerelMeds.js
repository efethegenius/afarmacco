import React, { useState } from "react";
import { BsCheckLg } from "react-icons/bs";

export const CockerelMeds = ({ setIsCockerelMed }) => {
  const [isPeriod, setIsPeriod] = useState("Day");
  return (
    <div className="meds animate__animated animate__zoomIn">
      <p
        className="btn-close med-close"
        onClick={() => setIsCockerelMed(false)}
      >
        X
      </p>
      <p className="meds-title">Cockerel Medications</p>
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
          </tr>
          <tr>
            <td>6</td>
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
          </tr>
          <tr>
            <td>7</td>
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
            <td>8</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" /> (Gumboro)
            </td>
            <td></td>
          </tr>
          <tr>
            <td>9</td>
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
            <td>10</td>
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
            <td>11</td>
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
            <td>12</td>
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
            <td>13</td>
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
            <td>14</td>
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
            <td>15</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" /> (Lasota)
            </td>
            <td></td>
          </tr>
          <tr>
            <td>16</td>
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
            <td>18</td>
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
            <td>19</td>
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
            <td>20</td>
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
          </tr>
          <tr>
            <td>22</td>
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
            <td>23</td>
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
            <td>24</td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>25</td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>26</td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>27</td>
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
            <td>28</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" /> (Lasota)
            </td>
            <td></td>
          </tr>
          <tr>
            <td>29</td>
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
            <td>30</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" /> (Fowl pox)
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
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>32</td>
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
            <td>33</td>
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
            <td>34</td>
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
            <td>35</td>
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
            <td>36</td>
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
            <td>47</td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" /> (NDV KOMOROV)
            </td>
            <td></td>
          </tr>
          <tr>
            <td>48</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>49</td>
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
            <td>50</td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>51</td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>52</td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>53</td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>54</td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>55</td>
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
          </tr>
          <tr>
            <td>10</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <BsCheckLg className="check" />
            </td>
          </tr>
        </table>
      )}
    </div>
  );
};
