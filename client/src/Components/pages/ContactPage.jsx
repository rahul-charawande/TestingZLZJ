import axios from "axios";
import React, { useState } from "react";

const ContactPage = () => {
  const contactPhone = process.env.REACT_APP_CONTACT_PHONE;
  const contactEmail = process.env.REACT_APP_CONTACT_EMAIL;

  const serverurl = process.env.REACT_APP_SERVER_URL;
  const contactPostUrl = serverurl + "/api/contact";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${contactPostUrl}`,
        formData
      );

      if (response.status === 201) {
        alert("Message sent successfully!");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error sending contact information:", error);
    }
  };

  return (
    <div className="container mt-5" style={{ margin: "50px" }}>
      <div className="above-sidebar-wrapper">
        <section id="contact-info-section" style={{ marginTop: "130px" }}>
          <p style={{ fontSize: "30px" }}>Zade Lava Zade Jagva Foundation </p>
          <address style={{ fontSize: "14px" }}>
            Beside Swaminarayan Temple,
            <br />
            Narhe-Ambegaon Hill,
            <br />
            Pune, Maharashtra – 411041 <br />
            Registration No.: MH/1992/2022
            <br />
            Contact No.: {contactPhone}
          </address>
        </section>

        <section id="content-section-1">
          <div
            className="greennature-full-size-wrapper gdlr-show-all no-skin"
            style={{
              paddingTop: "10px",
              paddingBottom: "0px",
              backgroundColor: "#ffffff",
            }}
          >
            <h2 style={{ marginTop: "10px" }}>Locate Us</h2>
            <div
              className="greennature-item greennature-content-item"
              style={{ marginBottom: "0px" }}
            >
              <iframe
                title="Google Maps Location"
                style={{ border: "0", width: "100%", height: "450px" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3785.047178964401!2d73.83484255899334!3d18.43616690340104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc295bdbde246d3%3A0xc834615ba9de8f2d!2z4KS44KWN4KS1LiDgpIngpKTgpY3gpKTgpK7gpLDgpL7gpLUg4KSq4KS-4KSf4KWA4KSyIOCknOCliOCktSDgpLXgpL_gpLXgpL_gpKfgpKTgpL4g4KSJ4KSm4KWN4KSv4KS-4KSo!5e0!3m2!1sen!2sin!4v1708090323077!5m2!1sen!2sin"
                width="600"
                height="450"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div
                style={{
                  position: "absolute",
                  width: "80%",
                  bottom: "20px",
                  left: "0",
                  right: "0",
                  marginLeft: "auto",
                  marginRight: "auto",
                  color: "#000",
                }}
              ></div>
            </div>
            <div className="clear"></div>
            <div className="clear"></div>
          </div>
          <div className="clear"></div>
        </section>
      </div>
      <h2 style={{ marginTop: "30px" }}>Contact Us</h2>
      <p>
        If you have any questions or feedback, feel free to reach out to us!
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message:
          </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="4"
            required
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Send Message
        </button>
      </form>

      <p className="mt-3">
        Alternatively, you can contact us via email or phone:
      </p>
      <p>Email: {contactEmail}</p>
      <p>Phone: {contactPhone}</p>
    </div>
  );
};

export default ContactPage;
