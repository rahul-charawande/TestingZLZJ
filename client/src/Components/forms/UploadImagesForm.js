import React, { useEffect, useState } from "react";
import { FcEmptyTrash } from "react-icons/fc";
import { IoSearchOutline } from "react-icons/io5";

import "../Admin/admin.css";

const ImageUploadForm = () => {
  const serverurl = process.env.REACT_APP_SERVER_URL;
  const uploadUrl = serverurl + "/upload";
  

  //states for upload activities images
  const [activities, setActivities] = useState([]);
  const [category, setCategory] = useState("");
  const [eventCaption, setEventCaption] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  //form validation states for add activities
  // const [activityNameError, setActivityNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [eventCaptionError, setEventCaptionError] = useState("");
  const [addEventDescriptionError, setAddEventDescriptionError] = useState("");

  //
  const [activityName, setActivityName] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [captions, setCaptions] = useState([]);
  // const [descriptions, setDescriptions] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [previewImages, setPreviewImage] = useState([]);

  const [searchQuery, setSearchQuery] = useState([]);

  //
  const [activitySelectError, setActivitySelectError] = useState(
    "Please select an Activity"
  );

  //end add upload images states

  const categories = [
    "Impact",
    "Environment",
    "Recycling",
    "Ecology",
    "Climate",
  ];

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleInputChange = (e, setState, setErrorState) => {
    setState(e.target.value);
    setErrorState("");
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      console.log("inside fetch acivities");
      const token = process.env.REACT_APP_ACTIVITY_TOKEN_DATA;
      const tokeng = process.env.REACT_APP_TOKEN_DATA;
      const activitiesUrlEndpoint = `${serverurl}/activities`;
      const response = await fetch(activitiesUrlEndpoint, {
        headers: {
          'Authorization': token ,
          'authorization_g': tokeng 

        }
      });
      //const response = await fetch(`${activitiesUrl}`);
      if (response.ok) {
        const activitiesData = await response.json();
        setActivities(activitiesData);
      } else {
        console.error("Failed to fetch activities");
      }
    } catch (error) {
      console.error("Error fetching activities :", error);
    }
  };

  // const handleFileChange = (e) => {
  //   const files = e.target.files;
  //   if (!files || files.length === 0) {
  //     console.log("Please select file to upload");
  //     return;
  //   }
  //   setSelectedFile(Array.from(files));
  //   setCaptions(new Array(files.length).fill(""));

  //   // Create previews for selected images
  //   const previews = Array.from(files).map((file) => URL.createObjectURL(file));
  //   setPreviewImage(previews);
  // };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      console.log("Please select file to upload");
      return;
    }

    const newPreviews = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImage((prevPreviews) => [...prevPreviews, ...newPreviews]);

    setSelectedFile((prevFiles) => [...prevFiles, ...Array.from(files)]);
    setCaptions((prevCaptions) => [
      ...prevCaptions,
      ...new Array(files.length).fill(""),
    ]);
  };

  const handleImageUpload = async () => {
    let isValid = true;

    // if (!activityName.trim()) {
    //   setActivityNameError("Activity Event Name is required");
    //   isValid = false;
    // }

    if (!category) {
      setCategoryError("Category is required");
      isValid = false;
    }
    if (!eventCaption) {
      setEventCaptionError("Caption is required");
      isValid = false;
    }
    if (!eventDescription) {
      setAddEventDescriptionError("Description required");
      isValid = false;
    }

    if (selectedFile.length === 0) {
      alert("Please select at least one image.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      let selectedActivity = activities.filter((a) => a.name === activityName);

      if (!selectedActivity.length) {
        alert("Please select an activity");
        return;
      }

      const formData = new FormData();
      formData.append("activityId", String(selectedActivity[0]._id));
      formData.append("thumbnail_img_index", thumbnailIndex);
      formData.append("activityName", activityName);
      formData.append("event_caption", eventCaption);
      formData.append("event_description", eventDescription);
      formData.append("category", category);
      selectedFile.forEach((file, index) => {
        formData.append("image", file);

        formData.append("captions", captions[index]);

        console.log("activityId :", selectedActivity[0]._id);
        console.log("ActivityName", activityName);
        console.log("Selected File:", file.name);
        console.log("Captions:", captions[index]);
      });

      // Append the selected activity to the form data
      // formData.append("activityId", selectedActivity);
      console.log(formData, "formadat");
      const response = await fetch(`${uploadUrl}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Image uploaded successfully!");
        console.log(captions);
        // console.log(descriptions);
        console.log(selectedActivity);
        console.log(activityName);

        setSelectedFile([]);
        setPreviewImage([]);
      } else {
        alert("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleCaptionChange = (index, value) => {
    const newCaptions = [...captions];
    newCaptions[index] = value;
    setCaptions(newCaptions);
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h2 className="card-title">Upload Event Image</h2>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-7">
            <div className="mb-3">
              <label htmlFor="activitySelect" className="form-label">
                Select Event:
              </label>

              {/*search input start*/}
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span
                style={{
                  position: "absolute",
                  top: "25%",
                  right: "30px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {/* <FontAwesomeIcon icon={faSearch} /> */}
                <IoSearchOutline />
              </span>

              {searchQuery.length > 0 && (
                <ul className="list-group mt-2">
                  {activities
                    .filter((activity) =>
                      activity.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((activity) => (
                      <li
                        key={activity._id}
                        className="list-group-item"
                        onClick={() => {
                          setSelectedActivity(activity);
                          setSearchQuery("");
                        }}
                      >
                        {activity.name}
                      </li>
                    ))}
                </ul>
              )}

              {/**end here */}
              <select
                className="form-select"
                id="activitySelect"
                value={selectedActivity?._id || ""}
                onChange={(e) => {
                  const selectedActivityObject = activities?.find(
                    (activity) => activity?._id === e.target.value
                  );
                  setSelectedActivity(selectedActivityObject);
                  setActivityName(
                    selectedActivityObject ? selectedActivityObject.name : ""
                  );
                  setCategory(selectedActivityObject?.category);
                  setEventCaption(selectedActivityObject?.caption);
                  setEventDescription(selectedActivityObject?.description);
                  setActivitySelectError("");
                }}
              >
                <option value="">Select an event</option>
                {activities.reverse().map((activity) => (
                  <option key={activity?._id} value={activity?._id}>
                    {activity?.name}
                  </option>
                ))}
              </select>
              <span
                className="delete-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Delete activity");
                }}
              >
                <FcEmptyTrash />
              </span>
              {activitySelectError && (
                <div className="text-danger">{activitySelectError}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="categorySelect" className="form-label">
                Select Category:
              </label>
              <select
                className="form-select"
                id="categorySelect"
                required
                value={category}
                onChange={(e) =>
                  handleInputChange(e, setCategory, setCategoryError)
                }
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {categoryError && (
                <div className="text-danger">{categoryError}</div>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-5">
            <label>Image Thumbnail:</label>
            <img
              src={serverUrl + "/" + selectedActivity?.thumbnail?.path}
              alt={`Preview`}
              className="img-fluid"
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="eventCaption" className="form-label">
            Event Caption:
          </label>
          <input
            id="eventCaption"
            type="text"
            required
            className="form-control"
            value={eventCaption}
            onChange={(e) =>
              handleInputChange(e, setEventCaption, setEventCaptionError)
            }
          />
          {eventCaptionError && (
            <div className="text-danger">{eventCaptionError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="eventDescription" className="form-label">
            Event Description:
          </label>
          <textarea
            id="eventDescription"
            required
            className="form-control"
            value={eventDescription}
            rows={4}
            onChange={(e) =>
              handleInputChange(
                e,
                setEventDescription,
                setAddEventDescriptionError
              )
            }
          ></textarea>
          {addEventDescriptionError && (
            <div className="text-danger">{addEventDescriptionError}</div>
          )}
        </div>

        <h3 className="text-dark mt-2">Activity Images</h3>
        <br />
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {selectedActivity &&
            selectedActivity.imageIds.map((image) => (
              <div key={image._id} className="col">
                <div className="card h-100">
                  <img
                    src={`${serverUrl}/${image.path}`}
                    alt={`${selectedActivity.name}`}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body">
                    <p className="card-title">
                      <b>Caption:</b> {image.caption}
                    </p>
                    <p className="card-text">
                      <b>Description:</b> {image.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupFile01">
            Upload
          </label>
          <input
            type="file"
            className="form-control"
            id="inputGroupFile01"
            onChange={handleFileChange}
            multiple
          />
        </div>

        {previewImages.length > 0 && (
          <div>
            <h5>Selected Images:</h5>
            <div className="row">
              {previewImages.map((preview, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          className="img-fluid"
                          style={{
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="mt-3">
                          <div
                            className="form-group"
                            style={{ marginBottom: "5px" }}
                          >
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Caption"
                              value={captions[index] || ""}
                              onChange={(e) =>
                                handleCaptionChange(index, e.target.value)
                              }
                            />
                          </div>

                          <div className="form-group">
                            <input
                              type="checkbox"
                              id={`event_thumbnail_${index}`}
                              checked={thumbnailIndex === index}
                              onChange={(e) =>
                                setThumbnailIndex(
                                  e.target.checked ? index : null
                                )
                              }
                            />
                            <label htmlFor={`event_thumbnail_${index}`}>
                              Event Thumbnail
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <br />
        <button
          className="btn btn-primary"
          onClick={() => handleImageUpload(activityName)}
          disabled={selectedFile.length === 0}
        >
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default ImageUploadForm;
