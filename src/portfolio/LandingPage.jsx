import React, { Fragment, lazy, Suspense, useMemo, useState } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { AnimatePresence } from "framer-motion";
import myStrings from "../myStrings";
import "./landingPage.css";
import ContactModal from "./Modals/ContactModal";
import LandingInfo from "./assets/LandingInfo";
import InitialAnimation from "./assets/InitalAnimation";

// TODO:  Cards need to be refactored so that they can be reused,
// then the "show modal" needs to be refactored to use switch case logic to determine who should be showing

function LandingPage(props) {
  const [imageArray, setImageArray] = useState();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageInfo, setImageInfo] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAniVisible, setIsAniVisible] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState();

  const BackgroundImg = lazy(() => import("./assets/BackgroundImg"));

  const handleLinks = (e) => {
    console.log(e.target);
    switch (e.target.id) {
      case "linkedin":
        window.location.href = myStrings.linkedin;
        break;
      case "github":
        window.location.href = myStrings.github;
        break;
      default:
        break;
    }
  };

  const getRandomObject = (objectArray) => {
    const randomDigit = Math.floor(Math.random() * objectArray.length);
    if (randomDigit === currentImageIndex) {
      return getRandomObject(objectArray);
    } else {
      const randomObj = objectArray[randomDigit];
      setCurrentImageIndex(randomDigit);
      return randomObj;
    }
  };

  const changeArt = () => {
    const newObject = getRandomObject(imageArray);
    console.log("ChangedArt", newObject);
    setImageInfo(newObject);
    setBackgroundImage(newObject.primaryImage);
  };

  const checkModal = (e) => {
    console.log("!_!", props);
    setShowModal(!showModal);
  };

  useMemo(() => {
    if (window.innerWidth < 760) {
      setIsMobile(true);
    }
  }, []);

  return (
    <Fragment>
      <Suspense fallback={<h1>HELLO</h1>}>
        <Container fluid={true} className="text-white m-0 p-0 d-flex">
          <AnimatePresence>
            {isAniVisible && <InitialAnimation isAniVisible={isAniVisible} />}
          </AnimatePresence>
          <BackgroundImg
            getRandomObject={getRandomObject}
            setImageInfo={setImageInfo}
            setImageArray={setImageArray}
            setIsAniVisible={setIsAniVisible}
            backgroundImage={backgroundImage}
            setBackgroundImage={setBackgroundImage}
          />
          <Row className=" d-flex w-100">
            <Col className="d-flex justify-content-between m-1 flex-column col-12">
              <div className="d-flex-inline mx-5" style={{ marginTop: "15vh" }}>
                {isMobile ? (
                  <Fragment>
                    <div className="d-flex justify-content-center">
                      <Card
                        className="landing-card landing-small-tile"
                        onClick={handleLinks}
                      >
                        <Card.Body id={"github"}>GitHub</Card.Body>
                      </Card>
                      <Card
                        className="landing-card landing-small-tile"
                        onClick={handleLinks}
                      >
                        <Card.Body id={"linkedin"}>Linkdin</Card.Body>
                      </Card>
                    </div>
                  </Fragment>
                ) : (
                  <LandingInfo />
                )}
              </div>
              <div
                className="d-flex align-content-baseline justify-content-center"
                onClick={changeArt}
              >
                <Card className="landing-card my-2 p-1">
                  <Card.Body>
                    <h5>Title: {imageInfo?.title}</h5>
                    <h5>Artist Name: {imageInfo?.artistDisplayName}</h5>
                    <h5>Year: {imageInfo?.objectDate} </h5>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </Suspense>
    </Fragment>
  );
}

export default LandingPage;
