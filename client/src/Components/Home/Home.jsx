import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import service1 from "../../upload/icon-service-1.png";
import service2 from "../../upload/icon-service-2.png";
import service3 from "../../upload/icon-service-3.png";

import bg1 from "../../upload/donation-bg1.webp";
import bg2 from "../../upload/donation-bg-1_m.webp";
import bg3 from "../../upload/donation-bg-2_m.webp";

import event from "../../upload/upcoming-events-img-1.jpg";
import events from "../../upload/upcoming-events-img-2.jpg";

import slider1 from "../../../src/upload/slider-1n.jpg";
import slider2 from "../../../src/upload/slider-2.jpg";
import slider3 from "../../../src/upload/slider-3.jpg";

import video from "../../upload/video-icon.png";

import Footer from "../Footer/Footer";
import "../Home/Home.css";
import useAnalyticsEventTracker from "../Analytics/useAnalyticsEventTracker";

const Home = () => {
  useEffect(() => {
    gaEventTracker();
  }, []);
  const gaEventTracker = useAnalyticsEventTracker("Home");
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const serverurl = process.env.REACT_APP_SERVER_URL;
  const serverurla = process.env.REACT_APP_SERVER_URLA;

  const getImagesUrl =  serverurl + "/images";
  const getLatestActivity = serverurl + "/activities/latest";

  const [images, setImages] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("*");
  const [allActivities, setAllActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const handleImageClick = (activityId) => {
    console.log("Activityfffffffffffff ID:", activityId);
    setSelectedActivityId(activityId);
    localStorage.setItem("activityId", activityId);
  };

  const filteredImages = selectedActivityId
    ? images.filter((image) => image.activityId === selectedActivityId)
    : images;

  console.log("filteredImages", filteredImages);

  useEffect(() => {
    const fetchImages = async () => {
      try {

        const token = process.env.REACT_APP_IMAGE_TOKEN_DATA;
        const tokeng = process.env.REACT_APP_TOKEN_DATA;
        const serverurlEndpoint = `${serverurl}/images`;
        const response = await axios.get(serverurlEndpoint, {
          headers: {
            'Authorization': token, 
            'Authorization_g': tokeng 
          }
        });

        //const response = await axios.get(`${getImagesUrl}`);

        console.log("images response :" + response);
        if (response.ok) {
          const uniqueActivityIds = new Set();
          console.log(" response is ok a :" + response);
          // Filter images to get unique activityIds
          const uniqueImages = response.data.reverse().filter((image) => {
            if (!uniqueActivityIds.has(image.activityId)) {
              uniqueActivityIds.add(image.activityId);
              return true;
            }
            return false;
          });

          // Get the last 6 unique images
          const formattedImages = uniqueImages.slice(0, 6).map((image) => {
            console.log("Image Activity ID:", image.activityId);
            console.log("Image a:", image);
            console.log("formattedImages a:", formattedImages);
            return {
              ...image,
              url: `/uploads/${image.path}`,
            };
          });

          // Assuming the API response is an array of image objects
          setImages(formattedImages);
        }else {
          console.log("Image ab:");
          console.error("Error fetching dimages:", error);
        }
      } catch (error) {
        console.log("Image abb:");
        console.error("Error fetching images:", error);
      }
    };
    const fetchActivitiesWithTheirImages = async () => {
      const token = process.env.REACT_APP_LATEST_ACTIVITY_TOKEN_DATA;
      const tokeng = process.env.REACT_APP_TOKEN_DATA;
      const getLatestActivityEndpoint = `${serverurl}/activities/latest`;
      const { data } = await axios.get(getLatestActivityEndpoint, {
        headers: {
          'Authorization': token,
          'Authorization_g': tokeng  
        }
      });
      //const { data } = await axios.get(`${getLatestActivity}`);
      console.log(data, "api result");
      setAllActivities((prevState) => {
        console.log(prevState, "previous state");
        return data;
      });
      console.log(allActivities, "alldata");
    };
    fetchActivitiesWithTheirImages();
    fetchImages();
  }, []);

  useEffect(() => {
    filterActivities(selectedCategory);
  }, [allActivities, selectedCategory]);
  console.log("Filtered Images:", filteredImages);

  const filterActivities = (category) => {
    let filteredResults = [];
    try {
      if (category === "*") {
        console.log(allActivities, "all data");
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
      console.log(filteredResults, "filtered resulets");
      setFilteredActivities(filteredResults);
      console.log(`Filtering images for category: ${category}`);
    } catch (error) {
      setFilteredActivities([]);
    }
  };
  const FilterButtons = () => {
    const categories = [
      "*",
      "Impact",
      "Environment",
      "Recycling",
      "Ecology",
      "Climate",
    ];

    const handleButtonClick = (category) => {
      setSelectedCategory(category);
      filterActivities(category);
    };

    return (
      <div id="filters" className="button-group">
        {categories.map((category) => (
          <button
            key={category}
            className={`button ${
              selectedCategory === category ? "is-checked" : ""
            }`}
            onClick={() => handleButtonClick(category)}
          >
            {category === "*" ? "show all" : category}
          </button>
        ))}
      </div>
    );
  };

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
                        src={`${serverurla}/${activity.thumbnail.path}`}
                        alt={`recent-project-img-${index}`}
                        style={{ width: "370px", height: "280px" }}
                      />
                    </Link>
                  </div>
                  <div className="recent-project-content">
                    <h4>{activity.name}</h4>
                    {selectedCategory === "*" && <h5> {activity.category}</h5>}
                    <h5>{activity.description || "Description Missing"}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {activities.length === 0 && (
          <>
            <h2>No Activitie</h2>
          </>
        )}
      </div>
    );
  };

  return (
    <div>
      <Slider {...settings}>
        <div className="carousel-item">
          <img src={slider1} className="d-block w-100" alt="..." />
          <div
            className="carousel-caption d-none d-md-block"
            style={{ textAlign: "left", padding: "0", marginBottom: "80px" }}
          >
            <div
              className="ms-layer msp-cn-1-1"
              data-effect="t(true,150,n,n,n,n,n,n,n,n,n,n,n,n,n)"
              data-duration="350"
              data-ease="easeOutQuint"
              data-offset-x="0"
              data-offset-y="-100"
              data-origin="ml"
              data-position="normal"
            >
              Together
            </div>
            <div
              className="ms-layer msp-cn-1-2"
              data-effect="t(true,150,n,n,n,n,n,n,n,n,n,n,n,n,n)"
              data-duration="425"
              data-delay="325"
              data-ease="easeOutQuint"
              data-offset-x="0"
              data-offset-y="-5"
              data-origin="ml"
              data-position="normal"
            >
              We can heal
            </div>
            <div
              className="ms-layer msp-cn-1-3"
              data-effect="t(true,150,n,n,n,n,n,n,n,n,n,n,n,n,n)"
              data-duration="437"
              data-delay="625"
              data-ease="easeOutQuint"
              data-offset-x="0"
              data-offset-y="105"
              data-origin="ml"
              data-position="normal"
            >
              The Earth
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img src={slider2} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block"></div>
        </div>
        <div className="carousel-item">
          <img src={slider3} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <div
              className="ms-layer msp-cn-1-13"
              data-effect="t(true,n,n,500,n,n,n,n,n,n,n,n,n,n,n)"
              data-duration="437"
              data-ease="easeOutQuint"
              data-offset-x="0"
              data-offset-y="-15"
              data-origin="mc"
              data-position="normal"
            >
              Make This World
            </div>
            <div
              className="ms-layer msp-cn-1-10"
              data-effect="t(true,n,n,-500,n,n,n,n,n,n,n,n,n,n,n)"
              data-duration="425"
              data-delay="425"
              data-ease="easeOutQuint"
              data-offset-x="0"
              data-offset-y="82"
              data-origin="mc"
              data-position="normal"
            >
              The Better Place
            </div>
          </div>
        </div>
      </Slider>
      <section id="content-section-3">
        <div
          className="greennature-parallax-wrapper greennature-background-image gdlr-show-all no-skin"
          id="greennature-parallax-wrapper-1"
          data-bgspeed="0.11"
          style={{
            backgroundImage: `url(${bg1})`,
            paddingTop: "30px",
            paddingBottom: "30px",
          }}
        >
          <div className="container">
            <div className="six columns">
              <div
                className="greennature-item greennature-action-ads-item"
                style={{ background: `url(${bg2})` }}
              >
                <h3 className="action-ads-title" style={{ color: "#facc2e" }}>
                  Make Donation
                </h3>
                <div className="action-ads-caption greennature-skin-info">
                  Your money can cure this earth
                </div>
                <div
                  className="action-ads-divider"
                  style={{ background: "#facc2e" }}
                ></div>
                <div className="action-ads-content">
                  <p>
                    We are a large group of people who powered movement fighting
                    for a green and peaceful future for your land, forest,
                    ocenas, foods, climate and pass the green earth to our
                    children. Each one of us can make small changes in our
                    lives, but together we can change the world.
                  </p>
                  <a
                    className="action-ads-button large greennature-button greennature-lb-payment"
                    href="/donateform"
                    style={{ color: "#6d5b1c", backgroundColor: "#fec428" }}
                  >
                    Donate Now
                  </a>
                </div>
              </div>
            </div>
            <div className="six columns">
              <div
                className="greennature-item greennature-action-ads-item"
                style={{ background: `url(${bg3})` }}
              >
                <h3 className="action-ads-title" style={{ color: "#5dc269" }}>
                  Stop Drilling, Need Action!
                </h3>
                <div className="action-ads-caption greennature-skin-info">
                  Your voice does matter
                </div>
                <div
                  className="action-ads-divider"
                  style={{ background: "#5dc269" }}
                ></div>
                <div className="action-ads-content">
                  <p>
                    The Obama administration just granted Shell&#8217;s final
                    permit to drill in the Alaskan Arctic this summer despite
                    overwhelming global public opposition and the obvious risks
                    to Arctic communities, wildlife, and our climate. The
                    President knows what’s at stake: his climate legacy.
                  </p>
                  <a
                    className="action-ads-button large greennature-button"
                    style={{ color: "#ffffff", backgroundColor: "#5dc269" }}
                    href="/actnow"
                  >
                    Act Now!
                  </a>
                </div>
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
        <div className="clear"></div>
      </section>
      <section id="content-section-2">
        <div
          className="greennature-color-wrapper  gdlr-show-all greennature-skin-brown-column-service"
          style={{
            backgroundColor: "#2d2418",
            borderTop: "5px solid #3f3221",
            paddingTop: "0px",
            paddingBottom: "0px",
          }}
        >
          <div className="container" style={{ height: "fit-content" }}>
            <div className="four columns">
              <div className="greennature-ux column-service-ux">
                <div
                  className="greennature-item greennature-column-service-item greennature-type-2"
                  style={{ marginBottom: "0px" }}
                >
                  <div className="column-service-image">
                    <img src={service1} alt="" width="80" height="80" />
                  </div>
                  <div className="column-service-content-wrapper">
                    <h3 className="column-service-title">Save Our Forest</h3>
                    <div className="column-service-content greennature-skin-content">
                      <p>
                        Preserving our forests is paramount to maintaining
                        biodiversity, regulating climate patterns, and ensuring
                        a sustainable future for generations to come,
                        necessitating concerted efforts in responsible forestry
                        practices, reforestation initiatives.
                      </p>
                    </div>
                    {/* <a className="column-service-read-more" href="/">
                      Learn More
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="four columns">
              <div className="greennature-ux column-service-ux">
                <div
                  className="greennature-item greennature-column-service-item greennature-type-2-bg"
                  style={{
                    backgroundColor: "#3f3221",
                    paddingBottom: "10%",
                  }}
                >
                  <div className="column-service-image">
                    <img src={service2} alt="" width="80" height="80" />
                  </div>
                  <div className="column-service-content-wrapper">
                    <h3 className="column-service-title">Save Our Water</h3>
                    <div className="column-service-content greennature-skin-content">
                      <p>
                        Safeguarding our water sources is imperative, as it not
                        only ensures access to clean and abundant water for
                        current and future generations but also mitigates
                        environmental degradation.
                      </p>
                    </div>
                    {/* <a className="column-service-read-more" href="/">
                      Learn More
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="four columns">
              <div className="greennature-ux column-service-ux">
                <div
                  className="greennature-item greennature-column-service-item greennature-type-2"
                  style={{ marginBottom: "0px" }}
                >
                  <div className="column-service-image">
                    <img src={service3} alt="" width="80" height="80" />
                  </div>
                  <div className="column-service-content-wrapper">
                    <h3 className="column-service-title">
                      Recycling is A Must
                    </h3>
                    <div className="column-service-content greennature-skin-content">
                      <p>
                        Embracing recycling as a daily practice is pivotal in
                        reducing waste ,underscoring the importance of
                        individual and collective efforts to create a
                        sustainable, circular economy that minimizes our
                        ecological footprint.
                      </p>
                    </div>
                    {/* <a className="column-service-read-more" href="/">
                      Learn More
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="clear"></div>
          </div>
        </div>
        <div className="clear"></div>
      </section>

      {/* <!-- Start Recent Project Section --> */}
      <section className="bg-recent-project" style={{ paddingBottom: "20px" }}>
        <div className="container">
          <div className="row">
            <div className="recent-project">
              <div
                className="section-header"
                style={{ paddingBlock: "unset", marginTop: "25px" }}
              >
                <h2>recent activities</h2>
                <p>
                 {/* Professionally mesh enterprise wide imperatives without world
                  class paradigms. */}
                  {/* Dynamically deliver ubiquitous leadership
                  awesome skills. */}
                </p>
              </div>

              <FilterButtons />
              <ActivitiesList activities={filteredActivities} />
            </div>
          </div>
        </div>
        {/* <!-- .container --> */}
      </section>
      {/* <!-- End Recent Project Section --> */}

      {/* <!-- Start Service Style2 Section --> */}
      <section className="bg-servicesstyle2-section">
        <div className="container">
          <div className="row">
            <div className="our-services-option">
              <div className="section-header" style={{ paddingTop: "30px" }}>
                <h2>what we do</h2>
                <p>
                  Professionally mesh enterprise wide imperatives without world
                  class paradigms.Dynamically deliver ubiquitous leadership
                  awesome skills.
                </p>
              </div>
              {/* <!-- .section-header --> */}
              <div className="row">
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="our-services-box">
                    <div className="our-services-items">
                      <i className="flaticon-greenhouse"></i>
                      <div className="our-services-content">
                        <h4>
                          <a
                            href="https://en.wikipedia.org/wiki/Tree_planting"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Young Planting
                          </a>
                        </h4>
                        <p>
                          Tree planting is the process of transplanting tree
                          seedlings, generally for forestry, land reclamation...{" "}
                        </p>
                        <a
                          href="https://en.wikipedia.org/wiki/Tree_planting"
                          target="_blank"
                          rel="noreferrer"
                        >
                          read more
                          <i
                            className="fa fa-angle-double-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                      {/* <!-- .our-services-content --> */}
                    </div>
                    {/* <!-- .our-services-items --> */}
                  </div>
                  {/* <!-- .our-services-box --> */}
                </div>
                {/* <!-- .col-md-4 --> */}
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="our-services-box">
                    <div className="our-services-items">
                      <i className="flaticon-technology"></i>
                      <div className="our-services-content">
                        <h4>
                          <a
                            href="https://en.wikipedia.org/wiki/Solar_panel"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Solar Panels
                          </a>
                        </h4>
                        <p>
                          A solar panel is a device that converts sunlight into
                          electricity by using photovoltaic (PV) cells. PV cells
                          are made of materials that produce{" "}
                        </p>
                        <a
                          href="https://en.wikipedia.org/wiki/Solar_panel"
                          target="_blank"
                          rel="noreferrer"
                        >
                          read more
                          <i
                            className="fa fa-angle-double-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                      {/* <!-- .our-services-content --> */}
                    </div>
                    {/* <!-- .our-services-items --> */}
                  </div>
                  {/* <!-- .our-services-box --> */}
                </div>
                {/* <!-- .col-md-4 --> */}
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="our-services-box">
                    <div className="our-services-items">
                      <i className="flaticon-light-bulb"></i>
                      <div className="our-services-content">
                        <h4>
                          <a
                            href="https://openei.org/wiki/Wind_energy"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Wind Energy
                          </a>
                        </h4>
                        <p>
                          Wind turbines convert the kinetic energy in the wind
                          into mechanical power. A generator can convert
                          mechanical power into electricity{" "}
                        </p>
                        <a
                          href="https://openei.org/wiki/Wind_energy"
                          target="_blank"
                          rel="noreferrer"
                        >
                          read more
                          <i
                            className="fa fa-angle-double-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                      {/* <!-- .our-services-content --> */}
                    </div>
                    {/* <!-- .our-services-items --> */}
                  </div>
                  {/* <!-- .our-services-box --> */}
                </div>
                {/* <!-- .col-md-4 --> */}
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="our-services-box">
                    <div className="our-services-items">
                      <i className="flaticon-recycling-symbol"></i>
                      <div className="our-services-content">
                        <h4>
                          <a
                            href="https://en.wikipedia.org/wiki/Waste_management"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Recycling
                          </a>
                        </h4>
                        <p>
                          Credibly utcost efective an expertise and web enabled
                          proces that improvements Completely seamless channels{" "}
                        </p>
                        <a
                          href="https://en.wikipedia.org/wiki/Waste_management"
                          target="_blank"
                          rel="noreferrer"
                        >
                          read more
                          <i
                            className="fa fa-angle-double-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                      {/* <!-- .our-services-content --> */}
                    </div>
                    {/* <!-- .our-services-items --> */}
                  </div>
                  {/* <!-- .our-services-box --> */}
                </div>
                {/* <!-- .col-md-4 --> */}
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="our-services-box">
                    <div className="our-services-items">
                      <i className="flaticon-sprout"></i>
                      <div className="our-services-content">
                        <h4>
                          <a
                            href="https://en.wikipedia.org/wiki/Forest_protection"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Saving Forests
                          </a>
                        </h4>
                        <p>
                          Forest Saving is a branch of forestry which is
                          concerned with the preservation or improvement of a
                          forest and prevention{" "}
                        </p>
                        <a
                          href="https://en.wikipedia.org/wiki/Forest_protection"
                          target="_blank"
                          rel="noreferrer"
                        >
                          read more
                          <i
                            className="fa fa-angle-double-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                      {/* <!-- .our-services-content --> */}
                    </div>
                    {/* <!-- .our-services-items --> */}
                  </div>
                  {/* <!-- .our-services-box --> */}
                </div>
                {/* <!-- .col-md-4 --> */}
                <div className="col-lg-4 col-sm-6 col-12">
                  <div className="our-services-box">
                    <div className="our-services-items">
                      <i className="flaticon-droplet"></i>
                      <div className="our-services-content">
                        <h4>
                          <a
                            href="https://en.wikipedia.org/wiki/Water_purification"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Water Refining
                          </a>
                        </h4>
                        <p>
                          Water purification is the process of removing
                          undesirable chemicals, biological contaminants,
                          suspended solids, and gases from water.{" "}
                        </p>
                        <a
                          href="https://en.wikipedia.org/wiki/Water_purification"
                          target="_blank"
                          rel="noreferrer"
                        >
                          read more
                          <i
                            className="fa fa-angle-double-right"
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                      {/* <!-- .our-services-content --> */}
                    </div>
                    {/* <!-- .our-services-items --> */}
                  </div>
                  {/* <!-- .our-services-box --> */}
                </div>
                {/* <!-- .col-md-4 --> */}
              </div>
              {/* <!-- .row --> */}
            </div>
            {/* <!-- .our-services-option --> */}
          </div>
          {/* <!-- .row --> */}
        </div>
        {/* <!-- .container --> */}
      </section>
      {/* <!-- End Service Style2 Section --> */}

      {/* <!-- Start campaian video Section --> */}
      <section className="bg-compaian-video">
        <div className="compaian-video-overlay">
          <div className="container">
            <div className="row">
              <div className="compaian-video">
                <a
                  href="https://www.youtube.com/embed/imVlGxbHxEo"
                  data-rel="lightcase:myCollection"
                >
                  <img src={video} alt="video-icon" />
                </a>
                <h3>WATCH OUR LATEST CAMPAIGN VIDEO</h3>
              </div>
              {/* <!-- .compaian-video --> */}
            </div>
            {/* <!-- .row --> */}
          </div>
          {/* <!-- .container --> */}
        </div>
        {/* <!-- .compaian-video-overlay --> */}
      </section>
      {/* <!-- End campaian video Section --> */}

      {/* <!-- Start Upcoming Events Section --> */}
      <section className="bg-upcoming-events">
        <div className="container">
          <div className="row">
            <div className="upcoming-events">
              <div className="section-header">
                <h2>upcoming events</h2>
                <p></p>
              </div>
              {/* <!-- .section-header --> */}
              <div className="row">
                <div className="col-lg-6">
                  <div className="event-items">
                    <div className="event-img">
                      <a href="/events">
                        <img
                          src={event}
                          alt="upcoming-events-img-1"
                          className="img-responsive"
                        />
                      </a>
                      <div className="date-box">
                        <h3>05</h3>
                        <h5>June</h5>
                      </div>
                      {/* <!-- .date-box --> */}
                    </div>
                    {/* <!-- .event-img --> */}
                    <div className="events-content">
                      <h3>
                        <a href="/events">World Environment Day</a>
                      </h3>
                      <ul className="meta-post">
                        <li>
                          <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
                          7:30am - 12:30pm
                        </li>
                        <li>
                          <i className="flaticon-placeholder"></i> Narhe
                          Ambegaon Hill, Pune
                        </li>
                      </ul>
                      <p>
                        Uniquely initiate out ofthe-box channels vis and vis
                        multidisciplnary Credbly orcahestrate granular scenarios
                        for forward manufactured Assertively negotiate
                        multimedia based total linkage rather.
                      </p>
                      {/*<a href="event_single.html" className="btn btn-default">
                        join now
                      </a>*/}
                    </div>
                    {/* <!-- .events-content --> */}
                  </div>
                  {/* <!-- .events-items --> */}
                </div>
                {/* <!-- .col-lg-6 --> */}
                <div className="col-lg-6">
                  <div className="event-items">
                    <div className="event-img">
                      <a href="/events">
                        <img
                          src={events}
                          alt="upcoming-events-img-2"
                          className="img-responsive"
                        />
                      </a>
                      <div className="date-box">
                        <h3>29</h3>
                        <h5>july</h5>
                      </div>
                      {/* <!-- .date-box --> */}
                    </div>
                    {/* <!-- .event-img --> */}
                    <div className="events-content">
                      <h3>
                        <a href="/events">Tree Plantation Drive</a>
                      </h3>
                      <ul className="meta-post">
                        <li>
                          <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
                          7:30am - 12:30pm
                        </li>
                        <li>
                          <i className="flaticon-placeholder"></i> Narhe
                          Ambegaon Hill, Pune
                        </li>
                      </ul>
                      <p>
                        Uniquely initiate out ofthe-box channels vis and vis
                        multidisciplnary Credbly orcahestrate granular scenarios
                        for forward manufactured Assertively negotiate
                        multimedia based total linkage rather.
                      </p>
                      {/*<a href="event_single.html" className="btn btn-default">
                        join now
        </a>*/}
                    </div>
                    {/* <!-- .events-content --> */}
                  </div>
                  {/* <!-- .events-items --> */}
                </div>
                {/* <!-- .col-lg-6 --> */}
              </div>
              {/* <!-- .row --> */}
            </div>
            {/* <!-- .upcoming-events --> */}
          </div>
          {/* <!-- .row --> */}
        </div>
        {/* <!-- .container --> */}
      </section>
      {/* <!-- End Upcoming Events Section --> */}
      {/* <SimpleChatbot /> */}
      <Footer />
    </div>
  );
};

export default Home;
