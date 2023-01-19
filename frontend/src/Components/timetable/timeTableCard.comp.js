import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
// https://react-bootstrap-table.github.io/react-bootstrap-table2
import BootstrapTable from "react-bootstrap-table-next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import RemoveLessonModal from "../lesson/RemoveLesssonModal.comp";

const TimeTableCard = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [removeLessonId, setRemoveLessonId] = useState(null);

  function groupFormatter(cell, row) {
    return <Link to={`/group/${row.groupId}`}>{row.group}</Link>;
  }

  const columns = [
    {
      dataField: "db_id",
      text: "",
      align: "center",
      formatter: (cell, row) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-trash"
          viewBox="0 0 16 16"
          style={{ pointerEvents: "auto" }}
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path
            fillRule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      ),
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          console.log("REMOVE ROW:", row.db_id);

          setModalShow(true);
          setRemoveLessonId(row.db_id);
        },
      },
    },
    {
      dataField: "id",
      text: "#",
    },
    {
      dataField: "time",
      text: "Time",
    },
    {
      dataField: "subject",
      text: "Subject",
    },
    {
      dataField: "room",
      text: "Room",
    },
    {
      dataField: "group",
      text: "Group",
      formatter: groupFormatter,
    },
  ];

  const { week } = useSelector((state) => state.timeTable);

  const styles = {
    today: {
      textAlign: "center",
      fontWeight: "bold",
      color: "white",
      backgroundColor: "#0d6efd",
    },
    day: {
      textAlign: "center",
    },
  };

  const today = new Date().toISOString().split("T")[0];

  function generateCard(days) {
    return days.map((day, index) => {
      return (
        <Col key={index}>
          <Card id={day}>
            <Card.Header
              style={week[day].date === today ? styles.today : styles.day}
            >
              {day} {week[day].date}
            </Card.Header>
            <Card.Body>
              <BootstrapTable
                striped
                hover
                condensed
                noDataIndication="Table is Empty"
                keyField="id"
                data={week[day].lessons}
                columns={columns}
              />
              <RemoveLessonModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                removeLessonId={removeLessonId}
              />
            </Card.Body>
          </Card>
        </Col>
      );
    });
  }

  if (Object.keys(week).length !== 0) return generateCard(props.days);
};

TimeTableCard.propTypes = {};

export default TimeTableCard;
