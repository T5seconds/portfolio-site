import React, { Fragment, useMemo, useState } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import artApiService from "../services/artApiService";
import myStrings from "../myStrings";
import "./landingPage.css";
import ContactModal from "./ContactModal";

//REVIEW:  Cards need to be refactored so that they can be reused,
// then the "show modal" needs to be refactored to use switch case logic to determine who should be showing

function LandingPage() {
  const [backgroundInfo, setBackgroundInfo] = useState({
    backgroundImage: "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100%",
    minWidth: "100%",
  });
  const [imageInfo, setImageInfo] = useState();
  const [imageArray, setImageArray] = useState();
  const [currentDigit, setCurrentDigit] = useState();
  const [showModal, setShowModal] = useState(false);

  const onSearchObjectsWin = (response) => {
    console.log("Raw Ids", response.objectIDs);
    filterForImages(response.objectIDs, 8);
    // Not scalable. More than ten gets slow. Investigate more efficent filltering method, be mildly irritated.
  };

  const getRandomObject = (objectArray) => {
    const randomDigit = Math.floor(Math.random() * objectArray.length);
    if (randomDigit === currentDigit) {
      return getRandomObject(objectArray);
    } else {
      const randomObj = objectArray[randomDigit];
      setCurrentDigit(randomDigit);
      return randomObj;
    }
  };

  const filterForImages = async (objectIds, outputArraySize) => {
    const promises = [];
    for (let i = 0; i < outputArraySize; i++) {
      promises.push(
        artApiService.getObject(getRandomObject(objectIds)).then((response) => {
          return response;
        })
      );
    }
    const objects = await Promise.all(promises);
    const outputArray = objects?.filter((object) => object.primaryImage);
    console.log("Output array", outputArray);
    const firstImage = getRandomObject(outputArray);
    setBackgroundInfo((prevState) => {
      const newState = { ...prevState };
      newState.backgroundImage = `url(${firstImage.primaryImage})`;
      return newState;
    });
    setImageInfo(firstImage);
    setImageArray(outputArray);

    // NOTE: This might be refactored to use a special img class so that I can
    // potentially impliment image scroll w/ mouse  https://tinyurl.com/4hcsmfn4

    return outputArray;
  };

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

  const changeArt = () => {
    const newObject = getRandomObject(imageArray);
    console.log("ChangedArt", newObject);
    setBackgroundInfo((prevState) => {
      const newState = { ...prevState };
      newState.backgroundImage = `url(${newObject.primaryImage})`;
      return newState;
    });
    setImageInfo(newObject);
  };

  const checkModal = (e) => {
    console.log("!_!", showModal);
    setShowModal(!showModal);
  };

  useMemo(() => {
    artApiService.searchObjects("Nature").then(onSearchObjectsWin);
  }, []);

  return (
    <Fragment>
      <Container
        className="d-flex w-100 container text-white"
        style={backgroundInfo}
      >
        <Row className="m-2 w-100 align-items-stretch">
          <Col className="justify-content-between d-flex flex-column w-100">
            <div
              className="d-flex-inline justify-content-start"
              style={{ marginTop: "15vh", marginLeft: "14vw" }}
            >
              <Card className="landing-card p-4">
                <Card.Body className="" onClick={changeArt}>
                  <h1 className="text-center display-3">Michael Prewitt</h1>
                </Card.Body>
              </Card>
              {window.innerWidth < 760 && (
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
              )}
            </div>
            <div
              className="d-flex align-content-baseline"
              style={{ marginBottom: "6vh", marginLeft: "8vw" }}
            >
              <Card className="landing-card p-1">
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
        {window.innerWidth > 760 && (
          <Row className="m-2 w-100 align-items-stretch">
            <Col className="justify-content-between d-flex flex-column w-100">
              <div
                className="d-flex align-content-baseline"
                style={{ marginTop: "15vh", marginLeft: "15vw" }}
              >
                <Card className="landing-card p-2 w-75">
                  <Card.Body>
                    <h4>{myStrings.landingPitch}</h4>
                  </Card.Body>
                </Card>
              </div>
              <div
                className="d-flex align-content-baseline"
                style={{ marginBottom: "20vh", marginLeft: "16vw" }}
              >
                <div className="d-flex-inline text-center w-75">
                  <Card className="landing-card m-1 p-1">
                    <Card.Body>
                      <h4>More details</h4>
                    </Card.Body>
                  </Card>
                  {/* TODO: These will be componentized cards that switch out */}
                  <Col className="d-flex flex-wrap justify-content-center">
                    <Card
                      className="landing-card landing-small-tile"
                      onClick={handleLinks}
                    >
                      <Card.Body id="linkedin">Linkdin</Card.Body>
                    </Card>
                    <Card
                      className="landing-card landing-small-tile"
                      onClick={handleLinks}
                    >
                      <Card.Body id="github">GitHub</Card.Body>
                    </Card>
                    <Card
                      className="landing-card landing-small-tile"
                      id="email"
                      onClick={handleLinks}
                    >
                      <Card.Body id="email" onClick={checkModal}>
                        Contact Info
                      </Card.Body>
                    </Card>
                    {showModal && (
                      <ContactModal
                        showModal={showModal}
                        checkModal={checkModal}
                      />
                    )}
                  </Col>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </Fragment>
  );
}

export default LandingPage;
