import React, { useState } from "react";
import { Button } from "react-bootstrap";

import CreateLessonModal from "./CreateLessonModal.comp";

function CreateLessonBtn() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button className="mx-2" onClick={() => setModalShow(true)}>
        Create lesson
      </Button>
      <CreateLessonModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default CreateLessonBtn;
