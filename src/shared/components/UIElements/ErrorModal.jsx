import React from "react";

import Modal from "./Modal";
import Button from "../FormElements/Button";
import "./ErrorModal.css";
const ErrorModal = ({ onClear, error }) => {
  return (
    <Modal
      onCancel={onClear}
      header="An Error Occurred!"
      show={!!error}
      footer={<Button onClick={onClear}>Okay</Button>}
      footerClass="float-right"
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;
