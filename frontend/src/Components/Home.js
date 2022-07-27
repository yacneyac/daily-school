import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";

import {
  Container, 
  Nav,
  Navbar,
  NavDropdown
} from "react-bootstrap";


// import UserMenu from "./UserMenu";
// import LoginBtn from "./Button/LoginBtn";
// import Header from "./Header";



function Home() {
  // const [data, setData] = useState({});
  // const [modalShow, setModalShow] = useState(false);
  // const [currentUser, setcurrentUser] = useState(null);
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
    <>
        {/* <Header /> */}

      <div className="p-5 text-center bg-light">
        <h1 className="mb-3">Heading</h1>
        <h4 className="mb-3">Subheading</h4>
        {/* <a className='btn btn-primary' href='' role='button'> */}
        {/* Call to action */}
        {/* </a> */}
      </div>

      <p className="mt-4">Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>
      <p>Scroll down</p>


    </>
  );
}

export default Home;
