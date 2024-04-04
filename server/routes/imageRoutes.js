const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const fileName = `${file.originalname}-${day}${month}${year}-${path.extname(
      file.originalname
    )}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("image", 5), imageController.uploadImages);
router.get("/images", imageController.getImages);

module.exports = router;
