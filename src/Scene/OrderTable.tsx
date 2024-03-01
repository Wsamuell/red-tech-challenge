import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowSelectionModel,
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Order, OrderType } from '../types';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface DataTableProps {
  orders: Order[];
  orderTypes: OrderType[];
  onSelectedRowsChange: (selectedRows: string[]) => void;
  onSaveChanges: (updatedRow: Order) => void;
}

const DataTable = ({
  orders,
  orderTypes,
  onSelectedRowsChange,
  onSaveChanges,
}: DataTableProps) => {
  const getRowId = (row: Order) => row.orderId;
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    const selectedOrderIds = newSelection.map((rowId) => rowId.toString());
    onSelectedRowsChange(selectedOrderIds);
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    const updatedRow = orders.find((row) => row.orderId === id);
    if (!updatedRow) return;

    onSaveChanges(updatedRow);
    setRowModesModel({
      ...rowModesModel,
      [updatedRow.orderId]: { mode: GridRowModes.View },
    });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };
  const columns: GridColDef[] = [
    {
      disableColumnMenu: true,
      field: 'orderId',
      headerName: 'Order ID',
      width: 300,
      editable: false,
    },
    {
      disableColumnMenu: true,
      field: 'createdDate',
      headerName: 'Creation Date',
      width: 200,
      editable: false,
    },
    {
      disableColumnMenu: true,
      field: 'createdByUserName',
      headerName: 'Created By',
      width: 150,
      editable: true,
      type: 'string',
    },
    {
      disableColumnMenu: true,
      field: 'orderType',
      headerName: 'Order Type',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: orderTypes,
    },
    {
      disableColumnMenu: true,
      field: 'customerName',
      headerName: 'Customer',
      width: 160,
      editable: true,
      type: 'string',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<AddIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary edit-icon"
            sx={{ visibility: 'hidden' }}
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        '& .MuiDataGrid-row:hover .edit-icon': {
          visibility: 'visible',
        },
      }}
    >
      <DataGrid
        getRowId={getRowId}
        rows={orders}
        columns={columns}
        editMode="row"
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        onRowSelectionModelChange={handleSelectionChange}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getCellClassName={(params) => {
          const isInEditMode =
            rowModesModel[params.id]?.mode === GridRowModes.Edit;
          return isInEditMode ? 'edit-cell' : '';
        }}
      />
    </Box>
  );
};

export default DataTable;
