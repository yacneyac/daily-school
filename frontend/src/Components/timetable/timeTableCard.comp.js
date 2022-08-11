import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Col, Row } from "react-bootstrap";
// https://react-bootstrap-table.github.io/react-bootstrap-table2
import BootstrapTable from "react-bootstrap-table-next";
import { useDispatch, useSelector } from "react-redux";
import TimeTable from "./timeTable.comp";
import { setTimeTableDay } from "./timeTableSlice";
import CreateLessonModal from "../lesson/CreateLessonModal.comp";
import { Link } from "react-router-dom";
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import { fetchTimeTable } from "./timeTableAction";

// import lessons from "./dummyLessons.json";

const TimeTableCard = (props) => {
  function groupFormatter(cell, row) {
    return <Link to={`/group/${row.group}`}>{row.group}</Link>;
  }

  const columns = [
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
  const dispatch = useDispatch();

  // function onClickHandler(day_) {
  //   dispatch(setTimeTableDay(day_));
  //   setModalShow(true);
  // }

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
              />

              {/* <hr /> */}
              {/* <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onClickHandler({ day })}
                  // onClick={() => setModalShow(true)}
                >
                  Add
                </Button> */}
              {/* <CreateLessonModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                /> */}
              {/* </div> */}
            </Card.Body>
          </Card>
        </Col>
      );
    });
  }

  if (Object.keys(week).length !== 0) return generateCard(props.days);

  // return (
  //   <>
  //     <Row>{generateCard(["Monday", "Tuesday", "Wednesday"])}</Row>
  //     <Row>{generateCard(["Thursday", "Friday", "Saturday"])}</Row>
  //   </>
  // );

  // for (const [day, dayLessons] of Object.entries(lessons)) {
  //   console.log(`${key}: ${value}`);
  // }

  // return lessons.map((obj, index) => {
  //   const day = Object.keys(obj)[0];
  //   const dayLessons = Object.values(obj)[0];
  //   // console.log(dayLessons)
  //   return (
  //     <Col key={index}>
  //       <Card>
  //         <Card.Header style={{ textAlign: "center" }}>
  //           {day} 2022-08-09
  //         </Card.Header>
  //         <Card.Body>
  //           {/* <TimeTable dayLessons={dayLessons} index={index}/> */}

  //           <BootstrapTable
  //             striped
  //             hover
  //             condensed
  //             // size="sm"
  //             noDataIndication="Table is Empty"
  //             keyField="id"
  //             data={dayLessons}
  //             columns={columns}
  //           />

  //           <hr />
  //           <div className="d-grid gap-2 d-md-flex justify-content-md-end">
  //             <Button type="submit" variant="secondary" size="sm">
  //               Save
  //             </Button>
  //           </div>
  //         </Card.Body>
  //       </Card>
  //     </Col>
  //   );
  // });

  // );
};

TimeTableCard.propTypes = {};

export default TimeTableCard;
