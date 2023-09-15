import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import LessonCreateForm from "./LessonCreateForm.comp";

export default function LessonCreateModal(props: {
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose} maxWidth="xs">
        <DialogTitle style={{ textAlign: "center" }}>
          Create a lesson
        </DialogTitle>
        <DialogContent>
          <LessonCreateForm handleClose={props.handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}
