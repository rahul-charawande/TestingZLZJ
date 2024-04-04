import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import About from "./About.jsx";
import Gallery from "./Components/pages/Gallary.jsx";
import ActNow from "./Components/ActNow.jsx";
import ContactPage from "./Components/pages/ContactPage.jsx";
import DonateForm from "./Components/pages/DonateForm.jsx";
import DetailsActivity from "./Components/Activities/Activities.jsx";
import Navbar from "./Components/Navigations/Navbar.jsx";
import AdminLogin from "./Components/Admin/AdminLogin.js";
import UpcomingEvents from "./Components/pages/UpcomingEvents.jsx";
import SimpleChatbot from "./Components/ChatBot/ChatBotAI.js";
import ReactGA from "react-ga";

const TRACKING_ID = "G-WQ3P842EP5";

ReactGA.initialize(TRACKING_ID);
const App = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  console.log(
    "pathttttttttt",
    window.location.pathname + window.location.search
  );

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/gallary" element={<Gallery />}></Route>
          <Route path="/actnow" element={<ActNow />}></Route>
          <Route path="/donateform" element={<DonateForm />}></Route>
          <Route path="/contacts" element={<ContactPage />}></Route>
          <Route
            path="/activities/:activity_id"
            element={<DetailsActivity />}
          />
          <Route path="/admin" element={<AdminLogin />}></Route>
          <Route path="/events" element={<UpcomingEvents />}></Route>
          <Route path="/chatbot" element={<SimpleChatbot />}></Route>
        </Routes>
      </Router>
    </>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
