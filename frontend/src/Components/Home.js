import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

import LoginModal from './Modal/LoginModal';


function Home() {
  // const [data, setData] = useState({});
  const [modalShow, setModalShow] = useState(false);
  // const [active, setActive] = useState("globals");

  // useEffect(() => {
    // fetch("ver")
      // .then((response) => response.json())
      // .then((data) => {
        // setData(data);

        // if (data.missed) {
          // setModalShow(true);
        // }
        
      // });
  // }, []);

  return (
    <header>
      <MDBNavbar expand='lg' light bgColor='white' fixed>
        <MDBContainer fluid>
          <MDBNavbarToggler
            aria-controls='navbarExample01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <MDBIcon fas icon='bars' />
          </MDBNavbarToggler>
          <div className='collapse navbar-collapse' id='navbarExample01'>
            <MDBNavbarNav right className='mb-2 mb-lg-0'>
              <MDBNavbarItem active>
                <MDBNavbarLink aria-current='page' href='#'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>Features</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>Pricing</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>About</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </div>
        </MDBContainer>

        <MDBBtn className='mx-2' onClick={() => setModalShow(true)}>
          Login
        </MDBBtn>

        <LoginModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />

      </MDBNavbar>

      <div className='p-5 text-center bg-light'>
        <h1 className='mb-3'>Heading</h1>
        <h4 className='mb-3'>Subheading</h4>
        {/* <a className='btn btn-primary' href='' role='button'> */}
          {/* Call to action */}
        {/* </a> */}
      </div>

      <p className='mt-4'>Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
    </header>
  );
}

export default Home; 
