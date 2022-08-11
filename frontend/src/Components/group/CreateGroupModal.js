import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

import CreateGroupForm from "./CreateGroupForm";

const CreateGroupModal = (props) => {
  return (
    <>
      <Modal
        onHide={props.onHide}
        show={props.show}
        size="sm"
        contentClassName="bg-light"
      >
        <Modal.Body>
          <CreateGroupForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

CreateGroupModal.propTypes = {};

export default CreateGroupModal;
