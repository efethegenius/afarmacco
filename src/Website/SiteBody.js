import React, { useState } from "react";
import { services } from "./data";
import woman from "./Photos/woman-chicken.png";
import phone from "./Photos/phone.png";
import laptop from "./Photos/laptop.png";
import { Slide } from "react-awesome-reveal";
import { Link as Links } from "react-router-dom";
import { TestimonialsPage } from "./TestimonialsPage";
import { BsMouse, BsArrowRight } from "react-icons/bs";
import Fade from "react-reveal/Fade";
import banner from "./banner.png";

export const SiteBody = () => {
  const [myServices, setMyServices] = useState(services);
  const [isFaq1, setIsFaq1] = useState(false);
  const [isFaq2, setIsFaq2] = useState(false);
  const [isFaq3, setIsFaq3] = useState(false);
  const [isFaq4, setIsFaq4] = useState(false);
  const [isFaq5, setIsFaq5] = useState(false);
  return (
    <div className="site-body-container">
      <div className="started-2">
        <div className="ft-head">
          <h4>
            The poultry industry is a critical segment of the livestock sector
            due to economic and health benefits. Through the various modules
            within this portal, we provide functional management tools in the
            vital areas of need to the farmer.
          </h4>
          <h4 className="ft-head-2">
            afarmaccco enables the farmer to maintain their day to day
            operational records and provides industry insights. The service
            helps to:
          </h4>
        </div>

        <Fade>
          <div className="started-2-details">
            <div className="features-gd-1">
              <div className="ft-col-1 ft-1">
                <h4>Record Transactions & Prepare Accounts</h4>
              </div>
              <div className="ft-det">
                <h4>
                  Keep basic records of financial transactions and focus on your
                  profitability or otherwise.
                </h4>
                <ul>
                  <li>Purchases: DOC, POL, Feeds, Assets, etc</li>
                  <li>
                    Sales: Mature chickes, POL, Dressed birds, Egg, Manure,
                    Assets disposals, etc
                  </li>
                  <li>Income statemenr and assets/liabilities</li>
                  <li>Pricing template for farm produce</li>
                </ul>
              </div>
            </div>
            <div className="features-gd-1">
              <div className="ft-col-1 ft-2">
                <h4>Produce Marketing & Sales</h4>
              </div>
              <div className="ft-det">
                <h4>Access market intelligence to drive sales of your birds</h4>
                <ul>
                  <li>Directory of Farmers'</li>
                  <li>Directory of off-takers</li>
                  <li>Produce maturity pipeline</li>
                  <li>Market/pricing updates</li>
                </ul>
              </div>
            </div>
            <div className="features-gd-1">
              <div className="ft-col-1 ft-3">
                <h4>Health Management & Production</h4>
              </div>
              <div className="ft-det">
                <h4>
                  Monitor and apply medications/vaccinations to secure your
                  birds against diseases with valid extension services.
                </h4>
                <ul>
                  <li>Calender for drug administration to birds</li>
                  <li>Reminder alerts to farmer</li>
                  <li>Extension services support to farmer</li>
                </ul>
              </div>
            </div>
            <div className="features-gd-1">
              <div className="ft-col-1 ft-4">
                <h4>Farm Hands Pool</h4>
              </div>
              <div className="ft-det">
                <h4>Sourcing and placement of farm hands</h4>
                <ul>
                  <li>Data base of available farm hands and their locations</li>
                  <li>Match farmer to labour</li>
                </ul>
              </div>
            </div>
          </div>
        </Fade>
      </div>
      <div className="footer-btn-container">
        <Links to="/register" className="f-btn-signup">
          Sign-Up
        </Links>
        <Links to="login" className="f-btn-login">
          Login
        </Links>
      </div>
      <img src={banner} alt="banner" className="banner" />
      <p className="copyright">© 2022 afarmacco&reg;</p>
    </div>
  );
};
