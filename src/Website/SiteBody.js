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

export const SiteBody = () => {
  const [myServices, setMyServices] = useState(services);
  const [isFaq1, setIsFaq1] = useState(false);
  const [isFaq2, setIsFaq2] = useState(false);
  const [isFaq3, setIsFaq3] = useState(false);
  const [isFaq4, setIsFaq4] = useState(false);
  const [isFaq5, setIsFaq5] = useState(false);
  return (
    <div className="site-body-container">
      {/* <div>
        <h3>Afarmacco: Poultry Management App</h3>
        <p>Simple, easy to use, efficient...</p>
      </div> */}

      <div className="services-wrapper">
        <Fade left>
          <h1>FEATURES</h1>
        </Fade>
        <div className="services-container">
          {/* <h1>Features</h1> */}
          {myServices.map((service) => {
            const { id, description, img, topic } = service;
            return (
              <Fade bottom>
                <div key={id} className="service">
                  <img src={img} alt="Image" />
                  <p className="service-title">{topic}</p>
                  <p className="service-desc">{description}</p>
                </div>
              </Fade>
            );
          })}
        </div>
      </div>
      <div className="started-2">
        <Fade left>
          <div className="started-2-details">
            {/* <img src={farm} alt="farm" className="poultry-farm" /> */}
            <h1 className="started-title">
              Stay on track with your birds and financial records with Afarmacco
            </h1>
            <p className="started-desc">
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam
            </p>
            <Links to="/register" className="btn-get-started">
              Get Started <BsArrowRight className="arrow-right" />
            </Links>
          </div>
        </Fade>
        <Fade bottom>
          <div className="mouse-container">
            <p>Scroll Down</p>
            <BsMouse />
          </div>
        </Fade>
      </div>
      <TestimonialsPage />
      <div className="faq-wrapper">
        <div className="wc-container">
          <Fade left>
            <img src={woman} alt="woman" className="woman-chicken" />
          </Fade>
        </div>
        <Fade>
          <div className="faq-container">
            <Fade left>
              <h1 className="faq-head">FAQs</h1>
            </Fade>
            <div
              className="faq-ans"
              onClick={() => {
                setIsFaq1(!isFaq1);
                setIsFaq2(false);
                setIsFaq3(false);
                setIsFaq4(false);
                setIsFaq5(false);
              }}
            >
              <p className={isFaq1 ? "faq-title color" : "faq-title"}>
                Can I see my remaining birds, drugs or feed in stock?
              </p>
              <p className={isFaq1 ? "faq-desc show-faq-desc" : "faq-desc"}>
                Yes, you can. Your Birds, Drugs and Feeds are all summed up in
                the INVENTORY page.
              </p>
            </div>
            <div
              className="faq-ans"
              onClick={() => {
                setIsFaq1(false);
                setIsFaq2(!isFaq2);
                setIsFaq3(false);
                setIsFaq4(false);
                setIsFaq5(false);
              }}
            >
              <p className={isFaq2 ? "faq-title color" : "faq-title"}>
                How do I know when to apply medications on my bird?
              </p>
              <p className={isFaq2 ? "faq-desc show-faq-desc" : "faq-desc"}>
                You can know the appropriate time and medication to apply to
                your birds (Cockerel, Noiler, Broiler, Layer) by navigating to
                the "HEALTH" tab and selecting the bird type you wish.
              </p>
            </div>
            <div
              className="faq-ans"
              onClick={() => {
                setIsFaq1(false);
                setIsFaq2(false);
                setIsFaq3(!isFaq3);
                setIsFaq4(false);
                setIsFaq5(false);
              }}
            >
              <p className={isFaq3 ? "faq-title color" : "faq-title"}>
                Can I generate a report for my activities on the app?
              </p>
              <p className={isFaq3 ? "faq-desc show-faq-desc" : "faq-desc"}>
                Yes you can generate reports for any transactions performed in
                app. reports can be downloaded in excel format, saved as PDF or
                printed out directly.
              </p>
            </div>
            {/* <div
              className="faq-ans"
              onClick={() => {
                setIsFaq1(false);
                setIsFaq2(false);
                setIsFaq3(false);
                setIsFaq4(!isFaq4);
                setIsFaq5(false);
              }}
            >
              <p className={isFaq4 ? "faq-title color" : "faq-title"}>
                How do i know my profit and loss with the Afarmacco app?
              </p>
              <p className={isFaq4 ? "faq-desc show-faq-desc" : "faq-desc"}>
                For any CAPEX transactions performed,
              </p>
            </div> */}
            <div
              className="faq-ans"
              onClick={() => {
                setIsFaq1(false);
                setIsFaq2(false);
                setIsFaq3(false);
                setIsFaq4(false);
                setIsFaq5(!isFaq5);
              }}
            >
              <p className={isFaq5 ? "faq-title color" : "faq-title"}>
                How do I know when my assets are depreciating?
              </p>
              <p className={isFaq5 ? "faq-desc show-faq-desc" : "faq-desc"}>
                Depreciation of assets are done on a monthly basis. At the end
                of each month, you are expected to perform depreciation to
                calculate the current value of your assets. The depreciation
                would automatically run for ALL assets that are due for
                depreciation so you do not have to manually depreciate each
                asset. To perform depreciation, click on the NEW button in the
                EXPENSE tab and select DEPRECIATION under the Expense drop-down.
              </p>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};
