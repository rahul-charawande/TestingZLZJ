const Activity = require("../models/activityModel");

exports.getActivities = async (req, res) => {
    try {
      //const token = req.headers.authorization;
      //const checktoken = process.env.REACT_APP_TOKEN_DATA;
    //  if (token !== checktoken) {
       //return res.status(401).json({ message: 'Unauthorized'});
      //}
      const activities = await Activity.find()
        .populate("imageIds")
        .populate("thumbnail");
      console.log("activite", activities.length);
      res.status(200).json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  exports.latestGetActivities = async (req, res) => {
    try {
      const token = req.headers.authorization;
      const checktoken = process.env.REACT_APP_LATEST_ACTIVITY_TOKEN_DATA;
      if (token !== checktoken) {
        return res.status(401).json({ message: 'Unauthorized'});
      } else {
      const latestActivities = await Activity.aggregate([
        {
          $lookup: {
            from: "images",
            localField: "thumbnail",
            foreignField: "_id",
            as: "thumbnail",
          },
        },
        {
          $unwind: "$thumbnail", // Unwind the array produced by the $lookup stage
        },
        {
          $sort: { _id: -1 }, // Sort by activityId in descending order
        },
        {
          $group: {
            _id: "$category",
            activities: { $push: "$$ROOT" }, // Push each document into the activities array
          },
        },
      ]);
  
      res.status(200).json(latestActivities);
    }
    } catch (error) {
      console.error("Error fetching activities:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  exports.getActivitiesById = async (req, res) => {
    try {
      const activity = await Activity.findById({ _id: req.params.id })
        .populate("imageIds")
        .populate("thumbnail");
      res.status(200).json(activity);
    } catch (error) {
      console.error("Error creating activity:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


 exports.postActivities = async (req, res) => {
    try {
      const {
        name,
        date,
        event_description: description,
        event_caption: caption,
        category,
      } = req.body;
      if (!name || !date) {
        return res.status(400).json({ error: "Both name and date are required" });
      }
      const newActivity = new Activity({
        name,
        date,
        caption,
        description,
        category,
      });
      await newActivity.save();
      res.status(201).json({ message: "Activity created successfully" });
    } catch (error) {
      console.error("Error creating activity:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };





// Add other activity-related controller functions if needed
