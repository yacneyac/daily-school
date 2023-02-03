import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
// import BootstrapTable from "react-bootstrap-table-next";
// import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchLesson } from "./lessonAction";

function generateDaysRange(year, month) {
  let arr = [];
  const lastDay = new Date(year, month, 0).getDate();

  for (let i = 1; i <= lastDay; i += 1) {
    arr.push({
      dataField: i.toString(),
      text: i.toString(),
      // editor: {
      //   type: Type.SELECT,
      //   options: [
      //     {
      //       value: "1",
      //       label: "1",
      //     },
      //     {
      //       value: "2",
      //       label: "2",
      //     },
      //     {
      //       value: "3",
      //       label: "3",
      //     },
      //     {
      //       value: "4",
      //       label: "4",
      //     },
      //     {
      //       value: "5",
      //       label: "5",
      //     },
      //     {
      //       value: "N",
      //       label: "N",
      //     },
      //   ],
      // },
    });
  }
  // {
  // dataField: "1",
  // text: "Day1",
  // },

  return arr;
}

function LessonForm() {
  console.log("LessonForm");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeLesson } = useSelector((state) => state.lesson);
  const { lessonId } = useParams();

  useEffect(() => {
    if (user.id) {
      console.log("LessonForm useEffect ");
      dispatch(fetchLesson({ lessonID: lessonId, teacherID: user.id }));
    }
  }, [user.id, dispatch]);

  const dateParts = activeLesson.date.split("-");
  const days = generateDaysRange(dateParts[0], dateParts[1]);

  // console.log(days);

  var columns = [
    {
      dataField: "dbId",
      text: "",
      hidden: true,
    },
    {
      dataField: "id",
      text: "#",
    },
    {
      dataField: "name",
      text: "Name",
    },
  ];

  if (days.length) {
    // console.log('days', days)
    // columns.push(...days);
    // console.log('columns', columns)
  }

  function onChange(oldValue, newValue, row, column){
    console.log('SAVE:::', newValue)
  }

  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <h1> {activeLesson.name}</h1>
        <p>{new Date(activeLesson.date).toDateString()}</p>
      </div>

      {/* <BootstrapTable
        striped
        hover
        condensed
        size="sm"
        // bootstrap4
        noDataIndication="Table is Empty"
        keyField="id"
        data={activeLesson.students}
        columns={columns}
        cellEdit={ cellEditFactory({ mode: 'click' }) }
        // cellEdit={cellEditFactory({
          // blurToSave: true,
          // mode: "click",
          // onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
          // beforeSaveCell: (oldValue, newValue, row, column) => { console.log('Before Saving Cell!!'); },
          // afterSaveCell: (oldValue, newValue, row, column) => {onChange(oldValue, newValue, row, column)},
        // })}
      /> */}
    </Container>
  );
}

export default LessonForm;
