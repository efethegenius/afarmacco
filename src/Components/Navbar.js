import React, { useContext, useState } from "react";
import "../Styles/Navbar.css";
import { MdDashboard } from "react-icons/md";
import { BsWallet2, BsCashCoin } from "react-icons/bs";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { RiHealthBookLine } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import {
  AiFillCaretRight,
  AiFillCaretDown,
  AiOutlineClose,
} from "react-icons/ai";
import { BiCapsule } from "react-icons/bi";
import { GiGrain, GiChicken } from "react-icons/gi";

export const Navbar = ({ isNav, setIsNav }) => {
  const { activeNav, setActiveNav } = useContext(AuthContext);
  return (
    <section className={`${isNav ? "navbar show-nav" : "navbar"}`}>
      <div className="nav-head">
        <AiOutlineClose onClick={() => setIsNav(false)} className="nav-close" />
        <h1 className="logo">Afarmacco</h1>
      </div>
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
        <div className="nav-link">
          <NavLink exact={true} activeClassName="active-nav" to="/opex">
            <GiTakeMyMoney className="nav-icon" />
            <div className="concat">
              <p className="link-desc">Opex</p>
              <AiFillCaretRight />
            </div>
          </NavLink>
        </div>
        <div className="nav-link">
          <NavLink exact={true} activeClassName="active-nav" to="/capex">
            <GrMoney className="nav-icon" />
            <div className="concat">
              <p className="link-desc">Capex</p>
              <AiFillCaretRight />
            </div>
          </NavLink>
        </div>
        <div className="nav-link">
          <NavLink exact={true} activeClassName="active-nav" to="/income">
            <GiReceiveMoney className="nav-icon" />
            <div className="concat">
              <p className="link-desc">Income</p>
              <AiFillCaretRight />
            </div>
          </NavLink>
        </div>
        <div className="nav-link">
          <NavLink exact={true} activeClassName="active-nav" to="/expenses">
            <GiPayMoney className="nav-icon" />
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
