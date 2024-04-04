import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "../Admin/admin.css";
import AddEventForm from "../forms/AddActivityForm";
import PdfGenerator from "../forms/PdfGenerateForm";
import UpcomingEventsForm from "../forms/UpcomingEventsForm";
import ImageUploadForm from "../forms/UploadImagesForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showAddEventForm, setShowAddEventForm] = useState("uploadImages");
  //
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const serverurl = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();

  function cancleLogin(){
    navigate("/");
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const loginEndpoint = `${serverurl}/login`;
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });


      const data = await response.json();
      if (response.ok) {
        // Assuming the API returns a token upon successful login
        const token = data.token;

        localStorage.setItem("token", token);
        console.log("Token:", token);

        alert("login successsful");
        setLoggedIn(true);
      } else {
        console.error("Login failed:", data.error);
        alert("login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <div className="container mt-5 col-11">
      {loggedIn ? (
        <div
          style={{
            marginTop: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "15px",
            justifyContent: "space-between",
          }}
        >
          <div>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div>
            {/* <label>Show Form:</label> */}
            <div className="nav">
              <a
                href="#"
                className={`nav-link ${
                  showAddEventForm === "addEvent" ? "active" : ""
                }`}
                onClick={() => setShowAddEventForm("addEvent")}
              >
                Add New Event
              </a>
              <a
                href="#"
                className={`nav-link ${
                  showAddEventForm === "uploadImages" ? "active" : ""
                }`}
                onClick={() => setShowAddEventForm("uploadImages")}
              >
                Upload Event Images
              </a>
              <a
                href="#"
                className={`nav-link ${
                  showAddEventForm === "UpcomingEvents" ? "active" : ""
                }`}
                onClick={() => setShowAddEventForm("UpcomingEvents")}
              >
                Upload Upcoming Events
              </a>
              <a
                href="#"
                className={`nav-link ${
                  showAddEventForm === "GenerateCertificate" ? "active" : ""
                }`}
                onClick={() => setShowAddEventForm("GenerateCertificate")}
              >
                Generate Certificate
              </a>
            </div>
            {showAddEventForm === "UpcomingEvents" && <UpcomingEventsForm />}
            {showAddEventForm === "addEvent" && <AddEventForm />}
            {showAddEventForm === "GenerateCertificate" && <PdfGenerator />}
            {showAddEventForm === "uploadImages" && <ImageUploadForm />}
          </div>
        </div>
      ) : (
        <div className="card" style={{ maxWidth: "500px" }}>
          <div className="card-body" style={{ marginTop: "80px" }}>
            <h2 className="card-title">Admin Login Only</h2>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
              <button className="btn btn-danger" onClick={cancleLogin}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
