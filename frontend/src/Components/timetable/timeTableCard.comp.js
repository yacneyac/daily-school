import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { Button, Card, Col, Row, Badge } from "react-bootstrap";
// https://react-bootstrap-table.github.io/react-bootstrap-table2
import BootstrapTable from "react-bootstrap-table-next";
// import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

import { useDispatch, useSelector } from "react-redux";
// import TimeTable from "./timeTable.comp";
// import { setTimeTableDay } from "./timeTableSlice";
// import CreateLessonModal from "../lesson/CreateLessonModal.comp";
import { Link } from "react-router-dom";
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import { fetchTimeTable } from "./timeTableAction";

// import lessons from "./dummyLessons.json";

const TimeTableCard = (props) => {
  function groupFormatter(cell, row) {
    return <Link to={`/group/${row.groupId}`}>{row.group}</Link>;
  }

  const columns = [
    {
      dataField: "db_id",
      text: "",
      align: 'center',
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
  // const [modalShow, setModalShow] = useState(false);
  const { week } = useSelector((state) => state.timeTable);
  // const dispatch = useDispatch();

  // function onClickHandler(day_) {
  //   dispatch(setTimeTableDay(day_));
  //   setModalShow(true);
  // }

  // function afterSaveCell(oldValue, newValue) {
  //   console.log('--after save cell--');
  //   console.log('New Value was apply as');
  //   console.log(newValue);
  //   console.log(`and the type is ${typeof newValue}`);
  // }

  // const selectRow = {
  //   mode: "checkbox",
  //   clickToSelect: true,
  //   onSelect: (row, isSelect, rowIndex, e) => {
  //     console.log(row.id, row.db_id);
  //     console.log(isSelect);
  //     // console.log(rowIndex);
  //     // console.log(e);
  //   },
  // };

  // const rowEvents = {
  //   onClick: (e, row, rowIndex) => {
  //     console.log("REMOVE: ", row.db_id);
  //   },
  // };

  function generateCard(days) {
    return days.map((day, index) => {
      return (
        <Col key={index}>
          <Card id={day}>
            <Card.Header style={{ textAlign: "center" }}>
              {day} {week[day].date}
            </Card.Header>
            <Card.Body>
              {/* <TimeTable dayLessons={week[day].lessons} /> */}

              <BootstrapTable
                striped
                hover
                condensed
                // size="sm"
                noDataIndication="Table is Empty"
                keyField="id"
                data={week[day].lessons}
                columns={columns}
                // rowEvents={rowEvents}
                // selectRow={ selectRow }
                // cellEdit={ cellEditFactory({
                //   mode: 'dbclick',
                //   onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
                //   afterSaveCell
                // }) }
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
