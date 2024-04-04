import React, { useEffect, useState } from "react";
import img from "../src/upload/tree.png";
import icon1 from "./upload/icon-1.png";
import icon2 from "./upload/icon-2.png";
import icon4 from "./upload/icon-4.png";
import icon6 from "../src/upload/icon-6.png";
import icon5 from "../src/upload/icon-5.png";
import icon7 from "../src/upload/icon-7.png";
import personnel1 from "../src/upload/PravinB.jpeg";
import personnel2 from "../src/upload/AjitP.jpeg";
import personnel3 from "../src/upload/RajendraK.jpeg";
import servicebg from "../src/upload/service-bg-2.jpg";
import Footer from "./Components/Footer/Footer";
import "./About.css";
import SimpleChatbot from "./Components/ChatBot/ChatBotAI";

function About() {
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [numbers, setNumbers] = useState([]);
    const serverurl = process.env.REACT_APP_SERVER_URL;
    const getNumbers = serverurl + "/getNumbers";

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    try {
      const token = process.env.REACT_APP_NUMBER_TOKEN_DATA;
      const tokeng = process.env.REACT_APP_TOKEN_DATA;
      const getNumbersEndpoint = `${serverurl}/getNumbers`;
      const response = await fetch(getNumbersEndpoint, {
        headers: {
          'Authorization': token,
          'Authorization_g': tokeng  
        }
      });
      //const response = await fetch(`${getNumbers}`);
      if (response.ok) {
        const numbersData = await response.json();
        setNumbers(numbersData);
      } else {
        console.error("Failed to fetch numbers");
      }
    } catch (error) {
      console.error("Error fetching numbers:", error);
    }
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };



  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="initial-scale=1.0" />
      <title>Green Nature</title>

      <link rel="stylesheet" href="css/style.css" type="text/css" media="all" />
      <link
        rel="stylesheet"
        href="plugins/superfish/css/superfish.css"
        type="text/css"
        media="all"
      />
     
      <link
        rel="stylesheet"
        href="css/style-custom.css"
        type="text/css"
        media="all"
      />
     
      {/* </header> */}

      {/* is search */}
      <div className="content-wrapper">
        <div className="greennature-content">
          {/* Above Sidebar Section*/}
          {/* Sidebar With Content Section*/}
          <div className="with-sidebar-wrapper">
            <section id="content-section-1">
              <div
                className="greennature-parallax-wrapper greennature-background-image gdlr-show-all greennature-skin-dark-skin"
                id="greennature-parallax-wrapper-1"
                data-bgspeed={0}
                style={{
                  backgroundImage: `url(${img})`,
                  paddingTop: 260,
                  paddingBottom: 140,
                }}
              >
                <div className="container">
                  <div className="greennature-title-item">
                    <div className="greennature-item-title-wrapper greennature-item  greennature-center greennature-extra-large ">
                      <div className="greennature-item-title-container container">
                        <div className="greennature-item-title-head">
                          <h3 className="greennature-item-title greennature-skin-title greennature-skin-border">
                            PLANT TREES SAVE TREES
                          </h3>
                          <div className="greennature-item-title-caption greennature-skin-info">
                            Sowing the Seeds of Environmental Harmony
                          </div>
                          <div className="clear" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clear" />
                  <div className="clear" />
                </div>
              </div>
              <div className="clear" />
            </section>

            <section id="content-section-2">
              <div className="container">
                <div className="greennature-item greennature-about-us-item greennature-normal">
                  <div className="about-us-title-wrapper">
                    <div
                      className="language-dropdown"
                      // style={{ marginLeft: "850px" }}
                    >
                      <label htmlFor="language-select">Language:</label>
                      <select
                        id="language-select"
                        onChange={handleLanguageChange}
                        value={selectedLanguage}
                      >
                        <option value="english">English</option>
                        <option value="marathi">Marathi</option>
                      </select>
                    </div>

                    <div className="about-us-title-divider" />
                  </div>
                  <div className="about-us-content-wrapper">
                    <div className="about-us-content greennature-skin-content">
                      {selectedLanguage === "english" && (
                        <>
                          <h1 className="about-us-title">
                            <span className="highlight">
                              Embracing Green Living:{" "}
                            </span>
                            Promoting Health through the 'Plant Trees, Save
                            Trees' Movement
                          </h1>
                          <p>
                            In December 2017, we initiated the 'Plant Trees,
                            Save Trees' movement, embracing the philosophy of
                            "झाडे लावा झाडे जगवा" in response to the prevalent
                            challenges of obesity and fatness in our society.
                            Recognizing the significance of daily physical
                            activity, commonly advised by healthcare
                            professionals, we sought to transform the
                            conventional approach to exercise.
                          </p>
                          <br />
                          <p>
                            While many opt for gym memberships, we questioned
                            the productivity of such endeavors. Instead, we
                            proposed a holistic solution: incorporating nature
                            into our fitness routine. By engaging in activities
                            like planting trees, tending to them with regular
                            watering, soil maintenance, and weed removal, we not
                            only contribute to our own fitness but also make
                            meaningful strides towards a greener planet.
                          </p>
                          <br />
                          <p>
                            Our movement began with early morning walks,
                            fostering a sense of community among participants.
                            Choosing to traverse serene hills rather than
                            navigating flat, polluted roads, we stumbled upon a
                            desolate hill near Narhe, Pune (Maharashtra). This
                            hill, designated as Government (Forest Department's)
                            Land, presented a precious breathing space amidst
                            the encroaching cement jungles.
                          </p>
                          <br />
                          <p>
                            Motivated by our daily visits to the hill, we
                            envisioned a dual-purpose initiative: promoting
                            health and environmental conservation. We proposed a
                            simple yet impactful idea – each participant would
                            adopt a tree as part of our 'A Tree Adoption
                            Scheme.' The concept resonated with our fellow
                            morning walkers, and soon our community grew
                            stronger.
                          </p>
                          <br />
                          <p>
                            To unite enthusiasts passionate about the planting
                            and conservation of trees, we established a
                            dedicated WhatsApp group. Individuals expressing
                            interest in the tree planting concept and sharing
                            their contact numbers were promptly added to this
                            community.
                          </p>
                          <br />
                          <p>
                            The WhatsApp group emerged as a dynamic platform for
                            organizing our tree plantation activities,
                            especially during the monsoon season. Critical
                            updates, including the procurement of plants,
                            scheduling pit-digging activities, and finalizing
                            dates for mega plantation events, were seamlessly
                            communicated among group members through this
                            efficient channel.
                          </p>
                          <br />
                          <br />
                          <h4>
                            <span className="highlight">
                              Initiating the 'झाडे लावा झाडे जगवा' Movement:
                              June 2018
                            </span>
                          </h4>
                          <br />
                          <p>
                            In June 2018, the inaugural tree plantation marked
                            the genesis of the 'झाडे लावा झाडे जगवा' movement.
                            Comprising entirely of volunteers with no designated
                            leaders or paid members, the group was driven by a
                            shared passion for environmental stewardship.
                            Recognizing the poor soil quality on the hill,
                            seasoned members with farming experience ordered red
                            soil and meticulously planted Indian trees, laying
                            the foundation for a comprehensive tree adoption
                            scheme.{" "}
                          </p>
                          <br />
                          <h4>
                            <span className="highlight">
                              Challenges and Triumphs:
                            </span>
                          </h4>
                          <br />
                          <p>
                            Extensive Water Demand in Summer Fulfilled by Local
                            Gram Panchayat: Initially, a single-liter water
                            bottle sufficed for each plant, but as summer
                            approached, the demand for water escalated.
                            Witnessing trees struggle during the hot season
                            prompted a collective effort. The group approached
                            the Narhe Gram Panchayat for assistance,
                            successfully securing water tanks, tools, and water
                            supply through tanker services.
                          </p>
                          <br />
                          <h4>
                            <span className="highlight">
                              Second Mega Plantation Drive: June 2019
                            </span>
                          </h4>
                          <br />
                          <p>
                            The success of the initial plantations fueled a
                            second mega plantation drive in June 2019. The
                            planting area expanded, and the workload increased,
                            with members dedicating 3-4 hours daily to the
                            cause.
                            <br /> Challenges Faced and Overcome:
                          </p>
                          <br />
                          <h4>
                            <span className="highlight">
                              Saving Trees Challenge - 1: Lockdown (Mar 2020)
                            </span>
                          </h4>
                          <br />
                          <p>
                            Overcoming the challenges posed by the lockdown, the
                            group obtained volunteer forest work permissions for
                            selected members, ensuring the continued care of the
                            plantation. Saving Trees Challenge - 2: Summer
                            Season (Dec-June)
                            <br />
                            <br /> Faced with the water demand of 13,000-14,000
                            trees every alternate day during scorching summers,
                            members dedicated daily hours, with extended efforts
                            on weekends and holidays.
                          </p>
                          <br />
                          <h4>
                            <span className="highlight">
                              Saving Trees Challenge - 3: Wildfire (Dec-June){" "}
                            </span>
                          </h4>
                          <br />
                          <p>
                            Vigilant efforts during monsoon and post-monsoon
                            involved removing weeds and controlled grass burning
                            activities to prevent potential wildfires, triggered
                            primarily by human actions like smoking.
                          </p>
                          <br />
                          <h4>
                            <span className="highlight">
                              Saving Trees Challenge - 4: Stray Animals
                              (Jan-Dec){" "}
                            </span>
                          </h4>
                          <br />
                          <p>
                            Addressing the threat posed by stray animals,
                            particularly cattle and buffalo, the group liaised
                            with farmers and, eventually, enlisted the support
                            of a forest department-appointed security guard to
                            safeguard the plantation.
                          </p>
                          <br />
                          <h4>
                            <span className="highlight">
                              Saving Trees Challenge - 5: Need of Funds
                              (Jan-Dec){" "}
                            </span>
                          </h4>
                          <br />
                          <p>
                            The merging of Narhe Gram Panchayat into Pune
                            Municipal limits created logistical gaps in water
                            tanker supply. Group members collectively
                            contributed funds for water tankers, petrol for
                            machines, and other essential expenses.
                            Post-lockdown, facing financial challenges, the
                            decision was made to form an NGO to streamline
                            funding.
                            <br />
                            <br />
                            The 'झाडे लावा झाडे जगवा' movement exemplifies
                            resilience, community engagement, and unwavering
                            dedication to the environment, transforming
                            challenges into opportunities for growth and
                            sustainability.
                          </p>
                          <br />
                          <h4>
                            <span className="highlight">
                              Major Activities Undertaken by the Group:{" "}
                            </span>
                          </h4>
                          <br />

                          <p>
                            Originally formed by morning walkers with a focus on
                            tree plantation through 'A Tree Adoption Scheme,'
                            our active group has evolved into a multifaceted
                            force engaged in various impactful social
                            initiatives:
                          </p>
                          <br />
                          <ol>
                            <li start="1">
                              <h5>
                                <span className="highlight">
                                  Plant Trees, Save Trees:{" "}
                                </span>
                              </h5>

                              <ul>
                                <li>
                                  Conducting numerous tree plantation drives in
                                  collaboration with different groups during
                                  every monsoon.
                                </li>
                                <li>
                                  Overseeing an area of approximately 133 acres,
                                  we have successfully planted and nurtured a
                                  diverse range of trees, including indigenous
                                  (Deshi) species, Ayurvedic plants, fruits, and
                                  flowering plants.{" "}
                                </li>
                                <li>
                                  Our commitment extends beyond mere planting;
                                  we actively care for and safeguard these trees
                                  throughout the year. The total turnaround of
                                  the hill stands as a proud achievement.
                                </li>
                              </ul>
                            </li>
                          </ol>

                          {/* ... other English paragraphs */}
                        </>
                      )}
                      {selectedLanguage === "marathi" && (
                        <>
                          <h3 className="about-us-title">
                            झाडे लावा झाडे जगवा या चळवळी या संकल्पनेचा उदय
                            (डिसेंबर २०१७)
                          </h3>
                          <p>
                            आजकाल बहुतांश लोकसंख्येला लठ्ठपणा / स्थूलपणाची
                            समस्या भेडसावत आहे. डॉक्टर सहसा दररोज ४५ मिनिटे
                            चालण्याचा सल्ला देतात.
                          </p>
                          <p>
                            डिसेंबर 2017 मध्ये, आपल्याकडून 'झाडे लावा झाडे जगवा'
                            चे आरंभ केले, ज्याने आपल्या समाजातील सामान्य
                            दुखांच्या आणि ओजबिलदारीच्या आणि ओजबिलदारीच्या
                            समस्यांच्या सामना करण्यासाठी "झाडे लावा झाडे जगवा"
                            ची दारुण कामांची सुरुवात केली.
                          </p>
                          <p>
                            दैनंदिन शारीरिक हालचालींचे महत्त्व ओळखून, सामान्यत:
                            आरोग्यसेवा व्यावसायिकांद्वारे सल्ला दिला जातो, आम्ही
                            व्यायामासाठी पारंपारिक दृष्टिकोन बदलण्याचा प्रयत्न
                            केला. अनेकांनी जिम सदस्यत्वाची निवड केली असताना,
                            आम्ही प्रश्न केला अशा प्रयत्नांची उत्पादकता.
                            त्याऐवजी, आम्ही प्रस्तावित केले समग्र समाधान: आमच्या
                            फिटनेस दिनचर्यामध्ये निसर्गाचा समावेश करणे.
                          </p>
                          <p>
                            झाडे लावणे, त्यांना नियमित पाणी देणे, मातीची देखभाल
                            करणे आणि तण काढून टाकणे यासारख्या क्रियाकलापांमध्ये
                            गुंतून, आम्ही केवळ आमच्या स्वतःच्या तंदुरुस्तीमध्ये
                            योगदान देत नाही तर हिरवागार ग्रहाकडे अर्थपूर्ण
                            वाटचाल देखील करतो.
                          </p>
                          <p>
                            आमच्या चळवळीची सुरुवात मॉर्निंग वॉकने झाली, ज्याने
                            सहभागींमध्ये समुदायाची भावना वाढवली. सपाट, प्रदूषित
                            रस्त्यांवर नेव्हिगेट करण्यापेक्षा शांत टेकड्यांवरून
                            जाण्याचे निवडत, आम्ही नर्हे, पुणे (महाराष्ट्र) जवळील
                            एका निर्जन टेकडीवर अडखळलो. सरकारी (वनविभागाची) जमीन
                            म्हणून नेमलेल्या या टेकडीने अतिक्रमण केलेल्या
                            सिमेंटच्या जंगलांमध्ये श्वास घेण्याची मौल्यवान जागा
                            आहे.
                          </p>
                          टेकडीवर आमच्या दैनंदिन भेटींनी प्रेरित होऊन, आम्ही
                          दुहेरी हेतू असलेल्या उपक्रमाची कल्पना केली: आरोग्य आणि
                          पर्यावरण संवर्धनाला प्रोत्साहन देणे. आम्ही एक साधी पण
                          प्रभावी कल्पना मांडली - प्रत्येक सहभागी आमच्या 'एक झाड
                          दत्तक योजने'चा भाग म्हणून एक झाड दत्तक घेईल. ही
                          संकल्पना आमच्या मॉर्निंग वॉकर्सच्या सहवासात रुजली आणि
                          लवकरच आमचा समुदाय मजबूत झाला. वृक्षारोपण आणि
                          संवर्धनाची आवड असलेल्या उत्साही लोकांना एकत्र
                          करण्यासाठी, आम्ही एक समर्पित WhatsApp गट स्थापन केला
                          आहे. वृक्ष लागवड संकल्पनेत स्वारस्य व्यक्त करणाऱ्या
                          आणि त्यांचे संपर्क क्रमांक शेअर करणाऱ्या व्यक्तींना या
                          समुदायात तातडीने जोडण्यात आले. विशेषत: पावसाळ्यात
                          वृक्षारोपण उपक्रमांचे आयोजन करण्यासाठी व्हॉट्सॲप ग्रुप
                          एक डायनॅमिक प्लॅटफॉर्म म्हणून उदयास आला आहे.
                          वनस्पतींची खरेदी, खड्डा खोदण्याच्या क्रियाकलापांचे
                          वेळापत्रक आणि मेगा वृक्षारोपण कार्यक्रमांच्या तारखा
                          अंतिम करणे यासह गंभीर अद्यतने या कार्यक्षम चॅनेलद्वारे
                          गट सदस्यांमध्ये अखंडपणे संप्रेषित केली गेली.
                          <h4>
                            <span className="highlight">
                              'झाडे लावा झाडे जगवा' चळवळ सुरू करणे: जून 2018
                            </span>
                          </h4>
                          <p>
                            जून 2018 मध्ये, उद्घाटन वृक्षारोपणाने 'झाडे लावा
                            झाडे जगवा' चळवळीची उत्पत्ती चिन्हांकित केली. कोणतेही
                            नियुक्त नेते किंवा सशुल्क सदस्य नसलेले संपूर्णपणे
                            स्वयंसेवकांचा समावेश असलेला, हा गट पर्यावरणीय
                            कारभारीपणाच्या सामायिक उत्कटतेने प्रेरित होता.
                            टेकडीवरील मातीची खराब गुणवत्ता ओळखून, शेतीचा अनुभव
                            असलेल्या अनुभवी सदस्यांनी लाल मातीची मागणी केली आणि
                            सर्वसमावेशक वृक्ष दत्तक योजनेची पायाभरणी करून
                            काळजीपूर्वक भारतीय झाडे लावली.
                          </p>
                          <h4>
                            <span className="highlight">आव्हाने आणि विजय:</span>
                          </h4>
                          <p>
                            उन्हाळ्यात पाण्याची मोठी मागणी स्थानिक
                            ग्रामपंचायतीने पूर्ण केली: सुरुवातीला, प्रत्येक
                            रोपासाठी एक लिटर पाण्याची बाटली पुरेशी होती, परंतु
                            जसजसा उन्हाळा जवळ येऊ लागला तसतशी पाण्याची मागणी
                            वाढू लागली. उष्ण ऋतूत झाडांचा संघर्ष पाहिल्याने
                            सामूहिक प्रयत्न करण्यास प्रवृत्त केले. या गटाने
                            मदतीसाठी नर्हे ग्रामपंचायतीकडे संपर्क साधला,
                            पाण्याच्या टाक्या, साधने आणि टँकर सेवेद्वारे
                            पाणीपुरवठा यशस्वीरित्या सुरक्षित केला.
                          </p>
                          <h4>
                            <span className="highlight">
                              दुसरी मेगा वृक्षारोपण मोहीम: जून 2019
                            </span>
                          </h4>
                          <p>
                            सुरुवातीच्या वृक्षारोपणाच्या यशामुळे जून 2019 मध्ये
                            दुसऱ्या मोठ्या वृक्षारोपण मोहिमेला चालना मिळाली.
                            लागवड क्षेत्र विस्तारले आणि कामाचा ताण वाढला, सदस्य
                            दररोज 3-4 तास कारणासाठी समर्पित करतात. आव्हाने आणि
                            मात:
                          </p>
                        </>
                      )}
                    </div>
                    {/* <a className="about-us-read-more greennature-button" href="/">Read More</a> */}
                  </div>
                  <div className="clear" />
                </div>
              </div>
              <div className="clear" />
            </section>

            <section id="content-section-3">
              <div
                className="greennature-color-wrapper  gdlr-show-all no-skin"
                style={{
                  backgroundColor: "#f0f0f0",
                  paddingTop: 50,
                  paddingBottom: 25,
                }}
              >
                <div className="container">
                  <div className="four columns">
                    <div className="greennature-ux column-service-ux">
                      <div className="greennature-item greennature-column-service-item greennature-type-1-caption">
                        <div className="column-service-image">
                          <img src={icon6} alt="" width={80} height={80} />
                        </div>
                        <div className="column-service-content-wrapper">
                          <h3 className="column-service-title">
                            Tree Plantation Initiatives
                          </h3>
                          <div className="column-service-caption greennature-skin-info">
                            Environmental Conservation
                          </div>
                          <div className="column-service-content greennature-skin-content">
                            <p>
                              Join us in our efforts to promote environmental
                              sustainability through tree plantation
                              initiatives. We believe in the power of trees to
                              contribute to a healthier planet. Help us make a
                              positive impact on the environment and communities
                              around us.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Remove the other columns or replace them with additional content */}
                  <div className="four columns">
                    <div className="greennature-ux column-service-ux">
                      <div className="greennature-item greennature-column-service-item greennature-type-1-caption">
                        <div className="column-service-image">
                          <img src={icon5} alt="" width={80} height={80} />
                        </div>
                        <div className="column-service-content-wrapper">
                          <h3 className="column-service-title">
                            Biodiversity Conservation
                          </h3>
                          <div className="column-service-caption greennature-skin-info">
                            Protecting Ecosystems
                          </div>
                          <div className="column-service-content greennature-skin-content">
                            <p>
                              Tree plantation plays a crucial role in preserving
                              biodiversity. By planting a diverse range of
                              trees, we contribute to the protection of
                              ecosystems and provide habitats for various
                              species. Join us in safeguarding the rich
                              biodiversity of our planet.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="four columns">
                    <div className="greennature-ux column-service-ux">
                      <div className="greennature-item greennature-column-service-item greennature-type-1-caption">
                        <div className="column-service-image">
                          <img src={icon7} alt="" width={80} height={80} />
                        </div>
                        <div className="column-service-content-wrapper">
                          <h3 className="column-service-title">
                            Air Quality Improvement
                          </h3>
                          <div className="column-service-caption greennature-skin-info">
                            Purifying the Air
                          </div>
                          <div className="column-service-content greennature-skin-content">
                            <p>
                              Trees act as natural air purifiers by absorbing
                              pollutants and releasing oxygen. Our tree
                              plantation initiatives aim to improve air quality,
                              creating a healthier environment for everyone.
                              Join us in breathing cleaner air through the power
                              of trees.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clear" />
            </section>

            <section id="content-section-4">
              <div
                className="greennature-color-wrapper   "
                style={{ backgroundColor: "#ffffff" }}
              >
                <div className="container">
                  <div
                    className="greennature-title-item"
                    style={{ marginBottom: 40 }}
                  >
                    <div className="greennature-item-title-wrapper greennature-item  greennature-left-divider greennature-medium ">
                      <div className="greennature-item-title-container container">
                        <div className="greennature-item-title-head">
                          <h3 className="greennature-item-title greennature-skin-title greennature-skin-border">
                            Meet The Team
                          </h3>
                          <div className="clear" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clear" />
                  <div className="greennature-personnel-item-wrapper">
                    <div className="clear" />
                    <div className="four columns">
                      <div className="greennature-item greennature-personnel-item greennature-left plain-style">
                        <div className="greennature-ux greennature-personnel-ux">
                          <div className="personnel-item">
                            <div className="personnel-author-image greennature-skin-border">
                              <img
                                src={personnel1}
                                alt=""
                                width={500}
                                height={297}
                              />
                            </div>
                            <div className="personnel-info">
                              <div className="personnel-author greennature-skin-title">
                                Pravin Bhosle
                              </div>
                              <div className="personnel-position greennature-skin-info">
                                Founder Member
                              </div>
                            </div>
                            <div className="personnel-content greennature-skin-content">
                              <p>
                                Pravin Bhosle, a distinguished leader in the
                                finance domain, is the visionary founder of a
                                prominent non-profit organization (NGO). As a
                                dynamic leader, he has spearheaded initiatives
                                to plant trees and actively engages in tree
                                conservation activities. Beyond the boardroom,
                                Pravin is known for his hands-on involvement in
                                nature-related projects, demonstrating a passion
                                for sustainable practices and ecological
                                well-being. His visionary approach not only
                                shapes the financial landscape but also leaves
                                an enduring impact on environmental causes,
                                showcasing a holistic commitment to both
                                professional success and ecological
                                responsibility
                              </p>
                            </div>
                            <div className="personnel-social">
                              <a
                                href="https://www.instagram.com/"
                                target="_blank"
                              >
                                <i
                                  className="greennature-icon fa fa-instagram"
                                  style={{
                                    verticalAlign: "middle",
                                    color: "#999999",
                                    fontSize: 19,
                                  }}
                                />
                              </a>{" "}
                              <a href="http://facebook.com/" target="_blank">
                                <i
                                  className="greennature-icon fa fa-facebook"
                                  style={{
                                    verticalAlign: "middle",
                                    color: "#999999",
                                    fontSize: 19,
                                  }}
                                />
                              </a>{" "}
                              <a href="http://twitter.com/" target="_blank">
                                <i
                                  className="greennature-icon fa fa-twitter"
                                  style={{
                                    verticalAlign: "middle",
                                    color: "#999999",
                                    fontSize: 19,
                                  }}
                                />
                              </a>{" "}
                              <a href="http://linkedin.com/" target="_blank">
                                <i
                                  className="greennature-icon fa fa-linkedin"
                                  style={{
                                    verticalAlign: "middle",
                                    color: "#999999",
                                    fontSize: 19,
                                  }}
                                />
                              </a>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="four columns">
                      <div className="greennature-item greennature-personnel-item greennature-left plain-style">
                        <div className="greennature-ux greennature-personnel-ux">
                          <div className="personnel-item">
                            <div className="personnel-author-image greennature-skin-border">
                              <img
                                src={personnel2}
                                alt=""
                                width={500}
                                height={297}
                              />
                            </div>
                            <div className="personnel-info">
                              <div className="personnel-author greennature-skin-title">
                                Ajit Poman
                              </div>
                              <div className="personnel-position greennature-skin-info">
                                President
                              </div>
                            </div>
                            <div className="personnel-content greennature-skin-content">
                              <p>
                                Ajit Poman, the esteemed President of a
                                distinguished non-profit organization (NGO), is
                                a seasoned professional in the realm of
                                engineering tools, particularly specializing in
                                CNC technology. Alongside his accomplished
                                career, Ajit and his wife stand out as a
                                hardworking and devoted duo in the field of tree
                                conservation. Their shared commitment is evident
                                through hands-on efforts and a prioritization of
                                initiatives aimed at preserving and nurturing
                                trees. Together with his wife, he exemplifies
                                the importance of personal dedication in
                                fostering a harmonious balance between
                                professional success and ecological
                                responsibility
                              </p>
                            </div>
                            <div className="personnel-social">
                              <a
                                href="https://www.instagram.com/"
                                target="_blank"
                              >
                                <i
                                  className="greennature-icon fa fa-instagram"
                                  style={{
                                    verticalAlign: "middle",
                                    color: "#999999",
                                    fontSize: 19,
                                  }}
                                />
                              </a>{" "}
                              <a href="http://facebook.com/" target="_blank">
                                <i
                                  className="greennature-icon fa fa-facebook"
                                  style={{
                                    verticalAlign: "middle",
                                    color: "#999999",
                                    fontSize: 19,
                                  }}
                                />
                              </a>{" "}
                              <a href="http://twitter.com/" target="_blank">
                                <i
                                  className="greennature-icon fa fa-twitter"
                                  style={{
                                    verticalAlign: "middle",
                                    color: "#999999",
                                    fontSize: 19,
                                  }}
                                />
                              </a>{" "}
                              <a href="http://linkedin.com/" target="_blank">
                                <i
                                  className="greennature-icon fa fa-linkedin"
                                  style={{
                                    verticalAlign: "middle",
                                    color: "#999999",
                                    fontSize: 19,
                                  }}
                                />
                              </a>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="four columns">
                      <div className="greennature-item greennature-personnel-item greennature-left plain-style">
                        <div className="greennature-ux greennature-personnel-ux">
                          <div className="personnel-item">
                            <div className="personnel-author-image greennature-skin-border">
                              <img
                                src={personnel3}
                                alt=""
                                width={500}
                                height={297}
                              />
                            </div>
                            <div className="personnel-info">
                              <div className="personnel-author greennature-skin-title">
                                Rajendra Khatape
                              </div>
                              <div className="personnel-position greennature-skin-info">
                                Vice President
                              </div>
                            </div>
                            <div className="personnel-content greennature-skin-content">
                              <p>
                                Rajendra Khatape, serving as the Vice President
                                of a distinguished non-profit organization
                                (NGO), is a seasoned professional in the field
                                of electronics engineering, holding a key
                                position as a director. Known for his expertise
                                in the realm of technology, Rajendra and his
                                wife are also recognized for their tireless
                                dedication to tree conservation. Together, they
                                embody a hardworking ethos, actively engaging in
                                initiatives aimed at the well-being of trees.
                                Their shared commitment prioritizes the
                                importance of environmental sustainability,
                                showcasing a passionate dedication to preserving
                                and nurturing trees for a greener future
                              </p>
                            </div>
                            <div className="personnel-social">
                              <a
                                href="https://www.instagram.com/"
                                target="_blank"
                              >
                                <i
                                  className="greennature-icon fa fa-instagram"
                                  style={{
                                    verticalAlign: "middle",
                                    color: "#999999",
                                    fontSize: 19,
                                  }}
                                />
                              </a>{" "}
                              <a href="http://facebook.com/" target="_blank">
                                <i
                                  className="greennature-icon fa fa-facebook"
                                  style={{
                                    verticalAlign: "middle",
                                    color: "#999999",
                                    fontSize: 19,
                                  }}
                                />
                              </a>{" "}
                              <a href="http://twitter.com/" target="_blank">
                                <i
                                  className="greennature-icon fa fa-twitter"
                                  style={{
                                    verticalAlign: "middle",
                                    color: "#999999",
                                    fontSize: 19,
                                  }}
                                />
                              </a>{" "}
                              <a href="http://linkedin.com/" target="_blank">
                                <i
                                  className="greennature-icon fa fa-linkedin"
                                  style={{
                                    verticalAlign: "middle",
                                    color: "#999999",
                                    fontSize: 19,
                                  }}
                                />
                              </a>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="clear" />
                    <div className="four columns">
                      <div className="greennature-item greennature-personnel-item greennature-left plain-style">
                        <div className="greennature-ux greennature-personnel-ux">
                          <div className="personnel-item">
                            <div className="personnel-author-image greennature-skin-border" />
                            <div className="personnel-info" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="clear" />
                  </div>
                  <div className="clear" />
                  <div className="clear" />
                </div>
              </div>
              <div className="clear" />
            </section>
            <section id="content-section-5">
              <div
                className="greennature-parallax-wrapper greennature-background-image gdlr-show-all greennature-skin-dark-skin"
                id="greennature-parallax-wrapper-2"
                data-bgspeed="0.1"
                style={{
                  backgroundImage: `url(${servicebg})`,
                  paddingTop: 125,
                  paddingBottom: 90,
                }}
              >
                <div className="container">
                  <div className="greennature-stunning-item-ux greennature-ux">
                    <div className="greennature-item greennature-stunning-item greennature-stunning-center">
                      <h2 className="stunning-item-title">
                        The only way to make this happened is to take action!
                      </h2>
                      <div className="stunning-item-caption greennature-skin-content">
                        <p>
                          Praesent commodo cursus magna, vel scelerisque nislet.
                        </p>
                      </div>
                      <a
                        className="stunning-item-button greennature-button large greennature-lb-payment"
                        href="/donateform"
                        style={{ backgroundColor: "#fec428", color: "#ffffff" }}
                      >
                        Donate Now!
                      </a>
                      <a
                        className="stunning-item-button greennature-button large"
                        href="/actnow"
                      >
                        Act Now!
                      </a>
                    </div>
                  </div>
                  <div className="clear" />
                  <div className="clear" />
                </div>
              </div>
              <div className="clear" />
            </section>
            <section id="content-section-6">
              <div
                className="greennature-color-wrapper  gdlr-show-all no-skin"
                style={{
                  backgroundColor: "#262626",
                  paddingTop: 50,
                  paddingBottom: 40,
                }}
              >
                <div className="container">
                  {numbers.map((numbers, index) => (
                    <div className="three columns" key={index}>
                      <div className="greennature-skill-item-wrapper greennature-skin-content greennature-item greennature-style-2">
                        {index === 0 && (
                          <img src={icon4} alt="" width={80} height={80} />
                        )}
                        {index === 1 && (
                          <img src={icon5} alt="" width={80} height={80} />
                        )}
                        {index === 2 && (
                          <img src={icon1} alt="" width={80} height={80} />
                        )}
                        {index === 3 && (
                          <img src={icon2} alt="" width={80} height={80} />
                        )}

                        <div
                          className="greennature-skill-item-title"
                          style={{ color: "#5dc269" }}
                        >
                          {numbers.value}
                          {index === 2 && "%"}
                        </div>
                        <div
                          className="greennature-skill-item-caption"
                          style={{ color: "#ffffff" }}
                        >
                          {numbers.type}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* <div className="three columns">
                    <div className="greennature-skill-item-wrapper greennature-skin-content greennature-item greennature-style-2">
                      <div
                        className="greennature-skill-item-title"
                        style={{ color: "#5dc269" }}
                      >
                        {secondNumber}
                      </div>
                      <div
                        className="greennature-skill-item-caption"
                        style={{ color: "#ffffff" }}
                      >
                        Voluntears
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="three columns">
                    <div className="greennature-skill-item-wrapper greennature-skin-content greennature-item greennature-style-2">
                      <div
                        className="greennature-skill-item-title"
                        style={{ color: "#5dc269" }}
                      >
                        {thirdNumber}
                      </div>
                      <div
                        className="greennature-skill-item-caption"
                        style={{ color: "#ffffff" }}
                      >
                        Recycling
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="three columns">
                    <div className="greennature-skill-item-wrapper greennature-skin-content greennature-item greennature-style-2">
                      <div
                        className="greennature-skill-item-title"
                        style={{ color: "#5dc269" }}
                      >
                        {fourthNumber}
                      </div>
                      <div
                        className="greennature-skill-item-caption"
                        style={{ color: "#ffffff" }}
                      >
                        No. of Hours
                      </div>
                    </div>
                  </div> */}
                  <div className="clear" />
                </div>
              </div>
              <div className="clear" />
            </section>
          </div>
          {/* Below Sidebar Section*/}
        </div>
        {/* greennature-content */}
        <div className="clear" />
      </div>
      {/* content wrapper */}
<SimpleChatbot />
      <Footer />
    </>
  );
}

export default About;
