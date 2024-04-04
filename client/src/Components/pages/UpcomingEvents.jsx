import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const UpcomingEvents = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const serverurl = process.env.REACT_APP_SERVER_URL;
  const getUpcomingEvents = serverurl + "/getUpcomingEvents";

  useEffect(() => {
    const token = process.env.REACT_APP_UPCOMING_EVENTS_TOKEN_DATA;
    const tokeng = process.env.REACT_APP_TOKEN_DATA;
    const getUpcomingEventsEndpoint = `${serverurl}/getUpcomingEvents`;
    fetch(getUpcomingEventsEndpoint, {
      headers: {
        'Authorization': token,
        'Authorization_g': tokeng  
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const mappedEvents = data.map((event) => {
          const year = new Date(event.eventUpDate).getFullYear();
          const month = new Date(event.eventUpDate).getMonth();
          const day = new Date(event.eventUpDate).getDate();

          // Parse time components
          const [hours, minutes] = event.startTime.split(":");

          // Create start and end dates
          const start = new Date(year, month, day, hours, minutes);
          const end = new Date(year, month, day, hours, minutes); // You can modify this as needed

          return {
            id: event._id,
            title: event.eventName,
            description: event.eventDescription,
            start,
            end,
          };
        });
        setEvents(mappedEvents);
        console.log("Mapped Events:", mappedEvents); // Log the mapped events
        console.log("rsponseeeeee", data);
      })
      .catch((error) => console.log("Error fetching events:", error));
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: isSelected ? "#3174ad" : "#1ab394",
      color: isSelected ? "#ffff" : "yellow",
      borderRadius: "0px",
      border: "none",
    };

    return {
      style,
    };
  };

  const EventTooltip = ({ event }) => (
    <div
      style={{
        backgroundColor: "lightblue",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <h5 style={{ color: "black" }}>{event.title}</h5>
      <p>{event.description}</p>
    </div>
  );

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true); 
  };

  const calendarStyles = {
    ".rbc-day-bg.rbc-today": {
      backgroundColor: "#e5e5e5",
      color: "#fff",
    },
    // Adjust event styles
    ".rbc-event": {
      cursor: "pointer",
      padding: "2px 5px",
      backgroundColor: "#1ab394",
      borderRadius: "5px",
      color: "#fff",
    },
    // Show more button styles
    ".rbc-show-more": {
      color: "#1ab394",
      marginTop: "5px",
      textAlign: "center",
    },
    ".rbc-show-more:hover": {
      color: "#000",
    },
    // Toolbar styles
    ".rbc-toolbar": {
      marginBottom: "20px",
    },
    ".rbc-btn-group button": {
      borderRadius: "25px",
    },
    ".rbc-toolbar-label": {
      fontSize: "25px",
    },
  };

  return (
    <div style={{ height: "500px", marginTop: "135px" }}>
      <Calendar
        localizer={localizer}
        views={["month", "work_week", "agenda"]}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        eventPropGetter={eventStyleGetter}
        components={{
          event: EventTooltip,
        }}
        onSelectEvent={handleEventClick}
        style={{ calendarStyles }}
      />
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Event Details"
        style={{
          content: {
            width: "300px",
            maxWidth: "90%",
            margin: "auto",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "50px",
            height: "200px",
          },
          overlay: {
            zIndex: 1000, 
          },
        }}
      >
        {selectedEvent && (
          <div>
            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.description}</p>
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default UpcomingEvents;
