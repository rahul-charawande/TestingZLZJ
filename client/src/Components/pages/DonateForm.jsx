import React, { useState } from "react";
import QR from "../../upload/QR.png";

const DonateForm = () => {
  const serverurl = process.env.REACT_APP_SERVER_URL;
  const donationFormUrl = serverurl + "/submit-form";
  const [showDonateModal, setShowDonateModal] = useState(false);
  const openDonateModal = () => {
    setShowDonateModal(true);
  };

  const closeDonateModal = () => {
    setShowDonateModal(false);
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        firstname: document.getElementById("firstname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        amount: document.getElementById("amount").value,
        address: document.getElementById("address").value,
      };
      console.log(formData);
      const response = await fetch(`${donationFormUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        closeDonateModal();
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send donation data to the server");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <h2 style={{ marginTop: "100px" }}>
            <span style={{ fontSize: "18px" }}>You are donating to :</span>{" "}
            <span style={{ fontSize: "22px" }}>
              Zade Lava Zade Jagva Foundation
            </span>
            <span style={{ fontSize: "22px" }}>(झाडे लावा झाडे जगवा)</span>
          </h2>
          {/* Note */}
          <p
            className="highlighted-note"
            style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
              margin: "10px 0",
              fontWeight: "bold",
              color: "#d63031",
            }}
          >
            Note: Below is the QR code to donate an amount to the NGO (झाडे लावा
            झाडे जगवा). Once the payment is successful, kindly fill out the form
            to receive the 80G certificate on your email address.
          </p>
          <p className="mt-3">
            Kindly submit the form at{" "}
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={openDonateModal}
            >
              Submit Form
            </span>
            .
          </p>
          <div>
            <img
              src={QR}
              alt="QR code"
              className="img-fluid"
              style={{
                maxWidth: "60%",
                height: "auto",
                marginTop: "10px",
                marginLeft: "-20px",
              }}
            />
          </div>
        </div>

        <div className="col-md-5">
          <div className="modal-cont">
            {showDonateModal && (
              <div
                className="modal"
                tabIndex="-1"
                role="dialog"
                style={{
                  display: "block",
                  marginLeft: window.innerWidth > 768 ? "300px" : "auto",
                  marginTop: "50px",
                  maxWidth: window.innerWidth > 768 ? "100%" : "80%",
                }}
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Form Details</h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={closeDonateModal}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div
                      className="modal-body"
                      style={{ backgroundColor: "#dddddd" }}
                    >
                      {/* Donation form content */}
                      <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                          <label htmlFor="firstname" className="form-label">
                            Full Name:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            name="firstname"
                            required
                          />
                        </div>

                        <div className="mb-2">
                          <label htmlFor="email" className="form-label">
                            Email:
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            required
                          />
                        </div>

                        <div className="mb-2">
                          <label htmlFor="phone" className="form-label">
                            Phone:
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            required
                          />
                        </div>

                        <div className="mb-2">
                          <label htmlFor="amount" className="form-label">
                            Amount:
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="amount"
                            name="amount"
                            required
                          />
                        </div>

                        <div className="mb-2">
                          <label htmlFor="address" className="form-label">
                            Address:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          style={{
                            border: "none",
                            borderColor: "#4b9e55",
                            color: "#ffffff",
                            backgroundColor: "#5dc269",
                            fontSize: "12px",
                            padding: " 14px 27px",
                            cursor: "pointer",
                            fontWeight: "600",
                            letterSpacing: "1px",
                            fontFamily: "lato",
                            margin: "15px 0px 0px",
                            width: "100%",
                          }}
                          className="btn btn-primary"
                          onClick={openDonateModal}
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateForm;
