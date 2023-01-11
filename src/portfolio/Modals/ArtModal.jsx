import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import myStrings from "../../myStrings";
import "../landingPage.css";

const ArtModal = (props) => {
  const commonProps = { ...props.commonProps };
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <Modal
      className="modal-lg "
      show={true}
      centered
      onHide={commonProps.closeModal}
    >
      <Modal.Header className="landing-modal">Art Details</Modal.Header>
      <Modal.Body className="landing-modal text-white content-background">
        <span>Title: {props.title}</span>
        <br />
        <span>Medium: {props.medium}</span>
        <br />
        <span>Artist name: {props.artistDisplayName}</span>
        <br />
        <span>Artist bio: {props.artistDisplayBio}</span>
        <br />
        <span>Artist began: {props.artistBeginDate}</span>
        <br />
        <span>Artist finished: {props.artistEndDate}</span>
      </Modal.Body>
      <Modal.Footer className="landing-modal">
        Thank you to the Met for the API!
      </Modal.Footer>
    </Modal>
  );
};

export default ArtModal;
