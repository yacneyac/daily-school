import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

import CreateGroupForm from "../Form/CreateGroupForm";

const CreateGroupModal = (props) => {
  return (
    <>
      <Modal
        // onShow={() => {
        //   setFormLoad("login");
        // }}
        onHide={props.onHide}
        show={props.show}
        size="sm"
        contentClassName="bg-light"
      >
        {/* <Modal.Header closeButton> */}
        {/* <Modal.Title style={{text: "center"}}>Sign in to DS</Modal.Title> */}
        {/* </Modal.Header> */}

        <Modal.Body>
          <CreateGroupForm />
        </Modal.Body>

        {/* <Modal.Footer> */}
        {/* <div className="text-center"><a href="#">Create an account</a></div> */}

        {/* <Button onClick={props.onHide}>Close</Button> */}
        {/* </Modal.Footer> */}
      </Modal>
    </>
  );
};

CreateGroupModal.propTypes = {};

export default CreateGroupModal;
