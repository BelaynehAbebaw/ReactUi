import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const DataTable = ({ rows, columns, loading, onEdit, onDelete }) => {
  // Add edit/delete buttons as extra column
  const actionColumn = {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    renderCell: (params) => (
      <>
        <IconButton color="primary" onClick={() => onEdit(params.row)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(params.row.id)}>
          <Delete />
        </IconButton>
      </>
    ),
  };

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={[...columns, actionColumn]}
        pageSize={5}                // default page size
        rowsPerPageOptions={[5, 10, 20]}  // pagination selection
        pagination
        loading={loading}
        getRowId={(row) => row.id}  // make sure DataGrid knows the unique id
        components={{ Toolbar: GridToolbar }} // optional toolbar
      />
    </div>
  );
};

export default DataTable;
