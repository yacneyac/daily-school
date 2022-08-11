import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { Container, Row, Col, Card } from "react-bootstrap";
import UserPubSettings from "./profile/userPublicSettings";
import UserEmailSettings from "./profile/userEmailSettings";
import UserPassSettings from "./profile/userPasswordSettings";
import { getUserProfile } from "./userAction";

import { useDispatch, useSelector } from "react-redux";



const UserProfile = () => {
  const { user, isLoading } = useSelector((state) => state.user);

  const accessToken = sessionStorage.getItem("accessToken");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.id && accessToken) {
      console.log("RUN getUserProfile in UserProfile");
      dispatch(getUserProfile());
    }
  }, [user.id, dispatch]);
  // console.log('UserProfile -->', user)
  return !isLoading && (
    <Container>
      <Row md={4}>
        <Col md={{ span: 4, offset: 2 }}>
          <Card>
            <Card.Body>
              <Card.Title>Public settings</Card.Title>
              <UserPubSettings />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{ marginBottom: "1.5rem" }}>
            <Card.Body>
              <Card.Title>Email settings</Card.Title>
              <UserEmailSettings email={user.email} />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Password change</Card.Title>
              <UserPassSettings />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// UserProfile.propTypes = {
  // user:
// };

export default UserProfile;
