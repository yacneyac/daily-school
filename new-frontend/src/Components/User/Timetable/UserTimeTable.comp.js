import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Pagination,
} from "@mui/material";

import DashboardTable from "../../tableForm/DashboardTable";
import { fetchTimeTable } from "./UserTimeTableAction";
import { useDispatch, useSelector } from "react-redux";
import LessonCreateModal from "../Lesson/LessonCreateModal.comp";
import { lessonInit } from "../Lesson/LessonSlice";
// import BasicTable from "../../tableForm/DashboardTable";
// import { Button, Container, Row } from "react-bootstrap";
// import { PaginationControl } from "react-bootstrap-pagination-control";
// import { useDispatch, useSelector } from "react-redux";
// import TimeTableCard from "../../timetable/timeTableCard.comp";
// import { fetchTimeTable } from "../../timetable/timeTableAction";
// import CreateLessonModal from "../../lesson/CreateLessonModal.comp";

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

const UserTimeTable = () => {
  const [modalShow, setModalShow] = useState(false);
  const [page, setPage] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { lesson } = useSelector((state) => state);
  const dispatch = useDispatch();
  const timeTableState = useSelector((state) => state.timeTable);
  const accessToken = sessionStorage.getItem("accessToken");

  const dateFormat = { month: "long", day: "numeric", year: "numeric" };
  const today = new Date().toISOString().split("T")[0];
  const styles = {
    today: {
      textAlign: "center",
      backgroundColor: "#e3ffe4",
    },
    day: {
      textAlign: "center",
    },
  };

  useEffect(() => {
    if (user.id && accessToken) {
      console.log("UserTimeTable useEffect fetchTimeTable");
      dispatch(fetchTimeTable(timeTableState.activeWeekNumber));
    }

    // dispatch(lessonInit());
    // setPage(timeTableState.activeWeekNumber);
  }, [user.id, dispatch]); // [user.id, lesson.deleted, dispatch])

  // useEffect(() => {
  // setPage(activeWeekNumber);
  // }, [activeWeekNumber, dispatch]);

  function onChangePage(e, page) {
    setPage(page);
    dispatch(fetchTimeTable(page));
  }

  function onCloseModal() {
    setModalShow(false);
    dispatch(lessonInit());
  }

  return (
    <>
      <Grid
        display="flex"
        justifyContent="center"
        style={{ paddingBottom: "20px" }}
      >
        <Pagination
          disabled={timeTableState.isLoading}
          count={40}
          page={timeTableState.activeWeekNumber || 1}
          siblingCount={5}
          boundaryCount={3}
          color="primary"
          size="large"
          shape="rounded"
          variant="outlined"
          onChange={(e, page) => onChangePage(e, page)}
        />
        <Button
          disabled={timeTableState.isLoading}
          variant="outlined"
          style={{ marginLeft: "20px" }}
          onClick={() => dispatch(fetchTimeTable(""))}
        >
          Current week
        </Button>
        <Button
          disabled={timeTableState.isLoading}
          variant="outlined"
          style={{ marginLeft: "20px" }}
          // style={{ marginBottom: "16px" }}
          onClick={() => setModalShow(true)}
        >
          Create a lesson
        </Button>
        <LessonCreateModal open={modalShow} handleClose={onCloseModal} />
      </Grid>
      <hr />

      {timeTableState.isLoading ? (
        <CircularProgress
          color="success"
          size={60}
          sx={{
            position: "absolute",
            top: "50%",
            left: "48%",
          }}
        />
      ) : (
        <>
          {Object.keys(timeTableState.week).length !== 0 && (
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {Array.from(["Monday", "Tuesday", "Wednesday"]).map(
                (day, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Card
                      style={
                        timeTableState.week[day].date === today
                          ? styles.today
                          : styles.day
                      }
                    >
                      <CardHeader
                        title={day}
                        subheader={new Date(
                          timeTableState.week[day].date
                        ).toLocaleDateString("en-us", dateFormat)}
                      />
                      <CardContent>
                        <DashboardTable
                          rows={timeTableState.week[day].lessons}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                )
              )}
              {Array.from(["Thursday", "Friday", "Saturday"]).map(
                (day, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Card
                      style={
                        timeTableState.week[day].date === today
                          ? styles.today
                          : styles.day
                      }
                    >
                      <CardHeader
                        title={day}
                        subheader={new Date(
                          timeTableState.week[day].date
                        ).toLocaleDateString("en-us", dateFormat)}
                      />
                      <CardContent>
                        <DashboardTable
                          rows={timeTableState.week[day].lessons}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default UserTimeTable;
