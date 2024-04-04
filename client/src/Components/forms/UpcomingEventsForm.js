import React, { useState } from "react";

const UpcomingEventsForm = ({ serverUrl }) => {
  const serverurl = process.env.REACT_APP_SERVER_URL;
  const addUpcomingEvent = serverurl + "/addUpcomingEvent";
  // State variables for form fields and validation
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventUpDate, setEventUpDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  //form validation
  const [eventNameError, setEventNameError] = useState("");
  const [eventDescriptionError, setEventDescriptionError] = useState("");
  const [eventUpDateError, setEventUpDateError] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");

  // Function to handle input change and clear error
  const handleInputChange = (e, setState, setErrorState) => {
    setState(e.target.value);
    setErrorState("");
  };

  // Function to handle adding upcoming event
  const handleAddUpcomingEvent = async () => {
    let isValid = true;

    if (!eventName.trim()) {
      setEventNameError("Event Name is required");
      isValid = false;
    }
    if (!eventDescription.trim()) {
      setEventDescriptionError("Event Description is required");
      isValid = false;
    }
    if (!eventUpDate) {
      setEventUpDateError("Upcoming Event Date is required");
      isValid = false;
    }
    if (!startTime) {
      setStartTimeError("Start Time is required");
      isValid = false;
    }
    if (!endTime) {
      setEndTimeError("End Time is required");
      isValid = false;
    }

    if (!isValid) {
      return;
    }
    try {
      const eventData = {
        eventName,
        eventDescription,
        eventUpDate,
        startTime,
        endTime,
      };

      // Make a POST request to your server
      const response = await fetch(`${addUpcomingEvent}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        console.log("Upcoming event added successfully!");
        alert("Upcoming event added successfully!!");
        setEventName("");
        setEventDescription("");
        setEventUpDate("");
        setStartTime("");
        setEndTime("");
      } else {
        console.error("Failed to add upcoming event:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding upcoming event:", error);
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h2 className="card-title">Add Upcoming Events</h2>
        {/* Add content for the second card */}
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Event Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="eventName"
            value={eventName}
            onChange={(e) =>
              handleInputChange(e, setEventName, setEventNameError)
            }
          />
          {eventNameError && (
            <div className="text-danger">{eventNameError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="activityName" className="form-label">
            Event Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="eventDescription"
            value={eventDescription}
            onChange={(e) =>
              handleInputChange(
                e,
                setEventDescription,
                setEventDescriptionError
              )
            }
          />
          {eventDescriptionError && (
            <div className="text-danger">{eventDescriptionError}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="activityDate" className="form-label">
            Upcoming Event Date:
          </label>
          <input
            type="date"
            className="form-control"
            id="eventUpDate"
            value={eventUpDate}
            onChange={(e) =>
              handleInputChange(e, setEventUpDate, setEventUpDateError)
            }
          />
          {eventUpDateError && (
            <div className="text-danger">{eventUpDateError}</div>
          )}
        </div>
        <div className="mb-3 row">
          <div className="col">
            <label htmlFor="startTime" className="form-label">
              Start Time:
            </label>
            <input
              type="time"
              className="form-control"
              id="startTime"
              value={startTime}
              onChange={(e) =>
                handleInputChange(e, setStartTime, setStartTimeError)
              }
            />
            {startTimeError && (
              <div className="text-danger">{startTimeError}</div>
            )}
          </div>
          <div className="col">
            <label htmlFor="endTime" className="form-label">
              End Time:
            </label>
            <input
              type="time"
              className="form-control"
              id="endTime"
              value={endTime}
              onChange={(e) =>
                handleInputChange(e, setEndTime, setEndTimeError)
              }
            />
            {endTimeError && <div className="text-danger">{endTimeError}</div>}
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleAddUpcomingEvent}>
          Add Upcoming Events
        </button>
      </div>
    </div>
  );
};

export default UpcomingEventsForm;
