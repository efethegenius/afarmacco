import React, { useContext, useState } from "react";
import "../Styles/Navbar.css";
import { MdDashboard } from "react-icons/md";
import { BsWallet2, BsCashCoin } from "react-icons/bs";
import { RiHealthBookLine } from "react-icons/ri";
import { SiBitcoincash, SiCashapp } from "react-icons/si";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { BiCapsule } from "react-icons/bi";
import { GiGrain, GiChicken } from "react-icons/gi";

export const Navbar = ({ isNav, setIsNav }) => {
  const { activeNav, setActiveNav } = useContext(AuthContext);
  return (
    <section className={`${isNav ? "navbar show-nav" : "navbar"}`}>
      <h1 className="logo">Afarmacco</h1>
      <div className="nav-icons-container">
        <div className="nav-link">
          <NavLink exact={true} activeClassName="active-nav" to="/">
            <MdDashboard className="nav-icon" />
            <div className="concat">
              <p className="link-desc">Inventory</p>
              <AiFillCaretRight />
            </div>
          </NavLink>
        </div>
        {/* ALL OPEX INFO---------------------------------------------------------------------------- */}
        <div className="nav-link" onClick={() => setActiveNav(!activeNav)}>
          <div className="opex-container">
            <SiCashapp className="nav-icon" />
            <div className="opex-concat">
              <p className="link-desc">Opex</p>
              <AiFillCaretDown className={activeNav && "active-svg"} />
            </div>
          </div>
        </div>
        <div
          className={`${
            activeNav ? "opex-links show-opex-links" : "opex-links"
          }`}
        >
          <div className="opex-link">
            <NavLink exact={true} activeClassName="active-nav" to="/doc">
              <GiChicken className="nav-icon" />
              <div className="concat">
                <p className="link-desc">Day Old Chicks</p>
                <AiFillCaretRight />
              </div>
            </NavLink>
          </div>
          <div className="opex-link">
            <NavLink exact={true} activeClassName="active-nav" to="/drug">
              <BiCapsule className="nav-icon" />
              <div className="concat">
                <p className="link-desc">Drugs</p>
                <AiFillCaretRight />
              </div>
            </NavLink>
          </div>
          <div className="opex-link">
            <NavLink exact={true} activeClassName="active-nav" to="/feed">
              <GiGrain className="nav-icon" />
              <div className="concat">
                <p className="link-desc">Feeds</p>
                <AiFillCaretRight />
              </div>
            </NavLink>
          </div>
        </div>
        {/* ALL OPEX INFO---------------------------------------------------------------------------- */}
        <div className="nav-link">
          <NavLink exact={true} activeClassName="active-nav" to="Capex">
            <SiBitcoincash className="nav-icon" />
            <div className="concat">
              <p className="link-desc">Capex</p>
              <AiFillCaretRight />
            </div>
          </NavLink>
        </div>
        <div className="nav-link">
          <NavLink exact={true} activeClassName="active-nav" to="/income">
            <BsWallet2 className="nav-icon" />
            <div className="concat">
              <p className="link-desc">Income</p>
              <AiFillCaretRight />
            </div>
          </NavLink>
        </div>
        <div className="nav-link">
          <NavLink exact={true} activeClassName="active-nav" to="/expenses">
            <BsCashCoin className="nav-icon" />
            <div className="concat">
              <p className="link-desc">Expenses</p>
              <AiFillCaretRight />
            </div>
          </NavLink>
        </div>
        <div className="nav-link">
          <NavLink exact={true} activeClassName="active-nav" to="/health">
            <RiHealthBookLine className="nav-icon" />
            <div className="concat">
              <p className="link-desc">Health</p>
              <AiFillCaretRight />
            </div>
          </NavLink>
        </div>
      </div>
    </section>
  );
};
