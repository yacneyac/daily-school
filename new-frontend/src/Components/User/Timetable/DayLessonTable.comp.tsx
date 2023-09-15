import { useCallback, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";

// import BasicTable from "./BaseTable.comp";
import RemoveLessonModal from "../Lesson/RemoveLesssonModal.comp";
import { LessonGridRow } from "../../../types";

export default function DayLessonTable(props: { rows: LessonGridRow[] }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [removeLessonId, setRemoveLessonId] = useState<number | null>(null);

  // function getGroupLink(params) {
  //   return <Link to={`/groups/${params.row.groupId}`}>{params.row.group}</Link>;
  // }

  const handleRowDBClick = (params: { row: LessonGridRow }) => {
    console.log("handleRowClick", params.row.db_id);
    navigate("/lessons/" + params.row.db_id);
  };

  const deleteLesson = useCallback(
    (id: number) => () => {
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
      getActions: (params: { id: number }) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deleteLesson(params.id)}
        />,
      ],
    },
    { field: "db_id", headerName: "", hide: true },
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
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={props.rows}
            columns={columns}
            hideFooter
            disableColumnMenu
            autoHeight
            getRowId={(row) => row.db_id}
            rowHeight={35}
            onRowDoubleClick={handleRowDBClick}
          />
        </div>
      </div>
      <RemoveLessonModal
        open={open}
        handleClose={() => setOpen(false)}
        removeLessonId={removeLessonId}
      />
    </>
  );
}
