import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card } from "react-bootstrap";
import UserPubSettings from "../Form/user-profile/user-pub-settings";
import UserEmailSettings from "../Form/user-profile/user-email-settings";
import UserPassSettings from "../Form/user-profile/user-pass-settings";

const UserProfile = (props) => {
  return (
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
              <UserEmailSettings />
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

UserProfile.propTypes = {
  // user: 
};

export default UserProfile;
