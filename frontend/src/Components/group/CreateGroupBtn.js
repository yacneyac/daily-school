import React, { useState } from "react";
import { Button } from "react-bootstrap";

import CreateGroupModal from "./CreateGroupModal";

function CreateGroupBtn() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button className="mx-2" onClick={() => setModalShow(true)}>
        Create Group
      </Button>
      <CreateGroupModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default CreateGroupBtn;
