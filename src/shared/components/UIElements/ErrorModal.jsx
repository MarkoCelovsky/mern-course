import React from "react";

import Modal from "./Modal";
import Button from "../FormElements/Button";
import "./ErrorModal.css";
const ErrorModal = ({ onClear, error }) => {
  let err;
  if (error) {
    err = error.response.data.message;
  }

  return (
    <Modal
      onCancel={onClear}
      header="An Error Occurred!"
      headerClass="error__header"
      show={!!err}
      footer={<Button onClick={onClear}>Okay</Button>}
      footerClass="float-right"
    >
      <p>{err}</p>
    </Modal>
  );
};

export default ErrorModal;
