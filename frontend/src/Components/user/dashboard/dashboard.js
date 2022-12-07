import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
// import { getUserProfile } from "../userAction";
// import BootstrapTable from "react-bootstrap-table-next";
import TimeTableCard from "../../timetable/timeTableCard.comp";
import { fetchTimeTable } from "../../timetable/timeTableAction";
import CreateLessonModal from "../../lesson/CreateLessonModal.comp";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [modalShow, setModalShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const { isLoading } = useSelector((state) => state.timeTable);
  const accessToken = sessionStorage.getItem("accessToken");
  const dispatch = useDispatch();

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0
  };

  console.log("UserDashboard ", user);

  useEffect(() => {
    if (user.id && accessToken) {
      console.log("fetchTimeTable");
      dispatch(fetchTimeTable());
    }
    // else{
    // navigate("/signin");
    // }
  }, [user.id, dispatch]);

  return (
    <Container>
      <div className="gap-5 d-md-flex justify-content-md-center">
        {/* <Pagination size="sm" style={{ marginLeft: "95px" }}>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination> */}
        <DatePicker
          dateFormat="yyyy-MM-dd"
          calendarStartDay={1}
          className="ds-date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          filterDate={isWeekday}
          withPortal
        />
        <Button
          variant="secondary"
          size="sm"
          style={{ marginBottom: "16px" }}
          // onClick={() => onClickHandler({ day })}
          onClick={() => setModalShow(true)}
        >
          Add
        </Button>
        <CreateLessonModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
      {/* <Row> */}
      {/* <Col> */}
      {/* <TimeTableCard /> */}

      <Row style={{ marginBottom: "12px" }}>
        <TimeTableCard days={["Monday", "Tuesday", "Wednesday"]} />
      </Row>
      <Row style={{ marginBottom: "12px" }}>
        <TimeTableCard days={["Thursday", "Friday", "Saturday"]} />
      </Row>

      {/* {isLoading ? "loading tables" : <TimeTableCard /> } */}
      {/* </Col> */}
      {/* <Col> */}
      {/* <TimeTable /> */}
      {/* </Col> */}
      {/* <Col> */}
      {/* <TimeTable /> */}
      {/* </Col> */}
      {/* </Row> */}
      {/* <Row>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
    </Container>
  );
};

export default UserDashboard;
