import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import { removeLesson } from "./LessonAction";
import { AppDispatch, StoreState } from "../../../types";

function RemoveLessonModal(props: {
  open: boolean;
  removeLessonId: number | null;
  handleClose: () => void;
}) {
  const { activeWeekNumber } = useSelector(
    (state: StoreState) => state.timeTable
  );
  const lessonState = useSelector((state: StoreState) => state.lesson);
  const dispatch: AppDispatch = useDispatch();

  // reload page if lesson is deleted
  useEffect(() => {
    if (lessonState.deleted) {
      window.location.reload();
    }
  }, [lessonState.deleted]);

  function handleSubmit() {
    if (props.removeLessonId) {
      dispatch(removeLesson(activeWeekNumber as number, props.removeLessonId));
      props.handleClose();
    }
  }

  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose}>
        {/* <DialogTitle style={{ textAlign: "center" }}>
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
          </Alert>
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText style={{ fontWeight: "bold" }}>
            Do you realy want to remove the lesson?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>OK</Button>
          <Button onClick={props.handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RemoveLessonModal;
