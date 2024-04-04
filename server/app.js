const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const contactInfoRoutes = require("./routes/contactInfoRoutes");
const donateInfoRouter = require("./routes/donateFromRoutes");
const actNowEmailRouter = require("./routes/ActNowEmailRouter");
const generatePdfRoutes = require("./routes/generatePdfRoutes");
const numberRoutes = require("./routes/numbersRoutes");
const imageRoutes = require("./routes/imageRoutes");
const activityRoutes = require("./routes/activityRoutes");
const userRoutes = require("./routes/authRoutes");
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

app.use((req, res, next) => { 
  // Set CORS headers 
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  // Replace with the origin you want to allow 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
  res.setHeader('Access-Control-Allow-Credentials', true); 

  const token = req.headers.authorization_g;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  // Mock token validation (replace this with your actual logic)
  if (token !== process.env.REACT_APP_TOKEN_DATA) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }

  // Pass control to the next middleware 
  if (req.method === 'OPTIONS') {
    // Respond with HTTP OK status for preflight requests
    return res.sendStatus(200);
  }

   next(); 
  });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3006;

//app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// Middleware to validate token
const validateToken_getNumbers = (req, res, next) => {
  const token = req.headers.authorization;
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }
  // Mock token validation (replace this with your actual logic)
  if (token !== process.env.REACT_APP_NUMBER_TOKEN_DATA) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
  // Token is valid, proceed to the next middleware or route handler
  next();
};



// Middleware to validate token
const validateToken_images = (req, res, next) => {
  const token = req.headers.authorization;
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }
  // Mock token validation (replace this with your actual logic)
  if (token !== process.env.REACT_APP_IMAGE_TOKEN_DATA) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
  // Token is valid, proceed to the next middleware or route handler
  next();
};



// Middleware to validate token
const validateToken_activity = (req, res, next) => {
  const token = req.headers.authorization;
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }
  // Mock token validation (replace this with your actual logic)
  if (token !== process.env.REACT_APP_ACTIVITY_TOKEN_DATA) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
  // Token is valid, proceed to the next middleware or route handler
  next();
};




// Middleware to validate token
const validateToken_getUpcomingEvents = (req, res, next) => {
  const token = req.headers.authorization;
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }
  // Mock token validation (replace this with your actual logic)
  if (token !== process.env.REACT_APP_UPCOMING_EVENTS_TOKEN_DATA) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
  // Token is valid, proceed to the next middleware or route handler
  next();
};


// Middleware to validate token
const validateToken_activities_latest = (req, res, next) => {
  const token = req.headers.authorization;
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }
  // Mock token validation (replace this with your actual logic)
  if (token !== process.env.REACT_APP_LATEST_ACTIVITY_TOKEN_DATA) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
  // Token is valid, proceed to the next middleware or route handler
  next();
};



// Apply token validation middleware to routes that require authorization
app.use("/api/getNumbers", validateToken_getNumbers);
app.use("/api/images", validateToken_images);
app.use("/api/activity", validateToken_activity);
app.use("/api/getUpcomingEvents", validateToken_getUpcomingEvents);
app.use("/api/activities/latest", validateToken_activities_latest);






// Use routes
app.use("/api", userRoutes);
app.use("/api", routes);
app.use("/api", contactInfoRoutes);
app.use("/api", donateInfoRouter);
app.use("/api", actNowEmailRouter);
app.use("/api", generatePdfRoutes);
app.use("/api", numberRoutes);
app.use("/api", imageRoutes);
app.use("/api", activityRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
