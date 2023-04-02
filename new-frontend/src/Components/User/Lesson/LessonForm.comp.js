import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Box, CircularProgress, Grid, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchLesson } from "./LessonAction";
import renderSelectEditInputCell from "./SelectEditMarks.comp";


// TODO: make Sunday like free day
function generateDaysRange(lessonDate) {
  let arr = [];
  const lastDay = new Date(
    lessonDate.getFullYear(),
    lessonDate.getMonth() + 1,
    0
  ).getDate();
  const today = new Date().getDate();

  for (let day = 1; day <= lastDay; day += 1) {
    let headerClass = "";

    if (day === today) {
      headerClass = "today";
    }

    arr.push({
      field: day.toString(),
      headerName: day.toString(),
      sortable: false,
      width: 40,
      minWidth: 10,
      maxWidth: 40,
      editable: true,
      headerClassName: headerClass,
      renderEditCell: renderSelectEditInputCell,
    });
  }
  return arr;
}


function LessonForm() {
  console.log("LessonForm");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isLoading, activeLesson } = useSelector((state) => state.lesson);
  const { lessonId } = useParams();
  const [value, setValue] = useState();

  useEffect(() => {
    if (user.id) {
      dispatch(fetchLesson({ lessonID: lessonId, teacherID: user.id }));
    }
  }, [user.id, dispatch]);

  useEffect(() => {
    if (activeLesson.date !== "") setValue(dayjs(activeLesson.date));
  }, [activeLesson.date]);


  const days = generateDaysRange(new Date(activeLesson.date));
  const dateFormat = { month: "long", day: "numeric", year: "numeric" };

  var columns = [
    {
      field: "db_id",
      headerName: "",
      hide: true,
    },
    {
      field: "id",
      headerName: "#",
      sortable: false,
      width: 40,
      minWidth: 10,
      maxWidth: 40,
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      sortable: false,
    },
  ];

  if (days.length) {
    columns.push(...days);
  }

  function marksColor(params) {
    if (
      params.field === "name" ||
      params.field === "id" ||
      params.value == null ||
      params.value == 0
    ) {
      return "";
    }

    if (params.value >= 4) {
      return "top";
    }
    if (params.value == 3) {
      return "middle";
    }
    if (params.value <= 2) {
      return "bad";
    }
    if (params.value === "N") {
      return "missed";
    }
  }
  // TODO: get stydents' mark by date
  function changeDateHandler(newValue) {
    setValue(newValue);
    const newDate = new Date(newValue);
    const data = {
      subject_id: activeLesson.db_id,
      dateStart:
        new Date(newDate.getFullYear(), newDate.getMonth()).getTime() / 1000,
      dateEnd:
        new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getTime() /
        1000,
    };

    console.log(data);
  }

  return isLoading ? (
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
    <Box
      sx={{
        height: 600,
        "& .top": {
          backgroundColor: "lightgreen",
          borderRadius: "10px",
        },
        "& .middle": {
          backgroundColor: "bisque",
          borderRadius: "10px",
        },
        "& .bad": {
          backgroundColor: "orangered",
          borderRadius: "10px",
        },
        "& .missed": {
          backgroundColor: "darkgrey",
          borderRadius: "10px",
        },
        "& .today": {
          backgroundColor: "lightblue",
          borderRadius: "10px",
        },
      }}
    >
      <Grid container spacing={12}>
        <Grid item xs={9} style={{ textAlign: "center", paddingLeft: "300px" }}>
          <h1>
            {activeLesson.name}, {activeLesson.group}
          </h1>
          <p>
            {new Date(activeLesson.date).toLocaleDateString(
              "en-us",
              dateFormat
            )}
          </p>
        </Grid>
        <Grid item xs={3} style={{ paddingTop: "120px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={["year", "month"]}
              label="Year and Month"
              minDate={dayjs("2020-06-01")}
              maxDate={dayjs("2023-06-01")}
              value={value}
              onChange={(newValue) => {
                changeDateHandler(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <DataGrid
        rows={activeLesson.students}
        columns={columns}
        hideFooter
        disableColumnMenu
        getRowId={(row) => row.db_id}
        rowHeight={40}
        experimentalFeatures={{ newEditingApi: true }}
        getCellClassName={marksColor}
      />
    </Box>
  );
}

export default LessonForm;
