import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function BasicTable(props) {
  const handleRowDBClick = (params) => {
    console.log("handleRowClick", params.row.db_id);
    // setMessage(`Movie "${params.row.title}" clicked`);
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={props.rows}
          columns={props.columns}
          hideFooter
          disableColumnMenu
          autoHeight
          getRowId={(row) => row.db_id}
          rowHeight={35}
          onRowDoubleClick={handleRowDBClick}
        />
      </div>
    </div>
  );
}
