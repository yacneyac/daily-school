import React, { forwardRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import { removeLesson } from "./LessonAction";

// const Transition = forwardRef(function Transition(props, ref) {
// return <Slide direction="up" ref={ref} {...props} />;
// });

function RemoveLessonModal(props) {
  const { activeWeekNumber } = useSelector((state) => state.timeTable);
  const lessonState = useSelector((state) => state.lesson);
  const dispatch = useDispatch();

  // reload page if lesson is deleted
  useEffect(() => {
    if (lessonState.deleted) {
      window.location.reload();
    }
  }, [lessonState.deleted]);


  function handleSubmit() {
    dispatch(
      removeLesson({
        week_id: activeWeekNumber,
        lesson_id: props.removeLessonId,
      })
    );

    props.handleClose();
  }

  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        // TransitionComponent={Transition}
      >
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

RemoveLessonModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  removeLessonId: PropTypes.number,
};

export default RemoveLessonModal;
