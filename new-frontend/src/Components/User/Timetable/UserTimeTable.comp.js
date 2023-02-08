import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Grid, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { fetchTimeTable } from "./UserTimeTableAction";
import LessonCreateModal from "../Lesson/LessonCreateModal.comp";
import { lessonInit } from "../Lesson/LessonSlice";
import DayCard from "./DayCard.comp";


const UserTimeTable = () => {
  const [modalLessonShow, setModalLessonShow] = useState(false);
  const [page, setPage] = useState(null);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const timeTableState = useSelector((state) => state.timeTable);
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (user.id && accessToken) {
      console.log("UserTimeTable useEffect fetchTimeTable");
      dispatch(fetchTimeTable(timeTableState.activeWeekNumber));
    }
  }, [user.id, dispatch]);

  function onChangePage(e, page) {
    setPage(page);
    dispatch(fetchTimeTable(page));
  }

  function onCloseLessonModal() {
    setModalLessonShow(false);
    dispatch(lessonInit());
  }

  return (
    <>
      <Grid
        display="flex"
        justifyContent="center"
        style={{ marginBottom: "20px" }}
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
          onClick={() => setModalLessonShow(true)}
        >
          Create a lesson
        </Button>
        <LessonCreateModal
          open={modalLessonShow}
          handleClose={onCloseLessonModal}
        />
      </Grid>
      <hr />

      {timeTableState.isLoading ? (
        <CircularProgress
          color="primary"
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
                    <DayCard
                      date={timeTableState.week[day].date}
                      day={day}
                      lessons={timeTableState.week[day].lessons}
                    />
                  </Grid>
                )
              )}
              {Array.from(["Thursday", "Friday", "Saturday"]).map(
                (day, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <DayCard
                      date={timeTableState.week[day].date}
                      day={day}
                      lessons={timeTableState.week[day].lessons}
                    />
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
