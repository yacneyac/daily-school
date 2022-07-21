import React, { useState } from 'react';
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { MDBBtn,
//   MDBModal,
//   MDBModalDialog,
//   MDBModalContent,
//   MDBModalHeader,
//   MDBModalTitle,
//   MDBModalBody,
//   MDBModalFooter,
// } from 'mdb-react-ui-kit';

import LoginRegister from './LoginRegister';


function LoginModal(props) {
  // const [basicModal, setBasicModal] = useState(false);

  // const toggleShow = () => setBasicModal(!basicModal);

  return (
    <>
    {/* <MDBBtn onClick={toggleShow}>LAUNCH DEMO MODAL</MDBBtn> */}
    {/* <MDBModal show={props.show} onHide={props.onHide}>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Modal title</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={props.onHide}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>...</MDBModalBody>

          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={props.onHide}>
              Close
            </MDBBtn>
            <MDBBtn>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal> */}

<Modal show={props.show} onHide={props.onHide}>
        {/* <Modal.Header closeButton> */}
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        {/* </Modal.Header> */}
        
        <Modal.Body>
        <LoginRegister />
        </Modal.Body>
        
        <Modal.Footer>
          <Button onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  );
}


LoginModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired
};

export default LoginModal;