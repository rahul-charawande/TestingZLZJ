import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Activities = () => {
  const [activity, setActivity] = useState(null);
  const { activity_id } = useParams();
  
 
  const serverurl = process.env.REACT_APP_SERVER_URL;
  const serverurla = process.env.REACT_APP_SERVER_URLA;
  const getActivityUrl = serverurl + "/activity";
  useEffect(() => {
    const fetchData = () => {
      fetch(`${getActivityUrl}/${activity_id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data, "data from server");
          setActivity(data);
        })
        .catch((error) => console.error("Error fetching activity:", error));
    };
    fetchData();
  }, [activity_id, getActivityUrl]);
  //useEffect(() => {
    // Fetch images from the backend API
    //const fetchData = () => {
      //fetch(`${getActivityUrl}` + activity_id)
        //.then((response) => response.json())
        //.then((data) => {
          //console.log(data, "data from serever");
          //setActivity(data);
        //})
        //.catch((error) => console.error("Error fetching images:", error));
    //};
    //fetchData();
  //},[]);


  return (
    <div className="container py-3" style={{ marginTop: "130px" }}>
      {activity && (
        <div key={activity._id} className="card mb-4">
          <div className="card-header">
            <h2 className="text-dark">{activity.name}</h2>
          </div>
          <div className="card-body">
            {/* Thumbnail */}
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                <img
                  src={serverurl + "/" + activity.thumbnail.path}
                  style={{ width: "100%", height: 300 }}
                  alt={`Thumbnail for ${activity.name}`}
                  className="img-thumbnail mb-3"
                />
              </div>
            </div>

            {/* Activity Details */}
            <p>Date: {activity.date}</p>
            <p>Category: {activity.category}</p>
            <p>Caption: {activity.caption}</p>
            <p>Description: {activity.description}</p>

            {/* Grid of images */}
            <h3 className="text-dark mt-2">Activity Images</h3>
            <div className="row">
              {activity.imageIds.map((image) => (
                <div key={image._id} className="col-md-4 mb-4">
                  <div className="card" style={{ height: "100%" }}>
                    <img
                      src={`${serverurl}/${image.path}`}
                      alt={`${activity.name}`}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <p className="card-title"> {image.caption}</p>
                      {/* <p className="card-text">
                        <b>Description:</b> {image.description}
                      </p> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
