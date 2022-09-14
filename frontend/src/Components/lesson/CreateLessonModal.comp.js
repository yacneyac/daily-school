import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { lessonInit } from "./lessonSlice";
import CreateLessonForm from "./CreateLessonForm.comp";

const CreateLessonModal = (props) => {
  const dispatch = useDispatch();
  // const [modalShow, setModalShow] = useState(props.show);
  const { created } = useSelector((state) => state.lesson);
  // created(pin):true

  // useEffect(() => {
  //   if (created) {
  //     setModalShow(false)
  //   }
  // }, [created]);

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
