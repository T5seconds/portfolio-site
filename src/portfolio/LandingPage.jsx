import React, { Fragment, useMemo, useState } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import artApiService from "../services/artApiService";
import myStrings from "../myStrings";
import "./landingPage.css";

function LandingPage() {
  const [backgroundInfo, setBackgroundInfo] = useState();
  // NOTE: This is ugly and dumb
  const [imageInfo, setImageInfo] = useState();

  const onSearchObjectsWin = (response) => {
    getRandomObject(response.objectIDs);
  };
  const getRandomObject = (objectIds) => {
    const test = objectIds[Math.floor(Math.random() * objectIds.length)];
    artApiService.getObject(test).then(onGetObjectWin).catch(onGetObjectLose);
  };
  const onGetObjectWin = (response) => {
    setImageInfo(response);
    var image = "";
    if (response.primaryImage) {
      image = response.primaryImage;
    } else {
      image = "https://images.metmuseum.org/CRDImages/rl/original/DT718.jpg";
      // NOTE: not even really a bandaid
    }
    setBackgroundInfo(() => {
      return {
        backgroundImage: `url("${image}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        minWidth: "100%",
        width: "100%",
      };
      // NOTE: This might be refactored to use a special img class so that I can
      // potentially impliment image scroll w/ mouse  https://tinyurl.com/4hcsmfn4
    });
  };
  const onGetObjectLose = (response) => {
    console.warn(response);
  };

  const changeArt = () => {
    artApiService.searchObjects("Nature").then(onSearchObjectsWin);
  };

  useMemo(() => {
    artApiService.searchObjects("Nature").then(onSearchObjectsWin);
  }, []);

  //TODO: Cards should be refactored to use the golden ratio
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
              style={{ marginTop: "10vh", marginLeft: "12vw" }}
            >
              <Card className="landing-card p-4">
                <Card.Body className="" onClick={changeArt}>
                  <h1 className="display-3">Michael Prewitt</h1>
                </Card.Body>
              </Card>
            </div>
            <div
              className="d-flex align-content-baseline"
              style={{ marginBottom: "13%", marginLeft: "10%" }}
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
        <Row className="m-2 w-100 align-items-stretch">
          <Col className="justify-content-between d-flex flex-column w-100">
            <div
              className="d-flex align-content-baseline"
              style={{ marginTop: "15%", marginLeft: "23%" }}
            >
              <Card className="landing-card p-2 w-75">
                <Card.Body>
                  <h4>{myStrings.landingPitch}</h4>
                </Card.Body>
              </Card>
            </div>
            <div
              className="d-flex align-content-baseline"
              style={{ marginBottom: "20%", marginLeft: "23%" }}
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
      </Container>
    </Fragment>
  );
}

export default LandingPage;
