import React, { useState } from "react";
import acttitle from "../upload/about-title-bg.jpg";
import shutterearth from "../upload/shutterstock_7.jpg";
import actbg from "../upload/act-bg.jpg";
import Footer from "./Footer/Footer";
import { useNavigate } from "react-router-dom";

const ActNow = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    message:
      "The world needs India leadership on climate change \n\n                                                 Dear Prime Minister, \n                                                 I believe India leadership is the key to a strong global solution to this great threat to people and nature.\n                                                 Climate change is one of the greatest challenges facing to the world today. And I know that the only way to protect human society and life on our planet from its worst impacts will be strong action by all countries--but particularly, strong and ambitious leadership by the India, both at home and abroad. \n\n                                                 Thank you for your ongoing efforts to advance climate action in the India. What is needed now is a strong, visionary target to cut carbon pollution all across India and support vulnerable communities around the world who are in danger from growing extreme storms, worsening droughts, and sea level rise. \n\n                                                 As you said, the India has a special responsibility to lead the global response to this international crisis. Showing the world that the India has a strong vision to move to 100% clean energy will inspire other countries to act and finally bring the world together to address this crisis. \n\n                                                 The world needs India's leadership right now. I support this Administration moving as quickly and aggressively as possible to reduce carbon emissions and contribute its fair share to helping the world face down this threat.",
  });

  const serverurl = process.env.REACT_APP_SERVER_URL;
  const actNowUrl = serverurl + "/act-now";
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any field is empty
    for (const key in formData) {
      if (!formData[key]) {
        alert("All fields are mandatory. Please fill out all fields.");
        return;
      }
    }

    try {
      const response = await fetch(actNowUrl, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          // message: "",
        });
        navigate("/");
      } else {
        throw new Error("Form submission failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="initial-scale=1.0" />
      <title>Green Nature</title>

      <div
        className="body-wrapper  float-menu"
        data-home="https://demo.goodlayers.com/greennature/"
      >
        {/* is search */}
        <div className="content-wrapper">
          <div className="greennature-content">
            <div className="with-sidebar-wrapper">
              <section id="content-section-1">
                <div
                  className="greennature-parallax-wrapper greennature-background-image gdlr-show-all greennature-skin-dark-skin"
                  id="greennature-parallax-wrapper-1"
                  data-bgspeed={0}
                  style={{
                    backgroundImage: `url(${acttitle})`,
                    paddingTop: 280,
                    paddingBottom: 160,
                  }}
                >
                  <div className="container">
                    <div className="greennature-title-item">
                      <div className="greennature-item-title-wrapper greennature-item  greennature-center greennature-extra-large ">
                        <div className="greennature-item-title-container container">
                          <div className="greennature-item-title-head">
                            <h3 className="greennature-item-title greennature-skin-title greennature-skin-border">
                              WE NEED YOUR ACTION!
                            </h3>
                            <div className="greennature-item-title-caption greennature-skin-info"></div>
                            <div className="clear" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="clear" />
                    <div className="clear" />
                  </div>
                </div>
                <div className="clear" />
              </section>
              <section id="content-section-2">
                <div
                  className="greennature-color-wrapper  gdlr-show-all no-skin greennature-half-bg-wrapper"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <div
                    className="greennature-half-bg greennature-bg-solid"
                    style={{
                      backgroundImage: `url(${shutterearth})`,
                    }}
                  />
                  <div className="container">
                    <div className="six columns" />
                    <div className="six columns">
                      <div className="greennature-item greennature-about-us-item greennature-small-title">
                        <div className="about-us-title-wrapper">
                          <h3 className="about-us-title">
                            Demand Climate Change Action Now
                          </h3>
                          <div className="about-us-caption greennature-title-font greennature-skin-info">
                            Zade Lava Zade Jagva Foundation
                          </div>
                          <div className="about-us-title-divider" />
                        </div>
                        <div className="about-us-content-wrapper">
                          <div className="about-us-content greennature-skin-content">
                            <p>
                              We’re facing a climate crisis. As the prime
                              minister said, “no challenge—no challenge—poses a
                              greater threat to future generations than climate
                              change.” Extreme weather, melting glaciers and
                              rising sea levels all link to climate change. If
                              we continue on this trajectory, nature’s
                              future—along with our own—is in jeopardy.
                            </p>
                            <p>
                              Without climate action, humanity, wildlife, and
                              the planet we know and love will suffer. Many
                              species, like walruses, elephants, and giant
                              pandas will be under increased threat when they’re
                              not able to adapt to rising seas, changing
                              rainfall patterns, warming temperatures, an
                              acidifying and warming ocean and other
                              consequences of increased carbon pollution.
                            </p>
                            <p>
                              We cannot stand back and let this happen. We need
                              to start today and change the way we choose and
                              use energy and resources. The US must take
                              decisive action to fight climate change and cut
                              carbon pollution to reduce the impacts of climate
                              change and inspire other countries to do the same.
                            </p>
                          </div>
                        </div>
                        <div className="clear" />
                      </div>
                    </div>
                    <div className="clear" />
                  </div>
                </div>
                <div className="clear" />
              </section>
              <section id="content-section-3">
                <div
                  className="greennature-parallax-wrapper greennature-background-image gdlr-show-all greennature-skin-dark-skin"
                  id="greennature-parallax-wrapper-2"
                  data-bgspeed={0}
                  style={{
                    backgroundImage: `url(${actbg})`,
                    paddingTop: 40,
                    paddingBottom: 15,
                  }}
                >
                  <div className="container">
                    <div
                      className="greennature-title-item"
                      style={{ marginBottom: 45 }}
                    >
                      <div className="greennature-item-title-wrapper greennature-item  greennature-center greennature-large ">
                        <div className="greennature-item-title-container container">
                          <div className="greennature-item-title-head">
                            <h3 className="greennature-item-title greennature-skin-title greennature-skin-border">
                              Your Voice To The Prime Minister
                            </h3>
                            <div className="greennature-item-title-caption greennature-skin-info">
                              Please fill out your details and press submit
                            </div>
                            <div className="clear" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="clear" />
                    <div className="greennature-item greennature-content-item">
                      <div
                        role="form"
                        className="wpcf7"
                        id="wpcf7-f5967-o1"
                        lang="en-US"
                        dir="ltr"
                      >
                        <div className="screen-reader-response" />
                        <form
                          action={actNowUrl}
                          method="post"
                          className="wpcf7-form"
                          noValidate="novalidate"
                          id="myForm"
                          onSubmit={handleSubmit}
                        >
                          <div className="wpcf7-contact-half-left">
                            <p>
                              <span className="wpcf7-form-control-wrap first-name">
                                <input
                                  type="text"
                                  name="firstName"
                                  value={formData.firstName}
                                  onChange={handleChange}
                                  size={40}
                                  className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                                  aria-required="true"
                                  aria-invalid="false"
                                  placeholder="*Name"
                                  required
                                />
                              </span>{" "}
                            </p>
                            <p>
                              <span className="wpcf7-form-control-wrap last-name">
                                <input
                                  type="text"
                                  name="lastName"
                                  value={formData.lastName}
                                  onChange={handleChange}
                                  size={40}
                                  className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                                  aria-required="true"
                                  aria-invalid="false"
                                  placeholder="*Last Name"
                                  required
                                />
                              </span>{" "}
                            </p>
                            <p>
                              <span className="wpcf7-form-control-wrap your-email">
                                <input
                                  type="email"
                                  name="email"
                                  value={formData.email}
                                  onChange={handleChange}
                                  size={40}
                                  className="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email"
                                  aria-required="true"
                                  aria-invalid="false"
                                  placeholder="*Email"
                                  required
                                />
                              </span>{" "}
                            </p>
                            <p>
                              <span className="wpcf7-form-control-wrap address">
                                <textarea
                                  name="address"
                                  cols={40}
                                  rows={10}
                                  className="wpcf7-form-control wpcf7-textarea"
                                  aria-invalid="false"
                                  placeholder="*Address"
                                  value={formData.address}
                                  onChange={handleChange}
                                  required
                                />
                              </span>{" "}
                            </p>
                          </div>
                          <div className="wpcf7-contact-half-right">
                            <p>
                              <span className="wpcf7-form-control-wrap your-message">
                                <textarea
                                  name="message"
                                  cols={40}
                                  rows={10}
                                  className="wpcf7-form-control wpcf7-textarea wpcf7-full"
                                  aria-invalid="false"
                                  value={formData.message}
                                  onChange={handleChange}
                                  required
                                />
                              </span>{" "}
                            </p>
                          </div>
                          <div className="clear" />
                          <p>
                            <input
                              type="submit"
                              defaultValue="Submit My Voice!"
                              className="wpcf7-form-control wpcf7-submit"
                            />
                          </p>
                          <div className="wpcf7-response-output wpcf7-display-none" />
                        </form>
                      </div>
                    </div>
                    <div className="clear" />
                    <div className="clear" />
                  </div>
                </div>
                <div className="clear" />
              </section>
            </div>
          </div>
          {/* greennature-content */}
          <div className="clear" />
        </div>
        {/* content wrapper */}

        <Footer />
      </div>
      {/* body-wrapper */}
      {/* Mirrored from max-themes.net/demos/greennature/act-now.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 26 Dec 2023 10:24:17 GMT */}
    </>
  );
};

export default ActNow;
