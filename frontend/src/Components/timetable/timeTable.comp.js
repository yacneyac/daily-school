import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const TimeTable = (props) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Time</th>
          <th>Subject</th>
          <th>Room</th>
          <th>Group</th>
        </tr>
      </thead>
      <tbody>
        {props.dayLessons.length ? (
          props.dayLessons.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.time}</td>
              <td>{row.subject}</td>
              <td>{row.room}</td>
              <td>
                <Link to={`/group/${row.group}`}>{row.group}</Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No lessons
            </td>
          </tr>
        )}

        <tr>
          <td colSpan={5}>
            <Button variant="secondary" size="sm">
              Add
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

// timeCard.comp.propTypes = {}

export default TimeTable;
