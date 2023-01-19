import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { removeLesson } from "./lessonAction";
import { lessonInit } from "./lessonSlice";

function RemoveLessonModal(props) {
  const dispatch = useDispatch();

  function onClickHandler() {
    dispatch(removeLesson({ week_id: 1, lesson_id: props.removeLessonId }));
    props.onHide();
  }

  return (
    <>
      <Modal
        show={props.show}
        onShow={() => {
          dispatch(lessonInit());
        }}
        onHide={props.onHide}
        size="sm"
      >
        <Modal.Header>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you realy want to remove the lesson?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClickHandler}>
            OK
          </Button>
          <Button variant="primary" onClick={props.onHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

RemoveLessonModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  removeLessonId: PropTypes.number,
};

export default RemoveLessonModal;
