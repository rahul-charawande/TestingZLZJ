import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../Navigations/Navbar.css";
import { CgProfile } from "react-icons/cg";

function Navbar() {
  const contactPhone = process.env.REACT_APP_CONTACT_PHONE;
  const contactEmail = process.env.REACT_APP_CONTACT_EMAIL;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentPath = window.location.pathname;

  const location = useLocation();
  // console.log(location.pathname);

  if (currentPath === "/admin") {
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div
        className="body-wrapper  float-menu"
        data-home="https://demo.goodlayers.com/greennature/"
      >
        <header className="greennature-header-wrapper header-style-5-wrapper greennature-header-with-top-bar">
          {/* <!-- top navigation --> */}
          <div className="top-navigation-wrapper">
            <div className="top-navigation-container container">
              <div className="top-navigation-left">
                <div className="top-navigation-left-text">
                  Phone : {contactPhone}      Email : {contactEmail}     
                  Registration No. : {"MH/1992/2022"}
                </div>
              </div>
              <div className="top-navigation-right">
                <div className="top-social-wrapper">
                  <div className="social-icon">
                    <Link
                      to="https://www.instagram.com/zade_lava_zade_jagva__ngo?igsh=MTV3Z2dydDcwa2VwbQ=="
                      target="_blank"
                    >
                      <i className="fa fa-instagram"></i>
                    </Link>
                  </div>
                  <div className="social-icon">
                    <Link
                      to="https://www.facebook.com/profile.php?id=100081247003996&mibextid=LQQJ4d"
                      target="_blank"
                    >
                      <i className="fa fa-facebook"></i>
                    </Link>
                  </div>

                  <div className="social-icon">
                    <Link to="https://www.linkedin.com/" target="_blank">
                      <i className="fa fa-linkedin"></i>
                    </Link>
                  </div>

                  <div className="social-icon">
                    <Link to="https://twitter.com/" target="_blank">
                      <i className="fa fa-twitter"></i>
                    </Link>
                  </div>

                  <div className="clear"></div>
                </div>
              </div>
              <div className="clear"></div>
            </div>
          </div>
          <div id="greennature-header-substitute"></div>
          <div className="greennature-header-inner header-inner-header-style-6">
            <div className="greennature-header-container container">
              <div className="greennature-header-inner-overlay"></div>
              {/* <!-- logo --> */}
              <div className="greennature-logo">
                <div className="greennature-logo-inner">
                  <Link to="/">
                    <img
                      src="images/logo_z.png"
                      alt=""
                      style={{ height: "35px", width: "200px" }}
                    />{" "}
                  </Link>
                </div>
                <div
                  className={`dl-menuwrapper ${
                    isMenuOpen ? "dl-menuopen" : ""
                  }`}
                  id="greennature-responsive-navigation"
                >
                  <button className="dl-trigger" onClick={toggleMenu}>
                    Open Menu
                  </button>
                  <ul
                    id="menu-main-menu"
                    className={`sf-menu greennature-main-mobile-menu custom-menu-spacing ${
                      isMenuOpen ? "menu-visible-open" : ""
                    }`}
                  >
                    <li className="menu-item menu-item-home current-menu-item page_item page-item-5680 current_page_item">
                      <Link to="/" aria-current="page" onClick={closeMenu}>
                        Home
                      </Link>
                    </li>
                    <li className="menu-item menu-item-about current-menu-item page_item page-item-5680 current_page_item">
                      <Link to="/about" aria-current="page" onClick={closeMenu} >
                        About
                      </Link>
                    </li>

                    <li className="menu-item menu-item-events current-menu-item page_item page-item-5680 current_page_item">
                      <Link to="/events" aria-current="page" onClick={closeMenu}>
                        Events
                      </Link>
                    </li>

                    <li className="menu-item menu-item-gallary current-menu-item page_item page-item-5680 current_page_item">
                      <Link to="/gallary" aria-current="page" onClick={closeMenu}>
                        Gallary
                      </Link>
                    </li>

                    <li className="menu-item menu-item-contact current-menu-item page_item page-item-5680 current_page_item">
                      <Link to="/contacts" aria-current="page" onClick={closeMenu}>
                        Contact
                      </Link>
                    </li>

                    <li className="menu-item menu-item-donate current-menu-item page_item page-item-5680 current_page_item">
                      <Link to="/donateform" aria-current="page" onClick={closeMenu}>
                        Donate
                      </Link>
                    </li>

                    <li className="menu-item menu-item-actnow current-menu-item page_item page-item-5680 current_page_item">
                      <Link to="/actnow" aria-current="page" onClick={closeMenu}>
                        Actnow
                      </Link>
                    </li>
                    <li className="menu-item menu-item-actnow current-menu-item page_item page-item-5680 current_page_item">
                      <Link to="/admin" aria-current="page">
                      <CgProfile size={30}/>

                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* <!-- navigation --> */}
              <div className="greennature-navigation-wrapper">
                <nav
                  className="greennature-navigation"
                  id="greennature-main-navigation"
                >
                  <ul
                    id="menu-main-menu-1"
                    className={`sf-menu greennature-main-menu custom-menu-spacing ${
                      isMenuOpen ? "mobile-menu-open" : ""
                    }`}
                  >
                    <li
                      className={`menu-item menu-item-home ${
                        location.pathname === "/" ? "current-menu-item" : ""
                      }  greennature-normal-menu`}
                    >
                      <Link to="/">
                        <i className="fa fa-home"></i>Home
                      </Link>
                    </li>
                    <li
                      className={`menu-item menu-item-home ${
                        location.pathname === "/about"
                          ? "current-menu-item"
                          : ""
                      }  greennature-normal-menu`}
                    >
                      {" "}
                      <Link to="/about">
                        <i className="fa fa-map"></i>About
                      </Link>
                    </li>

                    <li
                      className={`menu-item menu-item-home ${
                        location.pathname === "/events"
                          ? "current-menu-item"
                          : ""
                      } greennature-normal-menu`}
                    >
                      {" "}
                      <Link to="/events">
                        <i className="fa fa-calendar"></i>Events
                      </Link>
                    </li>

                    <li
                      className={`menu-item menu-item-home ${
                        location.pathname === "/gallary"
                          ? "current-menu-item"
                          : ""
                      }  greennature-normal-menu`}
                    >
                      {" "}
                      <Link to="/gallary">
                        <i className="fa fa-photo"></i>Gallery
                      </Link>
                    </li>

                    <li
                      className={`menu-item menu-item-home ${
                        location.pathname === "/contacts"
                          ? "current-menu-item"
                          : ""
                      }  greennature-normal-menu`}
                    >
                      {" "}
                      <Link to="/contacts">
                        <i className="fa fa-phone"></i>Contact
                      </Link>
                    </li>
                  </ul>

                  <Link
                    to="/donateform"
                    className="greennature-donate-button greennature-lb-payment"
                  >
                    <span className="greennature-button-overlay"></span>
                    <span className="greennature-button-donate-text">
                      Donate
                    </span>
                  </Link>
                  <Link
                    to="/actnow"
                    className="greennature-donate-button greennature-lb-payment"
                  >
                    <span
                      className="greennature-button-overlay"
                      style={{ backgroundColor: "#5dc269" }}
                    ></span>
                    <span className="greennature-button-donate-text">
                      Act Now
                    </span>
                  </Link>

                  <button
                    className="admin-button"
                    style={{
                      backgroundColor: "transparent",
                      marginLeft: "30px",
                    }}
                  >
                    <Link to="/admin" className="admin-link">
                      <CgProfile size={30} color="white"/>
                    </Link>
                  </button>
                </nav>
                <div
                  className="greennature-navigation-gimmick"
                  id="greennature-navigation-gimmick"
                ></div>
                <div className="clear"></div>
              </div>
              <div className="clear"></div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Navbar;
