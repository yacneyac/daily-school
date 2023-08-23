import React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import PropTypes from "prop-types";

import DayLessonTable from "./DayLessonTable.comp";

const DayCard = (props) => {
  const dateFormat = { month: "long", day: "numeric", year: "numeric" };
  const today = new Date().toISOString().split("T")[0];

  const styles = {
    today: {
      textAlign: "center",
      border: "5px solid lightblue",
      borderRadius: "10px"
    },
    day: {
      textAlign: "center",
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

DayCard.propTypes = {
  date: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  lessons: PropTypes.array.isRequired,
};

export default DayCard;
