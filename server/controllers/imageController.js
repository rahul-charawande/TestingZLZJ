const Image = require("../models/imageModel");
const Activity = require("../models/activityModel");
const mongoose = require("mongoose");

exports.getImages = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const checktoken = process.env.REACT_APP_IMAGE_TOKEN_DATA;

    if (token !== checktoken) {
      return res.status(401).json({ message: 'Unauthorized for images'});
    } else {
    const images = await Image.find();
    
    const imageArray = images.map((image) => ({
      name: image.name,
      path: image.path,
      caption: image.caption,
      activityId: image.activityId,
      activityName: image.activityName,
      description: image.description,
      createdAt: image.createdAt,
      url: `/uploads/${image.path}`,
    }));


    res.status(200).json(imageArray);
  }
  
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.uploadImages = async (req, res) => {
  try {
    const {
      activityId,
      activityName,
      event_caption,
      event_description,
      category,
      thumbnail_img_index,
      captions,
      // descriptions,
    } = req.body;
    console.log(activityId, "actiId");
    let objectIdActivityId;
    try {
      objectIdActivityId = new mongoose.Types.ObjectId(activityId);
    } catch (error) {
      console.error("Error creating ObjectId for activityId:", error);
      console.error("Invalid activityId:", activityId);
      return res.status(400).json({ error: "Invalid activityId" });
    }

    const files = req.files;

    if (!activityId) {
      return res.status(400).json({ error: "ActivityId is required" });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const imageArray = files.map((file, index) => {
      const { filename, path } = file;
      const caption = captions[index] || "";
      const ActivityName = activityName || "";

      return new Image({
        name: filename,
        path: path,
        activityName: ActivityName,
        caption: caption,
      });
    });
    console.log(thumbnail_img_index, event_caption, event_description, "ab");
    let imageIds = (await Image.insertMany(imageArray)).map((doc) => doc._id);
    console.log(
      {
        thumbnail: imageIds[thumbnail_img_index],
        caption: event_caption,
        description: event_description,
      },
      "abcde"
    );
    let query = {
      $push: { imageIds: { $each: imageIds } },
      $set: {
        ...(thumbnail_img_index
          ? { thumbnail: imageIds[thumbnail_img_index] }
          : {}),
        activityName: activityName,
        caption: event_caption,
        description: event_description,
        category,
      },
    };
    Activity.findByIdAndUpdate(activityId, query, { new: true })
      .then((updatedEvent) => {
        console.log("Event updated successfully:", updatedEvent);
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });

    res.status(201).json({
      message: "Image, caption uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add other image-related controller functions if needed
