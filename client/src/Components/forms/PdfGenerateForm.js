import axios from "axios";
import React, { useState } from "react";

const PdfGenerator = () => {
  const serverurl = process.env.REACT_APP_SERVER_URL;
  const generatePdf = serverurl + "/generate-pdf";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    pan: "",
    amount: "",
    date: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    pan: "",
    amount: "",
    date: "",
  });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  //   setFormErrors({ ...formErrors, [e.target.name]: "" });
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Handle phone number input restriction
    if (name === 'mobile') {
      const newValue = value.slice(0, 10).replace(/\D/g, ''); // Limit to 10 digits, remove non-digits
      setFormData({ ...formData, [name]: newValue });
      setFormErrors({ ...formErrors, [name]: newValue.length > 10 ? 'Only 10 digits allowed' : '' });
    } else {
      setFormData({ ...formData, [name]: value });
      setFormErrors({ ...formErrors, [name]: '' }); // Clear error for other fields
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const errors = {};

    for (const key in formData) {
      if (!formData[key]) {
        isValid = false;
        errors[key] = "This field is required";
      }
    }
    

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    try {
      const response = await axios.post(
        `${generatePdf}`,
        formData,
        {
          responseType: "blob", // Important for receiving binary data (PDF)
        }
      );

      if(response.status === 200){
        setFormData({
          name: "",
          email: "",
          mobile: "",
          address: "",
          pan: "",
          amount: "",
          date: "",
        });
      }
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(pdfBlob);
      window.open(url);
    } catch (error) {
      console.error("Error generating certificate :", error);
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h2 className="card-title">Generate Certificate</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && (
              <div className="text-danger">{formErrors.name}</div>
            )}
          </div>


          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <div className="text-danger">{formErrors.email}</div>
            )}
          </div>



          <div className="mb-3">
            <input
              className="form-control"
              type="number"
              name="mobile"
              placeholder="Enter Mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            {formErrors.mobile && (
              <div className="text-danger">{formErrors.mobile}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
            />
            {formErrors.address && (
              <div className="text-danger">{formErrors.address}</div>
            )}
          </div>



          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="pan"
              placeholder="Enter Pan No"
              value={formData.pan}
              onChange={handleChange}
            />
            {formErrors.pan && (
              <div className="text-danger">{formErrors.pan}</div>
            )}
          </div>


          <div className="mb-3 row">
            <div className="col">
            <input
              className="form-control"
              type="number"
              name="amount"
              placeholder="Enter Amount"
              value={formData.amount}
              onChange={handleChange}
            />
            {formErrors.amount && (
              <div className="text-danger">{formErrors.amount}</div>
            )}
            </div>

            <div className="col">
            <input
              type="date"
              className="form-control"
              name="date"
              placeholder="Select Date"
              value={formData.date}
              onChange={handleChange}
            />
            {formErrors.date && (
              <div className="text-danger">{formErrors.date}</div>
            )}
            </div>


          
          </div>

          {/* <div className="mb-3">
         
          </div> */}

          <button type="submit" className="btn btn-primary">
            Generate Certificate
          </button>
        </form>
      </div>
    </div>
  );
};

export default PdfGenerator;
