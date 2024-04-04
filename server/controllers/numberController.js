const numberInfo = require("../models/numberModel");

// Define a route to fetch numbers from the database
exports.getNumbers = async (req, res) => {
  try {
    // Query the database to retrieve numbers

    const token = req.headers.authorization;
    const checktoken = process.env.REACT_APP_NUMBER_TOKEN_DATA;

    if (token !== checktoken) {
      return res.status(401).json({ message: 'Unauthorized'});
    } else {
    const numbers = await numberInfo.find();

    res.json(numbers);
    }
  } catch (error) {
    console.error("Error fetching numbers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// Route handler for the POST request to save a number
exports.addNumbers = async (req, res) => {
  try {
    // Extract the number data from the request body
    const { type, value } = req.body;

    // Create a new instance of the Number model with the extracted data
    const newNumber = new numberInfo({
      type,
      value
    });

    // Save the new number document to the database
    await newNumber.save();

    // Return a success response
    return res.status(201).json({ message: 'Number saved successfully' });
  } catch (error) {
    // If an error occurs, return a failure response
    console.error('Error saving number:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

