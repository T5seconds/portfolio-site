import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import myStrings from "../myStrings";
import "./landingPage.css";

const ContactModal = (props) => {
  useEffect(() => {
    console.log("ContactModal", props);
  });
  return (
    <Modal show={props.showModal} centered onHide={props.checkModal}>
      <Modal.Body className="border-0">
        {`Email me: `}
        <a className="" href={`mailto: ${myStrings.professionalEmail}`}>
          {myStrings.professionalEmail}
        </a>
      </Modal.Body>
      <Modal.Body className="bg-dark text-white border-0">{`Call me: ${myStrings.businessPhone}`}</Modal.Body>
    </Modal>
  );
};

export default ContactModal;
