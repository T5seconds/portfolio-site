import React, { Component, useEffect } from "react";
import ContactModal from "./ContactModal";
import ArtModal from "./ArtModal";

const Modals = (props) => {
  const commonProps = {
    currentModal: props.currentModal,
    setShowModal: props.setShowModal,
    closeModal: props.closeModal,
  };
  const modals = {
    contactInfo: { Component: ContactModal },
    artInfo: { Component: ArtModal, props: props.imageInfo },
  };
  const injectCommonProps = (componentWithProps) => {
    Component = componentWithProps.Component;
    return (
      <Component commonProps={commonProps} {...componentWithProps.props} />
    );
  };

  useEffect(() => {
    console.log(props.currentModal);
  });
  return injectCommonProps(modals[props.currentModal]);
};

export default Modals;
