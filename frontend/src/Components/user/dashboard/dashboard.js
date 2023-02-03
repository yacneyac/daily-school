import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useDispatch, useSelector } from "react-redux";

import TimeTableCard from "../../timetable/timeTableCard.comp";
import { fetchTimeTable } from "../../timetable/timeTableAction";
import CreateLessonModal from "../../lesson/CreateLessonModal.comp";

const UserDashboard = () => {
  const [modalShow, setModalShow] = useState(false);
  const [page, setPage] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { lesson } = useSelector((state) => state);
  const { activeWeekNumber } = useSelector((state) => state.timeTable);
  const accessToken = sessionStorage.getItem("accessToken");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id && accessToken) {
      dispatch(fetchTimeTable(activeWeekNumber));
      setPage(activeWeekNumber);
    }
  }, [user.id, lesson.deleted, activeWeekNumber, dispatch]);

  
  // useEffect(() => {
  //   setPage(activeWeekNumber);
  // }, [activeWeekNumber, dispatch]);

  function onChangePage(page) {
    setPage(page);
    dispatch(fetchTimeTable(page));
  }

  return (
    <Container>
      <div className="gap-5 d-md-flex justify-content-md-center">
        {/* Education week */}
        <PaginationControl
          style={{ marginLeft: "95px" }}
          page={page}
          between={10}
          total={40}
          limit={1}
          changePage={(page) => onChangePage(page)}
          ellipsis={1}
        />
        <Button
          variant="secondary"
          size="sm"
          style={{ marginBottom: "16px" }}
          onClick={() => dispatch(fetchTimeTable(""))}
        >
          Current week
        </Button>
        <Button
          variant="secondary"
          size="sm"
          style={{ marginBottom: "16px" }}
          onClick={() => setModalShow(true)}
        >
          Add
        </Button>
        <CreateLessonModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>

      <Row style={{ marginBottom: "12px" }}>
        <TimeTableCard days={["Monday", "Tuesday", "Wednesday"]} />
      </Row>
      <Row style={{ marginBottom: "12px" }}>
        <TimeTableCard days={["Thursday", "Friday", "Saturday"]} />
      </Row>
    </Container>
  );
};

export default UserDashboard;
