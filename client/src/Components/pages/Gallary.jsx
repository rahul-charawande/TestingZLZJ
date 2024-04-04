import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import ReactSimpleImageViewer from "react-simple-image-viewer";
import { Link } from "react-router-dom";

const Gallary = () => {
  const serverurl = process.env.REACT_APP_SERVER_URL;
  const getImagesUrl = serverurl + "/images";
  const getLatestActivity = serverurl + "/activities/latest";


  const [images, setImages] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [allActivities, setAllActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState("*");

  //
  // const [galleryData, setGalleryData] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // const openImageViewer = (index) => {
  //   setCurrentImage(index);
  //   setIsViewerOpen(true);
  // };

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const tokeng = process.env.REACT_APP_TOKEN_DATA;
        const token = process.env.REACT_APP_IMAGE_TOKEN_DATA;
        const getImagesUrlEndpoint = `${serverurl}/images`;
        const response = await axios.get(getImagesUrlEndpoint, {
          headers: {
            'Authorization': token, 
            'Authorization_g': tokeng
          }
        });
       // const response = await axios.get(`${getImagesUrl}`);
        const uniqueActivityIds = new Set();

        const uniqueImages = response.data.reverse().filter((image) => {
          if (!uniqueActivityIds.has(image.activityId)) {
            uniqueActivityIds.add(image.activityId);
            return true;
          }
          return false;
        });

        const formattedImages = uniqueImages.map((image) => ({
          ...image,
          url: `/uploads/${image.path}`,
        }));

        setImages(formattedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    const fetchActivitiesWithTheirImages = async () => {
      try {
        const token = process.env.REACT_APP_LATEST_ACTIVITY_TOKEN_DATA;
        const tokeng = process.env.REACT_APP_TOKEN_DATA;
        const getLatestActivityEndpoint = `${serverurl}/activities/latest`;
        const { data } = await axios.get(getLatestActivityEndpoint, {
          headers: {
            'Authorization': token, 
            'Authorization_g': tokeng
          }
        });
        //const { data } = await axios.get(
       //   `${getLatestActivity}`
       // );
        setAllActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchImages();
    fetchActivitiesWithTheirImages();
  }, []);

  useEffect(() => {
    filterActivities("*");
  }, [allActivities]);

  const filterActivities = (category) => {
    let filteredResults = [];
    try {
      if (category === "*") {
        allActivities.map((category) => {
          return filteredResults.push(...category.activities);
        });
      } else {
        filteredResults.push(
          ...allActivities.filter(
            (activity) => activity._id.toUpperCase() === category.toUpperCase()
          )[0].activities
        );
      }
      filteredResults = filteredResults.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      setFilteredActivities(filteredResults);
    } catch (error) {
      setFilteredActivities([]);
    }
  };

  // const FilterButtons = () => {
  //   const categories = [
  //     "*",
  //     "Impact",
  //     "Environment",
  //     "Recycling",
  //     "Ecology",
  //     "Climate",
  //   ];

  //   const handleButtonClick = (category) => {
  //     filterActivities(category);
  //   };

  //   return (
  //     <div id="filters" className="button-group">
  //       {categories.map((category) => (
  //         <button
  //           key={category}
  //           className={`button ${
  //             selectedCategory === category ? "is-checked" : ""
  //           }`}
  //           onClick={() => handleButtonClick(category)}
  //         >
  //           {category === "*" ? "show all" : category}
  //         </button>
  //       ))}
  //     </div>
  //   );
  // };

  const ActivitiesList = ({ activities }) => {
    return (
      <div className="portfolio-items">
        {activities.length !== 0 &&
          activities.map((activity, index) => (
            <div key={activity._id}>
              <div className={`item cat-${(index % 3) + 1}`} key={index}>
                <div className="item-inner">
                  <div
                    className="portfolio-img"
                    onClick={() => handleImageClick(activity._id)}
                  >
                    <Link to={`/activities/${activity._id}`}>
                      <img
                        src={`${serverurl}/${activity.thumbnail.path}`}
                        alt={`recent-project-img-${index}`}
                        style={{ width: "370px", height: "280px" }}
                      />
                    </Link>
                  </div>
                  <div className="recent-project-content">
                    <h4>{activity.name}</h4>
                    {/* {selectedCategory === "*" && <h5> {activity.category}</h5>} */}
                    <h5>{activity.description || "Description Missing"}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {activities.length === 0 && (
          <>
            <h2>No Activities</h2>
          </>
        )}
      </div>
    );
  };

  const handleImageClick = (activityId) => {
    setSelectedActivityId(activityId);
    localStorage.setItem("activityId", activityId);
  };

  const filteredImages = selectedActivityId
    ? images.filter((image) => image.activityId === selectedActivityId)
    : images;

  return (
    <div>
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0" />
        <title>Green Nature</title>

        <div
          className="body-wrapper  float-menu"
          data-home="https://demo.goodlayers.com/greennature/"
        >
          {/* is search */}
          <div className="greennature-page-title-wrapper header-style-5-title-wrapper">
            <div className="greennature-page-title-overlay" />
            <div className="greennature-page-title-container container">
              <h1 className="greennature-page-title">recent activity images</h1>
            </div>
          </div>
          {/* is search */}

          <div className="content-wrapper">
            <div className="greennature-content">
              <div className="with-sidebar-wrapper">
                <section id="content-section-1">
                  <div className="section-container container">
                    <div
                      className="greennature-gallery-item greennature-item"
                      style={{
                        marginBottom: 20,
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      <div className="clear" />
                    </div>
                    {isViewerOpen && (
                      <ReactSimpleImageViewer
                        src={filteredImages.map(
                          (item) => `${serverurl}/${item.path}`
                        )}
                        currentIndex={currentImage}
                        disableScroll={true}
                        closeOnClickOutside={true}
                        onClose={closeImageViewer}
                        width="500"
                        height="400"
                      />
                    )}
                  </div>
                </section>
                <ActivitiesList activities={filteredActivities} />
              </div>
            </div>
            <div className="clear" />
          </div>

          <Footer />
        </div>
      </>
    </div>
  );
};

export default Gallary;
