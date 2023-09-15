import React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";

import DayLessonTable from "./DayLessonTable.comp";
import { LessonGridRow } from "../../../types";

const DayCard = (props: { date: string; day: string; lessons: LessonGridRow[] }) => {
  let dateFormat: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const today = new Date().toISOString().split("T")[0];

  const styles = {
    today: {
      // textAlign: "center",
      border: "5px solid lightblue",
      borderRadius: "10px",
    },
    day: {
      // textAlign: "center",
    },
  };

  return (
    <Card style={props.date === today ? styles.today : styles.day}>
      <CardHeader
        title={props.day}
        subheader={new Date(props.date).toLocaleDateString("en-us", dateFormat)}
      />
      <CardContent>
        <DayLessonTable rows={props.lessons} />
      </CardContent>
    </Card>
  );
};

export default DayCard;
