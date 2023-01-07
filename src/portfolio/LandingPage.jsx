import React, { Fragment, lazy, Suspense, useMemo, useState } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { AnimatePresence } from "framer-motion";
import myStrings from "../myStrings";
import "./landingPage.css";
import ContactModal from "./Modals/ContactModal";
import LandingPitch from "./assets/LandingPitch";
import InitialAnimation from "./assets/InitalAnimation";

// TODO:  Cards need to be refactored so that they can be reused,
// then the "show modal" needs to be refactored to use switch case logic to determine who should be showing
// * REMEMBER TO USE NAME INSTEAD OF SPINNING CIRCLE TO LOAD PHOTOS, AFTER PHOTOS LOAD, THEN DISPLAY PHOTOS, DROP NAME,
// * DISPLAY IMAGE NAME ON BOTTOM ROW AND DISPLAY MORE INFO ON TOP ROW

function LandingPage(props) {
  const [imageArray, setImageArray] = useState();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageInfo, setImageInfo] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // GET RID OF ALL THE CARDS, ADD HTML TO TEXT

  return (
    <Fragment>
      <AnimatePresence>
        <InitialAnimation />
      </AnimatePresence>
      <Suspense fallback={<h1>HELLO</h1>}>
        <Container className="d-flex text-white m-0 p-0">
          <BackgroundImg
            getRandomObject={getRandomObject}
            setImageInfo={setImageInfo}
            setImageArray={setImageArray}
          />
          <Row className="w-100">
            <Col className="d-flex justify-content-between m-0 h-100 flex-column col-12">
              <div className="d-flex-inline m-4 justify-content-start">
                {isMobile ? (
                  <Fragment>
                    <Card className="landing-card p-2">
                      <Card.Body className="" onClick={changeArt}>
                        <h1 className="text-center display-3">
                          Michael Prewitt
                        </h1>
                      </Card.Body>
                    </Card>
                    <div className="d-flex">
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
                  <LandingPitch />
                )}
              </div>
              <div className="d-flex m-4 align-content-baseline">
                <Card className="landing-card my-4 p-1">
                  <Card.Body>
                    <h5>Title: {imageInfo?.title}</h5>
                    <h5>Artist Name: {imageInfo?.artistDisplayName}</h5>
                    <h5>Year: {imageInfo?.objectDate} </h5>
                    <h5>Thank you to the Met for providing the art API.</h5>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
          {!isMobile && (
            <Row className="w-100">
              <Col className="d-flex justify-content-start m-3 h-100 flex-column col-12"></Col>
            </Row>
          )}
        </Container>
      </Suspense>
    </Fragment>
  );
}

export default LandingPage;
