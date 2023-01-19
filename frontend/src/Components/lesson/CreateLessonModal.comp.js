import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { lessonInit } from "./lessonSlice";
import CreateLessonForm from "./CreateLessonForm.comp";

const CreateLessonModal = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        onHide={props.onHide}
        onShow={() => {
          dispatch(lessonInit());
        }}
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

export default CreateLessonModal;
