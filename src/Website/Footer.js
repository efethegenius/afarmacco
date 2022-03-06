import React from "react";
import banner from "./banner.png";
import {
  AiOutlineMail,
  AiOutlineInstagram,
  AiOutlineLinkedin,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  IoIosDesktop,
  IoIosTabletPortrait,
  IoIosPhonePortrait,
} from "react-icons/io";
export const Footer = () => {
  return (
    <div className="footer">
      <div className="devices-container">
        <p>Available on the web for all devices...</p>
        <div className="devices-wrapper">
          <div className="devices">
            <IoIosDesktop className="device" />
            <p>PC</p>
          </div>
          <div className="devices">
            <IoIosTabletPortrait className="device" />
            <p>Tablet</p>
          </div>
          <div className="devices">
            <IoIosPhonePortrait className="device" />
            <p>Mobile</p>
          </div>
        </div>
      </div>
      <div className="footer-head">
        <h2>
          THE EASIEST WAY TO MANAGE YOUR POULTRY, FINANCES AND TRACK YOUR ASSETS
        </h2>
        <div className="footer-btn-container">
          <Link to="/register" className="f-btn-signup">
            Sign-Up
          </Link>
          <Link to="login" className="f-btn-login">
            Login
          </Link>
        </div>
      </div>
      <div className="footer-body">
        {/* <p className="get-in-touch">Get in touch with us</p>
        <div className="icon-container">
          <AiOutlineMail className="icon" />
          <AiOutlineInstagram className="icon" />
          <AiOutlineLinkedin className="icon" />
          <p></p>
        </div> */}
        <div className="privacy-container">
          <p>• Privacy</p>
          <p>• Terms and Conditions</p>
        </div>
        <p className="copyright">© 2022 afarmacco&reg;</p>
        <img src={banner} alt="banner" className="banner" />
      </div>
    </div>
  );
};
