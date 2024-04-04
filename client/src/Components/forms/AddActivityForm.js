// AddEventForm.js
import React, { useState } from "react";

const AddEventForm = () => {
  const serverurl = process.env.REACT_APP_SERVER_URL;
  const postactivities = serverurl + "/postactivities";
  const [activityName, setActivityName] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [category, setCategory] = useState("");
  const [eventCaption, setEventCaption] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [activityNameError, setActivityNameError] = useState("");
  const [activityDateError, setActivityDateError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [eventCaptionError, setEventCaptionError] = useState("");
  const [addEventDescriptionError, setAddEventDescriptionError] = useState("");
  const categories = [
    "Impact",
    "Environment",
    "Recycling",
    "Ecology",
    "Climate",
  ];

  const handleInputChange = (e, setter, setError) => {
    setter(e.target.value);
    setError("");
  };

  const handleAddActivity = async () => {
    let isValid = true;

    if (!activityName.trim()) {
      setActivityNameError("Activity Event Name is required");
      isValid = false;
    }
    if (!activityDate.trim()) {
      setActivityDateError("Event Date is required");
      isValid = false;
    }
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

    // If any field is invalid, stop further processing
    if (!isValid) {
      return;
    }

    try {
      const response = await fetch(`${postactivities}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: activityName,
          date: activityDate,
          event_caption: eventCaption,
          event_description: eventDescription,
          category,
        }),
      });

      if (response.ok) {
        alert("Activity added successfully!!");
        // You can add additional logic or reset the form if needed
        setActivityName("");
        setActivityDate("");
        setCategory("");
        setEventCaption("");
        setEventDescription("");
      } else {
        alert("Failed to add activity. Please try again.");
      }
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h2 className="card-title">Add Events</h2>
        {/* Add content for the second card */}
        <div className="mb-3">
          <label htmlFor="activityName" className="form-label">
            Event Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="activityName"
            value={activityName}
            // onChange={(e) => setActivityName(e.target.value)}
            onChange={(e) =>
              handleInputChange(e, setActivityName, setActivityNameError)
            }
            // Add state and onChange handler as needed
          />
          {activityNameError && (
            <div className="text-danger">{activityNameError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="activityDate" className="form-label">
            Event Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="activityDate"
            value={activityDate}
            onChange={(e) =>
              handleInputChange(e, setActivityDate, setActivityDateError)
            }
          />
          {activityDateError && (
            <div className="text-danger">{activityDateError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="categorySelect" className="form-label">
            Select Category:
          </label>
          <select
            className="form-select"
            id="categorySelect"
            value={category}
            // onChange={(e) => {
            //   setCategory(e.target.value);
            // }}
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
          {categoryError && <div className="text-danger">{categoryError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="eventCaption" className="form-label">
            Event Caption:
          </label>
          <input
            id="eventCaption"
            type="text"
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
            type="text"
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
        <button
          className="btn btn-primary"
          onClick={() => {
            handleAddActivity();
          }}
        >
          Add Activity
        </button>
      </div>
    </div>
  );
};

export default AddEventForm;
