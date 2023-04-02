import { CircularProgress } from "@mui/material";
import React from "react";

export const BaseProgress = (props) => {
  return (
    <CircularProgress
      color="primary"
      size={60}
      sx={{
        position: "absolute",
        top: "50%",
        left: "48%",
      }}
    />
  );
};
