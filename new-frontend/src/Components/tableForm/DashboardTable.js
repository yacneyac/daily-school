import { useCallback, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

import BasicTable from "./BaseTable.comp";
import RemoveLessonModal from "../User/Lesson/RemoveLesssonModal.comp";


export default function DashboardTable(props) {
  const [open, setOpen] = useState(false);
  const [removeLessonId, setRemoveLessonId] = useState(null);

  function getGroupLink(params) {
    // <Link to={`/group/${row.groupId}`}>{row.group}</Link>;
    return <Link to={`/groups/${params.row.groupId}`}>{params.row.group}</Link>;
    // `${params.row.firstName || ''} ${params.row.lastName || ''}`;
  }

  const deleteLesson = useCallback(
    (id) => () => {
      setRemoveLessonId(id);
      setOpen(true);
    },
    []
  );

  const columns = [
    {
      field: "actions",
      type: "actions",
      flex: 0.2,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deleteLesson(params.id)}
        />,
      ],
    },
    { field: "dbId", headerName: "", hide: true },
    {
      field: "id",
      flex: 0.2,
      headerName: "#",
      sortable: false,
    },
    {
      field: "time",
      flex: 0.6,
      headerName: "Time",
      sortable: false,
    },
    {
      field: "subject",
      flex: 1,
      headerName: "Subject",
      sortable: false,
    },
    {
      field: "room",
      flex: 0.7,
      headerName: "Room",
      sortable: false,
    },
    {
      field: "group",
      flex: 0.7,
      headerName: "Group",
      sortable: false,
      // valueGetter: getGroupLink,

      //   valueGetter: (params) =>
      //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  return (
    <>
      <BasicTable rows={props.rows} columns={columns} />
      <RemoveLessonModal
        open={open}
        handleClose={() => setOpen(false)}
        removeLessonId={removeLessonId}
      />
    </>
  );
}
