import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";

import LoginForm from "../login/LoginForm";
import PasswordResetForm from "../Form/PasswordResetForm";
import RegisterForm from "../Form/RegisterForm";

function LoginModal(props) {
  // const [basicModal, setBasicModal] = useState(false);
  const [formLoad, setFormLoad] = useState("login");

  // useEffect(() => {setFormLoad('login')});

  // const toggleShow = () => setBasicModal(!basicModal);

  const formSwitcher = (frmType) => {
    setFormLoad(frmType);
  };

  return (
    <>
      <Modal
        onShow={() => {
          setFormLoad("login");
        }}
        onHide={props.onHide}
        show={props.show}
        size="sm"
        contentClassName="bg-light"
      >
        {/* <Modal.Header closeButton> */}
        {/* <Modal.Title style={{text: "center"}}>Sign in to DS</Modal.Title> */}
        {/* </Modal.Header> */}

        <Modal.Body>
          {formLoad === "login" && <LoginForm formSwitcher={formSwitcher} />}
          {formLoad === "reset" && (
            <PasswordResetForm formSwitcher={formSwitcher} />
          )}
          {formLoad === "register" && (
            <RegisterForm formSwitcher={formSwitcher} />
          )}
        </Modal.Body>

        {/* <Modal.Footer> */}
        {/* <div className="text-center"><a href="#">Create an account</a></div> */}

        {/* <Button onClick={props.onHide}>Close</Button> */}
        {/* </Modal.Footer> */}
      </Modal>
    </>
  );
}

LoginModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
};

export default LoginModal;
