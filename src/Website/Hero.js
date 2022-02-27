import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Typewriter from "typewriter-effect";
import { Link, animateScroll as scroll } from "react-scroll";
import { Link as Links } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { BsMouse, BsArrowRight } from "react-icons/bs";
export const Hero = () => {
  const [isNavMenu, setIsNavMenu] = useState(false);
  const [navActive, setNavActive] = useState(false);

  const activeNav = () => {
    if (window.scrollY >= 200) {
      setNavActive(true);
    } else {
      setNavActive(false);
    }
  };

  window.addEventListener("scroll", activeNav);

  return (
    <div className="hero-container">
      <Fade top>
        <div className="hero-header">
          <h4 className={navActive && "logo-active"}>AFARMACCO</h4>
          {!isNavMenu && (
            <AiOutlineMenu
              className="hero-menu"
              onClick={() => {
                setIsNavMenu(!isNavMenu);
              }}
            />
          )}
          {isNavMenu && (
            <AiOutlineClose
              className="hero-menu"
              onClick={() => {
                setIsNavMenu(!isNavMenu);
              }}
            />
          )}
        </div>
      </Fade>
      <div className="hero-details">
        <h1 className="animate__animated animate__fadeInDown">
          POULTRY OUT-GROWER MANAGEMENT APP
        </h1>
        {/* <p>The new most efficient way to manage your poultry!</p> */}
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString(
                "The new and most efficient way to manage your POULTRY!"
              )
              .pauseFor(1500)
              .deleteChars(20)
              .typeString("track your FINANCES!")
              .pauseFor(1500)
              .deleteChars(20)
              .typeString("track your ASSETS!")
              .pauseFor(1500)
              .start();
          }}
        />
        {/* <p>Afarmacco: Poultry out-grower management app is an online app </p> */}
        <Links
          to="/register"
          className="btn-get-started animate__animated animate__fadeInDown"
        >
          Get Started <BsArrowRight className="arrow-right" />
        </Links>
      </div>
      <Fade top>
        <div
          className={
            isNavMenu
              ? "nav-menu show-nav-menu"
              : navActive
              ? "nav-menu nav-active-true"
              : "nav-menu"
          }
        >
          <button>
            <Link
              onClick={() => setIsNavMenu(false)}
              to="hero-container"
              smooth={true}
              duration={2000}
              spy={true}
              activeClass="active"
            >
              HOME
            </Link>
          </button>

          <button>
            <Link
              onClick={() => setIsNavMenu(false)}
              to="services-wrapper"
              smooth={true}
              duration={2000}
              spy={true}
              activeClass="active"
            >
              FEATURES
            </Link>
          </button>

          <button>
            <Link
              onClick={() => setIsNavMenu(false)}
              to="started-2"
              smooth={true}
              duration={2000}
              spy={true}
              activeClass="active"
            >
              ABOUT US
            </Link>
          </button>

          <button>
            <Link
              onClick={() => setIsNavMenu(false)}
              to="testimonials-container"
              smooth={true}
              duration={2000}
              spy={true}
              activeClass="active"
            >
              TESTIMONIALS
            </Link>
          </button>

          <button>
            <Link
              onClick={() => setIsNavMenu(false)}
              to="faq-wrapper"
              smooth={true}
              duration={2000}
              spy={true}
              activeClass="active"
            >
              FAQ
            </Link>
          </button>
          <Links
            to="/register"
            className={
              navActive ? "nav-started nav-started-active" : "nav-started"
            }
          >
            GET STARTED
          </Links>
        </div>
      </Fade>
      <Fade bottom delay={2000}>
        <div className="mouse-container">
          <p>Scroll Down</p>
          <BsMouse />
        </div>
      </Fade>
    </div>
  );
};
