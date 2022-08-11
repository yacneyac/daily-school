import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

import CreateLessonForm from "./CreateLessonForm.comp";
import { useSelector } from "react-redux";

const CreateLessonModal = (props) => {
  const [show, setShow] = useState(false);
  const { activeDay } = useSelector((state) => state.timeTable);

  return (
    <>
      <Modal
        onHide={props.onHide}
        show={props.show}
        size="sm"
        contentClassName="bg-light"
      >
        <Modal.Body>
          <CreateLessonForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

CreateLessonModal.propTypes = {};

export default CreateLessonModal;
