import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { fetchTimeTable } from "./UserTimeTableAction";
import LessonCreateModal from "../Lesson/LessonCreateModal.comp";
import { lessonInit } from "../Lesson/LessonSlice";
import DayCard from "./DayCard.comp";
import { BaseProgress } from "../../BaseComp/BaseProgress.comp";
import { AppDispatch, StoreState } from "../../../types";

const UserTimeTable = () => {
  const [modalLessonShow, setModalLessonShow] = useState(false);
  const { user } = useSelector((state: StoreState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const timeTableState = useSelector((state: StoreState) => state.timeTable);
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (user.id && accessToken) {
      console.log("UserTimeTable useEffect fetchTimeTable");
      dispatch(fetchTimeTable(timeTableState.activeWeekNumber));
    }
  }, [user.id, accessToken, dispatch]);

  function onChangePage(e: React.ChangeEvent<unknown>, page: number) {
    dispatch(fetchTimeTable(page));
  }

  function onCloseLessonModal() {
    setModalLessonShow(false);
    dispatch(lessonInit());
  }

  return (
    <main style={{ margin: "20px" }}>
      <Grid
        display="flex"
        justifyContent="center"
        style={{ marginBottom: "20px" }}
      >
        <Pagination
          disabled={timeTableState.isLoading}
          count={40}
          page={timeTableState.activeWeekNumber as number}
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
          onClick={() => dispatch(fetchTimeTable(null))}
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
        <BaseProgress />
      ) : (
        <Box>
          {Object.keys(timeTableState.week).length !== 0 && (
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {timeTableState.week.map((day, index) => (
                <Grid item xs={3} sm={4} md={4} key={index}>
                  <DayCard
                    date={day.date}
                    day={day.name}
                    lessons={day.lessons}
                  />
                </Grid>
              ))}

              {/* {Array.from(["Monday", "Tuesday", "Wednesday"]).map(
                (day, index) => (
                  <Grid item xs={3} sm={4} md={4} key={index}>
                    <DayCard
                      date={timeTableState.week}
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
              )} */}
            </Grid>
          )}
        </Box>
      )}
    </main>
  );
};

export default UserTimeTable;
