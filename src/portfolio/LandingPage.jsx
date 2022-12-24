import React, { Fragment, useMemo, useState } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import artApiService from "../services/artApiService";
import myStrings from "../myStrings";
import "./landingPage.css";
<script src="http://localhost:8097"></script>;

function LandingPage() {
  const [backgroundInfo, setBackgroundInfo] = useState();
  const [imageInfo, setImageInfo] = useState();
  const [imageArray, setImageArray] = useState();

  const onSearchObjectsWin = (response) => {
    console.log("!", response.objectIDs);
    filterForImages(response.objectIDs, 20);
  };

  const getRandomObject = (objectIds) => {
    var randomId = [];
    randomId = objectIds[Math.floor(Math.random() * objectIds.length)];
    return randomId;
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
    const outputArray = objects.filter((object) => object.primaryImage);
    console.log(outputArray);
    setImageArray(outputArray);
    setImageInfo(getRandomObject(outputArray));
    setBackgroundInfo(() => {
      return {
        backgroundImage: `url("${outputArray[0].primaryImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        minWidth: "100%",
      };
      // NOTE: This might be refactored to use a special img class so that I can
      // potentially impliment image scroll w/ mouse  https://tinyurl.com/4hcsmfn4
    });
    return outputArray;
  };

  const changeArt = () => {
    const newId = getRandomObject(imageArray);
    console.log("what", newId);
    setBackgroundInfo((prevState) => {
      const newState = { ...prevState };
      newState.backgroundImage = `url(${newId.primaryImage})`;
      return newState;
    });
    setImageInfo(newId);
  };

  useMemo(() => {
    artApiService.searchObjects("Nature").then(onSearchObjectsWin);
  }, []);
  // margins will be set based on Widith

  return (
    <Fragment>
      <Container
        className="d-flex w-100 container text-white"
        style={backgroundInfo}
      >
        <Row className="m-2 w-100 align-items-stretch">
          <Col className="justify-content-between d-flex flex-column w-100">
            <div
              className="d-flex justify-content-start"
              style={{ marginTop: "15vh", marginLeft: "14vw" }}
            >
              <Card className="landing-card p-4">
                <Card.Body className="" onClick={changeArt}>
                  <h1 className="display-3">Michael Prewitt</h1>
                </Card.Body>
              </Card>
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
                      <h4>Links for you</h4>
                    </Card.Body>
                  </Card>
                  {/* TODO: These will be componentized cards that switch out */}
                  <Col className="d-flex flex-wrap justify-content-center">
                    <Card className="landing-card landing-small-tile">
                      <Card.Body>Email</Card.Body>
                    </Card>
                    <Card className="landing-card landing-small-tile">
                      <Card.Body>Resume</Card.Body>
                    </Card>
                    <Card className="landing-card landing-small-tile">
                      <Card.Body>GitHub</Card.Body>
                    </Card>
                    <Card className="landing-card landing-small-tile">
                      <Card.Body>Linkedin</Card.Body>
                    </Card>
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
