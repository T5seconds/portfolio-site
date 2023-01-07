import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import myStrings from "../../myStrings";
import "../landingPage.css";

const ContactModal = (props) => {
  useEffect(() => {
    console.log("ContactModal", props);
  });
  return (
    <Modal
      className=""
      show={props.showModal}
      centered
      onHide={props.checkModal}
    >
      <Modal.Body className="bg-dark text-white border-0 rounded">
        {`Email: `}
        <a
          className="text-white"
          href={`mailto: ${myStrings.professionalEmail}`}
        >
          {myStrings.professionalEmail}
        </a>
      </Modal.Body>
      <Modal.Body className="bg-dark text-white border-0">{`Phone: ${myStrings.businessPhone}`}</Modal.Body>
    </Modal>
  );
};

export default ContactModal;
