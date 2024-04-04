import React from "react";
import "../Footer/footer.css";
const Footer = () => {
  const contactPhone = process.env.REACT_APP_CONTACT_PHONE;
  const contactEmail = process.env.REACT_APP_CONTACT_EMAIL;
  return (
    <>
      <footer className="footer-wrapper">
        <div
          className="footer-container container"
          style={{ paddingTop: "30px" }}
        >
          <div className="footer-column five columns" id="footer-widget-1">
            <div
              id="text-5"
              className="widget widget_text greennature-item greennature-widget"
            >
              <div className="textwidget">
                <p>
                  <img src="upload/logo.png" style={{ width: 170 }} alt="" />
                </p>
                <p>
                  Trees play a very vital role in maintaining the balance of our
                  ecosystem. Our entire planet's biodiversity is sustained by
                  trees. Every living creature needs food, water, and air for
                  its survival.
                </p>
              </div>
            </div>
          </div>

          <div
            className="footer-column five columns"
            id="footer-widget-2"
            style={{ marginBottom: "-20px" }}
          >
            <div
              id="text-9"
              className="widget widget_text greennature-item greennature-widget"
            >
              <h3 className="greennature-widget-title">Contact Info</h3>
              <div className="clear" />
              <div className="textwidget">
                <span className="clear" />
                <span
                  className="greennature-space"
                  style={{ marginTop: "-6px", display: "block" }}
                />{" "}
                <address style={{ fontSize: "14px" }}>
                  Beside Swaminarayan Temple, Narhe-Ambegaon Hill, Pune,
                  Maharashtra – 411041{" "}
                </address>
                <span className="clear" />
                <span
                  className="greennature-space"
                  style={{ marginTop: 10, display: "block" }}
                />
                <div className="contact-info">
                  <div className="contact-phone">
                    <i
                      className="greennature-icon fa fa-phone"
                      style={{
                        verticalAlign: "middle",
                        color: "#fff",
                        fontSize: 16,
                      }}
                    />
                    <span className="contact-phone">
                      <a href="tel: +91 98232 42354">{contactPhone}</a>
                    </span>
                  </div>
                  <div className="contact-email">
                    <i
                      className="greennature-icon fa fa-envelope-o"
                      style={{
                        verticalAlign: "middle",
                        color: "#fff",
                        fontSize: 16,
                      }}
                    />
                    <span className="contact-email">
                      <a href="mailto: zlzj.pune@gmail.com">{contactEmail}</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="clear" />
        </div>
        <div className="copyright-wrapper">
          <div className="copyright-container container">
            <div className="copyright-left">
              <a
                href="https://www.instagram.com/zade_lava_zade_jagva__ngo?igsh=MTV3Z2dydDcwa2VwbQ=="
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="greennature-icon fa fa-instagram"
                  style={{
                    verticalAlign: "middle",
                    color: "#bbbbbb",
                    fontSize: 20,
                  }}
                />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100081247003996&mibextid=LQQJ4d"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="greennature-icon fa fa-facebook"
                  style={{
                    verticalAlign: "middle",
                    color: "#bbbbbb",
                    fontSize: 20,
                  }}
                />
              </a>{" "}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="greennature-icon fa fa-linkedin"
                  style={{
                    verticalAlign: "middle",
                    color: "#bbbbbb",
                    fontSize: 20,
                  }}
                />
              </a>{" "}
              <a
                href="http://twitter.com/goodlayers"
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="greennature-icon fa fa-twitter"
                  style={{
                    verticalAlign: "middle",
                    color: "#bbbbbb",
                    fontSize: 20,
                  }}
                />
              </a>{" "}
            </div>
            <div className="copyright-right">
              Copyright 2023 @ Zade Lava Zade Jagva Foundation{" "}
            </div>
            <div className="clear" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
