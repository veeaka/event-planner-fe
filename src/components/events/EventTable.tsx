import React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

interface DataTableProps {
  events: Event[];
  onViewEvent: (id: string) => void; // Handler for viewing an event
  onDeleteEvent: (id: string) => void; // Handler for deleting an event
}

const EventTable: React.FC<DataTableProps> = ({
  events,
  onViewEvent,
  onDeleteEvent,
}) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "title", headerName: "Title", width: 150, sortable: true },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      sortable: false,
    },
    { field: "date", headerName: "Date", width: 90, sortable: false },
    { field: "time", headerName: "Time", width: 90, sortable: false },
    { field: "location", headerName: "Location", width: 120, sortable: false },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <VisibilityIcon
            sx={{ cursor: "pointer", color: "#AA5486" }}
            onClick={() => onViewEvent(params.row.id)}
          />
          <EditIcon
            sx={{ cursor: "pointer", color: "#FBD288" }}
            onClick={() => onViewEvent(params.row.id)}
          />
          <DeleteIcon
            sx={{ cursor: "pointer", color: "#FF4545" }}
            onClick={() => onDeleteEvent(params.row.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: "900px", margin: "20px auto" }}>
      <DataGrid
        rows={events}
        columns={columns}
        hideFooterPagination
        hideFooter
        disableRowSelectionOnClick
        disableAutosize
        disableColumnFilter
        disableColumnMenu
        disableMultipleRowSelection
      />
    </div>
  );
};

export default EventTable;
