import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchLesson } from "./LessonAction";
import renderSelectEditInputCell from "./SelectEditMarks.comp";


// TODO: get Sanday like free day 
function generateDaysRange(year, month) {
  let arr = [];
  const lastDay = new Date(year, month, 0).getDate();
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

  useEffect(() => {
    if (user.id) {
      console.log("LessonForm useEffect ");
      dispatch(fetchLesson({ lessonID: lessonId, teacherID: user.id }));
    }
  }, [user.id, dispatch]);

  const dateParts = activeLesson.date.split("-");
  const days = generateDaysRange(dateParts[0], dateParts[1]);
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
      params.value == null
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
          border: "5px solid lightblue",
          borderRadius: "10px",
        },
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>
          {activeLesson.name}, {activeLesson.group}
        </h1>
        <p>
          {new Date(activeLesson.date).toLocaleDateString("en-us", dateFormat)}
        </p>
      </div>
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
